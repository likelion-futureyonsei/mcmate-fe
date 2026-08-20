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
};

export type ColorOption = {id: string; name: string; value: string};

export type PatternOption = {id: string; name: string; image: string};

export const bodyOptions: BodyOption[] = [
  {
    id: "sitting",
    name: "앉은 자세",
    thumb: CharacterThumb1,
    size: {w: 50, h: 50},
  },
  {id: "standing", name: "선 자세", thumb: Character6, size: {w: 59, h: 59}},
  {
    id: "walking",
    name: "걷는 자세",
    thumb: CharacterThumb10,
    size: {w: 52, h: 68},
  },
];

export const colorOptions: ColorOption[] = [
  {id: "cognac", name: "코냑", value: "#b65408"},
  {id: "black", name: "블랙", value: "#000000"},
  {id: "white", name: "화이트", value: "#ffffff"},
  {id: "grey", name: "그레이", value: "#b9b9bb"},
  {id: "rose", name: "로즈", value: "#e1a0a3"},
];

export const patternOptions: PatternOption[] = [
  {id: "visetos", name: "비세토스", image: Pattern1},
  {id: "lauretos", name: "로레토스", image: Pattern2},
];

/** Artwork shown in the large preview above the picker. */
export const preview = Character1;

export const tabs: {id: CharacterTab; label: string; to: string}[] = [
  {id: "body", label: "바디", to: "/character/body"},
  {id: "color", label: "색상", to: "/character/color"},
  {id: "pattern", label: "패턴", to: "/character/pattern"},
];
