import { AR_BANDS, bandForAr, countWords } from "../ar-bands";
import type { QuizType, SourceMaterialType, StudioArticle } from "../studio-types";
import type { ArticleHeroImage, KnowledgeDomain } from "../types";
import { cloneQuestMetadata } from "../quest-types";
import type { QuestMetadata } from "../quest-types";

/** word, pronunciation, Korean meaning, plain-English definition, sentence from the passage */
export type SeedWord = [string, string, string, string, string];

/** title, publisher, url, material type, the fact this source backs */
export type SeedSource = [string, string, string, SourceMaterialType, string];

export type SeedQuiz = {
  type: QuizType;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
  evidence: string;
};

export type LibrarySeed = {
  id: string;
  ar: number;
  domain: KnowledgeDomain;
  subtopic: string;
  title: string;
  titleKo: string;
  summaryEn: string;
  summaryKo: string;
  learningGoal: string;
  keyConcept: string;
  visualTheme: string;
  heroImage?: ArticleHeroImage;
  pages: string[];
  words: SeedWord[];
  quiz: SeedQuiz[];
  sources: SeedSource[];
  safetyFlags?: string[];
  quest?: QuestMetadata;
};

const SEED_EDITOR = "논픽션랩 콘텐츠팀";
const SEED_UPDATED_AT = "2026-08-18T00:00:00.000Z";

/**
 * Turns a compact seed into a studio draft.
 *
 * Sources deliberately carry no `publishedAt`: the editor has to open each URL and record the
 * publication date before the fact-and-source review can be completed. Everything else is filled
 * in so the review is about verification, not data entry.
 */
export function buildLibraryDraft(seed: LibrarySeed): StudioArticle {
  const bandId = bandForAr(seed.ar);
  if (!bandId) throw new Error(`AR ${seed.ar}는 제작 대상 대역이 아닙니다.`);
  const band = AR_BANDS[bandId];

  return {
    id: seed.id,
    title: seed.title,
    titleKo: seed.titleKo,
    summaryEn: seed.summaryEn,
    summaryKo: seed.summaryKo,
    domain: seed.domain,
    subtopic: seed.subtopic,
    interestBand: band.interestBand,
    difficulty: {
      value: seed.ar,
      method: "nonfiction-lab-estimate",
      label: `논픽션랩 추정 난이도 ${seed.ar.toFixed(1)}`,
    },
    minAge: band.minAge,
    maxAge: band.maxAge,
    estimatedReadingSeconds: 180,
    safetyFlags: seed.safetyFlags ? [...seed.safetyFlags] : [],
    safetyReviewed: true,
    estimatedMinutes: 3,
    wordCount: countWords(seed.pages),
    pages: [...seed.pages],
    vocabulary: seed.words.map(([word, pronunciation, meaningKo, definitionEn, exampleSentence]) => ({
      word,
      pronunciation,
      meaningKo,
      definitionEn,
      exampleSentence,
    })),
    quiz: seed.quiz.map((question, index) => ({
      id: `${seed.id}-q${index + 1}`,
      type: question.type,
      prompt: question.prompt,
      options: [...question.options],
      correctIndex: question.correct,
      explanation: question.explanation,
      evidence: question.evidence,
    })),
    sources: seed.sources.map(([title, publisher, url, materialType, supportedFact]) => ({
      title,
      publisher,
      url,
      materialType,
      supportedFact,
    })),
    visualTheme: seed.visualTheme,
    ...(seed.heroImage ? { heroImage: { ...seed.heroImage } } : {}),
    ...(seed.quest ? { quest: cloneQuestMetadata(seed.quest) } : {}),
    workingVersion: 1,
    workflowStatus: "draft",
    reviewRecords: {},
    checklistAttestations: {},
    approval: null,
    previewReview: null,
    activePublicationVersion: null,
    versionHistory: [],
    auditHistory: [],
    editor: SEED_EDITOR,
    updatedAt: SEED_UPDATED_AT,
    changeLog: [],
    learningGoal: seed.learningGoal,
    keySentence: seed.pages[0],
    keyConcept: seed.keyConcept,
    sourceNotes: seed.sources.map(([title, publisher]) => `${publisher} — ${title}`).join(", "),
    reconstructionConfirmed: true,
    rightsNotes: "원문을 복제하지 않고 교차 확인한 사실만 재구성했습니다. 편집자가 원문 URL과 사용 조건을 다시 확인해 주세요.",
    media: [],
  };
}
