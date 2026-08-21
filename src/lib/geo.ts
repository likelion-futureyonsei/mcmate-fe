/** Coordinates of the seeded MCM 성수 store, used as the default pin location. */
export const DEFAULT_POSITION = {lat: 37.5446, lng: 127.0559};

/**
 * Bounding box the illustrated map artwork is cropped to. The background is a
 * picture rather than a map SDK, so memories are projected into it linearly —
 * enough for pins to sit in recognisably different places.
 */
const BOUNDS = {south: 33.0, north: 38.7, west: 125.4, east: 129.7};

/** Keeps a pin card fully inside the frame. */
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export type PinPosition = {x: string; y: string};

export const projectToMap = (lat: number, lng: number): PinPosition => {
  const x = (lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west);
  const y = (BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south);

  return {
    x: `${clamp(x * 100, 3, 84).toFixed(2)}%`,
    y: `${clamp(y * 100, 2, 88).toFixed(2)}%`,
  };
};

/** Reads the device position, falling back to the seeded store. */
export const currentPosition = (): Promise<{lat: number; lng: number}> =>
  new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(DEFAULT_POSITION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      () => resolve(DEFAULT_POSITION),
      {enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000},
    );
  });
