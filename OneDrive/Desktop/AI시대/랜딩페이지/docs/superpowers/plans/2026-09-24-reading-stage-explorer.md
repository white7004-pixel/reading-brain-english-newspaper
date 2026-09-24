# 단계 체험 도구 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 학부모가 슬라이더를 움직여 원서 단계 세 개를 직접 넘겨 보는 섹션을 랜딩페이지에 넣는다.

**Architecture:** 새 파일을 만들지 않는다. `index.html` 에 섹션 하나, `redesign.css` 에 §25, `redesign.js` 끝에 IIFE 하나. 세 단계 내용은 HTML 에 미리 다 넣어 두고 자바스크립트는 `hidden` 만 토글한다 — 자바스크립트가 죽어도 내용은 남는다.

**Tech Stack:** 순수 HTML/CSS/JS. 빌드 도구 없음. 검사는 `tmp/functest.js` (헤드리스 크롬 CDP).

**Spec:** `docs/superpowers/specs/2026-09-24-reading-stage-explorer-design.md`

## Global Constraints

- 색 토큰을 새로 만들지 않는다. `--brand-navy` `--brand-red` `--soft` `--soft-2` `--line` `--us-pad` `--us-round` `--us-pill` 만 쓴다.
- 글자 크기는 §24 기준을 따른다 — 읽는 문단 **15px**, 상세 **14px**, 라벨 13px 이하.
- `<img>` 에 `width`/`height` 속성을 쓸 거면 CSS 에 **`height: auto`** 를 같이 넣는다 (이 페이지의 리셋은 `img { max-width:100%; display:block }` 뿐이라 `aspect-ratio` 가 덮인다).
- 단계 내용은 `김기숙/knowledge/수업반구성.md` 와 `블로그운영기준.md` 에 적힌 것만 쓴다. **책 제목은 넣지 않는다** (어느 단계인지 기록이 없다).
- css/js 를 고쳤으면 `index.html` 의 `?v=` 판 번호 4곳을 모두 올린다.
- 배포는 `tmp/build-deploy.py` 로 참조 파일만 담은 `.deploy-pamus-tone/` 를 만든 뒤 거기서 한다. 프로젝트 폴더에서 `vercel --prod` 를 실행하지 않는다.
- 커밋은 이 폴더로 한정한다 (`git log --oneline -- .`).

---

### Task 1: 섹션 마크업 — 자바스크립트 없이도 내용이 다 보인다

**Files:**
- Modify: `index.html:4294` (`<!-- DIAGNOSTIC -->` 주석 **바로 앞**에 섹션을 끼운다)
- Test: `tmp/functest.js`

**Interfaces:**
- Produces: `#stageExplorer` (섹션), `#stageRange` (`input[type=range]`), `.stage-tab` (버튼 3개, `data-stage="0|1|2"`), `.stage-panel` (패널 3개, `data-stage="0|1|2"`)
- Consumes: 없음

- [ ] **Step 1: 검사를 먼저 추가한다 (실패하는 상태)**

`tmp/functest.js` 의 `console.log(JSON.stringify(out, null, 2));` **바로 앞**에 넣는다.

```js
  // 5) 단계 체험 도구
  out.stageTabs = await evalJs("document.querySelectorAll('#stageExplorer .stage-tab').length");
  out.stagePanels = await evalJs("document.querySelectorAll('#stageExplorer .stage-panel').length");
  out.stageTextAll = await evalJs("[...document.querySelectorAll('#stageExplorer .stage-panel')].every(p=>p.innerText.trim().length>40)");
  out.stageBroken = await evalJs("[...document.querySelectorAll('#stageExplorer img')].filter(i=>i.complete&&i.naturalWidth===0).length");
```

- [ ] **Step 2: 돌려서 실패하는지 본다**

```bash
node tmp/functest.js
```

예상: `stageTabs 0`, `stagePanels 0`, `stageTextAll true`(빈 배열이라 참 — 의미 없는 값이니 `stagePanels 0` 으로 판단한다)

- [ ] **Step 3: 섹션을 끼운다**

`index.html` 의 `<!-- DIAGNOSTIC (레벨 테스트 진단 시스템) -->` 줄 바로 앞에 붙인다.

