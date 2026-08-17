import { SAMPLE_ARTICLES } from "./sample-content";
import { getPublicArticles, loadStudioState } from "./studio-store";
import type { Article } from "./types";

export function getPublishedArticles(storage?: Storage): Article[] {
  if (storage) return getPublicArticles(loadStudioState(storage));

  return SAMPLE_ARTICLES.filter((article) => article.status === "published");
}

export function getArticleById(id: string, storage?: Storage): Article | undefined {
  return getPublishedArticles(storage).find((article) => article.id === id);
}
