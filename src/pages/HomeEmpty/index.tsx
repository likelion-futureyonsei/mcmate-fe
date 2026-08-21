import {Link, Navigate} from "react-router-dom";
import {Glass} from "@samasante/liquid-glass";

import {listMyProducts} from "@/api";
import {IconBag, IconEdit, IconMail, IconPlus} from "@/assets/icons";
import {BgHomeEmpty, ProductSlotEmpty} from "@/assets/images";
import {Avatar, GlassButton, Logo, Screen, ScrollHint} from "@/components";
import {useAsync} from "@/hooks/useAsync";

import styles from "./index.module.scss";

/** Three blank shelf slots waiting for the first registration. */
const slots = [0, 1, 2];

export function HomeEmpty() {
  const {data} = useAsync(() => listMyProducts(), []);

  // Rendered straight away — the empty shelf is the correct first paint here, so
  // there is no loading frame. Once a product turns up, the real shelf takes over.
  if (data?.items.length) {
    return <Navigate to="/" replace />;
  }

  return (
    <Screen
      label="홈"
      background={BgHomeEmpty}
      tone="dark"
      className={styles.page}
    >
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

          {/* nothing to write about yet: the first step is registering a product */}
          <GlassButton label="추억 작성" to="/qr-register">
            <IconEdit className={styles.editIcon} />
          </GlassButton>
        </div>
      </header>

      <div className={styles.bottom}>
        <Glass className={styles.shelf}>
          <ul className={styles.slots}>
            {slots.map((slot) => (
              <li key={slot}>
                <Link
                  to="/qr-register"
                  aria-label="제품 등록"
                  className={styles.slot}
                  style={{backgroundImage: `url(${ProductSlotEmpty})`}}
                >
                  <IconPlus className={styles.slotIcon} />
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
          <span className={styles.totalValue}>0/0</span>
        </div>
      </div>
    </Screen>
  );
}
