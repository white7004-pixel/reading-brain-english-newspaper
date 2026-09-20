# 학원 서재(4,820권) 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 학원 장서 4,820권을 AR·장르·주제·시리즈로 찾을 수 있는 서재 화면을 만들고, PRE-TEST·AR TEST 결과에서 그 수준의 책으로 바로 이어지게 한다.

**Architecture:** 엑셀을 빌드 스크립트로 한 번 변환해 정적 JS 데이터 파일(`catalog.js`)로 만든다. 서재 화면은 그 배열 하나를 읽어 클라이언트에서 거르고 찾는다. 표지는 오픈라이브러리에서 **번호만** 받아 두고 주소로 가리킨다(그림을 보관하지 않는다). 학습 콘텐츠가 있는 13권은 Book No. 로 이어 붙인다.

**Tech Stack:** 정적 HTML + 바닐라 ES5/ES6 JS, 빌드는 python 3.11 (표준 라이브러리만 — openpyxl 없음), 검사는 `node <파일>.js`

**Spec:** `docs/superpowers/specs/2026-09-20-library-catalog-design.md`

## Global Constraints

- **데이터 파일은 ES5 `var`** 로 쓴다. 브라우저 `<script>` 와 `node` 양쪽에서 돌아야 한다 (`artest-data.js` 관례).
- 데이터 파일 끝에 `if (typeof window !== "undefined") window.X = X;` 와 `if (typeof module !== "undefined" && require.main === module) { ... console.log("<파일명> ok"); }` 를 붙인다.
- 새로 만드는 화면은 `app.css` 만 읽고, 화면 고유 CSS 는 head 안 `<style>` 에 쓴다 (별도 CSS 파일을 만들지 않는다).
- 스크립트 순서: `config.js → store.js` 를 먼저, 그다음 데이터 파일. 본문 첫 줄 `RB.gate();`
  `report.js` 는 **인쇄가 있는 화면만** 읽는다 — 서재는 인쇄가 없으므로 넣지 않는다.
- **최신 JS 문법 금지**: 옛 웹뷰(카톡 안 브라우저)가 못 읽는다. `?.`, `??`, 후방탐색 정규식을 쓰지 않는다.
- **브라우저 API 를 최상위에서 그냥 부르지 않는다** (`speechSynthesis` 등). 앞서 이것 때문에 카톡에서 화면 전체가 멈춘 적이 있다.
- 학생 이름 키는 `rb1:who` 하나를 공용으로 쓴다.
- 표지 그림 파일을 내려받아 저장소에 넣지 않는다. 주소만 가리킨다.
- python 실행은 `PYTHONIOENCODING=utf-8` 를 앞에 붙인다(한글 출력 깨짐 방지). 파일 쓰기는 `io.open(..., encoding="utf-8", newline="\n")`.
- 엑셀 원본 경로: `C:\Users\white\Downloads\전체 도서 목록2026-09-20.xlsx`

## 파일 구조

| 파일 | 책임 | 만드는 법 |
|---|---|---|
| `scripts/make-catalog.py` | 엑셀 → `catalog.js`·`catalog-sum.js`. 표지 번호가 있으면 끼워 넣는다 | 새로 씀 |
| `catalog.js` | `CATALOG = {series, genre, theme, books}` — 목록 본체 (항상 로드) | 생성물 |
| `catalog-sum.js` | `CATALOG_SUM = [...]` — 한 줄 요약 (필요할 때 로드) | 생성물 |
| `catalog-pins.js` | `CATALOG_PINS = {bookNo: 유튜브번호}` — 원장이 고른 영상 (손으로 편집) | 새로 씀 |
| `scripts/fetch-covers.py` | 오픈라이브러리에서 표지 번호 수집 → `scripts/catalog-covers.json` | 새로 씀 |
| `scripts/catalog-covers.json` | 표지 번호 모음 (배포 안 됨, `make-catalog.py` 의 입력) | 생성물 |
| `library.html` | 서재 화면 — 거르기·찾기·카드·상세 | 새로 씀 |
| `index.html` | 메뉴에 서재 링크 한 줄 | 고침 |
| `fluency.html`·`artest.html` | 결과에서 서재로 (AR 을 넘긴다) | 고침 |
| `books/*.js` (11개) | `bookNo` 한 줄 추가 | 고침 |
| `package.json` | 검사 체인에 `node catalog.js` | 고침 |

### 데이터 모양 (뒤 작업이 의존한다 — 이름을 바꾸지 말 것)

```js
CATALOG = {
  series: ["...", ...],      // 377개
  genre:  ["...", ...],      // 9개
  theme:  ["...", ...],      // 81개
  books:  [ [no, title, sIdx, author, lexile, bl, nf, gIdx, tIdx, award, cover], ... ]
};
// no     문자열 "M0001" · title 문자열 · sIdx series 첨자 · author 문자열
// lexile 숫자 · bl 숫자(AR) · nf 0=Fiction 1=Nonfiction · gIdx genre 첨자 · tIdx theme 첨자
// award  문자열("" 이면 없음) · cover 숫자(0 이면 표지 없음)
CATALOG.at(i)  // → {no,title,series,author,lexile,bl,nf,genre,theme,award,cover} 로 펴 준다
CATALOG.pick(q, ar, gIdx, tIdx)  // → 조건에 맞는 books 첨자 배열
```

---

### Task 1: 엑셀 → catalog.js

**Files:**
- Create: `scripts/make-catalog.py`
- Create: `catalog.js` (생성물), `catalog-sum.js` (생성물)
- Modify: `package.json` (test 체인)

**Interfaces:**
- Consumes: 없음 (첫 작업)
- Produces: 위 "데이터 모양" 의 `CATALOG`, `CATALOG.at(i)`, `CATALOG.pick(q, ar, g, t)`. `CATALOG_SUM[i]` 는 `CATALOG.books[i]` 와 첨자가 맞는 한 줄 요약.

- [ ] **Step 1: 변환 스크립트를 쓴다**

