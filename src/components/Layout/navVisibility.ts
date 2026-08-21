import {createContext, useContext, useLayoutEffect} from "react";

/**
 * Lets a screen rendered inside `Layout` take the tab bar away while it is
 * mounted. The loading frame uses it: an interstitial covers the whole viewport,
 * and the floating bar sitting on top of it reads as a half-drawn screen.
 *
 * Defaults to a no-op so the frames that render outside a `Layout` (the
 * onboarding hop) still work.
 */
export const NavVisibilityContext = createContext<(hidden: boolean) => void>(
  () => {},
);

/** Hides the bottom navigation for as long as the calling screen is mounted. */
export const useHideBottomNav = (active = true) => {
  const setHidden = useContext(NavVisibilityContext);

  /* Layout-effect rather than effect, so the bar is gone before the loading
   * frame is painted instead of blinking out one frame later. */
  useLayoutEffect(() => {
    if (!active) {
      return;
    }

    setHidden(true);

    return () => setHidden(false);
  }, [active, setHidden]);
};
