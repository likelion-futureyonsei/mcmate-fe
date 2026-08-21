import {
  createCharacter,
  listCharacters,
  listMyProducts,
  recommendForCharacter,
  recommendForProduct,
  type CharacterPayload,
  type Product,
} from "@/api";

/**
 * What a character is created with before the customiser has been opened. These
 * are the first tile of each picker in `pages/Character/options.ts`, which
 * re-exports them so the two cannot drift apart.
 */
export const CHARACTER_DEFAULTS: CharacterPayload = {
  doll: "bearbrick",
  pattern: "visetos",
  color: "cognac",
};

/**
 * The API exposes no catalogue listing and no "look up a product by its code"
 * endpoint — `GET /recommend` is the only route that returns `Product` records.
 * Registration therefore resolves its candidates through it, trying the seeds it
 * accepts in turn:
 *
 *   1. the signed-in user's character (pattern / colour affinity)
 *   2. one of their registered products (capacity upgrade)
 *   3. any existing character, since `character_id` is not owner-restricted
 *
 * Returns an empty list when none of them is available, which the screens report
 * instead of guessing an id.
 */
export const resolveCatalogue = async (
  characterId: number | null | undefined,
): Promise<Product[]> => {
  if (characterId) {
    try {
      const byCharacter = await recommendForCharacter(characterId);

      if (byCharacter.length) {
        return byCharacter;
      }
    } catch {
      /* fall through to the next seed */
    }
  }

  try {
    const mine = await listMyProducts({limit: 1});

    if (mine.items.length) {
      const byProduct = await recommendForProduct(mine.items[0].id);

      if (byProduct.length) {
        return byProduct;
      }
    }
  } catch {
    /* fall through to the next seed */
  }

  try {
    const characters = await listCharacters();

    if (characters.items.length) {
      return await recommendForCharacter(characters.items[0].id);
    }
  } catch {
    /* fall through to the last resort */
  }

  // A brand-new account has neither, which would leave the very first
  // registration with no way to name a product. The character is a core entity
  // the app needs regardless, so it is created with the customiser's defaults
  // and used as the recommendation seed. A 409 here means one already exists,
  // in which case the branch above will find it next time.
  try {
    const created = await createCharacter(CHARACTER_DEFAULTS);

    return await recommendForCharacter(created.id);
  } catch {
    return [];
  }
};

/**
 * Serial numbers are globally unique and supplied by the client. The QR frame has
 * no field for one, so a code scanned without a serial gets a derived one.
 */
export const deriveSerial = (product: Product) =>
  `${product.product_code}-${Date.now().toString(36).toUpperCase()}`;

export type ScannedCode = {productId: number | null; serialNo: string | null};

/**
 * Reads a registration code. Accepted shapes, in order of preference:
 *   `{"product_id": 1, "serial_no": "SN-0001"}`
 *   `mcmate:1:SN-0001` / `1:SN-0001` / `1-SN-0001`
 *   a bare serial number
 */
export const parseCode = (raw: string): ScannedCode => {
  const text = raw.trim();

  if (!text) {
    return {productId: null, serialNo: null};
  }

  if (text.startsWith("{")) {
    try {
      const parsed = JSON.parse(text) as {
        product_id?: unknown;
        serial_no?: unknown;
      };
      const productId = Number(parsed.product_id);

      return {
        productId: Number.isFinite(productId) ? productId : null,
        serialNo:
          typeof parsed.serial_no === "string" ? parsed.serial_no : null,
      };
    } catch {
      /* not JSON after all — fall through to the delimited forms */
    }
  }

  const delimited = text.replace(/^mcmate:/i, "").match(/^(\d+)[:-](.+)$/);

  if (delimited) {
    return {productId: Number(delimited[1]), serialNo: delimited[2]};
  }

  return {productId: null, serialNo: text};
};
