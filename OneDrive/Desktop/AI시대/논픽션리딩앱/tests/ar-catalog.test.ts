import {
  AR_CATALOG_BAND_IDS,
  AR_CATALOG_BANDS,
  catalogBandForAr,
} from "@/lib/ar-catalog";

it("covers every AR level from 0.1- through 12.0-", () => {
  expect(AR_CATALOG_BAND_IDS).toHaveLength(13);
  expect(AR_CATALOG_BAND_IDS[0]).toBe("ar0");
  expect(AR_CATALOG_BAND_IDS[12]).toBe("ar12");
  expect(AR_CATALOG_BANDS.ar0).toEqual({ id: "ar0", minAr: 0.1, maxArInclusive: 0.9, label: "AR 0.1-" });
  expect(AR_CATALOG_BANDS.ar12).toEqual({ id: "ar12", minAr: 12, maxArInclusive: 12.9, label: "AR 12.0-" });
});

it("maps exact AR values to catalog bands without leaking outside the range", () => {
  expect(catalogBandForAr(0.1)).toBe("ar0");
  expect(catalogBandForAr(4.7)).toBe("ar4");
  expect(catalogBandForAr(12.9)).toBe("ar12");
  expect(catalogBandForAr(0)).toBeNull();
  expect(catalogBandForAr(13)).toBeNull();
});
