// 장서 4,820권의 낭독 영상을 유튜브에서 찾아 vid/<묶음>.js 로 쌓는다.
//   node scripts/find-videos.mjs           (중단했다 다시 돌리면 못 찾은 것만 이어서 찾는다)
// 영상을 내려받지 않는다. 유튜브 영상 번호만 적어 두고 화면에서 유튜브가 그대로 재생한다.
// 묶음은 act/ 와 똑같이 Book No. 앞 세 글자다 — 그 책이 든 파일 하나만 받으면 된다.
import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIR = join(ROOT, "vid");
const win = {};
new Function("window", await readFile(join(ROOT, "catalog.js"), "utf8"))(win);
const C = win.CATALOG;

if (!existsSync(DIR)) await mkdir(DIR);

// 이미 찾아 둔 것을 읽어 온다 (다시 돌려도 같은 책을 또 찾지 않는다)
const VID = {};
for (const f of (existsSync(DIR) ? await readdir(DIR) : [])) {
  if (!/^[A-Z0-9]{3}\.js$/.test(f)) continue;
  const w = { window: null };
  new Function("window", await readFile(join(DIR, f), "utf8"))(w);
  Object.assign(VID, w.VID || {});
}
console.error("이미 찾아 둔 책 " + Object.keys(VID).length + "권");
if (process.argv.indexOf("--retry") >= 0) {
  let n0 = 0;
  for (const k of Object.keys(VID)) if (!VID[k].length) { delete VID[k]; n0++; }
  console.error("다시 찾을 책 " + n0 + "권");
}

const tag = no => no.slice(0, 3);
async function saveBundle(t){
  const rows = Object.keys(VID).filter(no => tag(no) === t).sort();
  const body = rows.map(no => 'VID["' + no + '"] = ' + JSON.stringify(VID[no]) + ";").join("\n");
  await writeFile(join(DIR, t + ".js"),
    "// 낭독 영상 — Book No. " + t + " 묶음. scripts/find-videos.mjs 가 유튜브에서 찾아 적었다.\n" +
    "// [영상번호, 제목] 차례로 세 개. 영상은 내려받지 않고 유튜브가 그대로 재생한다.\n" +
    "window.VID = window.VID || {};\nvar VID = window.VID;\n" + body + "\n", "utf8");
}

const UA = { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
             "accept-language": "en-US,en;q=0.9" };
// 장서 목록에 깨져 들어온 제목은 찾지 않는다 (엉뚱한 영상이 걸린다)
// 장서 목록 제목에는 "#06. Afternoon on the Amazon" 처럼 시리즈 번호가 앞에 붙어 있다.
// 그대로 찾으면 빗나가므로 번호를 떼고 찾는다.
const clean = t => String(t || "").replace(/^(?:#\s*\d+\s*[.)\-–]?\s*|\(?\d+\s*[.)\-–]\s*)/, "").trim();
const junk = t => !t || t.length < 4 || t.indexOf("(?)") >= 0 || !/[A-Za-z]{3}/.test(t);

async function search(q){
  // sp=EgIQAQ== : 영상만 (재생목록·채널 빼고)
  const u = "https://www.youtube.com/results?search_query=" + encodeURIComponent(q) + "&sp=EgIQAQ%3D%3D";
  let t;
  try { const r = await fetch(u, { headers: UA }); if (!r.ok) return null; t = await r.text(); }
  catch (e) { return null; }
  const ids = [], seen = {};
  // 영상 번호와 제목이 붙어 나오는 자리만 고른다
  const blocks = t.split('"videoRenderer"').slice(1);
  for (const b of blocks) {
    const id = (b.match(/"videoId":"([\w-]{11})"/) || [])[1];
    if (!id || seen[id]) continue;
    const ti = (b.match(/"title":\{"runs":\[\{"text":"(.*?)"\}\]/) || [])[1] || "";
    if (/"lengthText"/.test(b) === false) continue;            // 생방송은 거른다 (길이가 없다)
    seen[id] = 1;
    ids.push([id, ti.replace(/\\u[\da-fA-F]{4}/g, " ").replace(/\\(.)/g, "$1").trim().slice(0, 70)]);
    if (ids.length >= 3) break;
  }
  return ids;
}

let n = 0, found = 0, miss = 0;
const dirty = new Set();
for (let i = 0; i < C.books.length; i++) {
  const b = C.at(i);
  if (VID[b.no] !== undefined) { if (VID[b.no].length) found++; continue; }
  const title = clean(b.title);
  if (junk(title)) { VID[b.no] = []; dirty.add(tag(b.no)); continue; }

  const got = await search('"' + title + '" read aloud');
  if (got === null) {                                          // 유튜브가 막았거나 그물이 끊겼다
    miss++;
    if (miss >= 8) { console.error("유튜브가 응답하지 않습니다. " + (i + 1) + "번째에서 멈춥니다."); break; }
    await new Promise(r => setTimeout(r, 30000));
    i--; continue;
  }
  miss = 0;
  VID[b.no] = got;
  dirty.add(tag(b.no));
  if (got.length) found++;
  n++;
  if (n % 25 === 0) {
    for (const t of dirty) await saveBundle(t);
    dirty.clear();
    console.error((i + 1) + "/" + C.books.length + " · 영상 있는 책 " + found);
  }
  await new Promise(r => setTimeout(r, 1200));                 // 유튜브에 몰아치지 않는다
}
for (const t of dirty) await saveBundle(t);
console.error("끝. 조회 " + Object.keys(VID).length + "권 중 영상 " + found + "권");
