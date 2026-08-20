import {useState} from "react";
import {Link, useLocation} from "react-router-dom";

import styles from "./index.module.scss";

type ProductAddStep = "scan" | "registered";
type ProductAddLocationState = {
  returnTo?: string;
};

type ProductDetailRegistrationState = {
  didRegisterProduct: true;
  returnTo: string;
};

export function ProductAdd() {
  const [step, setStep] = useState<ProductAddStep>("scan");
  const {state} = useLocation();
  const returnTo = (state as ProductAddLocationState | null)?.returnTo ?? "/my-products";

  return (
    <section className={styles.page} aria-label="product add page">
      <Link to={returnTo} className={styles.close} aria-label="닫기">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
          <circle cx="22" cy="22" r="22" fill="white" fillOpacity="0.5" />
          <path
            d="M28.2518 14.2914L14.2914 28.2517C13.9093 28.6339 13.8965 29.309 14.2914 29.7038C14.699 30.0987 15.3613 30.0987 15.7562 29.7038L29.7039 15.7562C30.0987 15.3613 30.1115 14.6862 29.7039 14.2914C29.2962 13.9093 28.6466 13.8965 28.2518 14.2914ZM29.7039 28.2517L15.7562 14.2914C15.3613 13.9093 14.6862 13.8965 14.2914 14.2914C13.9093 14.699 13.9093 15.3613 14.2914 15.7562L28.2518 29.7038C28.6339 30.0987 29.309 30.0987 29.7039 29.7038C30.0987 29.2962 30.0987 28.6339 29.7039 28.2517Z"
            fill="black"
          />
        </svg>
      </Link>

      <p className={styles.scanInstruction}>QR코드를 스캔하여 제품을 등록하세요</p>

      <svg className={styles.scanFrame} width="200" height="201" viewBox="0 0 200 201" fill="none" aria-hidden="true">
        <path
          d="M0 58.7262C0 60.3996 1.35624 61.8852 3.15893 61.8852C4.84226 61.8852 6.31791 60.3996 6.31791 58.7262V36.9851C6.31791 17.3512 17.2121 6.32765 36.8557 6.32765H58.7555C60.4289 6.32765 61.7852 4.97138 61.7852 3.16868C61.7852 1.48564 60.4289 0 58.7555 0H36.8557C13.241 0 0 13.3897 0 36.9851V58.7262ZM200 58.7262V36.9851C200 13.3897 186.889 0 163.154 0H141.374C139.571 0 138.215 1.48564 138.215 3.16868C138.215 4.97138 139.571 6.32765 141.374 6.32765H163.154C182.797 6.32765 193.811 17.3512 193.811 36.9851V58.7262C193.811 60.3996 195.168 61.8852 196.841 61.8852C198.644 61.8852 200 60.3996 200 58.7262ZM0 141.423V163.154C0 186.759 13.241 200.139 36.8557 200.139H58.7555C60.4289 200.139 61.7852 198.653 61.7852 196.98C61.7852 195.168 60.4289 193.811 58.7555 193.811H36.8557C17.2121 193.811 6.31791 182.788 6.31791 163.154V141.423C6.31791 139.739 4.84226 138.254 3.15893 138.254C1.35624 138.254 0 139.739 0 141.423ZM200 141.423C200 139.739 198.644 138.254 196.841 138.254C195.168 138.254 193.811 139.739 193.811 141.423V163.154C193.811 182.788 182.797 193.811 163.154 193.811H141.374C139.571 193.811 138.215 195.168 138.215 196.98C138.215 198.653 139.571 200.139 141.374 200.139H163.154C186.889 200.139 200 186.759 200 163.154V141.423Z"
          fill="black"
        />
      </svg>

      <button className={styles.lightToggle} type="button" aria-label="라이트 켜기">
        <span className={styles.lightIcon}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
            <circle cx="22" cy="22" r="22" fill="white" fillOpacity="0.5" />
            <path
              d="M17 12.2667H26.6119V11.9571C26.6119 10.6441 25.9802 10 24.7044 10H18.9075C17.6441 10 17 10.6441 17 11.9571V12.2667ZM20.8894 33.1132H22.7226C23.986 33.1132 24.6301 32.4691 24.6301 31.1561V19.7729C24.6301 18.6953 24.8778 17.9645 25.2618 17.37L25.8192 16.5029C26.2899 15.7597 26.6119 15.1156 26.6119 14.2486V13.4806H17V14.2486C17 15.1156 17.3221 15.7597 17.7927 16.5029L18.3501 17.37C18.7341 17.9645 18.9818 18.6953 18.9818 19.7729V31.1561C18.9818 32.4691 19.6259 33.1132 20.8894 33.1132ZM20.0595 20.7515C20.0595 19.7729 20.8274 19.0174 21.8184 19.0174C22.7845 19.0174 23.5525 19.7729 23.5525 20.7515V23.749C23.5525 24.7275 22.7845 25.4831 21.8184 25.4831C20.8274 25.4831 20.0595 24.7275 20.0595 23.749V20.7515ZM21.8184 24.8762C22.4624 24.8762 22.9331 24.4055 22.9331 23.749C22.9331 23.1297 22.4253 22.6342 21.8184 22.6342C21.1866 22.6342 20.6788 23.1297 20.6788 23.749C20.6788 24.4055 21.1619 24.8762 21.8184 24.8762Z"
              fill="black"
            />
          </svg>
        </span>
        <span>라이트 켜기</span>
      </button>

      <Link to="/number-input" state={{returnTo}} className={styles.numberShortcut} aria-label="번호입력">
        <img className={styles.numberArtwork} src="/product-add-number-input.svg?v=20260821" alt="" aria-hidden="true" />
      </Link>

      {step === "registered" ? (
        <div className={`${styles.sheet} ${styles.registeredSheet}`} aria-label="등록 완료 정보">
          <img src="/product-add-registered-sheet.svg?v=20260821" alt="" aria-hidden="true" />
          <Link
            className={styles.registerHotspot}
            to="/product-detail"
            state={{didRegisterProduct: true, returnTo} satisfies ProductDetailRegistrationState}
            aria-label="등록하기"
          />
        </div>
      ) : (
        <div className={`${styles.sheet} ${styles.readySheet}`}>
          <img src="/product-add-ready-sheet.svg?v=20260821" alt="" aria-hidden="true" />
          <button className={styles.registerHotspot} type="button" aria-label="등록하기" onClick={() => setStep("registered")} />
        </div>
      )}
    </section>
  );
}
