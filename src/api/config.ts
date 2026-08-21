/**
 * Where the Django API lives.
 *
 * In development the Vite dev server proxies `/api` and `/media` to the
 * backend (see `config/vite.config.ts`), which keeps every request same-origin.
 * The backend ships without `django-cors-headers`, so a cross-origin base URL
 * only works if the deployment puts both behind the same host.
 */
const trimEnd = (value: string) => value.replace(/\/+$/, "");

export const API_BASE_URL = trimEnd(
  import.meta.env.VITE_API_BASE_URL ?? "/api/v1",
);

/** Prefix of the `MEDIA_URL` the backend serves uploaded photos from. */
export const MEDIA_BASE_URL = trimEnd(
  import.meta.env.VITE_MEDIA_BASE_URL ?? "/media",
);

/**
 * Resolves a `photo` key (as stored on a memory) to a browser-loadable URL.
 * `POST /upload` returns `MEDIA_URL` without a leading slash, so relative
 * values coming straight from the API are normalised here too.
 */
export const mediaUrl = (key: string | null | undefined): string | null => {
  if (!key) {
    return null;
  }

  if (/^(https?:)?\/\//.test(key)) {
    return key;
  }

  const path = key.replace(/^\/+/, "").replace(/^media\//, "");

  return `${MEDIA_BASE_URL}/${path}`;
};
