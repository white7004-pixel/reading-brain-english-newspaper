import type { Article, ArticleMedia } from "./types";

export type PublicArticleIssue = { field: string; code: string };
export type PublicArticleParseResult =
  | { ok: true; value: Readonly<Article> }
  | { ok: false; issues: PublicArticleIssue[] };

const DOMAINS = new Set(["science", "history", "arts", "philosophy", "self-development", "world-culture"]);
const INTEREST_BANDS = new Set(["lower-elementary", "upper-elementary", "teen", "adult", "all-ages"]);
const VIDEO_URLS = {
  youtube: /^https:\/\/www\.youtube\.com\/embed\/[A-Za-z0-9_-]{11}(?:\?[^\s]*)?$/,
  ted: /^https:\/\/embed\.ted\.com\/talks\/[A-Za-z0-9_-]+(?:\?[^\s]*)?$/,
  cnn: /^https:\/\/www\.cnn\.com\/video\/third-party-embed\/[A-Za-z0-9_/-]+(?:\?[^\s]*)?$/,
} as const;

export function parsePublicArticle(value: unknown): PublicArticleParseResult {
  const issues: PublicArticleIssue[] = [];
  if (!isRecord(value)) return { ok: false, issues: [{ field: "article", code: "article_invalid" }] };

  required(issues, value.id, "id");
  required(issues, value.title, "title");
  stringValue(issues, value.titleKo, "titleKo");
  stringValue(issues, value.summaryKo, "summaryKo");
  if (!DOMAINS.has(value.domain as string)) issues.push({ field: "domain", code: "domain_invalid" });
  if (!INTEREST_BANDS.has(value.interestBand as string)) issues.push({ field: "interestBand", code: "interest_band_invalid" });
  if (!isDifficulty(value.difficulty)) issues.push({ field: "difficulty", code: "difficulty_invalid" });
  if (value.estimatedMinutes !== 3) issues.push({ field: "estimatedMinutes", code: "estimated_minutes_invalid" });
  if (!isFiniteNumber(value.wordCount) || value.wordCount < 0) issues.push({ field: "wordCount", code: "word_count_invalid" });
  if (value.status !== "published") issues.push({ field: "status", code: "status_invalid" });
  if (!isPositiveInteger(value.version)) issues.push({ field: "version", code: "version_invalid" });
  if (!isStringArray(value.pages)) issues.push({ field: "pages", code: "pages_invalid" });
  required(issues, value.keySentence, "keySentence");
  if (!isVocabulary(value.vocabulary)) issues.push({ field: "vocabulary", code: "vocabulary_invalid" });
  if (!isQuiz(value.quiz)) issues.push({ field: "quiz", code: "quiz_invalid" });
  if (!isSources(value.sources)) issues.push({ field: "sources", code: "sources_invalid" });
  if (!isReview(value.review)) issues.push({ field: "review", code: "review_invalid" });
  if (value.connectedArticleId !== undefined && (!isNonEmptyString(value.connectedArticleId) || value.connectedArticleId === "pending")) {
    issues.push({ field: "connectedArticleId", code: "connected_article_invalid" });
  }
  required(issues, value.visualTheme, "visualTheme");
  if (value.audioUrl !== undefined && (!isString(value.audioUrl) || !isHttpUrl(value.audioUrl))) {
    issues.push({ field: "audioUrl", code: "audio_url_invalid" });
  }
  if (!Array.isArray(value.media) || !value.media.every(isSafePublicMedia)) {
    issues.push({ field: "media", code: "media_invalid" });
  }

  if (issues.length > 0) return { ok: false, issues };
  return { ok: true, value: deepFreeze(clonePublicArticle(value as Article)) };
}

export function assertPublicArticle(value: unknown): asserts value is Article {
  const result = parsePublicArticle(value);
  if (!result.ok) throw new Error(`Invalid public article: ${result.issues.map((issue) => `${issue.field}:${issue.code}`).join(", ")}`);
}

export function isSafePublicMedia(value: unknown): value is ArticleMedia {
  if (!isRecord(value) || !isNonEmptyString(value.alt)) return false;
  if (value.kind === "image") return isString(value.url) && isHttpsUrl(value.url);
  if (value.kind !== "video" || !(value.provider === "youtube" || value.provider === "ted" || value.provider === "cnn") || !isString(value.embedUrl)) return false;
  return VIDEO_URLS[value.provider].test(value.embedUrl);
}

