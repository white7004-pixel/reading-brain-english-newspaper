const NATIVE_AUDIO_ARTICLE_IDS = new Set([
  "stars-shine",
  "silk-road",
  "great-wave",
  "stoic-control",
  "small-habits",
  "tea-cultures",
]);

export function getNativeAudioUrl(articleId: string, pageIndex: number): string | null {
  if (!NATIVE_AUDIO_ARTICLE_IDS.has(articleId) || pageIndex < 0 || pageIndex > 2) return null;
  return `/audio/native/${articleId}-page-${pageIndex + 1}.mp3`;
}
