import type { Article } from "@/lib/types";
import type { ArticleEditPatch, MediaEmbed, MediaProvider, ReviewStage, StudioArticle, ValidationIssue } from "@/lib/studio-types";

const STAGES: ReviewStage[] = ["facts", "language", "age"];

const STAGE_MESSAGES: Record<ReviewStage, string> = {
  facts: "사실·출처 검수를 완료할 수 없습니다.",
  language: "영어·AR 검수를 완료할 수 없습니다.",
  age: "연령 적합성 검수를 완료할 수 없습니다.",
};

const FACTS_FIELDS = new Set(["title", "titleKo", "summaryKo", "domain", "sources", "sourceNotes"]);
const LANGUAGE_FIELDS = new Set(["pages", "vocabulary", "quiz", "difficulty", "keySentence", "keyConcept"]);
const AGE_FIELDS = new Set(["interestBand", "ageRange", "learningGoal", "media"]);

const REQUIRED_STATUS: Record<ReviewStage, StudioArticle["workflowStatus"]> = {
  facts: "draft",
  language: "facts_reviewed",
  age: "language_reviewed",
};

const OFFICIAL_EMBED_URLS: Record<MediaProvider, RegExp> = {
  youtube: /^https:\/\/www\.youtube\.com\/embed\/[A-Za-z0-9_-]{11}(?:\?[^\s]*)?$/,
  ted: /^https:\/\/embed\.ted\.com\/talks\/[A-Za-z0-9_-]+(?:\?[^\s]*)?$/,
  cnn: /^https:\/\/www\.cnn\.com\/video\/third-party-embed\/[A-Za-z0-9_/-]+(?:\?[^\s]*)?$/,
};

export function validateStage(article: StudioArticle, stage: ReviewStage): ValidationIssue[] {
  if (stage === "facts" && article.sources.length === 0) {
    return [{ field: "sources", code: "source_required" }];
  }

  return [];
}

export function validateMediaEmbeds(media: MediaEmbed[]): ValidationIssue[] {
  return media.every((item) => OFFICIAL_EMBED_URLS[item.provider].test(item.embedUrl))
    ? []
    : [{ field: "media", code: "unsupported_embed_url" }];
}

export function completeStage(
  article: StudioArticle,
  stage: ReviewStage,
  actor: string,
  now: string,
): StudioArticle {
  const stageIndex = STAGES.indexOf(stage);
  const prerequisiteStages = STAGES.slice(0, stageIndex);
  if (
    article.workflowStatus !== REQUIRED_STATUS[stage]
    || prerequisiteStages.some((prerequisiteStage) => !article.reviewRecords[prerequisiteStage])
  ) {
    throw new Error("이전 검수 단계를 먼저 완료해 주세요.");
  }

  if (validateStage(article, stage).length > 0) {
    throw new Error(STAGE_MESSAGES[stage]);
  }

  const reviewRecords = {
    ...Object.fromEntries(prerequisiteStages.map((prerequisiteStage) => [prerequisiteStage, article.reviewRecords[prerequisiteStage]])),
    [stage]: { actor, completedAt: now },
  };
  return {
    ...article,
    status: "review",
    workflowStatus: workflowStatusFor(reviewRecords),
    reviewRecords,
    approval: null,
    updatedAt: now,
  };
}

export function applyArticleEdit(
  article: StudioArticle,
  patch: ArticleEditPatch,
  now: string,
): StudioArticle {
  if (patch.media && validateMediaEmbeds(patch.media).length > 0) {
    throw new Error("허용된 공식 임베드 URL만 저장할 수 있습니다.");
  }

  const fields = Object.keys(patch) as (keyof StudioArticle)[];
  const invalidatedStage = invalidatedStageFor(fields);
  const reviewRecords = clearReviewsFrom(article.reviewRecords, invalidatedStage);
  const startsNewWorkingVersion = article.workflowStatus === "published";
  const workflowStatus = workflowStatusFor(reviewRecords);

  return {
    ...article,
    ...patch,
    status: workflowStatus === "draft" ? "draft" : "review",
    workingVersion: startsNewWorkingVersion ? article.workingVersion + 1 : article.workingVersion,
    workflowStatus,
    reviewRecords,
    approval: fields.length > 0 ? null : article.approval,
    withdrawnAt: article.workflowStatus === "published" ? null : article.withdrawnAt,
    updatedAt: now,
    changeLog: [...article.changeLog, { changedAt: now, fields }],
  };
}

