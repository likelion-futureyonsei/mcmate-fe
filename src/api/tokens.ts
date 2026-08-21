/**
 * JWT storage. `localStorage` is used for the same reason `useDarkMode` uses
 * it: this is a client-only SPA with no server session to fall back on.
 *
 * The backend rotates refresh tokens (`ROTATE_REFRESH_TOKENS = True`) and
 * blacklists the previous one, so the stored refresh token must be replaced on
 * every successful refresh.
 */
const ACCESS_KEY = "mcmate.access_token";
const REFRESH_KEY = "mcmate.refresh_token";
const USER_KEY = "mcmate.user_id";

export type TokenPair = {accessToken: string; refreshToken: string};

const read = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const write = (key: string, value: string | null) => {
  try {
    if (value === null) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value);
    }
  } catch {
    /* private browsing / quota — the session simply won't survive a reload */
  }
};

export const getAccessToken = () => read(ACCESS_KEY);
export const getRefreshToken = () => read(REFRESH_KEY);

export const getStoredUserId = (): number | null => {
  const raw = read(USER_KEY);
  const parsed = raw === null ? Number.NaN : Number(raw);

  return Number.isFinite(parsed) ? parsed : null;
};

export const setTokens = ({accessToken, refreshToken}: TokenPair) => {
  write(ACCESS_KEY, accessToken);
  write(REFRESH_KEY, refreshToken);
};

/** Refresh responses always include a rotated refresh token, but stay defensive. */
export const setAccessToken = (accessToken: string, refreshToken?: string) => {
  write(ACCESS_KEY, accessToken);

  if (refreshToken) {
    write(REFRESH_KEY, refreshToken);
  }
};

export const setStoredUserId = (userId: number | null) =>
  write(USER_KEY, userId === null ? null : String(userId));

export const clearTokens = () => {
  write(ACCESS_KEY, null);
  write(REFRESH_KEY, null);
  write(USER_KEY, null);
};
