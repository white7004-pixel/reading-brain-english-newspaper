import { ageBoundsForInterestBand } from "./content-taxonomy";
import { clonePublicArticle, deepFreeze, isArticleHeroImage, parsePublicArticle } from "./public-article-schema";
import { createSeedStudioState } from "./studio-seed";
import { getActivePublication } from "./studio-workflow";
import { cloneQuestMetadata, isQuestMetadata } from "./quest-types";
import type {
  ApprovalRecord,
  AuditHistoryEntry,
  ChecklistAttestation,
  PublishedVersionRecord,
  ReviewChecklistItemId,
  ReviewProvenance,
  ReviewStage,
  StageReviewRecord,
  StudioArticle,
  StudioMedia,
} from "./studio-types";
import type { Article, InterestBand } from "./types";

export const STUDIO_STORAGE_KEY = "nonfiction-lab:studio:v1";
export const CORRUPT_STUDIO_BACKUP_KEY = "nonfiction-lab:studio:corrupt-backup";

export type StudioState = { schemaVersion: 3; articles: StudioArticle[] };

export type StudioLoadResult =
  | { kind: "missing"; state: StudioState }
  | { kind: "loaded"; state: StudioState }
  | { kind: "migrated"; state: StudioState; from: 1 | 2 }
  | { kind: "corrupt-backed-up"; state: StudioState; raw: string }
  | { kind: "read-failed"; state: StudioState; error: Error }
  | { kind: "recovery-failed"; state: StudioState; raw: string; error: Error };

type StudioStorage = Pick<Storage, "getItem" | "setItem">;

const STAGES: ReviewStage[] = ["facts", "language", "age"];
const WORKFLOW_STATUSES = new Set(["draft", "facts_reviewed", "language_reviewed", "age_reviewed", "approved", "published", "withdrawn"]);
const DOMAINS = new Set(["science", "history", "arts", "philosophy", "self-development", "world-culture"]);
const INTEREST_BANDS = new Set(["lower-elementary", "upper-elementary", "teen", "adult", "all-ages"]);
const MEDIA_PROVIDERS = new Set(["youtube", "ted", "cnn"]);
const QUIZ_TYPES = new Set(["comprehension", "inference", "vocabulary"]);
const SOURCE_MATERIAL_TYPES = new Set(["article", "paper", "news", "magazine", "exam", "video"]);
const REVIEW_PROVENANCE = new Set<ReviewProvenance>(["explicit", "legacy", "seed"]);
const CHECKLIST_IDS = new Set<ReviewChecklistItemId>([
  "facts.source-present", "facts.source-trust", "facts.publication-valid", "facts.supported-facts", "facts.independent-reconstruction", "facts.media-rights",
  "language.grammar", "language.difficulty-fit", "language.three-minute", "language.vocabulary-context", "language.quiz-evidence",
  "age.topic-fit", "age.young-reader-clarity", "age.safety-flags", "age.concept-integrity",
]);

export function loadStudioState(storage: StudioStorage): StudioLoadResult {
  const fallback = createSeedStudioState();
  let raw: string | null;
  try {
    raw = storage.getItem(STUDIO_STORAGE_KEY);
  } catch (cause) {
    return { kind: "read-failed", state: fallback, error: asError(cause) };
  }
  if (raw === null) return { kind: "missing", state: fallback };

  try {
    const parsed: unknown = JSON.parse(raw);
    if (isRecord(parsed) && parsed.schemaVersion === 3) {
      const state = hydrateStudioState(parsed);
      return { kind: "loaded", state };
    }
    if (isRecord(parsed) && (parsed.schemaVersion === 1 || parsed.schemaVersion === 2)) {
      const state = migrateStudioState(parsed);
      return { kind: "migrated", state, from: parsed.schemaVersion };
    }
    throw new Error("Unsupported or invalid studio state");
  } catch (cause) {
    try {
      backupCorruptStudioState(storage, raw);
      return { kind: "corrupt-backed-up", state: fallback, raw };
    } catch (backupCause) {
      return { kind: "recovery-failed", state: fallback, raw, error: asError(backupCause ?? cause) };
    }
  }
}

export function saveStudioState(storage: Pick<Storage, "setItem">, state: StudioState): void {
  assertStudioState(state);
  assertStudioConnections(state);
  storage.setItem(STUDIO_STORAGE_KEY, JSON.stringify(state));
}

