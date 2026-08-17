import { SAMPLE_ARTICLES } from "./sample-content";
import type { StudioArticle } from "./studio-types";
import type { StudioState } from "./studio-store";
import type { Article } from "./types";

export function createSeedStudioState(): StudioState {
  return {
    schemaVersion: 2,
    articles: SAMPLE_ARTICLES.map(createSeedStudioArticle),
  };
}

function createSeedStudioArticle(article: Article): StudioArticle {
  const { review, ...articleFields } = article;

  return {
    ...articleFields,
    summaryEn: article.pages[0] ?? "",
    subtopic: article.domain,
    minAge: ageBounds(article.interestBand)[0],
    maxAge: ageBounds(article.interestBand)[1],
    estimatedReadingSeconds: 180,
    safetyFlags: [],
    safetyReviewed: true,
    vocabulary: article.vocabulary.map((item) => ({
      ...item,
      exampleSentence: article.pages.find((page) => page.toLocaleLowerCase().includes(item.word.toLocaleLowerCase())) ?? article.pages[0] ?? "",
    })),
    quiz: article.quiz.map((question) => ({ ...question, type: "comprehension" as const, evidence: article.pages[0] ?? "" })),
    sources: article.sources.map((source) => ({ ...source, materialType: "article" as const, supportedFact: article.summaryKo })),
    status: "published",
    workingVersion: article.version,
    publishedSnapshot: cloneAndFreezePublishedSnapshot(article),
    workflowStatus: "published",
    reviewRecords: {
      facts: { actor: review.approvedBy, completedAt: review.approvedAt },
      language: { actor: review.approvedBy, completedAt: review.approvedAt },
      age: { actor: review.approvedBy, completedAt: review.approvedAt },
    },
    approval: { actor: review.approvedBy, approvedAt: review.approvedAt, workingVersion: article.version },
    previewReview: { actor: review.approvedBy, reviewedAt: review.approvedAt, workingVersion: article.version },
    withdrawnAt: null,
    editor: review.approvedBy,
    updatedAt: review.approvedAt,
    changeLog: [],
    ageRange: article.interestBand,
    learningGoal: article.summaryKo,
    keySentence: article.pages[0],
    keyConcept: article.domain,
    sourceNotes: article.sources.map((source) => source.title).join(", "),
    reconstructionConfirmed: true,
    rightsNotes: "원문 링크와 사용 조건을 확인했습니다.",
    media: [],
  };
}

function ageBounds(interestBand: Article["interestBand"]): [number, number] {
  switch (interestBand) {
    case "lower-elementary": return [7, 9];
    case "upper-elementary": return [10, 12];
    case "teen": return [13, 17];
    case "adult": return [18, 99];
    case "all-ages": return [7, 99];
  }
}

export function cloneAndFreezePublishedSnapshot(article: Article): Readonly<Article> {
  return deepFreeze({
    ...article,
    difficulty: { ...article.difficulty },
    pages: [...article.pages],
    vocabulary: article.vocabulary.map((item) => ({ ...item })),
    quiz: article.quiz.map((question) => ({ ...question, options: [...question.options] })),
    sources: article.sources.map((source) => ({ ...source })),
    review: { ...article.review },
  });
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    for (const nestedValue of Object.values(value)) {
      deepFreeze(nestedValue);
    }
    Object.freeze(value);
  }

  return value;
}