```html
<!-- STAGE EXPLORER (우리 아이 지금 어디쯤인가) -->
<section class="stage-explorer" id="stageExplorer">
  <div class="container">
    <div class="text-center">
      <div class="section-label fade-up">Reading Stage</div>
      <h2 class="section-title fade-up">우리 아이는 <em>지금 어디쯤</em>일까요</h2>
      <p class="section-desc fade-up">손잡이를 움직여 보세요. 단계마다 아이가 교실에서 실제로 무엇을 하는지 그대로 적었습니다.</p>
    </div>

    <div class="stage-ctrl fade-up">
      <input type="range" id="stageRange" class="stage-range" min="0" max="2" step="1" value="1"
             aria-label="원서 단계 선택">
      <div class="stage-tabs">
        <button type="button" class="stage-tab" data-stage="0" aria-pressed="false">기초원서리딩</button>
        <button type="button" class="stage-tab is-on" data-stage="1" aria-pressed="true">원서정독 Basic</button>
        <button type="button" class="stage-tab" data-stage="2" aria-pressed="false">원서정독 Inter</button>
      </div>
    </div>

    <div class="stage-stack fade-up" aria-live="polite">

      <article class="stage-panel" data-stage="0">
        <div class="stage-body">
          <div class="stage-head">
            <h3>기초원서리딩</h3>
            <span class="stage-mark">소리와 글자를 함께 익히는 단계</span>
          </div>
          <ul class="stage-points">
            <li>오디오를 <b>3번</b> 듣고 소리와 글자를 맞춰 갑니다.</li>
            <li>자리에서 책을 소리 내어 읽습니다.</li>
            <li>단어 시험에서 틀린 단어는 영어 3번, 뜻 1번 씁니다.</li>
          </ul>
        </div>
        <figure class="stage-shot">
          <img src="images/phonics/phonics-read-to-me.jpg" alt="리딩브레인 기초원서리딩 수업 — 소리를 들으며 따라 읽는 모습" loading="lazy">
        </figure>
      </article>

      <article class="stage-panel" data-stage="1">
        <div class="stage-body">
          <div class="stage-head">
            <h3>원서정독 Basic</h3>
            <span class="stage-mark">AR 2.0 이상</span>
          </div>
          <ul class="stage-points">
            <li>오디오를 <b>2번</b> 듣고 따라 읽습니다.</li>
            <li>워크시트로 읽은 내용을 자기 문장으로 다시 씁니다.</li>
            <li>선생님과 <b>5분 북토킹</b>, 마지막 60초는 녹음합니다.</li>
            <li>북퀴즈에서 틀린 문제는 근거 페이지와 근거 문장을 찾아 씁니다.</li>
            <li>AR 3.0부터는 자리에서 읽기를 생략하고 집중듣기로 넘어갑니다.</li>
          </ul>
        </div>
        <figure class="stage-shot">
          <img src="images/heidi/worksheet-writing.jpg" alt="리딩브레인 원서정독 수업 — 워크시트를 작성하는 모습" loading="lazy">
        </figure>
      </article>

      <article class="stage-panel" data-stage="2">
        <div class="stage-body">
          <div class="stage-head">
            <h3>원서정독 Inter</h3>
            <span class="stage-mark">AR 4.0 이상</span>
          </div>
          <ul class="stage-points">
            <li>집중듣기 <b>1번</b>으로 넘어갑니다.</li>
            <li>워크시트 대신 <b>PAL 시스템</b>으로 진행합니다.</li>
            <li>북토킹과 북퀴즈는 그대로 이어집니다.</li>
          </ul>
        </div>
        <figure class="stage-shot">
          <img src="images/worksheets/summary-power-of-the-cell.jpg" alt="리딩브레인 원서정독 결과물 — 논픽션 내용 요약 맵" loading="lazy">
        </figure>
      </article>

    </div>

    <p class="stage-foot fade-up">
      레벨테스트(RTP)는 <b>3·6·9·12월 첫째 주</b>에 전 재원생이 봅니다.
      지금 어느 단계인지는 <a href="#roadmap-consult">1:1 학습 로드맵 상담</a>에서 확인해 드립니다.
    </p>
  </div>
</section>

```

- [ ] **Step 4: 다시 돌려서 통과하는지 본다**

```bash
node tmp/functest.js
```

예상: `stageTabs 3`, `stagePanels 3`, `stageTextAll true`, `stageBroken 0`, `jsErrors "(없음)"`

- [ ] **Step 5: 커밋**

```bash
git add index.html tmp/functest.js
git commit -m "feat: 단계 체험 도구 마크업을 넣는다"
```

---

### Task 2: 모양 (redesign.css §25)

**Files:**
- Modify: `redesign.css` (파일 끝에 §25 추가)
- Modify: `index.html` (`?v=` 판 번호 4곳)
- Test: 브라우저 390px / 1440px

**Interfaces:**
- Consumes: Task 1 의 `.stage-explorer` `.stage-ctrl` `.stage-range` `.stage-tabs` `.stage-tab` `.stage-stack` `.stage-panel` `.stage-body` `.stage-head` `.stage-mark` `.stage-points` `.stage-shot` `.stage-foot`
- Produces: `.stage-panel` 이 `hidden` 일 때 감춰지는 규칙 (Task 3 이 쓴다)

