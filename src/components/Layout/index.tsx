import {Outlet} from "react-router-dom";

import {BottomNav} from "@/components/BottomNav";
import {StatusBar} from "@/components/StatusBar";

import styles from "./index.module.scss";

export const Layout = () => {
  return (
    <div className={styles.app}>
      <StatusBar />
      <main className={styles.content}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
