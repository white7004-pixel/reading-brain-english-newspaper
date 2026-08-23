# Natural Voice Lesson Choreography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ElevenLabs 큐별 음성, 핵심 설명과 판서의 단일 원본, 안정적인 호흡 및 일시정지가 결합된 초등 문법 수업 재생 흐름을 구축한다.

**Architecture:** 기존 단계별 대본을 `core/explain/example/question/summary` 큐 배열로 정규화하고, 순수 함수 기반 큐 검증기와 상태 기반 재생 엔진을 추가한다. 재생 엔진은 로컬 MP3를 우선 사용하고 실제 종료 후 호흡 시간을 적용하며, 실패 시 브라우저 음성으로 한 번만 대체한다. UI는 이 엔진의 이벤트만 구독하여 자막, 누적 판서, 교사 애니메이션과 조작 버튼을 동기화한다.

**Tech Stack:** 브라우저 ES modules, Node.js `node:test`, Playwright, ElevenLabs HTTP API, 로컬 MP3/JSON 매니페스트

**Spec:** `docs/superpowers/specs/2026-08-23-natural-voice-lesson-choreography-design.md`

## Global Constraints

- 기본 재생 속도는 `추천`이며 기존보다 약 10~15% 느린 교사 발화를 사용한다.
- 일반 문장 뒤 700ms, 영어 예문과 한국어 설명 사이 800ms, 핵심 판서 뒤 1500ms, 질문 뒤 2000ms, 단계 전환 전 2500ms를 기본값으로 사용한다.
- 한 큐는 최대 두 문장, 판서는 최대 세 줄이다.
- ElevenLabs API 키는 로컬 환경 변수에서만 읽고 브라우저 번들, 로그, 대본과 매니페스트에 기록하지 않는다.
- 로컬 MP3가 없거나 재생에 실패하면 동일 큐를 브라우저 음성으로 정확히 한 번 대체한다.
- 음성 재생 중에는 다음 큐나 단계로 넘어가지 않는다.
- 모션 감소 설정은 판서를 즉시 완성하지만 학습용 호흡 시간은 유지한다.
- 기존 전체 교재, 퀴즈, 진도 저장, 인쇄 흐름을 유지한다.

---

### Task 1: 수업 큐 모델과 검증 계약

**Files:**
- Create: `js/lesson-cues.js`
- Create: `tests/lesson-cues.test.js`
- Modify: `js/lesson-script.js`

**Interfaces:**
- Consumes: 기존 `buildLessonSteps(lesson)`의 단계별 `heading`, `narration`, `boardLines`
- Produces: `PAUSE_MS`, `buildLessonCues(lesson)`, `validateCue(cue)`, `validateLessonCues(cues)`
- Cue shape: `{ id, stepIndex, kind, narration, boardLines, emphasis, pauseAfterMs }`

- [ ] **Step 1: 큐 계약의 실패 테스트 작성**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { PAUSE_MS, validateCue } from '../js/lesson-cues.js';

test('core cue shares its grammar term with narration and board', () => {
  assert.deepEqual(validateCue({
    id: 'b1-c1-u1-core', stepIndex: 0, kind: 'core',
    narration: 'be동사는 존재하거나 어떤 상태임을 나타내요.',
    boardLines: ['be = 존재하다 · 상태이다'], emphasis: ['be'],
    pauseAfterMs: PAUSE_MS.core
  }), []);
});

test('cue validation rejects long narration, four board lines, and mismatched emphasis', () => {
  const errors = validateCue({
    id: 'bad', stepIndex: 0, kind: 'core',
    narration: '첫 문장입니다. 둘째 문장입니다. 셋째 문장입니다.',
    boardLines: ['하나', '둘', '셋', '넷'], emphasis: ['be'], pauseAfterMs: 10
  });
  assert.ok(errors.some(error => error.includes('두 문장')));
  assert.ok(errors.some(error => error.includes('세 줄')));
  assert.ok(errors.some(error => error.includes('핵심어')));
});
```

- [ ] **Step 2: 테스트가 누락 모듈로 실패하는지 확인**

Run: `node --test tests/lesson-cues.test.js`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `js/lesson-cues.js`.

- [ ] **Step 3: 상수와 최소 검증기 구현**

```js
export const PAUSE_MS = Object.freeze({ sentence: 700, example: 800, core: 1500, question: 2000, summary: 2500 });
const sentences = text => String(text).split(/(?<=[.!?])\s+/).filter(Boolean);

