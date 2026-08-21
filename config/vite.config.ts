import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

const root = path.resolve(import.meta.dirname, "..");

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, root, "");

  /**
   * The Django backend has no CORS configuration, so the dev server proxies the
   * API and the uploaded media instead of calling the origin directly.
   */
  const target = env.VITE_API_PROXY_TARGET ?? "http://127.0.0.1:8000";

  const proxy = {
    "/api/v1": {target, changeOrigin: true},
    "/media": {target, changeOrigin: true},
  };

  return {
    root: "src",
    // `root` is `src`, so env files would otherwise be looked up there.
    envDir: root,
    publicDir: "../public",
    plugins: [react({devTarget: "esnext"}), svgr()],
    css: {preprocessorOptions: {scss: {api: "modern"}}},
    resolve: {
      alias: [{find: "@", replacement: path.resolve(root, "src")}],
      extensions: [".js", ".ts", ".jsx", ".tsx", ".scss"],
    },
    cacheDir: "../.yarn/.vite",
    optimizeDeps: {exclude: ["blip-ds/loader"]},
    build: {outDir: "../dist", emptyOutDir: true},
    /*
     * Matched on `/api/v1`, not `/api`: with `root: "src"` the dev server
     * publishes `src/api/*` under `/api/*`, and a broader rule would proxy the
     * client's own modules to Django.
     *
     * Production needs none of this — the SPA and the API are served from the
     * same host, so the relative paths in `.env.production` just work.
     */
    server: {proxy},
    preview: {proxy},
  };
});