export function upsertStudioArticle(state: StudioState, article: StudioArticle): StudioState {
  const existingIndex = state.articles.findIndex((item) => item.id === article.id);
  const articles = existingIndex === -1
    ? [...state.articles, article]
    : state.articles.map((item) => item.id === article.id ? article : item);
  const next = { ...state, articles };
  assertStudioState(next);
  return next;
}

export function getPublicArticles(state: StudioState): Article[] {
  return state.articles.flatMap((article) => {
    const publication = getActivePublication(article);
    if (!publication || !hasPublicationEvidence(publication)) return [];
    const parsed = parsePublicArticle(publication.snapshot);
    return parsed.ok ? [clonePublicArticle(parsed.value)] : [];
  });
}

function hasPublicationEvidence(publication: PublishedVersionRecord): boolean {
  const reviews = publication.reviewRecords;
  return hasAllReviews(reviews)
    && STAGES.every((stage) => reviews[stage].workingVersion === publication.version)
    && publication.previewReview.workingVersion === publication.version
    && publication.approval.workingVersion === publication.version
    && publication.snapshot.review.approvedBy === publication.approval.actor
    && publication.snapshot.review.approvedAt === publication.approval.approvedAt;
}

export function backupCorruptStudioState(storage: Pick<Storage, "setItem">, raw: string): void {
  storage.setItem(CORRUPT_STUDIO_BACKUP_KEY, raw);
}

function migrateStudioState(value: Record<string, unknown>): StudioState {
  if (!Array.isArray(value.articles)) throw new Error("Invalid legacy studio state");
  const articles = sanitizeMigratedConnections(value.articles.map((article) => migrateLegacyArticle(article)));
  const state: StudioState = { schemaVersion: 3, articles };
  assertStudioState(state);
  assertStudioConnections(state);
  return hydrateStudioState(state);
}

