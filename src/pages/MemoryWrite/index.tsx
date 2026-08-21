import {useEffect, useRef, useState, type CSSProperties} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import {
  createMemory,
  errorMessage,
  listMyProducts,
  uploadPhoto,
  type UserProduct,
} from "@/api";
import {
  IconCalendar,
  IconLocate,
  IconPhoto,
  IconPhotoLibrary,
  IconPinSlim,
  IconTick,
} from "@/assets/icons";
import {GlassButton, Screen, TopBar} from "@/components";
import {useAsync} from "@/hooks/useAsync";
import {DEFAULT_POSITION, currentPosition, shortDate} from "@/lib";
import {ErrorScreen, LoadingScreen} from "@/pages/Loading/LoadingScreen";

import styles from "./index.module.scss";

const NOTE_LIMIT = 300;

export function MemoryWrite() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const requested = params.get("product");

  const products = useAsync(() => listMyProducts(), []);

  const [place, setPlace] = useState("서울시");
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  /** `null` until located, so the seeded store is used as the fallback. */
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [locating, setLocating] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const albumInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);

  // The object URL has to be released or the blob leaks for the page's lifetime.
  useEffect(() => {
    if (!photo) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(photo);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const items: UserProduct[] = products.data?.items ?? [];
  const target =
    (requested
      ? items.find((item) => item.id === Number(requested))
      : items[0]) ?? items[0];

  const locate = async () => {
    setLocating(true);
    setPosition(await currentPosition());
    setLocating(false);
  };

  const save = async () => {
    if (saving) {
      return;
    }

    if (!target) {
      setStatus("등록된 제품이 없습니다. 제품을 먼저 등록해 주세요.");
      return;
    }

    setSaving(true);
    setStatus(null);

    try {
      // The photo is stored first; the memory only keeps the returned key.
      const uploaded = photo ? await uploadPhoto(photo) : null;

      const created = await createMemory({
        user_product_id: target.id,
        photo_key: uploaded?.key,
        lat: position.lat,
        lng: position.lng,
        place_name: place.trim(),
        note: note.trim(),
      });

      navigate(`/product-memories/${target.id}`, {
        replace: true,
        state: {unlocked: created.unlocked},
      });
    } catch (cause) {
      setStatus(errorMessage(cause));
      setSaving(false);
    }
  };

  if (products.pending) {
    return <LoadingScreen label="제품 확인 중..." />;
  }

  if (products.error) {
    return <ErrorScreen message={products.error} />;
  }

  if (saving) {
    // Creating a memory can unlock a chapter, and the server writes its story
    // inline, so this call is genuinely slow.
    return <LoadingScreen label="추억 저장 중..." />;
  }

  return (
    <Screen label="제품 추억 작성" className={styles.page}>
      <TopBar
        tint="solid"
        actions={
          <GlassButton
            label="작성 완료"
            tint="solid"
            onClick={() => void save()}
          >
            <IconTick className={styles.tickIcon} />
          </GlassButton>
        }
      />

      <div className={styles.fields}>
        <div
          className={styles.dropzone}
          style={
            preview
              ? ({"--dropzone-photo": `url(${preview})`} as CSSProperties)
              : undefined
          }
        >
          <p className={styles.dropzoneLabel}>
            {photo ? photo.name : "사진 추가"}
          </p>

          <div className={styles.pickers}>
            <button
              type="button"
              className={styles.picker}
              aria-label="앨범에서 선택"
              onClick={() => albumInput.current?.click()}
            >
              <IconPhotoLibrary className={styles.pickerIcon} />
            </button>
            <button
              type="button"
              className={styles.picker}
              aria-label="사진 촬영"
              onClick={() => cameraInput.current?.click()}
            >
              <IconPhoto className={styles.pickerIcon} />
            </button>
          </div>

          <input
            ref={albumInput}
            className={styles.fileInput}
            type="file"
            accept="image/*"
            tabIndex={-1}
            aria-hidden="true"
            onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
          />
          <input
            ref={cameraInput}
            className={styles.fileInput}
            type="file"
            accept="image/*"
            capture="environment"
            tabIndex={-1}
            aria-hidden="true"
            onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
          />
        </div>

        <div className={styles.placeRow}>
          <label className={`${styles.field} ${styles.placeField}`}>
            <IconPinSlim className={styles.pinIcon} />
            <input
              className={styles.fieldInput}
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              placeholder="장소"
              aria-label="장소"
            />
          </label>

          <button
            type="button"
            className={styles.locate}
            onClick={() => void locate()}
          >
            <span className={styles.locateLabel}>
              {locating ? "확인 중" : "위치 정보"}
            </span>
            <IconLocate className={styles.locateIcon} />
          </button>
        </div>

        <label className={`${styles.field} ${styles.dateField}`}>
          <IconCalendar className={styles.calendarIcon} />
          {/* the backend stamps `created_at` itself, so the date is a readout */}
          <input
            className={styles.fieldInput}
            value={shortDate(new Date().toISOString())}
            readOnly
            aria-label="날짜"
          />
        </label>

        <div className={styles.note}>
          <textarea
            className={styles.noteInput}
            value={note}
            maxLength={NOTE_LIMIT}
            onChange={(event) => setNote(event.target.value)}
            placeholder="추억을 남겨 주세요"
            aria-label="추억 내용"
          />
          <span className={styles.counter}>
            {note.length}/{NOTE_LIMIT}
          </span>
        </div>

        {status ? (
          <p className={styles.status} role="alert">
            {status}
          </p>
        ) : null}
      </div>
    </Screen>
  );
}
