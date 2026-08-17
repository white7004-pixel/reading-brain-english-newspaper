import type {
  Article,
  Difficulty,
  InterestBand,
  KnowledgeDomain,
} from "@/lib/types";
import type { QuizQuestion, SourceRef, VocabularyItem } from "@/lib/types";

export type ReviewStage = "facts" | "language" | "age";

export type WorkflowStatus =
  | "draft"
  | "facts_reviewed"
  | "language_reviewed"
  | "age_reviewed"
  | "approved"
  | "published"
  | "withdrawn";

export type ValidationIssue = {
  field: string;
  code: string;
};

export type StageReviewRecord = {
  actor: string;
  completedAt: string;
};

export type ApprovalRecord = {
  actor: string;
  approvedAt: string;
  workingVersion: number;
};

export type PreviewReviewRecord = {
  actor: string;
  reviewedAt: string;
  workingVersion: number;
};

export type ChangeLogEntry = {
  changedAt: string;
  fields: string[];
  reason: string;
};

export type MediaProvider = "youtube" | "ted" | "cnn";

export type MediaEmbed = {
  provider: MediaProvider;
  embedUrl: string;
  alt: string;
  usageConfirmed: boolean;
};

export type StudioVocabularyItem = VocabularyItem & { exampleSentence: string };
export type QuizType = "comprehension" | "inference" | "vocabulary";
export type StudioQuizQuestion = QuizQuestion & { type: QuizType; evidence: string };
export type SourceMaterialType = "article" | "paper" | "news" | "magazine" | "exam" | "video";
export type StudioSourceRef = SourceRef & { materialType: SourceMaterialType; supportedFact: string };

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
    | "audioUrl"
    | "ageRange"
    | "learningGoal"
    | "keySentence"
    | "keyConcept"
    | "sourceNotes"
    | "reconstructionConfirmed"
    | "rightsNotes"
    | "media"
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
  status: "draft" | "review" | "published" | "withdrawn";
  version: number;
  pages: string[];
  vocabulary: StudioVocabularyItem[];
  quiz: StudioQuizQuestion[];
  sources: StudioSourceRef[];
  connectedArticleId: string;
  visualTheme: string;
  audioUrl?: string;
  workingVersion: number;
  publishedSnapshot: Readonly<Article> | null;
  workflowStatus: WorkflowStatus;
  reviewRecords: Partial<Record<ReviewStage, StageReviewRecord>>;
  approval: ApprovalRecord | null;
  previewReview: PreviewReviewRecord | null;
  withdrawnAt: string | null;
  editor: string;
  updatedAt: string;
  changeLog: ChangeLogEntry[];
  ageRange: string;
  learningGoal: string;
  keySentence: string;
  keyConcept: string;
  sourceNotes: string;
  reconstructionConfirmed: boolean;
  rightsNotes: string;
  media: MediaEmbed[];
};
