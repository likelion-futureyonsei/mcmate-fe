import {useState} from "react";
import {Link} from "react-router-dom";

import {ProfileBottomSheet, ProfileHotspot} from "@/components";

import styles from "./index.module.scss";

export function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <section className={styles.page} aria-label="home page">
      <img className={styles.reference} src="/ref-home-new-clean.svg?v=home-20260820-dog-box" alt="" aria-hidden="true" />
      <img className={styles.dogBox} src="/home-dog-box.svg" alt="" aria-hidden="true" />
      <ProfileHotspot onClick={() => setIsProfileOpen(true)} />
      <Link className={styles.dogHotspot} to="/dog-detail" aria-label="강아지 상세 화면 보기" />
      <Link className={styles.writeHotspot} to="/product-write" aria-label="글쓰기" />
      <Link className={styles.firstProductCardHotspot} to="/product-detail" aria-label="첫 번째 제품 상세 보기" />
      <Link
        className={styles.productHotspot}
        to="/my-products"
        aria-label="Go to my products"
      />
      {isProfileOpen && <ProfileBottomSheet onClose={() => setIsProfileOpen(false)} />}
    </section>
  );
}
