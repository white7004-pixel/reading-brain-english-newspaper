import type { InterestBand } from "./types";

export type ArBandId = "ar1" | "ar2" | "ar3";

export type ArBandTarget = {
  id: ArBandId;
  minAr: number;
  maxArExclusive: number;
  minWords: number;
  maxWords: number;
  maxSentenceWords: number;
  vocabularyCount: number;
  quizCount: number;
  interestBand: InterestBand;
  minAge: number;
  maxAge: number;
};

export const AR_BANDS: Record<ArBandId, ArBandTarget> = {
  ar1: {
    id: "ar1",
    minAr: 1,
    maxArExclusive: 2,
    minWords: 90,
    maxWords: 140,
    maxSentenceWords: 10,
    vocabularyCount: 4,
    quizCount: 3,
    interestBand: "lower-elementary",
    minAge: 7,
    maxAge: 9,
  },
  ar2: {
    id: "ar2",
    minAr: 2,
    maxArExclusive: 3,
    minWords: 130,
    maxWords: 190,
    maxSentenceWords: 13,
    vocabularyCount: 4,
    quizCount: 3,
    interestBand: "lower-elementary",
    minAge: 8,
    maxAge: 10,
  },
  ar3: {
    id: "ar3",
    minAr: 3,
    maxArExclusive: 4,
    minWords: 180,
    maxWords: 250,
    maxSentenceWords: 16,
    vocabularyCount: 5,
    quizCount: 4,
    interestBand: "upper-elementary",
    minAge: 10,
    maxAge: 12,
  },
};

export const AR_BAND_IDS: ArBandId[] = ["ar1", "ar2", "ar3"];

export function bandForAr(value: number): ArBandId | null {
  const match = AR_BAND_IDS.find((id) => value >= AR_BANDS[id].minAr && value < AR_BANDS[id].maxArExclusive);
  return match ?? null;
}

export function countWords(pages: string[]): number {
  return pages.join(" ").split(/\s+/).filter(Boolean).length;
}

export function longestSentenceWords(pages: string[]): number {
  return pages
    .flatMap((page) => page.split(/(?<=[.!?])\s+/))
    .map((sentence) => sentence.split(/\s+/).filter(Boolean).length)
    .reduce((longest, length) => Math.max(longest, length), 0);
}