`scripts/make-catalog.py` — openpyxl 이 없으므로 xlsx(zip+xml)를 직접 푼다.

```python
# -*- coding: utf-8 -*-
"""전체 도서 목록 엑셀 → catalog.js · catalog-sum.js
    python scripts/make-catalog.py "C:/Users/white/Downloads/전체 도서 목록2026-09-20.xlsx"
표지 번호는 scripts/catalog-covers.json 이 있으면 끼워 넣는다(없으면 0)."""
import io, os, re, sys, json, zipfile
from xml.etree import ElementTree as ET

NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def rows(path):
    z = zipfile.ZipFile(path)
    shared = ["".join(si.itertext()) for si in ET.parse(z.open("xl/sharedStrings.xml")).getroot()]
    for _, el in ET.iterparse(z.open("xl/worksheets/sheet1.xml")):
        if el.tag != NS + "row": continue
        d = {}
        for c in el.findall(NS + "c"):
            col = re.match(r"[A-Z]+", c.get("r")).group(); t = c.get("t"); v = c.find(NS + "v")
            val = shared[int(v.text)] if t == "s" and v is not None else (v.text if v is not None else "")
            if val: d[col] = val.strip()
        if d: yield d
        el.clear()

def num(s, d=0):
    try: return float(s)
    except (TypeError, ValueError): return d

def main():
    src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.expanduser("~"), "Downloads", "전체 도서 목록2026-09-20.xlsx")
    data = list(rows(src))[1:]                      # 첫 줄은 머리글
    covers = {}
    cp = os.path.join(ROOT, "scripts", "catalog-covers.json")
    if os.path.exists(cp): covers = json.load(io.open(cp, encoding="utf-8"))

    ser = sorted(set(r.get("E", "") for r in data))
    gen = sorted(set(r.get("J", "") for r in data))
    th  = sorted(set(r.get("K", "") for r in data))
    si = dict((s, i) for i, s in enumerate(ser)); gi = dict((s, i) for i, s in enumerate(gen)); ti = dict((s, i) for i, s in enumerate(th))

    books, sums = [], []
    for r in data:
        no = r.get("C", "")
        lex = int(num(r.get("G")))
        bl = num(r.get("H"))
        nf = 1 if (r.get("I", "").lower() == "nonfiction") else 0
        books.append([no, r.get("D", ""), si[r.get("E", "")], r.get("F", ""), lex, bl, nf,
                      gi[r.get("J", "")], ti[r.get("K", "")], r.get("L", ""), int(covers.get(no, 0))])
        sums.append(r.get("M", ""))

    head = "// 학원 장서 목록. scripts/make-catalog.py 가 엑셀에서 만든다 — 손으로 고치지 않는다.\n"
    body = json.dumps({"series": ser, "genre": gen, "theme": th, "books": books}, ensure_ascii=False, separators=(",", ":"))
    out = head + "var CATALOG = " + body + ";\n" + io.open(os.path.join(ROOT, "scripts", "catalog-tail.js"), encoding="utf-8").read()
    io.open(os.path.join(ROOT, "catalog.js"), "w", encoding="utf-8", newline="\n").write(out)

    s = ("// 책 한 줄 요약. catalog.js 의 books 와 첨자가 같다. 필요할 때만 읽는다.\nvar CATALOG_SUM = "
         + json.dumps(sums, ensure_ascii=False, separators=(",", ":")) + ";\n"
         + 'if (typeof window !== "undefined") window.CATALOG_SUM = CATALOG_SUM;\n')
    io.open(os.path.join(ROOT, "catalog-sum.js"), "w", encoding="utf-8", newline="\n").write(s)
    print("catalog.js %d권 · 시리즈 %d · 장르 %d · 주제 %d · 표지 %d"
          % (len(books), len(ser), len(gen), len(th), sum(1 for b in books if b[10])))

if __name__ == "__main__":
    main()
```

- [ ] **Step 2: catalog.js 에 붙일 꼬리(함수 + 자가검사)를 쓴다**

`scripts/catalog-tail.js` — 생성할 때마다 그대로 이어 붙인다. 데이터와 함수를 나눠 두어야 데이터를 다시 만들어도 함수가 안 없어진다.

```js
// ── 읽는 법 ──
CATALOG.F = { no:0, title:1, series:2, author:3, lexile:4, bl:5, nf:6, genre:7, theme:8, award:9, cover:10 };
// 한 권을 이름 붙은 객체로 편다
CATALOG.at = function (i) {
  var b = CATALOG.books[i];
  if (!b) return null;
  return { i: i, no: b[0], title: b[1], series: CATALOG.series[b[2]], author: b[3],
           lexile: b[4], bl: b[5], nf: !!b[6], genre: CATALOG.genre[b[7]],
           theme: CATALOG.theme[b[8]], award: b[9], cover: b[10] };
};
// 거르기. q 는 낱말을 띄어 쓰면 모두 들어간 책만 (제목·저자·시리즈·번호에서 찾는다).
// ar 은 [최소, 최대] 또는 null. g·t 는 genre·theme 첨자 또는 -1(전체).
CATALOG.pick = function (q, ar, g, t) {
  var words = String(q || "").toLowerCase().split(/\s+/).filter(Boolean), out = [];
  for (var i = 0; i < CATALOG.books.length; i++) {
    var b = CATALOG.books[i];
    if (ar && (b[5] < ar[0] || b[5] > ar[1])) continue;
    if (g >= 0 && b[7] !== g) continue;
    if (t >= 0 && b[8] !== t) continue;
    if (words.length) {
      var hay = (b[1] + " " + b[3] + " " + CATALOG.series[b[2]] + " " + b[0]).toLowerCase(), ok = true;
      for (var w = 0; w < words.length; w++) if (hay.indexOf(words[w]) < 0) { ok = false; break; }
      if (!ok) continue;
    }
    out.push(i);
  }
  return out;
};
if (typeof window !== "undefined") window.CATALOG = CATALOG;
// 확인: node catalog.js
if (typeof module !== "undefined" && require.main === module) {
  var assert = require("assert"), B = CATALOG.books;
  assert.ok(B.length > 4000, "책이 너무 적다: " + B.length);
  var seen = {};
  for (var i = 0; i < B.length; i++) {
    var b = B[i];
    assert.ok(b[0] && !seen[b[0]], "Book No. 가 비었거나 겹친다: " + b[0]);
    seen[b[0]] = 1;
    assert.ok(b[1], "제목이 없다: " + b[0]);
    assert.ok(typeof b[5] === "number" && b[5] > 0 && b[5] < 20, "AR 이 이상하다: " + b[0] + " " + b[5]);
    assert.ok(CATALOG.series[b[2]] !== undefined, "시리즈 번호가 범위 밖: " + b[0]);
    assert.ok(CATALOG.genre[b[7]] !== undefined, "장르 번호가 범위 밖: " + b[0]);
    assert.ok(CATALOG.theme[b[8]] !== undefined, "주제 번호가 범위 밖: " + b[0]);
  }
  var one = CATALOG.at(0);
  assert.strictEqual(one.no, B[0][0]); assert.strictEqual(one.title, B[0][1]);
  assert.ok(CATALOG.pick("", [1, 1.99], -1, -1).length > 100, "AR 1점대가 100권은 넘어야 한다");
  assert.ok(CATALOG.pick("fly guy", null, -1, -1).length > 0, "'fly guy' 가 찾아져야 한다");
  assert.strictEqual(CATALOG.pick("존재하지않는제목xyz", null, -1, -1).length, 0, "없는 말은 0권");
  var t0 = CATALOG.pick("", null, -1, 0).length;
  assert.ok(t0 > 0 && t0 < B.length, "주제로 거르면 일부만 남아야 한다");
  console.log("catalog.js ok — " + B.length + "권");
}
```

