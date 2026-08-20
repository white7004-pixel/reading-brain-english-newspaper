# Market-Ready Teacher Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 동일한 실사형 3D 강사의 자연스러운 말하기·눈 깜빡임과 음성에 동기화된 필기·포인터를 결합하고, 교사와 콘텐츠가 겹치지 않는 출시형 모바일·데스크톱 수업 화면을 만든다.

**Architecture:** `speech.js`는 브라우저 음성 이벤트를 전달하고, `lesson-choreography.js`는 설명 줄과 음성 위치를 계산하며, `teacher-avatar.js`는 캐릭터 프레임과 타이머만 관리한다. `app.js`는 이 모듈들을 단계 전환에 맞춰 조정하고, HTML/CSS는 교사 전용 스테이지와 학습 카드의 분리된 레이아웃을 제공한다.

**Tech Stack:** Vanilla HTML/CSS/JavaScript ES modules, Web Speech API, Node.js test runner, Playwright, built-in image generation, local PNG assets

**Spec:** `docs/superpowers/specs/2026-08-21-market-ready-teacher-experience-design.md`

## Global Constraints

- 기존 98개 단원, 로컬 실행, 음성, 녹음, 퀴즈, 진도, 인쇄 기능을 유지한다.
- 외부 유료 API와 런타임 네트워크 요청을 추가하지 않는다.
- 캐릭터 네 프레임은 얼굴·의상·손·포인터 위치가 일치해야 한다.
- 기존 `.teacher-mouth` CSS 오버레이는 제거한다.
- 버튼은 최소 44×44px, 텍스트 대비는 WCAG AA 이상을 유지한다.
- `prefers-reduced-motion: reduce`에서는 캐릭터·필기·포인터 애니메이션을 제거하고 전체 설명을 즉시 표시한다.
- 단계 변경, 홈 이동, 퀴즈 진입, 음성 종료·오류 시 모든 타이머와 음성을 정리한다.
- 텍스트 변경은 `apply_patch`, 이미지 생성은 built-in imagegen을 사용한다.
- 각 코드 변경은 실패 테스트 → 최소 구현 → 전체 회귀 테스트 → 해당 경로만 커밋 순서로 진행한다.

---

## Task 1: 음성 이벤트 계약 확장

**Files:**
- Modify: `js/speech.js`
- Modify: `tests/voice.test.js`

**Interfaces:**
- Consumes: `createSpeechController(synth, Utterance)` 기존 팩터리
- Produces: `speak(text, { lang, rate, onstart, onboundary, onend, onerror }): boolean`

- [ ] **Step 1: 경계·오류 이벤트 전달 실패 테스트 작성**

```js
test('speech controller forwards choreography lifecycle events', () => {
  const spoken = [];
  class Utterance { constructor(text) { this.text = text; } }
  const synth = { cancel() {}, getVoices: () => [], speak: item => spoken.push(item) };
  const events = { onstart() {}, onboundary() {}, onend() {}, onerror() {} };
  createSpeechController(synth, Utterance).speak('핵심 설명', events);
  for (const [name, handler] of Object.entries(events)) assert.equal(spoken[0][name], handler);
});
```

- [ ] **Step 2: 테스트가 `onboundary` 또는 `onerror` 누락으로 실패하는지 확인**

Run: `node --test tests/voice.test.js`
Expected: FAIL — utterance의 `onboundary` 또는 `onerror`가 `undefined`다.

- [ ] **Step 3: 음성 이벤트를 그대로 연결**

```js
speak(text, { lang = 'ko-KR', rate = 1, onstart, onboundary, onend, onerror } = {}) {
  if (!supported || !String(text).trim()) return false;
  synth.cancel();
  const utterance = new Utterance(String(text).replaceAll('[[', '').replaceAll(']]', ''));
  Object.assign(utterance, { lang, rate, onstart, onboundary, onend, onerror });
  const language = lang.toLowerCase().slice(0, 2);
  utterance.voice = (synth.getVoices?.() || []).find(voice =>
    voice.lang?.toLowerCase().startsWith(language)) || null;
  synth.speak(utterance);
  return true;
}
```

- [ ] **Step 4: 음성 단위 테스트와 전체 테스트 통과 확인**

Run: `node --test tests/voice.test.js && npm test`
Expected: PASS

- [ ] **Step 5: 커밋**

```powershell
git add -- '문법선생님/js/speech.js' '문법선생님/tests/voice.test.js'
git commit -m "feat: expose speech choreography events"
```

