import { SAMPLE_ARTICLES } from "./sample-content";
import { getPublicArticles, loadStudioState } from "./studio-store";
import type { Article } from "./types";

type ContentStorage = Pick<Storage, "getItem" | "setItem">;

export function getPublishedArticles(storage?: ContentStorage): Article[] {
  if (storage) return getPublicArticles(loadStudioState(storage).state).map(restoreSeedHeroImage);

  return SAMPLE_ARTICLES.filter((article) => article.status === "published");
}

function restoreSeedHeroImage(article: Article): Article {
  if (article.heroImage) return article;
  const seed = SAMPLE_ARTICLES.find((item) => item.id === article.id && item.title === article.title);
  return seed?.heroImage ? { ...article, heroImage: { ...seed.heroImage } } : article;
}

export function getArticleById(id: string, storage?: ContentStorage): Article | undefined {
  return getPublishedArticles(storage).find((article) => article.id === id);
}