- [ ] **Step 3: 돌려서 실패를 본다**

```bash
cd "/c/Users/white/OneDrive/Desktop/리딩브레인 원서관리프로그램" && node catalog.js
```
Expected: FAIL — `catalog.js` 가 아직 없다 (`Cannot find module`).

- [ ] **Step 4: 만들고 검사한다**

```bash
cd "/c/Users/white/OneDrive/Desktop/리딩브레인 원서관리프로그램" && PYTHONIOENCODING=utf-8 python scripts/make-catalog.py && node catalog.js
```
Expected: `catalog.js 4820권 · 시리즈 377 · 장르 9 · 주제 81 · 표지 0` 그리고 `catalog.js ok — 4820권`

- [ ] **Step 5: 크기를 확인한다** (목록 본체가 450KB 를 넘으면 안 된다)

```bash
cd "/c/Users/white/OneDrive/Desktop/리딩브레인 원서관리프로그램" && ls -la catalog.js catalog-sum.js
```
Expected: `catalog.js` 약 450KB 아래, `catalog-sum.js` 약 630KB

- [ ] **Step 6: npm test 에 연결한다**

`package.json` 의 `scripts.test` 에서 `node artest-data.js` 뒤에 `&& node catalog.js` 를 넣는다. 그다음:

```bash
cd "/c/Users/white/OneDrive/Desktop/리딩브레인 원서관리프로그램" && npm test
```
Expected: 기존 검사 전부 ok + `catalog.js ok — 4820권`

- [ ] **Step 7: 커밋**

```bash
git add scripts/make-catalog.py scripts/catalog-tail.js catalog.js catalog-sum.js package.json docs/
git commit -m "feat(서재): 학원 장서 4,820권 목록을 데이터 파일로 만든다"
```

---

### Task 2: 서재 화면 뼈대

**Files:**
- Create: `library.html`

**Interfaces:**
- Consumes: `CATALOG`, `CATALOG.at(i)`, `CATALOG.pick(q, ar, g, t)` (Task 1)
- Produces: 전역 `LIB.draw()`, `LIB.state = {q, ar, g, t, shown}`. Task 4 가 표지·유튜브를 여기에 붙인다.

표지는 아직 없다. **책등 그림만** 그린다. AR 띠는 `fluency.html` 의 14단계가 아니라 서재용 7칸(AR0·1·2·3·4·5·6+)을 쓴다.

- [ ] **Step 1: 화면을 쓴다**

`library.html` — `fluency.html` 의 머리 구조를 그대로 따른다.

