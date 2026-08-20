import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {ProfileBottomSheet} from "@/components";
import {PRODUCT_REGISTERED_STORAGE_KEY, PRODUCT_WRITTEN_STORAGE_KEY} from "@/constants/productRegistration";

import styles from "./index.module.scss";

export function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasRegisteredProduct, setHasRegisteredProduct] = useState(false);
  const [hasWrittenProduct, setHasWrittenProduct] = useState(false);

  useEffect(() => {
    setHasRegisteredProduct(window.localStorage.getItem(PRODUCT_REGISTERED_STORAGE_KEY) === "true");
    setHasWrittenProduct(window.localStorage.getItem(PRODUCT_WRITTEN_STORAGE_KEY) === "true");
  }, []);

  const homeImage = !hasRegisteredProduct
    ? "/home-new-clean.svg?v=home-new-20260821-no-write-icon"
    : hasWrittenProduct
      ? "/home-registered-clean.svg?v=20260821-written"
      : "/home-registered-before-written.svg?v=20260821-before-written";

  return (
    <section className={styles.page} aria-label="home page" data-has-registered-product={hasRegisteredProduct}>
      <img
        className={styles.reference}
        src={homeImage}
        alt=""
        aria-hidden="true"
      />
      <button
        className={styles.profileHotspot}
        type="button"
        aria-label="프로필 메뉴 열기"
        onClick={() => setIsProfileOpen(true)}
      />
      {hasRegisteredProduct && <Link className={styles.writeHotspot} to="/product-write" aria-label="글쓰기" />}
      {hasRegisteredProduct ? (
        <Link
          className={`${styles.productAddHotspot} ${styles.firstProductAddHotspot}`}
          to="/product-detail"
          state={{returnTo: "/home"}}
          aria-label="등록된 제품 상세 보기"
        />
      ) : (
        <>
          <Link className={`${styles.productAddHotspot} ${styles.firstProductAddHotspot}`} to="/product-add" state={{returnTo: "/home"}} aria-label="첫 번째 제품 QR 등록" />
          <Link className={`${styles.productAddHotspot} ${styles.secondProductAddHotspot}`} to="/product-add" state={{returnTo: "/home"}} aria-label="두 번째 제품 QR 등록" />
          <Link className={`${styles.productAddHotspot} ${styles.thirdProductAddHotspot}`} to="/product-add" state={{returnTo: "/home"}} aria-label="세 번째 제품 QR 등록" />
        </>
      )}
      <Link className={styles.dogHotspot} to="/dog-detail" aria-label="강아지 상세 화면 보기" />
      <Link
        className={styles.productHotspot}
        to="/my-products"
        aria-label="Go to my products"
      />
      {isProfileOpen && <ProfileBottomSheet onClose={() => setIsProfileOpen(false)} />}
    </section>
  );
}
