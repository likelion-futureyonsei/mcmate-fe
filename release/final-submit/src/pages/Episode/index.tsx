import {BackButton} from "@/components/BackButton";
import {useLikedItem} from "@/hooks/useLikedItem";

import styles from "./index.module.scss";

const EPISODE_REFERENCE_SRC = "/episode-reference.svg?v=20260821-date-21";

const diaryBody = [
  "공항 바닥에 캐리어 두 개랑 가방 내려놓고 사진 찍는데",
  "왜 이렇게 설렐까!!! 오빠 캐리어는 항상 나보다 크고,",
  "내 가방 안엔 즉석카메라부터 챙겨넣었다. 우리 둘 다",
  "아직 반쯤 잠든 얼굴인데 이 순간마저 남기고 싶어서",
  "한 컷. 이제 진짜 출발이다. 이 가방이랑 함께한 첫 여행,",
  "오래 기억하고 싶어서 여기 남겨둔다 🤍",
].join("\n");

export function Episode() {
  const {isLiked, toggleLiked} = useLikedItem("map-episode-main");

  return (
    <section className={styles.page} aria-label="episode page">
      <img className={styles.reference} src={EPISODE_REFERENCE_SRC} alt="MCM 에피소드" />
      <span className={styles.dateValue} aria-label="날짜 8월 21일">8월 21일</span>
      <BackButton className={styles.back}>
        <span aria-hidden="true" />
      </BackButton>
      <article className={styles.entry}>
        <h1>드디어 출국 날 🛫</h1>
        <p>{diaryBody}</p>
      </article>
      <button className={styles.like} type="button" aria-label="에피소드 좋아요" aria-pressed={isLiked} onClick={toggleLiked}>
        {isLiked && <HeartIcon />}
      </button>
    </section>
  );
}

const HeartIcon = () => (
  <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M16.4482 0.25C20.0929 0.25 22.7998 3.08543 22.7998 6.9668C22.7998 9.39264 21.6587 11.7705 19.7686 14.041C17.8773 16.3128 15.2195 18.498 12.1455 20.5439L12.1387 20.5488L12.1309 20.5527C11.9836 20.6367 11.7538 20.7499 11.5254 20.75C11.3008 20.75 11.0581 20.6402 10.9102 20.5469L10.9053 20.5439C7.82418 18.4979 5.16598 16.3129 3.27637 14.041C1.38781 11.7703 0.25 9.39246 0.25 6.9668C0.25002 3.08555 2.95706 0.250177 6.60156 0.25C8.57152 0.25 10.4957 1.31382 11.5244 3.02148C12.5537 1.31267 14.478 0.250004 16.4482 0.25Z"
      fill="black"
    />
  </svg>
);
