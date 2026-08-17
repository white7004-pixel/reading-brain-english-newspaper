import { cloneAndFreezePublishedSnapshot, createSeedStudioState } from "./studio-seed";
import type { StudioArticle } from "./studio-types";
import type { Article } from "./types";

export const STUDIO_STORAGE_KEY = "nonfiction-lab:studio:v1";
export const CORRUPT_STUDIO_BACKUP_KEY = "nonfiction-lab:studio:corrupt-backup";

export type StudioState = {
  schemaVersion: 2;
  articles: StudioArticle[];
};

type StudioStorage = Pick<Storage, "getItem" | "setItem">;

const WORKFLOW_STATUSES = new Set(["draft", "facts_reviewed", "language_reviewed", "age_reviewed", "approved", "published", "withdrawn"]);
const CONTENT_STATUSES = new Set(["draft", "review", "published", "withdrawn"]);
const DOMAINS = new Set(["science", "history", "arts", "philosophy", "self-development", "world-culture"]);
const INTEREST_BANDS = new Set(["lower-elementary", "upper-elementary", "teen", "adult", "all-ages"]);
const MEDIA_PROVIDERS = new Set(["youtube", "ted", "cnn"]);
const QUIZ_TYPES = new Set(["comprehension", "inference", "vocabulary"]);
const SOURCE_MATERIAL_TYPES = new Set(["article", "paper", "news", "magazine", "exam", "video"]);

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
    const migrated = migrateStudioState(parsed);
    if (!isStudioState(migrated)) throw new Error("Invalid studio state");
    return hydrateStudioState(migrated);
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

function migrateStudioState(value: unknown): unknown {
  if (!isRecord(value) || value.schemaVersion !== 1 || !Array.isArray(value.articles)) return value;
  return { schemaVersion: 2, articles: value.articles.map(migrateLegacyArticle) };
}

function migrateLegacyArticle(value: unknown): unknown {
  if (!isRecord(value)) return value;
  const workingVersion = isPositiveInteger(value.workingVersion) ? value.workingVersion : 1;
  const ageBounds = parseAgeRange(isString(value.ageRange) ? value.ageRange : "");
  const approval = isRecord(value.approval)
    ? { ...value.approval, workingVersion: isPositiveInteger(value.approval.workingVersion) ? value.approval.workingVersion : workingVersion }
    : value.approval;
  const previewReview = value.previewReview ?? (isRecord(approval) && isString(approval.actor) && isString(approval.approvedAt)
    ? { actor: approval.actor, reviewedAt: approval.approvedAt, workingVersion }
    : null);

  return {
    ...value,
    summaryEn: isString(value.summaryEn) ? value.summaryEn : "",
    subtopic: isString(value.subtopic) ? value.subtopic : "",
    minAge: isNonNegativeInteger(value.minAge) ? value.minAge : ageBounds[0],
    maxAge: isNonNegativeInteger(value.maxAge) ? value.maxAge : ageBounds[1],
    estimatedReadingSeconds: isNonNegativeInteger(value.estimatedReadingSeconds) ? value.estimatedReadingSeconds : 180,
    safetyFlags: isStringArray(value.safetyFlags) ? value.safetyFlags : [],
    safetyReviewed: typeof value.safetyReviewed === "boolean" ? value.safetyReviewed : false,
    vocabulary: Array.isArray(value.vocabulary) ? value.vocabulary.map((item) => isRecord(item) ? { ...item, exampleSentence: isString(item.exampleSentence) ? item.exampleSentence : "" } : item) : value.vocabulary,
    quiz: Array.isArray(value.quiz) ? value.quiz.map((item) => isRecord(item) ? { ...item, type: QUIZ_TYPES.has(item.type as string) ? item.type : "comprehension", evidence: isString(item.evidence) ? item.evidence : "" } : item) : value.quiz,
    sources: Array.isArray(value.sources) ? value.sources.map((item) => isRecord(item) ? { ...item, materialType: SOURCE_MATERIAL_TYPES.has(item.materialType as string) ? item.materialType : "article", supportedFact: isString(item.supportedFact) ? item.supportedFact : "" } : item) : value.sources,
    media: Array.isArray(value.media) ? value.media.map((item) => isRecord(item) ? { ...item, usageConfirmed: typeof item.usageConfirmed === "boolean" ? item.usageConfirmed : false } : item) : value.media,
    reconstructionConfirmed: typeof value.reconstructionConfirmed === "boolean" ? value.reconstructionConfirmed : false,
    rightsNotes: isString(value.rightsNotes) ? value.rightsNotes : "",
    approval,
    previewReview,
    changeLog: Array.isArray(value.changeLog) ? value.changeLog.map((entry) => isRecord(entry) ? { ...entry, reason: isString(entry.reason) ? entry.reason : "" } : entry) : value.changeLog,
  };
}

function parseAgeRange(value: string): [number, number] {
  const match = /^(\d+)\s*-\s*(\d+)$/.exec(value);
  return match ? [Number(match[1]), Number(match[2])] : [0, 0];
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
    && value.schemaVersion === 2
    && Array.isArray(value.articles)
    && value.articles.every(isStudioArticle);
}

