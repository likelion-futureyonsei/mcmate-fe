import {Link} from "react-router-dom";
import {
  IconCamera,
  IconCheck,
  IconCheckBtn,
  IconDate,
  IconGallery,
  IconPin,
  IconPrev,
} from "@/assets/icons";

import styles from "./index.module.scss";

export function ProductWrite() {
  return (
    <section aria-label="product write page">
      <div className={styles.topActions}>
        <Link id={styles.prev} to="/product-detail" aria-label="뒤로가기">
          <IconPrev />
        </Link>
        <Link to="/product-detail" aria-label="완료">
          <IconCheck />
        </Link>
      </div>

      <form className={`mt-md`}>
        <label className={`${styles.photoBox} mb-lg`}>
          <span className={`typo-h4`}>사진 추가</span>
          <input type="file" accept="image/*" />
          <div>
            <button>
              <IconCamera />
            </button>
            <button>
              <IconGallery />
            </button>
          </div>
        </label>

        <div className={styles.place}>
          <label className={`${styles.field} mb-lg mr-xl`}>
            <IconPin />
            <input className={`typo-h4`} placeholder="서울시" />
          </label>
          <label className={`${styles.radio} mb-lg`}>
            <span className={`typo-h5`}>위치 정보</span>
            <input type="checkbox" defaultChecked />
            <IconCheckBtn />
          </label>
        </div>

        <label className={`${styles.field} mb-lg`}>
          <IconDate />
          <input className={`typo-h4`} placeholder="2026.08.17" />
        </label>

        <label className={styles.memo}>
          <textarea
            maxLength={300}
            className={`typo-h5`}
            placeholder="제품과 함께한 순간을 적어보세요."
          />
          <small className={`typo-h5`}>0/300</small>
        </label>
      </form>
    </section>
  );
}
