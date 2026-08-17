import {Link} from "react-router-dom";

import styles from "./index.module.scss";
import {Logo} from "@/assets/images";

export function Home() {
  return (
    <section className={styles.page} aria-label="home page">
      <header className={styles.brand}>
        <img src={Logo} alt="" />
      </header>

      <div className={styles.hero}>
        <p className={styles.eyebrow}>My Archive</p>
        <h1>나의 MCM을 기록하고 확인하세요</h1>
      </div>

      <Link className={styles.productCard} to="/my-products">
        <div className={styles.bagPreview}>
          <span className={styles.handle} />
          <span className={styles.body} />
          <span className={styles.badge}>MCM</span>
        </div>
        <div className={styles.productInfo}>
          <strong>나의 제품</strong>
          <span>72/280</span>
        </div>
      </Link>

      <div className={styles.summary}>
        <article>
          <strong>17</strong>
          <span>추억</span>
        </article>
        <article>
          <strong>5</strong>
          <span>등록 대기</span>
        </article>
      </div>
    </section>
  );
}
