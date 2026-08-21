import {request, requestPage} from "./client";
import type {Product, UserProduct} from "./types";

/**
 * `GET /products` — the signed-in user's registered products, newest first.
 * The backend rejects an `owner` that is not you, so it is never sent.
 */
export const listMyProducts = (
  params: {limit?: number; offset?: number} = {},
) => requestPage<UserProduct>("/products", {method: "GET", query: params});

export const getMyProduct = (userProductId: number) =>
  request<UserProduct>(`/products/${userProductId}`, {method: "GET"});

/** `POST /products` — registers a serial number against a catalogue product. */
export const registerProduct = (productId: number, serialNo: string) =>
  request<UserProduct>("/products", {
    method: "POST",
    body: {product_id: productId, serial_no: serialNo},
  });

/**
 * `GET /recommend` — up to three catalogue products. Exactly one of the two
 * seeds must be given: a character (pattern/colour affinity) or one of your
 * registered products (capacity upgrade).
 */
export const recommendForCharacter = (characterId: number) =>
  request<Product[]>("/recommend", {
    method: "GET",
    query: {character_id: characterId},
  });

export const recommendForProduct = (userProductId: number) =>
  request<Product[]>("/recommend", {
    method: "GET",
    query: {product_id: userProductId},
  });
