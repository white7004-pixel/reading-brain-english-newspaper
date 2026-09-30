// 책 한 권의 "근거"를 모두 모아 온다 — 9단계 콘텐츠를 만들기 전에 반드시 먼저 돌린다.
//   node scripts/book-evidence.mjs S1234
//   node scripts/book-evidence.mjs S1234 --save     (.superpowers/book/S1234.json 으로 저장)
//
// 우리는 이 책을 읽지 않았다. 그래서 무엇을 근거로 썼는지가 콘텐츠보다 중요하다.
// 여기 찍히는 것 밖으로 나가는 문장은 쓰지 않는다. 기억나는 줄거리는 근거가 아니다.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const NO = process.argv[2];
if (!NO) { console.error("쓰는 법: node scripts/book-evidence.mjs <Book No.>  [--save]"); process.exit(1); }

const load = async f => { const w = {}; new Function("window", await readFile(join(ROOT, f), "utf8"))(w); return w; };
const C = (await load("catalog.js")).CATALOG;
const i = C.books.findIndex(b => b[0] === NO);
if (i < 0) { console.error(NO + " — 장서에 없는 Book No."); process.exit(1); }
const b = C.at(i);
const tag = NO.slice(0, 3);

const maybe = async f => existsSync(join(ROOT, f)) ? await load(f) : {};
const ACT = (await maybe("act/" + tag + ".js")).ACT || {};
const VID = (await maybe("vid/" + tag + ".js")).VID || {};
const COV = (await maybe("catalog-covers.js")).CATALOG_COVERS || {};

// 시간 제한이 없으면 오픈라이브러리 한 곳이 응답을 안 줄 때 통째로 멎는다.
const ask = async u => {
  try { const r = await fetch(u, { signal: AbortSignal.timeout(15000) }); return r.ok ? await r.json() : null; }
  catch (e) { return null; }
};
const txt = s => String(s || "").replace(/\s+/g, " ").trim();
const clean = t => String(t || "").replace(/^(?:#\s*\d+\s*[.)\-–]?\s*|\(?\d+\s*[.)\-–]\s*)/, "").trim();
// description 칸에 소개글 대신 책의 겉모양("8 pages : 16 x 23 cm")이 들어 있는 일이 있다. 근거가 아니다.
const realDesc = one => one && one.length >= 40 &&
  !/^\d+\s*(unnumbered\s*)?(p|pages|v\.|volumes)\b/i.test(one) && !/\b\d+\s*x\s*\d+\s*cm\b/i.test(one);

const title = clean(b.title);

// 검색을 넓히면 **전혀 다른 책**이 딸려 온다. 32권에서 H. G. 웰스의 "The Time Machine" 이
// 들어왔고 판정까지 "충분" 으로 뒤집혔다. 제목이 닮지 않은 기록은 받지 않는다.
const key = s => String(s || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/)
  .filter(w => w.length > 2 && ["the", "and", "for", "with", "of", "on", "in"].indexOf(w) < 0);
const mine = key(title);
const sameBook = t => {
  const his = key(t);
  // 시리즈 책은 오픈라이브러리 제목이 "Magic Tree House #4" 인 일이 있다 — 그건 맞는 책이다.
  if (b.series && b.series !== "No series") {
    const ser = key(b.series);
    if (ser.length && ser.every(w => his.indexOf(w) >= 0)) return true;
  }
  if (!mine.length) return true;
  return mine.filter(w => his.indexOf(w) >= 0).length / mine.length >= 0.5;
};

const base = "https://openlibrary.org/search.json?limit=3&fields=key,title,author_name,first_sentence,subject,person,place,number_of_pages_median,first_publish_year&";
// 찾는 길을 여럿 두고, 소개글이 나올 때까지 차례로 넓힌다.
// 시리즈 책은 오픈라이브러리 제목이 "Magic Tree House #4" 처럼 시리즈명+번호라
// 낱권 제목으로는 안 걸리는 일이 잦다.
const queries = ["title=" + encodeURIComponent(title) + "&author=" + encodeURIComponent(b.author || ""),
                 "title=" + encodeURIComponent(title)];
if (b.series && b.series !== "No series") {
  queries.push("q=" + encodeURIComponent(title + " " + b.series));
  queries.push("q=" + encodeURIComponent(b.series + " " + title + " " + (b.author || "")));
}

const ol = [], seenKey = {};
for (const q of queries) {
  if (ol.some(x => x.desc)) break;                    // 소개글을 하나 얻었으면 그만 찾는다
  const d = await ask(base + q);
  for (const h of ((d && d.docs) || []).slice(0, 2)) {
    if (!h.key || seenKey[h.key] || ol.length >= 4) continue;
    seenKey[h.key] = 1;
    if (!sameBook(h.title)) {                         // 제목이 딴판이면 다른 책이다
      console.error("  건너뜀 — 제목이 다르다: " + h.title + " (" + (h.author_name || []).join(", ") + ")");
      continue;
    }
    const row = { key: h.key, title: h.title || "", author: (h.author_name || []).join(", "),
                  first: txt((h.first_sentence || [])[0]), subjects: (h.subject || []).slice(0, 12),
                  people: (h.person || []).slice(0, 8), places: (h.place || []).slice(0, 6),
                  pages: h.number_of_pages_median || 0, year: h.first_publish_year || 0, desc: "" };
    const w = await ask("https://openlibrary.org" + h.key + ".json");
    const D = w && w.description;
    const one = txt(typeof D === "string" ? D : (D && D.value) || "").split(/-{5,}|###/)[0];
    if (realDesc(one)) row.desc = one.slice(0, 1200);
    ol.push(row);
  }
}

const out = {
  no: NO,
  catalog: { title: b.title, cleanTitle: title, author: b.author,
             series: b.series === "No series" ? "" : b.series,
             ar: b.bl, lexile: b.lexile || "", nf: !!b.nf, genre: b.genre, theme: b.theme, award: b.award || "" },
  summary: (ACT[NO] || {}).s || "",                 // 학원 장서 목록의 한 줄 요약 — 가장 믿을 만한 바닥
  questions: (ACT[NO] || {}).q || [],
  cover: COV[NO] ? "https://covers.openlibrary.org/b/id/" + COV[NO] + "-M.jpg" : "",
  videos: (VID[NO] || []).map(v => ({ id: v[0], title: v[1], url: "https://www.youtube.com/watch?v=" + v[0] })),
  openLibrary: ol
};

const strong = !!(out.summary && ol.some(x => x.desc));
out.verdict = strong ? "충분 — 소개글과 요약이 둘 다 있다. 9단계를 쓸 수 있다."
  : out.summary ? "모자람 — 장서 한 줄 요약뿐이다. 워크시트(빈칸)로 두는 편이 낫다."
  : "없음 — 근거가 없다. 만들지 않는다.";

console.log(JSON.stringify(out, null, 1));
console.error("\n판정: " + out.verdict);
if (process.argv.indexOf("--save") >= 0) {
  const dir = join(ROOT, ".superpowers", "book");
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  const p = join(dir, NO + ".json");
  await writeFile(p, JSON.stringify(out, null, 1), "utf8");
  console.error("적었다: " + p);
}
