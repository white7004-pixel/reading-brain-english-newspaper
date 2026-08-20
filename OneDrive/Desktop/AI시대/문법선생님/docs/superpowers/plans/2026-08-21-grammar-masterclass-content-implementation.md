# Grammar Masterclass Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 천일문 중등 GRAMMAR 1·2·3의 98개 문법 단원 전부를 단원별 일타강사식 설명, 실생활 비유, 구조 공식, 고유 예문, 시험 함정, 기억 공식, 해설형 퀴즈로 제공하고 실사형 문법군 이미지를 수업 화면에 결합한다.

**Architecture:** `curriculum.js`를 단원 목록의 단일 기준으로 유지하고, 1·2·3권별 콘텐츠 모듈을 `lessons.js`가 하나의 레지스트리로 합친다. `domain.js`가 모든 콘텐츠의 완전성과 정답 범위를 검증하며, `visuals.js`가 12개 문법군 이미지의 로컬 경로와 대체 텍스트를 관리한다. `app.js`는 검증된 데이터만 기존 음성·녹음·진도 기능 위에 렌더링한다.

**Tech Stack:** Vanilla HTML/CSS/JavaScript ES modules, Node.js built-in test runner, Playwright, localStorage, Web Speech API, local WebP/PNG assets

**Spec:** `docs/superpowers/specs/2026-08-21-grammar-masterclass-content-design.md`

## Global Constraints

- PDF의 목차·문법 범위·단원 순서만 참고하고 교재 본문, 예문, 문제를 복제하지 않는다. 설명·예문·문제는 모두 새로 작성한다.
- 총 단원 수는 `ALL_UNITS.length === 98`을 단일 기준으로 삼고, 콘텐츠 키 집합이 단원 ID 집합과 정확히 일치해야 한다.
- 각 단원은 `hook`, `analogy`, `formula`, `examples` 2개 이상, `trap`, `memory`, `visualKey`, `quiz` 3개 이상을 가진다.
- 농담은 꼭 필요한 단원에 한 문장 이하로만 넣고, 학생을 놀리거나 불안을 자극하는 표현은 금지한다.
- 외부 유료 API와 런타임 네트워크 요청을 사용하지 않는다. 이미지와 콘텐츠는 전부 로컬에서 작동해야 한다.
- 영어 예문마다 자연스러운 한국어 해석을 제공하고, 강조 범위는 `[[...]]` 표기를 사용한다.
- 이미지에는 글자를 합성하지 않고, 모든 이미지에 구체적인 한국어 대체 텍스트를 제공한다.
- 매 작업은 실패 테스트 작성 → 최소 구현 → 전체 테스트 통과 → 해당 경로만 커밋 순서로 진행한다.

---

## Task 1: 마스터 수업 데이터 계약 고정

**Files:**
- Modify: `js/domain.js`
- Modify: `tests/domain.test.js`
- Create: `tests/content.test.js`

- [ ] **Step 1: 새 계약이 없으면 실패하는 단위 테스트 작성**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLesson } from '../js/domain.js';

const completeLesson = {
  id: 'b1-c1-u1', book: 1, chapter: 'b1-c1', title: 'be동사의 긍정문', pageReference: '교재 10쪽',
  hook: 'be동사는 주어의 상태표지판이다.',
  analogy: '이름표가 사람의 상태를 알려 주듯 be동사가 주어의 상태를 연결한다.',
  formula: '주어 + be동사 + 상태/정체',
  examples: [
    { en: 'I [[am]] ready.', ko: '나는 준비되었다.', focus: 'I에는 am을 쓴다.' },
    { en: 'They [[are]] friends.', ko: '그들은 친구다.', focus: '복수 주어에는 are를 쓴다.' }
  ],
  trap: { wrong: 'I is ready.', correct: 'I am ready.', reason: 'I와 짝인 be동사는 am이다.' },
  memory: 'I-am, you·we·they-are, he·she·it-is',
  visualKey: 'state-action',
  quiz: Array.from({ length: 3 }, (_, index) => ({
    question: `문제 ${index + 1}`, options: ['am', 'is', 'are'], answer: 0,
    explanation: 'I에는 am이 알맞다.'
  }))
};

test('validateLesson accepts the complete masterclass contract', () => {
  assert.deepEqual(validateLesson(completeLesson), []);
});

