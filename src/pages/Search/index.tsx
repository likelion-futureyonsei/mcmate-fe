import {useState} from "react";
import {Link} from "react-router-dom";
import {Glass} from "@samasante/liquid-glass";

import {IconChevronRight, IconSearchGlass, IconStar} from "@/assets/icons";
import {
  Memory1,
  Memory2,
  Memory3,
  Memory5,
  Swatch1,
  Swatch2,
  Swatch3,
} from "@/assets/images";
import {Avatar, CountBadge, Screen} from "@/components";

import styles from "./index.module.scss";

const products = [
  {
    id: "stark",
    name: "Stark 사이드 스터드 비세토스 백팩",
    thumb: Swatch1,
    owned: 5,
    total: 50,
  },
  {
    id: "belt",
    name: "비세토스 프루스튼 벨트백",
    thumb: Swatch2,
    owned: 3,
    total: 50,
  },
  {
    id: "ottomar",
    name: "Ottomar 비세토스 위켄더",
    thumb: Swatch3,
    owned: 35,
    total: 100,
  },
];

const categories = [
  {
    id: "favourite",
    label: "즐겨찾기",
    image: Memory1,
    width: 75,
    starred: true,
  },
  {id: "background", label: "배경", image: Memory2, width: 58},
  {id: "animal", label: "동물", image: Memory3, width: 70},
  {id: "food", label: "음식", image: Memory5, width: 80},
];

export function Search() {
  const [query, setQuery] = useState("");

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
          {products.map((product) => (
            <Link
              key={product.id}
              to="/product-memories"
              className={styles.row}
            >
              <img className={styles.rowThumb} src={product.thumb} alt="" />
              <span className={styles.rowInfo}>
                <span className={styles.rowName}>{product.name}</span>
                <CountBadge owned={product.owned} total={product.total} />
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
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/map"
              aria-label={category.label}
              className={styles.category}
              style={{width: `${category.width / 10}rem`}}
            >
              <img
                className={styles.categoryImage}
                src={category.image}
                alt=""
              />
              <span className={styles.categoryScrim} aria-hidden="true" />
              {category.starred ? (
                <IconStar className={styles.categoryStar} />
              ) : null}
              <span className={styles.categoryLabel}>{category.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </Screen>
  );
}
