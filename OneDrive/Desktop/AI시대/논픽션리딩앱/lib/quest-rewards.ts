export type QuestReward = {
  xp: 25 | 30 | 35 | 40;
  accuracyPercent: number;
  masteryLabelKo: string;
};

export type QuestRewardInput = {
  correct: number;
  total: number;
  keyFinderCorrect?: boolean;
};

export function calculateQuestReward({ correct, total, keyFinderCorrect = false }: QuestRewardInput): QuestReward {
  const hasPerfectQuiz = total > 0 && correct === total;
  const accuracyPercent = total > 0 ? Math.round((correct / total) * 100) : 0;

  if (hasPerfectQuiz && keyFinderCorrect) {
    return { xp: 40, accuracyPercent, masteryLabelKo: "핵심을 정확히 찾았어요" };
  }
  if (hasPerfectQuiz) {
    return { xp: 35, accuracyPercent, masteryLabelKo: "문제를 모두 맞혔어요" };
  }
  if (keyFinderCorrect) {
    return { xp: 30, accuracyPercent, masteryLabelKo: "핵심을 잘 찾았어요" };
  }
  return { xp: 25, accuracyPercent, masteryLabelKo: "다음 퀘스트에서 다시 도전해요" };
}