test('validateLesson reports every missing masterclass field', () => {
  const errors = validateLesson({ id: 'x', examples: [], quiz: [] });
  for (const field of ['hook', 'analogy', 'formula', 'examples', 'trap', 'memory', 'visualKey', 'quiz']) {
    assert.ok(errors.some(error => error.includes(field)), field);
  }
});
```

- [ ] **Step 2: 테스트를 실행해 기존 `steps` 중심 검증 때문에 실패함을 확인**

Run: `node --test tests/domain.test.js tests/content.test.js`
Expected: FAIL — `hook` 등 새 필드를 검증하지 않거나 완전한 새 객체를 거부한다.

- [ ] **Step 3: `validateLesson`을 새 필드 계약으로 교체**

```js
export function validateLesson(lesson) {
  const errors = [];
  const requiredText = ['id', 'chapter', 'title', 'pageReference', 'hook', 'analogy', 'formula', 'memory', 'visualKey'];
  requiredText.forEach(key => {
    if (typeof lesson?.[key] !== 'string' || !lesson[key].trim()) errors.push(`${key}: non-empty text required`);
  });
  if (![1, 2, 3].includes(lesson?.book)) errors.push('book: 1, 2, or 3 required');
  if (!Array.isArray(lesson?.examples) || lesson.examples.length < 2) errors.push('examples: at least 2 required');
  lesson?.examples?.forEach((example, index) => {
    for (const key of ['en', 'ko', 'focus']) if (!example?.[key]?.trim()) errors.push(`examples[${index}].${key}: required`);
  });
  for (const key of ['wrong', 'correct', 'reason']) if (!lesson?.trap?.[key]?.trim()) errors.push(`trap.${key}: required`);
  if (!Array.isArray(lesson?.quiz) || lesson.quiz.length < 3) errors.push('quiz: at least 3 required');
  lesson?.quiz?.forEach((item, index) => {
    if (!item?.question?.trim() || !item?.explanation?.trim()) errors.push(`quiz[${index}]: text required`);
    if (!Array.isArray(item?.options) || item.options.length < 2) errors.push(`quiz[${index}].options: at least 2 required`);
    if (!Number.isInteger(item?.answer) || item.answer < 0 || item.answer >= (item.options?.length ?? 0)) errors.push(`quiz[${index}].answer: out of range`);
  });
  return errors;
}
```

- [ ] **Step 4: 새 계약 및 기존 점수·진도 테스트 통과 확인**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: 계약 변경 커밋**

```powershell
git add -- '문법선생님/js/domain.js' '문법선생님/tests/domain.test.js' '문법선생님/tests/content.test.js'
git commit -m "test: define complete masterclass lesson contract"
```

---

## Task 2: 98개 콘텐츠 레지스트리와 품질 게이트 구성

**Files:**
- Create: `js/content/book1.js`
- Create: `js/content/book2.js`
- Create: `js/content/book3.js`
- Modify: `js/lessons.js`
- Modify: `tests/content.test.js`

- [ ] **Step 1: 모든 단원 ID의 정확한 일치를 요구하는 테스트 추가**

```js
import { ALL_UNITS } from '../js/curriculum.js';
import { LESSONS } from '../js/lessons.js';
import { validateLesson } from '../js/domain.js';

test('all 98 curriculum units have one valid authored lesson', () => {
  assert.equal(ALL_UNITS.length, 98);
  assert.deepEqual(Object.keys(LESSONS).sort(), ALL_UNITS.map(unit => unit.id).sort());
  const invalid = Object.values(LESSONS).flatMap(lesson =>
    validateLesson(lesson).map(error => `${lesson.id}: ${error}`));
  assert.deepEqual(invalid, []);
});

test('examples are not duplicated between lessons', () => {
  const examples = Object.values(LESSONS).flatMap(lesson => lesson.examples.map(example => example.en));
  assert.equal(new Set(examples).size, examples.length);
});

test('each book contributes its complete curriculum subset', () => {
  for (const book of [1, 2, 3]) {
    assert.equal(
      Object.values(LESSONS).filter(lesson => lesson.book === book).length,
      ALL_UNITS.filter(unit => unit.book === book).length
    );
  }
});
```

- [ ] **Step 2: 테스트 실행으로 자동 생성 데이터가 새 계약과 고유성 검사를 통과하지 못함을 확인**

Run: `node --test tests/content.test.js`
Expected: FAIL — 새 필드가 없고 예문이 여러 단원에서 반복된다.

- [ ] **Step 3: 권별 객체를 병합하는 얇은 레지스트리로 `lessons.js` 교체**

```js
import { BOOK1_LESSONS } from './content/book1.js';
import { BOOK2_LESSONS } from './content/book2.js';
import { BOOK3_LESSONS } from './content/book3.js';

