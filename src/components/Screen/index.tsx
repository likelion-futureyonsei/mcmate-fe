import type {ReactNode} from "react";

import {BgPaper} from "@/assets/images";

import styles from "./index.module.scss";

type ScreenProps = {
  /** Accessible name of the screen. */
  label: string;
  children: ReactNode;
  /**
   * Full-bleed background artwork drawn as a CSS layer. Defaults to the
   * aged-paper texture used by most frames; pass `null` for a plain surface.
   */
  background?: string | null;
  /**
   * Artwork rendered as an element behind the content so it can be blurred and
   * flipped the way the character frames do.
   */
  backdrop?: string;
  /** Ink colour used over the background artwork. */
  tone?: "dark" | "light";
  /** Drops the horizontal gutter so children can bleed to the screen edges. */
  bleed?: boolean;
  /** Removes the bottom-navigation safe area (screens without a tab bar). */
  flush?: boolean;
  className?: string;
};

/**
 * Shared page shell. Reproduces the 390x844 Figma frame: a full-bleed
 * background, the space reserved for the device status bar, the 20px side
 * gutter and the safe area kept clear for the floating bottom navigation.
 */
export const Screen = ({
  label,
  children,
  background = BgPaper,
  backdrop,
  tone = "dark",
  bleed = false,
  flush = false,
  className,
}: ScreenProps) => (
  <section
    aria-label={label}
    className={[
      styles.screen,
      styles[tone],
      bleed ? styles.bleed : "",
      flush ? styles.flush : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ")}
    style={background ? {backgroundImage: `url(${background})`} : undefined}
  >
    {backdrop ? (
      <img className={styles.backdrop} src={backdrop} alt="" />
    ) : null}

    <div className={styles.content}>{children}</div>
  </section>
);
