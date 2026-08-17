import { SAMPLE_ARTICLES } from "./sample-content";
import type { Article } from "./types";

export function getPublishedArticles(): Article[] {
  return SAMPLE_ARTICLES.filter((article) => article.status === "published");
}

export function getArticleById(id: string): Article | undefined {
  return getPublishedArticles().find((article) => article.id === id);
}
