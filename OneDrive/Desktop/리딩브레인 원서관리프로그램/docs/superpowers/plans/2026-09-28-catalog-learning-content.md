# 장서 4,820권 학습 콘텐츠 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 서재에만 있던 4,820권을 전부 밖으로 꺼낸다 — 모든 책에 간이 학습(B), 내용을 확실히 아는 책에 9단계 학습(A).

**Architecture:** 첫 화면은 무거운 책 파일 대신 `books/cards.js` 한 장을 읽는다. 모든 책은 `read.html?no=<Book No.>` 로 열리고, 질문은 Book No. 앞 두 글자로 쪼갠 `act/<XX>.js` 에 굳혀 둔다. 9단계 학습은 두 번 따로 확인한 책만 `books/<slug>.js` 로 만든다.

**Tech Stack:** 정적 HTML + 바닐라 ES5/ES6, 빌드 도구 없음. Node 스크립트는 ESM(`.mjs`). 검사는 `node:assert/strict` 와 `npm test`.

**Spec:** `docs/superpowers/specs/2026-09-28-catalog-learning-content-design.md`
보조 명세(B갈래): `docs/superpowers/specs/2026-09-21-simple-activities-design.md`

## Global Constraints

- **`git add -A` · `git add .` 금지.** git 뿌리가 `C:/Users/white` (집 폴더 전체)다. 언제나 파일 경로를 하나하나 적는다.
- **푸시 금지.** origin 저장소는 공개이고 이 가지는 올린 적이 없다. 원장이 직접 말하기 전에는 push·PR 하지 않는다.
- **옛 브라우저 문법 금지:** `?.` · `??` · `(?<` 를 쓰지 않는다 (카카오톡 안 브라우저에서 화면 전체가 멎은 적이 있다).
- **브라우저 API 를 맨 위에서 부르지 않는다** (`speechSynthesis` · `SpeechRecognition` · `mediaDevices` · `clipboard`). 쓰는 자리에서 `if` 로 감싼다.
- **표지 그림을 내려받아 보관하지 않는다.** `https://covers.openlibrary.org/b/id/<번호>-M.jpg` 주소만 가리킨다.
- **키를 브라우저에 넣지 않는다.** `config.js` 에는 Supabase anon 키만 있다.
- 새 화면의 첫 줄은 `RB.gate();`, 스크립트 차례는 `config.js → store.js → <자료>.js`.
- 책 파일의 모양(`window.BOOK = {...}`)을 바꾸지 않는다. 새 칸은 `evidence` 하나뿐.
- `store.js` · `report.js` · `app.css` · `vercel.json` 은 손대지 않는다.
- 커밋 메시지 끝에 `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.

---

### Task 1: 가벼운 책 목록 — `books/cards.js`

첫 화면이 `books/<slug>.js` 를 전부 하나씩 내려받는 것을 끊는다. 15권 488KB 가 300권이면 9MB 가 된다.

**Files:**
- Create: `scripts/make-cards.mjs`
- Create: `books/cards.js` (스크립트가 만든다 — 손으로 고치지 않는다)
- Modify: `index.html:166` (`books/index.js` → `books/cards.js`), `index.html:186-193` (`load()` 삭제), `index.html:236-244` (목록 채우는 곳)
- Modify: `library.html:72` 근처 (손으로 적은 `BOOK_BY_NO` 블록 삭제 후 `books/cards.js` 를 읽는다)
- Modify: `package.json:6` (`npm test` 에 `--check` 잇기)

**Interfaces:**
- Consumes: `books/index.js` 의 `window.BOOKS` (문자열 배열), `books/<slug>.js` 의 `window.BOOK`
- Produces:
  - `books/cards.js` → `window.BOOK_CARDS` = `[{ slug, title, author, series, level: { ar, lexile, rb }, cover, awards }]`, `window.BOOK_BY_NO` = `{ "<bookNo>": "<slug>" }`
  - `node scripts/make-cards.mjs` 는 파일을 쓴다. `node scripts/make-cards.mjs --check` 는 파일이 낡았으면 1 로 끝난다.

**카드 모양을 책 파일과 같은 중첩(`level.ar`)으로 두는 까닭:** `index.html` 의 `card()` · `lvOf()` 가 이미 `b.level.ar` 를 읽는다. 평평하게 펴면 그 코드를 전부 고쳐야 하고, 고칠 이유가 없다.

- [ ] **Step 1: 실패하는 검사를 먼저 쓴다**

`scripts/test-cards.mjs` 를 만든다:

```js
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
```

- [ ] **Step 2: 돌려서 실패를 본다**

Run: `node scripts/test-cards.mjs`
Expected: FAIL — `books/cards.js` 가 없어서 `ENOENT`

- [ ] **Step 3: `scripts/make-cards.mjs` 를 쓴다**

```js
// 첫 화면용 가벼운 책 목록을 만든다:  node scripts/make-cards.mjs [--check]
// books/*.js 를 읽어 카드에 필요한 것만 추린다. Book No. → slug 표도 여기서 함께 만든다.
// 손으로 적지 않는 까닭: 찰리를 축약본(S2703)에 이어 놓은 적이 있다. 사람이 적으면 반드시 틀린다.
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const load = async f => { const w = {}; new Function("window", await readFile(join(ROOT, f), "utf8"))(w); return w; };

