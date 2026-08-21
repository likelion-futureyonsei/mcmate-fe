import {request, requestPage} from "./client";
import type {Character, ColorType, DollType, PatternType} from "./types";

export type CharacterPayload = {
  doll: DollType;
  pattern: PatternType;
  color: ColorType;
  /** A `UserProduct` id you own, or null. */
  equipped_product?: number | null;
};

export const listCharacters = (owner?: number) =>
  requestPage<Character>("/characters", {method: "GET", query: {owner}});

/** One character per user — the backend answers 409 on a second POST. */
export const createCharacter = (payload: CharacterPayload) =>
  request<Character>("/characters", {method: "POST", body: payload});

export const getCharacter = (characterId: number) =>
  request<Character>(`/characters/${characterId}`, {method: "GET"});

export const updateCharacter = (
  characterId: number,
  patch: Partial<CharacterPayload>,
) =>
  request<Character>(`/characters/${characterId}`, {
    method: "PATCH",
    body: patch,
  });

/**
 * Creates the character on first save and patches it afterwards, so callers do
 * not have to care whether one already exists.
 */
export const saveCharacter = async (
  characterId: number | null | undefined,
  payload: CharacterPayload,
) =>
  characterId
    ? updateCharacter(characterId, payload)
    : createCharacter(payload);
