import {Link} from "react-router-dom";
import {Glass} from "@samasante/liquid-glass";

import {IconBag, IconEdit, IconMail} from "@/assets/icons";
import {
  BgHome,
  ProductBelt,
  ProductOttomar,
  ProductStark,
} from "@/assets/images";
import {
  Avatar,
  CountBadge,
  GlassButton,
  Logo,
  Screen,
  ScrollHint,
} from "@/components";

import styles from "./index.module.scss";

const products = [
  {
    id: "stark",
    name: "Stark 사이드 스터드 비세토스 백팩",
    image: ProductStark,
    owned: 5,
    total: 50,
  },
  {
    id: "belt",
    name: "비세토스 프루스튼 벨트백",
    image: ProductBelt,
    owned: 3,
    total: 50,
  },
  {
    id: "ottomar",
    name: "Ottomar 비세토스 위켄더",
    image: ProductOttomar,
    owned: 35,
    total: 100,
  },
];

/** Memories recorded across the whole collection, not just the shelf. */
const collection = {owned: 72, total: 280};

export function Home() {
  return (
    <Screen label="홈" background={BgHome} tone="dark" className={styles.page}>
      <header className={styles.header}>
        <Logo className={styles.logo} />

        <div className={styles.tools}>
          <Link
            to="/settings"
            className={styles.avatarLink}
            aria-label="계정 정보"
          >
            <Avatar />
          </Link>

          <GlassButton label="알림" to="/storybook">
            <IconMail className={styles.mailIcon} />
          </GlassButton>

          <GlassButton label="추억 작성" to="/memory-write">
            <IconEdit className={styles.editIcon} />
          </GlassButton>
        </div>
      </header>

      <div className={styles.bottom}>
        <Glass className={styles.shelf}>
          <ul className={styles.tiles}>
            {products.map((product, index) => (
              <li key={product.id}>
                <Link
                  to="/product-memories"
                  aria-label={product.name}
                  className={`${styles.tile} ${index === 0 ? styles.tileActive : ""}`}
                  style={{backgroundImage: `url(${product.image})`}}
                >
                  <CountBadge owned={product.owned} total={product.total} />
                </Link>
              </li>
            ))}
          </ul>

          <ScrollHint />
        </Glass>

        <div className={styles.total}>
          <GlassButton to="/my-products" label="나의 제품">
            <IconBag className={styles.totalIcon} />
          </GlassButton>
          <span className={styles.totalValue}>
            {collection.owned}/{collection.total}
          </span>
        </div>
      </div>
    </Screen>
  );
}
