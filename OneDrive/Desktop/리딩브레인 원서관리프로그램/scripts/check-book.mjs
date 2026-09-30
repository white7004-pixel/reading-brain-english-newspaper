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
  // A갈래(9단계) 책은 관문을 지난 기록이 있어야 한다. 없으면 만들다 만 책이다.
  if (B.evidence) {
    const e = B.evidence;
    assert.ok(Array.isArray(e.characters) && e.characters.length >= 1, `${slug}: evidence.characters 가 비었다`);
    // 근거가 한 줄 요약뿐인 책(31권처럼 소개글이 없는 책)은 두 마디밖에 못 뽑고,
    // 요약 한 줄이 긴 책(35권)은 네 마디가 나온다. 억지로 맞추면 지어내거나 버리게 된다.
    // 근거가 주는 만큼 받는다 — 둘에서 넷.
    assert.ok(Array.isArray(e.beats) && e.beats.length >= 2 && e.beats.length <= 4,
      `${slug}: evidence.beats 는 사건 두~네 마디여야 한다 (${(e.beats || []).length})`);
    assert.ok(e.ending && e.ending.trim(), `${slug}: evidence.ending 이 비었다`);
    assert.ok(e.checked && e.checked.trim(), `${slug}: 확인한 쪽의 기록(evidence.checked)이 없다`);
    assert.ok((B.quiz || []).length >= 10, `${slug}: A갈래는 퀴즈가 10문제 이상이어야 한다 (${(B.quiz || []).length})`);
    assert.ok(B.vocabulary.length >= 8, `${slug}: A갈래는 낱말이 8개 이상이어야 한다 (${B.vocabulary.length})`);
    assert.ok(B.comprehension && B.summaryMap && B.mindMap && B.essay && B.teaching,
      `${slug}: A갈래는 독해·요약지도·마인드맵·독후논술·교사용이 다 있어야 한다`);
    for (const v of B.vocabulary) assert.ok(v.word && v.ko, `${slug}: 낱말에 word·ko 가 있어야 한다`);
  }
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
  // 새 책은 표지를 내려받지 않고 오픈라이브러리 주소를 가리킨다 (저작권). 지금 14권은 내려받은 것을 그대로 둔다.
  if (B.cover) assert.ok(/^(assets\/covers\/|https:\/\/covers\.openlibrary\.org\/b\/id\/)/.test(B.cover),
    `${slug}: 표지는 assets/covers/ 이거나 covers.openlibrary.org 주소여야 한다 — ${B.cover}`);

  console.log(`${slug} ok — 단어 ${B.vocabulary.length} · 퀴즈 ${(B.quiz || []).length}${B.phonics ? " · 파닉스 " + B.phonics.families.length + "묶음" : ""}${eb ? " · E북 " + eb.pages + "쪽" : ""}`);
}
