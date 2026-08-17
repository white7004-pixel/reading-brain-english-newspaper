import type { Article } from "./types";
import type { LearnerState, LearningAttempt } from "./learner-store";

const roundTenth = (value: number) => Math.round(value * 10) / 10;

export function nextEstimatedDifficulty(attempts: LearningAttempt[], current: number): number {
  const recent = attempts.slice(-8);
  if (recent.length < 5) return current;
  const score = recent.reduce((sum, attempt) => sum + attempt.correct / attempt.total, 0) / recent.length;
  const hints = recent.reduce((sum, attempt) => sum + attempt.hintsUsed, 0) / recent.length;
  if (score >= 0.85 && hints <= 1) return roundTenth(Math.min(20, current + 0.3));
  if (score < 0.6) return roundTenth(Math.max(0.1, current - 0.3));
  return current;
}

function seededOrder(article: Article, seed: number): number {
  return [...article.id].reduce((sum, letter) => sum + letter.charCodeAt(0), seed) % 997;
}

export function rankArticles(articles: Article[], state: LearnerState, seed = 1): Article[] {
  const target = state.profile.estimatedDifficulty ?? state.profile.enteredAr ?? 0.5;
  const completed = new Set(state.completedArticleIds);
  const sort = (left: Article, right: Article) => {
    const completionGap = Number(completed.has(left.id)) - Number(completed.has(right.id));
    if (completionGap) return completionGap;
    const difficultyGap = Math.abs(left.difficulty.value - target) - Math.abs(right.difficulty.value - target);
    return difficultyGap || seededOrder(left, seed) - seededOrder(right, seed);
  };
  const interest = articles.filter((article) => state.profile.interests.includes(article.domain)).sort(sort);
  const expansion = articles.filter((article) => !state.profile.interests.includes(article.domain)).sort(sort);
  const ranked: Article[] = [];
  let interestIndex = 0;
  let expansionIndex = 0;
  while (interestIndex < interest.length || expansionIndex < expansion.length) {
    for (let slot = 0; slot < 10; slot++) {
      const useInterest = slot < 7;
      const next = useInterest ? interest[interestIndex++] : expansion[expansionIndex++];
      if (next) ranked.push(next);
    }
    if (interestIndex >= interest.length && expansionIndex >= expansion.length) break;
  }
  return ranked;
}