export function validateCue(cue) {
  const errors = [];
  if (sentences(cue.narration).length > 2) errors.push('큐 설명은 최대 두 문장이어야 합니다.');
  if (!cue.boardLines?.length || cue.boardLines.length > 3) errors.push('판서는 한 줄 이상 세 줄 이하여야 합니다.');
  for (const term of cue.emphasis || []) {
    if (!cue.narration.includes(term) || !cue.boardLines.some(line => line.includes(term))) {
      errors.push(`핵심어 ${term}가 설명과 판서 양쪽에 있어야 합니다.`);
    }
  }
  return errors;
}
```

- [ ] **Step 4: 큐 생성 테스트 추가**

```js
import { buildLessonCues, validateLessonCues } from '../js/lesson-cues.js';
import { lessons } from '../js/lessons.js';

test('all 98 lessons produce ordered valid cue groups', () => {
  assert.equal(lessons.length, 98);
  for (const lesson of lessons) {
    const cues = buildLessonCues(lesson);
    assert.deepEqual([...new Set(cues.map(cue => cue.kind))], ['core', 'explain', 'example', 'question', 'summary']);
    assert.deepEqual(validateLessonCues(cues), []);
  }
});
```

- [ ] **Step 5: 테스트를 실행해 기존 대본이 큐 계약을 만들지 못해 실패하는지 확인**

Run: `node --test tests/lesson-cues.test.js`

Expected: FAIL because `buildLessonCues` or `validateLessonCues` is not exported.

- [ ] **Step 6: 기존 단계 데이터를 큐로 정규화**

`buildLessonCues`는 `buildLessonSteps` 결과의 각 단계를 다섯 큐로 변환한다. 핵심 큐의 `emphasis`는 수업의 문법 용어를 사용하고, 나머지는 빈 배열을 허용한다. 설명이 두 문장을 넘으면 문장 단위로 큐를 추가하되 같은 `kind`를 유지한다. 마지막 큐만 `PAUSE_MS.summary`, 질문 큐는 `PAUSE_MS.question`, 핵심 큐는 `PAUSE_MS.core`, 그 외는 `PAUSE_MS.sentence` 또는 `PAUSE_MS.example`을 사용한다.

```js
export function validateLessonCues(cues) {
  return cues.flatMap((cue, index) => validateCue(cue).map(error => `${cue.id || index}: ${error}`));
}

export function buildLessonCues(lesson) {
  const steps = buildLessonSteps(lesson);
  return steps.flatMap((step, stepIndex) => normalizeStepToCues(lesson, step, stepIndex));
}
```

- [ ] **Step 7: 큐 테스트와 전체 콘텐츠 테스트 통과 확인**

Run: `node --test tests/lesson-cues.test.js tests/content.test.js tests/lesson-script.test.js`

Expected: PASS with zero failures.

- [ ] **Step 8: 큐 모델 커밋**

```bash
git add js/lesson-cues.js js/lesson-script.js tests/lesson-cues.test.js
git commit -m "feat: model synchronized lesson cues"
```

---

### Task 2: 큐별 음성 명세와 매니페스트

**Files:**
- Modify: `js/lesson-audio.js`
- Modify: `scripts/generate_lesson_audio.mjs`
- Modify: `tests/lesson-audio.test.js`
- Modify: `tests/elevenlabs-audio.test.js`

**Interfaces:**
- Consumes: Task 1의 `buildLessonCues(lesson)`
- Produces: `cueAudioPath(unitId, cueId)`, `buildAudioJobs(lessons)`, 매니페스트의 `{ path, durationMs, scriptHash, settingsHash, approved }`

- [ ] **Step 1: 안정적인 큐 경로와 작업 명세 실패 테스트 작성**

```js
test('cue audio path is stable and does not expose narration', () => {
  assert.equal(cueAudioPath('b1-c1-u1', 'b1-c1-u1-core-1'), 'assets/audio/b1-c1-u1/b1-c1-u1-core-1.mp3');
});

