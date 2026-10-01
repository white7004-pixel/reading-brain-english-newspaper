// node survey/check.js — 문항 목록과 집계 자가검사
const assert = require('assert');
const SURVEYS = require('./questions.js');
const RB = require('./core.js');

const items = s => s.sections.flatMap(x => x.items);
const P = SURVEYS.parent, S = SURVEYS.student;

// 문항 수: 설계서 표와 같아야 한다
assert.strictEqual(items(P).length, 18);
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
assert.strictEqual(RB.filterRows(rows, { curricula: '미국교과' }).length, 1);
assert.strictEqual(RB.filterRows(rows, { grade: '', curricula: '' }).length, 2);
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

// 날짜별 응답 수 (한국 시간 자정 기준, 첫 응답일 ~ 오늘, 빈 날은 0)
const days = RB.daily([
  { created_at: '2026-09-29T15:00:00Z' }, // 9/30 00:00 KST
  { created_at: '2026-09-30T14:59:00Z' }, // 9/30 23:59 KST
  { created_at: '2026-10-01T15:30:00Z' }, // 10/2 00:30 KST
], Date.parse('2026-10-03T01:00:00Z'));
assert.deepStrictEqual(days, [
  { day: '2026-09-30', n: 2 }, { day: '2026-10-01', n: 0 }, { day: '2026-10-02', n: 1 }, { day: '2026-10-03', n: 0 }]);
assert.deepStrictEqual(RB.daily([], Date.now()), []);

// 설문 만들기: 응답 생긴 설문 고치기 규칙 (서버와 같은 규칙)
const base = { sections: [{ title: 'A', items: [
  { id: 'q1', type: 'single', label: '하나', options: ['네', '아니요'] },
  { id: 'q2', type: 'scale', label: '점수', options: [{ v: 1, label: '1' }, { v: 2, label: '2' }] }] }] };
const clone = o => JSON.parse(JSON.stringify(o));
const textEdit = clone(base); textEdit.sections[0].items[0].label = '하나요?'; textEdit.sections[0].title = 'B';
textEdit.sections.push({ title: 'C', items: [{ id: 'q3', type: 'text', label: '더' }] });
assert.deepStrictEqual(RB.lockCheck(base, textEdit), []);
const optEdit = clone(base); optEdit.sections[0].items[0].options.push('몰라요');
assert.deepStrictEqual(RB.lockCheck(base, optEdit), ['q1']);
const typeEdit = clone(base); typeEdit.sections[0].items[1].type = 'single';
assert.deepStrictEqual(RB.lockCheck(base, typeEdit), ['q2']);
const gone = clone(base); gone.sections[0].items.pop();
assert.deepStrictEqual(RB.lockCheck(base, gone), ['q2']);

// 설문 검사: 고칠 곳을 사람 말로
assert.deepStrictEqual(RB.validateDef({ kicker: '설명회', sections: [{ title: '질문', items: [{ id: 'q1', type: 'single', label: '좋았나요', options: ['네', '아니요'] }] }] }), []);
const bad = RB.validateDef({ kicker: '', sections: [{ title: '', items: [
  { id: 'q1', type: 'single', label: '', options: ['하나'] }, { id: 'q1', type: 'text', label: '글' }] }, { title: '빈 섹션', items: [] }] });
assert.ok(bad.some(e => e.includes('설문 이름')));
assert.ok(bad.some(e => e.includes('1번 문항') && e.includes('문항 글')));
assert.ok(bad.some(e => e.includes('보기')));
assert.ok(bad.some(e => e.includes('빈 섹션')));
assert.strictEqual(RB.validateDef({ kicker: 'x', sections: [] }).length, 1);

// 새 문항 id 는 겹치지 않게, 주소는 옛 설문만 짧게
assert.strictEqual(RB.newId(base), 'q3');
assert.strictEqual(RB.newId({ sections: [] }), 'q1');
assert.strictEqual(RB.linkOf('parent'), '/parent');
assert.strictEqual(RB.linkOf('seminar-1'), '/s/seminar-1');
assert.strictEqual(RB.slugOk('seminar-1'), true);
assert.strictEqual(RB.slugOk('Seminar'), false);
assert.strictEqual(RB.slugOk('results'), false);

// AI 초안: 앞뒤 말이 붙어도 JSON 만 꺼내고, 글 길이를 자른다
const ai = require('./api/ai.js');
const draft = ai.parse('네:\n{"title":"설명회","greeting":"Dear parents,","intro":"한 문단","notice":"' + 'x'.repeat(400) + '","thanks":"감사"}\n끝');
assert.deepStrictEqual(draft.intro, ['한 문단']);
assert.strictEqual(draft.notice.length, 300);
assert.throws(() => ai.parse('JSON 없음'));

// 그림·안내 글(info)은 답을 받지 않는다: 집계·필수·CSV 에서 빠지고, 번호표는 겹치지 않는다
const withInfo = { kicker: '설명회', sections: [{ title: '안내', items: [
  { id: 'q1', type: 'info', label: '', image: '/img/a.jpg' },
  { id: 'q2', type: 'scale', required: true, label: '추천', options: [{ v: 1, label: '아니다' }, { v: 2, label: '' }, { v: 3, label: '그렇다' }] }] }] };
assert.deepStrictEqual(RB.validateDef(withInfo), []);
assert.deepStrictEqual(RB.items(withInfo).map(i => i.id), ['q2']);
assert.strictEqual(RB.newId(withInfo), 'q3');
assert.strictEqual(RB.summarize(withInfo, [{ answers: { q2: 3 } }]).items.q2.avg, 3);
assert.ok(!RB.toCSV(withInfo, []).includes('undefined'));
withInfo.sections[0].items[1].options[2].label = '';
assert.ok(RB.validateDef(withInfo).some(e => e.includes('양 끝')));

console.log('check.js 통과');
