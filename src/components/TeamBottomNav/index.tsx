import {Link, useLocation} from "react-router-dom";
import {Glass} from "@samasante/liquid-glass";

import {IconHome, IconMap, IconSearch, IconStore, IconStorybook} from "@/assets/icons";

import styles from "./index.module.scss";

const homePaths = new Set([
  "/home",
  "/dog-detail",
  "/my-products",
  "/product-detail",
  "/product-photo",
  "/product-write",
  "/product-add",
  "/number-input",
]);

const items = [
  {to: "/home", label: "홈", Icon: IconHome, isActive: (pathname: string) => homePaths.has(pathname)},
  {to: "/map", label: "지도", Icon: IconMap, isActive: (pathname: string) => pathname === "/map"},
  {to: "/store", label: "스토어", Icon: IconStore, isActive: (pathname: string) => pathname === "/store"},
  {to: "/storybook", label: "스토리북", Icon: IconStorybook, isActive: (pathname: string) => pathname === "/storybook" || pathname === "/storybook-episode"},
  {to: "/search", label: "검색", Icon: IconSearch, isActive: (pathname: string) => pathname === "/search"},
] as const;

export const TeamBottomNav = () => {
  const {pathname} = useLocation();

  return (
    <Glass className={styles.nav} aria-label="main navigation">
      {items.map((item) => {
        const Icon = item.Icon;
        const isActive = item.isActive(pathname);

        return (
          <Link
            key={item.to}
            to={item.to}
            aria-current={isActive ? "page" : undefined}
            className={`${styles.item} ${isActive ? styles.active : ""}`}
          >
            <Icon className={styles.icon} />
            <span className={`${styles.label} typo-h6`}>{item.label}</span>
          </Link>
        );
      })}
    </Glass>
  );
};
