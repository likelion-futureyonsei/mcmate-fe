import {Link} from "react-router-dom";

import styles from "./index.module.scss";

export function NumberInput() {
  return (
    <section className={styles.page} aria-label="number input page">
      <div className={styles.topActions}>
        <Link to="/product-add" className={styles.close} aria-label="닫기" />
      </div>

      <article className={styles.copy}>
        <h1>제품 번호를 입력하세요</h1>
        <p>제품 내부 라벨 또는 보증 카드에 있는 번호를 입력해 주세요.</p>
      </article>

      <form className={styles.form}>
        <label>
          <span>제품 번호</span>
          <input autoFocus placeholder="예: MCM-2026-0001" />
        </label>
        <Link to="/my-products">등록하기</Link>
      </form>

      <div className={styles.keyboard} aria-hidden="true">
        {"qwertyuiopasdfghjklzxcvbnm".split("").map((key) => (
          <span key={key}>{key}</span>
        ))}
      </div>
    </section>
  );
}
