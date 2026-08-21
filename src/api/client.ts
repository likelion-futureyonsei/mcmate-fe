import {API_BASE_URL} from "./config";
import {ApiError, NetworkError} from "./errors";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "./tokens";

export type QueryValue = string | number | boolean | null | undefined;

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  /** JSON payload. Ignored when `form` is set. */
  body?: unknown;
  /** Multipart payload, used by `POST /upload`. */
  form?: FormData;
  query?: Record<string, QueryValue>;
  /** Attaches the bearer token and enables the refresh-and-retry path. */
  auth?: boolean;
  signal?: AbortSignal;
};

export type Page<T> = {items: T[]; total: number};

/** Fired when the refresh token is rejected, so `AuthProvider` can sign out. */
export const SESSION_EXPIRED_EVENT = "mcmate:session-expired";

const buildUrl = (path: string, query?: Record<string, QueryValue>) => {
  // Every backend route is declared without a trailing slash and
  // `APPEND_SLASH = False`, so the path is passed through verbatim.
  const search = new URLSearchParams();

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.append(key, String(value));
    }
  });

  const queryString = search.toString();

  return `${API_BASE_URL}${path}${queryString ? `?${queryString}` : ""}`;
};

const parseBody = async (response: Response): Promise<unknown> => {
  if (response.status === 204) {
    return undefined;
  }

  const text = await response.text();

  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

const messageOf = (payload: unknown, status: number): string => {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "message" in payload &&
    typeof (payload as {message: unknown}).message === "string"
  ) {
    return (payload as {message: string}).message;
  }

  if (typeof payload === "string" && payload) {
    return payload;
  }

  return `요청을 처리하지 못했습니다. (HTTP ${status})`;
};

/**
 * Refresh rotation blacklists the token it consumed, so two concurrent
 * refreshes would make the second one fail. All callers share one in-flight
 * promise instead.
 */
let refreshInFlight: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  const response = await fetch(buildUrl("/tokens/refresh"), {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({refresh_token: refreshToken}),
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await parseBody(response)) as {
    access_token?: string;
    refresh_token?: string;
  };

  if (!payload?.access_token) {
    return null;
  }

  setAccessToken(payload.access_token, payload.refresh_token);

  return payload.access_token;
};

const ensureFreshAccessToken = () => {
  refreshInFlight ??= refreshAccessToken().finally(() => {
    refreshInFlight = null;
  });

  return refreshInFlight;
};

const send = async (
  path: string,
  {method = "GET", body, form, query, auth = true, signal}: RequestOptions,
  accessToken: string | null,
) => {
  const headers: Record<string, string> = {};

  if (form === undefined && body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (auth && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    return await fetch(buildUrl(path, query), {
      method,
      headers,
      body: form ?? (body === undefined ? undefined : JSON.stringify(body)),
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new NetworkError();
  }
};

/**
 * Performs a request and returns the parsed body plus the `X-Total-Count`
 * header the list endpoints paginate with.
 */
export const requestRaw = async <T>(
  path: string,
  options: RequestOptions = {},
): Promise<{data: T; total: number | null}> => {
  const {auth = true} = options;

  let response = await send(path, options, auth ? getAccessToken() : null);

  // The access token lives 12h; a 401 on an authenticated call means it
  // expired (or was never valid), so try exactly one refresh-and-retry.
  if (response.status === 401 && auth && getRefreshToken()) {
    const accessToken = await ensureFreshAccessToken();

    if (accessToken) {
      response = await send(path, options, accessToken);
    } else {
      clearTokens();
      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
    }
  }

  const payload = await parseBody(response);

  if (!response.ok) {
    if (response.status === 401 && auth) {
      clearTokens();
      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
    }

    throw new ApiError(response.status, messageOf(payload, response.status));
  }

  const totalHeader = response.headers.get("X-Total-Count");
  const total = totalHeader === null ? null : Number(totalHeader);

  return {
    data: payload as T,
    total: total === null || Number.isNaN(total) ? null : total,
  };
};

export const request = async <T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> => (await requestRaw<T>(path, options)).data;

/**
 * List endpoints answer with a bare array and put the count in a header, so the
 * total falls back to the array length when the header is not exposed (which is
 * what happens on a cross-origin deployment without `Access-Control-Expose-Headers`).
 */
export const requestPage = async <T>(
  path: string,
  options: RequestOptions = {},
): Promise<Page<T>> => {
  const {data, total} = await requestRaw<T[]>(path, options);
  const items = Array.isArray(data) ? data : [];

  return {items, total: total ?? items.length};
};
