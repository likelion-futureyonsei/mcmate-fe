import {useState} from "react";

import {
  IconCalendar,
  IconLocate,
  IconPhoto,
  IconPhotoLibrary,
  IconPinSlim,
  IconTick,
} from "@/assets/icons";
import {GlassButton, Screen, TopBar} from "@/components";

import styles from "./index.module.scss";

const NOTE_LIMIT = 300;

export function MemoryWrite() {
  const [place, setPlace] = useState("서울시");
  const [date, setDate] = useState("8월 21일");
  const [note, setNote] = useState("");

  return (
    <Screen label="제품 추억 작성" className={styles.page}>
      <TopBar
        tint="solid"
        actions={
          <GlassButton label="작성 완료" tint="solid" to="/product-memories">
            <IconTick className={styles.tickIcon} />
          </GlassButton>
        }
      />

      <div className={styles.fields}>
        <div className={styles.dropzone}>
          <p className={styles.dropzoneLabel}>사진 추가</p>

          <div className={styles.pickers}>
            <button
              type="button"
              className={styles.picker}
              aria-label="앨범에서 선택"
            >
              <IconPhotoLibrary className={styles.pickerIcon} />
            </button>
            <button
              type="button"
              className={styles.picker}
              aria-label="사진 촬영"
            >
              <IconPhoto className={styles.pickerIcon} />
            </button>
          </div>
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

          <button type="button" className={styles.locate}>
            <span className={styles.locateLabel}>위치 정보</span>
            <IconLocate className={styles.locateIcon} />
          </button>
        </div>

        <label className={`${styles.field} ${styles.dateField}`}>
          <IconCalendar className={styles.calendarIcon} />
          <input
            className={styles.fieldInput}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            placeholder="날짜"
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
      </div>
    </Screen>
  );
}
