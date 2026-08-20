import test from 'node:test';
import assert from 'node:assert/strict';
import { CURRICULUM } from '../js/curriculum.js';
import { LESSONS } from '../js/lessons.js';
import { validateLesson } from '../js/domain.js';

test('every curriculum unit has one valid lesson', () => {
  const units = CURRICULUM.flatMap(book => book.chapters.flatMap(chapter => chapter.units));
  assert.equal(new Set(units.map(unit => unit.id)).size, units.length);
  for (const unit of units) {
    const lesson = LESSONS[unit.id];
    assert.ok(lesson, `missing ${unit.id}`);
    assert.deepEqual(validateLesson(lesson), [], unit.id);
  }
});

test('lesson content contains no broken Korean or paid API endpoint', () => {
  const text = JSON.stringify(LESSONS);
  assert.doesNotMatch(text, /由щ|뵫釉|openai|anthropic|api\.elevenlabs/i);
});
