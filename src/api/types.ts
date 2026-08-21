/**
 * Wire shapes of the Django API. Field names and nullability mirror the
 * serializers of `mcmate-be` exactly — `lat` and `lng` are
 * `DecimalField`s, so DRF sends them as strings.
 */

/* ── accounts ─────────────────────────────────────────────────────────── */

export type DollType = "bearbrick" | "rabbit" | "puppy" | "dachshund";
export type PatternType = "visetos" | "lauretos" | "cubic_monogram";
export type ColorType = "cognac" | "black" | "white" | "silver" | "pink";

export type CharacterBrief = {
  id: number;
  doll: DollType;
  pattern: PatternType;
  color: ColorType;
  equipped_product: number | null;
};

export type Character = CharacterBrief & {owner: number; created_at: string};

/** `GET /users/{id}` when the id is the authenticated user. */
export type UserSelf = {
  id: number;
  email: string;
  nickname: string;
  birth: string | null;
  phone: string;
  agree_data: boolean;
  agree_marketing: boolean;
  notify_memory: boolean;
  notify_place: boolean;
  notify_ad: boolean;
  character: CharacterBrief | null;
  created_at: string;
};

/** `GET /users/{id}` for anybody else. */
export type UserPublic = {
  id: number;
  nickname: string;
  character: CharacterBrief | null;
};

export type LoginResponse = {
  user_id: number;
  nickname: string;
  access_token: string;
  refresh_token: string;
};

export type RefreshResponse = {access_token: string; refresh_token?: string};

export type SignUpPayload = {
  email: string;
  password: string;
  nickname: string;
  birth?: string | null;
  phone?: string;
  agree_data: boolean;
  agree_marketing?: boolean;
};

/* ── products ─────────────────────────────────────────────────────────── */

/** Catalogue master record. */
export type Product = {
  id: number;
  name: string;
  line: string;
  pattern: string;
  color: string;
  product_code: string;
  capacity: number;
  warranty_months: number;
  care_guide: string;
  image_url: string;
  store_url: string;
  storybook: number | null;
};

/** A product the signed-in user has registered. */
export type UserProduct = {
  id: number;
  owner: number;
  product: Product;
  serial_no: string;
  acquired_at: string;
  capacity: {used: number; total: number};
  memory_count: number;
};

/* ── memories ─────────────────────────────────────────────────────────── */

export type Visibility = "public" | "private";

export type Memory = {
  id: number;
  owner: number;
  user_product: number;
  /** Storage key from `POST /upload`; resolve with `mediaUrl()`. */
  photo: string;
  lat: string;
  lng: string;
  place_name: string;
  note: string;
  visibility: Visibility;
  created_at: string;
};

export type UploadResponse = {key: string; url: string};

export type MemoryCreatePayload = {
  user_product_id: number;
  photo_key?: string;
  lat: number;
  lng: number;
  place_name?: string;
  note?: string;
  visibility?: Visibility;
};

export type UnlockedChapter = {
  storybook_id: number;
  chapter_id: number;
  chapter_no: number;
  reason: "memory_count" | "place_visit";
};

/** `POST /memories` answers with this instead of the memory itself. */
export type MemoryCreateResponse = {
  id: number;
  created_at: string;
  capacity: {used: number; total: number};
  unlocked: UnlockedChapter[];
};

export type MemoryUpdatePayload = {
  photo_key?: string;
  place_name?: string;
  note?: string;
  visibility?: Visibility;
};

/* ── storybooks ───────────────────────────────────────────────────────── */

export type StorybookScopeType = "product" | "place";

export type StorybookSummary = {
  id: number;
  scope: StorybookScopeType;
  title: string;
  cover_url: string;
  unlocked: boolean;
  latest_chapter: number | null;
};

export type Chapter = {
  id: number;
  chapter_no: number;
  title: string;
  required_memories: number;
  unlocked: boolean;
  story: string | null;
};

export type StorybookDetail = {
  id: number;
  scope: StorybookScopeType;
  title: string;
  cover_url: string;
  chapters: Chapter[];
};

export type GeneratedChapter = {
  storybook_id: number;
  chapter_id: number;
  chapter_no: number;
  title: string;
  body: string;
};