test('audio jobs include every cue once with the calm teacher profile', () => {
  const jobs = buildAudioJobs(lessons);
  const expected = lessons.flatMap(buildLessonCues).length;
  assert.equal(jobs.length, expected);
  assert.ok(jobs.every(job => job.settings.speed === 0.88));
  assert.ok(jobs.every(job => !JSON.stringify(job).includes(process.env.ELEVENLABS_API_KEY || 'never-match')));
});
```

- [ ] **Step 2: 새 인터페이스가 없어 실패하는지 확인**

Run: `node --test tests/lesson-audio.test.js tests/elevenlabs-audio.test.js`

Expected: FAIL because `cueAudioPath` and `buildAudioJobs` are missing.

- [ ] **Step 3: 큐 경로와 생성 작업 구현**

```js
export const cueAudioPath = (unitId, cueId) => `assets/audio/${unitId}/${cueId}.mp3`;

export function buildAudioJobs(allLessons) {
  return allLessons.flatMap(lesson => buildLessonCues(lesson).map(cue => ({
    unitId: lesson.id,
    cueId: cue.id,
    text: cue.narration,
    output: cueAudioPath(lesson.id, cue.id),
    settings: { modelId: 'eleven_multilingual_v2', outputFormat: 'mp3_44100_128', speed: 0.88 }
  })));
}
```

- [ ] **Step 4: 변경된 큐만 재생성하는 실패 테스트 작성**

```js
test('audio generation skips an approved cue with matching hashes', async () => {
  const manifest = { cues: { core1: { scriptHash: 'same', settingsHash: 'voice', approved: true } } };
  const generated = await generateAudioJobs([{ cueId: 'core1', scriptHash: 'same', settingsHash: 'voice' }], { manifest, request: async () => assert.fail('must skip') });
  assert.equal(generated.skipped, 1);
});
```

- [ ] **Step 5: 실패 확인 후 매니페스트를 큐 단위로 확장**

Run: `node --test tests/elevenlabs-audio.test.js`

Expected: FAIL because the existing generator indexes step files rather than cue hashes.

`generateAudioJobs`는 승인 상태와 두 해시가 모두 일치할 때만 건너뛴다. 새 MP3를 저장한 뒤 오디오 duration probe 결과를 `durationMs`에 기록하고 API 키와 원문 전체는 매니페스트에 쓰지 않는다.

- [ ] **Step 6: 음성 생성 관련 테스트 통과 확인**

Run: `node --test tests/lesson-audio.test.js tests/elevenlabs-audio.test.js tests/generation-manifest.test.js`

Expected: PASS with zero failures.

- [ ] **Step 7: 생성 파이프라인 커밋**

```bash
git add js/lesson-audio.js scripts/generate_lesson_audio.mjs tests/lesson-audio.test.js tests/elevenlabs-audio.test.js tests/generation-manifest.test.js
git commit -m "feat: generate cue-based ElevenLabs audio"
```

---

### Task 3: 일시정지 가능한 큐 재생 엔진

**Files:**
- Create: `js/lesson-player.js`
- Create: `tests/lesson-player.test.js`
- Modify: `js/lesson-audio.js`
- Modify: `js/speech.js`

**Interfaces:**
- Consumes: 큐 배열, `lessonAudio.playCue(unitId, cueId, callbacks)`, `speech.speak(text, callbacks)`
- Produces: `createLessonPlayer({ audio, speech, clock, onEvent })`
- Player methods: `load(unitId, cues)`, `play()`, `pause()`, `resume()`, `replay()`, `stop()`, `setPace(pace)`
- Events: `cue-start`, `audio-start`, `audio-progress`, `board-line`, `pause-start`, `cue-end`, `lesson-end`, `error`

- [ ] **Step 1: 실제 음성 종료 전에 다음 큐로 가지 않는 실패 테스트 작성**

```js
test('player waits for audio end and the cue pause before advancing', async () => {
  const events = [];
  const fixture = createPlayerFixture({ events });
  fixture.player.load('unit-1', [coreCue, explainCue]);
  fixture.player.play();
  assert.deepEqual(events.map(event => event.type), ['cue-start']);
  fixture.audio.end();
  assert.equal(events.at(-1).type, 'pause-start');
  fixture.clock.advance(1499);
  assert.equal(events.filter(event => event.type === 'cue-start').length, 1);
  fixture.clock.advance(1);
  assert.equal(events.filter(event => event.type === 'cue-start').length, 2);
});
```

- [ ] **Step 2: 모듈 누락 실패 확인**

Run: `node --test tests/lesson-player.test.js`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `lesson-player.js`.

- [ ] **Step 3: 단일 큐 직렬 실행 상태 머신 구현**

```js
export function createLessonPlayer({ audio, speech, clock, onEvent }) {
  let state = { status: 'idle', unitId: '', cues: [], index: 0, timer: null, fallbackUsed: false };
  const emit = (type, detail = {}) => onEvent({ type, ...detail });
  // load/play/runCue/finishCue는 한 큐가 종료되고 pauseAfterMs가 지난 뒤에만 index를 증가시킨다.
  return { load, play, pause, resume, replay, stop, setPace, getState: () => ({ ...state }) };
}
```

- [ ] **Step 4: 음성 실패 시 한 번만 대체하는 실패 테스트 작성**

```js
test('missing MP3 falls back to browser speech exactly once', async () => {
  const fixture = createPlayerFixture({ audioResult: false });
  fixture.player.load('unit-1', [coreCue]);
  await fixture.player.play();
  assert.equal(fixture.speech.calls.length, 1);
  fixture.speech.fail();
  assert.equal(fixture.speech.calls.length, 1);
  assert.equal(fixture.player.getState().status, 'paused');
});
```

- [ ] **Step 5: 일시정지·재개·다시 듣기 실패 테스트 작성**

```js
test('pause and resume preserve the current cue and remaining breath', async () => {
  const fixture = createPlayerFixture();
  fixture.player.load('unit-1', [coreCue, explainCue]);
  await fixture.player.play();
  fixture.audio.end();
  fixture.clock.advance(500);
  fixture.player.pause();
  fixture.clock.advance(5000);
  assert.equal(fixture.player.getState().index, 0);
  fixture.player.resume();
  fixture.clock.advance(1000);
  assert.equal(fixture.player.getState().index, 1);
});
```

- [ ] **Step 6: 오디오·음성 컨트롤러에 pause/resume/currentTime 지원 추가**

`lessonAudio.playCue`는 boolean 대신 `{ started, pause, resume, stop, currentTime, duration }` 핸들을 돌려준다. 브라우저 음성은 정확한 위치 재개가 불가능하므로 일시정지 때 `speechSynthesis.pause()`, 계속할 때 `speechSynthesis.resume()`을 사용한다.

- [ ] **Step 7: 재생 엔진 전체 테스트 통과 확인**

Run: `node --test tests/lesson-player.test.js tests/lesson-audio.test.js tests/voice.test.js`

Expected: PASS with zero failures.

- [ ] **Step 8: 재생 엔진 커밋**

```bash
git add js/lesson-player.js js/lesson-audio.js js/speech.js tests/lesson-player.test.js tests/lesson-audio.test.js tests/voice.test.js
git commit -m "feat: add pauseable lesson cue player"
```

---

### Task 4: 음성 진행률 기반 판서와 현재 문장 자막

**Files:**
- Modify: `js/lesson-choreography.js`
- Modify: `js/handwriting.js`
- Modify: `js/lesson-script.js`
- Modify: `tests/choreography.test.js`
- Modify: `tests/handwriting.test.js`
- Modify: `tests/lesson-script.test.js`

**Interfaces:**
- Consumes: player의 `audio-progress { currentTime, duration }`, 현재 큐의 `boardLines`, `narration`
- Produces: `boardLineForProgress(lines, progress)`, `sentenceForProgress(narration, progress)`, `handwriting.pause()/resume()`

- [ ] **Step 1: 진행률 매핑 실패 테스트 작성**

```js
test('board lines and subtitle advance from actual audio progress', () => {
  assert.equal(boardLineForProgress(['첫째', '둘째', '셋째'], 0), 0);
  assert.equal(boardLineForProgress(['첫째', '둘째', '셋째'], 0.5), 1);
  assert.equal(boardLineForProgress(['첫째', '둘째', '셋째'], 1), 2);
  assert.equal(sentenceForProgress('첫 문장입니다. 둘째 문장입니다.', 0.75), '둘째 문장입니다.');
});
```

- [ ] **Step 2: 기존 고정 문자 속도 구현에서 실패 확인**

Run: `node --test tests/choreography.test.js tests/lesson-script.test.js`

Expected: FAIL because progress mapping functions are missing.

- [ ] **Step 3: 순수 진행률 매핑 함수 구현**

```js
export function boardLineForProgress(lines, progress) {
  return Math.min(lines.length - 1, Math.floor(Math.max(0, Math.min(1, progress)) * lines.length));
}

