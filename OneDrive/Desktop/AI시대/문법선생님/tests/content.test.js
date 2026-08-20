import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLesson } from '../js/domain.js';

test('validateLesson reports every missing masterclass field', () => {
  const errors = validateLesson({ id: 'x', examples: [], quiz: [] });
  for (const field of ['hook', 'analogy', 'formula', 'examples', 'trap', 'memory', 'visualKey', 'quiz']) {
    assert.ok(errors.some(error => error.includes(field)), field);
  }
});
