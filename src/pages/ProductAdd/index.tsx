import {Link} from "react-router-dom";

import styles from "./index.module.scss";

export function ProductAdd() {
  return (
    <section className={styles.page} aria-label="product add page">
      <div className={styles.topActions}>
        <Link to="/my-products" className={styles.close} aria-label="닫기" />
      </div>

      <div className={styles.scanArea}>
        <span />
      </div>

      <article className={styles.guide}>
        <h1>제품을 등록하세요</h1>
        <p>QR 코드 또는 제품 번호를 통해 나의 MCM 제품을 추가할 수 있습니다.</p>
      </article>

      <div className={styles.sheet}>
        <span className={styles.handle} />
        <Link to="/number-input" className={styles.primary}>
          번호입력
        </Link>
        <button type="button">QR 스캔</button>
        <button type="button">사진으로 찾기</button>
      </div>
    </section>
  );
}
