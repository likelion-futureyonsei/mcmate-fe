import {Link} from "react-router-dom";

import {BackButton} from "@/components/BackButton";
import gallery1 from "@/assets/images/product-detail-gallery-1.png";
import gallery2 from "@/assets/images/product-detail-gallery-2.png";
import gallery3 from "@/assets/images/product-detail-gallery-3.png";
import gallery4 from "@/assets/images/product-detail-gallery-4.png";
import gallery5 from "@/assets/images/product-detail-gallery-5.png";
import mainProduct from "@/assets/images/product-detail-main.png";
import thumb1 from "@/assets/images/product-detail-thumb-1.png";
import thumb2 from "@/assets/images/product-detail-thumb-2.png";
import thumb3 from "@/assets/images/product-detail-thumb-3.png";
import thumb4 from "@/assets/images/product-detail-thumb-4.png";
import thumb5 from "@/assets/images/product-detail-thumb-5.png";

import styles from "./index.module.scss";

const BackIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="22" cy="22" r="22" fill="white" fillOpacity="0.1" />
    <path d="M15 22.5C15 22.7999 15.1227 23.0725 15.3407 23.3042L23.764 31.6729C23.9684 31.891 24.2547 32 24.5682 32C25.2088 32 25.6858 31.523 25.6858 30.8824C25.6858 30.5689 25.5631 30.2963 25.3587 30.0782L17.7532 22.5L25.3587 14.9218C25.5631 14.7037 25.6858 14.4175 25.6858 14.1176C25.6858 13.477 25.2088 13 24.5682 13C24.2547 13 23.9684 13.109 23.764 13.3271L15.3407 21.6958C15.1227 21.9275 15 22.2001 15 22.5Z" fill="black" />
  </svg>
);

const DetailActionIcon = () => (
  <svg width="157" height="44" viewBox="0 0 157 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="157" height="44" rx="21" fill="#EEEEEF" fillOpacity="0.7" />
    <path d="M128.266 29.2608H139.803C140.355 29.2608 140.796 28.8197 140.796 28.2545C140.796 27.7031 140.355 27.262 139.803 27.262H128.266C127.714 27.262 127.273 27.7031 127.273 28.2545C127.273 28.8197 127.714 29.2608 128.266 29.2608Z" fill="black" />
    <path d="M126.157 23.6229H141.912C142.464 23.6229 142.905 23.1818 142.905 22.6304C142.905 22.0791 142.464 21.638 141.912 21.638H126.157C125.605 21.638 125.164 22.0791 125.164 22.6304C125.164 23.1818 125.605 23.6229 126.157 23.6229Z" fill="black" />
    <path d="M123.992 17.9988H144.008C144.573 17.9988 145 17.5577 145 17.0063C145 16.4411 144.573 16 144.008 16H123.992C123.441 16 123 16.4411 123 17.0063C123 17.5577 123.441 17.9988 123.992 17.9988Z" fill="black" />
    <path d="M27.9736 14.0403C28.2017 14.0403 28.4215 14.0509 28.6328 14.0716L26.7959 15.9124H18.3154C16.7557 15.9125 15.8848 16.796 15.8848 18.3558V28.0013C15.8849 29.5608 16.7558 30.4446 18.3154 30.4446H27.9736C29.5334 30.4446 30.4042 29.5609 30.4043 28.0013V19.6019L32.2607 17.7405C32.2786 17.9383 32.2891 18.1433 32.2891 18.3558V28.0013C32.2889 30.7828 30.7423 32.3167 27.9736 32.3167H18.3154C15.5469 32.3166 14.0001 30.7827 14 28.0013V18.3558C14 15.5741 15.5468 14.0404 18.3154 14.0403H27.9736Z" fill="black" />
    <path d="M20.8634 25.8042L22.9952 24.8943L32.5103 15.3792L30.9765 13.8843L21.4744 23.3864L20.5125 25.4402C20.4215 25.6352 20.6424 25.8952 20.8634 25.8042ZM33.3033 14.5862L34.0832 13.7933C34.4342 13.4164 34.4342 12.8704 34.0832 12.5195L33.7972 12.2335C33.4593 11.8955 32.9133 11.9345 32.5753 12.2855L31.7824 13.0654L33.3033 14.5862Z" fill="black" />
    <path d="M78.1963 15.7647V17.6436H76.3311C74.7657 17.6436 73.8789 18.5307 73.8789 20.083V28.001C73.8789 29.5664 74.7657 30.4531 76.3311 30.4531H86.0234C87.5888 30.4531 88.4765 29.5664 88.4766 28.001V20.083C88.4766 18.5306 87.5888 17.6436 86.0234 17.6436H84.1455V15.7647H86.0234C88.802 15.7647 90.3545 17.3044 90.3545 20.083V28.001C90.3545 30.7796 88.802 32.332 86.0234 32.332H76.3311C73.5525 32.332 72 30.7796 72 28.001V20.083C72 17.3044 73.5525 15.7647 76.3311 15.7647H78.1963Z" fill="black" />
    <path d="M77.7317 13.9441C77.9535 13.9441 78.2144 13.8528 78.371 13.6701L79.819 12.1047L81.1887 10.6306L82.5715 12.1047L84.0065 13.6701C84.176 13.8528 84.4108 13.9441 84.6456 13.9441C85.1283 13.9441 85.4936 13.6049 85.4936 13.1353C85.4936 12.8744 85.3892 12.6918 85.2196 12.5091L81.8671 9.31308C81.6322 9.07827 81.4366 8.99998 81.1887 8.99998C80.9539 8.99998 80.7582 9.07827 80.5103 9.31308L77.1708 12.5091C76.9882 12.6918 76.8969 12.8744 76.8969 13.1353C76.8969 13.6049 77.2491 13.9441 77.7317 13.9441ZM81.1887 24.1714C81.6975 24.1714 82.1279 23.754 82.1279 23.2713V13.0961L81.9714 10.1349C81.9453 9.70442 81.6192 9.35221 81.1887 9.35221C80.7713 9.35221 80.4451 9.70442 80.419 10.1349L80.2625 13.0961V23.2713C80.2625 23.754 80.693 24.1714 81.1887 24.1714Z" fill="black" />
  </svg>
);

