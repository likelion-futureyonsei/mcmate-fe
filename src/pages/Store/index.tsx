import {Screen} from "@/components";

import styles from "./index.module.scss";

export function Store() {
  return (
    <Screen label="스토어" className={styles.page}>
      <p className={styles.placeholder}>스토어 준비 중입니다.</p>
    </Screen>
  );
}
