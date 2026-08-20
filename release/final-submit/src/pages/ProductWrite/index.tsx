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
import {BackButton} from "@/components/BackButton";
import {PRODUCT_WRITTEN_STORAGE_KEY} from "@/constants/productRegistration";

import styles from "./index.module.scss";

export function ProductWrite() {
  const handleComplete = () => {
    window.localStorage.setItem(PRODUCT_WRITTEN_STORAGE_KEY, "true");
  };

  return (
    <section className={styles.page} aria-label="product write page">
      <div className={styles.topActions}>
        <BackButton id={styles.prev}>
          <IconPrev />
        </BackButton>
        <Link to="/product-photo" replace aria-label="완료" onClick={handleComplete}>
          <IconCheck />
        </Link>
      </div>

      <form className={styles.form}>
        <div className={styles.photoBox}>
          <span className="typo-h4">사진 추가</span>
          <input id="product-camera-input" type="file" accept="image/*" capture="environment" />
          <input id="product-gallery-input" type="file" accept="image/*" />
          <div>
            <label className={styles.mediaButton} htmlFor="product-camera-input" aria-label="카메라">
              <IconCamera />
            </label>
            <label className={styles.mediaButton} htmlFor="product-gallery-input" aria-label="갤러리">
              <IconGallery />
            </label>
          </div>
        </div>

        <div className={styles.place}>
          <label className={styles.placeField}>
            <IconPin />
            <input className="typo-h4" placeholder="서울특별시" />
          </label>
          <div className={styles.locationToggle}>
            <span className="typo-h5">위치 정보</span>
            <label className={styles.radio} aria-label="위치 정보 사용">
              <input type="checkbox" defaultChecked />
              <IconCheckBtn />
            </label>
          </div>
        </div>

        <label className={styles.dateField}>
          <IconDate />
          <input className="typo-h4" placeholder="2026.08.21" />
        </label>

        <label className={styles.memo}>
          <textarea maxLength={300} className="typo-h5" placeholder="제품과 함께한 순간을 적어보세요." />
          <small className="typo-h5">0/300</small>
        </label>
      </form>
    </section>
  );
}