```html
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>서재 · 리딩브레인</title>
<link rel="stylesheet" href="app.css">
<style>
.lb-bar{display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin:14px 0 10px}
.lb-bar input{flex:1; min-width:180px; border:0; border-radius:16px; padding:11px 15px; font:inherit; background:#fff; color:#3b2c46}
.lb-bar select{border:0; border-radius:16px; padding:11px 13px; font:inherit; background:#fff; color:#6b5a78}
.lb-lv{display:flex; gap:8px; overflow-x:auto; padding:2px 0 12px}
.lb-lv button{flex:none; border:0; background:#fff; color:#6b5a78; border-radius:16px; padding:9px 15px; text-align:left; font:inherit; cursor:pointer}
.lb-lv button small{display:block; font-weight:400; font-size:11.5px; color:#a597b0}
.lb-lv button.on{background:var(--grad); color:#fff}
.lb-lv button.on small{color:#fbe6ff}
.lb-grid{display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:14px}
.lb-card{background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 14px rgba(120,60,160,.10); cursor:pointer; text-align:left; border:0; padding:0; font:inherit}
.lb-cv{display:block; aspect-ratio:3/4; background:#f1e8f6 center/cover no-repeat; position:relative}
.lb-sp{display:flex; flex-direction:column; justify-content:center; height:100%; padding:10px 12px; box-sizing:border-box; color:#fff}
.lb-sp b{font-size:13.5px; line-height:1.35; display:-webkit-box; -webkit-line-clamp:5; -webkit-box-orient:vertical; overflow:hidden}
.lb-sp span{font-size:11px; opacity:.85; margin-top:6px}
.lb-ar{position:absolute; left:8px; top:8px; background:rgba(0,0,0,.55); color:#fff; border-radius:10px; padding:2px 8px; font-size:11.5px}
.lb-meta{padding:9px 11px 11px}
.lb-meta h3{margin:0 0 3px; font-size:13.5px; line-height:1.3; color:#3b2c46}
.lb-meta .au{font-size:11.5px; color:#a597b0}
.lb-more{display:block; margin:18px auto 30px}
</style>
</head>
<body>
<div class="top">
  <a class="home" href="index.html">← 목록</a>
  <div class="bk"><b>📚 서재</b><span>학원에 있는 원서를 수준·주제로 찾아요</span></div>
  <div class="sp"></div>
  <label for="who">이름</label>
  <input class="who" id="who" placeholder="김리브로" autocomplete="off">
</div>

<main>
  <p class="sub" style="margin-top:14px">학원이 가진 원서를 <b>AR 수준·장르·주제·시리즈</b>로 찾습니다.
    PRE-TEST 나 AR TEST 로 수준을 잰 다음 그 수준의 책을 고르면 됩니다.</p>
  <div class="lb-bar">
    <input id="q" placeholder="제목·저자·시리즈로 찾기" autocomplete="off">
    <select id="g"></select>
    <select id="t"></select>
    <span class="count" id="cnt"></span>
  </div>
  <div class="lb-lv" id="lv"></div>
  <div class="lb-grid" id="grid"></div>
  <div class="empty" id="empty" hidden>찾는 책이 없어요. 다른 말로 찾아보세요.</div>
  <button class="btn ghost lb-more" id="more" hidden>더 보기</button>
</main>

<script src="config.js"></script>
<script src="store.js"></script>
<script src="catalog.js"></script>
<script>
RB.gate();
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");

// 서재용 AR 칸. fluency 의 14단계와 다르다 — 책을 고르는 데는 이 정도가 알맞다
const BANDS = [
  { name: "첫 글자책", ar: [0, 0.9] }, { name: "AR 1점대", ar: [1, 1.9] },
  { name: "AR 2점대", ar: [2, 2.9] }, { name: "AR 3점대", ar: [3, 3.9] },
  { name: "AR 4점대", ar: [4, 4.9] }, { name: "AR 5점대", ar: [5, 5.9] },
  { name: "AR 6 이상", ar: [6, 99] }
];
const PAGE = 60;                       // 4,820칸을 한 번에 그리면 느리다. 60칸씩 늘린다
const LIB = { state: { q: "", ar: -1, g: -1, t: -1, shown: PAGE }, hit: [] };

// AR 단계별 책등 색 (표지를 못 찾은 책에 쓴다)
const SPINE = ["#7f8fd6", "#5fa8b8", "#6fae7a", "#c9a24a", "#cf8158", "#b96a86", "#8a6bb5"];
const bandOf = bl => { for (let i = 0; i < BANDS.length; i++) if (bl >= BANDS[i].ar[0] && bl <= BANDS[i].ar[1]) return i; return 0; };

function card(i){
  const b = CATALOG.at(i), band = bandOf(b.bl);
  return `<button class="lb-card" data-i="${i}">
    <span class="lb-cv" style="background:${SPINE[band]}">
      <span class="lb-sp"><b>${esc(b.title)}</b><span>${esc(b.series === "No series" ? "" : b.series)}</span></span>
      <span class="lb-ar">AR ${b.bl.toFixed(1)}</span>
    </span>
    <span class="lb-meta"><h3>${esc(b.title)}</h3><span class="au">${esc(b.author)}</span></span>
  </button>`;
}

LIB.draw = function(){
  const s = LIB.state;
  LIB.hit = CATALOG.pick(s.q, s.ar < 0 ? null : BANDS[s.ar].ar, s.g, s.t);
  $("#grid").innerHTML = LIB.hit.slice(0, s.shown).map(card).join("");
  $("#empty").hidden = LIB.hit.length > 0;
  $("#more").hidden = LIB.hit.length <= s.shown;
  $("#cnt").textContent = `${LIB.hit.length.toLocaleString()}권`;
  $("#lv").innerHTML = [{ name: "전체", sub: `${CATALOG.books.length.toLocaleString()}권` }].concat(
    BANDS.map((x, i) => ({ name: x.name, sub: `${CATALOG.pick("", x.ar, -1, -1).length}권` })))
    .map((x, i) => `<button data-i="${i - 1}" class="${i - 1 === s.ar ? "on" : ""}">${esc(x.name)}<small>${esc(x.sub)}</small></button>`).join("");
  $("#lv").querySelectorAll("button").forEach(b2 =>
    b2.onclick = () => { s.ar = +b2.dataset.i; s.shown = PAGE; LIB.draw(); });
};

function fill(sel, list, label){
  sel.innerHTML = `<option value="-1">${label} 전체</option>` +
    list.map((x, i) => `<option value="${i}">${esc(x)}</option>`).join("");
}
fill($("#g"), CATALOG.genre, "갈래"); fill($("#t"), CATALOG.theme, "주제");
$("#g").onchange = () => { LIB.state.g = +$("#g").value; LIB.state.shown = PAGE; LIB.draw(); };
$("#t").onchange = () => { LIB.state.t = +$("#t").value; LIB.state.shown = PAGE; LIB.draw(); };
$("#q").oninput = () => { LIB.state.q = $("#q").value.trim(); LIB.state.shown = PAGE; LIB.draw(); };
$("#more").onclick = () => { LIB.state.shown += PAGE; LIB.draw(); };

$("#who").value = localStorage.getItem("rb1:who") || "";
$("#who").onchange = () => localStorage.setItem("rb1:who", $("#who").value.trim());

// 주소로 들어온 조건 (PRE-TEST 결과에서 넘어온다): ?ar=1.5
const P = new URLSearchParams(location.search);
if (P.get("ar")) LIB.state.ar = bandOf(parseFloat(P.get("ar")));
if (P.get("q")) { LIB.state.q = P.get("q"); $("#q").value = P.get("q"); }
LIB.draw();

// 확인: 주소 끝에 #selftest
if (location.hash === "#selftest"){
  const eq = (a, b, m) => console.assert(a === b, m, a, b);
  eq(bandOf(0.3), 0, "0.3 은 첫 글자책"); eq(bandOf(1.5), 1, "1.5 는 AR 1점대");
  eq(bandOf(6.7), 6, "6.7 은 AR 6 이상"); eq(bandOf(11.7), 6, "11.7 도 AR 6 이상");
  const all = CATALOG.pick("", null, -1, -1).length;
  eq(all, CATALOG.books.length, "조건이 없으면 전부");
  let sum = 0; BANDS.forEach(x => sum += CATALOG.pick("", x.ar, -1, -1).length);
  eq(sum, all, "AR 칸이 모든 책을 겹침 없이 덮는다");
  console.assert(CATALOG.pick("fly", null, -1, -1).length > 0, "fly 가 찾아진다");
  console.log("library selftest done");
}
</script>
</body>
</html>
```

