const assert = require("node:assert/strict");
const {
  calculateLearningSnapshot,
  getRoutineSteps,
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
  assert.equal(snapshot.reviewCount, 7);
  assert.equal(snapshot.categoryLabel, "01. 인사와 소개 패턴");
  assert.equal(snapshot.categorySize, 12);
  assert.equal(snapshot.scoreText, "3,400");
  assert.equal(snapshot.streakText, "6");
  assert.match(snapshot.focusMessage, /복습 7개/);

  const emptySnapshot = calculateLearningSnapshot({
    totalExpressions: 0,
    masteredCount: 4,
    reviewCount: 0,
  });

  assert.equal(emptySnapshot.progressPercent, 0);
  assert.equal(emptySnapshot.focusMessage, "카드 5개로 오늘 학습을 시작해요.");

  const routine = getRoutineSteps({ reviewCount: 7 });
  assert.deepEqual(
    routine.map((step) => step.mode),
    ["study", "quiz", "review", "match", "blast"],
  );
  assert.equal(routine[2].badge, "7개");
  assert.equal(routine[2].primary, true);

  const routineWithoutReview = getRoutineSteps({ reviewCount: 0 });
  assert.equal(routineWithoutReview[2].disabled, true);
  assert.equal(routineWithoutReview[2].badge, "완료");
}

run();
console.log("learning-dashboard-model tests passed");
