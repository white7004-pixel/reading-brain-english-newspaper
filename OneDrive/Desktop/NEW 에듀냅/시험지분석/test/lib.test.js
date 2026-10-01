import test from 'node:test';
import assert from 'node:assert/strict';
import { examStats, studentStats, parseStudents, nosText, to3, esc, weightTier, crossTab, DIFF5, difficultyFlow, donutSlices } from '../public/lib.js';

const items = [
  { no: 1, kind: '객관식', points: 30, area: '어휘', difficulty: '하', source: '교과서' },
  { no: 2, kind: '객관식', points: 30, area: '독해', difficulty: '중상', source: '외부' },
  { no: 3, kind: '서술형', points: 40, area: '어법', difficulty: '상', source: '교과서' },
];

test('examStats 는 문항표로 분포와 비율을 계산한다', () => {
  const s = examStats(items);
  assert.equal(s.count, 3);
  assert.equal(s.total, 100);
  assert.equal(s.essayCount, 1);
  assert.equal(s.essayPointsPct, 40);
  assert.equal(s.hardPct, 67);
  assert.equal(s.overall, '중상'); // 배점 가중 평균 (0*30+3*30+4*40)/100 = 2.5 → 3
  assert.deepEqual(s.byArea.map((r) => [r.label, r.count, r.points, r.pct]), [['어휘', 1, 30, 33], ['어법', 1, 40, 33], ['독해', 1, 30, 33]]);
  assert.deepEqual(s.byDifficulty.map((r) => r.label), ['하', '중상', '상']);
});

test('examStats 는 학원 글이 쓰는 표(유형·배점·출처·고난도 배점)도 낸다', () => {
  const s = examStats(items);
  // 유형별: 객관식 2문항 60점 / 서술형 1문항 40점
  assert.deepEqual(s.byKind.map((r) => [r.label, r.count, r.points, r.pct]), [['객관식', 2, 60, 67], ['서술형', 1, 40, 33]]);
  // 배점별: 큰 배점부터, 번호까지 (학원 글의 "5점 문항 5개가 전부 어법")
  assert.deepEqual(s.byPoints, [{ points: 40, count: 1, nos: ['3'] }, { points: 30, count: 2, nos: ['1', '2'] }]);
  // 출처별: 교과서 2문항 70점 / 외부 1문항 30점
  assert.deepEqual(s.bySource.map((r) => [r.label, r.count, r.points]), [['교과서', 2, 70], ['외부', 1, 30]]);
  // 중상 이상 문항 수·배점·비율 ("중상 이상 55%, 그 배점 61.4점")
  assert.deepEqual(s.hard, { count: 2, points: 70, pct: 67 });
});

test('학원 분석지가 늘 적는 단원·체감 난이도·킬러 문항도 낸다', () => {
  const withUnit = [
    { ...items[0], unit: '5과' }, { ...items[1], unit: '6과' }, { ...items[2], unit: '5과' },
  ];
  const s = examStats(withUnit);
  // 단원은 시험지에 나온 순서대로 (미리 정해진 목록이 없다)
  assert.deepEqual(s.byUnit.map((r) => [r.label, r.count, r.points, r.pct, r.nos]), [
    ['5과', 2, 70, 67, ['1', '3']],
    ['6과', 1, 30, 33, ['2']],
  ]);
  // 체감 난이도는 다섯 칸 중 몇째인지 (보통=3)
  assert.deepEqual([s.overallScore, s.overallLabel], [4, '조금 어려움']);
  // 킬러(상) 문항만 따로 — 중상까지 세는 hard 와 다르다
  assert.deepEqual(s.killer, { count: 1, points: 40, pct: 33 });
  assert.equal(s.hard.count, 2);
  // 교과서에서 나온 비율
  assert.equal(s.textbookPct, 67);
});

test('단원이 없는 문항표에서는 단원 표를 만들지 않는다', () => {
  const s = examStats(items);
  assert.deepEqual(s.byUnit, []);
  assert.equal(s.textbookPct, 67);
});

test('영역별 표에는 그 영역의 문항 번호가 함께 있다', () => {
  const s = examStats(items);
  assert.deepEqual(s.byArea.map((r) => r.nos), [['1'], ['3'], ['2']]); // 어휘1 · 어법3 · 독해2 (영역 차례대로)
  assert.deepEqual(s.byKind.find((r) => r.label === '객관식').nos, ['1', '2']);
});

test('nosText 는 이어진 번호를 물결로 줄인다', () => {
  assert.equal(nosText([3, 1, 2, 7, 9, 10]), '1~3, 7, 9, 10');
  assert.equal(nosText([5]), '5');
  assert.equal(nosText([]), '');
});

