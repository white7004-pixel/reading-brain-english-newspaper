import test from 'node:test';
import assert from 'node:assert/strict';
import { draftSchool } from '../public/draft.js';
import { examStats } from '../public/lib.js';

// 원장님이 문항마다 적어 둔 한 줄(note)과 문항표 숫자만으로 분석지 글을 짓는다.
// AI 를 부르지 않아도 분석지가 나와야 한다 (2026-10-02 원장 결정).
const I = (no, kind, points, area, subtype, difficulty, source, note = '', key = false) =>
  ({ no, kind, points, unit: '5과', area, subtype, difficulty, source, answer: '', note, key, reason: '' });

const items = [
  I('1', '객관식', 3, '어휘', '영영풀이', '하', '교과서'),
  I('2', '객관식', 3, '독해', '내용 일치', '중', '교과서'),
  I('3', '객관식', 4, '어법', 'to부정사 - 쓰임 구분', '상', '부교재', '쓰임이 비슷한 보기 둘을 끝까지 따져야 했습니다', true),
  I('4', '객관식', 3, '독해', '빈칸', '중상', '외부', '앞뒤 연결어를 놓치면 걸렸습니다'),
  I('서답형 1', '단답형', 6, '어법', '어형 바꿔 쓰기', '중', '교과서'),
  I('서답형 2', '서술형', 6, '어법', '조건 영작', '상', '부교재', '조건 세 개를 모두 지켜야 만점이었습니다', true),
];
const meta = { subject: '영어', school: '소래중학교', grade: '중2', term: '1학기', exam: '중간고사', range: '5과' };
const ctx = () => ({ meta, items, stats: examStats(items) });

test('AI 가 채우던 칸을 모두 돌려준다', () => {
  const s = draftSchool(ctx());
  for (const k of ['overview', 'keywords', 'trends', 'flow', 'whyHard', 'keyItems', 'strategy', 'message']) {
    assert.ok(k in s, `${k} 가 없다`);
  }
  assert.ok(s.overview.length > 20, '총평이 비었다');
  assert.ok(s.keywords.length >= 2 && s.keywords.length <= 4);
});

test('총평은 문항표 숫자를 그대로 쓴다 — 지어내지 않는다', () => {
  const s = draftSchool(ctx());
  assert.match(s.overview, /6문항/);
  assert.match(s.overview, /25점/); // 3+3+4+3+6+6
});

test('대표 문항은 원장님이 고른 것만, 적어 둔 한 줄을 그대로 쓴다', () => {
  const s = draftSchool(ctx());
  assert.deepEqual(s.keyItems.map((k) => k.no), ['3', '서답형 2']);
  assert.equal(s.keyItems[0].why, '쓰임이 비슷한 보기 둘을 끝까지 따져야 했습니다');
});

test('대표를 안 고르면 어려운 문항에서 배점이 큰 순으로 셋까지 뽑는다', () => {
  const 안고름 = items.map((it) => ({ ...it, key: false }));
  const s = draftSchool({ meta, items: 안고름, stats: examStats(안고름) });
  assert.deepEqual(s.keyItems.map((k) => k.no), ['서답형 2', '3', '4']);
  assert.ok(s.keyItems.every((k) => k.why), '한 줄이 비면 안 된다');
});

test('어려웠던 이유는 적어 둔 한 줄을 영역별로 묶는다', () => {
  const s = draftSchool(ctx());
  const 어법 = s.whyHard.find((w) => w.title.includes('어법'));
  assert.ok(어법, '어법이 없다');
  assert.match(어법.detail, /조건 세 개/);
});

test('학습 방향은 영역마다 하나씩, 문항 수가 많은 영역부터', () => {
  const s = draftSchool(ctx());
  assert.equal(s.strategy[0].area, '어법'); // 어법 3문항으로 가장 많다
  assert.ok(s.strategy.every((x) => x.area && x.tip));
});

test('한 줄을 하나도 안 적어도 깨지지 않는다', () => {
  const 빈것 = items.map((it) => ({ ...it, note: '', key: false }));
  const s = draftSchool({ meta, items: 빈것, stats: examStats(빈것) });
  assert.ok(s.overview && s.keyItems.length && s.strategy.length);
  assert.ok(s.keyItems.every((k) => k.why), '한 줄이 없으면 문항표에서 지어 준다');
});

test('문항이 없어도 터지지 않는다', () => {
  const s = draftSchool({ meta, items: [], stats: examStats([]) });
  assert.equal(typeof s.overview, 'string');
  assert.deepEqual(s.keyItems, []);
});

// 한국어 조사를 틀리면 학부모가 바로 알아본다 ("난이도는 중로 보았습니다" 를 겪었다)
test('지어 주는 문장에 어색한 조사가 없다', () => {
  const 빈것 = items.map((it) => ({ ...it, note: '', key: false }));
  const s = draftSchool({ meta, items: 빈것, stats: examStats(빈것) });
  const 글 = [s.overview, s.message, ...s.keyItems.map((k) => k.why), ...s.strategy.map((x) => x.tip),
    ...s.whyHard.map((w) => `${w.title} ${w.detail}`), ...s.trends, ...s.flow].join(' ');
  assert.doesNotMatch(글, /중로|상로|중상로|중하로/);
});
