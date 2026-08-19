import {useState} from "react";
import {Link} from "react-router-dom";

import {ProfileBottomSheet, ProfileHotspot} from "@/components";

import styles from "./index.module.scss";

export function Search() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <section className={styles.page} aria-label="search page">
      <img className={styles.ownedProductsSvg} src="/search-owned-products.svg" alt="" aria-hidden="true" />
      <img className={styles.memoriesSvg} src="/search-memories-clean.svg" alt="" aria-hidden="true" />
      <img className={styles.headerSvg} src="/search-header-compact.svg?v=20260820-profile" alt="" aria-hidden="true" />

      <label className={styles.searchHotspot}>
        <input type="search" aria-label="검색어 입력" placeholder="제품, 추억, 스토어 등" data-hide-hotspot="true" />
      </label>

      <ProfileHotspot onClick={() => setIsProfileOpen(true)} />
      <Link className={styles.ownedTitleHotspot} to="/my-products" aria-label="나의 제품으로 이동" />
      <Link className={styles.firstProductHotspot} to="/product-detail" aria-label="Stark 사이드 스터드 비세토스 백팩 상세 보기" />
      <Link className={styles.memoryTitleHotspot} to="/map" aria-label="지도로 이동" />
      <Link className={styles.firstMemoryHotspot} to="/product-photo" aria-label="첫 번째 추억 상세 보기" />
      {isProfileOpen && <ProfileBottomSheet onClose={() => setIsProfileOpen(false)} />}
    </section>
  );
}