function migrateLegacyArticle(value: unknown): StudioArticle {
  if (!isRecord(value) || !isNonEmptyString(value.id)) throw new Error("Invalid legacy studio article");
  const workingVersion = isPositiveInteger(value.workingVersion)
    ? value.workingVersion
    : isPositiveInteger(value.version) ? value.version : 1;
  const interestBand = INTEREST_BANDS.has(value.interestBand as string) ? value.interestBand as InterestBand : "all-ages";
  const [minAge, maxAge] = legacyAgeBounds(value, interestBand);
  const legacyMedia = migrateMedia(value.media);
  const legacyApproval = migrateApproval(value.approval, workingVersion);
  const legacyPreview = migratePreview(value.previewReview, legacyApproval, workingVersion);
  const legacyReviews = migrateReviewRecords(value.reviewRecords, workingVersion);
  const rawSnapshot = isRecord(value.publishedSnapshot)
    ? { ...value.publishedSnapshot, media: migratePublicMedia(value.publishedSnapshot.media) }
    : null;
  const parsedSnapshot = rawSnapshot ? parsePublicArticle(normalizeLegacyPublicSnapshot(rawSnapshot)) : null;
  if (rawSnapshot && !parsedSnapshot?.ok) throw new Error("Legacy publication snapshot is invalid");
  const wasWithdrawn = value.workflowStatus === "withdrawn" || value.status === "withdrawn";
  const wasPublished = !wasWithdrawn && (value.workflowStatus === "published" || value.status === "published");
  const historyVersion = parsedSnapshot?.ok ? parsedSnapshot.value.version : null;
  const historyApproval = historyVersion === null || !parsedSnapshot?.ok
    ? null
    : migrateApproval(value.approval, historyVersion) ?? legacySnapshotApproval(parsedSnapshot.value);
  const historyPreview = historyVersion === null || !parsedSnapshot?.ok
    ? null
    : migratePreview(value.previewReview, historyApproval, historyVersion) ?? legacySnapshotPreview(parsedSnapshot.value);
  const recordedHistoryReviews = historyVersion === null || workingVersion !== historyVersion
    ? {}
    : migrateReviewRecords(value.reviewRecords, historyVersion);
  const historyReviews = historyVersion === null || !parsedSnapshot?.ok
    ? null
    : hasAllReviews(recordedHistoryReviews) ? recordedHistoryReviews : legacySnapshotReviews(parsedSnapshot.value);
  if (historyVersion !== null && (!historyApproval || !historyPreview || !historyReviews || !hasAllReviews(historyReviews))) {
    throw new Error("Legacy publication audit is incomplete");
  }
  const withdrawnAt = wasWithdrawn && isString(value.withdrawnAt) ? value.withdrawnAt : wasWithdrawn ? asTimestamp(value.updatedAt) : null;
  const versionHistory: PublishedVersionRecord[] = parsedSnapshot?.ok && historyApproval && historyPreview && historyReviews && hasAllReviews(historyReviews)
    ? [{
        version: parsedSnapshot.value.version,
        snapshot: parsedSnapshot.value,
        reviewRecords: historyReviews as Record<ReviewStage, StageReviewRecord>,
        previewReview: historyPreview,
        approval: historyApproval,
        publishedAt: null,
        withdrawnAt,
        provenance: "legacy",
      }]
    : [];
  const activePublicationVersion = versionHistory.length > 0 && !wasWithdrawn ? versionHistory[0].version : null;
  const publicationMatchesWorking = historyVersion === workingVersion;

  const preserveHistoricalProjection = publicationMatchesWorking && (wasPublished || wasWithdrawn);
  const currentReviewRecords = preserveHistoricalProjection
    ? hasAllReviews(legacyReviews) ? legacyReviews : historyReviews ?? {}
    : {};
  const currentApproval = preserveHistoricalProjection ? legacyApproval ?? historyApproval : null;
  const currentPreview = preserveHistoricalProjection ? legacyPreview ?? historyPreview : null;
  const legacyAuditHistory: AuditHistoryEntry[] = [
    ...STAGES.flatMap((stage): AuditHistoryEntry[] => {
      const record = legacyReviews[stage];
      return record ? [{ kind: "stage-reviewed", version: workingVersion, stage, record }] : [];
    }),
    ...(legacyPreview ? [{ kind: "preview-reviewed" as const, version: workingVersion, record: legacyPreview }] : []),
    ...(legacyApproval ? [{ kind: "approved" as const, version: workingVersion, record: legacyApproval }] : []),
    ...(withdrawnAt && historyVersion ? [{ kind: "withdrawn" as const, version: historyVersion, at: withdrawnAt }] : []),
  ];

  const article: StudioArticle = {
    id: value.id,
    title: asString(value.title),
    titleKo: asString(value.titleKo),
    summaryEn: asString(value.summaryEn),
    summaryKo: asString(value.summaryKo),
    domain: DOMAINS.has(value.domain as string) ? value.domain as StudioArticle["domain"] : "science",
    subtopic: asString(value.subtopic),
    interestBand,
    difficulty: isDifficulty(value.difficulty) ? { ...value.difficulty } : { value: 0, method: "nonfiction-lab-estimate", label: "" },
    minAge,
    maxAge,
    estimatedReadingSeconds: isNonNegativeInteger(value.estimatedReadingSeconds) ? value.estimatedReadingSeconds : 180,
    safetyFlags: isStringArray(value.safetyFlags) ? [...value.safetyFlags] : [],
    safetyReviewed: typeof value.safetyReviewed === "boolean" ? value.safetyReviewed : false,
    estimatedMinutes: 3,
    wordCount: isNonNegativeNumber(value.wordCount) ? value.wordCount : 0,
    pages: isStringArray(value.pages) ? [...value.pages] : [],
    vocabulary: migrateVocabulary(value.vocabulary),
    quiz: migrateQuiz(value.quiz),
    sources: migrateSources(value.sources),
    ...(normalizeConnection(value.connectedArticleId) ? { connectedArticleId: normalizeConnection(value.connectedArticleId) } : {}),
    visualTheme: asString(value.visualTheme),
    ...(isArticleHeroImage(value.heroImage) ? { heroImage: { ...value.heroImage } } : {}),
    ...(isString(value.audioUrl) ? { audioUrl: value.audioUrl } : {}),
    ...(isQuestMetadata(value.quest) ? { quest: cloneQuestMetadata(value.quest) } : {}),
    workingVersion,
    workflowStatus: wasPublished && publicationMatchesWorking ? "published" : wasWithdrawn && publicationMatchesWorking ? "withdrawn" : "draft",
    reviewRecords: currentReviewRecords,
    checklistAttestations: {},
    approval: currentApproval,
    previewReview: currentPreview,
    activePublicationVersion,
    versionHistory,
    auditHistory: legacyAuditHistory,
    editor: isNonEmptyString(value.editor) ? value.editor : "legacy-editor",
    updatedAt: asTimestamp(value.updatedAt),
    changeLog: migrateChangeLog(value.changeLog),
    learningGoal: asString(value.learningGoal),
    keySentence: asString(value.keySentence),
    keyConcept: asString(value.keyConcept),
    sourceNotes: asString(value.sourceNotes),
    reconstructionConfirmed: typeof value.reconstructionConfirmed === "boolean" ? value.reconstructionConfirmed : false,
    rightsNotes: asString(value.rightsNotes),
    media: legacyMedia,
  };
  return article;
}

