import {useState, type CSSProperties} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Glass} from "@samasante/liquid-glass";

import {saveCharacter, type CharacterPayload} from "@/api";
import {IconBody, IconPalette, IconPattern, IconTick} from "@/assets/icons";
import {BgCharacter} from "@/assets/images";
import {useAuth} from "@/auth";
import {GlassButton, Logo, Screen, ScrollHint} from "@/components";

import styles from "./index.module.scss";
import {
  bodyOptions,
  colorOptions,
  defaultSelection,
  patternOptions,
  previewFor,
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
 *
 * Each tile writes straight through to `POST/PATCH /characters`, because the
 * tabs are separate routes and an unsaved selection would not survive the hop.
 */
export function Character({tab = "body"}: CharacterProps) {
  const navigate = useNavigate();
  const {user, refresh} = useAuth();
  const character = user?.character ?? null;

  const [selection, setSelection] = useState<CharacterPayload>({
    doll: character?.doll ?? defaultSelection.doll,
    pattern: character?.pattern ?? defaultSelection.pattern,
    color: character?.color ?? defaultSelection.color,
    equipped_product: character?.equipped_product ?? null,
  });
  const [saving, setSaving] = useState(false);

  const scrolls = optionCount[tab] > VISIBLE_TILES;

  const choose = async (patch: Partial<CharacterPayload>) => {
    const next = {...selection, ...patch};

    setSelection(next);
    setSaving(true);

    try {
      await saveCharacter(character?.id ?? null, next);
      await refresh();
    } catch {
      // Roll back so the tray keeps showing what the server actually holds.
      setSelection(selection);
    } finally {
      setSaving(false);
    }
  };

  /**
   * On a first run nothing has been tapped yet, so confirming has to create the
   * character from the defaults — otherwise the shelf would bounce the user
   * straight back here.
   */
  const finishSetup = async () => {
    if (!character) {
      await choose({});
    }

    navigate("/", {replace: true});
  };

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
          onClick={() => void finishSetup()}
          disabled={saving}
          tint="subtle"
          className={styles.confirm}
        >
          <IconTick className={styles.tickIcon} />
        </GlassButton>
      </header>

      <img
        className={styles.preview}
        src={previewFor(selection.doll)}
        alt=""
      />

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
            bodyOptions.map((option) => {
              const active = option.doll === selection.doll;

              return (
                <li key={option.id}>
                  <button
                    type="button"
                    aria-label={option.name}
                    aria-pressed={active}
                    disabled={saving}
                    onClick={() => void choose({doll: option.doll})}
                    className={`${styles.tile} ${active ? styles.tileSelected : ""}`}
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
              );
            })}

          {tab === "color" &&
            colorOptions.map((option) => {
              const active = option.color === selection.color;

              return (
                <li key={option.id}>
                  <button
                    type="button"
                    aria-label={option.name}
                    aria-pressed={active}
                    disabled={saving}
                    onClick={() => void choose({color: option.color})}
                    className={`${styles.tile} ${styles.tileColor} ${active ? styles.tileSelected : ""}`}
                  >
                    <span
                      className={styles.chip}
                      style={{"--chip-color": option.value} as CSSProperties}
                    />
                  </button>
                </li>
              );
            })}

          {tab === "pattern" &&
            patternOptions.map((option) => {
              const active = option.pattern === selection.pattern;

              return (
                <li key={option.id}>
                  <button
                    type="button"
                    aria-label={option.name}
                    aria-pressed={active}
                    disabled={saving}
                    onClick={() => void choose({pattern: option.pattern})}
                    className={`${styles.tile} ${styles.tilePattern} ${active ? styles.tileSelected : ""}`}
                  >
                    <img className={styles.swatch} src={option.image} alt="" />
                  </button>
                </li>
              );
            })}
        </ul>

        {scrolls ? <ScrollHint /> : null}
      </Glass>
    </Screen>
  );
}

export const CharacterBody = () => <Character tab="body" />;
export const CharacterColor = () => <Character tab="color" />;
export const CharacterPattern = () => <Character tab="pattern" />;
