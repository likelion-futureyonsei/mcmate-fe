import {Link} from "react-router-dom";

import styles from "./index.module.scss";

const products = [
  {id: "aren", name: "Aren Shoulder Bag", progress: "5/50", tone: "black"},
  {id: "stark", name: "Stark Backpack", progress: "3/50", tone: "tan"},
  {id: "tracy", name: "Tracy Crossbody", progress: "35/100", tone: "green"},
  {id: "liz", name: "Liz Shopper", progress: "17/50", tone: "red"},
];

export function MyProducts() {
  return (
    <section className={styles.page} aria-label="my products page">
      <div className={styles.topActions}>
        <Link to="/" className={styles.back} aria-label="뒤로가기" />
        <Link to="/product-add" className={styles.add} aria-label="제품 추가">
          +
        </Link>
      </div>

      <h1>나의 제품</h1>
      <p className={styles.count}>72/280</p>

      <div className={styles.collage} aria-hidden="true">
        <span className={styles.photoA} />
        <span className={styles.photoB} />
        <span className={styles.photoC} />
        <span className={styles.photoD} />
      </div>

      <div className={styles.list}>
        {products.map((product, index) => {
          const content = (
            <>
              <span className={`${styles.thumb} ${styles[product.tone]}`} />
              <span className={styles.meta}>
                <strong>{product.name}</strong>
                <small>{product.progress}</small>
              </span>
            </>
          );

          return index === 0 ? (
            <Link className={styles.row} key={product.id} to="/product-detail">
              {content}
            </Link>
          ) : (
            <button className={styles.row} key={product.id} type="button">
              {content}
            </button>
          );
        })}
      </div>
    </section>
  );
}
