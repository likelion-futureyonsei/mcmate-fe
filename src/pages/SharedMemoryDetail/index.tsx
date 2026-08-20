import {IconCalendar, IconHeart, IconPerson, IconPinSlim} from "@/assets/icons";
import {Memory1, Swatch1} from "@/assets/images";
import {MetaRow, Screen, TopBar} from "@/components";

import styles from "./index.module.scss";

const memory = {
  printBack: Swatch1,
  printFront: Memory1,
  user: "_yykib",
  place: "인천국제공항",
  date: "8월 16일",
  title: "드디어 출국 날 🛫",
  text: "공항 바닥에 캐리어 두 개랑 가방 내려놓고 사진 찍는데 왜 이렇게 설렐까!!! 오빠 캐리어는 항상 나보다 크고, 내 가방 안엔 즉석카메라부터 챙겨넣었다. 우리 둘 다 아직 반쯤 잠든 얼굴인데 이 순간마저 남기고 싶어서 한 컷. 이제 진짜 출발이다. 이 가방이랑 함께한 첫 여행, 오래 기억하고 싶어서 여기 남겨둔다 🤍",
};

export function SharedMemoryDetail() {
  return (
    <Screen label="다른 사람 추억 상세" bleed className={styles.page}>
      <div className={styles.hero}>
        <TopBar className={styles.topBar} backTo="/map" tint="subtle" />

        <div className={styles.prints}>
          <img className={styles.printBack} src={memory.printBack} alt="" />
          <img className={styles.printFront} src={memory.printFront} alt="" />
        </div>

        <MetaRow
          className={styles.meta}
          items={[
            {
              label: "유저",
              icon: <IconPerson className={styles.personIcon} />,
              value: memory.user,
            },
            {
              label: "장소",
              icon: <IconPinSlim className={styles.pinIcon} />,
              value: memory.place,
            },
            {
              label: "날짜",
              icon: <IconCalendar className={styles.calendarIcon} />,
              value: memory.date,
            },
          ]}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{memory.title}</h1>
          <button type="button" className={styles.like} aria-label="좋아요">
            <IconHeart className={styles.heartIcon} />
          </button>
        </div>

        <p className={styles.text}>{memory.text}</p>
      </div>
    </Screen>
  );
}