---

## Task 2: 설명 줄·음성 위치 동기화 모듈

**Files:**
- Create: `js/lesson-choreography.js`
- Create: `tests/choreography.test.js`

**Interfaces:**
- Produces: `splitLessonLines(text: string, maxLines?: number): string[]`
- Produces: `lineIndexForBoundary(lines: string[], charIndex: number): number`
- Produces: `createLessonChoreography({ onLine, setTimer, clearTimer, reducedMotion }): { start(lines, durationMs), boundary(charIndex), stop() }`

- [ ] **Step 1: 줄 분리·경계 계산·타이머 정리 테스트 작성**

```js
test('splitLessonLines returns at most three meaningful lines', () => {
  assert.deepEqual(splitLessonLines('첫 문장입니다. 둘째 문장입니다! 셋째 문장입니다? 넷째 문장입니다.'),
    ['첫 문장입니다.', '둘째 문장입니다!', '셋째 문장입니다? 넷째 문장입니다.']);
});

test('lineIndexForBoundary maps a speech character to its line', () => {
  assert.equal(lineIndexForBoundary(['하나.', '둘입니다.', '셋.'], 5), 1);
});

test('stop clears every fallback timer', () => {
  const cleared = [];
  const choreography = createLessonChoreography({
    onLine() {}, setTimer: (fn, delay) => delay, clearTimer: id => cleared.push(id), reducedMotion: false
  });
  choreography.start(['첫째', '둘째', '셋째'], 3000);
  choreography.stop();
  assert.deepEqual(cleared, [1000, 2000]);
});
```

- [ ] **Step 2: 모듈 부재로 실패 확인**

Run: `node --test tests/choreography.test.js`
Expected: FAIL — `lesson-choreography.js`를 찾을 수 없다.

- [ ] **Step 3: 순수 줄 계산 함수 구현**

```js
export function splitLessonLines(text, maxLines = 3) {
  const sentences = String(text).trim().split(/(?<=[.!?。])\s+/).filter(Boolean);
  if (sentences.length <= maxLines) return sentences;
  return [...sentences.slice(0, maxLines - 1), sentences.slice(maxLines - 1).join(' ')];
}

export function lineIndexForBoundary(lines, charIndex) {
  let end = 0;
  for (let index = 0; index < lines.length; index += 1) {
    end += lines[index].length + (index ? 1 : 0);
    if (charIndex < end) return index;
  }
  return Math.max(0, lines.length - 1);
}
```

- [ ] **Step 4: 타이머 기반 폴백과 정리 구현**

`createLessonChoreography`는 시작 즉시 0번 줄을 활성화하고, 모션 축소가 아니며 줄이 2개 이상일 때만 `durationMs / lines.length` 간격의 타이머를 만든다. `boundary(charIndex)`는 타이머와 관계없이 계산된 줄을 활성화하며, `stop()`은 저장된 모든 타이머를 지운다.

- [ ] **Step 5: 모듈 테스트 통과 확인 및 커밋**

Run: `node --test tests/choreography.test.js && npm test`
Expected: PASS

```powershell
git add -- '문법선생님/js/lesson-choreography.js' '문법선생님/tests/choreography.test.js'
git commit -m "feat: synchronize lesson lines with speech"
```

---

## Task 3: 교사 아바타 상태 모듈

**Files:**
- Create: `js/teacher-avatar.js`
- Create: `tests/teacher-avatar.test.js`

**Interfaces:**
- Consumes: `{ neutral, talkSoft, talkOpen, blink }` 이미지 경로 객체
- Produces: `createTeacherAvatar({ image, frames, reducedMotion, random, setTimer, clearTimer }): { idle(), speak(), pause(), destroy(), state }`

- [ ] **Step 1: 상태 전환과 중복 타이머 방지 테스트 작성**

```js
test('speaking cycles frames and pause restores neutral frame', () => {
  const image = { src: '' };
  const scheduled = [];
  const avatar = createTeacherAvatar({
    image, frames, reducedMotion: false, random: () => 0,
    setTimer: (fn, delay) => { scheduled.push({ fn, delay }); return scheduled.length; },
    clearTimer() {}
  });
  avatar.speak();
  assert.equal(avatar.state, 'speaking');
  scheduled[0].fn();
  assert.equal(image.src, frames.talkSoft);
  avatar.pause();
  assert.equal(image.src, frames.neutral);
  assert.equal(avatar.state, 'paused');
});

test('repeated speak does not create a second timer loop', () => {
  let timers = 0;
  const avatar = createTeacherAvatar({ image: { src: '' }, frames, reducedMotion: false,
    setTimer: () => ++timers, clearTimer() {} });
  avatar.speak(); avatar.speak();
  assert.equal(timers, 1);
});
```