function normalizeLegacyPublicSnapshot(value: Record<string, unknown>): Record<string, unknown> {
  return {
    ...value,
    status: "published",
    media: migratePublicMedia(value.media),
    ...(normalizeConnection(value.connectedArticleId) ? { connectedArticleId: normalizeConnection(value.connectedArticleId) } : { connectedArticleId: undefined }),
  };
}

function legacyAgeBounds(value: Record<string, unknown>, interestBand: InterestBand): readonly [number, number] {
  if (isPositiveInteger(value.minAge) && isPositiveInteger(value.maxAge) && value.maxAge >= value.minAge) return [value.minAge, value.maxAge];
  if (isString(value.ageRange)) {
    const match = /^(\d+)\s*-\s*(\d+)$/.exec(value.ageRange);
    if (match) return [Number(match[1]), Number(match[2])];
    if (INTEREST_BANDS.has(value.ageRange)) return ageBoundsForInterestBand(value.ageRange as InterestBand);
  }
  return ageBoundsForInterestBand(interestBand);
}

function hydrateStudioState(value: unknown): StudioState {
  assertStudioState(value);
  assertStudioConnections(value);
  return {
    schemaVersion: 3,
    articles: value.articles.map((article) => ({
      ...article,
      ...(article.quest ? { quest: cloneQuestMetadata(article.quest) } : {}),
      versionHistory: deepFreeze(article.versionHistory.map((entry) => {
        const parsed = parsePublicArticle(entry.snapshot);
        if (!parsed.ok) throw new Error("Invalid public snapshot");
        return {
          ...entry,
          snapshot: parsed.value,
          reviewRecords: cloneReviewRecords(entry.reviewRecords),
          previewReview: { ...entry.previewReview },
          approval: { ...entry.approval },
        };
      })) as PublishedVersionRecord[],
      auditHistory: deepFreeze(article.auditHistory.map(cloneAuditHistoryEntry)) as AuditHistoryEntry[],
    })),
  };
}

function sanitizeMigratedConnections(articles: StudioArticle[]): StudioArticle[] {
  const historicallyPublicIds = new Set(articles.filter((article) => article.versionHistory.length > 0).map((article) => article.id));
  const valid = (sourceId: string, targetId: string | undefined) => Boolean(targetId && targetId !== sourceId && historicallyPublicIds.has(targetId));
  return articles.map((article) => ({
    ...article,
    connectedArticleId: valid(article.id, article.connectedArticleId) ? article.connectedArticleId : undefined,
    versionHistory: article.versionHistory.map((entry) => {
      if (valid(article.id, entry.snapshot.connectedArticleId)) return entry;
      const parsed = parsePublicArticle({ ...entry.snapshot, connectedArticleId: undefined });
      if (!parsed.ok) throw new Error("Invalid migrated public snapshot");
      return { ...entry, snapshot: parsed.value };
    }),
  }));
}

function assertStudioState(value: unknown): asserts value is StudioState {
  if (!isRecord(value) || value.schemaVersion !== 3 || !Array.isArray(value.articles) || !value.articles.every(isStudioArticle)) {
    throw new Error("Invalid studio state");
  }
  const ids = value.articles.map((article) => article.id);
  if (new Set(ids).size !== ids.length) throw new Error("Duplicate studio article ID");
}

