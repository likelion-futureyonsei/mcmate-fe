import {IconBag} from "@/assets/icons";

import styles from "./index.module.scss";

type CountBadgeProps = {
  /** Memories already recorded for the product. */
  owned: number;
  /** Total memories the product can hold. */
  total: number;
  className?: string;
};

/** Bag glyph plus an `owned/total` readout, used on every product tile. */
export const CountBadge = ({owned, total, className}: CountBadgeProps) => (
  <span className={`${styles.badge} ${className ?? ""}`}>
    <IconBag className={styles.icon} />
    <span className={styles.value}>
      {owned}/{total}
    </span>
  </span>
);