export function approveArticle(article: StudioArticle, actor: string, now: string): StudioArticle {
  if (article.workflowStatus !== "age_reviewed" || !STAGES.every((stage) => article.reviewRecords[stage])) {
    throw new Error("모든 검수 단계를 완료한 뒤 최종 승인할 수 있습니다.");
  }

  return {
    ...article,
    approval: { actor, approvedAt: now },
    workflowStatus: "approved",
    updatedAt: now,
  };
}

export function publishArticle(article: StudioArticle, now: string): StudioArticle {
  if (article.workflowStatus !== "approved" || !article.approval || !STAGES.every((stage) => article.reviewRecords[stage])) {
    throw new Error("최종 승인 후 발행할 수 있습니다.");
  }

  return {
    ...article,
    status: "published",
    workflowStatus: "published",
    publishedSnapshot: createLearnerSnapshot(article),
    withdrawnAt: null,
    updatedAt: now,
  };
}

export function withdrawArticle(article: StudioArticle, now: string): StudioArticle {
  if (article.workflowStatus !== "published") {
    throw new Error("발행된 콘텐츠만 발행 취소할 수 있습니다.");
  }

  return {
    ...article,
    status: "withdrawn",
    workflowStatus: "withdrawn",
    withdrawnAt: now,
    updatedAt: now,
  };
}

function invalidatedStageFor(fields: (keyof StudioArticle)[]): ReviewStage | null {
  if (fields.some((field) => FACTS_FIELDS.has(field))) return "facts";
  if (fields.some((field) => LANGUAGE_FIELDS.has(field))) return "language";
  if (fields.some((field) => AGE_FIELDS.has(field))) return "age";
  return null;
}

function clearReviewsFrom(
  reviewRecords: StudioArticle["reviewRecords"],
  invalidatedStage: ReviewStage | null,
): StudioArticle["reviewRecords"] {
  if (!invalidatedStage) return { ...reviewRecords };

  const firstInvalidatedIndex = STAGES.indexOf(invalidatedStage);
  return Object.fromEntries(
    Object.entries(reviewRecords).filter(([stage]) => STAGES.indexOf(stage as ReviewStage) < firstInvalidatedIndex),
  ) as StudioArticle["reviewRecords"];
}

function workflowStatusFor(reviewRecords: StudioArticle["reviewRecords"]): StudioArticle["workflowStatus"] {
  if (reviewRecords.age) return "age_reviewed";
  if (reviewRecords.language) return "language_reviewed";
  if (reviewRecords.facts) return "facts_reviewed";
  return "draft";
}

function createLearnerSnapshot(article: StudioArticle): Readonly<Article> {
  const approval = article.approval;
  if (!approval) {
    throw new Error("최종 승인 후 발행할 수 있습니다.");
  }

  return deepFreeze({
    id: article.id,
    title: article.title,
    titleKo: article.titleKo,
    summaryKo: article.summaryKo,
    domain: article.domain,
    interestBand: article.interestBand,
    difficulty: { ...article.difficulty },
    estimatedMinutes: article.estimatedMinutes,
    wordCount: article.wordCount,
    status: "published",
    version: article.workingVersion,
    pages: [...article.pages],
    vocabulary: article.vocabulary.map((item) => ({ ...item })),
    quiz: article.quiz.map((question) => ({ ...question, options: [...question.options] })),
    sources: article.sources.map((source) => ({ ...source })),
    review: {
      approvedBy: approval.actor,
      approvedAt: approval.approvedAt,
      factsChecked: Boolean(article.reviewRecords.facts),
      languageChecked: Boolean(article.reviewRecords.language),
      ageChecked: Boolean(article.reviewRecords.age),
    },
    connectedArticleId: article.connectedArticleId,
    visualTheme: article.visualTheme,
    ...(article.audioUrl ? { audioUrl: article.audioUrl } : {}),
  });
}

function deepFreeze<T>(value: T): Readonly<T> {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    for (const nestedValue of Object.values(value)) {
      deepFreeze(nestedValue);
    }
    Object.freeze(value);
  }
  return value;
}
