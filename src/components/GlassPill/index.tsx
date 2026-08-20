import type {ReactNode} from "react";
import {Link} from "react-router-dom";
import {Glass} from "@samasante/liquid-glass";

import styles from "./index.module.scss";

export type PillAction = {
  /** Accessible name of the action. */
  label: string;
  icon: ReactNode;
  to?: string;
  onClick?: () => void;
};

type GlassPillProps = {
  actions: PillAction[];
  /** Backdrop strength taken from the Figma fills. */
  tint?: "solid" | "strong";
  className?: string;
};

/**
 * Rounded glass tray holding two or three icon actions, used in the top-right
 * corner of most detail screens.
 */
export const GlassPill = ({
  actions,
  tint = "solid",
  className,
}: GlassPillProps) => (
  <Glass className={`${styles.pill} ${styles[tint]} ${className ?? ""}`}>
    {actions.map((action) =>
      action.to ? (
        <Link
          key={action.label}
          to={action.to}
          className={styles.action}
          aria-label={action.label}
        >
          {action.icon}
        </Link>
      ) : (
        <button
          key={action.label}
          type="button"
          onClick={action.onClick}
          className={styles.action}
          aria-label={action.label}
        >
          {action.icon}
        </button>
      ),
    )}
  </Glass>
);
