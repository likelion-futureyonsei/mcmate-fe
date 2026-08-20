import type {ReactNode} from "react";
import {Link} from "react-router-dom";
import {Glass} from "@samasante/liquid-glass";

import styles from "./index.module.scss";

type GlassButtonProps = {
  children: ReactNode;
  /** Accessible name — required when the button only renders an icon. */
  label?: string;
  /** Renders a router link instead of a button. */
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  /** Backdrop strength taken from the Figma fills. */
  tint?: "subtle" | "strong" | "solid" | "veil" | "none";
  shape?: "circle" | "pill" | "block";
  /** Applied to the lens itself, so layout and sizing land on the outer box. */
  className?: string;
  disabled?: boolean;
};

/**
 * Liquid-glass action surface. The lens fits the interactive element inside it,
 * so setting a width on `className` grows both together.
 */
export const GlassButton = ({
  children,
  label,
  to,
  onClick,
  type = "button",
  tint = "strong",
  shape = "circle",
  className,
  disabled,
}: GlassButtonProps) => (
  <Glass
    className={[styles.glass, styles[tint], styles[shape], className ?? ""]
      .filter(Boolean)
      .join(" ")}
  >
    {to ? (
      <Link to={to} className={styles.hit} aria-label={label}>
        {children}
      </Link>
    ) : (
      <button
        type={type}
        onClick={onClick}
        className={styles.hit}
        aria-label={label}
        disabled={disabled}
      >
        {children}
      </button>
    )}
  </Glass>
);