function assertStudioConnections(state: StudioState): void {
  const articlesById = new Map(state.articles.map((article) => [article.id, article]));
  for (const article of state.articles) {
    const connections = [article.connectedArticleId, ...article.versionHistory.map((entry) => entry.snapshot.connectedArticleId)]
      .filter((id): id is string => Boolean(id));
    for (const connection of connections) {
      const target = articlesById.get(connection);
      if (connection === article.id || !target || target.versionHistory.length === 0) {
        throw new Error("Invalid studio connection");
      }
    }
  }
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
    || !isPositiveInteger(value.minAge)
    || !isPositiveInteger(value.maxAge)
    || value.maxAge < value.minAge
    || !isNonNegativeInteger(value.estimatedReadingSeconds)
    || !isStringArray(value.safetyFlags)
    || typeof value.safetyReviewed !== "boolean"
    || value.estimatedMinutes !== 3
    || !isNonNegativeNumber(value.wordCount)
    || !isStringArray(value.pages)
    || !isStudioVocabulary(value.vocabulary)
    || !isStudioQuiz(value.quiz)
    || !isStudioSources(value.sources)
    || (value.connectedArticleId !== undefined && !isNonEmptyString(value.connectedArticleId))
    || !isString(value.visualTheme)
    || (value.heroImage !== undefined && !isArticleHeroImage(value.heroImage))
    || (value.audioUrl !== undefined && !isString(value.audioUrl))
    || (value.quest !== undefined && !isQuestMetadata(value.quest))
    || !isPositiveInteger(value.workingVersion)
    || !WORKFLOW_STATUSES.has(value.workflowStatus as string)
    || !isReviewRecords(value.reviewRecords)
    || !isChecklistAttestations(value.checklistAttestations)
    || (value.approval !== null && !isApproval(value.approval))
    || (value.previewReview !== null && !isPreviewReview(value.previewReview))
    || (value.activePublicationVersion !== null && !isPositiveInteger(value.activePublicationVersion))
    || !isVersionHistory(value.versionHistory, value.id)
    || !isAuditHistory(value.auditHistory)
    || !isNonEmptyString(value.editor)
    || !isString(value.updatedAt)
    || !isChangeLog(value.changeLog)
    || !isString(value.learningGoal)
    || !isString(value.keySentence)
    || !isString(value.keyConcept)
    || !isString(value.sourceNotes)
    || typeof value.reconstructionConfirmed !== "boolean"
    || !isString(value.rightsNotes)
    || !isStudioMedia(value.media)) return false;

  const article = value as StudioArticle;
  const versions = article.versionHistory.map((entry) => entry.version);
  if (new Set(versions).size !== versions.length) return false;
  if (article.activePublicationVersion !== null) {
    const active = article.versionHistory.find((entry) => entry.version === article.activePublicationVersion);
    if (!active || active.withdrawnAt !== null) return false;
    if (article.versionHistory.filter((entry) => entry.withdrawnAt === null).length !== 1) return false;
  } else if (article.versionHistory.some((entry) => entry.withdrawnAt === null)) return false;
  return hasConsistentWorkingWorkflow(article);
}

function hasConsistentWorkingWorkflow(article: StudioArticle): boolean {
  const facts = article.reviewRecords.facts;
  const language = article.reviewRecords.language;
  const age = article.reviewRecords.age;
  const current = (stage: ReviewStage, record: StageReviewRecord | undefined) => Boolean(
    record && record.workingVersion === article.workingVersion && hasVersionChecklist(stage, record),
  );
  const approvalCurrent = Boolean(article.approval && article.approval.workingVersion === article.workingVersion);
  switch (article.workflowStatus) {
    case "draft": return !facts && !language && !age && !article.approval;
    case "facts_reviewed": return current("facts", facts) && !language && !age && !article.approval;
    case "language_reviewed": return current("facts", facts) && current("language", language) && !age && !article.approval;
    case "age_reviewed": return current("facts", facts) && current("language", language) && current("age", age) && !article.approval;
    case "approved": return current("facts", facts) && current("language", language) && current("age", age) && approvalCurrent;
    case "published": return current("facts", facts) && current("language", language) && current("age", age) && approvalCurrent
      && article.activePublicationVersion === article.workingVersion;
    case "withdrawn": return current("facts", facts) && current("language", language) && current("age", age) && approvalCurrent
      && article.activePublicationVersion === null && article.versionHistory.some((entry) => entry.version === article.workingVersion);
  }
}

function isVersionHistory(value: unknown, articleId: unknown): value is PublishedVersionRecord[] {
  return Array.isArray(value) && value.every((entry) => {
    if (!isRecord(entry)
      || !isPositiveInteger(entry.version)
      || !isReviewRecords(entry.reviewRecords)
      || !hasAllReviews(entry.reviewRecords as Partial<Record<ReviewStage, StageReviewRecord>>)
      || !isPreviewReview(entry.previewReview)
      || !isApproval(entry.approval)
      || (entry.publishedAt !== null && !isString(entry.publishedAt))
      || (entry.withdrawnAt !== null && !isString(entry.withdrawnAt))
      || !REVIEW_PROVENANCE.has(entry.provenance as ReviewProvenance)) return false;
    const version = entry.version as number;
    const reviews = entry.reviewRecords as Record<ReviewStage, StageReviewRecord>;
    const preview = entry.previewReview as PublishedVersionRecord["previewReview"];
    const approval = entry.approval as PublishedVersionRecord["approval"];
    if (STAGES.some((stage) => reviews[stage].workingVersion !== version || !hasVersionChecklist(stage, reviews[stage]))) return false;
    if (preview.workingVersion !== version || approval.workingVersion !== version) return false;
    if (entry.provenance !== "legacy" && !isNonEmptyString(entry.publishedAt)) return false;
    const parsed = parsePublicArticle(entry.snapshot);
    return parsed.ok
      && parsed.value.id === articleId
      && parsed.value.version === version
      && parsed.value.review.approvedBy === approval.actor
      && parsed.value.review.approvedAt === approval.approvedAt;
  });
}

