// 낭독 영상 묶음 검사:  node scripts/check-vid.js
// vid/<묶음>.js 는 window 를 써서 node 로 바로 돌지 않는다. 여기서 window 를 흉내 내어 읽고 모양을 본다.
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "vid");
const load = f => { const w = {}; new Function("window", fs.readFileSync(f, "utf8"))(w); return w; };

if (!fs.existsSync(DIR)) { console.log("check-vid — vid/ 가 아직 없다 (scripts/find-videos.mjs 를 돌린다)"); process.exit(0); }

const C = load(path.join(ROOT, "catalog.js")).CATALOG;
const known = new Set(C.books.map(b => b[0]));

let books = 0, clips = 0, files = 0;
for (const f of fs.readdirSync(DIR)) {
  assert.ok(/^[A-Z0-9]{3}\.js$/.test(f), `vid/${f} — 묶음 이름은 Book No. 앞 세 글자여야 한다`);
  const tag = f.slice(0, 3);
  const VID = load(path.join(DIR, f)).VID || {};
  files++;
  for (const no of Object.keys(VID)) {
    assert.ok(known.has(no), `vid/${f}: ${no} 는 장서에 없는 Book No.`);
    assert.strictEqual(no.slice(0, 3), tag, `vid/${f}: ${no} 는 이 묶음 것이 아니다`);
    const list = VID[no];
    assert.ok(Array.isArray(list) && list.length <= 3, `vid/${f}: ${no} 는 영상 세 개까지다`);
    for (const v of list) {
      assert.ok(Array.isArray(v) && v.length === 2, `vid/${f}: ${no} 의 영상은 [번호, 제목] 이어야 한다`);
      assert.ok(/^[\w-]{11}$/.test(v[0]), `vid/${f}: ${no} 의 영상 번호가 이상하다 — ${v[0]}`);
    }
    books++;
    clips += list.length;
  }
}
console.log(`check-vid ok — 묶음 ${files}개 · 조회한 책 ${books}권 · 영상 ${clips}편`);