test('examStats 는 출처가 없는 옛 문항표에서도 깨지지 않는다', () => {
  const s = examStats(items.map(({ source, ...it }) => it));
  assert.deepEqual(s.bySource, []);
  assert.equal(s.hard.points, 70);
});

test('studentStats 는 점수와 약점 영역을 계산한다', () => {
  const s = studentStats(items, [{ no: 2, chosen: '' }, { no: 3, chosen: '' }]);
  assert.equal(s.score, 30);
  assert.equal(s.total, 100);
  assert.equal(s.wrongCount, 2);
  assert.deepEqual(s.byArea.map((r) => [r.label, r.correct, r.count, r.pct]), [['어휘', 1, 1, 100], ['어법', 0, 1, 0], ['독해', 0, 1, 0]]);
  assert.deepEqual(s.weakAreas, ['어법', '독해']);
  assert.deepEqual(s.byArea.map((r) => r.nos), [[], ['3'], ['2']]); // 영역마다 틀린 번호
});

test('parseStudents 는 한 줄에 한 명씩 읽고 문제를 알려 준다', () => {
  const text = '김OO 4(③), 9, 25, 9\nB 0\n홍길동 1\n이OO\n박OO 99';
  const { students, problems } = parseStudents(text, ['1', '4', '9', '25']);
  assert.deepEqual(students[0], { label: '김OO', wrong: [{ no: '4', chosen: '③' }, { no: '9', chosen: '' }, { no: '25', chosen: '' }] });
  assert.deepEqual(students[1], { label: 'B', wrong: [] });
  assert.equal(problems.length, 3);
  assert.match(problems[0], /홍길동/);
  assert.match(problems[1], /4번째 줄/);
  assert.match(problems[2], /99/);
});

test('parseStudents 는 한글 두 글자 이상이 이어진 표기를 막는다', () => {
  const { problems } = parseStudents('김철수학생 1\n김 철수 1\n김OO 1\n김○○ 1\nB 1\nKM 1', [1]);
  assert.equal(problems.length, 2);
  assert.match(problems[0], /^김철수학생: 전체 이름 대신/);
  assert.match(problems[1], /^김 철수: 전체 이름 대신/);
});

test('to3 와 esc', () => {
  assert.deepEqual(['하', '중하', '중', '중상', '상'].map(to3), ['하', '하', '중', '상', '상']);
  assert.equal(esc('<a href="x">&\'</a>'), '&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;');
});

test('배점 기준 눈금은 그 시험의 평균 배점에 견준다 (문항 수가 달라도 쓸 수 있게)', () => {
  // 에스키 영어 기준(표준 1~3점대 / 응용 4점대 / 고난도 5점+)은 평균 4점 시험에서 그대로 나온다
  assert.deepEqual([3.9, 4, 4.9, 5, 7].map((p) => weightTier(p, 4)), ['표준', '응용', '응용', '고난도', '고난도']);
  // 수학 21문항 100점(평균 4.76)이면 6점이 고난도, 5점은 응용 — 참고자료의 "6점짜리였던 20번"과 맞는다
  assert.deepEqual([4.2, 5, 6].map((p) => weightTier(p, 100 / 21)), ['표준', '응용', '고난도']);
  assert.equal(weightTier(5, 0), '표준'); // 배점이 없는 문항표
});

test('examStats 는 배점 눈금별 분포를 체감 난이도와 따로 낸다', () => {
  // 평균 33.3점 → 30점 둘은 표준, 40점 하나는 고난도(33.3×1.25=41.7 미달이라 응용)
  const s = examStats(items);
  assert.deepEqual(s.byWeight.map((r) => [r.label, r.count, r.nos]), [['표준', 2, ['1', '2']], ['응용', 1, ['3']]]);
  // 체감 난이도와 어긋나는 문항이 변별 문항이다 — 두 눈금을 합치지 않는다
  assert.notDeepEqual(s.byWeight.map((r) => r.label), s.byDifficulty.map((r) => r.label));
});

// ── 문항 번호는 글자다 ──
// 참고앱의 실제 리포트에 `논술형1`·`논술형2-1`·`논술형2-2`·`논술형3` 이 그대로 쓰인다.
// 숫자로만 두면 담을 수 없어서 글자로 바꿨다. 범위로 줄이는 일은 숫자 번호에만 한다.
test('nosText 는 숫자가 아닌 번호를 줄이지 않고 뒤에 그대로 붙인다', () => {
  assert.equal(nosText(['1', '2', '3', '논술형2-1']), '1~3, 논술형2-1');
  assert.equal(nosText(['논술형1', '논술형2-1']), '논술형1, 논술형2-1');
  assert.equal(nosText(['7', '5']), '5, 7');
});