export const LESSONS = Object.freeze({ ...BOOK1_LESSONS, ...BOOK2_LESSONS, ...BOOK3_LESSONS });
export const getLesson = id => LESSONS[id] ?? null;
```

- [ ] **Step 4: 세 콘텐츠 파일을 빈 동결 객체로 만들고 다음 작업의 실패 지점을 명확히 유지**

```js
export const BOOK1_LESSONS = Object.freeze({});
```

`book2.js`와 `book3.js`도 각각 `BOOK2_LESSONS`, `BOOK3_LESSONS`를 같은 방식으로 내보낸다.

- [ ] **Step 5: 레지스트리 골격 커밋**

```powershell
git add -- '문법선생님/js/content' '문법선생님/js/lessons.js' '문법선생님/tests/content.test.js'
git commit -m "refactor: split lessons into authored book registries"
```

---

## Task 3: 1권 전 단원 일타강사 콘텐츠 작성

**Files:**
- Modify: `js/content/book1.js`
- Modify: `tests/content.test.js`

- [ ] **Step 1: 1권의 정확한 ID 집합과 권별 완전성 테스트 추가**

```js
test('book 1 authored IDs exactly match book 1 curriculum', () => {
  const expected = ALL_UNITS.filter(unit => unit.book === 1).map(unit => unit.id).sort();
  assert.deepEqual(Object.keys(BOOK1_LESSONS).sort(), expected);
});
```

- [ ] **Step 2: 테스트가 빈 1권 레지스트리 때문에 실패함을 확인**

Run: `node --test tests/content.test.js --test-name-pattern="book 1"`
Expected: FAIL — expected 1권 단원 ID 목록과 실제 빈 목록이 다르다.

- [ ] **Step 3: `CURRICULUM`의 1권 12개 챕터 전 단원을 순서대로 저작**

각 객체는 아래 형태를 그대로 사용하되, 모든 문구·예문·함정·퀴즈를 해당 단원에 맞게 고유 작성한다.

```js
'b1-c1-u1': {
  id: 'b1-c1-u1', book: 1, chapter: 'b1-c1', title: 'be동사의 긍정문', pageReference: '교재 10쪽',
  hook: 'be동사는 행동이 아니라 주어의 상태와 정체를 붙여 주는 연결고리야.',
  analogy: '학생증의 이름·학년 칸처럼 am, are, is 뒤에는 주어가 누구인지 또는 어떤 상태인지가 온다.',
  formula: '주어 + am/are/is + 상태·정체',
  examples: [
    { en: 'I [[am]] nervous before the game.', ko: '나는 경기 전에 긴장된다.', focus: 'I의 짝은 am이다.' },
    { en: 'My shoes [[are]] wet.', ko: '내 신발은 젖어 있다.', focus: '복수 주어 shoes에는 are를 쓴다.' }
  ],
  trap: { wrong: 'She are kind.', correct: 'She is kind.', reason: '3인칭 단수 주어 She의 be동사는 is이다.' },
  memory: 'I-am / 복수-are / 한 명·한 개-is',
  visualKey: 'state-action',
  quiz: [
    { question: 'I ___ ready.', options: ['am', 'is', 'are'], answer: 0, explanation: 'I와 짝을 이루는 be동사는 am이다.' },
    { question: 'The cats ___ hungry.', options: ['am', 'is', 'are'], answer: 2, explanation: 'cats가 복수이므로 are가 알맞다.' },
    { question: '옳은 문장은?', options: ['He am tall.', 'He is tall.', 'He are tall.'], answer: 1, explanation: 'He는 3인칭 단수이므로 is를 쓴다.' }
  ]
}
```

작성 범위는 1권의 be동사 → 일반동사 → 진행·미래 → 조동사 → 명사·관사 → 대명사 → 형용사·부사·비교 → 문장 종류 → 문장 형식 → to부정사·동명사 → 전치사 → 접속사 전 단원이다. 단원 제목과 `pageReference`는 `ALL_UNITS`에서 그대로 옮기며, `visualKey`는 가장 가까운 12개 문법군 키 중 하나를 사용한다.

- [ ] **Step 4: 1권 계약·중복 예문·퀴즈 정답 범위 통과 확인**

Run: `node --test tests/content.test.js`
Expected: FAIL은 아직 비어 있는 2·3권에서만 발생하고, 출력에 `b1-` 오류가 없어야 한다.

- [ ] **Step 5: 1권 콘텐츠 커밋**

```powershell
git add -- '문법선생님/js/content/book1.js' '문법선생님/tests/content.test.js'
git commit -m "feat: author complete book one masterclass lessons"
```

---

## Task 4: 2권 전 단원 일타강사 콘텐츠 작성

**Files:**
- Modify: `js/content/book2.js`
- Modify: `tests/content.test.js`

- [ ] **Step 1: 2권 정확한 ID 집합 테스트 추가**

```js
test('book 2 authored IDs exactly match book 2 curriculum', () => {
  const expected = ALL_UNITS.filter(unit => unit.book === 2).map(unit => unit.id).sort();
  assert.deepEqual(Object.keys(BOOK2_LESSONS).sort(), expected);
});
```

- [ ] **Step 2: 빈 2권 레지스트리로 실패 확인**

Run: `node --test tests/content.test.js --test-name-pattern="book 2"`
Expected: FAIL

- [ ] **Step 3: 2권 12개 챕터의 전 단원을 새 계약으로 저작**

문장 형식 → 시제 → 조동사 → 수동태 → to부정사 → 동명사 → 분사 → 대명사 → 형용사·부사 → 비교 → 접속사 → 관계대명사 순서를 지킨다. 1권과 같은 문법을 다루더라도 예문·비유·함정을 재사용하지 않고, 2권 수준에 맞게 형태 선택의 이유와 오답 판별을 한 단계 깊게 설명한다. `hook`은 한 문장, `analogy`는 두 문장 이하, `focus`와 `reason`은 정답 근거가 되는 형태를 직접 지목한다.

- [ ] **Step 4: 전체 콘텐츠 테스트에서 2권 오류가 없고 3권 누락만 남는지 확인**

Run: `node --test tests/content.test.js`
Expected: FAIL은 아직 비어 있는 `b3-` 단원에서만 발생한다.

- [ ] **Step 5: 2권 콘텐츠 커밋**

```powershell
git add -- '문법선생님/js/content/book2.js' '문법선생님/tests/content.test.js'
git commit -m "feat: author complete book two masterclass lessons"
```

---

## Task 5: 3권 전 단원 일타강사 콘텐츠 작성

**Files:**
- Modify: `js/content/book3.js`
- Modify: `tests/content.test.js`

- [ ] **Step 1: 3권 정확한 ID 집합 테스트 추가**

```js
test('book 3 authored IDs exactly match book 3 curriculum', () => {
  const expected = ALL_UNITS.filter(unit => unit.book === 3).map(unit => unit.id).sort();
  assert.deepEqual(Object.keys(BOOK3_LESSONS).sort(), expected);
});
```

- [ ] **Step 2: 빈 3권 레지스트리로 실패 확인**

Run: `node --test tests/content.test.js --test-name-pattern="book 3"`
Expected: FAIL

- [ ] **Step 3: 3권 12개 챕터의 전 단원을 새 계약으로 저작**

완료 시제 → 조동사 → 수동태 → 부정사 → 동명사 → 분사 → 비교 → 접속사 → 관계사 → 가정법 → 일치·화법 → 특수 구문 순서를 지킨다. 고난도 단원은 `formula`에 시제 이동이나 어순 변화를 화살표로 표현하고, `trap.reason`에서 왜 익숙해 보이는 오답이 틀리는지 명확히 설명한다. 농담은 개념 기억에 실제 도움이 될 때만 전체 3권 중 소수 단원에 한 문장으로 제한한다.

- [ ] **Step 4: 98개 전체 품질 게이트 통과 확인**

Run: `npm test`
Expected: PASS — 정확히 98개, 누락 필드 0개, 중복 영어 예문 0개, 범위 밖 정답 0개.

- [ ] **Step 5: 3권 콘텐츠 커밋**

```powershell
git add -- '문법선생님/js/content/book3.js' '문법선생님/tests/content.test.js'
git commit -m "feat: author complete book three masterclass lessons"
```

---

## Task 6: 12개 실사형 문법 비주얼 제작 및 연결

**Files:**
- Create: `js/visuals.js`
- Create: `assets/grammar-visuals/state-action.webp`
- Create: `assets/grammar-visuals/timeline.webp`
- Create: `assets/grammar-visuals/completion-result.webp`
- Create: `assets/grammar-visuals/modal-signs.webp`
- Create: `assets/grammar-visuals/passive-focus.webp`
- Create: `assets/grammar-visuals/infinitive-gerund.webp`
- Create: `assets/grammar-visuals/participle-emotion.webp`
- Create: `assets/grammar-visuals/comparison.webp`
- Create: `assets/grammar-visuals/conjunction-bridge.webp`
- Create: `assets/grammar-visuals/relative-link.webp`
- Create: `assets/grammar-visuals/conditional-split.webp`
- Create: `assets/grammar-visuals/sentence-stage.webp`
- Modify: `tests/static.test.js`
- Modify: `tests/content.test.js`

- [ ] **Step 1: 비주얼 키·로컬 파일·대체 텍스트 테스트 작성**

```js
import fs from 'node:fs';
import { VISUALS, getVisual } from '../js/visuals.js';

