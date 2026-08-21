import type {ColorType, DollType, PatternType} from "@/api";
import {
  Character1,
  Character6,
  CharacterThumb1,
  CharacterThumb10,
  Pattern1,
  Pattern2,
} from "@/assets/images";

export type CharacterTab = "body" | "color" | "pattern";

export type BodyOption = {
  id: string;
  name: string;
  thumb: string;
  /** Thumbnail footprint inside the 65x83 tile, in frame pixels. */
  size: {w: number; h: number};
  /** `Character.doll` value this tile saves. */
  doll: DollType;
};

export type ColorOption = {
  id: string;
  name: string;
  value: string;
  /** `Character.color` value this tile saves. */
  color: ColorType;
};

export type PatternOption = {
  id: string;
  name: string;
  image: string;
  /** `Character.pattern` value this tile saves. */
  pattern: PatternType;
};

/*
 * The frame offers three body tiles while `Character.doll` enumerates four
 * species, so each tile is bound to one of them. `dachshund` has no tile and is
 * therefore not selectable from this screen.
 */
export const bodyOptions: BodyOption[] = [
  {
    id: "sitting",
    name: "앉은 자세",
    thumb: CharacterThumb1,
    size: {w: 50, h: 50},
    doll: "bearbrick",
  },
  {
    id: "standing",
    name: "선 자세",
    thumb: Character6,
    size: {w: 59, h: 59},
    doll: "rabbit",
  },
  {
    id: "walking",
    name: "걷는 자세",
    thumb: CharacterThumb10,
    size: {w: 52, h: 68},
    doll: "puppy",
  },
];

export const colorOptions: ColorOption[] = [
  {id: "cognac", name: "코냑", value: "#b65408", color: "cognac"},
  {id: "black", name: "블랙", value: "#000000", color: "black"},
  {id: "white", name: "화이트", value: "#ffffff", color: "white"},
  {id: "grey", name: "그레이", value: "#b9b9bb", color: "silver"},
  {id: "rose", name: "로즈", value: "#e1a0a3", color: "pink"},
];

/* `cubic_monogram` has no tile in the frame. */
export const patternOptions: PatternOption[] = [
  {id: "visetos", name: "비세토스", image: Pattern1, pattern: "visetos"},
  {id: "lauretos", name: "로레토스", image: Pattern2, pattern: "lauretos"},
];

/** Artwork shown in the large preview above the picker. */
export const preview = Character1;

export const tabs: {id: CharacterTab; label: string; to: string}[] = [
  {id: "body", label: "바디", to: "/character/body"},
  {id: "color", label: "색상", to: "/character/color"},
  {id: "pattern", label: "패턴", to: "/character/pattern"},
];

/**
 * Values a brand-new character is created with. Shared with the registration
 * flow, which has to create a character before it can ask for recommendations.
 */
export {CHARACTER_DEFAULTS as defaultSelection} from "@/lib/catalogue";