function isAuditHistory(value: unknown): value is AuditHistoryEntry[] {
  if (!Array.isArray(value)) return false;
  return value.every((entry) => isRecord(entry) && isPositiveInteger(entry.version) && (
    (entry.kind === "stage-reviewed" && STAGES.includes(entry.stage as ReviewStage) && isReviewRecord(entry.record)
      && entry.record.workingVersion === entry.version && hasVersionChecklist(entry.stage as ReviewStage, entry.record))
    || (entry.kind === "preview-reviewed" && isPreviewReview(entry.record) && entry.record.workingVersion === entry.version)
    || (entry.kind === "approved" && isApproval(entry.record) && entry.record.workingVersion === entry.version)
    || ((entry.kind === "published" || entry.kind === "withdrawn") && isString(entry.at))
  ));
}

function hasVersionChecklist(stage: ReviewStage, record: StageReviewRecord): boolean {
  if (record.provenance === "legacy") return record.checklistItemIds.length === 0;
  const expected = [...CHECKLIST_IDS].filter((id) => id.startsWith(`${stage}.`));
  return record.checklistItemIds.length === expected.length && expected.every((id) => record.checklistItemIds.includes(id));
}

function migrateReviewRecords(value: unknown, version: number): Partial<Record<ReviewStage, StageReviewRecord>> {
  if (!isRecord(value)) return {};
  return Object.fromEntries(STAGES.flatMap((stage) => {
    const record = value[stage];
    if (!isRecord(record) || !isNonEmptyString(record.actor) || !isNonEmptyString(record.completedAt)) return [];
    return [[stage, {
      actor: record.actor,
      completedAt: record.completedAt,
      workingVersion: version,
      checklistItemIds: [],
      provenance: "legacy" as const,
    }]];
  }));
}

function migrateApproval(value: unknown, version: number): ApprovalRecord | null {
  return isRecord(value)
    && (!isPositiveInteger(value.workingVersion) || value.workingVersion === version)
    && isNonEmptyString(value.actor)
    && isNonEmptyString(value.approvedAt)
    ? { actor: value.actor, approvedAt: value.approvedAt, workingVersion: version }
    : null;
}

function migratePreview(value: unknown, approval: ApprovalRecord | null, version: number) {
  if (isRecord(value)
    && (!isPositiveInteger(value.workingVersion) || value.workingVersion === version)
    && isNonEmptyString(value.actor)
    && isNonEmptyString(value.reviewedAt)) {
    return { actor: value.actor, reviewedAt: value.reviewedAt, workingVersion: version };
  }
  return approval ? { actor: approval.actor, reviewedAt: approval.approvedAt, workingVersion: version } : null;
}

function legacySnapshotApproval(snapshot: Readonly<Article>): ApprovalRecord {
  return {
    actor: snapshot.review.approvedBy,
    approvedAt: snapshot.review.approvedAt,
    workingVersion: snapshot.version,
  };
}

function legacySnapshotPreview(snapshot: Readonly<Article>) {
  return {
    actor: snapshot.review.approvedBy,
    reviewedAt: snapshot.review.approvedAt,
    workingVersion: snapshot.version,
  };
}

function legacySnapshotReviews(snapshot: Readonly<Article>): Record<ReviewStage, StageReviewRecord> {
  const record = (): StageReviewRecord => ({
    actor: snapshot.review.approvedBy,
    completedAt: snapshot.review.approvedAt,
    workingVersion: snapshot.version,
    checklistItemIds: [],
    provenance: "legacy",
  });
  return { facts: record(), language: record(), age: record() };
}

