import { cloneAndFreezePublishedSnapshot, createSeedStudioState } from "./studio-seed";
import type { StudioArticle } from "./studio-types";
import type { Article } from "./types";

export const STUDIO_STORAGE_KEY = "nonfiction-lab:studio:v1";
export const CORRUPT_STUDIO_BACKUP_KEY = "nonfiction-lab:studio:corrupt-backup";

export type StudioState = {
  schemaVersion: 1;
  articles: StudioArticle[];
};

type StudioStorage = Pick<Storage, "getItem" | "setItem">;

const WORKFLOW_STATUSES = new Set(["draft", "facts_reviewed", "language_reviewed", "age_reviewed", "approved", "published", "withdrawn"]);
const CONTENT_STATUSES = new Set(["draft", "review", "published", "withdrawn"]);
const DOMAINS = new Set(["science", "history", "arts", "philosophy", "self-development", "world-culture"]);
const INTEREST_BANDS = new Set(["lower-elementary", "upper-elementary", "teen", "adult", "all-ages"]);
const MEDIA_PROVIDERS = new Set(["youtube", "ted", "cnn"]);

export function loadStudioState(storage: StudioStorage): StudioState {
  let raw: string | null;
  try {
    raw = storage.getItem(STUDIO_STORAGE_KEY);
  } catch {
    return createSeedStudioState();
  }

  if (raw === null) return createSeedStudioState();

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isStudioState(parsed)) throw new Error("Invalid studio state");
    return hydrateStudioState(parsed);
  } catch {
    backupCorruptStudioState(storage, raw);
    return createSeedStudioState();
  }
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
    .filter(isCurrentPublishedArticle)
    .map((article) => clonePublicArticle(article.publishedSnapshot));
}

export function backupCorruptStudioState(storage: Pick<Storage, "setItem">, raw: string): void {
  storage.setItem(CORRUPT_STUDIO_BACKUP_KEY, raw);
}

function hydrateStudioState(state: StudioState): StudioState {
  return {
    ...state,
    articles: state.articles.map((article) => ({
      ...article,
      publishedSnapshot: article.publishedSnapshot ? cloneAndFreezePublishedSnapshot(article.publishedSnapshot) : null,
    })),
  };
}

function isStudioState(value: unknown): value is StudioState {
  return isRecord(value)
    && value.schemaVersion === 1
    && Array.isArray(value.articles)
    && value.articles.every(isStudioArticle);
}

function isStudioArticle(value: unknown): value is StudioArticle {
  if (!isRecord(value)
    || !isNonEmptyString(value.id)
    || !isNonEmptyString(value.title)
    || !isString(value.titleKo)
    || !isString(value.summaryKo)
    || !DOMAINS.has(value.domain as string)
    || !INTEREST_BANDS.has(value.interestBand as string)
    || !isDifficulty(value.difficulty)
    || value.estimatedMinutes !== 3
    || !isNonNegativeNumber(value.wordCount)
    || !CONTENT_STATUSES.has(value.status as string)
    || !isPositiveInteger(value.version)
    || !isStringArray(value.pages)
    || !isVocabulary(value.vocabulary)
    || !isQuiz(value.quiz)
    || !isSources(value.sources)
    || !isNonEmptyString(value.connectedArticleId)
    || !isNonEmptyString(value.visualTheme)
    || (value.audioUrl !== undefined && !isString(value.audioUrl))
    || !isPositiveInteger(value.workingVersion)
    || (value.publishedSnapshot !== null && !isLearnerArticle(value.publishedSnapshot))
    || !WORKFLOW_STATUSES.has(value.workflowStatus as string)
    || !isReviewRecords(value.reviewRecords)
    || (value.approval !== null && !isApproval(value.approval))
    || (value.withdrawnAt !== null && !isString(value.withdrawnAt))
    || !isNonEmptyString(value.editor)
    || !isString(value.updatedAt)
    || !isChangeLog(value.changeLog)
    || !isString(value.ageRange)
    || !isString(value.learningGoal)
    || !isString(value.keySentence)
    || !isString(value.keyConcept)
    || !isString(value.sourceNotes)
    || !isMedia(value.media)) {
    return false;
  }

  return hasConsistentWorkflow(value as StudioArticle);
}

function hasConsistentWorkflow(article: StudioArticle): boolean {
  const hasFacts = isReviewRecord(article.reviewRecords.facts);
  const hasLanguage = isReviewRecord(article.reviewRecords.language);
  const hasAge = isReviewRecord(article.reviewRecords.age);
  const noApproval = article.approval === null;

  switch (article.workflowStatus) {
    case "draft":
      return article.status === "draft" && !hasFacts && !hasLanguage && !hasAge && noApproval;
    case "facts_reviewed":
      return article.status === "review" && hasFacts && !hasLanguage && !hasAge && noApproval;
    case "language_reviewed":
      return article.status === "review" && hasFacts && hasLanguage && !hasAge && noApproval;
    case "age_reviewed":
      return article.status === "review" && hasFacts && hasLanguage && hasAge && noApproval;
    case "approved":
      return article.status === "review" && hasFacts && hasLanguage && hasAge && !noApproval;
    case "published":
      return isCurrentPublishedArticle(article);
    case "withdrawn":
      return article.status === "withdrawn"
        && isString(article.withdrawnAt)
        && hasFacts
        && hasLanguage
        && hasAge
        && !noApproval
        && hasPublicationEvidence(article);
  }
}

