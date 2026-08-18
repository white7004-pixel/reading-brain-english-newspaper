import { AR_BANDS, bandForAr, countWords, longestSentenceWords } from "@/lib/ar-bands";

it("maps an AR value to its band", () => {
  expect(bandForAr(1.0)).toBe("ar1");
  expect(bandForAr(1.9)).toBe("ar1");
  expect(bandForAr(2.0)).toBe("ar2");
  expect(bandForAr(3.7)).toBe("ar3");
});

it("rejects AR values outside the authored bands", () => {
  expect(bandForAr(0.9)).toBeNull();
  expect(bandForAr(4.0)).toBeNull();
});

it("describes each band with rising difficulty targets", () => {
  const ordered = [AR_BANDS.ar1, AR_BANDS.ar2, AR_BANDS.ar3];
  for (let index = 1; index < ordered.length; index++) {
    expect(ordered[index].minWords).toBeGreaterThan(ordered[index - 1].minWords);
    expect(ordered[index].maxWords).toBeGreaterThan(ordered[index - 1].maxWords);
    expect(ordered[index].maxSentenceWords).toBeGreaterThanOrEqual(ordered[index - 1].maxSentenceWords);
  }
  for (const band of ordered) {
    expect(band.maxWords).toBeGreaterThan(band.minWords);
    expect(band.minAge).toBeGreaterThan(0);
    expect(band.maxAge).toBeGreaterThanOrEqual(band.minAge);
    expect(band.vocabularyCount).toBeGreaterThan(0);
    expect(band.quizCount).toBeGreaterThan(0);
  }
});

it("counts words across the whole passage", () => {
  expect(countWords(["A bird can fly.", "It has two wings."])).toBe(8);
});

it("measures the longest sentence in a passage", () => {
  expect(longestSentenceWords(["Stars are hot. A star can burn for a very long time indeed."])).toBe(10);
});

it("ignores empty sentence fragments when measuring", () => {
  expect(longestSentenceWords(["Rain falls.  ", ""])).toBe(2);
});

it("ends a sentence that closes with a quotation mark", () => {
  expect(longestSentenceWords(['Each one says, "I see you." Learning a greeting is a kind gift.'])).toBe(7);
});
