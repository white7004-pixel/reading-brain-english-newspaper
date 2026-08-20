import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLesson, scoreQuiz, calculateProgress } from '../js/domain.js';

test('validateLesson accepts a complete lesson', () => {
  const lesson = {
    id: 'b1-u1', book: 1, chapter: 'b1-c1', title: 'be동사', pageReference: 'p.10',
    steps: Array.from({ length: 4 }, (_, i) => ({
      label: `단계${i}`, heading: '핵심', lines: ['I am ready.'], narration: '설명'
    })),
    quiz: Array.from({ length: 3 }, () => ({
      question: '알맞은 것은?', options: ['am', 'is'], answer: 0, explanation: '주어가 I이다.'
    }))
  };
  assert.deepEqual(validateLesson(lesson), []);
});

test('validateLesson rejects an out-of-range answer', () => {
  const errors = validateLesson({
    id: 'x', book: 1, chapter: 'c', title: 't', pageReference: 'p.1',
    steps: Array.from({ length: 4 }, () => ({ label: 'l', heading: 'h', lines: ['x'], narration: 'n' })),
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
