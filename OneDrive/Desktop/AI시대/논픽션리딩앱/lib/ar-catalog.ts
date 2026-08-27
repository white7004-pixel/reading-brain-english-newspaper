export const AR_CATALOG_BAND_IDS = [
  "ar0", "ar1", "ar2", "ar3", "ar4", "ar5", "ar6",
  "ar7", "ar8", "ar9", "ar10", "ar11", "ar12",
] as const;

export type ArCatalogBandId = (typeof AR_CATALOG_BAND_IDS)[number];

export type ArCatalogBand = {
  id: ArCatalogBandId;
  minAr: number;
  maxArInclusive: number;
  label: string;
};

export const AR_CATALOG_BANDS = Object.fromEntries(
  AR_CATALOG_BAND_IDS.map((id, index) => [
    id,
    {
      id,
      minAr: index === 0 ? 0.1 : index,
      maxArInclusive: index + 0.9,
      label: `AR ${index}.x`,
    },
  ]),
) as Record<ArCatalogBandId, ArCatalogBand>;

export function catalogBandForAr(value: number): ArCatalogBandId | null {
  if (!Number.isFinite(value)) return null;
  const match = AR_CATALOG_BAND_IDS.find((id) => {
    const band = AR_CATALOG_BANDS[id];
    return value >= band.minAr && value <= band.maxArInclusive;
  });
  return match ?? null;
}
