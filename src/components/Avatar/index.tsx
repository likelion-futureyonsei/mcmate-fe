import {AvatarYykib} from "@/assets/images";

import styles from "./index.module.scss";

type AvatarProps = {src?: string; alt?: string; className?: string};

/**
 * Diamond profile badge: the portrait clipped to a rhombus and framed by two
 * concentric diamond outlines.
 */
export const Avatar = ({
  src = AvatarYykib,
  alt = "",
  className,
}: AvatarProps) => (
  <span className={`${styles.avatar} ${className ?? ""}`}>
    <span className={styles.clip}>
      <img className={styles.photo} src={src} alt={alt} />
    </span>
    <span className={styles.ringInner} aria-hidden="true" />
    <span className={styles.ringOuter} aria-hidden="true" />
  </span>
);
