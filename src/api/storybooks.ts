import {request} from "./client";
import type {
  GeneratedChapter,
  StorybookDetail,
  StorybookSummary,
} from "./types";

/** `GET /storybooks` — every storybook, flagged with your unlock progress. Not paginated. */
export const listStorybooks = (owner?: number) =>
  request<StorybookSummary[]>("/storybooks", {method: "GET", query: {owner}});

export const getStorybook = (storybookId: number) =>
  request<StorybookDetail>(`/storybooks/${storybookId}`, {method: "GET"});

/**
 * `POST /generate` — (re)writes a chapter with the LLM. Requires the chapter to
 * be unlocked and `OPENAI_API_KEY` to be configured on the server (503 if not).
 */
export const generateChapter = (chapterId: number) =>
  request<GeneratedChapter>("/generate", {
    method: "POST",
    body: {chapter_id: chapterId},
  });
