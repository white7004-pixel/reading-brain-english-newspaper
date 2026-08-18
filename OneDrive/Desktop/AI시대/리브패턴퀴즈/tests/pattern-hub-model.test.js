const assert = require("node:assert/strict");
const {
  parseSectionName,
  buildSections,
  groupSections,
  filterSections,
  findNextSection,
  summarizeDaily,
  applyPathState,
  findCurrentSection,
  buildUnits,
} = require("../pattern-hub-model.js");

const SAMPLE = [
  { id: 1, category: "01. 인사와 소개 패턴" },
  { id: 2, category: "01. 인사와 소개 패턴" },
  { id: 3, category: "02. I am / I'm 패턴" },
  { id: 4, category: "02. I am / I'm 패턴" },
  { id: 5, category: "02. I am / I'm 패턴" },
  { id: 6, category: "02. I am / I'm 패턴" },
  { id: 7, category: "31. Training 800 - go 가다" },
  { id: 8, category: "31. Training 800 - go 가다" },
];

function testParseSectionName() {
  const basic = parseSectionName("05. He / She / It is 패턴");
  assert.equal(basic.number, 5);
  assert.equal(basic.title, "He / She / It is 패턴");
  assert.equal(basic.group, "basic");

  const training = parseSectionName("31. Training 800 - go 가다");
  assert.equal(training.number, 31);
  assert.equal(training.title, "go 가다");
  assert.equal(training.group, "training");

  const odd = parseSectionName("보너스 표현");
  assert.equal(odd.number, null);
  assert.equal(odd.title, "보너스 표현");
  assert.equal(odd.group, "basic");

  assert.equal(parseSectionName("").title, "");
  assert.equal(parseSectionName(undefined).group, "basic");
}

function testBuildSections() {
  const sections = buildSections(SAMPLE, [1, 2, 3]);
  assert.equal(sections.length, 3);

  const first = sections[0];
  assert.equal(first.key, "01. 인사와 소개 패턴");
  assert.equal(first.total, 2);
  assert.equal(first.mastered, 2);
  assert.equal(first.percent, 100);
  assert.equal(first.status, "done");

  const second = sections[1];
  assert.equal(second.total, 4);
  assert.equal(second.mastered, 1);
  assert.equal(second.percent, 25);
  assert.equal(second.status, "learning");

  const third = sections[2];
  assert.equal(third.group, "training");
  assert.equal(third.mastered, 0);
  assert.equal(third.percent, 0);
  assert.equal(third.status, "new");

  // 정렬은 번호 오름차순, 마스터 집합은 Set 도 허용한다.
  const viaSet = buildSections(SAMPLE, new Set([7, 8]));
  assert.equal(viaSet[2].percent, 100);

  assert.deepEqual(buildSections([], []), []);
}

function testGroupSections() {
  const groups = groupSections(buildSections(SAMPLE, [1, 2, 3]));
  assert.deepEqual(groups.map((group) => group.id), ["basic", "training"]);

  const basic = groups[0];
  assert.equal(basic.label, "기초 패턴");
  assert.equal(basic.sections.length, 2);
  assert.equal(basic.total, 6);
  assert.equal(basic.mastered, 3);
  assert.equal(basic.percent, 50);

  const training = groups[1];
  assert.equal(training.label, "Training 800");
  assert.equal(training.percent, 0);

  // 비어 있는 그룹은 결과에서 빠진다.
  const onlyBasic = groupSections(buildSections(SAMPLE.slice(0, 2), []));
  assert.deepEqual(onlyBasic.map((group) => group.id), ["basic"]);
}

function testFilterSections() {
  const sections = buildSections(SAMPLE, []);

  assert.equal(filterSections(sections, "").length, 3);
  assert.equal(filterSections(sections, "   ").length, 3);
  assert.deepEqual(filterSections(sections, "인사").map((s) => s.number), [1]);
  assert.deepEqual(filterSections(sections, "02").map((s) => s.number), [2]);
  assert.deepEqual(filterSections(sections, "i am").map((s) => s.number), [2]);
  assert.deepEqual(filterSections(sections, "GO").map((s) => s.number), [31]);
  assert.deepEqual(filterSections(sections, "없는패턴"), []);
}

function testFindNextSection() {
  const sections = buildSections(SAMPLE, []);
  assert.equal(findNextSection(sections, "01. 인사와 소개 패턴").number, 2);
  assert.equal(findNextSection(sections, "31. Training 800 - go 가다"), null);
  assert.equal(findNextSection(sections, "존재하지 않는 섹션"), null);
  assert.equal(findNextSection([], "01. 인사와 소개 패턴"), null);
}

