import styles from "./index.module.scss";

type ProfileBottomSheetProps = {
  onClose: () => void;
};

export function ProfileBottomSheet({onClose}: ProfileBottomSheetProps) {
  return (
    <aside className={styles.sheet} aria-label="프로필 메뉴">
      <img src="/profile-bottom-sheet.svg" alt="" aria-hidden="true" />
      <button className={styles.close} type="button" aria-label="프로필 메뉴 닫기" onClick={onClose} />
    </aside>
  );
}
