import {useState} from "react";
import {Link} from "react-router-dom";

import {ProfileBottomSheet} from "@/components/ProfileBottomSheet";

import styles from "./index.module.scss";

export function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <section className={styles.page} aria-label="home page">
      <img className={styles.reference} src="/ref-home-new-clean.svg?v=home-20260817-clean" alt="" aria-hidden="true" />
      <button className={styles.profileHotspot} type="button" aria-label="프로필 메뉴 열기" onClick={() => setIsProfileOpen(true)} />
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
