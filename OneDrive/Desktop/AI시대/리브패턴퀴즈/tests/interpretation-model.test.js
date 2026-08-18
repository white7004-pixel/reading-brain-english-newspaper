const assert = require("node:assert/strict");
const {
  normalizeAnswer,
  scoreAttempt,
  summarizeRun,
  isSectionUnlocked,
} = require("../interpretation-model.js");

function testNormalizeAnswer() {
  assert.deepEqual(normalizeAnswer("He is our teacher."), ["he", "is", "our", "teacher"]);

  // 관사는 채점에서 뺀다 — 아이들이 가장 자주 흘리는 부분이다.
  assert.deepEqual(normalizeAnswer("I have a dog."), ["i", "have", "dog"]);
  assert.deepEqual(normalizeAnswer("She is an artist"), ["she", "is", "artist"]);
  assert.deepEqual(normalizeAnswer("Close the door!"), ["close", "door"]);

  // 축약형은 펼쳐서 비교한다.
  assert.deepEqual(normalizeAnswer("I'm Jack"), ["i", "am", "jack"]);
  assert.deepEqual(normalizeAnswer("Don't go"), ["do", "not", "go"]);
  assert.deepEqual(normalizeAnswer("What's your name?"), ["what", "is", "your", "name"]);
  assert.deepEqual(normalizeAnswer("They're here"), ["they", "are", "here"]);
  assert.deepEqual(normalizeAnswer("I can't swim"), ["i", "can", "not", "swim"]);

  // 대소문자·공백·구두점 정리
  assert.deepEqual(normalizeAnswer("  NICE   to   meet  you !! "), ["nice", "to", "meet", "you"]);

  assert.deepEqual(normalizeAnswer(""), []);
  assert.deepEqual(normalizeAnswer(null), []);
  assert.deepEqual(normalizeAnswer(undefined), []);
}

function testScoreAttempt() {
  // 완전 일치
  const perfect = scoreAttempt("He is our teacher.", "He is our teacher.");
  assert.equal(perfect.ratio, 1);
  assert.equal(perfect.verdict, "pass");

  // 축약형과 관사 차이는 통과여야 한다.
  assert.equal(scoreAttempt("I'm a student", "I am a student").verdict, "pass");
  assert.equal(scoreAttempt("i have dog", "I have a dog.").verdict, "pass");

  // 순서는 보지 않는다 — 인식기가 어순을 흔드는 경우가 잦다.
  assert.equal(scoreAttempt("teacher our is he", "He is our teacher").verdict, "pass");

  // 0.8 경계: 5단어 중 4개 = 0.8 -> 통과
  const boundary = scoreAttempt("he is our nice", "He is our nice teacher");
  assert.equal(boundary.ratio, 0.8);
  assert.equal(boundary.verdict, "pass");

  // 0.5 이상 0.8 미만 -> 재도전
  const retry = scoreAttempt("he is our", "He is our nice teacher");
  assert.equal(retry.ratio, 0.6);
  assert.equal(retry.verdict, "retry");

  // 0.5 미만 -> 실패
  const fail = scoreAttempt("he", "He is our nice teacher");
  assert.equal(fail.ratio, 0.2);
  assert.equal(fail.verdict, "fail");

  // 아무 말도 못 들었을 때
  const silent = scoreAttempt("", "He is our teacher");
  assert.equal(silent.ratio, 0);
  assert.equal(silent.verdict, "fail");

  // 정답이 비어 있으면 채점하지 않는다.
  assert.equal(scoreAttempt("anything", "").verdict, "fail");

  // 같은 단어를 여러 번 말해도 한 번만 인정한다.
  const repeated = scoreAttempt("he he he he", "He is our nice teacher");
  assert.equal(repeated.ratio, 0.2);
}

function testSummarizeRun() {
  const cleared = summarizeRun(
    [{ verdict: "pass" }, { verdict: "pass" }, { verdict: "pass" }, { verdict: "pass" }, { verdict: "fail" }],
    0.8,
  );
  assert.equal(cleared.total, 5);
  assert.equal(cleared.passed, 4);
  assert.equal(cleared.percent, 80);
  assert.equal(cleared.cleared, true);

  const notCleared = summarizeRun(
    [{ verdict: "pass" }, { verdict: "fail" }, { verdict: "fail" }, { verdict: "pass" }, { verdict: "fail" }],
    0.8,
  );
  assert.equal(notCleared.percent, 40);
  assert.equal(notCleared.cleared, false);

  // 재도전 끝에 통과한 것도 통과로 센다.
  assert.equal(summarizeRun([{ verdict: "pass" }, { verdict: "retry" }], 0.8).passed, 1);

  const empty = summarizeRun([], 0.8);
  assert.equal(empty.total, 0);
  assert.equal(empty.percent, 0);
  assert.equal(empty.cleared, false);

  assert.equal(summarizeRun(null, 0.8).total, 0);
}

function testIsSectionUnlocked() {
  assert.equal(isSectionUnlocked({ total: 7, mastered: 7 }), true);
  assert.equal(isSectionUnlocked({ total: 7, mastered: 6 }), false);
  assert.equal(isSectionUnlocked({ total: 0, mastered: 0 }), false);
  assert.equal(isSectionUnlocked(null), false);
}

function run() {
  testNormalizeAnswer();
  testScoreAttempt();
  testSummarizeRun();
  testIsSectionUnlocked();
  console.log("interpretation-model tests passed");
}

run();
