import {
  IconCalendar,
  IconHeart,
  IconOrder,
  IconPinSlim,
  IconShare,
} from "@/assets/icons";
import {Memory1, Memory2, Memory3, Memory4, Memory5} from "@/assets/images";
import {GlassButton, MetaRow, Screen, TopBar} from "@/components";

import styles from "./index.module.scss";

const memory = {
  photo: Memory1,
  order: 1,
  place: "인천국제공항",
  date: "8월 16일",
  title: "드디어 출국 날 🛫",
  text: "공항 바닥에 캐리어 두 개랑 가방 내려놓고 사진 찍는데 왜 이렇게 설렐까!!! 오빠 캐리어는 항상 나보다 크고, 내 가방 안엔 즉석카메라부터 챙겨넣었다. 우리 둘 다 아직 반쯤 잠든 얼굴인데 이 순간마저 남기고 싶어서 한 컷. 이제 진짜 출발이다. 이 가방이랑 함께한 첫 여행, 오래 기억하고 싶어서 여기 남겨둔다 🤍",
};

/** Other shots of the same product, at their native aspect ratio. */
const filmstrip = [
  {src: Memory1, width: 38},
  {src: Memory2, width: 29},
  {src: Memory3, width: 35},
  {src: Memory4, width: 40},
  {src: Memory5, width: 40},
];

export function MemoryDetail() {
  return (
    <Screen label="제품 추억 상세" bleed className={styles.page}>
      <div className={styles.hero}>
        <TopBar
          className={styles.topBar}
          tint="strong"
          actions={
            <GlassButton label="공유">
              <IconShare className={styles.shareIcon} />
            </GlassButton>
          }
        />

        <img className={styles.photo} src={memory.photo} alt="" />

        <MetaRow
          className={styles.meta}
          items={[
            {
              label: "순서",
              icon: <IconOrder className={styles.orderIcon} />,
              value: memory.order,
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

      <div className={styles.filmstrip}>
        {filmstrip.map((frame, index) => (
          <img
            key={`${frame.src}-${index}`}
            className={styles.frame}
            src={frame.src}
            alt={`추억 사진 ${index + 1}`}
            style={{width: `${frame.width / 10}rem`}}
          />
        ))}
      </div>
    </Screen>
  );
}
