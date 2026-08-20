import {Outlet} from "react-router-dom";

import {BottomNav} from "@/components/BottomNav";

import styles from "./index.module.scss";

type LayoutProps = {
  /** Frames presented modally (onboarding, scanner, settings) carry no tab bar. */
  nav?: boolean;
};

export const Layout = ({nav = true}: LayoutProps) => {
  return (
    <div className={styles.app}>
      <Outlet />
      {nav ? <BottomNav /> : null}
    </div>
  );
};
