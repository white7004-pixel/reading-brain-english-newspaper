import type { KnowledgeDomain } from "./types";

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

export type LearnerState = {
  schemaVersion: 2;
  profile: LearnerProfile;
  attempts: LearningAttempt[];
  completedArticleIds: string[];
  savedWords: Array<{ articleId: string; word: string }>;
};

export function createDefaultLearnerState(): LearnerState {
  return {
    schemaVersion: 2,
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
  };
}

type LegacyLearnerState = Omit<LearnerState, "schemaVersion"> & { schemaVersion: 1 };

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
  return hasLearnerStateShape(value) && value.schemaVersion === 2;
}

function isLegacyLearnerState(value: unknown): value is LegacyLearnerState {
  return hasLearnerStateShape(value) && value.schemaVersion === 1;
}

function migrateLegacyLearnerState(state: LegacyLearnerState): LearnerState {
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

export function loadLearnerState(storage: Pick<Storage, "getItem">): LearnerState {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultLearnerState();
    const parsed: unknown = JSON.parse(raw);
    if (isLearnerState(parsed)) return parsed;
    if (isLegacyLearnerState(parsed)) return migrateLegacyLearnerState(parsed);
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
