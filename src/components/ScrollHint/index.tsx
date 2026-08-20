import type {CSSProperties} from "react";

import styles from "./index.module.scss";

type ScrollHintProps = {
  /** Visible portion of the track, 0..1. */
  progress?: number;
  className?: string;
};

/** Two-tone rail that hints a horizontally scrollable shelf. */
export const ScrollHint = ({progress = 2 / 3, className}: ScrollHintProps) => (
  <span
    className={`${styles.track} ${className ?? ""}`}
    aria-hidden="true"
    style={{"--scroll-hint-progress": progress} as CSSProperties}
  >
    <span className={styles.thumb} />
  </span>
);
