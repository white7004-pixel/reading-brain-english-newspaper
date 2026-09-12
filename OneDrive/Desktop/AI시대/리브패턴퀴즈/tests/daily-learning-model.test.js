const assert = require("node:assert/strict");
const {
  STAGES,
  gradeBand,
  elementaryVerbs,
  createCourse,
  answerCurrent,
  advanceCourse,
  resumeCourse,
  createLearningProfile,
  parseLearningProfile,
  createAdvanceGuard,
  courseItems,
  advanceAfterAnswer,
  assistanceForGrade,
  rewardForCourse,
  advanceStage,
  prepareReview,
} = require("../daily-learning-model.js");

assert.deepEqual(STAGES.pattern, ["study", "quiz", "interpret", "review", "reward"]);

function run() {
  assert.deepEqual(STAGES.pattern, [
    "study",
    "quiz",
    "interpret",
    "review",
    "reward",
  ]);

  assert.equal(gradeBand(1), "lower");
  assert.equal(gradeBand(2), "lower");
  assert.equal(gradeBand(3), "middle");
  assert.equal(gradeBand(4), "middle");
  assert.equal(gradeBand(5), "upper");
  assert.equal(gradeBand(6), "upper");
  assert.equal(gradeBand(99), "upper");

  const verbs = [
    { id: 1, level: "초등", base: "go" },
    { id: 2, level: "중등", base: "become" },
    { id: 3, level: "초등", base: "play" },
  ];
  assert.deepEqual(elementaryVerbs(verbs).map((item) => item.id), [1, 3]);
  assert.deepEqual(elementaryVerbs(null), []);

  const course = createCourse("pattern", [1, 2], { grade: 3 });
  assert.deepEqual(course, {
    version: 1,
    section: "pattern",
    stage: "study",
    stageIndex: 0,
    itemIds: [1, 2],
    itemIndex: 0,
    answeredToken: "",
    reviewIds: [],
    completed: false,
    grade: 3,
  });
  assert.equal(createCourse("unknown", [1]), null);
  assert.equal(createCourse("pattern", []), null);

  const wrong = answerCurrent(course, {
    token: "pattern:study:1",
    correct: false,
    itemId: 1,
  });
  assert.deepEqual(wrong.reviewIds, [1]);
  assert.equal(wrong.answeredToken, "pattern:study:1");

  const duplicate = answerCurrent(wrong, {
    token: "pattern:study:1",
    correct: true,
    itemId: 1,
  });
  assert.equal(duplicate, wrong);
  assert.deepEqual(duplicate.reviewIds, [1]);

  const sameMissAgain = answerCurrent(
    { ...wrong, answeredToken: "" },
    { token: "pattern:quiz:1", correct: false, itemId: 1 },
  );
  assert.deepEqual(sameMissAgain.reviewIds, [1]);

  const nextItem = advanceCourse(wrong);
  assert.equal(nextItem.stage, "study");
  assert.equal(nextItem.itemIndex, 1);
  assert.equal(nextItem.answeredToken, "");

  const nextStage = advanceCourse({ ...nextItem, itemIndex: 1 });
  assert.equal(nextStage.stage, "quiz");
  assert.equal(nextStage.stageIndex, 1);
  assert.equal(nextStage.itemIndex, 0);

  const rewardCourse = {
    ...course,
    stage: "reward",
    stageIndex: STAGES.pattern.length - 1,
    itemIndex: course.itemIds.length - 1,
  };
  const completed = advanceCourse(rewardCourse);
  assert.equal(completed.completed, true);
  assert.equal(completed.stage, "reward");

  const damaged = {
    version: 1,
    section: "pattern",
    stage: "quiz",
    stageIndex: 99,
    itemIds: [1, 999],
    itemIndex: 8,
    answeredToken: "stale",
    reviewIds: [1, 999],
    completed: false,
    grade: 4,
  };
  const restored = resumeCourse(damaged, { pattern: new Set([1, 2]) });
  assert.deepEqual(restored.itemIds, [1]);
  assert.deepEqual(restored.reviewIds, [1]);
  assert.equal(restored.stage, "quiz");
  assert.equal(restored.stageIndex, 1);
  assert.equal(restored.itemIndex, 0);
  assert.equal(restored.answeredToken, "");
  assert.equal(resumeCourse({ ...damaged, version: 7 }, { pattern: new Set([1]) }), null);
  assert.equal(resumeCourse({ ...damaged, section: "missing" }, { pattern: new Set([1]) }), null);

  const defaultProfile = createLearningProfile();
  assert.deepEqual(defaultProfile, {
    version: 1,
    grade: 3,
    activeCourse: null,
    dailyStats: {},
    stars: 0,
    badges: [],
    streakDays: 0,
    pendingSync: [],
  });

  const savedProfile = JSON.stringify({
    version: 1,
    grade: 4,
    activeCourse: damaged,
    dailyStats: { "2026-08-23": { minutes: 6, correct: 4 } },
    stars: 32,
    badges: ["first-course", "first-course"],
    streakDays: 3,
    pendingSync: [
      { id: "device:test:1", createdAt: "2026-08-23T00:00:00.000Z", type: "progress", payload: { score: 32 } },
      { id: "device:test:1", createdAt: "2026-08-23T00:00:00.000Z", type: "progress", payload: { score: 99 } },
      null,
    ],
  });
  const parsedProfile = parseLearningProfile(savedProfile, { pattern: new Set([1, 2]) });
  assert.equal(parsedProfile.grade, 4);
  assert.deepEqual(parsedProfile.activeCourse.itemIds, [1]);
  assert.equal(parsedProfile.activeCourse.stageIndex, 1);
  assert.deepEqual(parsedProfile.dailyStats, { "2026-08-23": { minutes: 6, correct: 4 } });
  assert.deepEqual(parsedProfile.badges, ["first-course"]);
  assert.equal(parsedProfile.stars, 32);
  assert.equal(parsedProfile.streakDays, 3);
  assert.deepEqual(parsedProfile.pendingSync, [
    { id: "device:test:1", createdAt: "2026-08-23T00:00:00.000Z", type: "progress", payload: { score: 32 } },
  ]);

  assert.deepEqual(parseLearningProfile("{broken", { pattern: new Set([1]) }), defaultProfile);
  assert.deepEqual(
    parseLearningProfile(JSON.stringify({ version: 9, grade: 6 }), { pattern: new Set([1]) }),
    defaultProfile,
  );

  const guard = createAdvanceGuard();
  let advances = 0;
  assert.equal(guard.run("pattern:quiz:1", () => { advances += 1; }), true);
  assert.equal(guard.run("pattern:quiz:1", () => { advances += 1; }), false);
  assert.equal(guard.run("pattern:quiz:2", () => { advances += 1; }), false);
  assert.equal(advances, 1);
  assert.equal(guard.pendingToken(), "pattern:quiz:1");
  guard.cancel();
  assert.equal(guard.pendingToken(), "");
  assert.equal(guard.run("pattern:quiz:2", () => { advances += 1; }), true);
  assert.equal(advances, 2);

  const itemCatalog = [
    { id: 3, value: "three" },
    { id: 1, value: "one" },
    { id: 2, value: "two" },
    { id: 4, value: "four" },
  ];
  assert.deepEqual(courseItems({ itemIds: [1, 2, 3] }, itemCatalog).map((item) => item.id), [1, 2, 3]);
  assert.deepEqual(courseItems(null, itemCatalog), []);

  const acceptedAdvance = advanceAfterAnswer(course, {
    token: "pattern:study:1",
    correct: false,
    itemId: 1,
  });
  assert.equal(acceptedAdvance.accepted, true);
  assert.equal(acceptedAdvance.course.itemIndex, 1);
  assert.deepEqual(acceptedAdvance.course.reviewIds, [1]);
  const rejectedAdvance = advanceAfterAnswer(wrong, {
    token: "pattern:study:1",
    correct: true,
    itemId: 1,
  });
  assert.equal(rejectedAdvance.accepted, false);
  assert.equal(rejectedAdvance.course, wrong);

  assert.deepEqual(assistanceForGrade(1), { band: "lower", hintVisible: true, maxWords: 4 });
  assert.deepEqual(assistanceForGrade(4), { band: "middle", hintVisible: false, maxWords: 8 });
  assert.deepEqual(assistanceForGrade(6), { band: "upper", hintVisible: false, maxWords: 14 });

  const reward = rewardForCourse({ completed: true }, { retrySuccesses: 2, streakDays: 3 });
  assert.deepEqual(reward, { stars: 30, retrySuccesses: 2, badgeId: "streak-3", streakDays: 3 });
  assert.equal(rewardForCourse({ completed: false }, {}).stars, 0);

  const forcedNextStage = advanceStage({ ...course, itemIndex: 1 });
  assert.equal(forcedNextStage.stage, "quiz");
  assert.equal(forcedNextStage.itemIndex, 0);

  const reviewCourse = prepareReview({ ...course, stage: "review", stageIndex: 3, reviewIds: [2, 1, 2] });
  assert.deepEqual(reviewCourse.itemIds, [2, 1]);
  assert.equal(reviewCourse.itemIndex, 0);
  const noReviewCourse = prepareReview({ ...course, stage: "review", stageIndex: 3, reviewIds: [] });
  assert.equal(noReviewCourse.stage, "reward");
}

run();
console.log("daily learning model tests passed");
