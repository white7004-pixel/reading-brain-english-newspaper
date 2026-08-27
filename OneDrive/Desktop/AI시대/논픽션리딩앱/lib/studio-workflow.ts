import { deepFreeze, parsePublicArticle } from "@/lib/public-article-schema";
import type { Article } from "@/lib/types";
import type {
  ArticleEditPatch,
  MediaProvider,
  ReviewChecklistItemId,
  ReviewStage,
  StageReviewRecord,
  StudioArticle,
  StudioMedia,
  ValidationIssue,
} from "@/lib/studio-types";

const STAGES: ReviewStage[] = ["facts", "language", "age"];

export const REVIEW_CHECKLISTS = {
  facts: [
    { id: "facts.source-present", label: "출처가 한 개 이상 존재한다." },
    { id: "facts.source-trust", label: "핵심 사실이 신뢰할 수 있는 출처와 일치한다." },
    { id: "facts.publication-valid", label: "원문 URL과 발행 정보가 유효하다." },
    { id: "facts.supported-facts", label: "출처별로 뒷받침하는 사실을 기록했다." },
    { id: "facts.independent-reconstruction", label: "원문 복제가 아닌 독립적 재구성이다." },
    { id: "facts.media-rights", label: "미디어 사용 조건을 확인했다." },
  ],
  language: [
    { id: "language.grammar", label: "문법과 문장 구조가 정확하다." },
    { id: "language.difficulty-fit", label: "난이도에 맞는 어휘와 문장 길이다." },
    { id: "language.three-minute", label: "목표 읽기 시간이 3분 이내다." },
    { id: "language.vocabulary-context", label: "어휘 설명이 본문 맥락과 일치한다." },
    { id: "language.quiz-evidence", label: "모든 퀴즈에 정답, 해설, 본문 근거가 있다." },
  ],
  age: [
    { id: "age.topic-fit", label: "권장 연령에 주제와 표현이 적합하다." },
    { id: "age.young-reader-clarity", label: "어린 독자에게 구체적이고 명확하게 설명한다." },
    { id: "age.safety-flags", label: "주의 요소를 표시하고 검토했다." },
    { id: "age.concept-integrity", label: "핵심 개념을 왜곡하거나 지나치게 단순화하지 않았다." },
  ],
} as const satisfies Record<ReviewStage, ReadonlyArray<{ id: ReviewChecklistItemId; label: string }>>;

const CHECKLIST_STAGE = new Map<ReviewChecklistItemId, ReviewStage>(
  STAGES.flatMap((stage) => REVIEW_CHECKLISTS[stage].map((item) => [item.id, stage] as const)),
);

const STAGE_MESSAGES: Record<ReviewStage, string> = {
  facts: "사실·출처 검수를 완료할 수 없습니다.",
  language: "영어·AR 검수를 완료할 수 없습니다.",
  age: "연령 적합성 검수를 완료할 수 없습니다.",
};

const CHECKLIST_MESSAGES: Record<ReviewStage, string> = {
  facts: "사실·출처 체크리스트를 모두 확인해 주세요.",
  language: "영어·AR 체크리스트를 모두 확인해 주세요.",
  age: "연령 적합성 체크리스트를 모두 확인해 주세요.",
};

const FIELD_STAGE = {
  title: "facts", titleKo: "facts", summaryEn: "facts", summaryKo: "facts", domain: "facts", subtopic: "facts",
  sources: "facts", sourceNotes: "facts", reconstructionConfirmed: "facts", rightsNotes: "facts", media: "facts",
  connectedArticleId: "facts", visualTheme: "facts", heroImage: "facts", quest: "facts",
  difficulty: "language", oralReadingLimitSeconds: "language", estimatedReadingSeconds: "language", wordCount: "language", pages: "language",
  vocabulary: "language", quiz: "language", keySentence: "language", audioUrl: "language",
  interestBand: "age", gradeLevel: "age", minAge: "age", maxAge: "age", safetyFlags: "age", safetyReviewed: "age", learningGoal: "age", keyConcept: "age",
} satisfies { [Field in keyof ArticleEditPatch]-?: ReviewStage };

