import { getPublishedArticles } from "@/lib/content";
import { createDefaultLearnerState, type LearningAttempt } from "@/lib/learner-store";
import { nextEstimatedDifficulty, rankArticles } from "@/lib/recommendation";

const attempts = (scores: number[]): LearningAttempt[] => scores.map((score, index) => ({
  id: `a-${index}`, articleId: "stars-shine", completedAt: `2026-08-${String(index + 1).padStart(2, "0")}T10:00:00Z`, localDate: `2026-08-${String(index + 1).padStart(2, "0")}`,
  correct: score, total: 10, hintsUsed: 0, durationSeconds: 180, xpAwarded: 25,
}));

it("limits a successful level adjustment to 0.3", () => {
  expect(nextEstimatedDifficulty(attempts([9, 9, 10, 9, 9]), 2.4)).toBe(2.7);
});

it("does not adjust before five completed attempts", () => {
  expect(nextEstimatedDifficulty(attempts([10, 10, 10, 10]), 2.4)).toBe(2.4);
});

it("ranks interests without hiding expansion topics", () => {
  const state = createDefaultLearnerState();
  state.profile.interests = ["science"];
  const ranked = rankArticles(getPublishedArticles(), state, 7);
  expect(ranked[0].domain).toBe("science");
  expect(ranked.some((article) => article.domain !== "science")).toBe(true);
});
