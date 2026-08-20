import type {CSSProperties} from "react";
import {Link} from "react-router-dom";

import {IconChart, IconLines, IconPlus} from "@/assets/icons";
import {BgMap, Memory2, Memory3, Memory4, Memory5} from "@/assets/images";
import {GlassPill, Screen} from "@/components";

import styles from "./index.module.scss";

/** y-origin of the pin layer inside the 390x844 frame. */
const ORIGIN_Y = 100;

const pins = [
  {id: "gimpo", place: "김포", photo: Memory2, x: 45, y: 334},
  {id: "yeouido", place: "여의도", photo: Memory3, x: 234, y: 482},
  {id: "seongsu", place: "성수", photo: Memory5, x: 302, y: 437},
  {id: "haeundae", place: "해운대", photo: Memory4, x: 335, y: 596},
];

export function MapMain() {
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
        {pins.map((pin) => (
          <Link
            key={pin.id}
            to="/map/memory"
            aria-label={`${pin.place} 추억`}
            className={styles.pin}
            style={
              {
                "--pin-x": `${pin.x / 10}rem`,
                "--pin-y": `${(pin.y - ORIGIN_Y) / 10}rem`,
              } as CSSProperties
            }
          >
            <span className={styles.pinCard}>
              <img className={styles.pinPhoto} src={pin.photo} alt="" />
            </span>
            <span className={styles.pinTail} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </Screen>
  );
}