function migrateVocabulary(value: unknown): StudioArticle["vocabulary"] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => isRecord(item) ? {
    word: asString(item.word), pronunciation: asString(item.pronunciation), meaningKo: asString(item.meaningKo),
    definitionEn: asString(item.definitionEn), exampleSentence: asString(item.exampleSentence),
  } : { word: "", pronunciation: "", meaningKo: "", definitionEn: "", exampleSentence: "" });
}

function migrateQuiz(value: unknown): StudioArticle["quiz"] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => isRecord(item) ? {
    id: asString(item.id),
    type: QUIZ_TYPES.has(item.type as string) ? item.type as StudioArticle["quiz"][number]["type"] : "comprehension",
    prompt: asString(item.prompt),
    options: isStringArray(item.options) ? [...item.options] : [],
    correctIndex: isInteger(item.correctIndex) ? item.correctIndex : 0,
    explanation: asString(item.explanation),
    evidence: asString(item.evidence),
  } : { id: "", type: "comprehension", prompt: "", options: [], correctIndex: 0, explanation: "", evidence: "" });
}

function migrateSources(value: unknown): StudioArticle["sources"] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => isRecord(item) ? {
    title: asString(item.title), publisher: asString(item.publisher), url: asString(item.url),
    ...(isString(item.publishedAt) ? { publishedAt: item.publishedAt } : {}),
    materialType: SOURCE_MATERIAL_TYPES.has(item.materialType as string) ? item.materialType as StudioArticle["sources"][number]["materialType"] : "article",
    supportedFact: asString(item.supportedFact),
  } : { title: "", publisher: "", url: "", materialType: "article", supportedFact: "" });
}

function migrateMedia(value: unknown): StudioMedia[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item): StudioMedia[] => {
    if (!isRecord(item)) return [];
    if (item.kind === "image") return [{ kind: "image", url: asString(item.url), alt: asString(item.alt), usageConfirmed: item.usageConfirmed === true }];
    const provider = MEDIA_PROVIDERS.has(item.provider as string) ? item.provider as StudioMedia & string : "youtube";
    return [{ kind: "video", provider: provider as "youtube" | "ted" | "cnn", embedUrl: asString(item.embedUrl), alt: asString(item.alt), usageConfirmed: item.usageConfirmed === true }];
  });
}

function migratePublicMedia(value: unknown): Article["media"] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item): Article["media"] => {
    if (!isRecord(item)) return [];
    if (item.kind === "image") return [{ kind: "image", url: asString(item.url), alt: asString(item.alt) }];
    if (item.kind === "video" && MEDIA_PROVIDERS.has(item.provider as string)) return [{ kind: "video", provider: item.provider as "youtube" | "ted" | "cnn", embedUrl: asString(item.embedUrl), alt: asString(item.alt) }];
    return [];
  });
}

function migrateChangeLog(value: unknown): StudioArticle["changeLog"] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => isRecord(entry) && isString(entry.changedAt) && isStringArray(entry.fields)
    ? [{ changedAt: entry.changedAt, fields: [...entry.fields], reason: asString(entry.reason) }]
    : []);
}

function isDifficulty(value: unknown): value is StudioArticle["difficulty"] {
  return isRecord(value) && isNonNegativeNumber(value.value)
    && (value.method === "external-user-entry" || value.method === "nonfiction-lab-estimate")
    && isString(value.label);
}

function isStudioVocabulary(value: unknown): boolean {
  return Array.isArray(value) && value.every((item) => isRecord(item)
    && isString(item.word) && isString(item.pronunciation) && isString(item.meaningKo)
    && isString(item.definitionEn) && isString(item.exampleSentence));
}

function isStudioQuiz(value: unknown): boolean {
  return Array.isArray(value) && value.every((item) => isRecord(item) && isString(item.id)
    && QUIZ_TYPES.has(item.type as string) && isString(item.prompt) && isStringArray(item.options)
    && isInteger(item.correctIndex) && isString(item.explanation) && isString(item.evidence));
}

function isStudioSources(value: unknown): boolean {
  return Array.isArray(value) && value.every((item) => isRecord(item) && isString(item.title)
    && isString(item.publisher) && isString(item.url) && (item.publishedAt === undefined || isString(item.publishedAt))
    && SOURCE_MATERIAL_TYPES.has(item.materialType as string) && isString(item.supportedFact));
}

