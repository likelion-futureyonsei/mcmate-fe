import type {CSSProperties} from "react";

import {AvatarYykib} from "@/assets/images";
import {Screen} from "@/components";

import styles from "./index.module.scss";

type LoadingProps = {
  /** Fraction of the bar that is filled, 0..1. */
  progress?: number;
  label?: string;
};

export function Loading({
  progress = 250 / 300,
  label = "추억 불러오는 중...",
}: LoadingProps) {
  return (
    <Screen label="로딩" background={AvatarYykib} flush className={styles.page}>
      <div
        className={styles.status}
        style={{"--loading-progress": progress} as CSSProperties}
      >
        <div
          className={styles.track}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-label={label}
        >
          <span className={styles.fill} />
        </div>

        <p className={styles.label}>{label}</p>
      </div>
    </Screen>
  );
}
