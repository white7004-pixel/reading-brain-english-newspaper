import test from 'node:test';
import assert from 'node:assert/strict';
import { shareCards } from '../public/share.js';
import { examStats } from '../public/lib.js';

const items = [
  { no: 1, kind: '객관식', points: 60, area: '함수', subtype: '이차함수', difficulty: '중', answer: '③', reason: 'ㄱ' },
  { no: 2, kind: '서술형', points: 40, area: '기하', subtype: '삼각비', difficulty: '상', answer: 'x=3', reason: 'ㄴ' },
];
const ctx = {
  academy: { name: '에듀냅학원', phone: '031-000-0000', color: '#03392A', logo: '' },
  meta: { subject: '수학', school: '에듀냅중학교', grade: '중3', term: '1학기', exam: '중간고사' },
  items,
  stats: examStats(items),
};
const school = {
  overview: '교과서 기본형입니다.',
  keyItems: [{ no: 2, why: '조건이 많았습니다' }],
  strategy: [{ area: '함수', tip: '반복해 풀기' }],
};

test('카드는 3장이고 A4 와 같은 숫자를 쓴다', () => {
  const html = shareCards(ctx, school);
  assert.equal(html.match(/class="page card-news"/g).length, 3);
  assert.match(html, /에듀냅중학교 중3 1학기 중간고사/);
  assert.match(html, new RegExp(`${ctx.stats.count}`));
  assert.match(html, new RegExp(`${ctx.stats.essayPointsPct}%`));
  assert.match(html, /2번/); // 변별 문항
  assert.match(html, /삼각비/); // 영역·세부유형
});

test('카드에는 학생 정보가 들어가지 않는다', () => {
  const html = shareCards({ ...ctx, students: [{ label: '김OO', wrong: [{ no: 1 }] }] }, school);
  assert.doesNotMatch(html, /김OO|학생/);
});

test('AI 글이 그대로 화면에 들어가지 않는다', () => {
  const html = shareCards(ctx, { ...school, overview: '<script>나쁨</script>' });
  assert.doesNotMatch(html, /<script>/);
});
