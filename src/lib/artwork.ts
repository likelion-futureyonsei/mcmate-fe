import type {SyntheticEvent} from "react";

import {mediaUrl} from "@/api";
import type {Memory, Product, StorybookSummary} from "@/api";
import {
  Memory1,
  Memory2,
  Memory3,
  Memory4,
  Memory5,
  ProductBelt,
  ProductOttomar,
  ProductStark,
  ShotBelt,
  ShotCase,
  ShotOttomar,
  ShotSneakers,
  ShotStark,
  ShotWeekender,
  StoryBeach,
  StoryHeritage1,
  StoryHeritage2,
  StoryRockwell,
  StoryWalking,
  Swatch1,
  Swatch2,
  Swatch3,
  Swatch4,
  Swatch5,
} from "@/assets/images";

/**
 * The catalogue ships with `image_url` empty and memories only carry a storage
 * key, so the bundled artwork stands in whenever the API has no picture. The
 * fallback is picked from the record id, which keeps a product or a memory
 * looking the same on every screen and across reloads.
 */
const pick = <T>(pool: readonly T[], seed: number): T =>
  pool[((seed % pool.length) + pool.length) % pool.length];

/** Cut-out shelf artwork (Home). */
const shelfArtwork = [ProductStark, ProductBelt, ProductOttomar] as const;

/** Large product photography (My Products collage, product detail hero). */
const productShots = [
  ShotStark,
  ShotBelt,
  ShotOttomar,
  ShotCase,
  ShotSneakers,
  ShotWeekender,
] as const;

/** Small rail thumbnails. */
const productThumbs = [Swatch1, Swatch2, Swatch3, Swatch4, Swatch5] as const;

const memoryPhotos = [Memory1, Memory2, Memory3, Memory4, Memory5] as const;

const productCovers = [StoryWalking, StoryBeach, StoryRockwell] as const;
const placeCovers = [StoryHeritage1, StoryHeritage2] as const;

const remote = (url: string | null | undefined) =>
  url && url.trim() ? url : null;

export const productShelfImage = (product: Product) =>
  remote(product.image_url) ?? pick(shelfArtwork, product.id - 1);

/**
 * `seed` lets a caller tie the artwork to a layout position instead of the
 * product: the My Products collage draws each slot around the silhouette of a
 * specific cut-out, so the slot has to keep its own picture.
 */
export const productShotImage = (product: Product, seed = product.id - 1) =>
  remote(product.image_url) ?? pick(productShots, seed);

export const productThumbImage = (product: Product) =>
  remote(product.image_url) ?? pick(productThumbs, product.id - 1);

export const memoryPhoto = (memory: Pick<Memory, "id" | "photo">) =>
  mediaUrl(memory.photo) ?? memoryPhotoFallback(memory);

/** Bundled stand-in for a memory whose photo cannot be loaded. */
export const memoryPhotoFallback = (memory: Pick<Memory, "id">) =>
  pick(memoryPhotos, memory.id - 1);

/**
 * Swaps a broken image for bundled artwork, once.
 *
 * Uploaded photos are served from `MEDIA_URL`, and a deployment that does not
 * route that prefix to Django answers with the SPA's `index.html` instead of the
 * file. Rather than leaving a broken frame on the screen, the shot falls back to
 * the artwork the prototype shipped with.
 */
export const withPhotoFallback =
  (fallback: string) => (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;

    if (image.dataset.fallback === "applied") {
      return;
    }

    image.dataset.fallback = "applied";
    image.src = fallback;
  };

export const storybookCover = (
  storybook: Pick<StorybookSummary, "id" | "scope" | "cover_url">,
) =>
  remote(storybook.cover_url) ??
  (storybook.scope === "place"
    ? pick(placeCovers, storybook.id - 1)
    : pick(productCovers, storybook.id - 1));

/**
 * Splits a product name into the caption lines the collage was drawn with: the
 * design breaks long names onto a second line rather than letting them wrap.
 */
export const captionLines = (name: string, perLine = 14): string[] => {
  const words = name.split(" ").filter(Boolean);
  const lines: string[] = [];

  words.forEach((word) => {
    const last = lines.length - 1;

    if (last >= 0 && `${lines[last]} ${word}`.length <= perLine) {
      lines[last] = `${lines[last]} ${word}`;
    } else {
      lines.push(word);
    }
  });

  return lines.length ? lines : [name];
};
