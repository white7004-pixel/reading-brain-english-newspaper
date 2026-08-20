import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLesson, scoreQuiz, calculateProgress } from '../js/domain.js';

test('validateLesson accepts a complete lesson', () => {
  const lesson = {
    id: 'b1-c1-u1', book: 1, chapter: 'b1-c1', title: 'be동사의 긍정문', pageReference: '교재 10쪽',
    hook: 'be동사는 주어의 상태표지판이다.',
    analogy: '이름표처럼 주어가 누구인지 또는 어떤 상태인지 알려 준다.',
    formula: '주어 + be동사 + 상태/정체',
    examples: [
      { en: 'I [[am]] ready.', ko: '나는 준비되었다.', focus: 'I에는 am을 쓴다.' },
      { en: 'They [[are]] friends.', ko: '그들은 친구다.', focus: '복수 주어에는 are를 쓴다.' }
    ],
    trap: { wrong: 'I is ready.', correct: 'I am ready.', reason: 'I와 짝인 be동사는 am이다.' },
    memory: 'I-am, you·we·they-are, he·she·it-is',
    visualKey: 'state-action',
    quiz: Array.from({ length: 3 }, () => ({
      question: '알맞은 것은?', options: ['am', 'is'], answer: 0, explanation: '주어가 I이다.'
    }))
  };
  assert.deepEqual(validateLesson(lesson), []);
});

test('validateLesson rejects an out-of-range answer', () => {
  const errors = validateLesson({
    id: 'x', book: 1, chapter: 'c', title: 't', pageReference: 'p.1',
    hook: 'h', analogy: 'a', formula: 'f', memory: 'm', visualKey: 'v',
    examples: Array.from({ length: 2 }, () => ({ en: 'e', ko: 'k', focus: 'f' })),
    trap: { wrong: 'w', correct: 'c', reason: 'r' },
    quiz: Array.from({ length: 3 }, () => ({ question: 'q', options: ['a', 'b'], answer: 2, explanation: 'e' }))
  });
  assert.ok(errors.some(error => error.includes('answer')));
});

test('scoreQuiz returns wrong question indexes', () => {
  const quiz = [{ answer: 1 }, { answer: 0 }, { answer: 2 }];
  assert.deepEqual(scoreQuiz(quiz, [1, 1, 2]), { correct: 2, total: 3, wrong: [1] });
});

test('calculateProgress reports rounded percent', () => {
  assert.deepEqual(
    calculateProgress([{ id: 'a' }, { id: 'b' }, { id: 'c' }], { a: { completed: true } }),
    { completed: 1, total: 3, percent: 33 }
  );
});