- [ ] **Step 2: 미리보기를 켜고 자가검사를 돌린다**

`preview_start({name:"readingbrain"})` 로 띄운 뒤 `http://localhost:8778/library.html#selftest` 를 연다.
Expected: 콘솔에 오류(빨간 assert) 없이 `library selftest done`. 특히 **"AR 칸이 모든 책을 겹침 없이 덮는다"** 가 통과해야 한다 — BANDS 의 경계(0.9↔1, 5.9↔6)에 빠지는 책이 없다는 뜻이다.

- [ ] **Step 3: 화면을 눈으로 본다**

`http://localhost:8778/library.html` 를 열고 스크린샷.
Expected: 책등 카드가 격자로 뜨고, AR 칩에 권수가 보이고(전체 4,820권), [더 보기] 가 있다. 찾기 칸에 `fly` 를 치면 줄어든다.

- [ ] **Step 4: 휴대폰 크기에서 본다**

`resize_window({preset:"mobile"})` 후 스크린샷.
Expected: 카드가 2칸으로 접히고 가로 스크롤이 생기지 않는다.

- [ ] **Step 5: 커밋**

```bash
git add library.html && git commit -m "feat(서재): 4,820권을 AR·갈래·주제로 찾는 화면"
```

---

### Task 3: 표지 번호 모으기

**Files:**
- Create: `scripts/fetch-covers.py`
- Create: `scripts/catalog-covers.json` (생성물, 배포 안 함)

**Interfaces:**
- Consumes: `catalog.js` 의 `CATALOG.books` (Task 1)
- Produces: `scripts/catalog-covers.json` = `{"M0001": 0, "S1624": 278778, ...}` — Book No. → 오픈라이브러리 표지 번호(0 = 없음). `make-catalog.py` 가 이 파일을 읽어 `books[i][10]` 에 넣는다.

**중요:** 그림 파일을 내려받지 않는다. **번호만** 받는다. 4,820권을 1초에 한 번씩 물어보면 약 80분 걸린다 — 중간에 끊겨도 이어서 할 수 있게 만든다.

- [ ] **Step 1: 수집 스크립트를 쓴다**

```python
# -*- coding: utf-8 -*-
"""오픈라이브러리에서 책 표지 '번호'를 모은다 (그림은 내려받지 않는다).
    python scripts/fetch-covers.py [몇권까지]
결과: scripts/catalog-covers.json  {Book No.: 표지번호}  (0 = 못 찾음)
중간에 끊겨도 다시 돌리면 아직 안 물어본 책부터 이어서 한다."""
import io, os, re, sys, json, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "scripts", "catalog-covers.json")
PAUSE = 1.0                      # 공용 서버를 두드리지 않는다
UA = "ReadingBrain-Library/1.0 (학원 내부 장서 목록; 표지 번호만 조회)"

def books():
    """catalog.js 에서 [Book No., 제목, 저자] 를 뽑는다 (node 없이 읽는다)."""
    s = io.open(os.path.join(ROOT, "catalog.js"), encoding="utf-8").read()
    body = s[s.index("var CATALOG = ") + len("var CATALOG = "): s.index(";\n//")]
    d = json.loads(body)
    return [(b[0], b[1], b[3]) for b in d["books"]]

def ask(title, author):
    # 제목의 (?) 같은 자리표시는 검색에 방해가 된다
    t = re.sub(r"[(\[].*?[)\]]", " ", title)
    t = re.sub(r"^#?\d+[.\s]+", "", t).strip()
    if not t: return 0
    q = "https://openlibrary.org/search.json?limit=3&fields=title,author_name,cover_i&title=" + urllib.parse.quote(t)
    last = (author or "").split()[-1] if author else ""
    if last: q += "&author=" + urllib.parse.quote(last)
    req = urllib.request.Request(q, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as r:
        docs = json.load(r).get("docs", [])
    for d in docs:
        if d.get("cover_i"): return int(d["cover_i"])
    return 0

def main():
    limit = int(sys.argv[1]) if len(sys.argv) > 1 else 10 ** 9
    got = {}
    if os.path.exists(OUT): got = json.load(io.open(OUT, encoding="utf-8"))
    todo = [b for b in books() if b[0] not in got]
    print("남은 책 %d권 (이미 %d권 마침)" % (len(todo), len(got)))
    n = 0
    for no, title, author in todo:
        if n >= limit: break
        try:
            got[no] = ask(title, author)
        except Exception as e:
            print("%-7s 못 물어봄(%s) — 다음에 다시" % (no, type(e).__name__))
            time.sleep(5); continue
        n += 1
        if got[no]: print("%-7s %-46s → %d" % (no, title[:46], got[no]))
        if n % 25 == 0:
            io.open(OUT, "w", encoding="utf-8").write(json.dumps(got, ensure_ascii=False))
            print("  … %d권 저장 (표지 찾은 것 %d권)" % (len(got), sum(1 for v in got.values() if v)))
        time.sleep(PAUSE)
    io.open(OUT, "w", encoding="utf-8").write(json.dumps(got, ensure_ascii=False))
    print("끝. %d권 물어봄 · 표지 찾은 것 %d권 (%.0f%%)"
          % (len(got), sum(1 for v in got.values() if v), 100.0 * sum(1 for v in got.values() if v) / max(1, len(got))))

if __name__ == "__main__":
    main()
```

