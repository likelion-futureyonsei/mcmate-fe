import type {CSSProperties} from "react";
import {Link} from "react-router-dom";

import {listMyProducts, type UserProduct} from "@/api";
import {IconLines, IconPlus} from "@/assets/icons";
import {CountBadge, GlassPill, Screen, TopBar} from "@/components";
import {useAsync} from "@/hooks/useAsync";
import {captionLines, productShotImage} from "@/lib";
import {ErrorScreen, LoadingScreen} from "@/pages/Loading/LoadingScreen";

import styles from "./index.module.scss";

type CollageSlot = {
  /** Frame coordinates of the artwork inside the 390x844 board. */
  box: {x: number; y: number; w: number; h: number};
  /** Anchor the caption is centred on, in frame coordinates. */
  caption?: {x: number; y: number};
  faded?: boolean;
};

/** y-origin of the collage inside the frame. */
const ORIGIN_Y = 152;

/** Height of one pass through the layout, used to stack further rounds below. */
const BOARD_HEIGHT = 627;

/**
 * The pile is a drawn arrangement, not a grid, so the frame coordinates are kept
 * as a layout template that the real collection is poured into. A collection
 * larger than the template repeats it further down the board.
 */
const slots: CollageSlot[] = [
  {box: {x: 21, y: 152, w: 145, h: 180}, caption: {x: 96, y: 328}},
  {box: {x: 154, y: 178, w: 215, h: 91}, caption: {x: 261, y: 261}},
  {box: {x: 117, y: 317, w: 272, h: 203}, caption: {x: 253.5, y: 499}},
  {box: {x: -3, y: 367, w: 146, h: 162}, caption: {x: 73, y: 524}},
  {box: {x: 163, y: 560, w: 222, h: 105}, caption: {x: 272.5, y: 647}},
  {box: {x: 35, y: 611, w: 168, h: 168}, faded: true},
];

const rem = (px: number) => `${px / 10}rem`;

const placed = (items: UserProduct[]) =>
  items.map((item, index) => {
    const slotIndex = index % slots.length;
    const round = Math.floor(index / slots.length);

    return {
      item,
      slot: slots[slotIndex],
      slotIndex,
      shift: round * BOARD_HEIGHT,
    };
  });

export function MyProducts() {
  const {data, error, pending} = useAsync(() => listMyProducts(), []);

  if (pending) {
    return <LoadingScreen label="나의 제품 불러오는 중..." />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  const items = data?.items ?? [];
  const rounds = Math.max(1, Math.ceil(items.length / slots.length));

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

      <div
        className={styles.collage}
        style={{"--collage-h": rem(rounds * BOARD_HEIGHT)} as CSSProperties}
      >
        {placed(items).map(({item, slot, slotIndex, shift}) => {
          const lines = captionLines(item.product.name);

          return (
            <Link
              key={item.id}
              to={`/product-memories/${item.id}`}
              aria-label={item.product.name}
              className={`${styles.item} ${slot.faded ? styles.faded : ""}`}
              style={
                {
                  "--item-x": rem(slot.box.x),
                  "--item-y": rem(slot.box.y - ORIGIN_Y + shift),
                  "--item-w": rem(slot.box.w),
                  "--item-h": rem(slot.box.h),
                } as CSSProperties
              }
            >
              <img
                className={styles.photo}
                src={productShotImage(item.product, slotIndex)}
                alt=""
              />

              {slot.caption ? (
                <span
                  className={styles.caption}
                  style={
                    {
                      "--caption-x": rem(slot.caption.x - slot.box.x),
                      "--caption-y": rem(slot.caption.y - slot.box.y),
                    } as CSSProperties
                  }
                >
                  <span className={styles.name}>
                    {lines.map((line, lineIndex) => (
                      <span key={`${line}-${lineIndex}`}>{line}</span>
                    ))}
                  </span>
                  <CountBadge
                    owned={item.capacity.used}
                    total={item.capacity.total}
                  />
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </Screen>
  );
}