export function sentenceForProgress(narration, progress) {
  const parts = String(narration).match(/[^.!?]+[.!?]?/g)?.map(text => text.trim()).filter(Boolean) || [];
  return parts[Math.min(parts.length - 1, Math.floor(Math.max(0, Math.min(0.999, progress)) * parts.length))] || '';
}
```

- [ ] **Step 4: 판서 일시정지·재개 실패 테스트 작성**

```js
test('handwriting resume continues without repeating written characters', () => {
  const fixture = createHandwritingFixture();
  fixture.writer.start(['핵심 문장']);
  fixture.clock.tick(3);
  fixture.writer.pause();
  const paused = fixture.output;
  fixture.clock.tick(20);
  assert.equal(fixture.output, paused);
  fixture.writer.resume();
  fixture.clock.tick(20);
  assert.equal(fixture.output.at(-1).complete, true);
});
```

- [ ] **Step 5: 판서 resume와 모션 감소 동작 구현**

모션 감소가 켜지면 각 줄을 즉시 완성하고 player의 호흡 타이머는 건드리지 않는다. 일반 모드의 `resume()`은 저장한 글자 인덱스부터 계속한다.

- [ ] **Step 6: 동기화 테스트 통과 확인**

Run: `node --test tests/choreography.test.js tests/handwriting.test.js tests/lesson-script.test.js`

Expected: PASS with zero failures.

- [ ] **Step 7: 판서 동기화 커밋**

```bash
git add js/lesson-choreography.js js/handwriting.js js/lesson-script.js tests/choreography.test.js tests/handwriting.test.js tests/lesson-script.test.js
git commit -m "feat: synchronize board writing with speech progress"
```

---

### Task 5: 앱 UI를 큐 재생 엔진에 연결

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `js/app.js`
- Modify: `js/storage.js`
- Modify: `tests/static.test.js`
- Modify: `tests/storage.test.js`

**Interfaces:**
- Consumes: `createLessonPlayer`, `buildLessonCues`, player events
- Produces: 항상 표시되는 `#pause-button`, `#replay-button`, `#pace-select`, `#transition-status`; 저장 설정 `pace: 'slow' | 'recommended' | 'normal'`