- [ ] **Step 1: §25 를 파일 끝에 붙인다**

```css

/* ─── 25. 단계 체험 도구 ─────────────────────────────────────────
   자바스크립트가 없으면 세 단계가 모두 세로로 보인다.
   자바스크립트가 붙으면 hidden 으로 하나만 남긴다. */
.stage-explorer {
  background: var(--soft);
  border-bottom: 1px solid var(--line);
  padding: var(--us-pad) 40px;
}
.stage-ctrl { max-width: 720px; margin: 40px auto 0; }
.stage-range { width: 100%; accent-color: var(--brand-red); cursor: pointer; }
.stage-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 14px; }
.stage-tab {
  padding: 10px 8px;
  border: 1px solid var(--line);
  border-radius: var(--us-pill);
  background: #fff;
  color: var(--brand-navy);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background .2s, color .2s, border-color .2s;
}
.stage-tab.is-on { background: var(--brand-navy); border-color: var(--brand-navy); color: #fff; }

.stage-stack { max-width: 1040px; margin: 28px auto 0; }
.stage-panel {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 28px;
  align-items: center;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: var(--us-round);
  background: #fff;
}
.stage-panel + .stage-panel { margin-top: 16px; }
/* display:grid 가 브라우저 기본 [hidden]{display:none} 을 이긴다. 되돌린다. */
.stage-panel[hidden] { display: none; }
.stage-head { margin-bottom: 14px; }
.stage-head h3 { font-size: 22px; font-weight: 900; color: var(--brand-navy); letter-spacing: -0.02em; }
.stage-mark {
  display: inline-block;
  margin-top: 6px;
  padding: 3px 10px;
  border-radius: var(--us-pill);
  background: var(--soft-2);
  color: var(--brand-red);
  font-size: 13px;
  font-weight: 700;
}
.stage-points { list-style: none; display: flex; flex-direction: column; gap: 9px; }
.stage-points li {
  position: relative;
  padding-left: 15px;
  font-size: 15px;
  line-height: 1.65;
  color: var(--body-text);
}
.stage-points li::before {
  content: '';
  position: absolute;
  top: 10px; left: 0;
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--brand-red);
}
.stage-shot { margin: 0; }
.stage-shot img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--us-round);
  background: var(--soft-2);
}
.stage-foot {
  max-width: 1040px;
  margin: 22px auto 0;
  font-size: 15px;
  line-height: 1.7;
  color: var(--body-text);
  text-align: center;
}
.stage-foot a { color: var(--brand-red); font-weight: 700; text-decoration: underline; }

@media (max-width: 760px) {
  .stage-explorer { padding: var(--us-pad) 20px; }
  .stage-panel { grid-template-columns: 1fr; gap: 18px; padding: 20px; }
  .stage-tabs { gap: 6px; }
  .stage-tab { font-size: 13px; padding: 9px 4px; }
}
```

- [ ] **Step 2: 판 번호를 올린다**

```bash
sed -i 's/v=20260926/v=20260927/g' index.html
grep -c "v=20260927" index.html   # 4 가 나와야 한다
```

- [ ] **Step 3: 브라우저에서 두 폭을 본다**

로컬 서버가 죽어 있으면 먼저 띄운다 (`python -m http.server` 는 동영상 요청에 죽는다).

```bash
python tmp/serve.py 8765
```

Browser pane 으로 `http://localhost:8765/index.html?v=20260927` 을 열고 확인한다.
- 1440px: 패널이 글 왼쪽 / 사진 오른쪽 2단
- 390px: 세로 1단, **가로 스크롤 없음** (`document.documentElement.scrollWidth > window.innerWidth` 가 `false`)

- [ ] **Step 4: 커밋**

```bash
git add redesign.css index.html
git commit -m "style: 단계 체험 도구 모양을 넣는다"
```

---

### Task 3: 동작 (슬라이더 · 버튼 · 키보드)

**Files:**
- Modify: `redesign.js` (파일 끝)
- Modify: `index.html` (`?v=` 판 번호)
- Test: `tmp/functest.js`

**Interfaces:**
- Consumes: Task 1 의 `#stageRange` `.stage-tab[data-stage]` `.stage-panel[data-stage]`, Task 2 의 `.stage-tab.is-on`
- Produces: 없음 (마지막 단계)

- [ ] **Step 1: 검사를 먼저 추가한다 (실패하는 상태)**

`tmp/functest.js` 의 Task 1 에서 넣은 줄들 **바로 뒤**에 이어 붙인다.

