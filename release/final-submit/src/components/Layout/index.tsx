import {Outlet, useLocation} from "react-router-dom";

import {StatusBar} from "@/components/StatusBar";
import {TeamBottomNav} from "@/components/TeamBottomNav";

import styles from "./index.module.scss";

export const Layout = () => {
  const {pathname, state} = useLocation();
  const routeState = state as {hideBottomNav?: boolean} | null;
  const isScrollablePage =
    pathname !== "/" && pathname !== "/store" && pathname !== "/product-write" && pathname !== "/number-input";
  const isStartPage = pathname === "/";
  const isTransparentPage = pathname.startsWith("/product-add");
  const hasBottomNav =
    !pathname.startsWith("/product-add") && !pathname.startsWith("/number-input") && !routeState?.hideBottomNav;
  const statusBarVariant = pathname === "/home" ? "light" : "dark";
  const appClassName = `${styles.app} ${isTransparentPage ? styles.transparentApp : ""}`;
  const contentClassName = `${styles.content} ${isScrollablePage && !isStartPage ? styles.scrollContent : ""} ${isTransparentPage ? styles.transparentContent : ""}`;

  return (
    <div className={appClassName}>
      {!isStartPage && <StatusBar variant={statusBarVariant} />}
      <main className={contentClassName}>
        <Outlet />
      </main>
      {hasBottomNav && !isStartPage && <TeamBottomNav />}
    </div>
  );
};
