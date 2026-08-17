import { SAMPLE_ARTICLES } from "./sample-content";
import { getPublicArticles, loadStudioState } from "./studio-store";
import type { Article } from "./types";

type ContentStorage = Pick<Storage, "getItem" | "setItem">;

export function getPublishedArticles(storage?: ContentStorage): Article[] {
  if (storage) return getPublicArticles(loadStudioState(storage));

  return SAMPLE_ARTICLES.filter((article) => article.status === "published");
}

export function getArticleById(id: string, storage?: ContentStorage): Article | undefined {
  return getPublishedArticles(storage).find((article) => article.id === id);
}
