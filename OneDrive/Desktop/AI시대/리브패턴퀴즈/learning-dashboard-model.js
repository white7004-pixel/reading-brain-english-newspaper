(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ReadingBrainLearningModel = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function clampNumber(value, min, max) {
    const number = Number.isFinite(Number(value)) ? Number(value) : 0;
    return Math.min(max, Math.max(min, number));
  }

  function formatNumber(value) {
    return Math.round(clampNumber(value, 0, Number.MAX_SAFE_INTEGER)).toLocaleString("ko-KR");
  }

  function calculateLearningSnapshot(input = {}) {
    const totalExpressions = clampNumber(input.totalExpressions, 0, Number.MAX_SAFE_INTEGER);
    const masteredCount = clampNumber(input.masteredCount, 0, totalExpressions || Number.MAX_SAFE_INTEGER);
    const reviewCount = clampNumber(input.reviewCount, 0, Number.MAX_SAFE_INTEGER);
    const score = clampNumber(input.score, 0, Number.MAX_SAFE_INTEGER);
    const streak = clampNumber(input.streak, 0, Number.MAX_SAFE_INTEGER);
    const categorySize = clampNumber(input.categorySize, 0, Number.MAX_SAFE_INTEGER);
    const progressPercent = totalExpressions ? Math.round((masteredCount / totalExpressions) * 100) : 0;

    return {
      totalExpressions,
      masteredCount,
      reviewCount,
      score,
      streak,
      categoryLabel: input.category || "선택한 패턴",
      categorySize,
      progressPercent,
      scoreText: formatNumber(score),
      streakText: formatNumber(streak),
      focusMessage: reviewCount
        ? `복습 ${reviewCount}개를 먼저 정리하면 다음 퀴즈가 쉬워져요.`
        : "카드 5개로 오늘 학습을 시작해요.",
    };
  }

  function getRoutineSteps(input = {}) {
    const reviewCount = clampNumber(input.reviewCount, 0, Number.MAX_SAFE_INTEGER);
    return [
      {
        mode: "study",
        title: "카드 5개",
        detail: "새 표현을 보고 발음을 들어요.",
        badge: "1단계",
      },
      {
        mode: "quiz",
        title: "퀴즈 5문제",
        detail: "방금 본 표현을 바로 확인해요.",
        badge: "2단계",
      },
      {
        mode: "review",
        title: "오답 복습",
        detail: reviewCount ? "틀린 표현을 다시 잡아요." : "오답이 생기면 열려요.",
        badge: reviewCount ? `${reviewCount}개` : "완료",
        primary: reviewCount > 0,
        disabled: reviewCount === 0,
      },
      {
        mode: "match",
        title: "매칭 1판",
        detail: "영어와 뜻을 빠르게 연결해요.",
        badge: "게임",
      },
      {
        mode: "blast",
        title: "블래스트",
        detail: "마지막으로 속도를 올려요.",
        badge: "도전",
      },
    ];
  }

  return {
    calculateLearningSnapshot,
    getRoutineSteps,
  };
});
