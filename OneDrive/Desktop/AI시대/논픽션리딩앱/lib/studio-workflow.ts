import type { Article } from "@/lib/types";
import type { ArticleEditPatch, MediaEmbed, MediaProvider, ReviewStage, StudioArticle, ValidationIssue } from "@/lib/studio-types";

const STAGES: ReviewStage[] = ["facts", "language", "age"];

const STAGE_MESSAGES: Record<ReviewStage, string> = {
  facts: "사실·출처 검수를 완료할 수 없습니다.",
  language: "영어·AR 검수를 완료할 수 없습니다.",
  age: "연령 적합성 검수를 완료할 수 없습니다.",
};

const FIELD_STAGE = {
  title: "facts", titleKo: "facts", summaryEn: "facts", summaryKo: "facts", domain: "facts", subtopic: "facts",
  sources: "facts", sourceNotes: "facts", reconstructionConfirmed: "facts", rightsNotes: "facts", media: "facts",
  connectedArticleId: "facts", visualTheme: "facts",
  difficulty: "language", estimatedReadingSeconds: "language", wordCount: "language", pages: "language",
  vocabulary: "language", quiz: "language", keySentence: "language", audioUrl: "language",
  interestBand: "age", minAge: "age", maxAge: "age", ageRange: "age", safetyFlags: "age", safetyReviewed: "age", learningGoal: "age", keyConcept: "age",
} satisfies { [Field in keyof ArticleEditPatch]-?: ReviewStage };

const LEARNER_FACING_FIELDS = new Set<keyof ArticleEditPatch>([
  "title", "titleKo", "summaryEn", "summaryKo", "domain", "subtopic", "interestBand", "difficulty", "minAge", "maxAge",
  "estimatedReadingSeconds", "safetyFlags", "wordCount", "pages", "vocabulary", "quiz", "connectedArticleId", "visualTheme",
  "audioUrl", "learningGoal", "keySentence", "keyConcept", "media",
]);

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
  if (stage === "facts") return validateFacts(article);
  if (stage === "language") return validateLanguage(article);
  return validateAge(article);
}

export function validateMediaEmbeds(media: MediaEmbed[]): ValidationIssue[] {
  return media.flatMap((item, index) => OFFICIAL_EMBED_URLS[item.provider].test(item.embedUrl)
    ? []
    : [{ field: `media.${index}.embedUrl`, code: "unsupported_embed_url" }]);
}

function validateFacts(article: StudioArticle): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  required(issues, article.title, "title", "title_required");
  required(issues, article.titleKo, "titleKo", "title_ko_required");
  required(issues, article.summaryEn, "summaryEn", "summary_en_required");
  required(issues, article.summaryKo, "summaryKo", "summary_ko_required");
  required(issues, article.subtopic, "subtopic", "subtopic_required");
  if (article.sources.length === 0) issues.push({ field: "sources", code: "source_required" });
  article.sources.forEach((source, index) => {
    if (!["article", "paper", "news", "magazine", "exam", "video"].includes(source.materialType)) issues.push({ field: `sources.${index}.materialType`, code: "source_material_type_invalid" });
    required(issues, source.title, `sources.${index}.title`, "source_title_required");
    required(issues, source.publisher, `sources.${index}.publisher`, "source_publisher_required");
    if (!isHttpUrl(source.url)) issues.push({ field: `sources.${index}.url`, code: "source_url_invalid" });
    required(issues, source.publishedAt ?? "", `sources.${index}.publishedAt`, "source_date_required");
    if (source.publishedAt && !isIsoDate(source.publishedAt)) issues.push({ field: `sources.${index}.publishedAt`, code: "source_date_invalid" });
    required(issues, source.supportedFact, `sources.${index}.supportedFact`, "source_fact_required");
  });
  required(issues, article.sourceNotes, "sourceNotes", "source_notes_required");
  if (!article.reconstructionConfirmed) issues.push({ field: "reconstructionConfirmed", code: "reconstruction_confirmation_required" });
  required(issues, article.rightsNotes, "rightsNotes", "rights_notes_required");
  issues.push(...validateMediaEmbeds(article.media));
  article.media.forEach((item, index) => {
    required(issues, item.alt, `media.${index}.alt`, "media_alt_required");
    if (!item.usageConfirmed) issues.push({ field: `media.${index}.usageConfirmed`, code: "media_usage_confirmation_required" });
  });
  return issues;
}

