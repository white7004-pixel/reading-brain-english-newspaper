/**
 * 통역 테스트 채점 모델.
 * 음성 인식 결과와 정답 문장을 비교한다. DOM 의존 없음.
 *
 * 아이들 발음은 인식기가 자주 흘리거나 어순을 흔든다. 그래서
 * 관사와 축약형을 정규화하고, 순서를 보지 않고, 기준을 느슨하게 잡는다.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ReadingBrainInterpretation = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const PASS_RATIO = 0.8;
  const RETRY_RATIO = 0.5;
  const SECTION_PASS_RATE = 0.8;

  const ARTICLES = new Set(["a", "an", "the"]);

  // 축약형은 펼쳐서 비교한다. 긴 것부터 적용해야 i'll 이 i + ll 로 깨지지 않는다.
  const CONTRACTIONS = [
    ["can't", "can not"],
    ["won't", "will not"],
    ["shan't", "shall not"],
    ["n't", " not"],
    ["'re", " are"],
    ["'ve", " have"],
    ["'ll", " will"],
    ["'d", " would"],
    ["'m", " am"],
    ["let's", "let us"],
    ["'s", " is"],
  ];

  function expandContractions(text) {
    return CONTRACTIONS.reduce(
      (acc, [from, to]) => acc.split(from).join(to),
      text,
    );
  }

  function normalizeAnswer(text) {
    if (typeof text !== "string") return [];
    const lowered = text.toLowerCase().replace(/[‘’ʼ]/g, "'");
    const expanded = expandContractions(lowered);
    return expanded
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word && !ARTICLES.has(word));
  }

  function verdictFor(ratio) {
    if (ratio >= PASS_RATIO) return "pass";
    if (ratio >= RETRY_RATIO) return "retry";
    return "fail";
  }

  function scoreAttempt(spoken, expected) {
    const target = normalizeAnswer(expected);
    if (!target.length) return { ratio: 0, verdict: "fail", matched: 0, expected: 0 };

    const heard = new Set(normalizeAnswer(spoken));
    const unique = [...new Set(target)];
    const matched = unique.filter((word) => heard.has(word)).length;
    const ratio = Math.round((matched / unique.length) * 100) / 100;

    return { ratio, verdict: verdictFor(ratio), matched, expected: unique.length };
  }

  function summarizeRun(results, passRate = SECTION_PASS_RATE) {
    const list = Array.isArray(results) ? results : [];
    const total = list.length;
    const passed = list.filter((item) => item && item.verdict === "pass").length;
    const percent = total ? Math.round((passed / total) * 100) : 0;
    const threshold = Math.round((Number(passRate) || SECTION_PASS_RATE) * 100);

    return { total, passed, percent, threshold, cleared: total > 0 && percent >= threshold };
  }

  function isSectionUnlocked(section) {
    if (!section || !section.total) return false;
    return section.mastered >= section.total;
  }

  return {
    PASS_RATIO,
    RETRY_RATIO,
    SECTION_PASS_RATE,
    normalizeAnswer,
    scoreAttempt,
    summarizeRun,
    isSectionUnlocked,
  };
});