- [ ] **Step 2: 20권만 먼저 돌려 본다**

```bash
cd "/c/Users/white/OneDrive/Desktop/리딩브레인 원서관리프로그램" && PYTHONIOENCODING=utf-8 python scripts/fetch-covers.py 20
```
Expected: 20권을 물어보고 몇 권은 번호를 얻는다. 한국 출판사 리더스(M0001 등)는 0 이 정상이다. `scripts/catalog-covers.json` 이 생긴다.

- [ ] **Step 3: 찾아온 표지가 진짜 그 책인지 눈으로 확인한다**

브라우저에서 번호가 붙은 책 5권의 `https://covers.openlibrary.org/b/id/<번호>-M.jpg` 를 열어 제목과 맞는지 본다.
Expected: 잘 알려진 책은 맞는 표지. 틀린 게 섞이면 Step 1 의 `ask()` 에서 `docs` 의 `title` 이 원래 제목과 비슷한지 한 번 더 거른다.

- [ ] **Step 4: 나머지를 뒤에서 돌린다** (약 80분 — `run_in_background: true`)

```bash
cd "/c/Users/white/OneDrive/Desktop/리딩브레인 원서관리프로그램" && PYTHONIOENCODING=utf-8 python scripts/fetch-covers.py
```
Expected: 끝나면 `표지 찾은 것 N권 (M%)`. 절반 안팎이면 정상이다.

- [ ] **Step 5: 표지를 목록에 끼워 넣고 검사한다**

```bash
cd "/c/Users/white/OneDrive/Desktop/리딩브레인 원서관리프로그램" && PYTHONIOENCODING=utf-8 python scripts/make-catalog.py && node catalog.js
```
Expected: `… 표지 N` 이 0 보다 크고, `catalog.js ok — 4820권`

- [ ] **Step 6: 커밋** (`catalog-covers.json` 은 다시 만들 수 있는 중간 파일이지만, 80분을 다시 쓰지 않도록 함께 넣는다)

```bash
git add scripts/fetch-covers.py scripts/catalog-covers.json catalog.js
git commit -m "feat(서재): 오픈라이브러리에서 표지 번호를 받아 붙인다 (그림은 보관하지 않는다)"
```

---

### Task 4: 표지·요약·유튜브를 화면에 붙인다

**Files:**
- Create: `catalog-pins.js`
- Modify: `library.html` (`card()` 와 상세 패널)

**Interfaces:**
- Consumes: `CATALOG.at(i).cover` (Task 3), `CATALOG_SUM[i]` (Task 1), `LIB.draw()` (Task 2)
- Produces: `LIB.open(i)` — 책 상세를 연다. `CATALOG_PINS[bookNo]` → 유튜브 영상 번호.

- [ ] **Step 1: 영상 지정 파일을 만든다**

`catalog-pins.js` — 원장이 "이 영상이 맞다" 한 것만 손으로 적는다.

```js
// 원장이 고른 유튜브 낭독 영상. {Book No.: 영상번호}
// 서재에서 [유튜브에서 찾기] 로 영상을 찾은 뒤, 주소의 v= 뒤 글자를 여기에 적으면 그 책에 붙는다.
// 예: https://www.youtube.com/watch?v=_Y1nfSCC8Sg  →  "S1624": "_Y1nfSCC8Sg"
var CATALOG_PINS = {};
if (typeof window !== "undefined") window.CATALOG_PINS = CATALOG_PINS;
```

- [ ] **Step 2: 표지를 카드에 쓴다**

`library.html` 의 `card()` 에서 `lb-cv` 부분을 바꾼다. 표지가 있으면 그림, 없으면 책등.
`loading="lazy"` 로 보이는 것만 받는다 — 4,820장을 한 번에 받으면 안 된다.

```js
const COVER = n => `https://covers.openlibrary.org/b/id/${n}-M.jpg`;
function card(i){
  const b = CATALOG.at(i), band = bandOf(b.bl);
  const face = b.cover
    ? `<img class="lb-img" src="${COVER(b.cover)}" alt="" loading="lazy"
         onerror="this.parentNode.classList.add('noimg'); this.remove()">`
    : "";
  return `<button class="lb-card" data-i="${i}">
    <span class="lb-cv${b.cover ? "" : " noimg"}" style="background:${SPINE[band]}">
      ${face}
      <span class="lb-sp"><b>${esc(b.title)}</b><span>${esc(b.series === "No series" ? "" : b.series)}</span></span>
      <span class="lb-ar">AR ${b.bl.toFixed(1)}</span>
    </span>
    <span class="lb-meta"><h3>${esc(b.title)}</h3><span class="au">${esc(b.author)}</span></span>
  </button>`;
}
```

CSS 를 `<style>` 에 더한다 — 표지가 있으면 책등 글씨를 감추고, 그림이 깨지면 다시 보인다.

```css
.lb-img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block}
.lb-cv .lb-sp{display:none}
.lb-cv.noimg .lb-sp{display:flex}
```

- [ ] **Step 3: 상세 패널을 만든다**

카드를 누르면 열린다. 요약은 이때 처음 받아온다(`catalog-sum.js` 를 늦게 싣는다).

```html
<!-- </main> 바로 앞에 둔다 -->
<div class="box" id="det" hidden style="position:fixed; left:50%; top:50%; transform:translate(-50%,-50%);
  z-index:50; max-width:520px; width:calc(100% - 32px); max-height:86vh; overflow:auto"></div>