function isStudioMedia(value: unknown): boolean {
  return Array.isArray(value) && value.every((item) => isRecord(item) && isString(item.alt)
    && typeof item.usageConfirmed === "boolean" && (
      (item.kind === "image" && isString(item.url))
      || (item.kind === "video" && MEDIA_PROVIDERS.has(item.provider as string) && isString(item.embedUrl))
    ));
}

function isReviewRecords(value: unknown): value is Partial<Record<ReviewStage, StageReviewRecord>> {
  return isRecord(value) && STAGES.every((stage) => value[stage] === undefined || isReviewRecord(value[stage]));
}

function isReviewRecord(value: unknown): value is StageReviewRecord {
  return isRecord(value) && isNonEmptyString(value.actor) && isNonEmptyString(value.completedAt)
    && isPositiveInteger(value.workingVersion) && Array.isArray(value.checklistItemIds)
    && value.checklistItemIds.every((id) => CHECKLIST_IDS.has(id as ReviewChecklistItemId))
    && new Set(value.checklistItemIds).size === value.checklistItemIds.length
    && REVIEW_PROVENANCE.has(value.provenance as ReviewProvenance);
}

function hasAllReviews(value: Partial<Record<ReviewStage, StageReviewRecord>>): value is Record<ReviewStage, StageReviewRecord> {
  return STAGES.every((stage) => isReviewRecord(value[stage]));
}

function isChecklistAttestations(value: unknown): value is Partial<Record<ReviewChecklistItemId, ChecklistAttestation>> {
  return isRecord(value) && Object.entries(value).every(([id, record]) => CHECKLIST_IDS.has(id as ReviewChecklistItemId)
    && isRecord(record) && isNonEmptyString(record.actor) && isNonEmptyString(record.attestedAt) && isPositiveInteger(record.workingVersion));
}

function isApproval(value: unknown): value is ApprovalRecord {
  return isRecord(value) && isNonEmptyString(value.actor) && isNonEmptyString(value.approvedAt) && isPositiveInteger(value.workingVersion);
}

function isPreviewReview(value: unknown): value is StudioArticle["previewReview"] & object {
  return isRecord(value) && isNonEmptyString(value.actor) && isNonEmptyString(value.reviewedAt) && isPositiveInteger(value.workingVersion);
}

function isChangeLog(value: unknown): boolean {
  return Array.isArray(value) && value.every((entry) => isRecord(entry) && isString(entry.changedAt) && isStringArray(entry.fields) && isString(entry.reason));
}

function cloneReviewRecords(records: Record<ReviewStage, StageReviewRecord>): Record<ReviewStage, StageReviewRecord> {
  const clone = (stage: ReviewStage): StageReviewRecord => ({
    ...records[stage],
    checklistItemIds: [...records[stage].checklistItemIds],
  });
  return { facts: clone("facts"), language: clone("language"), age: clone("age") };
}

function cloneAuditHistoryEntry(entry: AuditHistoryEntry): AuditHistoryEntry {
  if (entry.kind === "stage-reviewed") {
    return { ...entry, record: { ...entry.record, checklistItemIds: [...entry.record.checklistItemIds] } };
  }
  if (entry.kind === "preview-reviewed") {
    return { ...entry, record: { ...entry.record } };
  }
  if (entry.kind === "approved") {
    return { ...entry, record: { ...entry.record } };
  }
  return { ...entry };
}

function normalizeConnection(value: unknown): string | undefined {
  if (!isString(value)) return undefined;
  const normalized = value.trim();
  return normalized && normalized !== "pending" ? normalized : undefined;
}

function asTimestamp(value: unknown): string { return isString(value) ? value : ""; }
function asString(value: unknown): string { return isString(value) ? value : ""; }
function asError(value: unknown): Error { return value instanceof Error ? value : new Error(String(value)); }
function isRecord(value: unknown): value is Record<string, unknown> { return Boolean(value) && typeof value === "object" && !Array.isArray(value); }
function isString(value: unknown): value is string { return typeof value === "string"; }
function isNonEmptyString(value: unknown): value is string { return isString(value) && value.trim().length > 0; }
function isStringArray(value: unknown): value is string[] { return Array.isArray(value) && value.every(isString); }
function isNonNegativeNumber(value: unknown): value is number { return typeof value === "number" && Number.isFinite(value) && value >= 0; }
function isNonNegativeInteger(value: unknown): value is number { return isNonNegativeNumber(value) && Number.isInteger(value); }
function isInteger(value: unknown): value is number { return typeof value === "number" && Number.isInteger(value); }
function isPositiveInteger(value: unknown): value is number { return isInteger(value) && value > 0; }
