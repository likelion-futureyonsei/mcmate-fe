import {IconLogoAte} from "@/assets/icons";
import {LogoMcm, LogoMcmDark} from "@/assets/images";

import styles from "./index.module.scss";

type LogoProps = {
  /** Ink colour of the wordmark. */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * MCMate wordmark. "MCM" ships as artwork, "ate" as outlines, laid out side by
 * side so the lockup keeps its 147.58 x 30 proportions. Scale it with the
 * `--logo-scale` custom property.
 */
export const Logo = ({tone = "light", className}: LogoProps) => (
  <div
    className={`${styles.logo} ${styles[tone]} ${className ?? ""}`}
    role="img"
    aria-label="MCMate"
  >
    <img
      className={styles.mcm}
      src={tone === "dark" ? LogoMcmDark : LogoMcm}
      alt=""
    />
    <IconLogoAte className={styles.ate} />
  </div>
);
