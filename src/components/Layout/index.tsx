import {Outlet} from "react-router-dom";

import {BottomNav} from "@/components/BottomNav";

import styles from "./index.module.scss";

export const Layout = () => {
  return (
    <div className={styles.app}>
      <Outlet />
      <BottomNav />
    </div>
  );
};
