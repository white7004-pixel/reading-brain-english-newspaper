import { ageBoundsForInterestBand } from "./content-taxonomy";
import { createLibraryDrafts } from "./library";
import { deepFreeze, parsePublicArticle } from "./public-article-schema";
import { REVIEW_CHECKLISTS } from "./studio-workflow";
import type { ReviewStage, StageReviewRecord, StudioArticle } from "./studio-types";
import type { StudioState } from "./studio-store";
import { SAMPLE_ARTICLES } from "./sample-content";
import type { Article } from "./types";
import { cloneQuestMetadata } from "./quest-types";

export function createSeedStudioState(): StudioState {
  return {
    schemaVersion: 3,
    articles: [...SAMPLE_ARTICLES.map(createSeedStudioArticle), ...createLibraryDrafts()],
  };
}

function createSeedStudioArticle(article: Article): StudioArticle {
  const { review } = article;
  const snapshot = cloneAndFreezePublishedSnapshot(article);
  const seedReviewRecord = (stage: ReviewStage): StageReviewRecord => ({
    actor: review.approvedBy,
    completedAt: review.approvedAt,
    workingVersion: article.version,
    checklistItemIds: REVIEW_CHECKLISTS[stage].map((item) => item.id),
    provenance: "seed",
  });
  const reviewRecords: Record<ReviewStage, StageReviewRecord> = {
    facts: seedReviewRecord("facts"),
    language: seedReviewRecord("language"),
    age: seedReviewRecord("age"),
  };
  const approval = { actor: review.approvedBy, approvedAt: review.approvedAt, workingVersion: article.version };
  const previewReview = { actor: review.approvedBy, reviewedAt: review.approvedAt, workingVersion: article.version };
  const [minAge, maxAge] = ageBoundsForInterestBand(article.interestBand);
  const versionHistory = deepFreeze([{
    version: article.version,
    snapshot,
    reviewRecords,
    previewReview,
    approval,
    publishedAt: review.approvedAt,
    withdrawnAt: null,
    provenance: "seed" as const,
  }]) as StudioArticle["versionHistory"];
  const auditHistory = deepFreeze([
    { kind: "published" as const, version: article.version, at: review.approvedAt },
  ]) as StudioArticle["auditHistory"];

  return {
    id: article.id,
    title: article.title,
    titleKo: article.titleKo,
    summaryKo: article.summaryKo,
    domain: article.domain,
    interestBand: article.interestBand,
    difficulty: { ...article.difficulty },
    estimatedMinutes: article.estimatedMinutes,
    wordCount: article.wordCount,
    pages: [...article.pages],
    ...(article.connectedArticleId ? { connectedArticleId: article.connectedArticleId } : {}),
    visualTheme: article.visualTheme,
    ...(article.heroImage ? { heroImage: { ...article.heroImage } } : {}),
    ...(article.audioUrl ? { audioUrl: article.audioUrl } : {}),
    ...(article.quest ? { quest: cloneQuestMetadata(article.quest) } : {}),
    summaryEn: article.pages[0] ?? "",
    subtopic: article.domain,
    minAge,
    maxAge,
    estimatedReadingSeconds: 180,
    safetyFlags: [],
    safetyReviewed: true,
    vocabulary: article.vocabulary.map((item) => ({
      ...item,
      exampleSentence: article.pages.find((page) => page.toLocaleLowerCase().includes(item.word.toLocaleLowerCase())) ?? article.pages[0] ?? "",
    })),
    quiz: article.quiz.map((question) => ({ ...question, type: "comprehension" as const, evidence: article.pages[0] ?? "" })),
    sources: article.sources.map((source) => ({ ...source, materialType: "article" as const, supportedFact: article.summaryKo })),
    workingVersion: article.version,
    workflowStatus: "published",
    reviewRecords,
    checklistAttestations: {},
    approval,
    previewReview,
    activePublicationVersion: article.version,
    versionHistory,
    auditHistory,
    editor: review.approvedBy,
    updatedAt: review.approvedAt,
    changeLog: [],
    learningGoal: article.summaryKo,
    keySentence: article.keySentence,
    keyConcept: article.domain,
    sourceNotes: article.sources.map((source) => source.title).join(", "),
    reconstructionConfirmed: true,
    rightsNotes: "원문 링크와 사용 조건을 확인했습니다.",
    media: article.media.map((item) => ({ ...item, usageConfirmed: true })),
  };
}

export function cloneAndFreezePublishedSnapshot(article: Article): Readonly<Article> {
  const parsed = parsePublicArticle(article);
  if (!parsed.ok) throw new Error("Invalid seed public article");
  return parsed.value;
}