const LEARNER_FACING_FIELDS = new Set<keyof ArticleEditPatch>([
  "title", "titleKo", "summaryEn", "summaryKo", "domain", "subtopic", "interestBand", "gradeLevel", "difficulty", "oralReadingLimitSeconds", "minAge", "maxAge",
  "estimatedReadingSeconds", "safetyFlags", "wordCount", "pages", "vocabulary", "quiz", "connectedArticleId", "visualTheme", "heroImage",
  "audioUrl", "learningGoal", "keySentence", "keyConcept", "media", "quest",
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

export function validateMediaEmbeds(media: StudioMedia[]): ValidationIssue[] {
  return media.flatMap((item, index) => {
    if (item.kind === "image") return isHttpsUrl(item.url) ? [] : [{ field: `media.${index}.url`, code: "image_url_invalid" }];
    return OFFICIAL_EMBED_URLS[item.provider].test(item.embedUrl)
      ? []
      : [{ field: `media.${index}.embedUrl`, code: "unsupported_embed_url" }];
  });
}

function validateFacts(article: StudioArticle): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  required(issues, article.title, "title", "title_required");
  required(issues, article.titleKo, "titleKo", "title_ko_required");
  required(issues, article.summaryEn, "summaryEn", "summary_en_required");
  required(issues, article.summaryKo, "summaryKo", "summary_ko_required");
  required(issues, article.subtopic, "subtopic", "subtopic_required");
  required(issues, article.visualTheme, "visualTheme", "visual_theme_required");
  if (article.connectedArticleId !== undefined && (!article.connectedArticleId.trim() || article.connectedArticleId === "pending")) {
    issues.push({ field: "connectedArticleId", code: "connected_article_invalid" });
  }
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
  if (!(article.difficulty.value >= 0.1 && article.difficulty.value <= 12.9)) issues.push({ field: "difficulty.value", code: "ar_required" });
  if (article.oralReadingLimitSeconds !== undefined && !(Number.isInteger(article.oralReadingLimitSeconds) && article.oralReadingLimitSeconds > 0)) {
    issues.push({ field: "oralReadingLimitSeconds", code: "oral_reading_limit_invalid" });
  }
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

export function setChecklistItemAttestation(
  article: StudioArticle,
  itemId: ReviewChecklistItemId,
  checked: boolean,
  actor: string,
  now: string,
): StudioArticle {
  if (!CHECKLIST_STAGE.has(itemId)) throw new Error("알 수 없는 검수 항목입니다.");
  const checklistAttestations = { ...article.checklistAttestations };
  if (checked) checklistAttestations[itemId] = { actor, attestedAt: now, workingVersion: article.workingVersion };
  else delete checklistAttestations[itemId];
  return { ...article, checklistAttestations, updatedAt: now };
}

export function completeStage(article: StudioArticle, stage: ReviewStage, actor: string, now: string): StudioArticle {
  const stageIndex = STAGES.indexOf(stage);
  const prerequisiteStages = STAGES.slice(0, stageIndex);
  if (article.workflowStatus !== REQUIRED_STATUS[stage]
    || prerequisiteStages.some((item) => !isCurrentExplicitReview(item, article.reviewRecords[item], article.workingVersion))) {
    throw new Error("이전 검수 단계를 먼저 완료해 주세요.");
  }
  if (validateStage(article, stage).length > 0) throw new Error(STAGE_MESSAGES[stage]);

  const requiredIds = REVIEW_CHECKLISTS[stage].map((item) => item.id);
  if (!requiredIds.every((id) => article.checklistAttestations[id]?.workingVersion === article.workingVersion)) {
    throw new Error(CHECKLIST_MESSAGES[stage]);
  }
  const record: StageReviewRecord = {
    actor,
    completedAt: now,
    workingVersion: article.workingVersion,
    checklistItemIds: [...requiredIds],
    provenance: "explicit",
  };
  const reviewRecords = {
    ...Object.fromEntries(prerequisiteStages.map((item) => [item, article.reviewRecords[item]])),
    [stage]: record,
  };
  return {
    ...article,
    workflowStatus: workflowStatusFor(reviewRecords),
    reviewRecords,
    approval: null,
    updatedAt: now,
    auditHistory: freezeHistory([...article.auditHistory, { kind: "stage-reviewed", version: article.workingVersion, stage, record }]),
  };
}

export function applyArticleEdit(article: StudioArticle, patch: ArticleEditPatch, now: string, reason = ""): StudioArticle {
  const fields = Object.keys(patch) as (keyof ArticleEditPatch)[];
  if (fields.length === 0) return article;
  const invalidatedStage = invalidatedStageFor(fields);
  const startsNewWorkingVersion = article.activePublicationVersion === article.workingVersion
    || (article.workflowStatus === "withdrawn" && article.versionHistory.some((item) => item.version === article.workingVersion));
  const workingVersion = startsNewWorkingVersion ? article.workingVersion + 1 : article.workingVersion;
  const reviewRecords = clearReviewsFrom(article.reviewRecords, startsNewWorkingVersion ? "facts" : invalidatedStage);
  const checklistAttestations = clearAttestationsFrom(article.checklistAttestations, startsNewWorkingVersion ? "facts" : invalidatedStage);
  const invalidatesPreview = fields.some((field) => LEARNER_FACING_FIELDS.has(field));
  const changeLog = appendMeaningfulChange(article.changeLog, { changedAt: now, fields: fields.map(String), reason });

  return {
    ...article,
    ...patch,
    workingVersion,
    workflowStatus: workflowStatusFor(reviewRecords),
    reviewRecords,
    checklistAttestations,
    approval: null,
    previewReview: invalidatesPreview ? null : article.previewReview,
    updatedAt: now,
    changeLog,
  };
}

export function acknowledgePreview(article: StudioArticle, actor: string, now: string): StudioArticle {
  const record = { actor, reviewedAt: now, workingVersion: article.workingVersion };
  return {
    ...article,
    previewReview: record,
    updatedAt: now,
    auditHistory: freezeHistory([...article.auditHistory, { kind: "preview-reviewed", version: article.workingVersion, record }]),
  };
}

export function approveArticle(article: StudioArticle, actor: string, now: string): StudioArticle {
  if (article.workflowStatus !== "age_reviewed" || !STAGES.every((stage) => isCurrentExplicitReview(stage, article.reviewRecords[stage], article.workingVersion))) {
    throw new Error("모든 검수 단계를 완료해야 최종 승인할 수 있습니다.");
  }
  if (STAGES.some((stage) => validateStage(article, stage).length > 0)) throw new Error("모든 검수 단계를 다시 확인해 주세요.");
  if (!article.previewReview || article.previewReview.workingVersion !== article.workingVersion) throw new Error("모바일 미리보기를 확인해 주세요.");
  const approval = { actor, approvedAt: now, workingVersion: article.workingVersion };
  return {
    ...article,
    approval,
    workflowStatus: "approved",
    updatedAt: now,
    auditHistory: freezeHistory([...article.auditHistory, { kind: "approved", version: article.workingVersion, record: approval }]),
  };
}

export function publishArticle(article: StudioArticle, now: string): StudioArticle {
  if (article.workflowStatus !== "approved"
    || !article.approval
    || article.approval.workingVersion !== article.workingVersion
    || !STAGES.every((stage) => isCurrentExplicitReview(stage, article.reviewRecords[stage], article.workingVersion))) {
    throw new Error("최종 승인 후 발행할 수 있습니다.");
  }
  if (STAGES.some((stage) => validateStage(article, stage).length > 0)) throw new Error("모든 검수 단계를 다시 확인해 주세요.");
  if (!article.previewReview || article.previewReview.workingVersion !== article.workingVersion) throw new Error("모바일 미리보기를 확인해 주세요.");

  const candidate = createLearnerSnapshot(article);
  const parsed = parsePublicArticle(candidate);
  if (!parsed.ok) throw new Error("학습자 공개 데이터가 올바르지 않습니다.");
  const reviewRecords = Object.fromEntries(STAGES.map((stage) => [stage, article.reviewRecords[stage]])) as Record<ReviewStage, StageReviewRecord>;
  const versionHistory = article.versionHistory.map((entry) => entry.version === article.activePublicationVersion
    ? { ...entry, withdrawnAt: now }
    : entry);
  versionHistory.push({
    version: article.workingVersion,
    snapshot: parsed.value,
    reviewRecords: cloneReviewRecords(reviewRecords),
    previewReview: { ...article.previewReview },
    approval: { ...article.approval },
    publishedAt: now,
    withdrawnAt: null,
    provenance: "explicit",
  });
  const replacementWithdrawal = article.activePublicationVersion === null
    ? []
    : [{ kind: "withdrawn" as const, version: article.activePublicationVersion, at: now }];

  return {
    ...article,
    workflowStatus: "published",
    activePublicationVersion: article.workingVersion,
    versionHistory: freezeHistory(versionHistory),
    updatedAt: now,
    auditHistory: freezeHistory([...article.auditHistory, ...replacementWithdrawal, { kind: "published", version: article.workingVersion, at: now }]),
  };
}

export function withdrawArticle(article: StudioArticle, now: string): StudioArticle {
  const activeVersion = article.activePublicationVersion;
  if (activeVersion === null) throw new Error("발행된 콘텐츠만 발행 취소할 수 있습니다.");
  return {
    ...article,
    workflowStatus: article.workingVersion === activeVersion && article.workflowStatus === "published" ? "withdrawn" : article.workflowStatus,
    activePublicationVersion: null,
    versionHistory: freezeHistory(article.versionHistory.map((entry) => entry.version === activeVersion ? { ...entry, withdrawnAt: now } : entry)),
    updatedAt: now,
    auditHistory: freezeHistory([...article.auditHistory, { kind: "withdrawn", version: activeVersion, at: now }]),
  };
}

export function getActivePublication(article: StudioArticle) {
  if (article.activePublicationVersion === null) return null;
  return article.versionHistory.find((entry) => entry.version === article.activePublicationVersion && entry.withdrawnAt === null) ?? null;
}

function createLearnerSnapshot(article: StudioArticle): Article {
  if (!article.approval) throw new Error("최종 승인 후 발행할 수 있습니다.");
  return {
    id: article.id,
    title: article.title,
    titleKo: article.titleKo,
    summaryKo: article.summaryKo,
    domain: article.domain,
    interestBand: article.interestBand,
    ...(article.gradeLevel ? { gradeLevel: article.gradeLevel } : {}),
    difficulty: { ...article.difficulty },
    ...(article.oralReadingLimitSeconds ? { oralReadingLimitSeconds: article.oralReadingLimitSeconds } : {}),
    estimatedMinutes: article.estimatedMinutes,
    wordCount: article.wordCount,
    status: "published",
    version: article.workingVersion,
    pages: [...article.pages],
    keySentence: article.keySentence,
    vocabulary: article.vocabulary.map(({ exampleSentence: _exampleSentence, ...item }) => ({ ...item })),
    quiz: article.quiz.map(({ evidence: _evidence, ...question }) => ({ ...question, options: [...question.options] })),
    sources: article.sources.map(({ materialType: _materialType, supportedFact: _supportedFact, ...source }) => ({ ...source })),
    review: {
      approvedBy: article.approval.actor,
      approvedAt: article.approval.approvedAt,
      factsChecked: true,
      languageChecked: true,
      ageChecked: true,
    },
    ...(normalizedConnection(article.connectedArticleId) ? { connectedArticleId: normalizedConnection(article.connectedArticleId) } : {}),
    visualTheme: article.visualTheme,
    ...(article.heroImage ? { heroImage: { ...article.heroImage } } : {}),
    media: article.media.map((item) => item.kind === "image"
      ? { kind: "image", url: item.url, alt: item.alt }
      : { kind: "video", provider: item.provider, embedUrl: item.embedUrl, alt: item.alt }),
    ...(article.audioUrl ? { audioUrl: article.audioUrl } : {}),
    ...(article.quest ? { quest: { ...article.quest, prerequisiteArticleIds: [...article.quest.prerequisiteArticleIds], nextArticleIds: [...article.quest.nextArticleIds] } } : {}),
    mobilePreviewAcknowledged: article.previewReview?.workingVersion === article.workingVersion,
  };
}

function normalizedConnection(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized && normalized !== "pending" ? normalized : undefined;
}

function isCurrentExplicitReview(stage: ReviewStage, record: StageReviewRecord | undefined, version: number): boolean {
  if (!record || record.workingVersion !== version || record.provenance !== "explicit") return false;
  const expected = REVIEW_CHECKLISTS[stage].map((item) => item.id);
  return record.checklistItemIds.length === expected.length && expected.every((id) => record.checklistItemIds.includes(id));
}

function invalidatedStageFor(fields: (keyof ArticleEditPatch)[]): ReviewStage | null {
  const indexes = fields.map((field) => STAGES.indexOf(FIELD_STAGE[field]));
  return indexes.length === 0 ? null : STAGES[Math.min(...indexes)];
}

function clearReviewsFrom(reviewRecords: StudioArticle["reviewRecords"], invalidatedStage: ReviewStage | null): StudioArticle["reviewRecords"] {
  if (!invalidatedStage) return { ...reviewRecords };
  const firstInvalidatedIndex = STAGES.indexOf(invalidatedStage);
  return Object.fromEntries(Object.entries(reviewRecords).filter(([stage]) => STAGES.indexOf(stage as ReviewStage) < firstInvalidatedIndex));
}

function clearAttestationsFrom(
  attestations: StudioArticle["checklistAttestations"],
  invalidatedStage: ReviewStage | null,
): StudioArticle["checklistAttestations"] {
  if (!invalidatedStage) return { ...attestations };
  const firstInvalidatedIndex = STAGES.indexOf(invalidatedStage);
  return Object.fromEntries(Object.entries(attestations).filter(([id]) => {
    const stage = CHECKLIST_STAGE.get(id as ReviewChecklistItemId);
    return stage !== undefined && STAGES.indexOf(stage) < firstInvalidatedIndex;
  }));
}

function workflowStatusFor(reviewRecords: StudioArticle["reviewRecords"]): StudioArticle["workflowStatus"] {
  if (reviewRecords.age) return "age_reviewed";
  if (reviewRecords.language) return "language_reviewed";
  if (reviewRecords.facts) return "facts_reviewed";
  return "draft";
}

function cloneReviewRecords(records: Record<ReviewStage, StageReviewRecord>): Record<ReviewStage, StageReviewRecord> {
  const clone = (stage: ReviewStage): StageReviewRecord => ({
    ...records[stage],
    checklistItemIds: [...records[stage].checklistItemIds],
  });
  return { facts: clone("facts"), language: clone("language"), age: clone("age") };
}

function freezeHistory<T>(entries: T[]): T[] {
  return deepFreeze(entries) as T[];
}

function appendMeaningfulChange(log: StudioArticle["changeLog"], entry: StudioArticle["changeLog"][number]) {
  const previous = log.at(-1);
  if (!previous || previous.changedAt !== entry.changedAt || previous.reason !== entry.reason) return [...log, entry];
  return [...log.slice(0, -1), { ...entry, fields: [...new Set([...previous.fields, ...entry.fields])] }];
}

function required(issues: ValidationIssue[], value: string, field: string, code: string): void {
  if (!value.trim()) issues.push({ field, code });
}

function isHttpUrl(value: string): boolean {
  try { const url = new URL(value); return url.protocol === "https:" || url.protocol === "http:"; } catch { return false; }
}

function isHttpsUrl(value: string): boolean {
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value);
}
