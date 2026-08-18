import { ageBoundsForInterestBand, formatAgeRange, matchesDifficultyBand } from "@/lib/content-taxonomy";

describe("canonical content taxonomy", () => {
  it.each([
    [1.8, "under-2", true],
    [2, "under-2", false],
    [2, "2-4", true],
    [3.99, "2-4", true],
    [4, "2-4", false],
    [4, "4-6", true],
    [5.99, "4-6", true],
    [6, "4-6", false],
    [6, "6-and-over", true],
  ] as const)("places %s in %s without overlapping boundaries", (value, band, expected) => {
    expect(matchesDifficultyBand(value, band)).toBe(expected);
  });

  it("derives canonical ages and labels from the interest band map", () => {
    expect(ageBoundsForInterestBand("all-ages")).toEqual([7, 99]);
    expect(ageBoundsForInterestBand("upper-elementary")).toEqual([10, 12]);
    expect(formatAgeRange(10, 12)).toBe("10-12");
  });
});
