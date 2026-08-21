import {useState} from "react";
import {Link} from "react-router-dom";
import {Glass} from "@samasante/liquid-glass";

import {listMemories, listMyProducts} from "@/api";
import {IconChevronRight, IconSearchGlass, IconStar} from "@/assets/icons";
import {useUserId} from "@/auth";
import {Avatar, CountBadge, Screen} from "@/components";
import {useAsync} from "@/hooks/useAsync";
import {
  memoryPhoto,
  memoryPhotoFallback,
  productThumbImage,
  shortDate,
  withPhotoFallback,
} from "@/lib";
import {ErrorScreen, LoadingScreen} from "@/pages/Loading/LoadingScreen";

import styles from "./index.module.scss";

/** Tile widths of the drawn memory rail, reused as the list grows. */
const TILE_WIDTHS = [75, 58, 70, 80];
const MEMORY_TILES = 8;

export function Search() {
  const userId = useUserId();
  const [query, setQuery] = useState("");

  const {data, error, pending} = useAsync(async () => {
    const [products, memories] = await Promise.all([
      listMyProducts(),
      listMemories({owner: userId ?? undefined, limit: MEMORY_TILES}),
    ]);

    return {products: products.items, memories: memories.items};
  }, [userId]);

  if (pending) {
    return <LoadingScreen label="검색 정보 불러오는 중..." />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  // The API exposes no search parameter, so the loaded collection is filtered here.
  const needle = query.trim().toLowerCase();
  const matches = (...fields: string[]) =>
    !needle || fields.some((field) => field.toLowerCase().includes(needle));

  const products = (data?.products ?? []).filter((item) =>
    matches(item.product.name, item.product.line, item.product.color),
  );
  const memories = (data?.memories ?? []).filter((memory) =>
    matches(memory.place_name, memory.note),
  );

  return (
    <Screen label="검색" className={styles.page}>
      <header className={styles.header}>
        <h1 className={`${styles.title} typo-h1`}>검색</h1>

        <Link
          to="/settings"
          className={styles.avatarLink}
          aria-label="계정 정보"
        >
          <Avatar />
        </Link>
      </header>

      <Glass className={styles.field}>
        <IconSearchGlass className={styles.fieldIcon} />
        <input
          className={styles.fieldInput}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="제품, 추억, 스토어 등"
          aria-label="검색어"
        />
      </Glass>

      <section className={styles.products}>
        <Link to="/my-products" className={styles.sectionHeading}>
          <h2 className={styles.headingText}>보유 제품</h2>
          <IconChevronRight className={styles.headingChevron} />
        </Link>

        <div className={styles.rows}>
          {products.map((item) => (
            <Link
              key={item.id}
              to={`/product-memories/${item.id}`}
              className={styles.row}
            >
              <img
                className={styles.rowThumb}
                src={productThumbImage(item.product)}
                alt=""
              />
              <span className={styles.rowInfo}>
                <span className={styles.rowName}>{item.product.name}</span>
                <CountBadge
                  owned={item.capacity.used}
                  total={item.capacity.total}
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.memories}>
        <Link to="/map" className={styles.sectionHeading}>
          <h2 className={styles.headingText}>추억</h2>
          <IconChevronRight className={styles.headingChevron} />
        </Link>

        <div className={styles.categories}>
          {memories.map((memory, index) => {
            const label = memory.place_name || shortDate(memory.created_at);

            return (
              <Link
                key={memory.id}
                to={`/memory-detail/${memory.id}`}
                aria-label={label}
                className={styles.category}
                style={{
                  width: `${TILE_WIDTHS[index % TILE_WIDTHS.length] / 10}rem`,
                }}
              >
                <img
                  className={styles.categoryImage}
                  src={memoryPhoto(memory)}
                  onError={withPhotoFallback(memoryPhotoFallback(memory))}
                  alt=""
                />
                <span className={styles.categoryScrim} aria-hidden="true" />
                {index === 0 ? (
                  <IconStar className={styles.categoryStar} />
                ) : null}
                <span className={styles.categoryLabel}>{label}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </Screen>
  );
}
