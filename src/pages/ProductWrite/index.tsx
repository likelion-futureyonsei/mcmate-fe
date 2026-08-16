import {Link} from "react-router-dom";

import styles from "./index.module.scss";

export function ProductWrite() {
  return (
    <section className={styles.page} aria-label="product write page">
      <div className={styles.topActions}>
        <Link to="/product-detail" className={styles.back} aria-label="뒤로가기" />
        <Link to="/product-detail" className={styles.done} aria-label="완료" />
      </div>

      <form className={styles.form}>
        <label className={styles.photoBox}>
          <span>사진을 추가하세요</span>
          <input type="file" accept="image/*" />
        </label>

        <label className={styles.field}>
          <span>제품명</span>
          <input placeholder="Aren Shoulder Bag" />
        </label>

        <label className={styles.field}>
          <span>날짜</span>
          <input placeholder="2026.08.17" />
        </label>

        <label className={styles.memo}>
          <span>추억 기록</span>
          <textarea maxLength={300} placeholder="제품과 함께한 순간을 적어보세요." />
          <small>0/300</small>
        </label>

        <div className={styles.mediaButtons}>
          <button type="button">카메라</button>
          <button type="button">앨범</button>
        </div>
      </form>
    </section>
  );
}
