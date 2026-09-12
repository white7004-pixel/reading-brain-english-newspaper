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
    const score = clampNumber(input.score, 0, Number.MAX_SAFE_INTEGER);
    const streak = clampNumber(input.streak, 0, Number.MAX_SAFE_INTEGER);
    const categorySize = clampNumber(input.categorySize, 0, Number.MAX_SAFE_INTEGER);
    const progressPercent = totalExpressions ? Math.round((masteredCount / totalExpressions) * 100) : 0;

    return {
      totalExpressions,
      masteredCount,
      score,
      streak,
      categoryLabel: input.category || "선택한 패턴",
      categorySize,
      progressPercent,
      scoreText: formatNumber(score),
      streakText: formatNumber(streak),
      focusMessage: "카드 3개로 오늘 학습을 시작해요.",
    };
  }

  const SECTION_LABELS = {
    pattern: "패턴영어",
    bookquiz: "북퀴즈 질문학습",
    verb: "3단 동사변화 학습",
  };

  const STAGE_LABELS = {
    study: "새 표현 배우기",
    listen: "듣기 연습",
    quiz: "퀴즈",
    speech: "3회 녹음 연습",
    interpret: "통역 테스트",
    review: "오답 복습",
    reward: "학습 완료",
    "word-study": "핵심 단어 학습",
    "word-quiz": "단어 퀴즈",
    "pattern-study": "질문 패턴 학습",
    "pattern-quiz": "질문 퀴즈",
    speak: "3단 변화 말하기",
  };

  const STAGE_TOTALS = { pattern: 7, bookquiz: 6, verb: 6 };

  function buildDailyHome(input = {}) {
    const activeCourse = input.activeCourse?.completed ? null : input.activeCourse;
    const section = activeCourse?.section || "pattern";
    const totalStages = STAGE_TOTALS[section] || 1;
    const stageIndex = activeCourse ? clampNumber(activeCourse.stageIndex, 0, totalStages - 1) : 0;
    const attempted = clampNumber(input.attempted, 0, Number.MAX_SAFE_INTEGER);
    const correct = clampNumber(input.correct, 0, attempted || Number.MAX_SAFE_INTEGER);

    return {
      ctaLabel: activeCourse ? "이어서 학습하기" : "오늘의 10분 학습",
      ctaMode: activeCourse ? "resume" : "start",
      sectionLabel: SECTION_LABELS[section] || SECTION_LABELS.pattern,
      stepLabel: activeCourse ? (STAGE_LABELS[activeCourse.stage] || "학습 이어가기") : "새 표현 배우기",
      percent: activeCourse ? Math.round(((stageIndex + 1) / totalStages) * 100) : 0,
      metrics: {
        todayMinutes: Math.max(0, Math.round(Number(input.todayMinutes) || 0)),
        stars: Math.max(0, Math.round(Number(input.stars) || 0)),
        accuracy: attempted ? Math.round((correct / attempted) * 100) : 0,
      },
    };
  }

  return {
    calculateLearningSnapshot,
    buildDailyHome,
  };
});
