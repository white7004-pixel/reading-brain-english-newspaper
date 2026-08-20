import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLesson } from '../js/domain.js';
import { ALL_UNITS } from '../js/curriculum.js';
import { LESSONS } from '../js/lessons.js';
import { BOOK1_LESSONS } from '../js/content/book1.js';
import { BOOK2_LESSONS } from '../js/content/book2.js';
import { BOOK3_LESSONS } from '../js/content/book3.js';
import fs from 'node:fs';
import { VISUALS, getVisual } from '../js/visuals.js';

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

for (const [book, registry] of [[1, BOOK1_LESSONS], [2, BOOK2_LESSONS], [3, BOOK3_LESSONS]]) {
  test(`book ${book} authored IDs exactly match its curriculum`, () => {
    const expected = ALL_UNITS.filter(unit => unit.book === book).map(unit => unit.id).sort();
    assert.deepEqual(Object.keys(registry).sort(), expected);
  });
}

test('authored examples never expose internal unit IDs', () => {
  const text = Object.values(LESSONS).flatMap(lesson => lesson.examples.map(example => example.en)).join('\n');
  assert.doesNotMatch(text, /\bb[123]-c\d+-u\d+\b/);
});

test('grammar families use a varied visual vocabulary', () => {
  assert.ok(new Set(Object.values(LESSONS).map(lesson => lesson.visualKey)).size >= 10);
});

test('all lesson visual keys resolve to 12 local accessible assets', () => {
  for (const lesson of Object.values(LESSONS)) {
    const visual = getVisual(lesson.visualKey);
    assert.ok(visual, lesson.visualKey);
    assert.ok(visual.alt.length >= 12, `${lesson.visualKey} alt`);
    assert.ok(fs.existsSync(new URL(`../${visual.src}`, import.meta.url)), visual.src);
  }
  assert.equal(Object.keys(VISUALS).length, 12);
});
