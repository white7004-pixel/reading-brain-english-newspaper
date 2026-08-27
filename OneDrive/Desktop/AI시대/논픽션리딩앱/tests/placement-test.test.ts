import { describe, expect, test } from "vitest";
import { AR_ENTRY_MAX, AR_ENTRY_MIN, PLACEMENT_QUESTIONS, estimateDifficulty, isValidArEntry } from "@/lib/placement-test";

describe("estimateDifficulty", () => {
  test("모든 문항을 맞히면 가장 높은 문항 레벨을 반환한다", () => {
    const answers = PLACEMENT_QUESTIONS.map((question) => question.correct);
    expect(estimateDifficulty(answers)).toBe(PLACEMENT_QUESTIONS[PLACEMENT_QUESTIONS.length - 1].level);
  });

  test("맞힌 문항이 없으면 0.5를 반환한다", () => {
    const answers = PLACEMENT_QUESTIONS.map((question) => (question.correct + 1) % question.options.length);
    expect(estimateDifficulty(answers)).toBe(0.5);
  });

  test("맞힌 문항 중 가장 높은 레벨을 반환한다", () => {
    const answers = PLACEMENT_QUESTIONS.map((question, index) => index <= 2 ? question.correct : (question.correct + 1) % question.options.length);
    expect(estimateDifficulty(answers)).toBe(PLACEMENT_QUESTIONS[2].level);
  });
});

describe("isValidArEntry", () => {
  test("유효 범위 안의 값만 허용한다", () => {
    expect(isValidArEntry(AR_ENTRY_MIN)).toBe(true);
    expect(isValidArEntry(AR_ENTRY_MAX)).toBe(true);
    expect(isValidArEntry(2.4)).toBe(true);
  });

  test("범위를 벗어나거나 숫자가 아니면 거부한다", () => {
    expect(isValidArEntry(0)).toBe(false);
    expect(isValidArEntry(13)).toBe(false);
    expect(isValidArEntry(Number.NaN)).toBe(false);
  });
});