test('all lesson visual keys resolve to local accessible assets', () => {
  for (const lesson of Object.values(LESSONS)) {
    const visual = getVisual(lesson.visualKey);
    assert.ok(visual, lesson.visualKey);
    assert.ok(visual.alt.length >= 12, `${lesson.visualKey} alt`);
    assert.ok(fs.existsSync(new URL(`../${visual.src}`, import.meta.url)), visual.src);
  }
  assert.equal(Object.keys(VISUALS).length, 12);
});
```

- [ ] **Step 2: 비주얼 모듈과 파일 부재로 테스트 실패 확인**

Run: `node --test tests/content.test.js tests/static.test.js`
Expected: FAIL — `js/visuals.js` 또는 이미지 파일을 찾을 수 없다.

- [ ] **Step 3: 이미지 생성 도구를 12회 사용해 텍스트 없는 16:9 실사형 장면 제작**

공통 스타일은 “photorealistic Korean middle-school learning scene, premium navy and champagne lighting, clear central metaphor, no letters, no captions, no logos, uncluttered 16:9 composition”으로 고정하고, 각 호출의 장면을 다음처럼 바꾼다.

1. `state-action`: 정지한 학생과 달리는 학생을 한 화면에 대비
2. `timeline`: 과거·현재·미래를 세 구역의 시간 흐름으로 표현
3. `completion-result`: 끝낸 과제와 현재의 체크 결과를 나란히 표현
4. `modal-signs`: 가능·허가·의무·조언을 상징하는 현실적인 표지판
5. `passive-focus`: 행동한 사람은 흐리게, 행동을 받은 대상은 선명하게 초점
6. `infinitive-gerund`: 계획 보드와 실제 취미 활동 장면을 양분
7. `participle-emotion`: 감정을 일으키는 대상과 감정을 느끼는 학생을 대비
8. `comparison`: 높이·속도·거리 세 기준을 실제 사물로 비교
9. `conjunction-bridge`: 두 장면을 다리로 연결하거나 갈라지는 길로 표현
10. `relative-link`: 인물·사물 사진에 추가 설명 카드가 연결된 장면
11. `conditional-split`: 현실과 상상의 두 갈래 장면
12. `sentence-stage`: 주어·동사·목적어 역할의 배우가 무대 위치에 선 장면

생성 결과는 긴 변 1600px 안팎, WebP 품질 82 수준으로 저장하고 사람 얼굴·손·텍스트 왜곡을 눈으로 검사한다.

- [ ] **Step 4: 동결된 비주얼 레지스트리 구현**

```js
export const VISUALS = Object.freeze({
  'state-action': { src: 'assets/grammar-visuals/state-action.webp', alt: '가만히 상태를 보여 주는 학생과 움직이는 학생을 대비한 장면' },
  'timeline': { src: 'assets/grammar-visuals/timeline.webp', alt: '과거와 현재와 미래가 자연스럽게 이어지는 시간 흐름 장면' },
  'completion-result': { src: 'assets/grammar-visuals/completion-result.webp', alt: '끝낸 과제와 지금 확인되는 결과를 함께 보여 주는 장면' },
  'modal-signs': { src: 'assets/grammar-visuals/modal-signs.webp', alt: '가능과 허가와 의무와 조언을 갈림길 표지판으로 나타낸 장면' },
  'passive-focus': { src: 'assets/grammar-visuals/passive-focus.webp', alt: '행동을 받은 대상을 선명한 초점으로 강조한 장면' },
  'infinitive-gerund': { src: 'assets/grammar-visuals/infinitive-gerund.webp', alt: '앞으로의 계획과 실제로 즐기는 활동을 나누어 보여 주는 장면' },
  'participle-emotion': { src: 'assets/grammar-visuals/participle-emotion.webp', alt: '감정을 일으키는 대상과 감정을 느끼는 사람을 대비한 장면' },
  'comparison': { src: 'assets/grammar-visuals/comparison.webp', alt: '높이와 속도와 거리가 다른 대상을 한눈에 비교하는 장면' },
  'conjunction-bridge': { src: 'assets/grammar-visuals/conjunction-bridge.webp', alt: '두 생각을 잇는 다리와 선택을 나타내는 갈림길 장면' },
  'relative-link': { src: 'assets/grammar-visuals/relative-link.webp', alt: '사람과 사물에 추가 설명 카드가 연결된 장면' },
  'conditional-split': { src: 'assets/grammar-visuals/conditional-split.webp', alt: '현실의 길과 상상의 길이 두 갈래로 나뉜 장면' },
  'sentence-stage': { src: 'assets/grammar-visuals/sentence-stage.webp', alt: '문장 성분의 역할에 따라 배우들이 무대 위치에 선 장면' }
});

