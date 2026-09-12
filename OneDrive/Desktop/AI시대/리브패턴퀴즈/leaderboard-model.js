(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ReadingBrainLeaderboardModel = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function safeCount(value) {
    return Math.max(0, Math.round(Number(value) || 0));
  }

  function buildLeaderboardView(leaders, currentStudentName) {
    const current = String(currentStudentName || "").trim().toLowerCase();
    const ranked = (Array.isArray(leaders) ? leaders : []).slice(0, 10).map((student, index) => {
      const displayName = String(student.displayName || student.name || "학생").trim();
      const accountName = String(student.name || "").trim();
      const points = safeCount(student.points);
      const masteredCount = safeCount(student.masteredCount);
      const reviewCount = safeCount(student.reviewCount);
      return {
        rank: index + 1,
        displayName,
        pointsText: `${points.toLocaleString("ko-KR")} P`,
        progressText: `마스터 ${masteredCount}개 · 복습 ${reviewCount}개`,
        isCurrent: Boolean(current) && [displayName, accountName].some((name) => name.toLowerCase() === current),
      };
    });

    return {
      podium: ranked.slice(0, 3),
      ranking: ranked.slice(3),
    };
  }

  return { buildLeaderboardView };
});
