import {NavLink} from "react-router-dom";
import {Glass} from "@samasante/liquid-glass";

import styles from "./index.module.scss";
import {
  IconNavHome,
  IconNavMap,
  IconNavSearch,
  IconNavStore,
  IconNavStorybook,
} from "@/assets/icons";

const items = [
  {to: "/", label: "홈", Icon: IconNavHome},
  {to: "/map", label: "지도", Icon: IconNavMap},
  {to: "/store", label: "스토어", Icon: IconNavStore},
  {to: "/storybook", label: "스토리북", Icon: IconNavStorybook},
  {to: "/search", label: "검색", Icon: IconNavSearch},
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