- [ ] **Step 2: 모듈 부재 실패 확인**

Run: `node --test tests/teacher-avatar.test.js`
Expected: FAIL — `teacher-avatar.js`를 찾을 수 없다.

- [ ] **Step 3: 세 상태와 타이머 생명주기 구현**

말하기 프레임은 `neutral → talkSoft → talkOpen → talkSoft` 순환을 기본으로 하고 각 다음 지연은 `120 + random() * 70`ms로 계산한다. `idle()`은 `4000 + random() * 3000`ms 후 `blink`를 140ms 표시하고 다시 예약한다. `pause()`와 `destroy()`는 예약된 타이머를 지우고 중립 프레임으로 돌아간다.

- [ ] **Step 4: 모션 축소와 이미지 오류 폴백 테스트 추가 및 구현**

모션 축소일 때 `speak()`와 `idle()`이 타이머를 만들지 않는 테스트를 추가한다. 이미지의 `error` 이벤트에서는 `frames.neutral` 또는 기존 `assets/teacher-3d-navy.png`를 유지하고 더 이상 프레임을 바꾸지 않는다.

- [ ] **Step 5: 테스트 통과 확인 및 커밋**

Run: `node --test tests/teacher-avatar.test.js && npm test`
Expected: PASS

```powershell
git add -- '문법선생님/js/teacher-avatar.js' '문법선생님/tests/teacher-avatar.test.js'
git commit -m "feat: add lifecycle-safe teacher avatar"
```

---

## Task 4: 동일 교사 캐릭터 네 프레임 제작

**Files:**
- Create: `assets/teacher/teacher-neutral.png`
- Create: `assets/teacher/teacher-talk-soft.png`
- Create: `assets/teacher/teacher-talk-open.png`
- Create: `assets/teacher/teacher-blink.png`
- Modify: `tests/static.test.js`

**Interfaces:**
- Produces: 네 개의 동일 치수 투명 PNG와 Task 3의 `frames` 경로

- [ ] **Step 1: 네 프레임의 존재·크기 일치 테스트 작성**

```js
test('market-ready teacher frames exist as substantial local PNG assets', () => {
  const names = ['teacher-neutral.png','teacher-talk-soft.png','teacher-talk-open.png','teacher-blink.png'];
  const sizes = names.map(name => fs.statSync(`assets/teacher/${name}`).size);
  assert.ok(sizes.every(size => size > 200_000));
});
```

- [ ] **Step 2: 파일 부재로 실패 확인**

Run: `node --test tests/static.test.js`
Expected: FAIL — 첫 번째 교사 프레임을 찾을 수 없다.

- [ ] **Step 3: 기존 교사 이미지를 확인하고 중립 상반신 프레임 생성**

`view_image`로 `assets/teacher-3d-navy.png`를 확인한 뒤 built-in imagegen 편집을 사용한다. 편집 프롬프트는 다음 불변 조건을 포함한다.

```text
Use case: identity-preserve. Asset type: transparent waist-up teacher avatar.
Primary request: refine this same Korean female 3D teacher into a market-ready waist-up neutral teaching pose.
Invariants: preserve the same identity, face proportions, hairstyle, navy blazer, ivory blouse, gold pointer, camera, crop, body, hands, lighting, and transparent background.
Expression: eyes naturally open, lips gently closed, warm attentive expression.
Constraints: no text, no logo, no extra limbs, no background.
```

- [ ] **Step 4: 중립 프레임을 편집 기준으로 세 표정 변형 생성**

각 변형은 `teacher-neutral.png`를 편집 대상으로 사용하고 아래 한 가지 변화만 요청한다.

- `teacher-talk-soft.png`: change only the lips to a slight natural speaking opening
- `teacher-talk-open.png`: change only the lips to a modest rounded speaking shape
- `teacher-blink.png`: change only both eyelids to a natural blink; keep closed lips

각 결과를 `view_image`로 나란히 확인하고 얼굴·의상·손·포인터·투명 영역이 흔들린 결과는 한 번만 재생성한다.

- [ ] **Step 5: 네 파일 연결 테스트 통과 및 커밋**

