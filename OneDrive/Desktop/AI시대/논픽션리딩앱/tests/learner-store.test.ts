import {
  STORAGE_KEY,
  createDefaultLearnerState,
  loadLearnerState,
  recordAttempt,
  saveLearnerState,
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

  expect(loaded.schemaVersion).toBe(2);
  expect(loaded.attempts[0]).toMatchObject({
    articleId: "stars-shine",
    articleTitle: undefined,
    articleVersion: undefined,
  });
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
