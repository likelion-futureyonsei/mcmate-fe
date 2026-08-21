import {request, requestPage} from "./client";
import type {
  Memory,
  MemoryCreatePayload,
  MemoryCreateResponse,
  MemoryUpdatePayload,
  UploadResponse,
} from "./types";

export type MemoryQuery = {
  owner?: number;
  product_id?: number;
  /** `lat`, `lng` and `radius` (metres) only take effect together. */
  lat?: number;
  lng?: number;
  radius?: number;
  limit?: number;
  offset?: number;
};

/**
 * `GET /memories` — public memories plus your own private ones, newest first.
 */
export const listMemories = (query: MemoryQuery = {}) =>
  requestPage<Memory>("/memories", {method: "GET", query});

export const getMemory = (memoryId: number) =>
  request<Memory>(`/memories/${memoryId}`, {method: "GET"});

/**
 * `POST /upload` — multipart, field name `file`, 10MB ceiling. Feed the
 * returned `key` into `createMemory` as `photo_key`.
 */
export const uploadPhoto = (file: File) => {
  const form = new FormData();
  form.append("file", file);

  return request<UploadResponse>("/upload", {method: "POST", form});
};

/**
 * `POST /memories`. The response is a capacity/unlock summary rather than the
 * memory, because creating a memory can open new storybook chapters (and
 * generate their text, which makes this call slow).
 */
export const createMemory = (payload: MemoryCreatePayload) =>
  request<MemoryCreateResponse>("/memories", {method: "POST", body: payload});

export const updateMemory = (memoryId: number, patch: MemoryUpdatePayload) =>
  request<Memory>(`/memories/${memoryId}`, {method: "PATCH", body: patch});

export const deleteMemory = (memoryId: number) =>
  request<void>(`/memories/${memoryId}`, {method: "DELETE"});
