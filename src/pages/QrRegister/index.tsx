import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import {ApiError, errorMessage, registerProduct, type Product} from "@/api";
import {
  IconClose,
  IconFlashlight,
  IconKeypad,
  IconQrFrame,
} from "@/assets/icons";
import {useAuth} from "@/auth";
import {GlassButton, Screen, TopBar} from "@/components";
import {useAsync} from "@/hooks/useAsync";
import {
  deriveSerial,
  parseCode,
  productThumbImage,
  resolveCatalogue,
  scanVideo,
} from "@/lib";
import {LoadingScreen} from "@/pages/Loading/LoadingScreen";

import styles from "./index.module.scss";

export function QrRegister() {
  const navigate = useNavigate();
  const {user} = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Candidates come from `GET /recommend`, the only route that returns catalogue
   * products — the API has no code-to-product lookup.
   */
  const catalogue = useAsync(
    () => resolveCatalogue(user?.character?.id ?? null),
    [user?.character?.id],
  );

  const [scannedId, setScannedId] = useState<number | null>(null);
  const [serialNo, setSerialNo] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const candidates = catalogue.data ?? [];
  const scanned: Product | null =
    candidates.find((item) => item.id === scannedId) ?? candidates[0] ?? null;

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !navigator.mediaDevices?.getUserMedia) {
      return;
    }

    let stream: MediaStream | null = null;
    let cancelled = false;
    let stopScanning: (() => void) | null = null;

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

        stopScanning = scanVideo(video, (raw) => {
          const code = parseCode(raw);
          setScannedId(code.productId);
          setSerialNo(code.serialNo);
        });
      } catch {
        stream?.getTracks().forEach((track) => track.stop());
      }
    };

    void startCamera();

    return () => {
      cancelled = true;
      stopScanning?.();
      stream?.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    };
  }, []);

  const register = async () => {
    if (saving) {
      return;
    }

    if (!scanned) {
      setStatus("등록할 제품을 확인할 수 없습니다. 번호 입력을 이용해 주세요.");
      return;
    }

    setSaving(true);
    setStatus(null);

    try {
      await registerProduct(scanned.id, serialNo ?? deriveSerial(scanned));
      // The shelf is the payoff of registering, so that is where this lands.
      navigate("/", {replace: true});
    } catch (cause) {
      // 409 covers "already yours" and "owned by somebody else".
      setStatus(
        cause instanceof ApiError ? cause.message : errorMessage(cause),
      );
      setSaving(false);
    }
  };

  if (saving) {
    return <LoadingScreen label="제품 등록 중..." />;
  }

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
          <img
            className={styles.thumb}
            src={scanned ? productThumbImage(scanned) : undefined}
            alt=""
          />

          <div className={styles.info}>
            <p className={styles.name}>
              {status ??
                scanned?.name ??
                (catalogue.pending
                  ? "제품 정보 확인 중..."
                  : "제품 정보를 확인할 수 없습니다")}
            </p>
            <div className={styles.specs}>
              <p>
                <span className={styles.specLabel}>색상: </span>
                <span className={styles.specValue}>
                  {scanned?.color || "-"}
                </span>
              </p>
              <p>
                <span className={styles.specLabel}>패턴: </span>
                <span className={styles.specValue}>
                  {scanned?.pattern || "-"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.submit}
          onClick={() => void register()}
        >
          등록하기
        </button>
      </div>
    </Screen>
  );
}