- [ ] **Step 1: 학습 제어 UI 실패 테스트 작성**

```js
test('lesson shell exposes pause, replay, pace and transition status', () => {
  const html = readFileSync('index.html', 'utf8');
  for (const id of ['pause-button', 'replay-button', 'pace-select', 'transition-status']) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
});

test('recommended pace is the default persisted setting', () => {
  const store = createStorage(memoryStorage());
  assert.equal(store.load().settings.pace, 'recommended');
});
```

- [ ] **Step 2: 새 UI와 설정이 없어 실패하는지 확인**

Run: `node --test tests/static.test.js tests/storage.test.js`

Expected: FAIL for missing controls and pace setting.

- [ ] **Step 3: 접근 가능한 조작 버튼과 상태 영역 추가**

```html
<button id="pause-button" type="button" aria-pressed="false">일시정지</button>
<button id="replay-button" type="button">다시 듣기</button>
<label>수업 속도
  <select id="pace-select">
    <option value="slow">느리게</option>
    <option value="recommended" selected>추천</option>
    <option value="normal">보통</option>
  </select>
</label>
<p id="transition-status" role="status" aria-live="polite"></p>
```

- [ ] **Step 4: `app.js`의 기존 이중 타이머 흐름을 player 이벤트로 교체**

`startTeachingStep`, `runAutoStep`, `advanceAuto`가 직접 음성·판서·900ms 타이머를 조정하지 않게 한다. 단계 진입 시 해당 단계의 큐만 player에 `load`하고, 이벤트별 UI 처리는 하나의 `handlePlayerEvent(event)`에서 수행한다.

