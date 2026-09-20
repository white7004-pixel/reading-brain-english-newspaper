/* 퀴즈 보기 고르기 — 정답과 헷갈리는 후보를 걸러 낸다.
   뜻이 같은 표현(만나서 반가워 = Nice/Glad/Pleased)이나
   영어가 같은 표현(Yes, I do = 응 좋아해 / 응 있어)이 보기에 함께 서면,
   학생은 맞는 답을 고르고도 틀렸다는 말을 듣는다. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ReadingBrainQuizOptions = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function textKey(value) {
    return String(value || "")
      .replace(/[.!?。！？]+$/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function isConfusable(a, b) {
    if (!a || !b) return false;
    if (a.id != null && a.id === b.id) return true;
    const koA = textKey(a.korean);
    const koB = textKey(b.korean);
    if (koA && koA === koB) return true;
    const enA = textKey(a.english);
    const enB = textKey(b.english);
    return Boolean(enA) && enA === enB;
  }

  // candidates 는 부르는 쪽이 이미 섞어서 준다. 여기서는 순서를 지킨다.
  function pickDistractors(answer, candidates, count = 3) {
    if (!answer || !Array.isArray(candidates)) return [];
    const picked = [];
    for (const item of candidates) {
      if (picked.length >= count) break;
      if (!item || (!textKey(item.english) && !textKey(item.korean))) continue;
      if (isConfusable(answer, item)) continue;
      if (picked.some((chosen) => isConfusable(chosen, item))) continue;
      picked.push(item);
    }
    return picked;
  }

  return { textKey, isConfusable, pickDistractors };
});
