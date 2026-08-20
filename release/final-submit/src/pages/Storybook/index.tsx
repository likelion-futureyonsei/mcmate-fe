import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {PRODUCT_REGISTERED_STORAGE_KEY} from "@/constants/productRegistration";
import {useLikedItem} from "@/hooks/useLikedItem";

import styles from "./index.module.scss";

const COLLECTION_IMAGE = "/storybook-collection-reference.svg?v=storybook-20260821-layout";
const COLLECTION_EMPTY_IMAGE = "/storybook-collection-empty-reference.svg?v=storybook-20260821-layout";
const HERITAGE_IMAGE = "/storybook-heritage-reference.svg?v=storybook-20260821-layout";
const HERITAGE_EMPTY_IMAGE = "/storybook-heritage-empty-reference.svg?v=storybook-20260821-layout";

export function Storybook() {
  const [isHeritageSelected, setIsHeritageSelected] = useState(false);
  const [hasRegisteredProduct, setHasRegisteredProduct] = useState(false);
  const {isLiked: isCollectionFirstLiked, toggleLiked: toggleCollectionFirstLiked} = useLikedItem("storybook-collection-1");
  const {isLiked: isEpisodeLiked, toggleLiked: toggleEpisodeLiked} = useLikedItem("storybook-episode-2", true);
  const {isLiked: isCollectionThirdLiked, toggleLiked: toggleCollectionThirdLiked} = useLikedItem("storybook-collection-3");
  const {isLiked: isHeritageFirstLiked, toggleLiked: toggleHeritageFirstLiked} = useLikedItem("storybook-heritage-1", true);
  const {isLiked: isHeritageSecondLiked, toggleLiked: toggleHeritageSecondLiked} = useLikedItem("storybook-heritage-2");

  useEffect(() => {
    setHasRegisteredProduct(window.localStorage.getItem(PRODUCT_REGISTERED_STORAGE_KEY) === "true");
  }, []);

  const referenceImage = isHeritageSelected
    ? hasRegisteredProduct
      ? HERITAGE_IMAGE
      : HERITAGE_EMPTY_IMAGE
    : hasRegisteredProduct
      ? COLLECTION_IMAGE
      : COLLECTION_EMPTY_IMAGE;

  return (
    <section className={styles.page} aria-label="storybook page">
      <img className={styles.referenceLayer} src={referenceImage} alt="" aria-hidden="true" />

      {isHeritageSelected ? (
        <>
          {hasRegisteredProduct && (
            <>
              <HeartButton className={styles.firstCardHeartHotspot} label="첫 번째 지역 헤리티지 좋아요" isLiked={isHeritageFirstLiked} onClick={toggleHeritageFirstLiked} />
              <HeartButton className={styles.secondCardHeartHotspot} label="두 번째 지역 헤리티지 좋아요" isLiked={isHeritageSecondLiked} onClick={toggleHeritageSecondLiked} />
            </>
          )}
        </>
      ) : (
        <>
          {hasRegisteredProduct && (
            <>
              <Link className={styles.secondCardHotspot} to="/storybook-episode" aria-label="두 번째 스토리북 에피소드 보기" />
              <HeartButton className={styles.firstCardHeartHotspot} label="첫 번째 스토리북 좋아요" isLiked={isCollectionFirstLiked} onClick={toggleCollectionFirstLiked} />
              <HeartButton className={styles.secondCardHeartHotspot} label="두 번째 스토리북 좋아요" isLiked={isEpisodeLiked} onClick={toggleEpisodeLiked} />
              <HeartButton className={styles.thirdCardHeartHotspot} label="세 번째 스토리북 좋아요" isLiked={isCollectionThirdLiked} onClick={toggleCollectionThirdLiked} />
            </>
          )}
        </>
      )}

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
      fill={filled ? "white" : "none"}
      stroke={filled ? "none" : "white"}
      strokeWidth="1.5"
    />
  </svg>
);