<div id="veil" hidden style="position:fixed; inset:0; background:rgba(40,10,60,.45); z-index:49"></div>
```

```js
let SUM = null;                       // 요약은 무거워서 처음 열 때 한 번만 받는다
function loadSum(){
  if (SUM) return Promise.resolve();
  return new Promise(ok => {
    const s = document.createElement("script");
    s.src = "catalog-sum.js"; s.onload = () => { SUM = window.CATALOG_SUM || []; ok(); };
    s.onerror = () => { SUM = []; ok(); };
    document.head.appendChild(s);
  });
}
const yt = t => "https://www.youtube.com/results?search_query=" + encodeURIComponent(t + " read aloud");

LIB.open = async function(i){
  const b = CATALOG.at(i);
  $("#det").hidden = $("#veil").hidden = false;
  $("#det").innerHTML = `<h2 class="h">${esc(b.title)}</h2><p class="sub">불러오는 중…</p>`;
  await loadSum();
  const pin = (window.CATALOG_PINS || {})[b.no];
  const learn = (window.BOOK_BY_NO || {})[b.no];
  $("#det").innerHTML = `
    <h2 class="h">${esc(b.title)}</h2>
    <p class="sub">${esc(b.author)}${b.series === "No series" ? "" : " · " + esc(b.series)}</p>
    <div class="row" style="gap:6px; flex-wrap:wrap; margin:6px 0 10px">
      <span class="count">AR ${b.bl.toFixed(1)}</span><span class="count">Lexile ${b.lexile}</span>
      <span class="count">${b.nf ? "논픽션" : "픽션"}</span><span class="count">${esc(b.genre)}</span>
      <span class="count">${esc(b.theme)}</span>${b.award ? `<span class="count">🏅 ${esc(b.award)}</span>` : ""}
      <span class="count">${esc(b.no)}</span>
    </div>
    ${SUM[i] ? `<div class="rpcom">${esc(SUM[i])}</div>` : ""}
    ${pin ? `<div class="tube" style="margin-top:12px"><iframe src="https://www.youtube-nocookie.com/embed/${esc(pin)}"
        title="${esc(b.title)}" allow="accelerometer; encrypted-media; picture-in-picture"
        allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>` : ""}
    <div class="row" style="margin-top:12px; flex-wrap:wrap">
      ${learn ? `<a class="btn" href="app.html?book=${encodeURIComponent(learn)}">학습하기</a>` : ""}
      <a class="btn ghost" href="${esc(yt(b.title))}" target="_blank" rel="noopener">▶ 유튜브에서 찾기</a>
      <button class="btn ghost" id="detX">닫기</button>
    </div>`;
  $("#detX").onclick = close;
};
function close(){ $("#det").hidden = $("#veil").hidden = true; }
$("#veil").onclick = close;
document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
```

`LIB.draw()` 끝에 카드 누르기를 붙인다:

```js
  $("#grid").querySelectorAll(".lb-card").forEach(c => c.onclick = () => LIB.open(+c.dataset.i));
