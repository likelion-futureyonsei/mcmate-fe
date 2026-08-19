import {useState} from "react";
import {Outlet, useLocation} from "react-router-dom";

import {StatusBar} from "@/components/StatusBar";
import {TeamBottomNav} from "@/components/TeamBottomNav";

import styles from "./index.module.scss";

export const Layout = () => {
  const {pathname} = useLocation();
  const [showAllHotspots, setShowAllHotspots] = useState(true);
  const isScrollablePage =
    pathname !== "/" && pathname !== "/store" && pathname !== "/product-write" && pathname !== "/number-input";
  const isStartPage = pathname === "/";
  const hasBottomNav = !pathname.startsWith("/product-add") && !pathname.startsWith("/number-input");
  const statusBarVariant = pathname === "/home" ? "light" : "dark";
  const appClassName = `${styles.app} ${showAllHotspots ? styles.showAllHotspots : ""}`;

  return (
    <div className={appClassName}>
      <button
        className={styles.hotspotToggle}
        type="button"
        aria-pressed={showAllHotspots}
        aria-label={showAllHotspots ? "클릭박스 숨기기" : "클릭박스 보이기"}
        data-hide-hotspot="true"
        onClick={() => setShowAllHotspots((value) => !value)}
      >
        {showAllHotspots ? "클릭박스 ON" : "클릭박스 OFF"}
      </button>
      {!isStartPage && <StatusBar variant={statusBarVariant} />}
      <main className={`${styles.content} ${isScrollablePage && !isStartPage ? styles.scrollContent : ""}`}>
        <Outlet />
      </main>
      {hasBottomNav && !isStartPage && <TeamBottomNav />}
    </div>
  );
};
