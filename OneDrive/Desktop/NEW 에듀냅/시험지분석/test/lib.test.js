import test from 'node:test';
import assert from 'node:assert/strict';
import { examStats, studentStats, parseStudents, to3, esc } from '../public/lib.js';

const items = [
  { no: 1, kind: '객관식', points: 30, area: '어휘', difficulty: '하' },
  { no: 2, kind: '객관식', points: 30, area: '독해', difficulty: '중상' },
  { no: 3, kind: '서술형', points: 40, area: '서술형', difficulty: '상' },
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

test('studentStats 는 점수와 약점 영역을 계산한다', () => {
  const s = studentStats(items, [{ no: 2, chosen: '' }, { no: 3, chosen: '' }]);
  assert.equal(s.score, 30);
  assert.equal(s.total, 100);
  assert.equal(s.wrongCount, 2);
  assert.deepEqual(s.byArea.map((r) => [r.label, r.correct, r.count, r.pct]), [['어휘', 1, 1, 100], ['독해', 0, 1, 0], ['서술형', 0, 1, 0]]);
  assert.deepEqual(s.weakAreas, ['독해', '서술형']);
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