const slugs = (await load("books/index.js")).BOOKS;
const cards = [], byNo = {};
for (const slug of slugs) {
  const B = (await load(`books/${slug}.js`)).BOOK;
  cards.push({
    slug, title: B.title, author: B.author, series: B.series || "",
    level: { ar: B.level.ar, lexile: B.level.lexile || "", rb: B.level.rb || "" },
    cover: B.cover || "", awards: B.awards || [], tier: "A"
  });
  if (B.bookNo) byNo[B.bookNo] = slug;
}
cards.sort((a, b) => parseFloat(a.level.ar) - parseFloat(b.level.ar));   // 쉬운 책부터 — 첫 화면이 그 차례로 그린다

const out = "// 첫 화면용 책 목록. scripts/make-cards.mjs 가 books/*.js 에서 만든다 — 손으로 고치지 않는다.\n"
  + "window.BOOK_CARDS = " + JSON.stringify(cards, null, 1) + ";\n"
  + "// Book No. → slug. 서재에서 [학습하기] 단추를 띄울 때 쓴다.\n"
  + "window.BOOK_BY_NO = " + JSON.stringify(byNo, null, 1) + ";\n";

const dst = join(ROOT, "books", "cards.js");
if (process.argv.includes("--check")) {
  const now = await readFile(dst, "utf8").catch(() => "");
  if (now !== out) { console.error("books/cards.js 가 낡았다. node scripts/make-cards.mjs 를 돌려라."); process.exit(1); }
  console.log(`make-cards --check ok — 카드 ${cards.length}장`);
} else {
  await writeFile(dst, out);
  console.log(`books/cards.js 만듦 — 카드 ${cards.length}장 · Book No. ${Object.keys(byNo).length}개 · ${(out.length / 1024).toFixed(0)}KB`);
}
```

- [ ] **Step 4: 돌려서 만들고 검사가 지나가는지 본다**

Run: `node scripts/make-cards.mjs && node scripts/test-cards.mjs && node scripts/make-cards.mjs --check`
Expected: 셋 다 PASS. 카드 14장.

- [ ] **Step 5: `index.html` 을 cards.js 로 바꾼다**

`index.html:166` 한 줄:

```html
<script src="books/cards.js"></script>
```

`load()` 함수(186–193줄)를 지우고, 맨 아래 `(async () => { ... })();` 블록을 이것으로 바꾼다:

```js
(() => {
  LIST = (window.BOOK_CARDS || []).slice();          // cards.js 가 이미 쉬운 책부터 차례로 담아 둔다
  $("total").textContent = `모두 ${LIST.length}권 · 쉬운 책부터`;
  // 첫 화면 책장: 표지가 적으면 되풀이해서 채운다
  const cv = LIST.filter(b => b.cover);
  $("shelf").innerHTML = cv.length ? Array.from({ length: 7 }, (_, i) => cv[i % cv.length])
    .map(b => `<a href="app.html?book=${encodeURIComponent(b.slug)}" ${cover(b)} title="${esc(b.title)}"></a>`).join("") : "";
  draw();
})();
```

바닥글(162줄)의 안내도 고친다:

```html
<footer>리딩브레인영어학원 · 새 책은 <code>books/</code> 에 파일을 만들고 <code>books/index.js</code> 에 한 줄 더한 뒤 <code>node scripts/make-cards.mjs</code> 를 돌립니다.</footer>
```

- [ ] **Step 6: `library.html` 의 손으로 적은 표를 지운다**

`library.html` 에서 `window.BOOK_BY_NO = {` 로 시작하는 블록 전체(주석 포함)를 지우고, `catalog.js` 를 읽는 `<script>` 줄 바로 뒤에 이 줄을 넣는다:

```html
<script src="books/cards.js"></script>
```

`LIB.open` 안의 `const learn = (window.BOOK_BY_NO || {})[b.no];` 는 그대로 둔다 — 이제 cards.js 가 그 값을 준다.

- [ ] **Step 7: 화면으로 확인한다**

Run: `npm run dev` 뒤 브라우저로 `index.html` 과 `library.html` 을 연다.
Expected:
- `index.html` — 14권이 모두 뜨고, 단계 단추의 권수가 예전과 같고, 찾기가 된다. 개발자도구 네트워크 탭에 `books/<slug>.js` 요청이 **하나도 없다**.
- `library.html` — Charlie 를 찾으면 `S4309` 로 뜨고 [학습하기] 단추가 보인다.

- [ ] **Step 8: `npm test` 에 잇는다**

`package.json` 의 `test` 끝에 이어 붙인다:

```
&& node scripts/make-cards.mjs --check && node scripts/test-cards.mjs
```

Run: `npm test`
Expected: PASS

- [ ] **Step 9: 커밋**

```bash
git add scripts/make-cards.mjs scripts/test-cards.mjs books/cards.js index.html library.html package.json
git commit -m "$(cat <<'EOF'
feat(목록): 첫 화면이 책 파일을 전부 받지 않도록 books/cards.js 를 만든다

Book No. → slug 표도 여기서 함께 만든다. 손으로 적어 찰리를 축약본에
이어 놓은 적이 있어 다시는 손으로 적지 않는다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: 간이 학습 화면 — `read.html` 과 활동 파일 틀

서재의 4,820권이 밖으로 나오는 길. 9단계가 없는 책도 아이가 읽고 나서 할 것이 생긴다.

**Files:**
- Create: `read.html`
- Create: `scripts/check-act.js`
- Create: `scripts/act-brief.mjs` (묶음 하나의 책 목록을 파일로 뽑아 준다 — Task 3 이 쓴다)
- Create: `act/M00.js` (첫 묶음. 실제 질문을 쓴다)
- Modify: `library.html` — 상세 패널에 [읽고 나서 →] 단추
- Modify: `package.json` — `npm test` 에 `check-act` 잇기

**Interfaces:**
- Consumes: `catalog.js` 의 `window.CATALOG` (`CATALOG.at(i)` → `{ i, no, title, series, author, lexile, bl, nf, genre, theme, award, cover }`), `store.js` 의 `RB.gate()` · `RB.load` · `RB.save` · `RB.chip`
- Produces:
  - `act/<XX>.js` → `window.ACT[<Book No.>] = { s: "한 줄 요약", q: ["","",""], h: ["","",""] }` (`XX` 는 Book No. 앞 두 글자)
  - `read.html?no=<Book No.>` — 아이가 답을 적고 저장하는 화면. 저장 키 `rbact:<이름>`
  - `node scripts/act-brief.mjs <XX>` → `.superpowers/act/<XX>.json` 에 그 묶음 책 목록을 쓰고 경로를 찍는다
  - `node scripts/check-act.js` — 묶음 파일들 검사

- [ ] **Step 1: 실패하는 검사를 먼저 쓴다**

`scripts/check-act.js`:

```js
// 간이 학습 활동 파일 검사:  node scripts/check-act.js
// 묶음 파일(act/XX.js)이 규칙을 지키는지, 장서를 얼마나 덮었는지 본다.
// 아직 안 만든 묶음이 있어도 실패로 보지 않는다 — 만든 것이 옳은지만 본다.
const fs = require("fs"), path = require("path"), assert = require("assert");
const ROOT = path.join(__dirname, "..");
const CATALOG = (() => { const m = { exports: {} }; // catalog.js 는 node 에서 require.main 검사를 하므로 빈 채로 불러온다
  new Function("module", "require", fs.readFileSync(path.join(ROOT, "catalog.js"), "utf8"))(m, () => ({}));
  return m.exports.CATALOG || global.CATALOG; })();

const dir = path.join(ROOT, "act");
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith(".js")) : [];
assert.ok(files.length, "act/ 에 묶음 파일이 하나도 없다");

const win = { ACT: {} };
for (const f of files) {
  assert.ok(/^[A-Z0-9]{2}\.js$/.test(f), `묶음 이름은 Book No. 앞 두 글자여야 한다: ${f}`);
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
// 묶음 파일 하나에는 제 앞두글자 책만 들어가야 한다
for (const f of files) {
  const one = { ACT: {} };
  new Function("window", fs.readFileSync(path.join(dir, f), "utf8"))(one);
  for (const no of Object.keys(one.ACT)) assert.equal(no.slice(0, 2), f.slice(0, 2), `${f}: ${no} 는 이 묶음이 아니다`);
}
const done = Object.keys(act).length, total = CATALOG.books.length;
console.log(`check-act ok — ${done}/${total}권 (${(100 * done / total).toFixed(1)}%) · 묶음 ${files.length}개`);
```

- [ ] **Step 2: 돌려서 실패를 본다**

Run: `node scripts/check-act.js`
Expected: FAIL — `act/ 에 묶음 파일이 하나도 없다`

- [ ] **Step 3: 묶음 브리프 스크립트를 쓴다**

`scripts/act-brief.mjs`:

```js
// 묶음 하나의 책 목록을 파일로 뽑는다:  node scripts/act-brief.mjs M0
// 질문을 쓰는 사람(서브에이전트)이 이 파일 하나만 읽으면 되도록 요약까지 붙여 준다.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const pre = (process.argv[2] || "").toUpperCase();
if (!/^[A-Z0-9]{2}$/.test(pre)) { console.error("쓰는 법: node scripts/act-brief.mjs <앞두글자>"); process.exit(1); }

const run = async (f, name) => { const g = {}; new Function("window", await readFile(join(ROOT, f), "utf8")).call(g, g); return g[name]; };
const C = await run("catalog.js", "CATALOG");
const SUM = await run("catalog-sum.js", "CATALOG_SUM");

const rows = [];
for (let i = 0; i < C.books.length; i++) {
  const b = C.books[i];
  if (b[0].slice(0, 2) !== pre) continue;
  rows.push({ no: b[0], title: b[1], series: C.series[b[2]], author: b[3], lexile: b[4], bl: b[5],
              nf: !!b[6], genre: C.genre[b[7]], theme: C.theme[b[8]], award: b[9], sum: SUM[i] || "" });
}
const out = join(ROOT, ".superpowers", "act", pre + ".json");
await mkdir(join(ROOT, ".superpowers", "act"), { recursive: true });
await writeFile(out, JSON.stringify(rows, null, 1));
console.log(`${out}  ${rows.length}권`);
```

Run: `node scripts/act-brief.mjs M0`
Expected: `.superpowers/act/M0.json` 이 생기고 권수가 찍힌다.

- [ ] **Step 4: 첫 묶음 `act/M00.js` 의 질문을 쓴다**

`node scripts/act-brief.mjs M0` 이 뽑아 준 책들에 대해 질문을 쓴다. 파일 모양:

```js
// 간이 학습 질문 — Book No. M0 묶음. 사람이 아니라 AI 가 한 번 쓰고 굳힌 파일이다.
window.ACT = window.ACT || {};
ACT["M0001"] = { s: "This book introduces different jobs around us. ( a / am / I )",
  q: ["이 책에 나온 직업 중에 가장 해 보고 싶은 것은 무엇인가요?",
      "그 일을 하는 사람을 가까이에서 본 적이 있나요? 어디에서 보았나요?",
      "내가 어른이 되면 하고 싶은 일을 한 가지 적어 보세요."],
  h: ["", "", ""] };
```

**질문을 쓰는 규칙 (이 설계에서 품질을 지키는 유일한 장치):**
- `s` 는 `.superpowers/act/<XX>.json` 의 `sum` 을 **그대로** 옮긴다. 고쳐 쓰지 않는다.
- **줄거리를 아는 척하지 않는다.** 요약이 보장하는 사실 안에서만 묻는다.
  - 좋음: "이 책에 나오는 날씨 중에 가장 좋아하는 건 뭐였나요?" (요약이 '날씨를 소개한다'고 말한다)
  - 나쁨: "주인공이 비 오는 날 무엇을 했나요?" (요약에 그런 말이 없다)
- **벌은 `bl`(AR)로 정한다.** 저장하지 않는다.
  - `bl < 2` → 질문 3개가 모두 **한국어**, `h` 는 `["", "", ""]`
  - `2 <= bl < 4` → 질문은 **영어 한 문장**, `h` 는 그 질문의 **한국어 뜻**
  - `bl >= 4` → 질문은 **영어 서술형**(한 문단을 요구), `h` 는 **한국어 뜻**
- 질문은 세 개가 서로 다른 것을 묻는다: ① 책에서 고르기 ② 내 경험과 잇기 ③ 내 생각 쓰기

- [ ] **Step 5: 검사를 돌린다**

Run: `node scripts/check-act.js`
Expected: PASS — `check-act ok — <M0 권수>/4820권 ...`

- [ ] **Step 6: `read.html` 을 만든다**

```html
<!doctype html><html lang="ko"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>읽고 나서 · 리딩브레인</title>
<link rel="stylesheet" href="app.css">
</head><body>
<div class="top"><a class="btn ghost" href="library.html">← 서재</a><span id="chip"></span></div>
<main class="wrap" id="main"><p class="sub">불러오는 중…</p></main>
<script src="config.js"></script>
<script src="store.js"></script>
<script src="catalog.js"></script>
<script>
RB.gate();
RB.chip(document.getElementById("chip"));
const esc = s => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const $ = id => document.getElementById(id);
const NO = new URLSearchParams(location.search).get("no") || "";
const WHO = RB.who();
const KEY = "rbact:" + WHO;
const idx = CATALOG.books.findIndex(b => b[0] === NO);

// 활동 파일은 Book No. 앞 두 글자로 쪼개 둔다. 그 책이 든 묶음 하나만 받는다.
function loadAct(done){
  const tag = document.createElement("script");
  tag.src = "act/" + NO.slice(0, 2) + ".js";
  tag.onload = tag.onerror = done;
  document.head.appendChild(tag);
}

function draw(){
  const b = CATALOG.at(idx);
  const a = (window.ACT || {})[NO];
  const all = RB.load(KEY) || {};
  const mine = all[NO] || { star: 0, date: "", a: ["", "", ""], note: "", words: "" };
  if (!a){
    $("main").innerHTML = `<h1 class="h">${esc(b.title)}</h1>
      <p class="sub">이 책은 아직 활동이 준비되지 않았습니다.</p>`;
    return;
  }
  $("main").innerHTML = `
    <h1 class="h">${esc(b.title)}</h1>
    <p class="sub">${esc(b.author)}${b.series === "No series" ? "" : " · " + esc(b.series)}</p>
    <div class="row" style="gap:6px; flex-wrap:wrap; margin:6px 0 10px">
      <span class="count">AR ${b.bl.toFixed(1)}</span><span class="count">Lexile ${esc(b.lexile)}</span>
      <span class="count">${b.nf ? "논픽션" : "픽션"}</span><span class="count">${esc(b.genre)}</span>
      <span class="count">${esc(b.theme)}</span>${b.award ? `<span class="count">🏅 ${esc(b.award)}</span>` : ""}
    </div>
    <div class="rpcom">${esc(a.s)}</div>
    <div class="box"><h2>별점</h2>
      <div class="row" id="stars">${[1,2,3,4,5].map(n =>
        `<button class="btn ghost" data-n="${n}">${n <= mine.star ? "★" : "☆"}</button>`).join("")}</div>
      <label>읽은 날 <input type="date" id="date" value="${esc(mine.date)}"></label>
    </div>
    ${a.q.map((q, i) => `<div class="box"><h2>${i + 1}. ${esc(q)}</h2>
      ${a.h[i] ? `<p class="sub">${esc(a.h[i])}</p>` : ""}
      <textarea id="a${i}" rows="3">${esc(mine.a[i] || "")}</textarea></div>`).join("")}
    <div class="box"><h2>한 줄 감상</h2><textarea id="note" rows="2">${esc(mine.note)}</textarea></div>
    <div class="box"><h2>새로 안 낱말</h2><textarea id="words" rows="2">${esc(mine.words)}</textarea></div>
    <div class="row"><button class="btn on" id="save">저장</button><span id="msg" class="sub"></span></div>`;

  let star = mine.star;
  $("stars").querySelectorAll("button").forEach(x => x.onclick = () => {
    star = +x.dataset.n;
    $("stars").querySelectorAll("button").forEach(y => y.textContent = +y.dataset.n <= star ? "★" : "☆");
  });
  $("save").onclick = () => {
    const now = RB.load(KEY) || {};
    now[NO] = { star: star, date: $("date").value, a: a.q.map((_, i) => $("a" + i).value),
                note: $("note").value, words: $("words").value };
    RB.save(KEY, now);
    $("msg").textContent = "저장했습니다.";
  };
}

if (idx < 0) $("main").innerHTML = `<p class="sub">책을 찾지 못했습니다. <a href="library.html">서재로</a></p>`;
else loadAct(draw);
</script></body></html>
```

`RB.who()` 가 없으면 `store.js` 가 쓰는 이름 키(`rb1:who`)를 읽는 방법을 그대로 따른다 — `store.js` 를 고치지 않는다.

- [ ] **Step 7: 서재에 [읽고 나서 →] 단추를 단다**

`library.html` 의 `LIB.open` 안, [학습하기] 줄 바로 뒤에 한 줄 넣는다:

```js
      <a class="btn" href="read.html?no=${encodeURIComponent(b.no)}">읽고 나서 →</a>
```

- [ ] **Step 8: 화면으로 확인한다**

Run: `npm run dev` 뒤 `library.html` 에서 `M0001` 을 찾아 열고 [읽고 나서 →] 를 누른다.
Expected: 별점·읽은 날·질문 3개·감상·낱말 칸이 뜨고, 적고 저장한 뒤 새로고침해도 그대로 남는다. 네트워크 탭에 `act/M0.js` 하나만 받는다(`catalog-sum.js` 는 받지 않는다).

- [ ] **Step 9: `npm test` 에 잇고 커밋**

`package.json` 의 `test` 끝에 ` && node scripts/check-act.js` 를 붙인다.

Run: `npm test`
Expected: PASS

```bash
git add read.html act/M00.js scripts/check-act.js scripts/act-brief.mjs library.html package.json
git commit -m "$(cat <<'EOF'
feat(간이학습): 서재의 모든 책이 밖으로 나오는 read.html 과 활동 파일 틀

질문은 Book No. 앞 두 글자로 쪼개 굳힌다. 화면은 그 묶음 하나만 받는다.
줄거리를 아는 척하는 질문을 쓰지 않는 것이 이 갈래의 유일한 품질 장치다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: 장서 전체의 활동 파일 — 나머지 묶음

4,820권을 빠짐없이 덮는다. 컨트롤러가 묶음을 서브에이전트에 나눠 보낸다.

**Files:**
- Create: `act/<XX>.js` × 남은 묶음 전부
- Modify: 없음

**Interfaces:**
- Consumes: Task 2 의 `node scripts/act-brief.mjs <XX>` → `.superpowers/act/<XX>.json`, `node scripts/check-act.js`
- Produces: `act/<XX>.js` — Task 2 가 정한 모양과 규칙 그대로

- [ ] **Step 1: 묶음 목록을 뽑는다**

```bash
node -e "const fs=require('fs');const m={exports:{}};new Function('module','require',fs.readFileSync('catalog.js','utf8'))(m,()=>({}));const C=m.exports.CATALOG||global.CATALOG;const g={};for(const b of C.books){const p=b[0].slice(0,2);g[p]=(g[p]||0)+1}const e=Object.entries(g).sort((a,b)=>b[1]-a[1]);console.log(e.map(x=>x[0]+':'+x[1]).join(' '));console.log('묶음',e.length,'권',C.books.length)"
```

Expected: 묶음 이름과 권수가 찍힌다.

- [ ] **Step 2: 견본 세 묶음을 먼저 만든다**

세 벌이 다 보이도록 고른다 — AR 2 미만이 많은 묶음 하나, AR 2~4 하나, AR 4 이상 하나. 각 묶음마다:

```bash
node scripts/act-brief.mjs <XX>
```

찍힌 경로를 서브에이전트에 넘기고, **Task 2 Step 4 의 질문 규칙을 그대로 지시문에 옮겨 적어** `act/<XX>.js` 하나를 직접 쓰게 한다. **결과를 돌려받지 않는다** — 파일만 쓰게 한다.

- [ ] **Step 3: 견본을 검사하고 원장께 보인다**

Run: `node scripts/check-act.js`
Expected: PASS

원장께 세 묶음에서 열 권씩 골라 질문을 보여 드리고 승인을 받는다. 승인 전에는 나머지를 돌리지 않는다.

- [ ] **Step 4: 나머지 묶음을 돌린다**

한 번에 서브에이전트 셋까지. 이미 있는 `act/<XX>.js` 는 건너뛴다. 중간에 끊겨도 만든 파일은 남는다.

- [ ] **Step 5: 전부 덮였는지 확인한다**

Run: `node scripts/check-act.js`
Expected: `check-act ok — 4820/4820권 (100.0%)`

- [ ] **Step 6: 커밋**

묶음이 늘 때마다 나누어 커밋한다.

```bash
git add act/
git commit -m "$(cat <<'EOF'
feat(간이학습): 장서 4,820권 활동 파일

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: 아는 척을 막는 관문과 9단계 책 검사

9단계 학습(A갈래)을 만들기 전에, 아는 척한 책이 들어오지 못하게 하는 검사를 먼저 세운다.

**Files:**
- Modify: `scripts/check-book.mjs` (지금 33줄)
- Create: `scripts/check-syntax.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `books/<slug>.js` 의 `window.BOOK`
- Produces: `node scripts/check-book.mjs [slug ...]` 가 A갈래 조건을 함께 본다. `node scripts/check-syntax.mjs` 가 옛 브라우저 문법을 막는다.

**`evidence` 의 모양 — 이 칸이 관문의 기록이다:**

```js
  evidence: {
    by: "만든 쪽이 아는 것",
    characters: ["Brother Bear", "Sister Bear", "Papa Bear", "Mama Bear"],
    beats: ["새 이웃이 이사 온다", "자매가 텃세를 부린다", "함께 놀며 친구가 된다"],
    ending: "둘이 친구가 되어 함께 논다",
    checked: "확인한 쪽이 제목·저자만 받고 따로 적은 것이 위와 같았다 (2026-09-28)"
  },
```

- [ ] **Step 1: 실패하는 검사를 먼저 쓴다**

`scripts/check-book.mjs` 의 `for` 안, `B.phonics` 블록 **앞에** 넣는다:

```js
  // A갈래(9단계) 책은 관문을 지난 기록이 있어야 한다. 없으면 만들다 만 책이다.
  if (B.evidence) {
    const e = B.evidence;
    assert.ok(Array.isArray(e.characters) && e.characters.length >= 1, `${slug}: evidence.characters 가 비었다`);
    assert.ok(Array.isArray(e.beats) && e.beats.length === 3, `${slug}: evidence.beats 는 사건 세 마디여야 한다`);
    assert.ok(e.ending && e.ending.trim(), `${slug}: evidence.ending 이 비었다`);
    assert.ok(e.checked && e.checked.trim(), `${slug}: 확인한 쪽의 기록(evidence.checked)이 없다`);
    assert.ok((B.quiz || []).length >= 10, `${slug}: A갈래는 퀴즈가 10문제 이상이어야 한다 (${(B.quiz || []).length})`);
    assert.ok(B.vocabulary.length >= 8, `${slug}: A갈래는 낱말이 8개 이상이어야 한다 (${B.vocabulary.length})`);
    assert.ok(B.comprehension && B.summaryMap && B.mindMap && B.essay && B.teaching,
      `${slug}: A갈래는 독해·요약지도·마인드맵·독후논술·교사용이 다 있어야 한다`);
    for (const v of B.vocabulary) assert.ok(v.word && v.ko, `${slug}: 낱말에 word·ko 가 있어야 한다`);
  }
```

그리고 표지 검사를 `console.log` 앞에 넣는다:

```js
  // 새 책은 표지를 내려받지 않고 오픈라이브러리 주소를 가리킨다 (저작권). 지금 14권은 내려받은 것을 그대로 둔다.
  if (B.cover) assert.ok(/^(assets\/covers\/|https:\/\/covers\.openlibrary\.org\/b\/id\/)/.test(B.cover),
    `${slug}: 표지는 assets/covers/ 이거나 covers.openlibrary.org 주소여야 한다 — ${B.cover}`);
```

- [ ] **Step 2: 돌려서 지금 14권이 지나가는지 본다**

Run: `node scripts/check-book.mjs`
Expected: PASS — 14권 모두 ok (아직 `evidence` 가 없으므로 그 블록은 건너뛴다)

- [ ] **Step 3: 관문이 실제로 무는지 확인한다**

임시로 `books/hi-fly-guy.js` 끝의 `window.BOOK` 객체에 `evidence: { characters: ["Buzz"], beats: ["a"], ending: "", checked: "" },` 를 넣고 돌린다.

Run: `node scripts/check-book.mjs hi-fly-guy`
Expected: FAIL — `evidence.beats 는 사건 세 마디여야 한다`

확인한 뒤 그 줄을 **지운다**.

- [ ] **Step 4: 옛 브라우저 문법 검사를 만든다**

`scripts/check-syntax.mjs`:

```js
// 옛 브라우저(카카오톡 안 브라우저)에서 멎는 문법이 들어왔는지 본다:  node scripts/check-syntax.mjs
// ?. ?? (?<  이 셋이 화면 전체를 멎게 한 적이 있다. 주석과 글자열 안까지는 가리지 않는다 — 걸리면 사람이 본다.
import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SKIP = new Set(["node_modules", ".git", "out", "assets", "assets-orig", "docs", ".superpowers", "supabase"]);
const BAD = [[/\?\./g, "?."], [/\?\?/g, "??"], [/\(\?</g, "(?<"]];

const walk = async d => {
  const out = [];
  for (const f of await readdir(d, { withFileTypes: true })) {
    if (SKIP.has(f.name)) continue;
    const p = join(d, f.name);
    if (f.isDirectory()) out.push(...await walk(p));
    else if ([".js", ".html", ".mjs"].includes(extname(f.name))) out.push(p);
  }
  return out;
};

let bad = 0;
for (const p of await walk(ROOT)) {
  const lines = (await readFile(p, "utf8")).split("\n");
  lines.forEach((line, i) => {
    for (const [re, name] of BAD) {
      re.lastIndex = 0;
      if (re.test(line)) { console.error(`${p.slice(ROOT.length)}:${i + 1}  ${name}  ${line.trim().slice(0, 80)}`); bad++; }
    }
  });
}
if (bad) { console.error(`옛 브라우저에서 멎는 문법 ${bad}군데`); process.exit(1); }
console.log("check-syntax ok — ?. ?? (?< 없음");
```

- [ ] **Step 5: 돌린다**

Run: `node scripts/check-syntax.mjs`
Expected: PASS. 걸리는 곳이 있으면 그 자리를 옛 문법으로 고친다 (`a?.b` → `a && a.b`, `a ?? b` → `a != null ? a : b`).

- [ ] **Step 6: `npm test` 에 잇고 커밋**

`package.json` 의 `test` 끝에 ` && node scripts/check-syntax.mjs` 를 붙인다.

Run: `npm test`
Expected: PASS

```bash
git add scripts/check-book.mjs scripts/check-syntax.mjs package.json
git commit -m "$(cat <<'EOF'
feat(검사): 9단계 책의 관문 기록(evidence)과 옛 브라우저 문법 검사

아는 척으로 만든 책이 들어오지 못하게 한다. 관문을 지난 기록이 없으면
A갈래가 아니다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: 표지 찾기 — 오픈라이브러리

**Files:**
- Create: `scripts/find-covers.mjs`

**Interfaces:**
- Consumes: 제목·저자
- Produces: `node scripts/find-covers.mjs "<제목>" "<저자>"` → 표지 주소 한 줄 또는 `없음`. 여러 권은 `--file <목록.json>` 으로.

- [ ] **Step 1: 스크립트를 쓴다**

```js
// 오픈라이브러리에서 표지 번호를 찾는다:
//   node scripts/find-covers.mjs "The Berenstain Bears' New Neighbors" "Stan Berenstain"
//   node scripts/find-covers.mjs --file 목록.json      ([{title, author}, ...] → {제목: 주소} 를 찍는다)
// 그림을 내려받지 않는다. 주소만 가리킨다 (저작권).
import { readFile } from "node:fs/promises";

const url = (t, a) => "https://openlibrary.org/search.json?limit=5&fields=title,author_name,cover_i&title="
  + encodeURIComponent(t) + "&author=" + encodeURIComponent(a);

async function find(title, author) {
  const r = await fetch(url(title, author));
  if (!r.ok) return "";
  const d = await r.json();
  const hit = (d.docs || []).find(x => x.cover_i);
  return hit ? `https://covers.openlibrary.org/b/id/${hit.cover_i}-M.jpg` : "";
}

const args = process.argv.slice(2);
if (args[0] === "--file") {
  const list = JSON.parse(await readFile(args[1], "utf8"));
  const out = {};
  for (const { title, author } of list) {
    out[title] = await find(title, author || "");
    await new Promise(r => setTimeout(r, 400));          // 오픈라이브러리에 몰아치지 않는다
    console.error(`${out[title] ? "○" : "×"} ${title}`);
  }
  console.log(JSON.stringify(out, null, 1));
} else {
  console.log(await find(args[0], args[1] || "") || "없음");
}
```

- [ ] **Step 2: 돌려서 확인한다**

Run: `node scripts/find-covers.mjs "The Berenstain Bears' New Neighbors" "Stan Berenstain"`
Expected: `https://covers.openlibrary.org/b/id/<번호>-M.jpg` 가 찍힌다. 브라우저로 그 주소를 열어 그 책 표지가 맞는지 눈으로 본다.

못 찾으면 `없음` 이 찍히고, 그 책의 `cover` 는 `""` 로 둔다 — 서재가 AR 색 책등을 그린다.

- [ ] **Step 3: 커밋**

```bash
git add scripts/find-covers.mjs
git commit -m "$(cat <<'EOF'
feat(표지): 오픈라이브러리에서 표지 주소를 찾는다

그림을 내려받지 않고 주소만 가리킨다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: The Berenstain Bears 70권 — 9단계 학습

**Files:**
- Create: `books/<slug>.js` × 70
- Modify: `books/index.js` (slug 70줄 추가)
- Modify: `books/cards.js` (`node scripts/make-cards.mjs` 가 다시 만든다 — 손으로 고치지 않는다)

**Interfaces:**
- Consumes: Task 4 의 `node scripts/check-book.mjs`, Task 5 의 `node scripts/find-covers.mjs`
- Produces: `window.BOOK` — 지금 13권과 똑같은 모양에 `evidence` 하나를 더한 것

**한 권에 들어가는 것 (`books/hi-fly-guy.js` 를 본으로 삼는다):**

```js
window.BOOK = {
  slug: "berenstain-bears-new-neighbors",
  bookNo: "<장서 목록의 Book No.>",
  title: "The Berenstain Bears' New Neighbors",
  author: "Stan and Jan Berenstain",
  series: "The Berenstain Bears",
  level: { ar: "<장서 목록의 BL 을 소수 한 자리로>", lexile: "<장서 목록의 Lexile>L", rb: "<Lv. 이름>" },
  cover: "<find-covers.mjs 가 준 주소, 못 찾으면 \"\">",
  awards: [],
  evidence: { by: "...", characters: [...], beats: ["...","...","..."], ending: "...", checked: "..." },
  shadowing: { query: "The Berenstain Bears' New Neighbors read aloud" },   // 확인한 유튜브 영상이 없으면 query 만
  vocabulary: [ { word: "neighbor", ko: "이웃", ex: "A new {{neighbor}} moved in next door.", exKo: "새 이웃이 옆집으로 이사 왔다." }, ... ],  // 8개 이상
  comprehension: [...], quiz: [...],        // 퀴즈 10문제, 보기 4개, c 는 보기 번호
  summaryMap: {...}, mindMap: {...}, ib: {...}, essay: {...}, teaching: {...}
};
```

**유튜브:** 제목+"read aloud" 로 찾아 **채널과 제목이 그 책이 맞는지 확인한 것만** `shadowing.videos` 에 넣는다. 확인하지 못하면 `shadowing.query` 만 둔다 — 엉뚱한 영상을 붙이지 않는다.

**E북·형광펜·낱말 mp3 는 만들지 않는다.** 내지 PDF 가 없다.

- [ ] **Step 1: 70권 목록을 뽑는다**

```bash
node -e "const fs=require('fs');const m={exports:{}};new Function('module','require',fs.readFileSync('catalog.js','utf8'))(m,()=>({}));const C=m.exports.CATALOG||global.CATALOG;const s=C.series.indexOf('The Berenstain Bears');const r=[];for(const b of C.books)if(b[2]===s)r.push({no:b[0],title:b[1],author:b[3],lexile:b[4],bl:b[5]});fs.writeFileSync('.superpowers/bears.json',JSON.stringify(r,null,1));console.log(r.length+'권')"
```

시리즈 이름이 정확히 `The Berenstain Bears` 가 아니면 `C.series.filter(x=>/Berenstain/i.test(x))` 로 실제 이름을 먼저 찾는다.

Expected: `.superpowers/bears.json` 과 권수가 찍힌다.

- [ ] **Step 2: 표지를 찾는다**

```bash
node scripts/find-covers.mjs --file .superpowers/bears.json > .superpowers/bears-covers.json
```

Expected: 제목마다 ○/× 가 찍히고 주소 표가 나온다.

- [ ] **Step 3: 관문 — 먼저 열 권으로 해 본다**

열 권을 골라, 책마다:
1. **만드는 쪽**이 인물 이름·사건 세 마디·결말을 먼저 적는다 (요약을 베끼지 않고 아는 것으로).
2. **확인하는 쪽**(딴 서브에이전트)이 **제목·저자만 받고** 같은 것을 적는다. 앞사람 답을 보여 주지 않는다.
3. 인물 이름이나 결말이 어긋나면 **그 책은 만들지 않는다.** 둘 다 "모르겠다"여도 만들지 않는다.

지나간 책만 `books/<slug>.js` 를 쓴다.

- [ ] **Step 4: 열 권을 검사하고 원장께 보인다**

```bash
node scripts/check-book.mjs <slug1> <slug2> ...
```

Expected: PASS

`books/index.js` 에 줄을 더하고 `node scripts/make-cards.mjs` 를 돌린 뒤 화면에서 한 권을 열어 9개 탭이 다 도는지 본다. 원장 승인 전에는 나머지 60권을 돌리지 않는다.

- [ ] **Step 5: 나머지를 돌린다**

한 서브에이전트가 5권씩, 동시에 셋까지. 각 서브에이전트는 `books/<slug>.js` 를 **직접 쓴다** — 내용을 돌려주지 않는다. 관문에서 떨어진 책은 만들지 않고 그 까닭을 원장 보고에 남긴다.

- [ ] **Step 6: 전부 검사한다**

```bash
node scripts/make-cards.mjs && npm test
```

Expected: PASS. `check-book` 이 모든 책을 ok 로 찍고, `cards.js` 가 100KB 안이다.

- [ ] **Step 7: 커밋**

5권 단위로 나누어 커밋한다.

```bash
git add books/<slug>.js books/index.js books/cards.js
git commit -m "$(cat <<'EOF'
feat(학습): The Berenstain Bears <권수>권 9단계 학습

관문(인물·사건 세 마디·결말을 두 번 따로 확인)을 지난 책만 만들었다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: 배포와 눈으로 확인

**Files:** 없음 (배포만)

- [ ] **Step 1: 배포 폴더를 채운다**

`out/` 에 옮길 것: `index.html app.html library.html read.html artest.html fluency.html login.html review.html teacher.html teacher-guide.html worksheets.html app.css sheet.css config.js store.js report.js grade.js catalog.js catalog-sum.js catalog-pins.js books/ act/ assets/`

- [ ] **Step 2: 배포한다**

Vercel 에 올린다. 같은 주소(`https://readingbrain-books.vercel.app`)가 갱신된다.

- [ ] **Step 3: 올라간 화면을 확인한다**

Expected:
- 첫 화면에 새 책들이 뜨고, 네트워크 탭에 `books/<slug>.js` 요청이 없다
- 서재에서 아무 책이나 열면 [읽고 나서 →] 가 있고, 눌러서 적고 저장하면 새로고침해도 남는다
- Berenstain Bears 한 권의 9개 탭이 다 돈다
- `act/<XX>.js` 가 404 가 아니다

- [ ] **Step 4: 원장께 보고한다**

만든 권수, 관문에서 떨어진 책과 그 까닭, 표지를 못 찾은 책 수를 적는다.

---

## 자체 점검

**명세 덮기**

| 명세 | 어느 과제 |
|---|---|
| A/B 두 갈래 | 과제 6(A) · 과제 2·3(B) |
| 아는 척을 막는 관문 | 과제 4(검사) · 과제 6 Step 3(절차) |
| `evidence` 를 책 파일에 남기기 | 과제 4 Step 1 |
| 시리즈 통째로 · 1차 Berenstain Bears 70권 | 과제 6 |
| 표지는 오픈라이브러리 주소만 | 과제 5 · 과제 4 Step 1(검사) |
| 낭독은 확인한 유튜브만, 아니면 `shadowing.query` | 과제 6 머리말 |
| `books/cards.js` 로 첫 화면 가볍게 | 과제 1 |
| `BOOK_BY_NO` 를 손으로 적지 않기 | 과제 1 Step 3·6 |
| `check-book.mjs` 늘리기 · `npm test` 에 잇기 | 과제 4 |
| cards.js 100KB 이하 | 과제 1 Step 1 |
| 옛 문법 없음 | 과제 4 Step 4 |
| 간이 학습 = 2026-09-21 설계 | 과제 2·3 |
| **서재의 모든 책을 밖으로** (원장 2026-09-28) | 과제 2·3 — 4,820권 전부 |

**바뀐 것:** 명세는 B갈래를 "A 가 한 바퀴 돈 뒤"로 미뤘다. 원장이 "서재에 있는 모든 책을 밖으로 꺼내야 한다"고 하셔서 **B갈래를 과제 2·3 으로 앞당겼다.** A갈래(과제 6)는 그 뒤에 온다 — 한 권도 서재에만 남지 않는 것이 먼저다.

**이름 맞춤:** `window.ACT` · `window.BOOK_CARDS` · `window.BOOK_BY_NO` · `B.evidence` · `shadowing.query` — 과제 사이에서 같은 이름을 쓴다.
