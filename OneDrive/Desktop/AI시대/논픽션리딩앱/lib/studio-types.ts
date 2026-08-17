import type {
  Article,
  Difficulty,
  InterestBand,
  KnowledgeDomain,
  QuizQuestion,
  SourceRef,
  VocabularyItem,
} from "@/lib/types";

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
};

export type ChangeLogEntry = {
  changedAt: string;
  fields: string[];
};

export type MediaProvider = "youtube" | "ted" | "cnn";

export type MediaEmbed = {
  provider: MediaProvider;
  embedUrl: string;
  alt: string;
};

export type ArticleEditPatch = Partial<
  Pick<
    StudioArticle,
    | "title"
    | "titleKo"
    | "summaryKo"
    | "domain"
    | "interestBand"
    | "difficulty"
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
    | "media"
  >
>;

export type StudioArticle = {
  id: string;
  title: string;
  titleKo: string;
  summaryKo: string;
  domain: KnowledgeDomain;
  interestBand: InterestBand;
  difficulty: Difficulty;
  estimatedMinutes: 3;
  wordCount: number;
  status: "draft" | "review" | "published" | "withdrawn";
  version: number;
  pages: string[];
  vocabulary: VocabularyItem[];
  quiz: QuizQuestion[];
  sources: SourceRef[];
  connectedArticleId: string;
  visualTheme: string;
  audioUrl?: string;
  workingVersion: number;
  publishedSnapshot: Readonly<Article> | null;
  workflowStatus: WorkflowStatus;
  reviewRecords: Partial<Record<ReviewStage, StageReviewRecord>>;
  approval: ApprovalRecord | null;
  withdrawnAt: string | null;
  editor: string;
  updatedAt: string;
  changeLog: ChangeLogEntry[];
  ageRange: string;
  learningGoal: string;
  keySentence: string;
  keyConcept: string;
  sourceNotes: string;
  media: MediaEmbed[];
};
