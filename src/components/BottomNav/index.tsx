import {NavLink} from "react-router-dom";
import {Glass} from "@samasante/liquid-glass";

import styles from "./index.module.scss";
import {
  IconHome,
  IconMemory,
  IconSearch,
  IconStore,
  IconUser,
} from "@/assets/icons";

const items = [
  {to: "/", label: "홈", Icon: IconHome},
  {to: "/memories", label: "추억", Icon: IconMemory},
  {to: "/store", label: "스토어", Icon: IconStore},
  {to: "/settings", label: "설정", Icon: IconUser},
  {to: "/search", label: "검색", Icon: IconSearch},
] as const;

export const BottomNav = () => {
  return (
    <Glass className={styles.nav} aria-label="main navigation">
      {items.map((item) => {
        const Icon = item.Icon;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({isActive}) =>
              `${styles.item} ${isActive ? styles.active : ""}`
            }
          >
            <Icon className={styles.icon} />
            <span className={`${styles.label} typo-h6`}>{item.label}</span>
          </NavLink>
        );
      })}
    </Glass>
  );
};