function isCurrentPublishedArticle(article: StudioArticle): article is StudioArticle & { publishedSnapshot: Readonly<Article> } {
  return article.status === "published"
    && article.workflowStatus === "published"
    && article.withdrawnAt === null
    && hasPublicationEvidence(article);
}

function hasPublicationEvidence(article: StudioArticle): article is StudioArticle & { publishedSnapshot: Readonly<Article> } {
  const snapshot = article.publishedSnapshot;
  return snapshot !== null
    && isLearnerArticle(snapshot)
    && snapshot.status === "published"
    && snapshot.version === article.workingVersion
    && isApproval(article.approval)
    && isReviewRecord(article.reviewRecords.facts)
    && isReviewRecord(article.reviewRecords.language)
    && isReviewRecord(article.reviewRecords.age)
    && snapshot.review.approvedBy === article.approval.actor
    && snapshot.review.approvedAt === article.approval.approvedAt
    && snapshot.review.factsChecked
    && snapshot.review.languageChecked
    && snapshot.review.ageChecked;
}

function clonePublicArticle(article: Readonly<Article>): Article {
  return {
    ...article,
    difficulty: { ...article.difficulty },
    pages: [...article.pages],
    vocabulary: article.vocabulary.map((item) => ({ ...item })),
    quiz: article.quiz.map((question) => ({ ...question, options: [...question.options] })),
    sources: article.sources.map((source) => ({ ...source })),
    review: { ...article.review },
  };
}

function isLearnerArticle(value: unknown): value is Article {
  return isRecord(value)
    && isNonEmptyString(value.id)
    && isNonEmptyString(value.title)
    && isString(value.titleKo)
    && isString(value.summaryKo)
    && DOMAINS.has(value.domain as string)
    && INTEREST_BANDS.has(value.interestBand as string)
    && isDifficulty(value.difficulty)
    && value.estimatedMinutes === 3
    && isNonNegativeNumber(value.wordCount)
    && CONTENT_STATUSES.has(value.status as string)
    && isPositiveInteger(value.version)
    && isStringArray(value.pages)
    && isVocabulary(value.vocabulary)
    && isQuiz(value.quiz)
    && isSources(value.sources)
    && isReview(value.review)
    && isNonEmptyString(value.connectedArticleId)
    && isNonEmptyString(value.visualTheme)
    && (value.audioUrl === undefined || isString(value.audioUrl));
}

function isDifficulty(value: unknown): boolean {
  return isRecord(value)
    && isNonNegativeNumber(value.value)
    && (value.method === "external-user-entry" || value.method === "nonfiction-lab-estimate")
    && isNonEmptyString(value.label);
}

function isVocabulary(value: unknown): boolean {
  return Array.isArray(value) && value.every((item) => (
    isRecord(item)
    && isNonEmptyString(item.word)
    && isString(item.pronunciation)
    && isString(item.meaningKo)
    && isNonEmptyString(item.definitionEn)
  ));
}

function isQuiz(value: unknown): boolean {
  return Array.isArray(value) && value.every((question) => (
    isRecord(question)
    && isNonEmptyString(question.id)
    && isNonEmptyString(question.prompt)
    && isStringArray(question.options)
    && isNonNegativeInteger(question.correctIndex)
    && question.correctIndex < question.options.length
    && isNonEmptyString(question.explanation)
  ));
}

function isSources(value: unknown): boolean {
  return Array.isArray(value) && value.every((source) => (
    isRecord(source)
    && isNonEmptyString(source.title)
    && isNonEmptyString(source.publisher)
    && isNonEmptyString(source.url)
    && (source.publishedAt === undefined || isString(source.publishedAt))
  ));
}

function isReview(value: unknown): boolean {
  return isRecord(value)
    && isNonEmptyString(value.approvedBy)
    && isNonEmptyString(value.approvedAt)
    && typeof value.factsChecked === "boolean"
    && typeof value.languageChecked === "boolean"
    && typeof value.ageChecked === "boolean";
}

function isReviewRecords(value: unknown): boolean {
  return isRecord(value)
    && (value.facts === undefined || isReviewRecord(value.facts))
    && (value.language === undefined || isReviewRecord(value.language))
    && (value.age === undefined || isReviewRecord(value.age));
}

function isReviewRecord(value: unknown): boolean {
  return isRecord(value) && isNonEmptyString(value.actor) && isNonEmptyString(value.completedAt);
}

function isApproval(value: unknown): value is { actor: string; approvedAt: string } {
  return isRecord(value) && isNonEmptyString(value.actor) && isNonEmptyString(value.approvedAt);
}

function isChangeLog(value: unknown): boolean {
  return Array.isArray(value) && value.every((entry) => (
    isRecord(entry) && isString(entry.changedAt) && isStringArray(entry.fields)
  ));
}

function isMedia(value: unknown): boolean {
  return Array.isArray(value) && value.every((item) => (
    isRecord(item)
    && MEDIA_PROVIDERS.has(item.provider as string)
    && isNonEmptyString(item.embedUrl)
    && isNonEmptyString(item.alt)
  ));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isNonNegativeNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function isNonNegativeInteger(value: unknown): value is number {
  return isNonNegativeNumber(value) && Number.isInteger(value);
}

function isPositiveInteger(value: unknown): value is number {
  return isNonNegativeInteger(value) && value > 0;
}
