import test from 'node:test';
import assert from 'node:assert/strict';
import { examStats, studentStats, parseStudents, nosText, to3, esc } from '../public/lib.js';

const items = [
  { no: 1, kind: '객관식', points: 30, area: '어휘', difficulty: '하', source: '교과서' },
  { no: 2, kind: '객관식', points: 30, area: '독해', difficulty: '중상', source: '외부' },
  { no: 3, kind: '서술형', points: 40, area: '서술형', difficulty: '상', source: '교과서' },
];

test('examStats 는 문항표로 분포와 비율을 계산한다', () => {
  const s = examStats(items);
  assert.equal(s.count, 3);
  assert.equal(s.total, 100);
  assert.equal(s.essayCount, 1);
  assert.equal(s.essayPointsPct, 40);
  assert.equal(s.hardPct, 67);
  assert.equal(s.overall, '중상'); // 배점 가중 평균 (0*30+3*30+4*40)/100 = 2.5 → 3
  assert.deepEqual(s.byArea.map((r) => [r.label, r.count, r.points, r.pct]), [['어휘', 1, 30, 33], ['독해', 1, 30, 33], ['서술형', 1, 40, 33]]);
  assert.deepEqual(s.byDifficulty.map((r) => r.label), ['하', '중상', '상']);
});

test('examStats 는 학원 글이 쓰는 표(유형·배점·출처·고난도 배점)도 낸다', () => {
  const s = examStats(items);
  // 유형별: 객관식 2문항 60점 / 서술형 1문항 40점
  assert.deepEqual(s.byKind.map((r) => [r.label, r.count, r.points, r.pct]), [['객관식', 2, 60, 67], ['서술형', 1, 40, 33]]);
  // 배점별: 큰 배점부터, 번호까지 (학원 글의 "5점 문항 5개가 전부 어법")
  assert.deepEqual(s.byPoints, [{ points: 40, count: 1, nos: [3] }, { points: 30, count: 2, nos: [1, 2] }]);
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
    ['5과', 2, 70, 67, [1, 3]],
    ['6과', 1, 30, 33, [2]],
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
  assert.deepEqual(s.byArea.map((r) => r.nos), [[1], [2], [3]]);
  assert.deepEqual(s.byKind.find((r) => r.label === '객관식').nos, [1, 2]);
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
  assert.deepEqual(s.byArea.map((r) => [r.label, r.correct, r.count, r.pct]), [['어휘', 1, 1, 100], ['독해', 0, 1, 0], ['서술형', 0, 1, 0]]);
  assert.deepEqual(s.weakAreas, ['독해', '서술형']);
  assert.deepEqual(s.byArea.map((r) => r.nos), [[], [2], [3]]); // 영역마다 틀린 번호
});

test('parseStudents 는 한 줄에 한 명씩 읽고 문제를 알려 준다', () => {
  const text = '김OO 4(③), 9, 25, 9\nB 0\n홍길동 1\n이OO\n박OO 99';
  const { students, problems } = parseStudents(text, [1, 4, 9, 25]);
  assert.deepEqual(students[0], { label: '김OO', wrong: [{ no: 4, chosen: '③' }, { no: 9, chosen: '' }, { no: 25, chosen: '' }] });
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
