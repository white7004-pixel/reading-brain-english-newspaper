// books/cards.js 가 책 파일들과 맞는지 본다:  node scripts/test-cards.mjs
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import assert from "node:assert/strict";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const load = async f => { const w = {}; new Function("window", await readFile(join(ROOT, f), "utf8"))(w); return w; };

const { BOOK_CARDS: cards, BOOK_BY_NO: byNo } = await load("books/cards.js");
const slugs = (await load("books/index.js")).BOOKS;

assert.ok(Array.isArray(cards) && cards.length === slugs.length, `카드 수가 책 수와 다르다: ${cards.length} vs ${slugs.length}`);
for (const slug of slugs) {
  const B = (await load(`books/${slug}.js`)).BOOK;
  const c = cards.find(x => x.slug === slug);
  assert.ok(c, `${slug}: 카드가 없다`);
  assert.equal(c.title, B.title, `${slug}: 제목이 다르다`);
  assert.equal(c.level.ar, B.level.ar, `${slug}: AR 이 다르다`);
  assert.equal(c.cover, B.cover || "", `${slug}: 표지가 다르다`);
  if (B.bookNo) assert.equal(byNo[B.bookNo], slug, `${slug}: Book No. ${B.bookNo} 가 엉뚱한 곳을 가리킨다`);
}
for (const [no, slug] of Object.entries(byNo)) assert.ok(slugs.includes(slug), `BOOK_BY_NO 의 ${no} → ${slug} 가 없는 책이다`);
const size = (await readFile(join(ROOT, "books/cards.js"))).length;
assert.ok(size <= 100 * 1024, `books/cards.js 가 100KB 를 넘는다: ${size}`);
console.log(`cards.js ok — 카드 ${cards.length}장 · Book No. ${Object.keys(byNo).length}개 · ${(size / 1024).toFixed(0)}KB`);
