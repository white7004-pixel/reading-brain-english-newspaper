import { describe, expect, it } from "vitest";
import { buildOralReadingResult, resolveOralReadingLimit } from "@/lib/oral-reading";

describe("oral reading rules", () => {
  it("uses article limits before grade defaults", () => {
    expect(resolveOralReadingLimit({ gradeLevel: "elementary-1", oralReadingLimitSeconds: 40 })).toBe(40);
    expect(resolveOralReadingLimit({ gradeLevel: "elementary-1" })).toBe(90);
    expect(resolveOralReadingLimit({ gradeLevel: "high-3" })).toBe(45);
  });

  it("reports whether the learner completed within the limit", () => {
    expect(buildOralReadingResult(39.2, 40)).toEqual({ durationSeconds: 40, limitSeconds: 40, completedWithinLimit: true });
    expect(buildOralReadingResult(40.2, 40).completedWithinLimit).toBe(false);
  });
});