```js
function handlePlayerEvent(event) {
  if (event.type === 'cue-start') renderCue(event.cue);
  if (event.type === 'audio-progress') syncCueProgress(event);
  if (event.type === 'pause-start' && event.cue.kind === 'summary') transitionStatus.textContent = '다음 내용으로 넘어갑니다';
  if (event.type === 'lesson-end') advanceAuto();
}
```

- [ ] **Step 5: 조작 버튼과 저장 설정 연결**

일시정지 버튼은 player 상태에 따라 `일시정지/계속`과 `aria-pressed`를 갱신한다. 다시 듣기는 현재 큐만 처음부터 재생한다. 속도 선택은 `store.updateSettings({ pace })` 후 `player.setPace(pace)`를 호출한다. 이전·다음 단계 이동은 먼저 `player.stop()`을 호출한다.

- [ ] **Step 6: 정적·저장·기존 앱 테스트 통과 확인**

Run: `node --test tests/static.test.js tests/storage.test.js tests/content.test.js tests/domain.test.js`

Expected: PASS with zero failures.

- [ ] **Step 7: UI 연결 커밋**

```bash
git add index.html styles.css js/app.js js/storage.js tests/static.test.js tests/storage.test.js
git commit -m "feat: connect lesson controls to cue playback"
```

---

### Task 6: 모바일 및 브라우저 통합 검증

**Files:**
- Modify: `tests/browser.spec.mjs`
- Modify: `styles.css`
- Create: `tests/fixtures/audio/short-cue.mp3`

**Interfaces:**
- Consumes: Task 5의 UI와 player 동작
- Produces: 모바일·데스크톱 회귀 테스트 및 짧은 로컬 MP3 fixture

- [ ] **Step 1: 브라우저 동기화 실패 시나리오 추가**

```js
await page.getByRole('button', { name: '자동 수업' }).click();
await expect(page.locator('#pause-button')).toBeVisible();
await page.locator('#pause-button').click();
const boardAtPause = await page.locator('#lesson-board').textContent();
await page.waitForTimeout(1200);
expect(await page.locator('#lesson-board').textContent()).toBe(boardAtPause);
await page.locator('#pause-button').click();
await expect(page.locator('#transition-status')).toContainText('다음 내용');
```

- [ ] **Step 2: 모바일 조작 접근성 실패 시나리오 추가**

```js
await page.setViewportSize({ width: 390, height: 844 });
await expect(page.locator('#lesson-board')).toBeInViewport();
await expect(page.locator('#pause-button')).toBeInViewport();
await expect(page.locator('#replay-button')).toBeVisible();
```

