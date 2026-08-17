import {
  STORAGE_KEY,
  createDefaultLearnerState,
  loadLearnerState,
  recordAttempt,
  saveLearnerState,
  type LearningAttempt,
} from "@/lib/learner-store";

const attempt: LearningAttempt = {
  id: "attempt-1",
  articleId: "stars-shine",
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
