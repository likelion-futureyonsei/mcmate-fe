import {useEffect, useRef} from "react";
import {Link} from "react-router-dom";

import {
  IconClose,
  IconFlashlight,
  IconKeypad,
  IconQrFrame,
} from "@/assets/icons";
import {Swatch1} from "@/assets/images";
import {GlassButton, Screen, TopBar} from "@/components";

import styles from "./index.module.scss";

/** Product resolved from the scanned code. */
const scanned = {
  name: "Stark 사이드 스터드 비세토스 백팩",
  thumb: Swatch1,
  color: "Cognac",
  size: "M",
};

export function QrRegister() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !navigator.mediaDevices?.getUserMedia) {
      return;
    }

    let stream: MediaStream | null = null;
    let cancelled = false;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {facingMode: {ideal: "environment"}},
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        video.srcObject = stream;
        await video.play();
      } catch {
        stream?.getTracks().forEach((track) => track.stop());
      }
    };

    void startCamera();

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    };
  }, []);

  return (
    <Screen
      label="제품 QR 등록"
      background={null}
      flush
      className={styles.page}
    >
      <video
        ref={videoRef}
        className={styles.camera}
        autoPlay
        muted
        playsInline
        aria-hidden="true"
      />

      <TopBar
        className={styles.topBar}
        hideBack
        actions={
          <GlassButton label="닫기" tint="strong" to="/my-products">
            <IconClose className={styles.closeIcon} />
          </GlassButton>
        }
      />

      <h1 className={styles.title}>QR코드를 스캔하여 제품을 등록하세요</h1>

      <IconQrFrame className={styles.viewfinder} />

      <div className={`${styles.action} ${styles.light}`}>
        <GlassButton label="라이트 켜기" tint="veil">
          <IconFlashlight className={styles.flashIcon} />
        </GlassButton>
        <span className={styles.actionLabel}>라이트 켜기</span>
      </div>

      <div className={`${styles.action} ${styles.manual}`}>
        <GlassButton label="번호 입력" to="/number-input" tint="strong">
          <IconKeypad className={styles.keypadIcon} />
        </GlassButton>
        <span className={styles.actionLabel}>번호 입력</span>
      </div>

      <div className={styles.sheet}>
        <span className={styles.handle} aria-hidden="true" />

        <div className={styles.product}>
          <img className={styles.thumb} src={scanned.thumb} alt="" />

          <div className={styles.info}>
            <p className={styles.name}>{scanned.name}</p>
            <div className={styles.specs}>
              <p>
                <span className={styles.specLabel}>색상: </span>
                <span className={styles.specValue}>{scanned.color}</span>
              </p>
              <p>
                <span className={styles.specLabel}>사이즈: </span>
                <span className={styles.specValue}>{scanned.size}</span>
              </p>
            </div>
          </div>
        </div>

        <Link to="/my-products" className={styles.submit}>
          등록하기
        </Link>
      </div>
    </Screen>
  );
}