```js
  const visPanels = "[...document.querySelectorAll('#stageExplorer .stage-panel')].filter(e=>!e.hidden).length";
  const onStage = "[...document.querySelectorAll('#stageExplorer .stage-panel')].findIndex(e=>!e.hidden)";
  out.stageVisibleAtStart = await evalJs(visPanels);
  await evalJs("(()=>{const r=document.getElementById('stageRange');r.value='2';r.dispatchEvent(new Event('input'))})()");
  await sleep(120);
  out.stageAfterSlide = await evalJs(onStage);
  out.stageVisibleAfterSlide = await evalJs(visPanels);
  await evalJs("document.querySelector('#stageExplorer .stage-tab[data-stage=\"0\"]').click()");
  await sleep(120);
  out.stageAfterTab = await evalJs(onStage);
  out.stageRangeSynced = await evalJs("document.getElementById('stageRange').value === '0'");
  out.stageAriaSynced = await evalJs("document.querySelector('#stageExplorer .stage-tab[data-stage=\"0\"]').getAttribute('aria-pressed') === 'true' && document.querySelector('#stageExplorer .stage-tab[data-stage=\"1\"]').getAttribute('aria-pressed') === 'false'");
```

- [ ] **Step 2: 돌려서 실패하는지 본다**

```bash
node tmp/functest.js
```

예상: `stageVisibleAtStart 3` (아직 감추는 코드가 없다), `stageAfterSlide 0`, `stageRangeSynced false`

- [ ] **Step 3: 동작을 붙인다**

`redesign.js` 끝에 붙인다.

```js

/* 단계 체험 도구 — 슬라이더와 버튼이 같은 값을 본다.
   자바스크립트가 붙기 전에는 세 단계가 모두 보이고, 붙으면 하나만 남는다. */
(function () {
  var range = document.getElementById('stageRange');
  var wrap = document.getElementById('stageExplorer');
  if (!range || !wrap) return;
  var tabs = [].slice.call(wrap.querySelectorAll('.stage-tab'));
  var panels = [].slice.call(wrap.querySelectorAll('.stage-panel'));

  function show(n) {
    panels.forEach(function (p) { p.hidden = Number(p.dataset.stage) !== n; });
    tabs.forEach(function (t) {
      var on = Number(t.dataset.stage) === n;
      t.classList.toggle('is-on', on);
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (range.value !== String(n)) range.value = String(n);
  }

  range.addEventListener('input', function () { show(Number(range.value)); });
  tabs.forEach(function (t) {
    t.addEventListener('click', function () { show(Number(t.dataset.stage)); });
  });
  show(Number(range.value));
})();
```

- [ ] **Step 4: 다시 돌려서 통과하는지 본다**

```bash
sed -i 's/v=20260927/v=20260928/g' index.html
rm -rf tmp/chrome-*/Default/Cache
node tmp/functest.js
```

예상: `stageVisibleAtStart 1`, `stageAfterSlide 2`, `stageVisibleAfterSlide 1`, `stageAfterTab 0`, `stageRangeSynced true`, `stageAriaSynced true`, `jsErrors "(없음)"`

- [ ] **Step 5: 키보드로 움직이는지 직접 본다**

Browser pane 에서 슬라이더에 탭으로 이동한 뒤 좌우 화살표를 누른다.
빨간 포커스 링이 보이고(§23), 화살표마다 패널이 바뀌어야 한다.

- [ ] **Step 6: 커밋**

```bash
git add redesign.js index.html tmp/functest.js
git commit -m "feat: 단계 체험 도구를 슬라이더로 넘긴다"
```

---

### Task 4: 검토 · 배포

**Files:** 없음 (검증과 배포만)

- [ ] **Step 1: 코드 검토를 받는다**

`superpowers:requesting-code-review` 로 Task 1~3 범위를 검토시킨다.
`BASE_SHA` 는 Task 1 직전 커밋, `HEAD_SHA` 는 Task 3 커밋.

- [ ] **Step 2: 검토 결과를 반영한다**

`superpowers:receiving-code-review` 로 지적을 하나씩 코드와 대조한다.
틀린 지적은 근거를 대고 반려한다.

- [ ] **Step 3: 전체 검사**

```bash
node tmp/functest.js
```

`revealShown`, `heroBroken 0`, `workBroken 0`, `stageBroken 0`, `jsErrors "(없음)"` 을 눈으로 확인한다.

- [ ] **Step 4: 배포본을 만든다**

```bash
python tmp/build-deploy.py
```

- [ ] **Step 5: 원장님께 배포해도 되는지 여쭌다**

배포는 바깥으로 나가는 일이다. 먼저 화면으로 보여 드리고 승낙을 받는다.

- [ ] **Step 6: 배포하고 사이트에서 확인한다**

```bash
cd .deploy-pamus-tone && vercel --prod --yes
```

사이트에서 `#stageExplorer` 가 있고 패널이 하나만 보이는지 확인한다.
