import {NavLink} from "react-router-dom";
import { Glass } from "@samasante/liquid-glass";

import styles from "./index.module.scss";

const items = [
  {to: "/", label: "홈", icon: "home"},
  {to: "/memories", label: "추억", icon: "memory"},
  {to: "/store", label: "스토어", icon: "store"},
  {to: "/settings", label: "설정", icon: "settings"},
  {to: "/search", label: "검색", icon: "search"},
] as const;

export const BottomNav = () => {
  return (
    <Glass className={styles.nav} aria-label="main navigation">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className={({isActive}) =>
            `${styles.item} ${isActive ? styles.active : ""}`
          }
        >
          <span className={`${styles.icon} ${styles[item.icon]}`} />
          <span className={styles.label}>{item.label}</span>
        </NavLink>
      ))}
    </Glass>
  );
};