const thumbnails = [thumb1, thumb2, thumb3, thumb4, thumb5];
const gallery = [gallery1, gallery2, gallery3, gallery4, gallery5];

export function ProductDetail() {
  return (
    <section className={styles.page} aria-label="product detail page">
      <BackButton className={styles.back}>
        <BackIcon />
      </BackButton>

      <div className={styles.actions} aria-label="product actions">
        <DetailActionIcon />
        <Link to="/product-write" className={styles.writeHotspot} aria-label="글쓰기" />
        <button className={styles.shareHotspot} type="button" aria-label="공유하기" />
        <button className={styles.menuHotspot} type="button" aria-label="메뉴" />
      </div>

      <img className={styles.mainProduct} src={mainProduct} alt="Stark 사이드 스터드 비세토스 백팩" />

      <div className={styles.info}>
        <h1>Stark 사이드 스터드<br />비세토스 백팩</h1>
        <p>MCM</p>
        <span className={styles.progress}><span className={styles.boxIcon} />5/50</span>
      </div>

      <div className={styles.thumbStrip} aria-label="제품 사진 미리보기">
        {thumbnails.map((image, index) => (
          <img key={image} className={`${styles.thumb} ${styles[`thumb${index + 1}`]}`} src={image} alt="" />
        ))}
        <span className={styles.thumbFade} aria-hidden="true" />
      </div>

      <div className={styles.gallery} aria-label="추억 사진 목록">
        {gallery.map((image, index) => {
          const className = `${styles.galleryImage} ${styles[`gallery${index + 1}`]}`;

          if (index === 2) {
            return <Link key={image} to="/product-photo" className={className} aria-label="캐리어 추억 사진 보기"><img src={image} alt="캐리어 추억 사진" /></Link>;
          }

          return <img key={image} className={className} src={image} alt="" />;
        })}
      </div>
    </section>
  );
}