function isStudioArticle(value: unknown): value is StudioArticle {
  if (!isRecord(value)
    || !isNonEmptyString(value.id)
    || !isString(value.title)
    || !isString(value.titleKo)
    || !isString(value.summaryEn)
    || !isString(value.summaryKo)
    || !DOMAINS.has(value.domain as string)
    || !isString(value.subtopic)
    || !INTEREST_BANDS.has(value.interestBand as string)
    || !isDifficulty(value.difficulty)
    || !isNonNegativeInteger(value.minAge)
    || !isNonNegativeInteger(value.maxAge)
    || !isNonNegativeInteger(value.estimatedReadingSeconds)
    || !isStringArray(value.safetyFlags)
    || typeof value.safetyReviewed !== "boolean"
    || value.estimatedMinutes !== 3
    || !isNonNegativeNumber(value.wordCount)
    || !CONTENT_STATUSES.has(value.status as string)
    || !isPositiveInteger(value.version)
    || !isStringArray(value.pages)
    || !isStudioVocabulary(value.vocabulary)
    || !isStudioQuiz(value.quiz)
    || !isStudioSources(value.sources)
    || !isString(value.connectedArticleId)
    || !isString(value.visualTheme)
    || (value.audioUrl !== undefined && !isString(value.audioUrl))
    || !isPositiveInteger(value.workingVersion)
    || (value.publishedSnapshot !== null && !isLearnerArticle(value.publishedSnapshot))
    || !WORKFLOW_STATUSES.has(value.workflowStatus as string)
    || !isReviewRecords(value.reviewRecords)
    || (value.approval !== null && !isApproval(value.approval))
    || (value.previewReview !== null && !isPreviewReview(value.previewReview))
    || (value.withdrawnAt !== null && !isString(value.withdrawnAt))
    || !isNonEmptyString(value.editor)
    || !isString(value.updatedAt)
    || !isChangeLog(value.changeLog)
    || !isString(value.ageRange)
    || !isString(value.learningGoal)
    || !isString(value.keySentence)
    || !isString(value.keyConcept)
    || !isString(value.sourceNotes)
    || typeof value.reconstructionConfirmed !== "boolean"
    || !isString(value.rightsNotes)
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
    && article.approval.workingVersion === article.workingVersion
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
    && isLearnerVocabulary(value.vocabulary)
    && isLearnerQuiz(value.quiz)
    && isLearnerSources(value.sources)
    && isReview(value.review)
    && isNonEmptyString(value.connectedArticleId)
    && isNonEmptyString(value.visualTheme)
    && (value.audioUrl === undefined || isString(value.audioUrl));
}

function isDifficulty(value: unknown): boolean {
  return isRecord(value)
    && isNonNegativeNumber(value.value)
    && (value.method === "external-user-entry" || value.method === "nonfiction-lab-estimate")
    && isString(value.label);
}

function isStudioVocabulary(value: unknown): boolean {
  return Array.isArray(value) && value.every((item) => (
    isRecord(item)
    && isString(item.word)
    && isString(item.pronunciation)
    && isString(item.meaningKo)
    && isString(item.definitionEn)
    && isString(item.exampleSentence)
  ));
}

function isStudioQuiz(value: unknown): boolean {
  return Array.isArray(value) && value.every((question) => (
    isRecord(question)
    && isString(question.id)
    && QUIZ_TYPES.has(question.type as string)
    && isString(question.prompt)
    && isStringArray(question.options)
    && isInteger(question.correctIndex)
    && isString(question.explanation)
    && isString(question.evidence)
  ));
}

function isStudioSources(value: unknown): boolean {
  return Array.isArray(value) && value.every((source) => (
    isRecord(source)
    && isString(source.title)
    && isString(source.publisher)
    && isString(source.url)
    && (source.publishedAt === undefined || isString(source.publishedAt))
    && SOURCE_MATERIAL_TYPES.has(source.materialType as string)
    && isString(source.supportedFact)
  ));
}

function isLearnerVocabulary(value: unknown): boolean {
  return Array.isArray(value) && value.every((item) => (
    isRecord(item)
    && isNonEmptyString(item.word)
    && isString(item.pronunciation)
    && isString(item.meaningKo)
    && isNonEmptyString(item.definitionEn)
  ));
}

function isLearnerQuiz(value: unknown): boolean {
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

function isLearnerSources(value: unknown): boolean {
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

function isApproval(value: unknown): value is { actor: string; approvedAt: string; workingVersion: number } {
  return isRecord(value) && isNonEmptyString(value.actor) && isNonEmptyString(value.approvedAt) && isPositiveInteger(value.workingVersion);
}

function isPreviewReview(value: unknown): boolean {
  return isRecord(value)
    && isNonEmptyString(value.actor)
    && isNonEmptyString(value.reviewedAt)
    && isPositiveInteger(value.workingVersion);
}

function isChangeLog(value: unknown): boolean {
  return Array.isArray(value) && value.every((entry) => (
    isRecord(entry) && isString(entry.changedAt) && isStringArray(entry.fields) && isString(entry.reason)
  ));
}

function isMedia(value: unknown): boolean {
  return Array.isArray(value) && value.every((item) => (
    isRecord(item)
    && MEDIA_PROVIDERS.has(item.provider as string)
    && isString(item.embedUrl)
    && isString(item.alt)
    && typeof item.usageConfirmed === "boolean"
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

function isInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

function isPositiveInteger(value: unknown): value is number {
  return isNonNegativeInteger(value) && value > 0;
}
