import {Outlet, useLocation} from "react-router-dom";

import {StatusBar} from "@/components/StatusBar";
import {TeamBottomNav} from "@/components/TeamBottomNav";

import styles from "./index.module.scss";

export const Layout = () => {
  const {pathname} = useLocation();
  const isScrollablePage =
    pathname !== "/" && pathname !== "/store" && pathname !== "/product-write" && pathname !== "/number-input";
  const isStartPage = pathname === "/";
  const hasBottomNav = !pathname.startsWith("/product-add") && !pathname.startsWith("/number-input");
  const statusBarVariant = pathname === "/home" ? "light" : "dark";
  const appClassName = `${styles.app} ${styles.showAllHotspots}`;

  if (isStartPage) {
    return (
      <div className={appClassName}>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className={appClassName}>
      <StatusBar variant={statusBarVariant} />
      <main className={`${styles.content} ${isScrollablePage ? styles.scrollContent : ""}`}>
        <Outlet />
      </main>
      {hasBottomNav && <TeamBottomNav />}
    </div>
  );
};