Run: `node --test tests/static.test.js`
Expected: PASS

```powershell
git add -- '문법선생님/assets/teacher' '문법선생님/tests/static.test.js'
git commit -m "feat: add consistent teacher animation frames"
```

---

## Task 5: 교사·필기·포인터 통합

**Files:**
- Modify: `index.html`
- Modify: `js/app.js`
- Modify: `styles.css`
- Modify: `tests/static.test.js`
- Modify: `tests/browser.spec.mjs`

**Interfaces:**
- Consumes: `createTeacherAvatar`, `createLessonChoreography`, 확장된 `speech.speak`
- Produces: `startTeachingStep()`, `stopTeachingStep()`, `.lesson-line.active`, `.lesson-line.complete`, 교사 전용 스테이지

- [ ] **Step 1: 새 DOM과 기존 가짜 입 제거 정적 테스트 작성**

```js
test('lesson shell separates teacher stage from learning content', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  const css = fs.readFileSync('styles.css', 'utf8');
  for (const id of ['teacher-stage','teacher-avatar','teacher-pointer','lesson-writing']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.doesNotMatch(html, /teacher-mouth/);
  assert.doesNotMatch(css, /\.teacher-mouth/);
});
```

- [ ] **Step 2: 기존 DOM과 CSS 때문에 실패 확인**

Run: `node --test tests/static.test.js`
Expected: FAIL — 새 스테이지가 없고 `teacher-mouth`가 남아 있다.

- [ ] **Step 3: HTML을 교사 26%·카드 74% 구조로 변경**

`#teacher-stage` 안에는 단일 `#teacher-avatar` 이미지와 `#teacher-pointer`를 둔다. `#lesson-writing`은 현재 단계의 1–3개 설명 줄을 렌더링하는 카드 내부 영역으로 만든다. 말풍선은 `#teacher-nudge`로 바꾸고 “좋아요, 이제 형태를 볼까요?”처럼 짧은 진행 문장만 담는다.

- [ ] **Step 4: `app.js`의 기존 애니메이션을 두 모듈로 교체**

```js
const avatar = createTeacherAvatar({
  image: $('teacher-avatar'), frames: TEACHER_FRAMES,
  reducedMotion: prefersReducedMotion()
});
const choreography = createLessonChoreography({
  onLine: index => activateWritingLine(index),
  reducedMotion: prefersReducedMotion()
});

function stopTeachingStep() {
  speech.stop();
  choreography.stop();
  avatar.pause();
}

function startTeachingStep({ speak = false } = {}) {
  stopTeachingStep();
  const item = lessonSteps(state.lesson)[state.step];
  const lines = splitLessonLines(item.narration);
  renderWritingLines(lines);
  choreography.start(lines, Math.max(2400, item.narration.length * 85));
  if (!speak || !speech.supported) return avatar.idle();
  speech.speak(item.narration, {
    rate: Number($('speech-rate').value),
    onstart: () => avatar.speak(),
    onboundary: event => choreography.boundary(event.charIndex),
    onend: () => { avatar.idle(); choreography.complete(); },
    onerror: () => { avatar.pause(); choreography.stop(); }
  });
}
```

모든 단계 이동, 홈 이동, 퀴즈 진입, 자동 수업 일시정지에서 `stopTeachingStep()`을 먼저 호출한다. 기존 `setTeacherSpeaking`, `.teacher-mouth`, `animateLessonWriting`, `renderNarration` 코드는 제거한다.

- [ ] **Step 5: 포인터를 현재 줄 또는 핵심 `mark`에 연결**

`activateWritingLine(index)`는 기존 `active`를 `complete`로 바꾸고 새 줄을 `active`로 만든다. 다음 프레임에서 대상의 `getBoundingClientRect()`를 읽어 포인터의 CSS 변수 `--pointer-x`, `--pointer-y`, `--pointer-length`, `--pointer-angle`을 갱신한다. 580px 이하에서는 포인터 선을 숨기고 `.lesson-line.active::before` 금색 점을 사용한다.

- [ ] **Step 6: 출시형 CSS 토큰과 반응형 그리드 구현**

`--space-1:4px`부터 `--space-6:32px`, `--radius-card:20px`, `--tap:44px` 토큰을 정의한다. 데스크톱 `.board` 내부를 `grid-template-columns:26% 74%`로, 모바일은 카드와 28% 너비의 작은 교사 프레임이 겹치지 않는 별도 행으로 구성한다. 손글씨 폰트는 제거하고 공식·기억법에 굵은 교재형 고딕을 사용한다.