function testSummarizeDaily() {
  const partial = summarizeDaily({ cards: 5, correct: 2 }, { cards: 20, correct: 10 });
  assert.equal(partial.cards, 5);
  assert.equal(partial.correct, 2);
  assert.equal(partial.percent, 23);
  assert.equal(partial.done, false);

  const over = summarizeDaily({ cards: 40, correct: 30 }, { cards: 20, correct: 10 });
  assert.equal(over.percent, 100);
  assert.equal(over.done, true);

  const empty = summarizeDaily(null, null);
  assert.equal(empty.cards, 0);
  assert.equal(empty.percent, 0);
  assert.equal(empty.done, false);
}

// 경로용 가짜 섹션 — buildSections 를 거치지 않고 직접 만든다.
function pathSections(specs) {
  return specs.map((spec, index) => ({
    key: `k${index + 1}`,
    number: index + 1,
    title: `섹션 ${index + 1}`,
    group: "basic",
    total: 10,
    mastered: spec.mastered || 0,
    percent: (spec.mastered || 0) * 10,
    status: "new",
  }));
}

function testApplyPathState() {
  const sections = pathSections([{}, {}, {}, {}]);

  // 아무것도 클리어하지 않았으면 첫 섹션만 열린다.
  const fresh = applyPathState(sections, []);
  assert.deepEqual(fresh.map((s) => s.unlocked), [true, false, false, false]);
  assert.deepEqual(fresh.map((s) => s.pathStatus), ["available", "locked", "locked", "locked"]);

  // 클리어하면 그 다음 하나가 열린다.
  const afterFirst = applyPathState(sections, ["k1"]);
  assert.deepEqual(afterFirst.map((s) => s.unlocked), [true, true, false, false]);
  assert.deepEqual(afterFirst.map((s) => s.pathStatus), ["cleared", "available", "locked", "locked"]);

  // 이미 진도가 있는 섹션은 순서와 무관하게 열어 둔다 — 기존 학생을 막지 않기 위해서다.
  const withProgress = applyPathState(pathSections([{}, {}, { mastered: 4 }, {}]), []);
  assert.deepEqual(withProgress.map((s) => s.unlocked), [true, false, true, false]);
  assert.equal(withProgress[2].pathStatus, "learning");

  // 클리어 표시는 진도와 무관하게 유지된다.
  const clearedLater = applyPathState(pathSections([{}, {}, {}, {}]), ["k3"]);
  assert.equal(clearedLater[2].pathStatus, "cleared");
  assert.equal(clearedLater[3].unlocked, true);

  // Set 도 받는다.
  assert.equal(applyPathState(sections, new Set(["k1"]))[1].unlocked, true);

  assert.deepEqual(applyPathState([], []), []);
}

function testFindCurrentSection() {
  const sections = applyPathState(pathSections([{}, {}, {}]), ["k1"]);
  assert.equal(findCurrentSection(sections).key, "k2");

  const allCleared = applyPathState(pathSections([{}, {}]), ["k1", "k2"]);
  assert.equal(findCurrentSection(allCleared), null);

  assert.equal(findCurrentSection([]), null);
}

function testBuildUnits() {
  const sections = applyPathState(pathSections([{}, {}, {}, {}, {}, {}, {}]), ["k1", "k2"]);
  const units = buildUnits(sections, 3);

  assert.equal(units.length, 3);
  assert.deepEqual(units.map((u) => u.sections.length), [3, 3, 1]);
  assert.equal(units[0].label, "UNIT 1");
  assert.equal(units[0].range, "01 – 03");
  assert.equal(units[0].clearedCount, 2);
  assert.equal(units[0].total, 3);
  assert.equal(units[0].unlocked, true);

  // 유닛은 첫 섹션이 열려 있을 때 열린 것으로 본다. 03 을 아직 클리어하지
  // 않았으므로 04 로 시작하는 다음 유닛은 잠겨 있다.
  assert.equal(units[1].unlocked, false);
  assert.equal(units[2].unlocked, false);

  // 유닛 1 의 마지막 섹션을 클리어하면 다음 유닛이 열린다.
  const advanced = buildUnits(
    applyPathState(pathSections([{}, {}, {}, {}, {}, {}, {}]), ["k1", "k2", "k3"]),
    3,
  );
  assert.equal(advanced[1].unlocked, true);
  assert.equal(advanced[1].clearedCount, 0);
  assert.equal(advanced[2].unlocked, false);

  assert.deepEqual(buildUnits([], 3), []);
}

function run() {
  testParseSectionName();
  testBuildSections();
  testGroupSections();
  testFilterSections();
  testFindNextSection();
  testSummarizeDaily();
  testApplyPathState();
  testFindCurrentSection();
  testBuildUnits();
  console.log("pattern-hub-model tests passed");
}

run();