export function clonePublicArticle(article: Readonly<Article>): Article {
  return {
    id: article.id,
    title: article.title,
    titleKo: article.titleKo,
    summaryKo: article.summaryKo,
    domain: article.domain,
    interestBand: article.interestBand,
    difficulty: {
      value: article.difficulty.value,
      method: article.difficulty.method,
      label: article.difficulty.label,
    },
    estimatedMinutes: article.estimatedMinutes,
    wordCount: article.wordCount,
    status: article.status,
    version: article.version,
    pages: [...article.pages],
    keySentence: article.keySentence,
    vocabulary: article.vocabulary.map((item) => ({
      word: item.word,
      pronunciation: item.pronunciation,
      meaningKo: item.meaningKo,
      definitionEn: item.definitionEn,
    })),
    quiz: article.quiz.map((question) => ({
      id: question.id,
      prompt: question.prompt,
      options: [...question.options],
      correctIndex: question.correctIndex,
      explanation: question.explanation,
    })),
    sources: article.sources.map((source) => ({
      title: source.title,
      publisher: source.publisher,
      url: source.url,
      ...(source.publishedAt !== undefined ? { publishedAt: source.publishedAt } : {}),
    })),
    review: {
      approvedBy: article.review.approvedBy,
      approvedAt: article.review.approvedAt,
      factsChecked: article.review.factsChecked,
      languageChecked: article.review.languageChecked,
      ageChecked: article.review.ageChecked,
    },
    ...(article.connectedArticleId !== undefined ? { connectedArticleId: article.connectedArticleId } : {}),
    visualTheme: article.visualTheme,
    media: article.media.map((item) => item.kind === "image"
      ? { kind: "image", url: item.url, alt: item.alt }
      : { kind: "video", provider: item.provider, embedUrl: item.embedUrl, alt: item.alt }),
    ...(article.audioUrl !== undefined ? { audioUrl: article.audioUrl } : {}),
  };
}

export function deepFreeze<T>(value: T): Readonly<T> {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.values(value).forEach((nested) => deepFreeze(nested));
    Object.freeze(value);
  }
  return value;
}

function isDifficulty(value: unknown): boolean {
  return isRecord(value)
    && isFiniteNumber(value.value)
    && value.value >= 0
    && (value.method === "external-user-entry" || value.method === "nonfiction-lab-estimate")
    && isString(value.label);
}

function isVocabulary(value: unknown): boolean {
  return Array.isArray(value) && value.every((item) => isRecord(item)
    && isNonEmptyString(item.word)
    && isString(item.pronunciation)
    && isString(item.meaningKo)
    && isNonEmptyString(item.definitionEn));
}

function isQuiz(value: unknown): boolean {
  return Array.isArray(value) && value.every((question) => isRecord(question)
    && isNonEmptyString(question.id)
    && isNonEmptyString(question.prompt)
    && isStringArray(question.options)
    && question.options.length >= 2
    && isInteger(question.correctIndex)
    && question.correctIndex >= 0
    && question.correctIndex < question.options.length
    && isNonEmptyString(question.explanation));
}

function isSources(value: unknown): boolean {
  return Array.isArray(value) && value.every((source) => isRecord(source)
    && isNonEmptyString(source.title)
    && isNonEmptyString(source.publisher)
    && isString(source.url)
    && isHttpUrl(source.url)
    && (source.publishedAt === undefined || isString(source.publishedAt)));
}

function isReview(value: unknown): boolean {
  return isRecord(value)
    && isNonEmptyString(value.approvedBy)
    && isNonEmptyString(value.approvedAt)
    && value.factsChecked === true
    && value.languageChecked === true
    && value.ageChecked === true;
}

function required(issues: PublicArticleIssue[], value: unknown, field: string): void {
  if (!isNonEmptyString(value)) issues.push({ field, code: `${field}_required` });
}

function stringValue(issues: PublicArticleIssue[], value: unknown, field: string): void {
  if (!isString(value)) issues.push({ field, code: `${field}_invalid` });
}

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isHttpsUrl(value: string): boolean {
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isString(value: unknown): value is string { return typeof value === "string"; }
function isNonEmptyString(value: unknown): value is string { return isString(value) && value.trim().length > 0; }
function isStringArray(value: unknown): value is string[] { return Array.isArray(value) && value.every(isString); }
function isFiniteNumber(value: unknown): value is number { return typeof value === "number" && Number.isFinite(value); }
function isInteger(value: unknown): value is number { return typeof value === "number" && Number.isInteger(value); }
function isPositiveInteger(value: unknown): value is number { return isInteger(value) && value > 0; }