- [ ] **Step 7: 단위·정적·브라우저 테스트 통과 및 커밋**

Run: `npm test && npm run test:browser`
Expected: PASS

```powershell
git add -- '문법선생님/index.html' '문법선생님/js/app.js' '문법선생님/styles.css' '문법선생님/tests/static.test.js' '문법선생님/tests/browser.spec.mjs'
git commit -m "feat: integrate market-ready teacher choreography"
```

---

## Task 6: 수명주기·접근성·세 화면 회귀 검증

**Files:**
- Modify: `tests/browser.spec.mjs`
- Modify: `README.md`

**Interfaces:**
- Consumes: 완성된 교사 상태·필기·포인터·반응형 UI
- Produces: 출시 전 자동 회귀 증거

- [ ] **Step 1: 세 화면과 빠른 이동 회귀 테스트 추가**

```js
for (const viewport of [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 }
]) {
  const screen = await browser.newPage({ viewport });
  await screen.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  await screen.click('#start-button');
  const teacher = await screen.locator('#teacher-stage').boundingBox();
  const card = await screen.locator('#lesson-stage').boundingBox();
  assert.equal(rectanglesOverlap(teacher, card), false);
  assert.equal(await screen.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await screen.click('#next-button');
  await screen.click('#next-button');
  await screen.click('#home-button');
  assert.equal(await screen.locator('#teacher-avatar').getAttribute('data-state'), 'paused');
  await screen.close();
}
```

- [ ] **Step 2: 기존 겹치는 레이아웃 또는 상태 속성 부재로 실패 확인**

Run: `npm run test:browser`
Expected: FAIL — 교사·카드가 겹치거나 `data-state`가 없다.

- [ ] **Step 3: 모션 축소 브라우저 검증 추가**

`page.emulateMedia({ reducedMotion: 'reduce' })` 후 모든 `.lesson-line`이 `opacity: 1`, 아바타가 중립 프레임, 포인터 전환 시간이 `0s`인지 확인한다. 1·2·3권 대표 단원 `b1-c1-u1`, `b2-c4-u1`, `b3-c10-u1`에서도 같은 검사를 수행한다.

- [ ] **Step 4: README 갱신**

동일 교사 프레임 기반 말하기·눈 깜빡임, 음성 경계 폴백, 모션 축소, 로컬 자산 원칙, 브라우저별 음성 차이를 기록한다.

- [ ] **Step 5: 전체 검증 및 커밋**

Run: `npm test && npm run test:browser`
Expected: 단위·정적·브라우저 테스트 전체 PASS, 콘솔 오류 0개.

```powershell
git add -- '문법선생님/tests/browser.spec.mjs' '문법선생님/README.md'
git commit -m "test: verify release-ready teacher experience"
```

---

## Task 7: 완료 전 독립 검증

**Files:**
- Verify only: all files above

**Interfaces:**
- Consumes: Tasks 1–6의 커밋된 결과
- Produces: 완료 보고에 사용할 최신 검증 결과

- [ ] **Step 1: 검증 지침 적용**

`superpowers:verification-before-completion`을 읽고 이전 실행 결과를 재사용하지 않는다.

- [ ] **Step 2: 전체 자동 테스트 실행**

Run: `npm test`
Expected: 모든 테스트 PASS, 실패·취소 0개.

Run: `npm run test:browser`
Expected: 390×844, 768×1024, 1440×900 및 1·2·3권 대표 단원 PASS.

- [ ] **Step 3: 시각 검사**

모바일·태블릿·데스크톱 스크린샷에서 같은 교사인지, 프레임 변화 시 얼굴·의상·손·포인터가 움직이지 않는지, 교사가 본문을 가리지 않는지, 현재 줄과 핵심만 금색으로 강조되는지 확인한다.

- [ ] **Step 4: 변경 범위 검사**

Run: `git status --short -- 'OneDrive/Desktop/AI시대/문법선생님'`
Expected: 의도하지 않은 미커밋 변경 없음.

Run: `git log --oneline -7 -- 'OneDrive/Desktop/AI시대/문법선생님'`
Expected: 계획·기능·검증 커밋이 확인됨.

- [ ] **Step 5: 결과 보고**

교사 프레임 수, 음성 동기화 방식, 모바일·데스크톱 검증 크기, 테스트 통과 수, 실행 주소를 간결하게 전달한다.
