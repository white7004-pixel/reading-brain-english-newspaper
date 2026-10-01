(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ReadingBrainAutoPronunciation = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function createToken(input = {}) {
    const base = `${String(input.section || "")}:${String(input.stage || "")}:${String(input.itemId ?? "")}`;
    return input.round
      ? `${base}:round-${Math.min(2, Math.max(1, Number(input.round) || 1))}`
      : base;
  }

  function createPronunciationGuard() {
    let token = "";
    return {
      shouldPlay(nextToken, online) {
        if (!online || !nextToken || token === nextToken) return false;
        token = String(nextToken);
        return true;
      },
      cancel() {
        token = "";
      },
      currentToken() {
        return token;
      },
    };
  }

  // 카드가 저절로 넘어가기까지 기다릴 시간.
  // 원어민 소리가 끝난 뒤 따라 읽을 틈(1.2초)을 주고, 카드는 최소 3.2초 머문다.
  const STUDY_MIN_TOTAL_MS = 3200;
  const STUDY_READ_PAUSE_MS = 1200;

  function studyAdvanceDelay(soundElapsedMs) {
    const elapsed = Number(soundElapsedMs);
    if (!Number.isFinite(elapsed) || elapsed < 0) return STUDY_MIN_TOTAL_MS;
    return Math.max(STUDY_READ_PAUSE_MS, STUDY_MIN_TOTAL_MS - elapsed);
  }

  return { createToken, createPronunciationGuard, studyAdvanceDelay, STUDY_MIN_TOTAL_MS, STUDY_READ_PAUSE_MS };
});
