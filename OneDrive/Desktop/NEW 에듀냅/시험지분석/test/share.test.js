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
  assert.match(html, new RegExp(`${ctx.stats.writtenPointsPct}%`));
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

test('문항표 카드 — 두 단으로 꽉 채우고, 넘치면 장이 늘어난다', () => {
  const mk = (n) => Array.from({ length: n }, (_, i) => ({
    no: i + 1, kind: i >= n - 2 ? '서술형' : '객관식', points: 4, area: '어법',
    subtype: '관계대명사', difficulty: '중', answer: '③', reason: 'ㄱ',
  }));
  const cards = (n) => {
    const items = mk(n);
    return shareCards({ ...ctx, items, stats: examStats(items) }, school).match(/class="page card-news"/g).length;
  };
  // 두 단으로 한 장에 20문항까지. 21문항부터 두 장 (원장님 요청 2026-10-02: 카드를 꽉 채운다)
  assert.equal(cards(9), cards(20), '20문항까지 한 장');
  assert.equal(cards(20) + 1, cards(21), '21문항부터 한 장 더');
  assert.ok(cards(41) > cards(21));

  // 한 장 안에서 표가 둘로 갈린다 — 왼쪽 단에 앞 번호, 오른쪽 단에 뒤 번호
  const 한장 = shareCards({ ...ctx, items: mk(20), stats: examStats(mk(20)) }, school);
  const 시작 = 한장.indexOf('문항별 유형과 난이도');
  const 문항표장 = 한장.slice(시작, 한장.indexOf('</article>', 시작)); // 그 카드 한 장만
  assert.equal((문항표장.match(/<table class="t/g) || []).length, 2, '두 단');
  assert.match(문항표장, /배점/, '배점도 싣는다');

  const items = mk(27);
  const html = shareCards({ ...ctx, items, stats: examStats(items) }, school);
  assert.match(html, /문항은 이렇게 나왔습니다|문항별 유형과 난이도/);
  // 서술형은 번호를 지어내지 않고 유형 칸에 표시한다
  assert.match(html, /서술형 · 어법 - 관계대명사/);
  // 지문·보기·정답은 공개 카드에 싣지 않는다
  assert.doesNotMatch(html, /③/);
});

test('문항표 카드가 여러 장이면 고르게 나눈다 — 뒷장이 휑하지 않게', () => {
  const mk = (n) => Array.from({ length: n }, (_, i) => ({
    no: i + 1, kind: '객관식', points: 4, area: '어법', subtype: '관계대명사', difficulty: '중', answer: '③', reason: 'ㄱ',
  }));
  const 줄수 = (n) => {
    const items = mk(n);
    const html = shareCards({ ...ctx, items, stats: examStats(items) }, school);
    return [...html.matchAll(/문항별 유형과 난이도/g)].map((m) => {
      const 끝 = html.indexOf('</article>', m.index);
      // 문항 줄만 센다 — 머리글 행(<thead>)은 두 단이라 둘이 더 있다
      return (html.slice(m.index, 끝).match(/<tr><td class="num">/g) || []).length;
    });
  };
  assert.deepEqual(줄수(20), [20], '한 장이면 꽉 채운다');
  assert.deepEqual(줄수(22), [11, 11], '두 장이면 반씩');
  assert.deepEqual(줄수(21), [11, 10]);
});
