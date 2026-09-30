// 장서 4,820권의 "근거"를 오픈라이브러리에서 모아 ev/<묶음>.js 로 쌓는다.
//   node scripts/find-evidence.mjs            (중단했다 다시 돌리면 못 찾은 것만 이어서)
//   node scripts/find-evidence.mjs --retry    (아무것도 못 찾은 책만 다시)
//
// 왜 모으는가 — 우리는 이 책들을 읽지 않았다. 학원 장서 목록의 한 줄 요약만으로는
// 9단계 학습 콘텐츠를 만들 수 없고, 지어내면 아이가 책에 없는 것을 읽게 된다.
// 오픈라이브러리가 주는 것은 출판사 소개글·책의 첫 문장·주제어다. 이것은 추측이 아니라 근거다.
// 여기 모인 것만 가지고 콘텐츠를 쓰고, 여기에 없는 것은 쓰지 않는다.
//
// 담는 것:  d 출판사 소개글 · f 책의 첫 문장 · s 주제어 · p 쪽수 · k 오픈라이브러리 work 열쇠
import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIR = join(ROOT, "ev");
const win = {};
new Function("window", await readFile(join(ROOT, "catalog.js"), "utf8"))(win);
const C = win.CATALOG;
if (!existsSync(DIR)) await mkdir(DIR);

const EV = {};
for (const f of await readdir(DIR)) {
  if (!/^[A-Z0-9]{3}\.js$/.test(f)) continue;
  const w = {};
  new Function("window", await readFile(join(DIR, f), "utf8"))(w);
  Object.assign(EV, w.EV || {});
}
console.error("이미 모아 둔 책 " + Object.keys(EV).length + "권");
if (process.argv.indexOf("--retry") >= 0) {
  let n0 = 0;
  for (const k of Object.keys(EV)) if (!EV[k].d && !EV[k].f) { delete EV[k]; n0++; }
  console.error("다시 찾을 책 " + n0 + "권");
}

const tag = no => no.slice(0, 3);
async function saveBundle(t){
  const rows = Object.keys(EV).filter(no => tag(no) === t).sort();
  await writeFile(join(DIR, t + ".js"),
    "// 책의 근거 — Book No. " + t + " 묶음. scripts/find-evidence.mjs 가 오픈라이브러리에서 모았다.\n" +
    "// d 출판사 소개글 · f 책의 첫 문장 · s 주제어 · p 쪽수 · k work 열쇠.\n" +
    "// 여기 없는 것은 우리가 모르는 것이다. 콘텐츠를 쓸 때 이 밖으로 나가지 않는다.\n" +
    "window.EV = window.EV || {};\nvar EV = window.EV;\n" +
    rows.map(no => 'EV["' + no + '"] = ' + JSON.stringify(EV[no]) + ";").join("\n") + "\n", "utf8");
}

// 장서 목록 제목에는 "#06. Afternoon on the Amazon" 처럼 시리즈 번호가 앞에 붙어 있다.
const clean = t => String(t || "").replace(/^(?:#\s*\d+\s*[.)\-–]?\s*|\(?\d+\s*[.)\-–]\s*)/, "").trim();
const junk = t => !t || t.length < 4 || t.indexOf("(?)") >= 0 || !/[A-Za-z]{3}/.test(t);
const ask = async u => { try { const r = await fetch(u); return r.ok ? await r.json() : null; } catch (e) { return null; } };
const txt = s => String(s || "").replace(/\s+/g, " ").trim();

// 소개글에 다른 나라말 설명이 붙어 오는 일이 있다 (----- 뒤). 영어 부분만 남긴다.
function firstDesc(d){
  const s = typeof d === "string" ? d : (d && d.value) || "";
  const one = txt(s.split(/-{5,}|###/)[0]);
  // 오픈라이브러리의 description 칸에는 소개글 대신 책의 겉모양이 들어 있을 때가 있다
  // ("8 pages : 16 x 23 cm"). 그것은 근거가 아니므로 버린다.
  if (!one || one.length < 40) return "";
  if (/^\d+\s*(unnumbered\s*)?(p|pages|v\.|volumes)/i.test(one)) return "";
  if (/\d+\s*x\s*\d+\s*cm/i.test(one)) return "";
  if (/^(ill|illustrations|col\. ill)/i.test(one)) return "";
  return one.slice(0, 900);
}

async function find(title0, author){
  const title = clean(title0);
  if (junk(title)) return null;
  const base = "https://openlibrary.org/search.json?limit=3&fields=key,first_sentence,subject,number_of_pages_median&";
  let d = await ask(base + "title=" + encodeURIComponent(title) +
    (author ? "&author=" + encodeURIComponent(author) : ""));
  let hit = ((d && d.docs) || [])[0];
  if (!hit && author) {                                 // 지은이 이름이 목록과 다를 수 있다
    d = await ask(base + "title=" + encodeURIComponent(title));
    hit = ((d && d.docs) || [])[0];
  }
  if (!hit) return null;
  const out = { k: hit.key || "", d: "", f: txt((hit.first_sentence || [])[0]).slice(0, 300),
                s: (hit.subject || []).slice(0, 10), p: hit.number_of_pages_median || 0 };
  if (hit.key) {
    const w = await ask("https://openlibrary.org" + hit.key + ".json");
    if (w) out.d = firstDesc(w.description);
  }
  return out;
}

let n = 0, withDesc = 0, withFirst = 0;
const dirty = new Set();
for (let i = 0; i < C.books.length; i++) {
  const b = C.at(i);
  if (EV[b.no] !== undefined) { if (EV[b.no].d) withDesc++; if (EV[b.no].f) withFirst++; continue; }
  EV[b.no] = (await find(b.title, b.author || "")) || { k: "", d: "", f: "", s: [], p: 0 };
  dirty.add(tag(b.no));
  if (EV[b.no].d) withDesc++;
  if (EV[b.no].f) withFirst++;
  n++;
  if (n % 25 === 0) {
    for (const t of dirty) await saveBundle(t);
    dirty.clear();
    console.error((i + 1) + "/" + C.books.length + " · 소개글 " + withDesc + " · 첫문장 " + withFirst);
  }
  await new Promise(r => setTimeout(r, 300));           // 오픈라이브러리에 몰아치지 않는다
}
for (const t of dirty) await saveBundle(t);
console.error("끝. " + Object.keys(EV).length + "권 중 소개글 " + withDesc + " · 첫문장 " + withFirst);
