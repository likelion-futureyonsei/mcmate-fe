import {Link} from "react-router-dom";

import {IconEdit, IconLines, IconShare} from "@/assets/icons";
import {
  Memory1,
  Memory2,
  Memory3,
  Memory4,
  Memory5,
  ShotStark,
  Swatch1,
  Swatch2,
  Swatch3,
  Swatch4,
  Swatch5,
} from "@/assets/images";
import {CountBadge, GlassPill, Screen, TopBar} from "@/components";

import styles from "./index.module.scss";

const product = {
  name: "Stark 사이드 스터드 비세토스 백팩",
  hero: ShotStark,
  owned: 5,
  total: 50,
};

/** Sibling products, in shelf order. */
const swatches = [Swatch1, Swatch2, Swatch3, Swatch4, Swatch5];

/** Masonry columns, each holding its photos top to bottom. */
const columns = [
  [
    {src: Memory1, height: 133},
    {src: Memory4, height: 125},
  ],
  [
    {src: Memory2, height: 174},
    {src: Memory5, height: 125},
  ],
  [{src: Memory3, height: 142}],
];

export function ProductMemories() {
  return (
    <Screen label="제품 추억" className={styles.page}>
      <TopBar
        className={styles.topBar}
        backTo="/"
        actions={
          <GlassPill
            className={styles.actionPill}
            actions={[
              {
                label: "추억 작성",
                to: "/memory-write",
                icon: <IconEdit className={styles.editIcon} />,
              },
              {label: "공유", icon: <IconShare className={styles.shareIcon} />},
              {
                label: "정렬 및 필터",
                icon: <IconLines className={styles.linesIcon} />,
              },
            ]}
          />
        }
      />

      <img className={styles.hero} src={product.hero} alt="" />

      <p className={styles.name}>{product.name}</p>
      <CountBadge owned={product.owned} total={product.total} />

      <div className={styles.swatches}>
        {swatches.map((swatch, index) => (
          <img
            key={swatch}
            className={styles.swatch}
            src={swatch}
            alt={`보유 제품 ${index + 1}`}
          />
        ))}
      </div>

      <div className={styles.grid}>
        {columns.map((column, columnIndex) => (
          <div className={styles.column} key={columnIndex}>
            {column.map((photo) => (
              <Link key={photo.src} to="/memory-detail">
                <img
                  className={styles.photo}
                  src={photo.src}
                  alt=""
                  style={{height: `${photo.height / 10}rem`}}
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </Screen>
  );
}
