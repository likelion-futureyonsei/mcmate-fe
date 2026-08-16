import styles from "./index.module.scss";

export function Store() {
  return (
    <section className={styles.page} aria-label="store page">
      <iframe
        className={styles.frame}
        src="https://kr.mcmworldwide.com/ko_KR/home"
        title="MCM Korea Store"
      />
    </section>
  );
}
