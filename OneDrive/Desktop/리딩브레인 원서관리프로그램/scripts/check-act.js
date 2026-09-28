// 간이 학습 활동 파일 검사:  node scripts/check-act.js
// 묶음 파일(act/XXX.js)이 규칙을 지키는지, 장서를 얼마나 덮었는지 본다.
// 아직 안 만든 묶음이 있어도 실패로 보지 않는다 — 만든 것이 옳은지만 본다.
const fs = require("fs"), path = require("path"), assert = require("assert");
const ROOT = path.join(__dirname, "..");
// catalog.js 는 module.exports 가 아니라 window.CATALOG 로만 내보낸다. window 를 흉내 내어 읽는다.
const win0 = {};
new Function("window", fs.readFileSync(path.join(ROOT, "catalog.js"), "utf8"))(win0);
const CATALOG = win0.CATALOG;

const dir = path.join(ROOT, "act");
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith(".js")) : [];
assert.ok(files.length, "act/ 에 묶음 파일이 하나도 없다");

const win = { ACT: {} };
for (const f of files) {
  assert.ok(/^[A-Z0-9]{3}\.js$/.test(f), `묶음 이름은 Book No. 앞 세 글자여야 한다: ${f}`);
  new Function("window", fs.readFileSync(path.join(dir, f), "utf8"))(win);
}
const act = win.ACT;

const ALL = {};
for (let i = 0; i < CATALOG.books.length; i++) ALL[CATALOG.books[i][0]] = CATALOG.books[i];
for (const no of Object.keys(act)) {
  const row = ALL[no];
  assert.ok(row, `장서에 없는 Book No.: ${no}`);
  const a = act[no];
  assert.ok(a.s && a.s.trim(), `${no}: 한 줄 요약이 비었다`);
  assert.ok(Array.isArray(a.q) && a.q.length === 3, `${no}: 질문은 3개여야 한다`);
  assert.ok(Array.isArray(a.h) && a.h.length === 3, `${no}: 도움말 칸도 3개여야 한다`);
  for (const q of a.q) assert.ok(q && q.trim().length >= 5, `${no}: 빈 질문이 있다`);
  if (row[5] >= 2) for (const h of a.h) assert.ok(h && h.trim(), `${no}: AR 2 이상은 한국어 도움말이 있어야 한다`);
}
// 묶음 파일 하나에는 제 앞세글자 책만 들어가야 한다
for (const f of files) {
  const one = { ACT: {} };
  new Function("window", fs.readFileSync(path.join(dir, f), "utf8"))(one);
  for (const no of Object.keys(one.ACT)) assert.equal(no.slice(0, 3), f.slice(0, 3), `${f}: ${no} 는 이 묶음이 아니다`);
}
const done = Object.keys(act).length, total = CATALOG.books.length;
console.log(`check-act ok — ${done}/${total}권 (${(100 * done / total).toFixed(1)}%) · 묶음 ${files.length}개`);
