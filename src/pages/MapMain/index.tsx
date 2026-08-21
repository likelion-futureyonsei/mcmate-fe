import type {CSSProperties} from "react";
import {Link} from "react-router-dom";

import {listMemories} from "@/api";
import {IconChart, IconLines, IconPlus} from "@/assets/icons";
import {BgMap} from "@/assets/images";
import {GlassPill, Screen} from "@/components";
import {useAsync} from "@/hooks/useAsync";
import {
  memoryPhoto,
  memoryPhotoFallback,
  projectToMap,
  toNumber,
  withPhotoFallback,
} from "@/lib";
import {ErrorScreen, LoadingScreen} from "@/pages/Loading/LoadingScreen";

import styles from "./index.module.scss";

/** Pins beyond this start to crowd the illustrated map. */
const PIN_LIMIT = 40;

export function MapMain() {
  const {data, error, pending} = useAsync(
    () => listMemories({limit: PIN_LIMIT}),
    [],
  );

  if (pending) {
    return <LoadingScreen label="추억 지도 불러오는 중..." />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  const memories = data?.items ?? [];

  return (
    <Screen label="추억 지도" background={BgMap} bleed className={styles.page}>
      <header className={styles.header}>
        <h1 className={`${styles.title} typo-h1`}>추억</h1>

        <GlassPill
          tint="strong"
          className={styles.actionPill}
          actions={[
            {
              label: "추억 추가",
              to: "/memory-write",
              icon: <IconPlus className={styles.plusIcon} />,
            },
            {
              label: "통계 보기",
              icon: <IconChart className={styles.chartIcon} />,
            },
            {
              label: "정렬 및 필터",
              icon: <IconLines className={styles.linesIcon} />,
            },
          ]}
        />
      </header>

      <div className={styles.pins}>
        {memories.map((memory) => {
          // The background is illustrated artwork rather than a map SDK, so the
          // coordinates are projected into the frame linearly.
          const position = projectToMap(
            toNumber(memory.lat),
            toNumber(memory.lng),
          );

          return (
            <Link
              key={memory.id}
              to={`/map/memory/${memory.id}`}
              aria-label={`${memory.place_name || "기록된"} 추억`}
              className={styles.pin}
              style={
                {"--pin-x": position.x, "--pin-y": position.y} as CSSProperties
              }
            >
              <span className={styles.pinCard}>
                <img
                  className={styles.pinPhoto}
                  src={memoryPhoto(memory)}
                  onError={withPhotoFallback(memoryPhotoFallback(memory))}
                  alt=""
                />
              </span>
              <span className={styles.pinTail} aria-hidden="true" />
            </Link>
          );
        })}
      </div>
    </Screen>
  );
}
