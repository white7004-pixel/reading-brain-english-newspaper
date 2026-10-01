// node survey/check.js — 문항 목록과 집계 자가검사
const assert = require('assert');
const SURVEYS = require('./questions.js');
const RB = require('./core.js');

const items = s => s.sections.flatMap(x => x.items);
const P = SURVEYS.parent, S = SURVEYS.student;

// 문항 수: 설계서 표와 같아야 한다
assert.strictEqual(items(P).length, 16);
assert.strictEqual(items(S).length, 22);
assert.deepStrictEqual(P.sections.map(x => x.title), ['학생 레벨', '교수팀 & 수업 관련 만족도', '운영팀 관련 만족도', '자유의견']);
assert.ok(items(P).find(i => i.label === '담당 선생님의 수업 전달력에 만족하시나요?'));
assert.ok(items(P).find(i => i.label === '담당 선생님의 수업 커리큘럼과 학생 관리에 만족하시나요?'));
assert.strictEqual(items(S).filter(i => i.type === 'text').length, 8);
assert.ok(items(S).every(i => i.type !== 'text' ? i.required : !i.required));
const ids = Object.values(SURVEYS).flatMap(s => items(s).map(i => s.id + '.' + i.id));
assert.strictEqual(new Set(ids).size, ids.length, 'id 중복');
assert.ok(!JSON.stringify(SURVEYS).includes('원더스'), '다른 학원 이름 금지');

// 필수 누락
const full = { grade: ['초등 3학년'], curricula: ['원서정독'], t_deliver: 5, t_curr: 4, t_report: 4, rel: '그렇다', diff: '적절하다', load: '적절하다', hw: '많다', hw_diligence: '숙제를 가끔 못해갈 때가 있다', growth: '그렇다', o_notice: 5, o_reply: 3, o_admin: 4, good: '좋아요' };
assert.deepStrictEqual(RB.missing(P, full), []);
assert.deepStrictEqual(RB.missing(P, Object.assign({}, full, { curricula: [], good: '  ' })), ['curricula', 'good']);

// 집계
const rows = [
  { answers: full },
  { answers: Object.assign({}, full, { grade: ['초등 3학년', '중등 1학년'], curricula: ['원서정독', '미국교과'], t_deliver: 3, o_notice: 4, o_reply: 4, o_admin: 4 }) },
];
const sum = RB.summarize(P, rows);
assert.strictEqual(sum.n, 2);
assert.strictEqual(sum.items.t_deliver.avg, 4);
assert.strictEqual(sum.items.curricula.counts['원서정독'], 2);
assert.strictEqual(sum.items.curricula.counts['미국교과'], 1);
assert.strictEqual(sum.items.hw.counts['많다'], 2);
assert.strictEqual(sum.items.hw_diligence.counts['숙제를 가끔 못해갈 때가 있다'], 2);
assert.strictEqual(sum.sections[2].avg, 4); // 운영팀: (5+3+4 + 4+4+4)/6
assert.strictEqual(sum.sections[0].avg, null); // 척도 없는 섹션

// 거르기
assert.strictEqual(RB.filterRows(rows, { grade: '중등 1학년' }).length, 1);
assert.strictEqual(RB.filterRows(rows, { grade: '초등 3학년' }).length, 2); // 자녀 둘
assert.strictEqual(sum.items.grade.counts['초등 3학년'], 2);
assert.strictEqual(RB.filterRows(rows, { curriculum: '미국교과' }).length, 1);
assert.strictEqual(RB.filterRows(rows, {}).length, 2);

// 숙제량(noAvg)은 평균에서 빠진다
const srow = { answers: { grade: '초등 4학년', s_fun: 5, s_hw: 1, s_trouble: '쉬는 시간에 놀려요' } };
const ssum = RB.summarize(S, [srow]);
assert.strictEqual(RB.filterRows([srow], { grade: '초등 4학년' }).length, 1); // 학생은 한 학년(문자열)
assert.strictEqual(ssum.items.s_hw.avg, undefined);
assert.strictEqual(ssum.sections[1].avg, 5);
assert.strictEqual(RB.flagged(S, [srow, { answers: { s_trouble: ' ' } }]).length, 1);

// CSV: BOM, 머리줄, 따옴표, 여러 개 고르기
const csv = RB.toCSV(P, [{ created_at: '2026-10-01T01:00:00Z', answers: Object.assign({}, full, { good: '좋은 "선생님", 감사' }) }]);
assert.ok(csv.startsWith('﻿'));
assert.ok(csv.slice(1).split('\r\n')[0].startsWith('제출 시각,현재 자녀 학년'));
assert.ok(csv.includes('"좋은 ""선생님"", 감사"'));
assert.ok(csv.includes('원서정독'));
assert.ok(RB.toCSV(P, rows).includes('초등 3학년 / 중등 1학년'));

console.log('check.js 통과');
