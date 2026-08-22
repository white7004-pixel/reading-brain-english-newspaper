import { buildWeeklyGrowth } from "@/lib/growth-report";
import type { LearningAttempt } from "@/lib/learner-store";

const attempt = (overrides: Partial<LearningAttempt>): LearningAttempt => ({
  id: "attempt-1",
  articleId: "article-1",
  articleTitle: "Article",
  articleVersion: 1,
  completedAt: "2026-08-17T12:00:00.000Z",
  localDate: "2026-08-17",
  correct: 4,
  total: 4,
  hintsUsed: 0,
  durationSeconds: 180,
  xpAwarded: 40,
  ...overrides,
});

describe("buildWeeklyGrowth", () => {
  it("aggregates the local Monday-through-Sunday week with duplicate-day attempts", () => {
    const attempts = [
      attempt({ id: "one", localDate: "2026-08-17", durationSeconds: 180, correct: 4, total: 4, domain: "science", keyFinderCorrect: true }),
      attempt({ id: "two", localDate: "2026-08-18", durationSeconds: 240, correct: 3, total: 4, domain: "history", keyFinderCorrect: true }),
      attempt({ id: "three", localDate: "2026-08-19", durationSeconds: 120, correct: 4, total: 4, domain: "science", keyFinderCorrect: false }),
      attempt({ id: "four", localDate: "2026-08-20", durationSeconds: 300, correct: 4, total: 4, domain: "arts", keyFinderCorrect: true }),
      attempt({ id: "five", localDate: "2026-08-20", durationSeconds: 240, correct: 3, total: 4, domain: "arts" }),
      attempt({ id: "outside", localDate: "2026-08-24", durationSeconds: 999, correct: 0, total: 1, domain: "philosophy", keyFinderCorrect: false }),
    ];

    expect(buildWeeklyGrowth(attempts, "2026-08-23")).toEqual({
      startLocalDate: "2026-08-17",
      endLocalDate: "2026-08-23",
      activeDays: 4,
      questCount: 5,
      totalMinutes: 18,
      quizAccuracyPercent: 90,
      keyFinderAccuracyPercent: 75,
      domainCounts: { science: 2, history: 1, arts: 2 },
      dailyMinutes: [
        { localDate: "2026-08-17", minutes: 3 },
        { localDate: "2026-08-18", minutes: 4 },
        { localDate: "2026-08-19", minutes: 2 },
        { localDate: "2026-08-20", minutes: 9 },
        { localDate: "2026-08-21", minutes: 0 },
        { localDate: "2026-08-22", minutes: 0 },
        { localDate: "2026-08-23", minutes: 0 },
      ],
    });
  });

  it("returns an empty local week with nullable key-finder accuracy when no attempts exist", () => {
    expect(buildWeeklyGrowth([], "2026-08-23")).toEqual({
      startLocalDate: "2026-08-17",
      endLocalDate: "2026-08-23",
      activeDays: 0,
      questCount: 0,
      totalMinutes: 0,
      quizAccuracyPercent: 0,
      keyFinderAccuracyPercent: null,
      domainCounts: {},
      dailyMinutes: [
        { localDate: "2026-08-17", minutes: 0 },
        { localDate: "2026-08-18", minutes: 0 },
        { localDate: "2026-08-19", minutes: 0 },
        { localDate: "2026-08-20", minutes: 0 },
        { localDate: "2026-08-21", minutes: 0 },
        { localDate: "2026-08-22", minutes: 0 },
        { localDate: "2026-08-23", minutes: 0 },
      ],
    });
  });

  it("uses localDate rather than timestamps and excludes attempts outside the local week", () => {
    const growth = buildWeeklyGrowth([
      attempt({ id: "boundary", completedAt: "2026-08-24T01:00:00.000Z", localDate: "2026-08-23", durationSeconds: 60, correct: 1, total: 1 }),
      attempt({ id: "prior", localDate: "2026-08-16", durationSeconds: 600, correct: 0, total: 1 }),
    ], "2026-08-23");

    expect(growth).toMatchObject({ activeDays: 1, questCount: 1, totalMinutes: 1, quizAccuracyPercent: 100 });
  });

  it("normalizes a midweek reference date to its complete Monday-through-Sunday week", () => {
    const growth = buildWeeklyGrowth([
      attempt({ id: "monday", localDate: "2026-08-17", durationSeconds: 60 }),
      attempt({ id: "wednesday", localDate: "2026-08-19", durationSeconds: 60 }),
      attempt({ id: "sunday", localDate: "2026-08-23", durationSeconds: 60 }),
      attempt({ id: "next-monday", localDate: "2026-08-24", durationSeconds: 600 }),
    ], "2026-08-19");

    expect(growth).toMatchObject({
      startLocalDate: "2026-08-17",
      endLocalDate: "2026-08-23",
      activeDays: 3,
      questCount: 3,
      totalMinutes: 3,
    });
    expect(growth.dailyMinutes.at(-1)).toEqual({ localDate: "2026-08-23", minutes: 1 });
  });

  it("ignores legacy missing domain and key-finder fields while avoiding zero-total division", () => {
    const growth = buildWeeklyGrowth([
      attempt({ id: "legacy", localDate: "2026-08-21", correct: 0, total: 0, durationSeconds: 30, domain: undefined, keyFinderCorrect: undefined }),
    ], "2026-08-23");

    expect(growth).toMatchObject({
      questCount: 1,
      totalMinutes: 1,
      quizAccuracyPercent: 0,
      keyFinderAccuracyPercent: null,
      domainCounts: {},
    });
  });
});
