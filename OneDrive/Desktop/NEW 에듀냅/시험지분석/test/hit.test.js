import test from 'node:test';
import assert from 'node:assert/strict';
import { hitInput } from '../public/lib.js';

// 기출 적중은 선택이다. 켜지 않으면 카드 자체가 생기지 않는다 (2026-10-03).
test('켜지 않으면 아무것도 돌려주지 않는다', () => {
  assert.equal(hitInput({ 켬: false, 맞힌: 5 }, 25), null);
  assert.equal(hitInput(undefined, 25), null);
  assert.equal(hitInput({}, 25), null);
});

test('맞힌 수는 전체 문항을 넘지 못한다', () => {
  assert.equal(hitInput({ 켬: true, 맞힌: 99 }, 25).맞힌, 25);
  assert.equal(hitInput({ 켬: true, 맞힌: -3 }, 25).맞힌, 0);
  assert.equal(hitInput({ 켬: true, 맞힌: '7' }, 25).맞힌, 7);
  assert.equal(hitInput({ 켬: true, 맞힌: '' }, 25).맞힌, 0);
  assert.equal(hitInput({ 켬: true, 맞힌: '다섯' }, 25).맞힌, 0);
  assert.equal(hitInput({ 켬: true, 맞힌: 4.8 }, 25).맞힌, 4);
});

test('교재 이름은 쉼표나 줄바꿈으로 나누고 빈 칸은 버린다', () => {
  const h = hitInput({ 켬: true, 자료: ' 내신 변형 2회 ,, 어법 집중 3회\n어휘 특강 ' }, 25);
  assert.deepEqual(h.자료, ['내신 변형 2회', '어법 집중 3회', '어휘 특강']);
  assert.deepEqual(hitInput({ 켬: true }, 25).자료, []);
});

test('교재는 여섯 가지, 사진은 넉 장까지만 쓴다', () => {
  const h = hitInput({ 켬: true, 자료: 'ㄱ,ㄴ,ㄷ,ㄹ,ㅁ,ㅂ,ㅅ,ㅇ', 사진: ['1', '2', '3', '4', '5', '6'] }, 25);
  assert.equal(h.자료.length, 6);
  assert.deepEqual(h.사진, ['1', '2', '3', '4']);
});

test('사진을 안 올려도 적중 숫자만으로 돌아간다', () => {
  const h = hitInput({ 켬: true, 맞힌: 5, 자료: '내신 변형 2회' }, 25);
  assert.deepEqual(h, { 맞힌: 5, 자료: ['내신 변형 2회'], 사진: [] });
});
