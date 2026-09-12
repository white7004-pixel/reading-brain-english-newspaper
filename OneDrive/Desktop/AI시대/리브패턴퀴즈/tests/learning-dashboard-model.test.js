const assert = require("node:assert/strict");
const {
  calculateLearningSnapshot,
  buildDailyHome,
} = require("../learning-dashboard-model.js");

function run() {
  const snapshot = calculateLearningSnapshot({
    totalExpressions: 1189,
    masteredCount: 119,
    reviewCount: 7,
    score: 3400,
    streak: 6,
    category: "01. 인사와 소개 패턴",
    categorySize: 12,
  });

  assert.equal(snapshot.progressPercent, 10);
  assert.equal(snapshot.categoryLabel, "01. 인사와 소개 패턴");
  assert.equal(snapshot.categorySize, 12);
  assert.equal(snapshot.scoreText, "3,400");
  assert.equal(snapshot.streakText, "6");
  assert.equal(snapshot.focusMessage, "카드 3개로 오늘 학습을 시작해요.");

  const emptySnapshot = calculateLearningSnapshot({
    totalExpressions: 0,
    masteredCount: 4,
    reviewCount: 0,
  });

  assert.equal(emptySnapshot.progressPercent, 0);
  assert.equal(emptySnapshot.focusMessage, "카드 3개로 오늘 학습을 시작해요.");

  const freshHome = buildDailyHome({
    activeCourse: null,
    todayMinutes: 0,
    stars: 12,
    correct: 0,
    attempted: 0,
  });
  assert.deepEqual(freshHome, {
    ctaLabel: "오늘의 10분 학습",
    ctaMode: "start",
    sectionLabel: "패턴영어",
    stepLabel: "새 표현 배우기",
    percent: 0,
    metrics: { todayMinutes: 0, stars: 12, accuracy: 0 },
  });

  const resumedHome = buildDailyHome({
    activeCourse: {
      section: "bookquiz",
      stage: "pattern-quiz",
      stageIndex: 3,
      completed: false,
    },
    todayMinutes: 6,
    stars: 32,
    correct: 4,
    attempted: 5,
  });
  assert.deepEqual(resumedHome, {
    ctaLabel: "이어서 학습하기",
    ctaMode: "resume",
    sectionLabel: "북퀴즈 질문학습",
    stepLabel: "질문 퀴즈",
    percent: 67,
    metrics: { todayMinutes: 6, stars: 32, accuracy: 80 },
  });

  const finishedHome = buildDailyHome({
    activeCourse: { section: "verb", stage: "reward", stageIndex: 5, completed: true },
    todayMinutes: 10,
  });
  assert.equal(finishedHome.ctaMode, "start");
  assert.equal(finishedHome.ctaLabel, "오늘의 10분 학습");

}

run();
console.log("learning-dashboard-model tests passed");