- [ ] **Step 3: 서버 실행 후 새 브라우저 테스트가 실패하는지 확인**

Run in terminal 1: `python scripts/serve.py`

Run in terminal 2: `npm run test:browser`

Expected: FAIL until event wiring and mobile control layout satisfy the scenarios.

- [ ] **Step 4: 모바일에서 칠판과 조작부가 함께 보이도록 CSS 조정**

390px 폭에서 조작부는 화면 하단을 가리지 않는 두 줄 그리드로 배치한다. 칠판은 최소 44vh를 점유하지 않도록 콘텐츠 높이에 맞추고, 모든 버튼은 최소 44px 터치 높이를 유지한다.

- [ ] **Step 5: 브라우저 전체 흐름 통과 확인**

Run: `npm run test:browser`

Expected: `Browser flow passed` and exit code 0, including all-book lessons, mobile quiz, persistence, desktop print, pause/resume and pace controls.

- [ ] **Step 6: 브라우저 통합 커밋**

```bash
git add tests/browser.spec.mjs tests/fixtures/audio/short-cue.mp3 styles.css
git commit -m "test: verify synchronized lesson playback"
```

---

### Task 7: 전체 생성·회귀 검증과 운영 안내

**Files:**
- Modify: `README.md`
- Modify: `AI 음성 설정 안내.md`
- Modify: `AI 음성 생성.cmd`
- Modify: `package.json`

**Interfaces:**
- Consumes: 큐 생성 및 ElevenLabs 생성 명령
- Produces: `npm run generate:audio`, `npm run verify`, 더블클릭 음성 생성 진입점

- [ ] **Step 1: 검증 스크립트 계약 테스트 추가**

```js
test('package exposes one full verification command', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.equal(pkg.scripts.verify, 'npm test && npm run test:browser');
});
```

- [ ] **Step 2: 스크립트 누락으로 실패 확인**

Run: `node --test tests/static.test.js`

Expected: FAIL because `scripts.verify` is missing.

- [ ] **Step 3: 실행 명령과 한국어 운영 안내 갱신**

`package.json`에 다음을 둔다.

```json
{
  "scripts": {
    "generate:audio": "node scripts/generate_lesson_audio.mjs",
    "verify": "npm test && npm run test:browser"
  }
}
```

안내 문서에는 `ELEVENLABS_API_KEY`, 선택 재생성, 승인된 캐시 재사용, 생성 파일 위치, 비용 발생 경고와 API 키 비노출 원칙을 설명한다. CMD는 기존 키 설정 방식을 유지하며 `npm run generate:audio`를 실행한다.

- [ ] **Step 4: 전체 단위 테스트 실행**

Run: `npm test`

Expected: all tests PASS with zero failures, skips only for unavailable optional local source fixtures.

- [ ] **Step 5: 로컬 서버에서 전체 브라우저 테스트 실행**

Run in terminal 1: `python scripts/serve.py`

Run in terminal 2: `npm run test:browser`

Expected: `Browser flow passed` and exit code 0.

- [ ] **Step 6: 생성 dry-run으로 키와 캐시 경계 확인**

Run: `$env:ELEVENLABS_DRY_RUN='1'; npm run generate:audio`

Expected: 98개 수업의 큐 작업 수를 보고하고, API 요청이나 MP3 덮어쓰기 없이 종료하며, 출력에 API 키가 나타나지 않는다.

- [ ] **Step 7: 문서와 검증 명령 커밋**

```bash
git add README.md "AI 음성 설정 안내.md" "AI 음성 생성.cmd" package.json tests/static.test.js
git commit -m "docs: explain natural lesson audio workflow"
```

- [ ] **Step 8: 최종 변경 범위 확인**

Run: `git status --short -- .`

Expected: 계획 수행으로 생성·수정한 파일 외의 사용자 변경은 그대로 보존되어 있고, 이번 작업 파일은 모두 커밋되어 있다.
