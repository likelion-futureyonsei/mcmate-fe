import {useCallback, useEffect, useRef, useState} from "react";

import {errorMessage} from "@/api";

export type AsyncResult<T> = {
  data: T | null;
  /** Ready-to-render message from the backend's `{"message": "..."}` envelope. */
  error: string | null;
  pending: boolean;
  /** Re-runs the loader, e.g. after a write. */
  reload: () => void;
};

/**
 * Runs an async loader on mount and whenever `deps` change, cancelling the
 * in-flight request when the inputs change or the screen unmounts.
 *
 * Deliberately small: the app has no server-state library, and every screen
 * here needs the same three things (data, a message, a pending flag).
 */
export const useAsync = <T>(
  loader: (signal: AbortSignal) => Promise<T>,
  deps: unknown[],
): AsyncResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(true);
  const [nonce, setNonce] = useState(0);

  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  const reload = useCallback(() => setNonce((value) => value + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    setPending(true);
    setError(null);

    loaderRef
      .current(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          setData(result);
          setPending(false);
        }
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        setError(errorMessage(cause));
        setPending(false);
      });

    return () => controller.abort();
    // `loader` is read through a ref, so only the caller's inputs re-trigger it.
  }, [...deps, nonce]);

  return {data, error, pending, reload};
};
