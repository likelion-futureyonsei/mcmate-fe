import type {CSSProperties} from "react";
import {Link} from "react-router-dom";
import {Glass} from "@samasante/liquid-glass";

import {IconBody, IconPalette, IconPattern, IconTick} from "@/assets/icons";
import {BgCharacter} from "@/assets/images";
import {GlassButton, Logo, Screen, ScrollHint} from "@/components";

import styles from "./index.module.scss";
import {
  bodyOptions,
  colorOptions,
  patternOptions,
  preview,
  tabs,
  type CharacterTab,
} from "./options";

const tabIcons = {
  body: <IconBody className={styles.bodyIcon} />,
  color: <IconPalette className={styles.paletteIcon} />,
  pattern: <IconPattern className={styles.patternIcon} />,
};

const labels: Record<CharacterTab, string> = {
  body: "캐릭터 바디",
  color: "캐릭터 색상",
  pattern: "캐릭터 패턴",
};

/** Number of tiles that fit the tray before it starts scrolling. */
const VISIBLE_TILES = 3;

const optionCount: Record<CharacterTab, number> = {
  body: bodyOptions.length,
  color: colorOptions.length,
  pattern: patternOptions.length,
};

type CharacterProps = {
  /** Which picker the frame opens on. */
  tab?: CharacterTab;
};

/**
 * Character customiser. One frame per picker (body / colour / pattern), with
 * the folder tabs switching between them.
 */
export function Character({tab = "body"}: CharacterProps) {
  const scrolls = optionCount[tab] > VISIBLE_TILES;

  return (
    <Screen
      label={labels[tab]}
      background={null}
      backdrop={BgCharacter}
      tone="dark"
      className={styles.page}
    >
      <header className={styles.header}>
        <Logo className={styles.logo} />

        <GlassButton
          label="선택 완료"
          to="/"
          tint="subtle"
          className={styles.confirm}
        >
          <IconTick className={styles.tickIcon} />
        </GlassButton>
      </header>

      <img className={styles.preview} src={preview} alt="" />

      <nav className={styles.tabs} aria-label="캐릭터 편집 항목">
        {tabs.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            aria-label={item.label}
            aria-current={item.id === tab ? "page" : undefined}
            className={`${styles.tab} ${item.id === tab ? styles.tabActive : ""}`}
          >
            {tabIcons[item.id]}
          </Link>
        ))}
      </nav>

      <Glass className={styles.tray}>
        <ul className={styles.options}>
          {tab === "body" &&
            bodyOptions.map((option, index) => (
              <li key={option.id}>
                <button
                  type="button"
                  aria-label={option.name}
                  aria-pressed={index === 0}
                  className={`${styles.tile} ${index === 0 ? styles.tileSelected : ""}`}
                >
                  <img
                    className={styles.figure}
                    src={option.thumb}
                    alt=""
                    style={{
                      width: `${option.size.w / 10}rem`,
                      height: `${option.size.h / 10}rem`,
                    }}
                  />
                </button>
              </li>
            ))}

          {tab === "color" &&
            colorOptions.map((option, index) => (
              <li key={option.id}>
                <button
                  type="button"
                  aria-label={option.name}
                  aria-pressed={index === 0}
                  className={`${styles.tile} ${styles.tileColor} ${index === 0 ? styles.tileSelected : ""}`}
                >
                  <span
                    className={styles.chip}
                    style={{"--chip-color": option.value} as CSSProperties}
                  />
                </button>
              </li>
            ))}

          {tab === "pattern" &&
            patternOptions.map((option, index) => (
              <li key={option.id}>
                <button
                  type="button"
                  aria-label={option.name}
                  aria-pressed={index === 0}
                  className={`${styles.tile} ${styles.tilePattern} ${index === 0 ? styles.tileSelected : ""}`}
                >
                  <img className={styles.swatch} src={option.image} alt="" />
                </button>
              </li>
            ))}
        </ul>

        {scrolls ? <ScrollHint /> : null}
      </Glass>
    </Screen>
  );
}

export const CharacterBody = () => <Character tab="body" />;
export const CharacterColor = () => <Character tab="color" />;
export const CharacterPattern = () => <Character tab="pattern" />;
