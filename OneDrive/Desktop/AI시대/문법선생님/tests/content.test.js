import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLesson } from '../js/domain.js';
import { ALL_UNITS } from '../js/curriculum.js';
import { LESSONS } from '../js/lessons.js';

test('validateLesson reports every missing masterclass field', () => {
  const errors = validateLesson({ id: 'x', examples: [], quiz: [] });
  for (const field of ['hook', 'analogy', 'formula', 'examples', 'trap', 'memory', 'visualKey', 'quiz']) {
    assert.ok(errors.some(error => error.includes(field)), field);
  }
});

test('all 98 curriculum units have one valid authored lesson', () => {
  assert.equal(ALL_UNITS.length, 98);
  assert.deepEqual(Object.keys(LESSONS).sort(), ALL_UNITS.map(unit => unit.id).sort());
  const invalid = Object.values(LESSONS).flatMap(lesson =>
    validateLesson(lesson).map(error => `${lesson.id}: ${error}`));
  assert.deepEqual(invalid, []);
});

test('examples are not duplicated between lessons', () => {
  const examples = Object.values(LESSONS).flatMap(lesson => lesson.examples.map(example => example.en));
  assert.equal(new Set(examples).size, examples.length);
});

test('each book contributes its complete curriculum subset', () => {
  for (const book of [1, 2, 3]) {
    assert.equal(
      Object.values(LESSONS).filter(lesson => lesson.book === book).length,
      ALL_UNITS.filter(unit => unit.book === book).length
    );
  }
});
