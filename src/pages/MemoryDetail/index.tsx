import {Link, useParams} from "react-router-dom";

import {getMemory, listMemories, type Memory} from "@/api";
import {
  IconCalendar,
  IconHeart,
  IconOrder,
  IconPinSlim,
  IconShare,
} from "@/assets/icons";
import {useUserId} from "@/auth";
import {GlassButton, MetaRow, Screen, TopBar} from "@/components";
import {useAsync} from "@/hooks/useAsync";
import {
  memoryBody,
  memoryPhoto,
  memoryPhotoFallback,
  memoryTitle,
  shortDate,
  withPhotoFallback,
} from "@/lib";
import {ErrorScreen, LoadingScreen} from "@/pages/Loading/LoadingScreen";

import styles from "./index.module.scss";

/** Filmstrip frame widths from the design, reused as the strip grows. */
const FRAME_WIDTHS = [38, 29, 35, 40, 40];

export function MemoryDetail() {
  const {memoryId} = useParams();
  const userId = useUserId();

  const {data, error, pending} = useAsync(async () => {
    const memory = memoryId
      ? await getMemory(Number(memoryId))
      : ((await listMemories({owner: userId ?? undefined})).items[0] ?? null);

    if (!memory) {
      return null;
    }

    // Other shots of the same product, oldest first so "순서" is stable.
    const siblings = await listMemories({product_id: memory.user_product});
    const chronological = [...siblings.items].reverse();
    const order =
      chronological.findIndex((item) => item.id === memory.id) + 1 || 1;

    return {memory, order, strip: chronological};
  }, [memoryId, userId]);

  if (pending) {
    return <LoadingScreen label="추억 불러오는 중..." />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  if (!data) {
    return <ErrorScreen message="아직 담긴 추억이 없습니다." />;
  }

  const {memory, order, strip} = data;
  const title = memoryTitle(memory.note, memory.place_name);

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

        <img
          className={styles.photo}
          src={memoryPhoto(memory)}
          onError={withPhotoFallback(memoryPhotoFallback(memory))}
          alt=""
        />

        <MetaRow
          className={styles.meta}
          items={[
            {
              label: "순서",
              icon: <IconOrder className={styles.orderIcon} />,
              value: order,
            },
            {
              label: "장소",
              icon: <IconPinSlim className={styles.pinIcon} />,
              value: memory.place_name || "기록 없음",
            },
            {
              label: "날짜",
              icon: <IconCalendar className={styles.calendarIcon} />,
              value: shortDate(memory.created_at),
            },
          ]}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{title}</h1>
          <button type="button" className={styles.like} aria-label="좋아요">
            <IconHeart className={styles.heartIcon} />
          </button>
        </div>

        <p className={styles.text}>{memoryBody(memory.note, title)}</p>
      </div>

      <div className={styles.filmstrip}>
        {strip.map((frame: Memory, index: number) => (
          <Link
            key={frame.id}
            to={`/memory-detail/${frame.id}`}
            className={styles.frameLink}
          >
            <img
              className={styles.frame}
              src={memoryPhoto(frame)}
              onError={withPhotoFallback(memoryPhotoFallback(frame))}
              alt={`추억 사진 ${index + 1}`}
              style={{
                width: `${FRAME_WIDTHS[index % FRAME_WIDTHS.length] / 10}rem`,
              }}
            />
          </Link>
        ))}
      </div>
    </Screen>
  );
}
