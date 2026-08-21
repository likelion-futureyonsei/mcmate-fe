/**
 * Every non-2xx response from the backend carries the same envelope,
 * `{"message": "..."}` (see `apps/common/exceptions.py`), so a single error
 * type is enough for the whole client.
 */
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** Network failure, aborted request or a browser-level problem. */
export class NetworkError extends Error {
  constructor(
    message = "서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.",
  ) {
    super(message);
    this.name = "NetworkError";
  }
}

const FALLBACK = "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";

/** Pulls a message safe to render out of anything a `catch` block receives. */
export const errorMessage = (error: unknown): string => {
  if (error instanceof ApiError || error instanceof NetworkError) {
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return FALLBACK;
};
