import styles from "./index.module.scss";

type ProfileHotspotProps = {
  onClick: () => void;
};

export function ProfileHotspot({onClick}: ProfileHotspotProps) {
  return (
    <>
      <img className={styles.profileImage} src="/profile-icon.svg?v=20260820" alt="" aria-hidden="true" />
      <button className={styles.profileHotspot} type="button" aria-label="프로필 메뉴 열기" onClick={onClick} />
    </>
  );
}
