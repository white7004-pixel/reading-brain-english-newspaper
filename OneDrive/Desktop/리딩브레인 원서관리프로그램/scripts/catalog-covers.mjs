// 장서 4,820권의 표지 번호를 오픈라이브러리에서 찾아 catalog-covers.js 로 쌓는다.
//   node scripts/catalog-covers.mjs          (중단했다 다시 돌리면 못 찾은 것만 이어서 찾는다)
// 그림을 내려받지 않는다. 주소만 가리킨다 (저작권).
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, "catalog-covers.js");
const win = {};
new Function("window", await readFile(join(ROOT, "catalog.js"), "utf8"))(win);
const C = win.CATALOG;

let got = {};
if (existsSync(OUT)) { const w = {}; new Function("window", await readFile(OUT, "utf8"))(w); got = w.CATALOG_COVERS || {}; }

const save = () => writeFile(OUT,
  "// 오픈라이브러리 표지 번호. scripts/catalog-covers.mjs 가 만든다. 그림은 내려받지 않고 주소만 가리킨다.\n" +
  "// 주소: https://covers.openlibrary.org/b/id/<번호>-M.jpg   빈 값은 오픈라이브러리에 표지가 없는 책.\n" +
  "window.CATALOG_COVERS = " + JSON.stringify(got) + ";\n", "utf8");

const hit = d => ((d && d.docs) || []).find(x => x.cover_i);
async function ask(url){
  try { const r = await fetch(url); return r.ok ? await r.json() : null; } catch (e) { return null; }
}
// 제목만으로 찾으면 엉뚱한 책의 표지가 걸린다. 지은이가 있거나 제목이 세 낱말 넘을 때만 찾는다.
// 장서 목록에 깨져 들어온 제목((?) 같은 것)은 아예 찾지 않는다.
const junk = t => !t || t.length < 4 || t.indexOf("(?)") >= 0 || !/[A-Za-z]{3}/.test(t);
async function find(title, author){
  if (junk(title)) return "";
  const base = "https://openlibrary.org/search.json?limit=5&fields=cover_i&";
  const wide = title.trim().split(/\s+/).length >= 3;
  if (!author && !wide) return "";
  let h = author
    ? hit(await ask(base + "title=" + encodeURIComponent(title) + "&author=" + encodeURIComponent(author)))
    : null;
  if (!h && wide) h = hit(await ask(base + "title=" + encodeURIComponent(title)));
  return h ? String(h.cover_i) : "";
}

let n = 0, found = 0;
for (let i = 0; i < C.books.length; i++) {
  const b = C.at(i);
  if (got[b.no] !== undefined) { if (got[b.no]) found++; continue; }
  got[b.no] = await find(b.title, b.author || "");
  if (got[b.no]) found++;
  n++;
  if (n % 25 === 0) { await save(); console.error(`${i + 1}/${C.books.length} · 찾음 ${found}`); }
  await new Promise(r => setTimeout(r, 250));      // 오픈라이브러리에 몰아치지 않는다
}
await save();
console.error(`끝. ${Object.keys(got).length}권 중 표지 ${found}권`);
