import type {ReactNode} from "react";
import {useNavigate} from "react-router-dom";

import {IconChevronLeft} from "@/assets/icons";
import {GlassButton} from "@/components/GlassButton";

import styles from "./index.module.scss";

type TopBarProps = {
  /** Destination of the back affordance. Falls back to browser history. */
  backTo?: string;
  /** Hides the back affordance entirely. */
  hideBack?: boolean;
  /** Backdrop strength of the round buttons. */
  tint?: "subtle" | "strong" | "solid";
  /** Trailing controls, usually `GlassButton`s. */
  actions?: ReactNode;
  className?: string;
};

/**
 * The 44px action row that sits directly under the status bar on every frame.
 */
export const TopBar = ({
  backTo,
  hideBack = false,
  tint = "subtle",
  actions,
  className,
}: TopBarProps) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.bar} ${className ?? ""}`}>
      {hideBack ? (
        <span className={styles.spacer} />
      ) : (
        <GlassButton
          label="뒤로 가기"
          tint={tint}
          to={backTo}
          onClick={backTo ? undefined : () => navigate(-1)}
        >
          <IconChevronLeft className={styles.backIcon} />
        </GlassButton>
      )}

      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
};
