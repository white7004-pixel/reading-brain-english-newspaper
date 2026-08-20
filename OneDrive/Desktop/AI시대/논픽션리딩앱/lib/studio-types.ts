import type {
  Article,
  ArticleHeroImage,
  Difficulty,
  InterestBand,
  KnowledgeDomain,
  QuizQuestion,
  SourceRef,
  VocabularyItem,
} from "@/lib/types";
import type { QuestMetadata } from "@/lib/quest-types";

export type ReviewStage = "facts" | "language" | "age";

export type WorkflowStatus =
  | "draft"
  | "facts_reviewed"
  | "language_reviewed"
  | "age_reviewed"
  | "approved"
  | "published"
  | "withdrawn";

export type ValidationIssue = { field: string; code: string };

export type ReviewChecklistItemId =
  | "facts.source-present"
  | "facts.source-trust"
  | "facts.publication-valid"
  | "facts.supported-facts"
  | "facts.independent-reconstruction"
  | "facts.media-rights"
  | "language.grammar"
  | "language.difficulty-fit"
  | "language.three-minute"
  | "language.vocabulary-context"
  | "language.quiz-evidence"
  | "age.topic-fit"
  | "age.young-reader-clarity"
  | "age.safety-flags"
  | "age.concept-integrity";

export type ChecklistAttestation = {
  actor: string;
  attestedAt: string;
  workingVersion: number;
};

export type ReviewProvenance = "explicit" | "legacy" | "seed";

export type StageReviewRecord = {
  readonly actor: string;
  readonly completedAt: string;
  readonly workingVersion: number;
  readonly checklistItemIds: ReadonlyArray<ReviewChecklistItemId>;
  readonly provenance: ReviewProvenance;
};

export type ApprovalRecord = {
  readonly actor: string;
  readonly approvedAt: string;
  readonly workingVersion: number;
};

export type PreviewReviewRecord = {
  readonly actor: string;
  readonly reviewedAt: string;
  readonly workingVersion: number;
};

export type ChangeLogEntry = {
  changedAt: string;
  fields: string[];
  reason: string;
};

export type MediaProvider = "youtube" | "ted" | "cnn";

export type StudioImageMedia = {
  kind: "image";
  url: string;
  alt: string;
  usageConfirmed: boolean;
};

export type StudioVideoMedia = {
  kind: "video";
  provider: MediaProvider;
  embedUrl: string;
  alt: string;
  usageConfirmed: boolean;
};

export type StudioMedia = StudioImageMedia | StudioVideoMedia;
export type MediaEmbed = StudioVideoMedia;

export type StudioVocabularyItem = VocabularyItem & { exampleSentence: string };
export type QuizType = "comprehension" | "inference" | "vocabulary";
export type StudioQuizQuestion = QuizQuestion & { type: QuizType; evidence: string };
export type SourceMaterialType = "article" | "paper" | "news" | "magazine" | "exam" | "video";
export type StudioSourceRef = SourceRef & { materialType: SourceMaterialType; supportedFact: string };

export type PublishedVersionRecord = {
  readonly version: number;
  readonly snapshot: Readonly<Article>;
  readonly reviewRecords: Readonly<Record<ReviewStage, StageReviewRecord>>;
  readonly previewReview: PreviewReviewRecord;
  readonly approval: ApprovalRecord;
  readonly publishedAt: string | null;
  readonly withdrawnAt: string | null;
  readonly provenance: ReviewProvenance;
};

export type AuditHistoryEntry =
  | Readonly<{ kind: "stage-reviewed"; version: number; stage: ReviewStage; record: StageReviewRecord }>
  | Readonly<{ kind: "preview-reviewed"; version: number; record: PreviewReviewRecord }>
  | Readonly<{ kind: "approved"; version: number; record: ApprovalRecord }>
  | Readonly<{ kind: "published"; version: number; at: string }>
  | Readonly<{ kind: "withdrawn"; version: number; at: string }>;

export type ArticleEditPatch = Partial<
  Pick<
    StudioArticle,
    | "title"
    | "titleKo"
    | "summaryEn"
    | "summaryKo"
    | "domain"
    | "subtopic"
    | "interestBand"
    | "difficulty"
    | "minAge"
    | "maxAge"
    | "estimatedReadingSeconds"
    | "safetyFlags"
    | "safetyReviewed"
    | "wordCount"
    | "pages"
    | "vocabulary"
    | "quiz"
    | "sources"
    | "connectedArticleId"
    | "visualTheme"
    | "heroImage"
    | "audioUrl"
    | "learningGoal"
    | "keySentence"
    | "keyConcept"
    | "sourceNotes"
    | "reconstructionConfirmed"
    | "rightsNotes"
    | "media"
    | "quest"
  >
>;

export type ArticlePersistenceResult = { ok: true } | { ok: false; error: string };

export type StudioArticle = {
  id: string;
  title: string;
  titleKo: string;
  summaryEn: string;
  summaryKo: string;
  domain: KnowledgeDomain;
  subtopic: string;
  interestBand: InterestBand;
  difficulty: Difficulty;
  minAge: number;
  maxAge: number;
  estimatedReadingSeconds: number;
  safetyFlags: string[];
  safetyReviewed: boolean;
  estimatedMinutes: 3;
  wordCount: number;
  pages: string[];
  vocabulary: StudioVocabularyItem[];
  quiz: StudioQuizQuestion[];
  sources: StudioSourceRef[];
  connectedArticleId?: string;
  visualTheme: string;
  heroImage?: ArticleHeroImage;
  audioUrl?: string;
  workingVersion: number;
  workflowStatus: WorkflowStatus;
  reviewRecords: Partial<Record<ReviewStage, StageReviewRecord>>;
  checklistAttestations: Partial<Record<ReviewChecklistItemId, ChecklistAttestation>>;
  approval: ApprovalRecord | null;
  previewReview: PreviewReviewRecord | null;
  activePublicationVersion: number | null;
  versionHistory: ReadonlyArray<PublishedVersionRecord>;
  auditHistory: ReadonlyArray<AuditHistoryEntry>;
  editor: string;
  updatedAt: string;
  changeLog: ChangeLogEntry[];
  learningGoal: string;
  keySentence: string;
  keyConcept: string;
  sourceNotes: string;
  reconstructionConfirmed: boolean;
  rightsNotes: string;
  media: StudioMedia[];
  quest?: QuestMetadata;
};
