import { createSeedStudioState } from "./studio-seed";
import type { StudioArticle } from "./studio-types";
import type { Article } from "./types";

export const STUDIO_STORAGE_KEY = "nonfiction-lab:studio:v1";
export const CORRUPT_STUDIO_BACKUP_KEY = "nonfiction-lab:studio:corrupt-backup";

export type StudioState = {
  schemaVersion: 1;
  articles: StudioArticle[];
};

type StudioStorage = Pick<Storage, "getItem" | "setItem">;

export function loadStudioState(storage: StudioStorage): StudioState {
  try {
    const raw = storage.getItem(STUDIO_STORAGE_KEY);
    if (!raw) return createSeedStudioState();

    const parsed: unknown = JSON.parse(raw);
    if (isStudioState(parsed)) return parsed;

    backupCorruptStudioState(storage, raw);
  } catch {
    const raw = storage.getItem(STUDIO_STORAGE_KEY);
    if (raw) backupCorruptStudioState(storage, raw);
  }

  return createSeedStudioState();
}

export function saveStudioState(storage: Pick<Storage, "setItem">, state: StudioState): void {
  storage.setItem(STUDIO_STORAGE_KEY, JSON.stringify(state));
}

export function upsertStudioArticle(state: StudioState, article: StudioArticle): StudioState {
  const existingIndex = state.articles.findIndex((item) => item.id === article.id);
  const articles = existingIndex === -1
    ? [...state.articles, article]
    : state.articles.map((item) => item.id === article.id ? article : item);

  return { ...state, articles };
}

export function getPublicArticles(state: StudioState): Article[] {
  return state.articles
    .filter((article) => (
      article.status === "published"
      && article.workflowStatus === "published"
      && article.publishedSnapshot?.status === "published"
    ))
    .map((article) => article.publishedSnapshot as Article);
}

export function backupCorruptStudioState(storage: Pick<Storage, "setItem">, raw: string): void {
  storage.setItem(CORRUPT_STUDIO_BACKUP_KEY, raw);
}

function isStudioState(value: unknown): value is StudioState {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<StudioState>;
  return candidate.schemaVersion === 1 && Array.isArray(candidate.articles);
}
