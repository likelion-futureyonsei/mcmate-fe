import {Link} from "react-router-dom";

import {IconHeart, IconLines, IconShare} from "@/assets/icons";
import {
  StoryBeach,
  StoryHeritage1,
  StoryHeritage2,
  StoryRockwell,
  StoryWalking,
} from "@/assets/images";
import {GlassPill, Screen, TopBar} from "@/components";

import styles from "./index.module.scss";

type StorybookScope = "collection" | "heritage";

const tabs: {id: StorybookScope; label: string; to: string}[] = [
  {id: "collection", label: "나의 컬렉션", to: "/storybook"},
  {id: "heritage", label: "지역 헤리지티", to: "/storybook/heritage"},
];

const stories: Record<
  StorybookScope,
  {id: string; title: string; cover: string}[]
> = {
  collection: [
    {id: "walking", title: "1권: 길을 나서다", cover: StoryWalking},
    {id: "beach", title: "2권: 파도가 기억하는 것", cover: StoryBeach},
    {id: "rockwell", title: "3권: 오래된 오후", cover: StoryRockwell},
  ],
  heritage: [
    {id: "heritage-1", title: "청담 헤리지티", cover: StoryHeritage1},
    {id: "heritage-2", title: "뮌헨 헤리지티", cover: StoryHeritage2},
  ],
};

type StorybookProps = {
  /** Which storybook collection the frame opens on. */
  scope?: StorybookScope;
};

export function Storybook({scope = "collection"}: StorybookProps) {
  return (
    <Screen label="스토리북" className={styles.page}>
      <TopBar
        backTo="/"
        actions={
          <GlassPill
            className={styles.actionPill}
            actions={[
              {label: "공유", icon: <IconShare className={styles.shareIcon} />},
              {
                label: "정렬 및 필터",
                icon: <IconLines className={styles.linesIcon} />,
              },
            ]}
          />
        }
      />

      <h1 className={`${styles.title} typo-h1`}>스토리북</h1>
      <p className={styles.subtitle}>
        브랜드의 시작부터, 당신의 여정까지
        <br />
        함께 쓴 기록입니다.
      </p>

      <nav className={styles.tabs} aria-label="스토리북 종류">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.to}
            aria-current={tab.id === scope ? "page" : undefined}
            className={`${styles.tab} ${tab.id === scope ? styles.tabActive : ""}`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <div className={styles.grid}>
        {stories[scope].map((story) => (
          <Link
            key={story.id}
            to="/storybook/detail"
            aria-label={story.title}
            className={styles.card}
          >
            <img className={styles.cover} src={story.cover} alt="" />
            <span className={styles.like}>
              <IconHeart className={styles.heartIcon} />
            </span>
          </Link>
        ))}
      </div>
    </Screen>
  );
}

export const StorybookHeritage = () => <Storybook scope="heritage" />;
