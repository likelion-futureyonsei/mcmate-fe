import type {CSSProperties} from "react";
import {Link} from "react-router-dom";

import {IconLines, IconPlus} from "@/assets/icons";
import {
  ShotBelt,
  ShotCase,
  ShotOttomar,
  ShotSneakers,
  ShotStark,
  ShotWeekender,
} from "@/assets/images";
import {CountBadge, GlassPill, Screen, TopBar} from "@/components";

import styles from "./index.module.scss";

type CollageItem = {
  id: string;
  /** Caption lines, kept explicit so the wrapping matches the design. */
  name: string[];
  image: string;
  owned?: number;
  total?: number;
  /** Frame coordinates of the artwork inside the 390x844 board. */
  box: {x: number; y: number; w: number; h: number};
  /** Anchor the caption is centred on, in frame coordinates. */
  caption?: {x: number; y: number};
  faded?: boolean;
};

/** y-origin of the collage inside the frame. */
const ORIGIN_Y = 152;

const items: CollageItem[] = [
  {
    id: "stark",
    name: ["Stark 사이드 스터드", "비세토스 백팩"],
    image: ShotStark,
    owned: 5,
    total: 50,
    box: {x: 21, y: 152, w: 145, h: 180},
    caption: {x: 96, y: 328},
  },
  {
    id: "belt",
    name: ["비세토스 프루스튼 벨트백"],
    image: ShotBelt,
    owned: 3,
    total: 50,
    box: {x: 154, y: 178, w: 215, h: 91},
    caption: {x: 261, y: 261},
  },
  {
    id: "ottomar",
    name: ["Ottomar 비세토스 위켄더"],
    image: ShotOttomar,
    owned: 35,
    total: 100,
    box: {x: 117, y: 317, w: 272, h: 203},
    caption: {x: 253.5, y: 499},
  },
  {
    id: "case",
    name: ["MCM X CASETiFY", "모노그램 IPhone 17", "Pro Max 케이스"],
    image: ShotCase,
    owned: 12,
    total: 30,
    box: {x: -3, y: 367, w: 146, h: 162},
    caption: {x: 73, y: 524},
  },
  {
    id: "sneakers",
    name: ["Skywander 비세토스", "로우탑 스니커즈"],
    image: ShotSneakers,
    owned: 17,
    total: 50,
    box: {x: 163, y: 560, w: 222, h: 105},
    caption: {x: 272.5, y: 647},
  },
  {
    id: "weekender",
    name: [],
    image: ShotWeekender,
    box: {x: 35, y: 611, w: 168, h: 168},
    faded: true,
  },
];

const rem = (px: number) => `${px / 10}rem`;

export function MyProducts() {
  return (
    <Screen label="나의 제품" className={styles.page}>
      <TopBar
        backTo="/"
        actions={
          <GlassPill
            className={styles.actionPill}
            actions={[
              {
                label: "제품 등록",
                to: "/qr-register",
                icon: <IconPlus className={styles.plusIcon} />,
              },
              {
                label: "정렬 및 필터",
                icon: <IconLines className={styles.linesIcon} />,
              },
            ]}
          />
        }
      />

      <h1 className={`${styles.title} typo-h1`}>나의 제품</h1>

      <div className={styles.collage}>
        {items.map((item) => (
          <Link
            key={item.id}
            to="/product-memories"
            aria-label={item.name.join(" ") || "제품 상세"}
            className={`${styles.item} ${item.faded ? styles.faded : ""}`}
            style={
              {
                "--item-x": rem(item.box.x),
                "--item-y": rem(item.box.y - ORIGIN_Y),
                "--item-w": rem(item.box.w),
                "--item-h": rem(item.box.h),
              } as CSSProperties
            }
          >
            <img className={styles.photo} src={item.image} alt="" />

            {item.caption ? (
              <span
                className={styles.caption}
                style={
                  {
                    "--caption-x": rem(item.caption.x - item.box.x),
                    "--caption-y": rem(item.caption.y - item.box.y),
                  } as CSSProperties
                }
              >
                <span className={styles.name}>
                  {item.name.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
                <CountBadge owned={item.owned ?? 0} total={item.total ?? 0} />
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </Screen>
  );
}
