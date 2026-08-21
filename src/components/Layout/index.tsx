import {useState} from "react";
import {Outlet} from "react-router-dom";

import {BottomNav} from "@/components/BottomNav";

import styles from "./index.module.scss";
import {NavVisibilityContext} from "./navVisibility";

type LayoutProps = {
  /** Frames presented modally (onboarding, scanner, settings) carry no tab bar. */
  nav?: boolean;
};

export const Layout = ({nav = true}: LayoutProps) => {
  /* Screens can pull the bar down for as long as they are mounted — see
   * `useHideBottomNav`. Loading interstitials do this. */
  const [hidden, setHidden] = useState(false);

  return (
    <NavVisibilityContext.Provider value={setHidden}>
      <div className={styles.app}>
        <Outlet />
        {nav && !hidden ? <BottomNav /> : null}
      </div>
    </NavVisibilityContext.Provider>
  );
};
