import {Link} from "react-router-dom";

import styles from "./index.module.scss";

export function ProductDetail() {
  return (
    <section className={styles.page} aria-label="product detail page">
      <div className={styles.topActions}>
        <Link to="/my-products" className={styles.back} aria-label="뒤로가기" />
        <div className={styles.actions}>
          <Link
            to="/product-write"
            className={styles.write}
            aria-label="글쓰기"
          />
          <button
            className={styles.share}
            type="button"
            aria-label="공유하기"
          />
        </div>
      </div>

      <Link
        className={styles.mainPhoto}
        to="/product-photo"
        aria-label="첫 번째 사진 보기"
      >
        <span>MCM</span>
      </Link>

      <div className={styles.info}>
        <h1>Aren Shoulder Bag</h1>
        <p>데일리 숄더백의 아이콘</p>
        <strong>5/50</strong>
      </div>

      <div className={styles.strip}>
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className={styles.gallery}>
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
