/** Presentation helpers for values that arrive from the API as raw strings. */

/** `2026-08-16T09:00:00+09:00` -> `8월 16일`, the format the frames were drawn with. */
export const shortDate = (iso: string): string => {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

/** `DecimalField`s are serialised as strings, so coordinates need parsing. */
export const toNumber = (value: string | number | null | undefined): number => {
  const parsed = typeof value === "number" ? value : Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
};

/**
 * A memory has no title field, so the first sentence of the note doubles as one
 * — the same way the mock copy was split into a heading and a body.
 */
const TITLE_LIMIT = 24;

export const memoryTitle = (note: string, placeName: string): string => {
  const trimmed = note.trim();

  if (!trimmed) {
    return placeName || "추억";
  }

  const [firstLine] = trimmed.split("\n");
  const sentence = firstLine.split(/(?<=[.!?…])\s/)[0] ?? firstLine;

  if (sentence.length <= TITLE_LIMIT) {
    return sentence;
  }

  return `${sentence.slice(0, TITLE_LIMIT).trimEnd()}…`;
};

export const memoryBody = (note: string, title: string): string => {
  const trimmed = note.trim();

  return trimmed.startsWith(title)
    ? trimmed.slice(title.length).trim() || trimmed
    : trimmed;
};

/** Splits a generated story into paragraphs for the storybook reader. */
export const paragraphs = (body: string): string[] =>
  body
    .split(/\n{2,}|\n/)
    .map((line) => line.trim())
    .filter(Boolean);
