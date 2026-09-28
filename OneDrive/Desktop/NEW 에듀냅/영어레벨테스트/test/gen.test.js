import test from 'node:test';
import assert from 'node:assert/strict';
import { genRequest, toItems, parseWordsCsv, wordsFor, ITEMS_SCHEMA } from '../lib/gen.js';

const ask = (req) => JSON.parse(req.content[0].text.slice(req.content[0].text.indexOf('{')));

test('genRequest 는 학기·단원·배운 단원·생성 조건을 넘긴다', () => {
  const req = genRequest({ section: 'grammar', step: 11, unit: 3 });
  assert.equal(req.schema, ITEMS_SCHEMA);
  const a = ask(req);
  assert.equal(a.학기, '중2 1학기');
  assert.equal(a.단원, '3단원 — 수동태 기본');
  assert.ok(a.이미_배운_단원.includes('동명사 (주어·목적어)'));    // 앞 학기
  assert.ok(a.이미_배운_단원.includes('현재완료 (경험·계속·완료·결과)')); // 같은 학기 앞 단원
  assert.equal(a.문항_수, 4);
  assert.match(req.system, /옮기거나 조금 바꿔 쓰지 않습니다/);
  assert.deepEqual(ask(genRequest({ section: 'reading', step: 15, unit: 1 })).지문_단어_수, [130, 170]);
  assert.equal(ask(genRequest({ section: 'reading', step: 15, unit: 1 })).수준, '고1 3·6월 모의고사 수준');
});

test('단어 문항은 낱말 목록이 있어야 한다', () => {
  assert.throws(() => genRequest({ section: 'vocab', step: 9, unit: 1 }), /낱말 목록/);
  assert.deepEqual(ask(genRequest({ section: 'vocab', step: 9, unit: 1, words: ['apple (사과)'] })).낱말_목록, ['apple (사과)']);
});

test('toItems 는 초안으로 만들고 틀린 것은 버린다', () => {
  let n = 0;
  const good = { kind: '빈칸 어법', passage: '', question: 'Q', choices: ['a', 'b', 'c', 'd'], answer: 2, explain_ko: 'e' };
  const out = toItems({ items: [good, { ...good, choices: ['a', 'b', 'c'] }] }, { section: 'grammar', step: 11, unit: 3 }, () => `g${n++}`);
  assert.equal(out.length, 1);
  assert.deepEqual(out[0], { id: 'g0', section: 'grammar', step: 11, unit: 3, kind: '빈칸 어법', passage: '', question: 'Q', choices: ['a', 'b', 'c', 'd'], answer: 2, explain_ko: 'e', status: 'draft' });
});

test('단어 CSV 읽기와 학기 Day 범위 고르기', () => {
  const list = parseWordsCsv('\uFEFFbook,day,word,meaning\n능률 VOCA 중등 기본,1,apple,사과\n능률VOCA 중등 기본,7,run,달리다, 운영하다\n능률 VOCA 중등 필수,1,x,y\n');
  assert.equal(list.length, 3);
  assert.equal(list[1].meaning, '달리다, 운영하다');
  assert.deepEqual(wordsFor(list, { book: '능률 VOCA 중등 기본', days: [1, 6] }), ['apple (사과)']);
  assert.deepEqual(wordsFor(list, { book: '능률 VOCA 중등 기본', days: [7, 13] }), ['run (달리다, 운영하다)']);
});
