import {Link, Navigate} from "react-router-dom";
import {Glass} from "@samasante/liquid-glass";

import {listMyProducts} from "@/api";
import {IconBag, IconEdit, IconMail} from "@/assets/icons";
import {BgHome} from "@/assets/images";
import {
  Avatar,
  CountBadge,
  GlassButton,
  Logo,
  Screen,
  ScrollHint,
} from "@/components";
import {useAsync} from "@/hooks/useAsync";
import {productShelfImage} from "@/lib";
import {ErrorScreen, LoadingScreen} from "@/pages/Loading/LoadingScreen";

import styles from "./index.module.scss";

export function Home() {
  const {data, error, pending} = useAsync(() => listMyProducts(), []);

  if (pending || (!data && !error)) {
    return <LoadingScreen label="나의 제품 불러오는 중..." />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  const products = data?.items ?? [];

  // The shelf has nothing to show until the first serial is registered, and the
  // empty state is its own frame in the first-run journey.
  if (!products.length) {
    return <Navigate to="/home-empty" replace />;
  }

  /** Memories recorded across the whole collection, not just the shelf. */
  const collection = products.reduce(
    (total, item) => ({
      owned: total.owned + item.capacity.used,
      total: total.total + item.capacity.total,
    }),
    {owned: 0, total: 0},
  );

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

          <GlassButton
            label="추억 작성"
            to={`/memory-write?product=${products[0].id}`}
          >
            <IconEdit className={styles.editIcon} />
          </GlassButton>
        </div>
      </header>

      <div className={styles.bottom}>
        <Glass className={styles.shelf}>
          <ul className={styles.tiles}>
            {products.map((item, index) => (
              <li key={item.id}>
                <Link
                  to={`/product-memories/${item.id}`}
                  aria-label={item.product.name}
                  className={`${styles.tile} ${index === 0 ? styles.tileActive : ""}`}
                  style={{
                    backgroundImage: `url(${productShelfImage(item.product)})`,
                  }}
                >
                  <CountBadge
                    owned={item.capacity.used}
                    total={item.capacity.total}
                  />
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
