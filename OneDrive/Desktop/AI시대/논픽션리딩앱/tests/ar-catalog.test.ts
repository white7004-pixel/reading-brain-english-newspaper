import {
  AR_CATALOG_BAND_IDS,
  AR_CATALOG_BANDS,
  catalogBandForAr,
} from "@/lib/ar-catalog";

it("covers every AR level from 1.0 through 12.0", () => {
  expect(AR_CATALOG_BAND_IDS).toHaveLength(12);
  expect(AR_CATALOG_BAND_IDS[0]).toBe("ar1");
  expect(AR_CATALOG_BAND_IDS[11]).toBe("ar12");
  expect(AR_CATALOG_BANDS.ar1).toEqual({ id: "ar1", minAr: 1, maxArInclusive: 1.9, label: "AR 1.0" });
  expect(AR_CATALOG_BANDS.ar12).toEqual({ id: "ar12", minAr: 12, maxArInclusive: 12.9, label: "AR 12.0" });
});

it("maps exact AR values to catalog bands without leaking outside the range", () => {
  expect(catalogBandForAr(0.1)).toBeNull();
  expect(catalogBandForAr(4.7)).toBe("ar4");
  expect(catalogBandForAr(12.9)).toBe("ar12");
  expect(catalogBandForAr(0)).toBeNull();
  expect(catalogBandForAr(13)).toBeNull();
});
