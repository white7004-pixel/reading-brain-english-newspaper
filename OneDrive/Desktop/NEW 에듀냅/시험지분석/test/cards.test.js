import test from 'node:test';
import assert from 'node:assert/strict';
import { deckData, cardDeck } from '../public/cards.js';
import { draftSchool } from '../public/draft.js';
import { examStats } from '../public/lib.js';

// 카드뉴스의 숫자는 examStats 에서만 온다. 카드에서 새로 세지 않는다.
// 공개물이라 학생 이름·점수는 받지도 그리지도 않는다 (2026-10-02).
const I = (no, kind, points, area, subtype, difficulty, source, unit = '5과', note = '', key = false) =>
  ({ no, kind, points, unit, area, subtype, difficulty, source, answer: '', note, key, reason: '' });

const items = [
  I('1', '객관식', 3, '어휘', '영영풀이', '하', '교과서'),
  I('2', '객관식', 4, '독해', '내용 불일치', '중', '교과서'),
  I('3', '객관식', 4, '독해', '빈칸', '중상', '부교재', '6과', '앞뒤 연결어를 놓치면 걸렸습니다'),
  I('4', '객관식', 4, '어법', '시제', '중', '교과서', '6과'),
  I('5', '객관식', 5, '어법', '관계사', '상', '부교재', '6과', '쓰임이 비슷한 보기 둘을 끝까지 따져야 했습니다', true),
  I('6', '객관식', 4, '대화문', '이어질 말', '중', '교과서'),
  I('서답형 1', '단답형', 5, '어법', '어형 바꿔 쓰기', '중', '교과서'),
  I('서답형 2', '서술형', 6, '어법', '조건 영작', '상', '부교재', '6과', '조건 세 개를 모두 지켜야 만점이었습니다', true),
];
const meta = { subject: '영어', school: '소래중학교', grade: '중2', term: '1학기', exam: '중간고사', range: '5~6과', date: '2026-04-28' };
const academy = { name: '리딩브레인영어학원', cards: true };
const ctx = (list = items) => ({ academy, meta, items: list, stats: examStats(list) });
const 짓기 = (list = items, opts) => { const c = ctx(list); return deckData(c, draftSchool(c), opts); };

test('시험 정보는 meta 와 examStats 를 그대로 쓴다', () => {
  const d = 짓기();
  assert.equal(d.문항, 8);
  assert.equal(d.배점, 35); // 3+4+4+4+5+4+5+6
  assert.equal(d.학교, '소래중학교');
  assert.equal(d.체감, examStats(items).overallLabel);
  assert.match(d.구성, /선택형 6/);
  assert.match(d.구성, /단답형 1/);
  assert.match(d.구성, /서술형 1/);
});

test('난이도는 하·중·상 셋으로 묶고 문항 번호를 함께 적는다', () => {
  const d = 짓기();
  assert.deepEqual(d.난이도.map((x) => x.이름), ['하', '중', '상']);
  assert.equal(d.난이도[0].수, 1);  // 하
  assert.equal(d.난이도[1].수, 4);  // 중 (중 4개)
  assert.equal(d.난이도[2].수, 3);  // 상 (중상 1 + 상 2)
  assert.equal(d.난이도.reduce((n, x) => n + x.수, 0), 8);
  assert.equal(d.난이도.reduce((n, x) => n + x.비율, 0) >= 99, true);
  assert.match(d.난이도[2].번호, /5/);
});

test('카드에 보이는 난이도 이름은 학부모 말로 바꿔 쓴다', () => {
  const d = 짓기();
  assert.deepEqual(d.난이도.map((x) => x.보임), ['쉬움', '보통', '어려움']);
  const c = ctx();
  const html = cardDeck(c, draftSchool(c));
  assert.ok(html.includes('어려움 10문항') || html.includes('어려움 3문항'), '카드에는 풀어 쓴 이름이 나온다');
});

