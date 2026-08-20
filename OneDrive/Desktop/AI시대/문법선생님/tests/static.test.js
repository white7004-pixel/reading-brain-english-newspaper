import test from 'node:test';
import assert from 'node:assert/strict';
import { CURRICULUM } from '../js/curriculum.js';
import { LESSONS } from '../js/lessons.js';
import { validateLesson } from '../js/domain.js';
import fs from 'node:fs';

test('every curriculum unit has one valid lesson', () => {
  const units = CURRICULUM.flatMap(book => book.chapters.flatMap(chapter => chapter.units));
  assert.equal(new Set(units.map(unit => unit.id)).size, units.length);
  for (const unit of units) {
    const lesson = LESSONS[unit.id];
    assert.ok(lesson, `missing ${unit.id}`);
    assert.deepEqual(validateLesson(lesson), [], unit.id);
  }
});

test('app shell exposes the complete accessible learning flow', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  assert.match(html, /<main\b/);
  for (const id of ['book-select','chapter-select','unit-select','start-button','lesson-stage','teacher-bubble','prev-button','next-button','quiz-panel','progress-summary']) {
    assert.match(html, new RegExp(`id="${id}"`), id);
  }
  assert.match(html, /type="module" src="\.\/js\/app\.js"/);
  assert.doesNotMatch(html, /<script[^>]+https?:\/\//);
});

test('lesson content contains no broken Korean or paid API endpoint', () => {
  const text = JSON.stringify(LESSONS);
  assert.doesNotMatch(text, /由щ|뵫釉|openai|anthropic|api\.elevenlabs/i);
});

test('voice tools use browser capabilities without network calls', () => {
  const files = ['js/speech.js', 'js/recorder.js'].map(file => fs.readFileSync(file, 'utf8')).join('\n');
  assert.doesNotMatch(files, /fetch\(|XMLHttpRequest|WebSocket/);
  const html = fs.readFileSync('index.html', 'utf8');
  assert.match(html, /id="speech-status"/);
  assert.match(html, /id="record-status"/);
});