test('examStats 는 글자 번호를 그대로 들고 다닌다', () => {
  const list = [
    { no: '1', kind: '객관식', points: 50, area: '독해', difficulty: '중' },
    { no: '논술형2-1', kind: '서술형', points: 50, area: '어법', difficulty: '상' },
  ];
  const s = examStats(list);
  assert.deepEqual(s.byArea.map((r) => [r.label, r.nos]), [['어법', ['논술형2-1']], ['독해', ['1']]]);
  assert.deepEqual(s.byKind.map((r) => r.nos), [['1'], ['논술형2-1']]);
  assert.deepEqual(s.byPoints[0].nos, ['1', '논술형2-1']);
});

test('parseStudents 는 글자 번호도 읽는다', () => {
  const { students, problems } = parseStudents('김OO 4(③), 논술형2-1\nB 0', ['4', '9', '논술형2-1']);
  assert.deepEqual(students[0].wrong, [{ no: '4', chosen: '③' }, { no: '논술형2-1', chosen: '' }]);
  assert.deepEqual(students[1].wrong, []);
  assert.deepEqual(problems, []);
});

// ── 교차표 ──
// 참고앱 리포트 4쪽이 유형×난이도 교차표를 싣는다. 영역별·난이도별을 따로 보면
// "어느 영역에서 어렵게 냈나"가 안 보인다. 숫자는 이미 다 있으니 묶기만 하면 된다.
test('crossTab 은 영역 × 난이도를 세고 총계 줄·칸을 붙인다', () => {
  const list = [
    { no: '1', area: '어휘', difficulty: '중', points: 3, kind: '객관식' },
    { no: '2', area: '독해', difficulty: '중', points: 3, kind: '객관식' },
    { no: '3', area: '독해', difficulty: '상', points: 4, kind: '객관식' },
  ];
  const t = crossTab(list, 'area', 'difficulty', DIFF5);
  assert.deepEqual(t.cols, ['중', '상']);          // 아무도 없는 난이도 칸은 빼고
  assert.deepEqual(t.rows.map((r) => [r.label, r.cells, r.total]), [
    ['어휘', [1, 0], 1],
    ['독해', [1, 1], 2],
  ]);
  assert.deepEqual([t.totals, t.count], [[2, 1], 3]);
});

test('crossTab 은 칸이 빌 수 있는 과목에서도 총계가 문항 수와 같다', () => {
  const s = crossTab([], 'area', 'difficulty', DIFF5);
  assert.deepEqual([s.cols, s.rows, s.count], [[], [], 0]);
});

// ── 발표 슬라이드용 숫자 ──
test('difficultyFlow 는 문항 차례대로 난이도를 좌표로 주고, 어려워지는 자리를 찾는다', () => {
  const list = ['하', '중', '하', '중', '중상', '상', '중상'].map((d, i) => ({ no: String(i + 1), difficulty: d }));
  const f = difficultyFlow(list);
  assert.equal(f.points.length, 7);
  assert.deepEqual(f.points[0], { x: 0, y: 0, no: '1', difficulty: '하', hard: false });
  assert.deepEqual(f.points[4], { x: 4, y: 3, no: '5', difficulty: '중상', hard: true });
  // 중상 이상이 연달아 둘 나오는 첫 자리 (5번)
  assert.equal(f.hardFrom, 4);
  assert.deepEqual([f.max, f.count], [4, 7]);
});

test('difficultyFlow 는 어려워지는 구간이 없으면 hardFrom 을 비워 둔다', () => {
  const 쉬움 = ['중', '하', '중', '중'].map((d, i) => ({ no: String(i + 1), difficulty: d }));
  assert.equal(difficultyFlow(쉬움).hardFrom, null);
  // 중상이 하나만 있으면 아직 '구간'이 아니다
  const 하나 = ['중', '상', '중', '하'].map((d, i) => ({ no: String(i + 1), difficulty: d }));
  assert.equal(difficultyFlow(하나).hardFrom, null);
  assert.deepEqual(difficultyFlow([]), { points: [], hardFrom: null, max: 4, count: 0 });
});

test('donutSlices 는 한 바퀴를 비율대로 나눠 마지막이 꼭 360 에서 끝난다', () => {
  const s = donutSlices([{ label: '하', count: 1 }, { label: '중', count: 2 }, { label: '상', count: 1 }]);
  assert.deepEqual(s.map((r) => [r.label, r.from, r.to]), [['하', 0, 90], ['중', 90, 270], ['상', 270, 360]]);
  assert.deepEqual(s.map((r) => r.pct), [25, 50, 25]);
  assert.deepEqual(donutSlices([]), []);
});