test('영역은 문항 수가 많은 차례로, 그 영역에 실제로 나온 세부유형만 적는다', () => {
  const d = 짓기();
  assert.equal(d.영역[0].이름, '어법'); // 4문항으로 가장 많다
  assert.deepEqual(d.영역[0].유형, ['시제', '관계사', '어형 바꿔 쓰기']);
  assert.ok(d.영역[0].번호.includes('4'));
});

test('흐름은 문항 차례대로 0·1·2 로 적고 번호가 짝이 맞는다', () => {
  const d = 짓기();
  assert.equal(d.흐름.length, 8);
  assert.equal(d.흐름번호.length, 8);
  assert.deepEqual(d.흐름, [0, 1, 2, 1, 2, 1, 1, 2]);
  assert.equal(d.흐름번호[6], '서답형 1');
});

test('변별 문항은 상 난이도거나 원장님이 고른 것', () => {
  const d = 짓기();
  assert.ok(d.변별.includes('5'));
  assert.ok(d.변별.includes('서답형 2'));
  assert.ok(!d.변별.includes('1'));
});

test('대표 문항은 draftSchool 이 고른 것을 그대로 쓴다', () => {
  const c = ctx();
  const school = draftSchool(c);
  const d = deckData(c, school);
  assert.deepEqual(d.대표.map((k) => k.번호), school.keyItems.map((k) => k.no));
  assert.equal(d.대표[0].한줄, school.keyItems[0].why);
});

test('기출 적중은 넣어 주셨을 때만 생긴다', () => {
  assert.equal(짓기().적중, null);
  const d = 짓기(items, { 적중: { 맞힌: 5, 자료: ['변형문제 2회'], 사진: ['a.png'] } });
  assert.equal(d.적중.맞힌, 5);
  assert.equal(d.적중.전체, 8, '분모는 늘 전체 문항 수다');
  assert.deepEqual(d.적중.사진, ['a.png']);
});

test('카드는 다섯 장, 적중을 안 넣으면 네 장', () => {
  const c = ctx();
  const school = draftSchool(c);
  const 넷 = cardDeck(c, school);
  assert.equal((넷.match(/data-png=/g) || []).length, 4);
  assert.ok(!넷.includes('적중 확인'));
  const 다섯 = cardDeck(c, school, { 적중: { 맞힌: 5, 자료: [], 사진: [] } });
  assert.equal((다섯.match(/data-png=/g) || []).length, 5);
  assert.ok(다섯.includes('적중 확인'));
});

test('카드에 학생 이름·점수가 들어갈 자리가 없다', () => {
  const c = ctx();
  const html = cardDeck(c, draftSchool(c), { 적중: { 맞힌: 5, 자료: [], 사진: [] } });
  assert.doesNotMatch(html, /학생|점수는|이름/);
});

test('적중을 적을 때 분모 없이 쓰지 않는다', () => {
  const c = ctx();
  const html = cardDeck(c, draftSchool(c), { 적중: { 맞힌: 8, 자료: [], 사진: [] } });
  assert.ok(html.includes('8문항 가운데 8문항') || html.includes('/ 8'), '분모가 함께 나와야 한다');
  assert.doesNotMatch(html, /100%\s*적중/);
});

test('글자는 모두 esc 를 지난다', () => {
  const 나쁜 = [{ ...items[0], subtype: '<script>x</script>', area: '어휘' }];
  const c = { academy: { name: '<b>학원</b>' }, meta: { ...meta, school: '<i>학교</i>' }, items: 나쁜, stats: examStats(나쁜) };
  const html = cardDeck(c, draftSchool(c));
  assert.doesNotMatch(html, /<script>/);
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes('&lt;i&gt;학교&lt;/i&gt;'));
});

test('문항이 없어도 터지지 않는다', () => {
  const c = ctx([]);
  assert.equal(cardDeck(c, draftSchool(c)), '');
});
