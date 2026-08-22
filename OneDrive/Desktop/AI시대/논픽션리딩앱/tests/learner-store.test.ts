import {
  STORAGE_KEY,
  createDefaultLearnerState,
  loadLearnerState,
  recordAttempt,
  saveLearnerState,
  updateLearnerLevel,
  type LearnerState,
  type NewLearningAttempt,
} from "@/lib/learner-store";

const attempt: NewLearningAttempt = {
  id: "attempt-1",
  articleId: "stars-shine",
  articleTitle: "Why Stars Shine",
  articleVersion: 3,
  completedAt: "2026-08-17T10:00:00.000Z",
  localDate: "2026-08-17",
  correct: 3,
  total: 3,
  hintsUsed: 1,
  durationSeconds: 185,
  xpAwarded: 35,
};

beforeEach(() => localStorage.clear());

it("keeps entered and estimated AR values separate", () => {
  const state = createDefaultLearnerState();
  state.profile.enteredAr = 2.4;
  state.profile.estimatedDifficulty = 2.1;
  saveLearnerState(localStorage, state);

  expect(loadLearnerState(localStorage).profile).toMatchObject({ enteredAr: 2.4, estimatedDifficulty: 2.1 });
});

it("recovers from corrupt or unknown-version storage", () => {
  localStorage.setItem(STORAGE_KEY, "not-json");
  expect(loadLearnerState(localStorage)).toEqual(createDefaultLearnerState());
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 99 }));
  expect(loadLearnerState(localStorage)).toEqual(createDefaultLearnerState());
});

it("migrates old attempts without inventing missing article snapshots", () => {
  const legacy = createDefaultLearnerState() as unknown as Record<string, unknown>;
  legacy.schemaVersion = 1;
  const { articleTitle: _title, articleVersion: _version, ...legacyAttempt } = attempt;
  legacy.attempts = [legacyAttempt];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));

  const loaded = loadLearnerState(localStorage);

  expect(loaded.schemaVersion).toBe(3);
  expect(loaded.activeQuest).toBeNull();
  expect(loaded.attempts[0]).toMatchObject({
    articleId: "stars-shine",
    articleTitle: undefined,
    articleVersion: undefined,
  });
});

it("migrates a v2 learner without losing its saved progress", () => {
  const v2 = createDefaultLearnerState() as unknown as Record<string, unknown>;
  v2.schemaVersion = 2;
  delete v2.activeQuest;
  v2.completedArticleIds = ["stars-shine"];
  v2.savedWords = [{ articleId: "stars-shine", word: "energy" }];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v2));

  expect(loadLearnerState(localStorage)).toMatchObject({
    schemaVersion: 3,
    activeQuest: null,
    completedArticleIds: ["stars-shine"],
    savedWords: [{ articleId: "stars-shine", word: "energy" }],
  });
});

it("preserves optional growth-history fields when loading v1, v2, and v3 learner data", () => {
  for (const schemaVersion of [1, 2, 3]) {
    const legacy = createDefaultLearnerState() as unknown as Record<string, unknown>;
    legacy.schemaVersion = schemaVersion;
    if (schemaVersion < 3) delete legacy.activeQuest;
    legacy.attempts = [{
      ...attempt,
      domain: "science",
      keyFinderCorrect: true,
      keyFinderSelections: ["core-word", "key-sentence"],
    }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));

    expect(loadLearnerState(localStorage).attempts[0]).toMatchObject({
      domain: "science",
      keyFinderCorrect: true,
      keyFinderSelections: ["core-word", "key-sentence"],
    });
  }
});

it("rejects new attempts without a complete immutable article snapshot", () => {
  expect(() => recordAttempt(createDefaultLearnerState(), { ...attempt, articleTitle: "   " })).toThrow(
    "Article snapshot",
  );
  expect(() => recordAttempt(createDefaultLearnerState(), { ...attempt, articleVersion: 0 })).toThrow(
    "Article snapshot",
  );
});

it("records an attempt once without overwriting entered AR", () => {
  const state = createDefaultLearnerState();
  state.profile.enteredAr = 2.4;
  const once = recordAttempt(state, attempt);
  const twice = recordAttempt(once, attempt);

  expect(once.attempts).toHaveLength(1);
  expect(once.profile.xp).toBe(35);
  expect(once.profile.enteredAr).toBe(2.4);
  expect(twice).toEqual(once);
});

it("increments a streak once per local calendar day", () => {
  const first = recordAttempt(createDefaultLearnerState(), attempt);
  const sameDay = recordAttempt(first, { ...attempt, id: "attempt-2" });
  const nextDay = recordAttempt(sameDay, { ...attempt, id: "attempt-3", localDate: "2026-08-18" });

  expect(first.profile.streak).toBe(1);
  expect(sameDay.profile.streak).toBe(1);
  expect(nextDay.profile.streak).toBe(2);
});

const seededLearner = (): LearnerState => {
  const base = createDefaultLearnerState();
  return {
    ...base,
    profile: { ...base.profile, enteredAr: null, estimatedDifficulty: 2.3, xp: 120, streak: 4, lastLearningDate: "2026-08-17", interests: ["science" as const] },
    attempts: [{ ...attempt }],
    completedArticleIds: ["stars-shine"],
    savedWords: [{ articleId: "stars-shine", word: "energy" }],
  };
};

it("keeps only the directly entered AR value", () => {
  const next = updateLearnerLevel(seededLearner(), { enteredAr: 3.4, estimatedDifficulty: null });

  expect(next.profile.enteredAr).toBe(3.4);
  expect(next.profile.estimatedDifficulty).toBeNull();
});

it("keeps only the estimate when the level test is retaken", () => {
  const state = seededLearner();
  state.profile.enteredAr = 5.1;
  state.profile.estimatedDifficulty = null;

  const next = updateLearnerLevel(state, { enteredAr: null, estimatedDifficulty: 1.5 });

  expect(next.profile.estimatedDifficulty).toBe(1.5);
  expect(next.profile.enteredAr).toBeNull();
});

it("preserves learning progress when the level changes", () => {
  const state = seededLearner();

  const next = updateLearnerLevel(state, { enteredAr: 3.4, estimatedDifficulty: null });

  expect(next.attempts).toEqual(state.attempts);
  expect(next.completedArticleIds).toEqual(state.completedArticleIds);
  expect(next.savedWords).toEqual(state.savedWords);
  expect(next.profile).toMatchObject({ xp: 120, streak: 4, lastLearningDate: "2026-08-17", name: state.profile.name, interests: ["science"] });
});

it("rejects an AR value outside the supported range", () => {
  expect(() => updateLearnerLevel(seededLearner(), { enteredAr: 25, estimatedDifficulty: null })).toThrow(
    "AR 지수는 0.1에서 20.0 사이여야 합니다.",
  );
});

it("rejects an empty level", () => {
  expect(() => updateLearnerLevel(seededLearner(), { enteredAr: null, estimatedDifficulty: null })).toThrow(
    "읽기 레벨 값이 필요합니다.",
  );
});
