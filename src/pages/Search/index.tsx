import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {ProfileBottomSheet, ProfileHotspot} from "@/components";
import {PRODUCT_REGISTERED_STORAGE_KEY, PRODUCT_WRITTEN_STORAGE_KEY} from "@/constants/productRegistration";

import styles from "./index.module.scss";

export function Search() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasRegisteredProduct, setHasRegisteredProduct] = useState(false);
  const [hasWrittenProduct, setHasWrittenProduct] = useState(false);

  useEffect(() => {
    setHasRegisteredProduct(window.localStorage.getItem(PRODUCT_REGISTERED_STORAGE_KEY) === "true");
    setHasWrittenProduct(window.localStorage.getItem(PRODUCT_WRITTEN_STORAGE_KEY) === "true");
  }, []);

  const ownedProductsImage = hasRegisteredProduct
    ? hasWrittenProduct
      ? "/search-owned-products.svg?v=20260821-labels"
      : "/search-owned-products-before-written.svg?v=20260821-before-written"
    : "/search-owned-products-empty.svg?v=20260821-labels";

  return (
    <section className={styles.page} aria-label="search page">
      <img
        className={styles.ownedProductsSvg}
        src={ownedProductsImage}
        alt=""
        aria-hidden="true"
      />
      <img
        className={styles.memoriesSvg}
        src="/search-memories-clean.svg?v=20260821-labels"
        alt=""
        aria-hidden="true"
      />
      <img className={styles.headerSvg} src="/search-header-compact.svg?v=20260820-profile" alt="" aria-hidden="true" />

      <label className={styles.searchHotspot}>
        <input type="search" aria-label="검색어 입력" placeholder="제품, 추억, 스토어 등" data-hide-hotspot="true" />
      </label>

      <ProfileHotspot onClick={() => setIsProfileOpen(true)} />
      <Link className={styles.ownedTitleHotspot} to="/my-products" aria-label="나의 컬렉션으로 이동" />
      <Link className={styles.memoryTitleHotspot} to="/map" aria-label="에피소드로 이동" />
      {hasRegisteredProduct && <Link className={styles.firstProductHotspot} to="/product-detail" aria-label="Stark 사이드 스터드 비세토스 백팩 상세 보기" />}
      <Link
        className={styles.firstMemoryHotspot}
        to="/product-photo"
        state={{initialLiked: true}}
        aria-label="첫 번째 에피소드 상세 보기"
      />
      {isProfileOpen && <ProfileBottomSheet onClose={() => setIsProfileOpen(false)} />}
    </section>
  );
}
