import {useParams} from "react-router-dom";

import {
  getStorybook,
  listMyProducts,
  listStorybooks,
  type Chapter,
} from "@/api";
import {IconBagSlim, IconHeart, IconOrder} from "@/assets/icons";
import {MetaRow, Screen, TopBar} from "@/components";
import {useAsync} from "@/hooks/useAsync";
import {paragraphs, storybookCover} from "@/lib";
import {ErrorScreen, LoadingScreen} from "@/pages/Loading/LoadingScreen";

import styles from "./index.module.scss";

/** The furthest chapter the reader has opened, or the first one when none is. */
const currentChapter = (chapters: Chapter[]): Chapter | null => {
  const unlocked = chapters.filter((chapter) => chapter.unlocked);

  return unlocked.length
    ? unlocked[unlocked.length - 1]
    : (chapters[0] ?? null);
};

export function StorybookDetail() {
  const {storybookId} = useParams();

  const {data, error, pending} = useAsync(async () => {
    const id = storybookId
      ? Number(storybookId)
      : ((await listStorybooks())[0]?.id ?? null);

    if (id === null) {
      return null;
    }

    const [storybook, products] = await Promise.all([
      getStorybook(id),
      // The detail payload carries no product, but a product points at its
      // storybook — so the owner's matching product names the episode.
      listMyProducts().catch(() => ({items: [], total: 0})),
    ]);

    const related = products.items.find(
      (item) => item.product.storybook === storybook.id,
    );

    return {storybook, productName: related?.product.name ?? null};
  }, [storybookId]);

  if (pending) {
    return <LoadingScreen label="스토리북 불러오는 중..." />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  if (!data) {
    return <ErrorScreen message="스토리북이 아직 없습니다." />;
  }

  const {storybook, productName} = data;
  const chapter = currentChapter(storybook.chapters);
  const next = chapter
    ? storybook.chapters.find((item) => item.chapter_no > chapter.chapter_no)
    : undefined;

  const body = chapter?.story
    ? paragraphs(chapter.story)
    : [`추억 ${chapter?.required_memories ?? 1}개를 담으면 이 권이 열립니다.`];

  return (
    <Screen label="스토리북 상세" bleed className={styles.page}>
      <div className={styles.hero}>
        <TopBar className={styles.topBar} backTo="/storybook" tint="subtle" />

        <img className={styles.cover} src={storybookCover(storybook)} alt="" />

        <MetaRow
          className={styles.meta}
          items={[
            {
              label: "에피소드",
              icon: <IconOrder className={styles.orderIcon} />,
              value: chapter?.chapter_no ?? 1,
            },
            {
              label: "제품",
              icon: <IconBagSlim className={styles.bagIcon} />,
              value:
                productName ??
                (storybook.scope === "place"
                  ? "지역 헤리지티"
                  : storybook.title),
            },
          ]}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>
            {chapter
              ? `${chapter.chapter_no}권: ${chapter.title}`
              : storybook.title}
          </h1>
          <button type="button" className={styles.like} aria-label="좋아요">
            <IconHeart className={styles.heartIcon} />
          </button>
        </div>

        <div className={styles.story}>
          {body.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 12)}`}>{paragraph}</p>
          ))}
          {next ? (
            <p className={styles.outro}>{next.chapter_no}권에서 계속...</p>
          ) : null}
        </div>
      </div>
    </Screen>
  );
}
