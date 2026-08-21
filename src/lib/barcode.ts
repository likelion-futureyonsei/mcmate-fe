type DetectedBarcode = {rawValue: string};

type BarcodeDetectorLike = {
  detect: (source: CanvasImageSource) => Promise<DetectedBarcode[]>;
};

declare global {
  interface Window {
    /** Chromium-only; absent in Safari and Firefox. */
    BarcodeDetector?: new (options?: {
      formats?: string[];
    }) => BarcodeDetectorLike;
  }
}

/** Whether this browser can decode a QR code without an extra dependency. */
const canScanBarcodes = () =>
  typeof window !== "undefined" && typeof window.BarcodeDetector === "function";

const POLL_MS = 400;

/**
 * Polls a playing `<video>` for QR codes and reports the first payload found.
 * Returns a stop function; a no-op when the browser has no `BarcodeDetector`,
 * in which case the frame's manual number entry is the way in.
 */
export const scanVideo = (
  video: HTMLVideoElement,
  onCode: (value: string) => void,
): (() => void) => {
  if (!canScanBarcodes()) {
    return () => {};
  }

  const detector = new window.BarcodeDetector!({formats: ["qr_code"]});
  let stopped = false;

  const timer = window.setInterval(async () => {
    if (stopped || video.readyState < 2) {
      return;
    }

    try {
      const [found] = await detector.detect(video);

      if (found?.rawValue && !stopped) {
        stopped = true;
        window.clearInterval(timer);
        onCode(found.rawValue);
      }
    } catch {
      /* a frame that could not be decoded — try the next one */
    }
  }, POLL_MS);

  return () => {
    stopped = true;
    window.clearInterval(timer);
  };
};