```

- [ ] **Step 4: 화면으로 확인한다**

`library.html` 을 열어 ① 표지가 있는 책은 그림이 뜨는지 ② 없는 책은 책등이 뜨는지 ③ 카드를 누르면 상세에 요약이 뜨는지 ④ [유튜브에서 찾기] 가 새 창으로 열리는지 본다. 콘솔 오류가 없어야 한다.
Expected: 오류 없음. `read_network_requests` 로 보면 표지 그림 요청이 **보이는 카드 수만큼만** 나간다(4,820장이 아니다).

- [ ] **Step 5: 영상 하나를 꽂아 시험한다**

`catalog-pins.js` 에 `"S1624": "_Y1nfSCC8Sg"` 를 임시로 넣고 Hi! Fly Guy 상세를 연다.
Expected: 영상이 임베드되어 보인다. 확인 뒤 임시 줄은 지운다(원장이 고른 영상만 남긴다).

- [ ] **Step 6: 커밋**

```bash
git add library.html catalog-pins.js
git commit -m "feat(서재): 표지·요약·유튜브를 책 상세에 붙인다"
```

---

### Task 5: 나머지 화면과 잇는다

**Files:**
- Modify: `index.html` (메뉴 한 줄 + 학생 숨김 한 줄)
- Modify: `fluency.html` (결과의 [이 수준 원서 고르러 가기])
- Modify: `artest.html` (같은 자리)
- Modify: `books/*.js` 11개 (`bookNo` 한 줄)
- Modify: `library.html` (`BOOK_BY_NO` 표)

**Interfaces:**
- Consumes: `library.html` 의 `LIB.open` 이 읽는 `window.BOOK_BY_NO` (Task 4)
- Produces: `BOOK_BY_NO = {Book No.: slug}` — 서재에서 [학습하기] 를 띄울 책 표

- [ ] **Step 1: 학습 책 11권에 Book No. 를 적는다**

각 `books/<slug>.js` 의 `window.BOOK = {` 바로 다음 줄에 넣는다. 목록에서 확인한 짝:

| slug | bookNo |
|---|---|
| hi-fly-guy | S1624 |
| sarah-plain-and-tall | M3117 |
| charlottes-web | S4154 |
| green-eggs-and-ham | S1212 |
| nate-the-great | M2187 |
| dinosaurs-before-dark | M3013 |
| frog-and-toad-are-friends | S2040 |
| flat-stanley | M3069 |
| holes | S4191 |
| charlie-and-the-chocolate-factory | S2703 |
| harry-potter-sorcerers-stone | S5084 |

`lets-celebrate-birthdays`·`life-in-a-castle` 는 목록에 없다(다른 출판사) — 적지 않는다.

확인함: 해리포터는 목록에 7권이 있고 *Sorcerer's Stone* 은 **S5084**(BL 5.5)다. S5078 은 *Chamber of Secrets* 이므로 쓰지 않는다 — 우리 책의 `level.ar` 이 "5.5" 라 S5084 가 맞다.

- [ ] **Step 2: 서재가 그 표를 읽게 한다**

`library.html` 의 `<script>` 안, `RB.gate();` 아래에 손으로 적는다. 책이 13권뿐이라 파일을 다 읽는 것보다 이게 싸다.

```js
// 학습 콘텐츠가 있는 책. books/<slug>.js 의 bookNo 와 짝이 맞아야 한다.
// 새 학습 책을 만들면 여기 한 줄을 더한다.
window.BOOK_BY_NO = {
  "S1624": "hi-fly-guy", "M3117": "sarah-plain-and-tall", "S4154": "charlottes-web",
  "S1212": "green-eggs-and-ham", "M2187": "nate-the-great", "M3013": "dinosaurs-before-dark",
  "S2040": "frog-and-toad-are-friends", "M3069": "flat-stanley", "S4191": "holes",
  "S2703": "charlie-and-the-chocolate-factory", "S5084": "harry-potter-sorcerers-stone"
};
```

- [ ] **Step 3: index.html 메뉴에 서재를 넣는다**

`index.html:124` 근처 `<a class="pill" id="flu" ...>` **앞에** 한 줄:

```html
  <a class="pill" id="lib" href="library.html">📚 서재</a>
```

서재는 학생도 봐도 되므로 `if (STUDENT)` 숨김 목록에는 **넣지 않는다**.

- [ ] **Step 4: PRE-TEST 결과에서 서재로 잇는다**

`fluency.html` 의 결과 카드 아래 버튼 줄에서 `href="index.html"` 을 바꾼다. 추정 AR 을 넘긴다.

`E.ar` 에서 숫자를 뽑으면 안 된다 — "AR K.5 내외" 에서 ".5" 가 잡힌다. 단계 번호로 바로 셈한다
(2번 칸 = 미국 1학년 1학기 = AR 1.0, 3번 = AR 1.5 … 13번 = AR 6.5. 유치원 두 칸은 0.5).

```js
      <a class="btn" href="library.html?ar=${est.i < 2 ? 0.5 : est.i / 2}">이 수준 원서 고르러 가기 →</a>
```

`artest.html:211` 은 같은 줄을 이렇게 바꾼다. 추정 AR 은 `artest.html:172` 의 `ar` 에 이미 있고 **null 일 수 있다**(읽기 점수를 안 매겼을 때).

```js
      <a class="btn" href="library.html${ar != null ? "?ar=" + ar : ""}">이 수준 원서 고르러 가기 →</a>
```

- [ ] **Step 5: 길이 이어졌는지 눈으로 확인한다**

① `index.html` 에서 [📚 서재] 를 누른다 → 서재가 열린다.
② `fluency.html` 에서 유치원 2학기 지문으로 결과를 내고 [이 수준 원서 고르러 가기] 를 누른다 → 서재가 **AR 1점대로 걸러진 채** 열린다.
③ 서재에서 `fly guy` 를 찾아 카드를 누른다 → 상세에 [학습하기] 가 뜨고, 누르면 `app.html?book=hi-fly-guy` 로 간다.
Expected: 세 가지 모두 되고 콘솔 오류가 없다.

- [ ] **Step 6: 커밋**

```bash
git add index.html fluency.html artest.html library.html books/
git commit -m "feat(서재): 진단 결과에서 그 수준의 책으로 바로 잇는다"
```

---

### Task 6: 검사하고 배포한다

**Files:** 없음 (검사·배포만)

- [ ] **Step 1: 전체 검사**

```bash
cd "/c/Users/white/OneDrive/Desktop/리딩브레인 원서관리프로그램" && npm test
```
Expected: 전부 ok (`catalog.js ok — 4820권` 포함)

- [ ] **Step 2: 옛 브라우저가 읽을 수 있는지 본다** (카톡 안 브라우저 대비)

```bash
cd "/c/Users/white/OneDrive/Desktop/리딩브레인 원서관리프로그램" && grep -n "?\.\|??\|(?<" library.html catalog.js catalog-pins.js
```
Expected: 아무것도 안 나온다. 나오면 평범한 if 로 바꾼다.

- [ ] **Step 3: 카톡 안 브라우저를 흉내 내 확인한다**

`library.html` 을 `speechSynthesis` 가 없고 UA 가 KAKAOTALK 인 상태로 띄워 화면이 뜨는지 본다(앞서 `app.html` 이 이것 때문에 통째로 멈췄었다).
Expected: 오류 없이 카드가 보이고 맨 위에 노란 안내 띠가 뜬다.

- [ ] **Step 4: 배포**

```bash
cd "/c/Users/white/OneDrive/Desktop/리딩브레인 원서관리프로그램" && D="/c/Users/white/AppData/Local/Temp/claude/C--Users-white-OneDrive-Desktop---------------/a14a9bcb-1a37-4891-aef1-78bd3cf3b472/scratchpad/readingbrain-books" && cp *.html *.css vercel.json config.js store.js grade.js talk-local.js debate-local.js report.js artest-data.js catalog.js catalog-sum.js catalog-pins.js "$D"/ && cp -r books assets "$D"/ && cd "$D" && vercel deploy --prod --yes
```

**주의:** cp 목록에 `catalog.js catalog-sum.js catalog-pins.js` 세 개가 새로 들어갔다. 빠뜨리면 서재가 빈 화면이 된다.

- [ ] **Step 5: 올라간 주소에서 확인한다**

```bash
t=$(date +%s); for f in library.html catalog.js catalog-pins.js; do echo "$f $(curl -s -o /dev/null -w '%{http_code} %{size_download}' "https://readingbrain-books.vercel.app/$f?t=$t")"; done
```
Expected: 셋 다 200 이고 `catalog.js` 가 40만 바이트 안팎.

- [ ] **Step 6: 기억에 적는다**

`C:\Users\white\.claude\projects\C--Users-white\memory\readingbrain-book-webapp-service.md` 에 날짜와 함께: 서재 4,820권 추가, 표지는 오픈라이브러리 번호만 저장(그림 보관 안 함), 구글 북스는 키 없이 할당량 초과라 못 씀, 유튜브는 검색 버튼 + 원장이 고른 것만 임베드, 배포 cp 목록에 catalog 3파일 추가.

- [ ] **Step 7: 커밋**

```bash
git add -A && git commit -m "chore(서재): 배포와 기억 정리"
```
