import {Link} from "react-router-dom";

import {BackButton} from "@/components/BackButton";

import styles from "./index.module.scss";

const BackIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="22" cy="22" r="22" fill="white" fillOpacity="0.1" />
    <path d="M15 22.5C15 22.7999 15.1227 23.0725 15.3407 23.3042L23.764 31.6729C23.9684 31.891 24.2547 32 24.5682 32C25.2088 32 25.6858 31.523 25.6858 30.8824C25.6858 30.5689 25.5631 30.2963 25.3587 30.0782L17.7532 22.5L25.3587 14.9218C25.5631 14.7037 25.6858 14.4175 25.6858 14.1176C25.6858 13.477 25.2088 13 24.5682 13C24.2547 13 23.9684 13.109 23.764 13.3271L15.3407 21.6958C15.1227 21.9275 15 22.2001 15 22.5Z" fill="black" />
  </svg>
);

const ActionIcon = () => (
  <svg width="100" height="44" viewBox="0 0 100 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="100" height="44" rx="21" fill="#EEEEEF" fillOpacity="0.7" />
    <path d="M20.8853 30.8853V15.1147C20.8853 14.5229 21.3807 14 21.9863 14C22.5918 14 23.101 14.5229 23.101 15.1147V30.8853C23.101 31.4771 22.5918 32 21.9863 32C21.3807 32 20.8853 31.4771 20.8853 30.8853ZM29.8716 24.1147H14.101C13.5092 24.1147 13 23.6055 13 23C13 22.3945 13.5092 21.8853 14.101 21.8853H29.8716C30.4771 21.8853 30.9863 22.3945 30.9863 23C30.9863 23.6055 30.4771 24.1147 29.8716 24.1147Z" fill="black" />
    <path d="M71.2656 29.2608H82.8032C83.3546 29.2608 83.7957 28.8197 83.7957 28.2545C83.7957 27.7031 83.3546 27.262 82.8032 27.262H71.2656C70.7142 27.262 70.2731 27.7031 70.2731 28.2545C70.2731 28.8197 70.7142 29.2608 71.2656 29.2608Z" fill="black" />
    <path d="M69.1567 23.6229H84.9123C85.4637 23.6229 85.9048 23.1818 85.9048 22.6304C85.9048 22.0791 85.4637 21.638 84.9123 21.638H69.1567C68.6053 21.638 68.1642 22.0791 68.1642 22.6304C68.1642 23.1818 68.6053 23.6229 69.1567 23.6229Z" fill="black" />
    <path d="M66.9925 17.9988H87.0075C87.5727 17.9988 88 17.5577 88 17.0063C88 16.4411 87.5727 16 87.0075 16H66.9925C66.4411 16 66 16.4411 66 17.0063C66 17.5577 66.4411 17.9988 66.9925 17.9988Z" fill="black" />
  </svg>
);

export function MyProducts() {
  return (
    <section className={styles.page} aria-label="my products page">
      <img className={styles.reference} src="/my-products-reference.svg" alt="" aria-hidden="true" />

      <BackButton className={styles.back}>
        <BackIcon />
      </BackButton>

      <div className={styles.actions} aria-label="product actions">
        <ActionIcon />
        <Link to="/product-add" className={styles.addHotspot} aria-label="제품 추가" />
        <button className={styles.menuHotspot} type="button" aria-label="메뉴" />
      </div>

      <Link className={`${styles.productLink} ${styles.backpackLink}`} to="/product-detail" aria-label="Stark 사이드 스터드 비세토스 백팩 상세 보기" />
    </section>
  );
}