function validateLanguage(article: StudioArticle): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (article.pages.length === 0) issues.push({ field: "pages", code: "body_required" });
  article.pages.forEach((page, index) => required(issues, page, `pages.${index}`, "body_page_required"));
  if (article.vocabulary.length === 0) issues.push({ field: "vocabulary", code: "vocabulary_required" });
  article.vocabulary.forEach((item, index) => {
    required(issues, item.word, `vocabulary.${index}.word`, "vocabulary_word_required");
    required(issues, item.pronunciation, `vocabulary.${index}.pronunciation`, "vocabulary_pronunciation_required");
    required(issues, item.meaningKo, `vocabulary.${index}.meaningKo`, "vocabulary_meaning_required");
    required(issues, item.definitionEn, `vocabulary.${index}.definitionEn`, "vocabulary_definition_required");
    required(issues, item.exampleSentence, `vocabulary.${index}.exampleSentence`, "vocabulary_example_required");
  });
  if (article.quiz.length === 0) issues.push({ field: "quiz", code: "quiz_required" });
  article.quiz.forEach((question, index) => {
    if (!["comprehension", "inference", "vocabulary"].includes(question.type)) issues.push({ field: `quiz.${index}.type`, code: "quiz_type_invalid" });
    required(issues, question.prompt, `quiz.${index}.prompt`, "quiz_prompt_required");
    if (question.options.length < 2 || question.options.some((option) => !option.trim())) issues.push({ field: `quiz.${index}.options`, code: "quiz_options_required" });
    if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex >= question.options.length) issues.push({ field: `quiz.${index}.correctIndex`, code: "quiz_answer_invalid" });
    required(issues, question.explanation, `quiz.${index}.explanation`, "quiz_explanation_required");
    required(issues, question.evidence, `quiz.${index}.evidence`, "quiz_evidence_required");
  });
  if (!(article.difficulty.value > 0)) issues.push({ field: "difficulty.value", code: "ar_required" });
  required(issues, article.difficulty.label, "difficulty.label", "ar_note_required");
  if (!(article.wordCount > 0)) issues.push({ field: "wordCount", code: "word_count_required" });
  if (!(article.estimatedReadingSeconds > 0 && article.estimatedReadingSeconds <= 180)) issues.push({ field: "estimatedReadingSeconds", code: "reading_time_invalid" });
  required(issues, article.keySentence, "keySentence", "key_sentence_required");
  return issues;
}

function validateAge(article: StudioArticle): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!(Number.isInteger(article.minAge) && article.minAge > 0)) issues.push({ field: "minAge", code: "minimum_age_invalid" });
  if (!(Number.isInteger(article.maxAge) && article.maxAge >= article.minAge)) issues.push({ field: "maxAge", code: "age_range_invalid" });
  required(issues, article.learningGoal, "learningGoal", "learning_goal_required");
  if (!article.safetyReviewed) issues.push({ field: "safetyReviewed", code: "safety_review_required" });
  article.safetyFlags.forEach((flag, index) => required(issues, flag, `safetyFlags.${index}`, "safety_flag_invalid"));
  required(issues, article.keyConcept, "keyConcept", "key_concept_required");
  return issues;
}

function required(issues: ValidationIssue[], value: string, field: string, code: string): void {
  if (!value.trim()) issues.push({ field, code });
}

function isHttpUrl(value: string): boolean {
  try { const url = new URL(value); return url.protocol === "https:" || url.protocol === "http:"; } catch { return false; }
}

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value);
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
  reason = "",
): StudioArticle {
  const fields = Object.keys(patch) as (keyof ArticleEditPatch)[];
  const invalidatedStage = invalidatedStageFor(fields);
  const reviewRecords = clearReviewsFrom(article.reviewRecords, invalidatedStage);
  const startsNewWorkingVersion = article.workflowStatus === "published" || article.workflowStatus === "withdrawn";
  const workflowStatus = workflowStatusFor(reviewRecords);
  const invalidatesPreview = fields.some((field) => LEARNER_FACING_FIELDS.has(field));

  return {
    ...article,
    ...patch,
    status: workflowStatus === "draft" ? "draft" : "review",
    workingVersion: startsNewWorkingVersion ? article.workingVersion + 1 : article.workingVersion,
    workflowStatus,
    reviewRecords,
    approval: fields.length > 0 ? null : article.approval,
    previewReview: invalidatesPreview ? null : article.previewReview,
    withdrawnAt: startsNewWorkingVersion ? null : article.withdrawnAt,
    updatedAt: now,
    changeLog: [...article.changeLog, { changedAt: now, fields, reason }],
  };
}

export function acknowledgePreview(article: StudioArticle, actor: string, now: string): StudioArticle {
  return {
    ...article,
    previewReview: { actor, reviewedAt: now, workingVersion: article.workingVersion },
    updatedAt: now,
  };
}

export function approveArticle(article: StudioArticle, actor: string, now: string): StudioArticle {
  if (article.workflowStatus !== "age_reviewed" || !STAGES.every((stage) => article.reviewRecords[stage])) {
    throw new Error("모든 검수 단계를 완료한 뒤 최종 승인할 수 있습니다.");
  }
  if (STAGES.some((stage) => validateStage(article, stage).length > 0)) {
    throw new Error("모든 검수 단계를 다시 확인해 주세요.");
  }
  if (!article.previewReview || article.previewReview.workingVersion !== article.workingVersion) {
    throw new Error("모바일 미리보기를 확인해 주세요.");
  }

  return {
    ...article,
    approval: { actor, approvedAt: now, workingVersion: article.workingVersion },
    workflowStatus: "approved",
    updatedAt: now,
  };
}

export function publishArticle(article: StudioArticle, now: string): StudioArticle {
  if (article.workflowStatus !== "approved" || !article.approval || article.approval.workingVersion !== article.workingVersion || !STAGES.every((stage) => article.reviewRecords[stage])) {
    throw new Error("최종 승인 후 발행할 수 있습니다.");
  }
  if (STAGES.some((stage) => validateStage(article, stage).length > 0)) {
    throw new Error("모든 검수 단계를 다시 확인해 주세요.");
  }
  if (!article.previewReview || article.previewReview.workingVersion !== article.workingVersion) {
    throw new Error("모바일 미리보기를 확인해 주세요.");
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

function invalidatedStageFor(fields: (keyof ArticleEditPatch)[]): ReviewStage | null {
  const indexes = fields.map((field) => STAGES.indexOf(FIELD_STAGE[field]));
  return indexes.length === 0 ? null : STAGES[Math.min(...indexes)];
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
