import {IconBagSlim, IconHeart, IconOrder} from "@/assets/icons";
import {StoryBeach} from "@/assets/images";
import {MetaRow, Screen, TopBar} from "@/components";

import styles from "./index.module.scss";

const story = {
  cover: StoryBeach,
  episode: 2,
  product: "Ottomar 비세토스 위켄더",
  title: "2권: 파도가 기억하는 것",
  paragraphs: [
    "몽고는 처음 보는 파랑 앞에 멈춰 섰습니다. 뮌헨의 돌바닥과도, 도시의 소음과도 다른 곳. 발밑으로 밀려온 물이 그의 발끝을 적시자, 몸에 새겨진 문양들이 햇빛 아래서 반짝였습니다.",
    "해변에는 그의 여정에 함께한 것들이 놓여 있었습니다. 조개껍질과 알록달록한 수건을 담은 토트백, 여름 내내 함께 걸어온 슬리퍼 한 켤레. 이 바다는 그에게 '어디까지 갈 수 있는지'를 묻고 있었습니다. 그가 다음으로 향할 곳은 아직 정해지지 않았습니다.",
    "다만 한 가지는 분명했습니다 — 그의 가죽에 새겨진 문양들은 앞으로도 계속, 그가 지나온 모든 순간을 하나씩 담아갈 것이라는 것.",
  ],
  outro: "3권에서 계속...",
};

export function StorybookDetail() {
  return (
    <Screen label="스토리북 상세" bleed className={styles.page}>
      <div className={styles.hero}>
        <TopBar className={styles.topBar} backTo="/storybook" tint="subtle" />

        <img className={styles.cover} src={story.cover} alt="" />

        <MetaRow
          className={styles.meta}
          items={[
            {
              label: "에피소드",
              icon: <IconOrder className={styles.orderIcon} />,
              value: story.episode,
            },
            {
              label: "제품",
              icon: <IconBagSlim className={styles.bagIcon} />,
              value: story.product,
            },
          ]}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{story.title}</h1>
          <button type="button" className={styles.like} aria-label="좋아요">
            <IconHeart className={styles.heartIcon} />
          </button>
        </div>

        <div className={styles.story}>
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 12)}>{paragraph}</p>
          ))}
          <p className={styles.outro}>{story.outro}</p>
        </div>
      </div>
    </Screen>
  );
}
