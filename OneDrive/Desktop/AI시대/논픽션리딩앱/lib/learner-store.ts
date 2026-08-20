import { isValidArEntry } from "./placement-test";
import type { KnowledgeDomain } from "./types";
import type { ActiveQuestProgress } from "./quest-progress";

export const STORAGE_KEY = "nonfiction-lab:learner:v1";

export type LearnerProfile = {
  name: string;
  onboardingComplete: boolean;
  enteredAr: number | null;
  estimatedDifficulty: number | null;
  interests: KnowledgeDomain[];
  streak: number;
  xp: number;
  lastLearningDate: string | null;
};

export type LearningAttempt = {
  id: string;
  articleId: string;
  articleTitle?: string;
  articleVersion?: number;
  completedAt: string;
  localDate: string;
  correct: number;
  total: number;
  hintsUsed: number;
  durationSeconds: number;
  xpAwarded: number;
};

export type NewLearningAttempt = Omit<LearningAttempt, "articleTitle" | "articleVersion"> & {
  articleTitle: string;
  articleVersion: number;
};

export type LearnerLevel = {
  enteredAr: number | null;
  estimatedDifficulty: number | null;
};

export type LearnerState = {
  schemaVersion: 3;
  profile: LearnerProfile;
  attempts: LearningAttempt[];
  completedArticleIds: string[];
  savedWords: Array<{ articleId: string; word: string }>;
  activeQuest: ActiveQuestProgress | null;
};

export function createDefaultLearnerState(): LearnerState {
  return {
    schemaVersion: 3,
    profile: {
      name: "탐험가",
      onboardingComplete: false,
      enteredAr: null,
      estimatedDifficulty: null,
      interests: ["science", "world-culture", "arts"],
      streak: 0,
      xp: 0,
      lastLearningDate: null,
    },
    attempts: [],
    completedArticleIds: [],
    savedWords: [],
    activeQuest: null,
  };
}

type LearnerStateV2 = Omit<LearnerState, "schemaVersion" | "activeQuest"> & { schemaVersion: 2 };
type LegacyLearnerState = Omit<LearnerStateV2, "schemaVersion"> & { schemaVersion: 1 };

function hasLearnerStateShape(value: unknown): value is Omit<LearnerState, "schemaVersion"> & { schemaVersion: number } {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<LearnerState>;
  return typeof candidate.schemaVersion === "number"
    && !!candidate.profile
    && Array.isArray(candidate.attempts)
    && Array.isArray(candidate.completedArticleIds)
    && Array.isArray(candidate.savedWords);
}

function isLearnerState(value: unknown): value is LearnerState {
  if (!hasLearnerStateShape(value) || value.schemaVersion !== 3) return false;
  const activeQuest = (value as Partial<LearnerState>).activeQuest;
  return activeQuest === null || isActiveQuestProgress(activeQuest);
}

function isLegacyLearnerState(value: unknown): value is LegacyLearnerState {
  return hasLearnerStateShape(value) && value.schemaVersion === 1;
}

function isLearnerStateV2(value: unknown): value is LearnerStateV2 {
  return hasLearnerStateShape(value) && value.schemaVersion === 2;
}

function isActiveQuestProgress(value: unknown): value is ActiveQuestProgress {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ActiveQuestProgress>;
  return typeof candidate.articleId === "string"
    && (candidate.phase === "reader" || candidate.phase === "quiz")
    && typeof candidate.pageIndex === "number"
    && Number.isInteger(candidate.pageIndex)
    && candidate.pageIndex >= 0;
}

function migrateV1ToV2(state: LegacyLearnerState): LearnerStateV2 {
  return {
    ...state,
    schemaVersion: 2,
    attempts: state.attempts.map((attempt) => ({
      ...attempt,
      articleTitle: typeof attempt.articleTitle === "string" ? attempt.articleTitle : undefined,
      articleVersion: typeof attempt.articleVersion === "number" ? attempt.articleVersion : undefined,
    })),
  };
}

function migrateV2ToV3(state: LearnerStateV2): LearnerState {
  return { ...state, schemaVersion: 3, activeQuest: null };
}

export function loadLearnerState(storage: Pick<Storage, "getItem">): LearnerState {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultLearnerState();
    const parsed: unknown = JSON.parse(raw);
    if (isLearnerState(parsed)) return parsed;
    if (isLearnerStateV2(parsed)) return migrateV2ToV3(parsed);
    if (isLegacyLearnerState(parsed)) return migrateV2ToV3(migrateV1ToV2(parsed));
    return createDefaultLearnerState();
  } catch {
    return createDefaultLearnerState();
  }
}

export function saveLearnerState(storage: Pick<Storage, "setItem">, state: LearnerState): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function dayDistance(from: string, to: string): number {
  const start = Date.parse(`${from}T00:00:00Z`);
  const end = Date.parse(`${to}T00:00:00Z`);
  return Math.round((end - start) / 86_400_000);
}

export function updateLearnerLevel(state: LearnerState, level: LearnerLevel): LearnerState {
  if (level.enteredAr === null && level.estimatedDifficulty === null) {
    throw new Error("읽기 레벨 값이 필요합니다.");
  }
  if (level.enteredAr !== null && !isValidArEntry(level.enteredAr)) {
    throw new Error("AR 지수는 0.1에서 20.0 사이여야 합니다.");
  }
  return {
    ...state,
    profile: {
      ...state.profile,
      enteredAr: level.enteredAr,
      estimatedDifficulty: level.estimatedDifficulty,
    },
  };
}

export function recordAttempt(state: LearnerState, attempt: NewLearningAttempt): LearnerState {
  if (
    typeof attempt.articleTitle !== "string"
    || attempt.articleTitle.trim().length === 0
    || !Number.isInteger(attempt.articleVersion)
    || attempt.articleVersion < 1
  ) {
    throw new Error("Article snapshot requires a title and positive integer version.");
  }
  if (state.attempts.some((item) => item.id === attempt.id)) return state;

  const previousDate = state.profile.lastLearningDate;
  const distance = previousDate ? dayDistance(previousDate, attempt.localDate) : null;
  const streak = distance === 0 ? state.profile.streak : distance === 1 ? state.profile.streak + 1 : 1;

  return {
    ...state,
    profile: {
      ...state.profile,
      xp: state.profile.xp + attempt.xpAwarded,
      streak,
      lastLearningDate: distance !== null && distance < 0 ? previousDate : attempt.localDate,
    },
    attempts: [...state.attempts, attempt],
    completedArticleIds: state.completedArticleIds.includes(attempt.articleId)
      ? state.completedArticleIds
      : [...state.completedArticleIds, attempt.articleId],
  };
}
