import {Link, useParams} from "react-router-dom";

import {listMemories, listMyProducts, type Memory} from "@/api";
import {IconEdit, IconLines, IconShare} from "@/assets/icons";
import {CountBadge, GlassPill, Screen, TopBar} from "@/components";
import {useAsync} from "@/hooks/useAsync";
import {
  memoryPhoto,
  memoryPhotoFallback,
  productShotImage,
  productThumbImage,
  withPhotoFallback,
} from "@/lib";
import {ErrorScreen, LoadingScreen} from "@/pages/Loading/LoadingScreen";

import styles from "./index.module.scss";

/** Photo heights of the drawn masonry, reused as the collection grows. */
const PHOTO_HEIGHTS = [133, 174, 142, 125, 125];
const COLUMN_COUNT = 3;

/** Deals the memories into the three columns, keeping the newest at the top. */
const toColumns = (memories: Memory[]) => {
  const columns: {memory: Memory; height: number}[][] = Array.from(
    {length: COLUMN_COUNT},
    () => [],
  );

  memories.forEach((memory, index) => {
    columns[index % COLUMN_COUNT].push({
      memory,
      height: PHOTO_HEIGHTS[index % PHOTO_HEIGHTS.length],
    });
  });

  return columns;
};

export function ProductMemories() {
  const {userProductId} = useParams();

  const {data, error, pending} = useAsync(async () => {
    const products = await listMyProducts();
    const requested = userProductId ? Number(userProductId) : null;
    const target =
      (requested === null
        ? products.items[0]
        : products.items.find((item) => item.id === requested)) ?? null;

    if (!target) {
      return {products: products.items, target: null, memories: [] as Memory[]};
    }

    const memories = await listMemories({product_id: target.id});

    return {products: products.items, target, memories: memories.items};
  }, [userProductId]);

  if (pending) {
    return <LoadingScreen label="제품 추억 불러오는 중..." />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  if (!data?.target) {
    return (
      <ErrorScreen message="등록된 제품이 없습니다. 제품을 먼저 등록해 주세요." />
    );
  }

  const {target, products, memories} = data;

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
                to: `/memory-write?product=${target.id}`,
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

      <img
        className={styles.hero}
        src={productShotImage(target.product)}
        alt=""
      />

      <p className={styles.name}>{target.product.name}</p>
      <CountBadge owned={target.capacity.used} total={target.capacity.total} />

      <div className={styles.swatches}>
        {products.map((item) => (
          <Link
            key={item.id}
            to={`/product-memories/${item.id}`}
            className={styles.swatchLink}
          >
            <img
              className={styles.swatch}
              src={productThumbImage(item.product)}
              alt={item.product.name}
            />
          </Link>
        ))}
      </div>

      <div className={styles.grid}>
        {toColumns(memories).map((column, columnIndex) => (
          <div className={styles.column} key={columnIndex}>
            {column.map(({memory, height}) => (
              <Link key={memory.id} to={`/memory-detail/${memory.id}`}>
                <img
                  className={styles.photo}
                  src={memoryPhoto(memory)}
                  onError={withPhotoFallback(memoryPhotoFallback(memory))}
                  alt={memory.place_name || "추억 사진"}
                  style={{height: `${height / 10}rem`}}
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </Screen>
  );
}
