import { calculateQuestReward } from "@/lib/quest-rewards";

describe("calculateQuestReward", () => {
  it("awards the maximum reward when a perfect quiz includes a correct key-finder choice", () => {
    expect(calculateQuestReward({ correct: 4, total: 4, keyFinderCorrect: true })).toEqual({
      xp: 40,
      accuracyPercent: 100,
      masteryLabelKo: "핵심을 정확히 찾았어요",
    });
  });

  it("uses the four fixed reward tiers without dividing by zero", () => {
    expect(calculateQuestReward({ correct: 0, total: 0, keyFinderCorrect: false })).toEqual({
      xp: 25,
      accuracyPercent: 0,
      masteryLabelKo: "다음 퀘스트에서 다시 도전해요",
    });
    expect(calculateQuestReward({ correct: 2, total: 4, keyFinderCorrect: true }).xp).toBe(30);
    expect(calculateQuestReward({ correct: 4, total: 4, keyFinderCorrect: false }).xp).toBe(35);
  });
});