export const getVisual = key => VISUALS[key] ?? null;
```

- [ ] **Step 5: 모든 키와 파일 연결 검증 후 커밋**

Run: `npm test`
Expected: PASS

```powershell
git add -- '문법선생님/js/visuals.js' '문법선생님/assets/grammar-visuals' '문법선생님/tests/static.test.js' '문법선생님/tests/content.test.js'
git commit -m "feat: add photoreal grammar concept visuals"
```

---

## Task 7: 7단계 수업 화면 렌더링

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `js/app.js`
- Modify: `tests/static.test.js`
- Modify: `tests/browser.spec.mjs`

- [ ] **Step 1: 새 카드 구성의 정적·브라우저 테스트 작성**

```js
for (const marker of ['lesson-visual', 'lesson-hook', 'analogy-card', 'formula-card', 'examples-card', 'trap-card', 'memory-card']) {
  assert.match(html, new RegExp(`id="${marker}"`));
}
```

```js
await page.click('#start-button');
await expectVisibleImage(page, '#lesson-visual');
assert.ok((await page.locator('#lesson-hook').innerText()).length > 10);
assert.match(await page.locator('#formula-card').innerText(), /주어|동사|be|to|if/i);
assert.equal(await page.locator('#examples-card .example-row').count() >= 2, true);
assert.equal(await page.locator('#trap-card .wrong').count(), 1);
assert.equal(await page.locator('#trap-card .correct').count(), 1);
```

- [ ] **Step 2: 기존 5단계 DOM 때문에 실패 확인**

Run: `npm run test:browser`
Expected: FAIL — 새 카드 선택자를 찾을 수 없다.

- [ ] **Step 3: 수업 DOM을 실사 이미지와 7개 정보 영역으로 변경**

`index.html`에 이미지(`loading="eager"`, `decoding="async"`), 핵심 훅, 실생활 비유, 공식, 예문 목록, 좌우 오답·정답 비교, 기억 공식 영역을 추가한다. 기존 교사·음성·녹음·다음·퀴즈 컨트롤 ID는 유지한다.

- [ ] **Step 4: `app.js`에서 새 데이터를 안전하게 렌더링**

`getVisual(lesson.visualKey)`로 이미지와 `alt`를 지정하고, 예문은 `[[...]]`만 `<mark>`로 변환한다. 나머지 저작 텍스트는 `textContent`로 넣어 HTML 주입을 막는다. 7단계 내레이션 순서는 `hook → analogy → formula → examples → trap → memory → quiz 안내`로 만들며, 각 단계는 2–4문장을 넘지 않는다.

- [ ] **Step 5: 네이비·샴페인 디자인으로 시각 계층 구현**

이미지는 카드 상단 16:9, 공식은 굵은 칩, 함정은 왼쪽의 절제된 붉은색과 오른쪽의 금색 체크, 기억 공식은 금색 테두리 카드로 만든다. 390px 화면에서는 모든 카드가 한 열로 쌓이고 가로 스크롤이 생기지 않게 한다. `prefers-reduced-motion`에서는 카드 전환 모션을 제거한다.

- [ ] **Step 6: 정적·브라우저 테스트 통과 후 커밋**

Run: `npm test`
Expected: PASS

Run: `npm run test:browser`
Expected: PASS

```powershell
git add -- '문법선생님/index.html' '문법선생님/styles.css' '문법선생님/js/app.js' '문법선생님/tests/static.test.js' '문법선생님/tests/browser.spec.mjs'
git commit -m "feat: render seven-part visual masterclass lessons"
```

---

## Task 8: 세 권 대표 수업·모바일·인쇄 회귀 검증

**Files:**
- Modify: `tests/browser.spec.mjs`
- Modify: `README.md`

- [ ] **Step 1: 1·2·3권 대표 단원을 순회하는 브라우저 회귀 테스트 추가**

```js
for (const unitId of ['b1-c1-u1', 'b2-c4-u1', 'b3-c10-u1']) {
  await openUnit(page, unitId);
  assert.equal(await page.locator('#lesson-visual').evaluate(img => img.complete && img.naturalWidth > 0), true);
  assert.equal(await page.locator('#examples-card .example-row').count() >= 2, true);
  assert.equal(await page.locator('#quiz-panel .question').count(), 3);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
}
```

- [ ] **Step 2: 테스트 헬퍼와 현재 UI 흐름 차이로 실패하는지 확인**

Run: `npm run test:browser`
Expected: FAIL — `openUnit` 또는 새 단계 흐름을 아직 반영하지 못한 부분이 드러난다.

- [ ] **Step 3: 단원 ID를 권·챕터·단원 선택값으로 바꾸는 `openUnit` 헬퍼 구현**

각 대표 단원에서 마지막 단계까지 이동하고 퀴즈 3문항을 완료한다. 완료 뒤 진도 증가, 새로고침 뒤 유지, 최근 수업 버튼 복귀, 음성 미지원 환경의 오류 없음, 인쇄 화면에 훅·공식·예문·퀴즈가 포함되는지 확인한다.

- [ ] **Step 4: 390×844 및 1440×900 스크린샷을 눈으로 검사**

Run: `npm run test:browser`
Expected: PASS and screenshots saved under ignored `tmp/browser/`.

시각 검사 항목: 이미지 왜곡 없음, 한국어 잘림 없음, 강조 색 대비 충분, 교사 캐릭터와 개념 이미지 충돌 없음, 모바일 가로 스크롤 없음, 오답·정답 의미를 색상만으로 구분하지 않음.

- [ ] **Step 5: README에 완전한 콘텐츠 범위와 로컬 실행 원칙 기록**

98개 전 단원, 12개 재사용 비주얼, 외부 API 없음, 음성·녹음의 브라우저 권한 요구, `npm test`와 `npm run test:browser` 실행법을 명시한다.

- [ ] **Step 6: 최종 검증 및 문서 커밋**

Run: `npm test && npm run test:browser`
Expected: 모든 단위·정적·브라우저 테스트 PASS, 콘솔 오류 0개.

```powershell
git add -- '문법선생님/tests/browser.spec.mjs' '문법선생님/README.md'
git commit -m "test: verify all-book visual lesson experience"
```

---

## Task 9: 완료 전 증거 점검

**Files:**
- Verify only: all files above

- [ ] **Step 1: 검증 전용 지침 적용**

`superpowers:verification-before-completion`을 읽고 완료 주장 전에 아래 명령을 새로 실행한다.

- [ ] **Step 2: 전체 자동 검증**

Run: `npm test`
Expected: PASS, 98개 콘텐츠 완전성 포함.

Run: `npm run test:browser`
Expected: PASS, 세 권 대표 단원·모바일·데스크톱·인쇄·진도 저장 포함.

- [ ] **Step 3: 변경 경로와 작업 트리 확인**

Run: `git status --short -- '문법선생님'`
Expected: 의도하지 않은 미커밋 파일 없음. `tmp/browser/`는 무시됨.

Run: `git log --oneline -9`
Expected: 각 작업의 독립 커밋이 순서대로 존재.

- [ ] **Step 4: 사용자에게 결과 보고**

완료 단원 수(98), 비주얼 수(12), 테스트 결과, 실행 주소/명령, 저작권상 교재 문장을 복제하지 않고 범위만 반영했다는 점을 간결하게 전달한다.
