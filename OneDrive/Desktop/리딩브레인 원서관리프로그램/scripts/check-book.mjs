// 책 파일 검사:  node scripts/check-book.mjs [slug ...]   (안 적으면 books/index.js 의 전부)
// books/*.js 는 window 를 써서 node 로 바로 돌지 않는다. 여기서 window 를 흉내 내어 읽고 모양을 본다.
// 파닉스 책은 families 의 낱말이 단어장에 다 있는지, E북 쪽 수가 실제 그림 수와 맞는지도 본다.
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const load = async f => { const w = {}; new Function("window", await readFile(join(ROOT, f), "utf8"))(w); return w; };
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : (await load("books/index.js")).BOOKS;

for (const slug of slugs) {
  const B = (await load(`books/${slug}.js`)).BOOK;
  assert.ok(B && B.slug === slug, `${slug}: slug 가 파일 이름과 다르다`);
  assert.ok(B.title && B.author && B.level && B.level.ar, `${slug}: 제목·저자·AR 이 있어야 한다`);
  assert.ok(Array.isArray(B.vocabulary) && B.vocabulary.length, `${slug}: 단어장이 비었다`);
  for (const q of B.quiz || []) assert.ok(q.a && q.a.length === 4 && q.a[q.c] != null, `${slug}: 퀴즈 보기는 4개, 정답 번호는 그 안: ${q.q}`);
  if (B.phonics) {
    const words = new Set(B.vocabulary.map(v => v.word));
    const fam = B.phonics.families.flatMap(f => f.words);
    assert.ok(fam.length >= 8, `${slug}: 파닉스 낱말이 너무 적다 (${fam.length})`);
    for (const w of fam) assert.ok(words.has(w), `${slug}: 파닉스 낱말 ${w} 가 단어장에 없다`);
    for (const f of B.phonics.families) for (const w of f.words) assert.ok(w.endsWith(f.rime.slice(1)), `${slug}: ${w} 는 ${f.rime} 로 끝나지 않는다`);
  }
  const eb = B.shadowing && B.shadowing.ebook;
  if (eb) {
    const files = new Set(await readdir(join(ROOT, eb.dir)));
    for (let p = 1; p <= eb.pages; p++) assert.ok(files.has(`p${String(p).padStart(2, "0")}.jpg`), `${slug}: E북 ${p}쪽 그림이 없다`);   // 0쪽(표지)은 B.cover 로 대신해도 된다
    for (const it of B.shadowing.audio || []) for (const p of it.pages || []) assert.ok(p <= eb.pages, `${slug}: ${it.title} 의 쪽 ${p} 은 책 밖`);
  }
  console.log(`${slug} ok — 단어 ${B.vocabulary.length} · 퀴즈 ${(B.quiz || []).length}${B.phonics ? " · 파닉스 " + B.phonics.families.length + "묶음" : ""}${eb ? " · E북 " + eb.pages + "쪽" : ""}`);
}
