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

  return { createToken, createPronunciationGuard };
});
