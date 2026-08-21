import {useParams} from "react-router-dom";

import {getMemory, getUser, listMemories} from "@/api";
import {IconCalendar, IconHeart, IconPerson, IconPinSlim} from "@/assets/icons";
import {MetaRow, Screen, TopBar} from "@/components";
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

export function SharedMemoryDetail() {
  const {memoryId} = useParams();

  const {data, error, pending} = useAsync(async () => {
    const memory = memoryId
      ? await getMemory(Number(memoryId))
      : ((await listMemories({limit: 1})).items[0] ?? null);

    if (!memory) {
      return null;
    }

    // `GET /users/{id}` answers with the public shape for anybody but yourself.
    const author = await getUser(memory.owner).catch(() => null);

    // The frame stacks two prints; the neighbouring shot of the same product
    // stands in for the one underneath.
    const siblings = await listMemories({product_id: memory.user_product});
    const behind =
      siblings.items.find((item) => item.id !== memory.id) ?? memory;

    return {memory, author, behind};
  }, [memoryId]);

  if (pending) {
    return <LoadingScreen label="추억 불러오는 중..." />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  if (!data) {
    return <ErrorScreen message="공개된 추억이 아직 없습니다." />;
  }

  const {memory, author, behind} = data;
  const title = memoryTitle(memory.note, memory.place_name);

  return (
    <Screen label="다른 사람 추억 상세" bleed className={styles.page}>
      <div className={styles.hero}>
        <TopBar className={styles.topBar} backTo="/map" tint="subtle" />

        <div className={styles.prints}>
          <img
            className={styles.printBack}
            src={memoryPhoto(behind)}
            onError={withPhotoFallback(memoryPhotoFallback(behind))}
            alt=""
          />
          <img
            className={styles.printFront}
            src={memoryPhoto(memory)}
            onError={withPhotoFallback(memoryPhotoFallback(memory))}
            alt=""
          />
        </div>

        <MetaRow
          className={styles.meta}
          items={[
            {
              label: "유저",
              icon: <IconPerson className={styles.personIcon} />,
              value: author?.nickname ?? `user${memory.owner}`,
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
    </Screen>
  );
}
