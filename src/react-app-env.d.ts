/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  /** API root. Defaults to `/api/v1`, which the dev server proxies. */
  readonly VITE_API_BASE_URL?: string;
  /** Prefix uploaded photos are served from. Defaults to `/media`. */
  readonly VITE_MEDIA_BASE_URL?: string;
}
