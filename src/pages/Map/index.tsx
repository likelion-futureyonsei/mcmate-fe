import styles from "./index.module.scss";

export function Map() {
  return (
    <section className={styles.page} aria-label="map page">
      <img className={styles.background} src="/map-background.svg" alt="" aria-hidden="true" />
      <img className={styles.reference} src="/map-reference.svg" alt="MCM 추억 지도" />
    </section>
  );
}
