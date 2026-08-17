import {Link} from "react-router-dom";

import styles from "./index.module.scss";

export function ProductPhoto() {
  return (
    <section className={styles.page} aria-label="product photo page">
      <div className={styles.topActions}>
        <Link
          to="/product-detail"
          className={styles.back}
          aria-label="뒤로가기"
        />
        <button className={styles.share} type="button" aria-label="공유하기" />
      </div>

      <div className={styles.photo}>
        <span>MCM XXVI</span>
      </div>

      <div className={styles.toolbar}>
        <span>122</span>
        <strong>5</strong>
      </div>

      <article className={styles.caption}>
        <h1>데일리 숄더백의 아이콘</h1>
        <p>
          짧은 외출에도 편하게 들고 나갈 수 있는 사이즈라 자주 손이 가는
          제품입니다.
        </p>
      </article>
    </section>
  );
}
