import type { InterestBand } from "./types";

export type DifficultyBandId = "under-2" | "2-4" | "4-6" | "6-and-over";

export const DIFFICULTY_BANDS = [
  { id: "under-2", minInclusive: 0, maxExclusive: 2 },
  { id: "2-4", minInclusive: 2, maxExclusive: 4 },
  { id: "4-6", minInclusive: 4, maxExclusive: 6 },
  { id: "6-and-over", minInclusive: 6, maxExclusive: Number.POSITIVE_INFINITY },
] as const;

export function matchesDifficultyBand(value: number, band: DifficultyBandId): boolean {
  const range = DIFFICULTY_BANDS.find((candidate) => candidate.id === band);
  return Boolean(range && value >= range.minInclusive && value < range.maxExclusive);
}

export function ageBoundsForInterestBand(band: InterestBand): readonly [number, number] {
  switch (band) {
    case "lower-elementary": return [7, 9];
    case "upper-elementary": return [10, 12];
    case "teen": return [13, 17];
    case "adult": return [18, 99];
    case "all-ages": return [7, 99];
  }
}

export function formatAgeRange(minAge: number, maxAge: number): string {
  return `${minAge}-${maxAge}`;
}
