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

test('카드는 A4 와 같은 숫자를 쓰고, 장수는 문항 수가 정한다', () => {
  const html = shareCards(ctx, school);
  // 한눈에 · 어떻게 나왔나 · 문항표(2문항이라 한 장) · 다음 시험 준비
  assert.equal(html.match(/class="page card-news"/g).length, 4);
  assert.match(html, /에듀냅중학교 중3 1학기 중간고사/);
  assert.match(html, new RegExp(`${ctx.stats.count}`));
  assert.match(html, new RegExp(`${ctx.stats.essayPointsPct}%`));
  assert.match(html, /기하 · 삼각비/); // 변별 문항 줄의 영역·세부유형
  assert.match(html, /<td class="num">2<\/td>/); // 그 문항 번호
});

test('카드에는 학생 정보가 들어가지 않는다', () => {
  const html = shareCards({ ...ctx, students: [{ label: '김OO', wrong: [{ no: 1 }] }] }, school);
  assert.doesNotMatch(html, /김OO|학생/);
});

test('AI 글이 그대로 화면에 들어가지 않는다', () => {
  const html = shareCards(ctx, { ...school, overview: '<script>나쁨</script>' });
  assert.doesNotMatch(html, /<script>/);
});

test('문항표 카드 — 문항 번호·문제 유형·난이도만 싣고 문항 수에 따라 장수가 늘어난다', () => {
  const mk = (n) => Array.from({ length: n }, (_, i) => ({
    no: i + 1, kind: i >= n - 2 ? '서술형' : '객관식', points: 4, area: '어법',
    subtype: '관계대명사', difficulty: '중', answer: '③', reason: 'ㄱ',
  }));
  const cards = (n) => {
    const items = mk(n);
    return shareCards({ ...ctx, items, stats: examStats(items) }, school).match(/class="page card-news"/g).length;
  };
  // 9문항까지 한 장, 10문항부터 두 장 (하버드브레인 카드가 9줄씩이다)
  assert.equal(cards(9) + 1, cards(10));
  assert.ok(cards(27) > cards(9));

  const items = mk(27);
  const html = shareCards({ ...ctx, items, stats: examStats(items) }, school);
  assert.match(html, /문항은 이렇게 나왔습니다|문항별 유형과 난이도/);
  // 서술형은 번호를 지어내지 않고 유형 칸에 표시한다
  assert.match(html, /서술형 · 어법 - 관계대명사/);
  // 지문·보기·정답은 공개 카드에 싣지 않는다
  assert.doesNotMatch(html, /③/);
});
