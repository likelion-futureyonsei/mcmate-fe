import {useState} from "react";
import {Link} from "react-router-dom";

import {BackButton} from "@/components";
import {useLikedItem} from "@/hooks/useLikedItem";

import styles from "./index.module.scss";

const BackIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="22" cy="22" r="22" fill="white" fillOpacity="0.1" />
    <path d="M15 22.5C15 22.7999 15.1227 23.0725 15.3407 23.3042L23.764 31.6729C23.9684 31.891 24.2547 32 24.5682 32C25.2088 32 25.6858 31.523 25.6858 30.8824C25.6858 30.5689 25.5631 30.2963 25.3587 30.0782L17.7532 22.5L25.3587 14.9218C25.5631 14.7037 25.6858 14.4175 25.6858 14.1176C25.6858 13.477 25.2088 13 24.5682 13C24.2547 13 23.9684 13.109 23.764 13.3271L15.3407 21.6958C15.1227 21.9275 15 22.2001 15 22.5Z" fill="black" />
  </svg>
);

export function Storybook() {
  const [isHeritageSelected, setIsHeritageSelected] = useState(false);
  const {isLiked: isCollectionFirstLiked, toggleLiked: toggleCollectionFirstLiked} = useLikedItem("storybook-collection-1");
  const {isLiked: isEpisodeLiked, toggleLiked: toggleEpisodeLiked} = useLikedItem("storybook-episode-2", true);
  const {isLiked: isCollectionThirdLiked, toggleLiked: toggleCollectionThirdLiked} = useLikedItem("storybook-collection-3");
  const {isLiked: isHeritageFirstLiked, toggleLiked: toggleHeritageFirstLiked} = useLikedItem("storybook-heritage-1", true);
  const {isLiked: isHeritageSecondLiked, toggleLiked: toggleHeritageSecondLiked} = useLikedItem("storybook-heritage-2");

  return (
    <section className={styles.page} aria-label="storybook page">
      <img className={styles.actionsLayer} src="/storybook-actions.svg?v=storybook-20260818" alt="" aria-hidden="true" />
      <img className={styles.copyLayer} src="/storybook-copy.svg?v=storybook-20260818" alt="" aria-hidden="true" />

      {isHeritageSelected ? (
        <>
          <img className={styles.heritageLayer} src="/storybook-heritage.svg?v=storybook-20260818-hearts" alt="" aria-hidden="true" />
          <HeartButton className={styles.firstCardHeartHotspot} label="첫 번째 지역 헤리티지 좋아요" isLiked={isHeritageFirstLiked} onClick={toggleHeritageFirstLiked} />
          <HeartButton className={styles.secondCardHeartHotspot} label="두 번째 지역 헤리티지 좋아요" isLiked={isHeritageSecondLiked} onClick={toggleHeritageSecondLiked} />
        </>
      ) : (
        <>
          <img className={styles.tabsLayer} src="/storybook-tabs.svg?v=storybook-20260818" alt="" aria-hidden="true" />
          <img className={styles.cardsLayer} src="/storybook-cards-clean.svg?v=storybook-20260818" alt="" aria-hidden="true" />
          <Link className={styles.secondCardHotspot} to="/storybook-episode" aria-label="두 번째 스토리북 에피소드 보기" />
          <HeartButton className={styles.firstCardHeartHotspot} label="첫 번째 스토리북 좋아요" isLiked={isCollectionFirstLiked} onClick={toggleCollectionFirstLiked} />
          <HeartButton className={styles.secondCardHeartHotspot} label="두 번째 스토리북 좋아요" isLiked={isEpisodeLiked} onClick={toggleEpisodeLiked} />
          <HeartButton className={styles.thirdCardHeartHotspot} label="세 번째 스토리북 좋아요" isLiked={isCollectionThirdLiked} onClick={toggleCollectionThirdLiked} />
        </>
      )}

      <BackButton className={styles.back}>
        <BackIcon />
      </BackButton>

      {isHeritageSelected ? (
        <button
          className={`${styles.tabHotspot} ${styles.collectionHotspot}`}
          type="button"
          aria-label="나의 컬렉션 보기"
          onClick={() => setIsHeritageSelected(false)}
        />
      ) : (
        <button
          className={`${styles.tabHotspot} ${styles.heritageHotspot}`}
          type="button"
          aria-label="지역 헤리티지 보기"
          onClick={() => setIsHeritageSelected(true)}
        />
      )}
    </section>
  );
}

const HeartButton = ({className, label, isLiked, onClick}: {className: string; label: string; isLiked: boolean; onClick: () => void}) => (
  <button
    className={`${styles.heartHotspot} ${className}`}
    type="button"
    aria-label={label}
    aria-pressed={isLiked}
    onClick={onClick}
  >
    <HeartIcon filled={isLiked} />
  </button>
);

const HeartIcon = ({filled}: {filled: boolean}) => (
  <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M16.4482 0.25C20.0929 0.25 22.7998 3.08543 22.7998 6.9668C22.7998 9.39264 21.6587 11.7705 19.7686 14.041C17.8773 16.3128 15.2195 18.498 12.1455 20.5439L12.1387 20.5488L12.1309 20.5527C11.9836 20.6367 11.7538 20.7499 11.5254 20.75C11.3008 20.75 11.0581 20.6402 10.9102 20.5469L10.9053 20.5439C7.82418 18.4979 5.16598 16.3129 3.27637 14.041C1.38781 11.7703 0.25 9.39246 0.25 6.9668C0.25002 3.08555 2.95706 0.250177 6.60156 0.25C8.57152 0.25 10.4957 1.31382 11.5244 3.02148C12.5537 1.31267 14.478 0.250004 16.4482 0.25Z"
      fill={filled ? "#FF5B39" : "none"}
      stroke={filled ? "#FF5B39" : "white"}
      strokeWidth="1.5"
    />
  </svg>
);
