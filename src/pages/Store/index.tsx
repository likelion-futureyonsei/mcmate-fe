import styles from "./index.module.scss";

export function Store() {
  return (
    <iframe
      className={styles.frame}
      src="https://kr.mcmworldwide.com/ko_KR/home?hidebanner=true"
      title="MCM Korea Store"
    />
  );
}
