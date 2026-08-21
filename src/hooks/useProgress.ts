import {useEffect, useRef, useState} from "react";

/** Ceiling the bar creeps towards while the request is still open. */
const PENDING_CEILING = 0.92;
/** Fraction of the remaining distance covered each second. */
const APPROACH_RATE = 1.6;
/** Seconds the bar takes to run out once the data has arrived. */
const SETTLE_SECONDS = 0.25;

/**
 * Animated 0..1 value for the `Loading` screen's progress bar.
 *
 * Request progress is not observable with `fetch`, so the bar eases towards a
 * ceiling while the call is open and then runs to the end once it resolves.
 * That keeps it moving — a bar frozen at 83% reads as a hang.
 */
export const useProgress = (pending: boolean): number => {
  const [progress, setProgress] = useState(pending ? 0.06 : 1);
  const frame = useRef(0);
  const previous = useRef(0);

  useEffect(() => {
    if (pending) {
      setProgress((current) => (current >= PENDING_CEILING ? 0.06 : current));
    }

    previous.current = 0;

    const step = (now: number) => {
      const last = previous.current || now;
      const delta = Math.min((now - last) / 1000, 0.1);
      previous.current = now;

      setProgress((current) => {
        if (pending) {
          const remaining = PENDING_CEILING - current;

          return remaining <= 0.001
            ? PENDING_CEILING
            : current + remaining * APPROACH_RATE * delta;
        }

        return Math.min(1, current + delta / SETTLE_SECONDS);
      });

      frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame.current);
  }, [pending]);

  return progress;
};
