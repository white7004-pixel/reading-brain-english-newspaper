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
  completedAt: string;
  localDate: string;
  correct: number;
  total: number;
  hintsUsed: number;
  durationSeconds: number;
  xpAwarded: number;
};

export type LearnerState = {
  schemaVersion: 1;
  profile: LearnerProfile;
  attempts: LearningAttempt[];
  completedArticleIds: string[];
  savedWords: Array<{ articleId: string; word: string }>;
};

export function createDefaultLearnerState(): LearnerState {
  return {
    schemaVersion: 1,
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

function isLearnerState(value: unknown): value is LearnerState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<LearnerState>;
  return candidate.schemaVersion === 1 && !!candidate.profile && Array.isArray(candidate.attempts) && Array.isArray(candidate.completedArticleIds) && Array.isArray(candidate.savedWords);
}

export function loadLearnerState(storage: Pick<Storage, "getItem">): LearnerState {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultLearnerState();
    const parsed: unknown = JSON.parse(raw);
    return isLearnerState(parsed) ? parsed : createDefaultLearnerState();
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

export function recordAttempt(state: LearnerState, attempt: LearningAttempt): LearnerState {
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
