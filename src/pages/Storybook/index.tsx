import {Link} from "react-router-dom";

import {listStorybooks, type StorybookScopeType} from "@/api";
import {IconHeart, IconLines, IconShare} from "@/assets/icons";
import {GlassPill, Screen, TopBar} from "@/components";
import {useAsync} from "@/hooks/useAsync";
import {storybookCover} from "@/lib";
import {ErrorScreen, LoadingScreen} from "@/pages/Loading/LoadingScreen";

import styles from "./index.module.scss";

type StorybookScope = "collection" | "heritage";

/** The frame's two tabs map onto the backend's `scope` values. */
const apiScope: Record<StorybookScope, StorybookScopeType> = {
  collection: "product",
  heritage: "place",
};

const tabs: {id: StorybookScope; label: string; to: string}[] = [
  {id: "collection", label: "나의 여정", to: "/storybook"},
  {id: "heritage", label: "브랜드 여정", to: "/storybook/heritage"},
];

type StorybookProps = {
  /** Which storybook collection the frame opens on. */
  scope?: StorybookScope;
};

export function Storybook({scope = "collection"}: StorybookProps) {
  const {data, error, pending} = useAsync(() => listStorybooks(), []);

  if (pending) {
    return <LoadingScreen label="스토리북 불러오는 중..." />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  const stories = (data ?? []).filter(
    (storybook) => storybook.scope === apiScope[scope],
  );

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
        {stories.map((storybook) => (
          <Link
            key={storybook.id}
            to={`/storybook/detail/${storybook.id}`}
            aria-label={storybook.title}
            className={styles.card}
          >
            <img
              className={styles.cover}
              src={storybookCover(storybook)}
              alt=""
            />
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
