import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';

fs.mkdirSync('tmp/browser', { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('pageerror', error => errors.push(error.message));

await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
assert.match(await page.locator('body').innerText(), /문법 AI 선생님/);
assert.equal(await page.locator('#book-select option').count(), 3);
await page.selectOption('#book-select', '1');
await page.selectOption('#chapter-select', { index: 0 });
await page.selectOption('#unit-select', { index: 0 });
await page.click('#start-button');
assert.equal(await page.locator('#lesson-stage').isVisible(), true);
assert.equal(await page.locator('#home-view').isVisible(), false);
assert.ok((await page.locator('.skip-link').boundingBox()).y < 0);
assert.match(await page.locator('#unit-title').innerText(), /be동사/);
await page.waitForTimeout(500);
await page.screenshot({ path: 'tmp/browser/mobile-lesson.png', fullPage: true });

for (let step = 0; step < 5; step += 1) await page.click('#next-button');
assert.equal(await page.locator('#quiz-panel').isVisible(), true);
for (let question = 0; question < 3; question += 1) {
  await page.click(`[data-question="${question}"][data-answer="0"]`);
}
await page.click('#finish-quiz');
assert.match(await page.locator('#quiz-panel').innerText(), /3 \/ 3 정답/);
await page.click('#choose-unit');
assert.match(await page.locator('#progress-text').innerText(), /1 \/ 98 단원/);

await page.reload({ waitUntil: 'networkidle' });
assert.match(await page.locator('#progress-text').innerText(), /1 \/ 98 단원/);
assert.equal(await page.locator('#recent-button').isVisible(), true);
assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
desktop.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
desktop.on('pageerror', error => errors.push(error.message));
await desktop.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'tmp/browser/desktop-home.png', fullPage: true });
assert.equal(await desktop.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
await desktop.click('#start-button');
await desktop.emulateMedia({ media: 'print' });
assert.equal(await desktop.locator('.class-layout').evaluate(element => getComputedStyle(element).display), 'none');
assert.equal(await desktop.locator('#print-content').evaluate(element => getComputedStyle(element).display), 'block');
assert.equal(await desktop.locator('#print-content .print-step').count(), 5);
assert.equal(await desktop.locator('#print-content .print-question').count(), 3);
await desktop.screenshot({ path: 'tmp/browser/print-preview.png', fullPage: true });
assert.deepEqual(errors, []);
await browser.close();
console.log('Browser flow passed: mobile lesson, quiz, persistence, desktop layout');
