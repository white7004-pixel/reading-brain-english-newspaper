# 학습자 읽기 레벨 재설정 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 학습자가 온보딩 이후에도 3분 레벨 테스트를 다시 보거나 AR 지수를 직접 선택해 읽기 레벨을 바꿀 수 있게 하고, 그 과정에서 기존 학습 기록을 보존한다.

**Architecture:** 레벨 판정 규칙을 순수 모듈로 분리하고, 두 경로를 담은 재사용 컴포넌트가 레벨 값만 돌려준다. 온보딩과 프로필이 같은 컴포넌트를 공유하며, 저장은 학습 기록을 보존하는 순수 함수가 담당한다.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 7, browser localStorage, Vitest, Testing Library, Playwright

## Global Constraints

- 논픽션랩 추정 난이도는 공식 ATOS 인증 점수로 표시하지 않는다.
- AR 직접 선택 값의 유효 범위는 0.1 이상 20.0 이하다.
- 한쪽 레벨 값을 정하면 반대편 값은 `null`로 비운다.
- 레벨 변경은 `attempts`, `completedArticleIds`, `savedWords`, XP, 연속 학습일, 이름, 관심 분야를 변경하지 않는다.
- 온보딩 화면 구성과 기존 세 버튼의 동작은 바뀌지 않는다.
- 기존 학습자 데이터 스키마(`schemaVersion: 2`)를 바꾸지 않는다.

---

## 파일 구조

- `lib/placement-test.ts`: 레벨 테스트 문항과 판정 규칙, AR 입력 유효 범위
- `lib/learner-store.ts`: `updateLearnerLevel` 추가
- `components/level-check.tsx`: 테스트·직접 선택 두 경로를 담은 재사용 컴포넌트
- `components/onboarding.tsx`: 레벨 화면을 `LevelCheck`에 위임
- `components/profile-screen.tsx`: 재설정 진입점 연결
- `components/learner-app.tsx`: 레벨 갱신 저장
- `tests/placement-test.test.ts`: 판정 규칙
- `tests/learner-store.test.ts`: 레벨 갱신과 기록 보존
- `tests/level-check.test.tsx`: 두 경로의 결과값과 취소
- `tests/profile-screen.test.tsx`: 재설정 진입과 반영
- `e2e/learner-journey.spec.ts`: 수업 완료 후 레벨 변경 여정

---

### Task 1: 레벨 판정 규칙 분리

**Files:**
- Create: `lib/placement-test.ts`
- Create: `tests/placement-test.test.ts`

**Interfaces:**
- Produces: `PlacementQuestion`, `PLACEMENT_QUESTIONS`, `estimateDifficulty(answers: number[]): number`, `isValidArEntry(value: number): boolean`, `AR_ENTRY_MIN`, `AR_ENTRY_MAX`
- Consumes: 없음

- [x] **Step 1: 실패하는 판정 테스트 작성**

`tests/placement-test.test.ts`:

```ts
import { describe, expect, test } from "vitest";
import { AR_ENTRY_MAX, AR_ENTRY_MIN, PLACEMENT_QUESTIONS, estimateDifficulty, isValidArEntry } from "@/lib/placement-test";

describe("estimateDifficulty", () => {
  test("모든 문항을 맞히면 가장 높은 문항 레벨을 반환한다", () => {
    const answers = PLACEMENT_QUESTIONS.map((question) => question.correct);
    expect(estimateDifficulty(answers)).toBe(PLACEMENT_QUESTIONS[PLACEMENT_QUESTIONS.length - 1].level);
  });

  test("맞힌 문항이 없으면 0.5를 반환한다", () => {
    const answers = PLACEMENT_QUESTIONS.map((question) => (question.correct + 1) % question.options.length);
    expect(estimateDifficulty(answers)).toBe(0.5);
  });

  test("맞힌 문항 중 가장 높은 레벨을 반환한다", () => {
    const answers = PLACEMENT_QUESTIONS.map((question, index) => index <= 2 ? question.correct : (question.correct + 1) % question.options.length);
    expect(estimateDifficulty(answers)).toBe(PLACEMENT_QUESTIONS[2].level);
  });
});

describe("isValidArEntry", () => {
  test("유효 범위 안의 값만 허용한다", () => {
    expect(isValidArEntry(AR_ENTRY_MIN)).toBe(true);
    expect(isValidArEntry(AR_ENTRY_MAX)).toBe(true);
    expect(isValidArEntry(2.4)).toBe(true);
  });

  test("범위를 벗어나거나 숫자가 아니면 거부한다", () => {
    expect(isValidArEntry(0)).toBe(false);
    expect(isValidArEntry(20.1)).toBe(false);
    expect(isValidArEntry(Number.NaN)).toBe(false);
  });
});
```

- [x] **Step 2: 테스트가 기능 부재로 실패하는지 확인**

Run: `npm test -- tests/placement-test.test.ts`
Expected: FAIL because `@/lib/placement-test` does not exist.

- [x] **Step 3: 판정 모듈 구현**

`lib/placement-test.ts`. 문항과 계산식은 `components/onboarding.tsx`에 있던 값을 그대로 옮긴다.

```ts
export type PlacementQuestion = {
  prompt: string;
  options: string[];
  correct: number;
  level: number;
};

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  { prompt: "A bird can ___.", options: ["fly", "table", "blue"], correct: 0, level: 0.8 },
  { prompt: "Plants need sunlight to ___.", options: ["grow", "sleep", "write"], correct: 0, level: 1.5 },
  { prompt: "The word ‘ancient’ means ___.", options: ["very old", "very loud", "very fast"], correct: 0, level: 2.3 },
  { prompt: "A habitat is the place where an animal ___.", options: ["lives", "counts", "paints"], correct: 0, level: 3.2 },
  { prompt: "Evidence helps a reader ___.", options: ["support an idea", "erase a page", "avoid a topic"], correct: 0, level: 4.3 },
  { prompt: "A consequence is most similar to a ___.", options: ["result", "question", "material"], correct: 0, level: 5.4 },
];

export const AR_ENTRY_MIN = 0.1;
export const AR_ENTRY_MAX = 20;

export const DEFAULT_ESTIMATED_DIFFICULTY = 0.5;

export function estimateDifficulty(answers: number[]): number {
  const passed = PLACEMENT_QUESTIONS.filter((question, index) => answers[index] === question.correct);
  return passed.length ? passed[passed.length - 1].level : DEFAULT_ESTIMATED_DIFFICULTY;
}

export function isValidArEntry(value: number): boolean {
  return Number.isFinite(value) && value >= AR_ENTRY_MIN && value <= AR_ENTRY_MAX;
}
```

- [x] **Step 4: 테스트 통과 확인**

Run: `npm test -- tests/placement-test.test.ts`
Expected: PASS, 5 tests.

- [x] **Step 5: 커밋**

```bash
git add lib/placement-test.ts tests/placement-test.test.ts
git commit -m "feat: extract placement test rules"
```

---

### Task 2: 학습 기록을 보존하는 레벨 갱신

**Files:**
- Modify: `lib/learner-store.ts`
- Modify: `tests/learner-store.test.ts`

**Interfaces:**
- Consumes: `isValidArEntry` from `@/lib/placement-test`
- Produces: `LearnerLevel = { enteredAr: number | null; estimatedDifficulty: number | null }`, `updateLearnerLevel(state: LearnerState, level: LearnerLevel): LearnerState`

- [x] **Step 1: 실패하는 갱신 테스트 추가**

`tests/learner-store.test.ts` 끝에 추가한다.

```ts
import { updateLearnerLevel } from "@/lib/learner-store";

describe("updateLearnerLevel", () => {
  const seeded = () => {
    const base = createDefaultLearnerState();
    return {
      ...base,
      profile: { ...base.profile, name: "탐험가", enteredAr: null, estimatedDifficulty: 2.3, xp: 120, streak: 4, lastLearningDate: "2026-08-17", interests: ["science" as const] },
      attempts: [{ id: "a1", articleId: "stars-shine", articleTitle: "Why Do Stars Shine?", articleVersion: 1, completedAt: "2026-08-17T10:00:00.000Z", localDate: "2026-08-17", correct: 3, total: 3, hintsUsed: 0, durationSeconds: 120, xpAwarded: 35 }],
      completedArticleIds: ["stars-shine"],
      savedWords: [{ articleId: "stars-shine", word: "energy" }],
    };
  };

  test("직접 선택한 AR만 남기고 추정 난이도를 비운다", () => {
    const next = updateLearnerLevel(seeded(), { enteredAr: 3.4, estimatedDifficulty: null });
    expect(next.profile.enteredAr).toBe(3.4);
    expect(next.profile.estimatedDifficulty).toBeNull();
  });

  test("테스트 결과만 남기고 입력한 AR을 비운다", () => {
    const state = { ...seeded(), profile: { ...seeded().profile, enteredAr: 5.1, estimatedDifficulty: null } };
    const next = updateLearnerLevel(state, { enteredAr: null, estimatedDifficulty: 1.5 });
    expect(next.profile.estimatedDifficulty).toBe(1.5);
    expect(next.profile.enteredAr).toBeNull();
  });

  test("학습 기록과 진행 상태를 보존한다", () => {
    const state = seeded();
    const next = updateLearnerLevel(state, { enteredAr: 3.4, estimatedDifficulty: null });
    expect(next.attempts).toEqual(state.attempts);
    expect(next.completedArticleIds).toEqual(state.completedArticleIds);
    expect(next.savedWords).toEqual(state.savedWords);
    expect(next.profile.xp).toBe(120);
    expect(next.profile.streak).toBe(4);
    expect(next.profile.lastLearningDate).toBe("2026-08-17");
    expect(next.profile.name).toBe("탐험가");
    expect(next.profile.interests).toEqual(["science"]);
  });

  test("유효 범위를 벗어난 AR은 거부한다", () => {
    expect(() => updateLearnerLevel(seeded(), { enteredAr: 25, estimatedDifficulty: null }))
      .toThrow("AR 지수는 0.1에서 20.0 사이여야 합니다.");
  });

  test("레벨 값이 모두 비어 있으면 거부한다", () => {
    expect(() => updateLearnerLevel(seeded(), { enteredAr: null, estimatedDifficulty: null }))
      .toThrow("읽기 레벨 값이 필요합니다.");
  });
});
```

- [x] **Step 2: 테스트 실패 확인**

Run: `npm test -- tests/learner-store.test.ts`
Expected: FAIL because `updateLearnerLevel` is not exported.

- [x] **Step 3: 순수 갱신 함수 구현**

`lib/learner-store.ts` 상단에 import를 추가하고 파일 끝에 함수를 추가한다.

```ts
import { isValidArEntry } from "./placement-test";

export type LearnerLevel = {
  enteredAr: number | null;
  estimatedDifficulty: number | null;
};

export function updateLearnerLevel(state: LearnerState, level: LearnerLevel): LearnerState {
  if (level.enteredAr === null && level.estimatedDifficulty === null) {
    throw new Error("읽기 레벨 값이 필요합니다.");
  }
  if (level.enteredAr !== null && !isValidArEntry(level.enteredAr)) {
    throw new Error("AR 지수는 0.1에서 20.0 사이여야 합니다.");
  }
  return {
    ...state,
    profile: {
      ...state.profile,
      enteredAr: level.enteredAr,
      estimatedDifficulty: level.estimatedDifficulty,
    },
  };
}
```

- [x] **Step 4: 테스트 통과 확인**

Run: `npm test -- tests/learner-store.test.ts`
Expected: PASS, 기존 테스트 포함 전부 통과.

- [x] **Step 5: 커밋**

```bash
git add lib/learner-store.ts tests/learner-store.test.ts
git commit -m "feat: update learner level without losing progress"
```

---

### Task 3: 재사용 가능한 레벨 선택 컴포넌트

**Files:**
- Create: `components/level-check.tsx`
- Create: `tests/level-check.test.tsx`
- Modify: `components/onboarding.tsx`

**Interfaces:**
- Consumes: `PLACEMENT_QUESTIONS`, `estimateDifficulty`, `isValidArEntry`, `AR_ENTRY_MIN`, `AR_ENTRY_MAX`, `LearnerLevel`
- Produces: `LevelCheck({ initialMode, onSubmit, onCancel, submitLabel })`

- [x] **Step 1: 실패하는 컴포넌트 테스트 작성**

`tests/level-check.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { LevelCheck } from "@/components/level-check";
import { PLACEMENT_QUESTIONS } from "@/lib/placement-test";

test("직접 선택 경로는 입력한 AR만 돌려준다", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<LevelCheck onSubmit={onSubmit} onCancel={vi.fn()} />);
  await user.click(screen.getByRole("button", { name: "내 AR 지수 입력" }));
  await user.type(screen.getByLabelText("AR 지수"), "3.4");
  await user.click(screen.getByRole("button", { name: "이 수준으로 시작" }));
  expect(onSubmit).toHaveBeenCalledWith({ enteredAr: 3.4, estimatedDifficulty: null });
});

test("테스트 경로는 추정 난이도만 돌려준다", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<LevelCheck onSubmit={onSubmit} onCancel={vi.fn()} />);
  await user.click(screen.getByRole("button", { name: "3분 레벨 테스트" }));
  for (const question of PLACEMENT_QUESTIONS) {
    await user.click(screen.getByRole("button", { name: `선택지 ${question.correct + 1}: ${question.options[question.correct]}` }));
    await user.click(screen.getByRole("button", { name: /다음 문제|결과 보기/ }));
  }
  await user.click(screen.getByRole("button", { name: "추천 수준으로 시작" }));
  const last = PLACEMENT_QUESTIONS[PLACEMENT_QUESTIONS.length - 1];
  expect(onSubmit).toHaveBeenCalledWith({ enteredAr: null, estimatedDifficulty: last.level });
});

test("범위를 벗어난 값은 적용할 수 없다", async () => {
  const user = userEvent.setup();
  render(<LevelCheck onSubmit={vi.fn()} onCancel={vi.fn()} />);
  await user.click(screen.getByRole("button", { name: "내 AR 지수 입력" }));
  await user.type(screen.getByLabelText("AR 지수"), "25");
  expect(screen.getByRole("button", { name: "이 수준으로 시작" })).toBeDisabled();
});

test("취소하면 결과를 돌려주지 않는다", async () => {
  const user = userEvent.setup();
  const onCancel = vi.fn();
  const onSubmit = vi.fn();
  render(<LevelCheck onSubmit={onSubmit} onCancel={onCancel} />);
  await user.click(screen.getByRole("button", { name: "돌아가기" }));
  expect(onCancel).toHaveBeenCalled();
  expect(onSubmit).not.toHaveBeenCalled();
});
```

- [x] **Step 2: 테스트 실패 확인**

Run: `npm test -- tests/level-check.test.tsx`
Expected: FAIL because `@/components/level-check` does not exist.

- [x] **Step 3: 레벨 선택 컴포넌트 구현**

`components/level-check.tsx`. 화면 마크업과 클래스 이름은 `components/onboarding.tsx`의 기존 `enter`·`test`·`result` 화면을 그대로 옮긴다.

```tsx
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ProgressBar } from "./ui/progress-bar";
import { AR_ENTRY_MAX, AR_ENTRY_MIN, PLACEMENT_QUESTIONS, estimateDifficulty, isValidArEntry } from "@/lib/placement-test";
import type { LearnerLevel } from "@/lib/learner-store";

export type LevelCheckMode = "choose" | "enter" | "test";

export function LevelCheck({
  onSubmit,
  onCancel,
  initialMode = "choose",
}: {
  onSubmit: (level: LearnerLevel) => void;
  onCancel: () => void;
  initialMode?: LevelCheckMode;
}) {
  const [mode, setMode] = useState<"choose" | "enter" | "test" | "result">(initialMode);
  const [arValue, setArValue] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const back = () => {
    if (initialMode === "choose" && mode !== "choose") {
      setMode("choose");
      setQuestionIndex(0);
      setAnswers([]);
      setSelectedAnswer(null);
      return;
    }
    onCancel();
  };

  if (mode === "enter") {
    const numeric = Number(arValue);
    const valid = arValue.trim() !== "" && isValidArEntry(numeric);
    return (
      <section className="onboarding onboarding--form">
        <button className="icon-button" type="button" aria-label="이전" onClick={back}>←</button>
        <p className="eyebrow">MY READING LEVEL</p>
        <h1>알고 있는 AR 지수를<br />입력해 주세요.</h1>
        <p className="support-copy">학교나 학원에서 받은 값을 입력하면 바로 맞춤 글을 추천해 드려요.</p>
        <label className="field-label" htmlFor="ar-value">AR 지수</label>
        <input id="ar-value" className="text-input" inputMode="decimal" value={arValue} onChange={(event) => setArValue(event.target.value)} placeholder="예: 2.4" />
        <p className="field-help">{AR_ENTRY_MIN}에서 {AR_ENTRY_MAX.toFixed(1)} 사이의 값을 입력할 수 있어요.</p>
        <Button fullWidth disabled={!valid} onClick={() => onSubmit({ enteredAr: numeric, estimatedDifficulty: null })}>이 수준으로 시작</Button>
      </section>
    );
  }

  if (mode === "test") {
    const question = PLACEMENT_QUESTIONS[questionIndex];
    const isLast = questionIndex === PLACEMENT_QUESTIONS.length - 1;
    return (
      <section className="onboarding onboarding--form">
        <div className="test-top"><button className="icon-button" type="button" aria-label="테스트 나가기" onClick={back}>×</button><span>{questionIndex + 1} / {PLACEMENT_QUESTIONS.length}</span></div>
        <ProgressBar value={questionIndex + 1} max={PLACEMENT_QUESTIONS.length} label="레벨 테스트 진행률" />
        <p className="eyebrow">3-MIN LEVEL CHECK</p>
        <h1 className="question-title">{question.prompt}</h1>
        <div className="answer-list">
          {question.options.map((option, index) => (
            <button key={option} type="button" aria-label={`선택지 ${index + 1}: ${option}`} className={`answer-option ${selectedAnswer === index ? "is-selected" : ""}`} onClick={() => setSelectedAnswer(index)}>{option}</button>
          ))}
        </div>
        <Button fullWidth disabled={selectedAnswer === null} onClick={() => {
          setAnswers((current) => [...current, selectedAnswer as number]);
          setSelectedAnswer(null);
          if (isLast) setMode("result"); else setQuestionIndex((index) => index + 1);
        }}>{isLast ? "결과 보기" : "다음 문제"}</Button>
      </section>
    );
  }

  if (mode === "result") {
    const estimated = estimateDifficulty(answers);
    return (
      <section className="onboarding onboarding--center">
        <div className="level-orb">{estimated.toFixed(1)}</div>
        <p className="eyebrow">LEVEL CHECK COMPLETE</p>
        <h1>논픽션랩 추정 난이도<br />{estimated.toFixed(1)}</h1>
        <p className="support-copy">공식 AR 인증 점수가 아닌 맞춤 콘텐츠 추천용 추정값이에요. 학습 결과에 따라 천천히 조절됩니다.</p>
        <Button fullWidth onClick={() => onSubmit({ enteredAr: null, estimatedDifficulty: estimated })}>추천 수준으로 시작</Button>
      </section>
    );
  }

  return (
    <section className="onboarding onboarding--form">
      <p className="eyebrow">MY READING LEVEL</p>
      <h1>읽기 수준을<br />어떻게 정할까요?</h1>
      <p className="support-copy">지금까지의 학습 기록은 그대로 유지돼요.</p>
      <div className="start-options">
        <Button fullWidth onClick={() => setMode("enter")}>내 AR 지수 입력</Button>
        <Button fullWidth variant="secondary" onClick={() => setMode("test")}>3분 레벨 테스트</Button>
        <Button fullWidth variant="ghost" onClick={onCancel}>돌아가기</Button>
      </div>
    </section>
  );
}
```

- [x] **Step 4: 컴포넌트 테스트 통과 확인**

Run: `npm test -- tests/level-check.test.tsx`
Expected: PASS, 4 tests.

- [x] **Step 5: 온보딩이 같은 컴포넌트를 쓰도록 위임**

`components/onboarding.tsx`에서 `questions` 배열과 `enter`·`test`·`result` 화면 블록을 지우고 `LevelCheck`에 위임한다. `welcome` 화면과 관심 분야 선택, 세 버튼은 그대로 둔다.

```tsx
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { LevelCheck } from "./level-check";
import { createDefaultLearnerState, type LearnerLevel, type LearnerProfile } from "@/lib/learner-store";
import { DEFAULT_ESTIMATED_DIFFICULTY } from "@/lib/placement-test";
import type { KnowledgeDomain } from "@/lib/types";

type View = "welcome" | "enter" | "test";

const domains: Array<{ id: KnowledgeDomain; label: string }> = [
  { id: "science", label: "과학·우주" },
  { id: "history", label: "역사" },
  { id: "arts", label: "예술" },
  { id: "philosophy", label: "철학" },
  { id: "self-development", label: "자기계발" },
  { id: "world-culture", label: "세계문화" },
];

export function Onboarding({ onComplete }: { onComplete: (profile: LearnerProfile) => void }) {
  const [view, setView] = useState<View>("welcome");
  const [interests, setInterests] = useState<KnowledgeDomain[]>(["science", "world-culture", "arts"]);

  const complete = (level: LearnerLevel) => {
    const profile = createDefaultLearnerState().profile;
    onComplete({ ...profile, onboardingComplete: true, enteredAr: level.enteredAr, estimatedDifficulty: level.estimatedDifficulty, interests });
  };

  const toggleInterest = (domain: KnowledgeDomain) => {
    setInterests((current) => current.includes(domain)
      ? current.length === 1 ? current : current.filter((item) => item !== domain)
      : current.length < 4 ? [...current, domain] : current);
  };

  if (view !== "welcome") {
    return <LevelCheck initialMode={view} onSubmit={complete} onCancel={() => setView("welcome")} />;
  }

  return (
    <section className="onboarding">
      <div className="onboarding__brand"><span className="brand">nonfiction<em>lab.</em></span></div>
      <div className="onboarding__visual" aria-hidden="true"><span>✦</span><span>?</span><span>◌</span></div>
      <p className="eyebrow">3 MINUTES A DAY</p>
      <h1>영어로 읽을수록<br />세상이 넓어져요.</h1>
      <p className="support-copy">나에게 맞는 방법으로 시작하세요. 언제든 다시 설정할 수 있어요.</p>
      <div className="interest-box">
        <strong>관심 분야를 골라 주세요 <small>1~4개</small></strong>
        <div className="interest-grid">{domains.map((domain) => <button key={domain.id} type="button" className={interests.includes(domain.id) ? "is-selected" : ""} onClick={() => toggleInterest(domain.id)}>{domain.label}</button>)}</div>
      </div>
      <div className="start-options">
        <Button fullWidth onClick={() => setView("enter")}>내 AR 지수 입력</Button>
        <Button fullWidth variant="secondary" onClick={() => setView("test")}>3분 레벨 테스트</Button>
        <Button fullWidth variant="ghost" onClick={() => complete({ enteredAr: null, estimatedDifficulty: DEFAULT_ESTIMATED_DIFFICULTY })}>가장 쉬운 단계부터</Button>
      </div>
    </section>
  );
}
```

- [x] **Step 6: 온보딩 회귀 테스트와 타입 검사**

Run: `npm test -- tests/onboarding.test.tsx tests/level-check.test.tsx && npm run lint`
Expected: PASS, TypeScript exit 0. 온보딩 동작이 이전과 같아야 한다.

- [x] **Step 7: 커밋**

```bash
git add components/level-check.tsx components/onboarding.tsx tests/level-check.test.tsx
git commit -m "feat: share level check between onboarding and profile"
```

---

### Task 4: 프로필 재설정 진입점 연결

**Files:**
- Modify: `components/profile-screen.tsx`
- Modify: `components/learner-app.tsx`
- Modify: `tests/profile-screen.test.tsx`
- Modify: `e2e/learner-journey.spec.ts`

**Interfaces:**
- Consumes: `LevelCheck`, `updateLearnerLevel`, `LearnerLevel`
- Produces: `ProfileScreen({ state, onReset, onLevelChange })`

- [x] **Step 1: 실패하는 프로필 테스트 추가**

`tests/profile-screen.test.tsx`에 추가한다.

```tsx
test("레벨 다시 확인하기로 AR 지수를 직접 선택한다", async () => {
  const user = userEvent.setup();
  const onLevelChange = vi.fn();
  const base = createDefaultLearnerState();
  const state = { ...base, profile: { ...base.profile, estimatedDifficulty: 2.3 }, completedArticleIds: ["stars-shine"] };
  render(<ProfileScreen state={state} onReset={vi.fn()} onLevelChange={onLevelChange} />);

  await user.click(screen.getByRole("button", { name: "레벨 다시 확인하기" }));
  await user.click(screen.getByRole("button", { name: "내 AR 지수 입력" }));
  await user.type(screen.getByLabelText("AR 지수"), "3.4");
  await user.click(screen.getByRole("button", { name: "이 수준으로 시작" }));

  expect(onLevelChange).toHaveBeenCalledWith({ enteredAr: 3.4, estimatedDifficulty: null });
});

test("레벨 재설정을 취소하면 프로필로 돌아온다", async () => {
  const user = userEvent.setup();
  const onLevelChange = vi.fn();
  render(<ProfileScreen state={createDefaultLearnerState()} onReset={vi.fn()} onLevelChange={onLevelChange} />);

  await user.click(screen.getByRole("button", { name: "레벨 다시 확인하기" }));
  await user.click(screen.getByRole("button", { name: "돌아가기" }));

  expect(screen.getByText("나의 읽기 수준")).toBeInTheDocument();
  expect(onLevelChange).not.toHaveBeenCalled();
});
```

- [x] **Step 2: 테스트 실패 확인**

Run: `npm test -- tests/profile-screen.test.tsx`
Expected: FAIL because the button has no handler and `onLevelChange` is not a prop.

- [x] **Step 3: 프로필 화면에 재설정 흐름 연결**

`components/profile-screen.tsx`에서 `useState`로 재설정 화면을 열고, 기존 `레벨 다시 확인하기` 버튼에 핸들러를 붙인다.

```tsx
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { LevelCheck } from "./level-check";
import type { LearnerLevel, LearnerState } from "@/lib/learner-store";

export function ProfileScreen({ state, onReset, onLevelChange }: { state: LearnerState; onReset: () => void; onLevelChange: (level: LearnerLevel) => void }) {
  const [confirming, setConfirming] = useState(false);
  const [checkingLevel, setCheckingLevel] = useState(false);
  const average = state.attempts.length ? Math.round(state.attempts.reduce((sum, item) => sum + item.correct / item.total, 0) / state.attempts.length * 100) : 0;

  if (checkingLevel) {
    return <LevelCheck
      onSubmit={(level) => { onLevelChange(level); setCheckingLevel(false); }}
      onCancel={() => setCheckingLevel(false)}
    />;
  }

  return <section className="profile-screen">
    <header><div className="profile-avatar">N</div><div><p className="eyebrow">MY KNOWLEDGE</p><h1>{state.profile.name}</h1></div></header>
    <div className="profile-summary"><div><span>완료한 지식</span><strong>{state.completedArticleIds.length}개</strong></div><div><span>평균 이해도</span><strong>{average}%</strong></div><div><span>연속 학습</span><strong>{state.profile.streak}일</strong></div></div>
    <section className="level-card"><h2>나의 읽기 수준</h2><div><span>입력한 AR 지수</span><strong>{state.profile.enteredAr?.toFixed(1) ?? "—"}</strong></div><div><span>논픽션랩 추정 난이도</span><strong>{state.profile.estimatedDifficulty?.toFixed(1) ?? "—"}</strong></div><p>추정값은 공식 AR 인증 점수가 아니며, 학습 결과를 바탕으로 천천히 조절됩니다.</p><Button variant="ghost" fullWidth onClick={() => setCheckingLevel(true)}>레벨 다시 확인하기</Button></section>
    <section className="profile-card"><h2>학습 데이터</h2><p>이 기기에 저장된 진행 기록과 설정을 관리합니다.</p>{confirming ? <div className="confirm-box"><strong>정말 모든 기록을 삭제할까요?</strong><Button variant="secondary" onClick={onReset}>삭제하기</Button><Button variant="ghost" onClick={() => setConfirming(false)}>취소</Button></div> : <Button variant="ghost" fullWidth onClick={() => setConfirming(true)}>모든 학습 데이터 삭제</Button>}</section>
  </section>;
}
```

- [x] **Step 4: 학습자 앱에서 저장 연결**

`components/learner-app.tsx`의 import에 `updateLearnerLevel`과 `LearnerLevel`을 추가하고, 프로필 렌더링에 핸들러를 넘긴다.

```tsx
import { recordAttempt, saveLearnerState, updateLearnerLevel, type LearnerLevel, type LearnerState } from "@/lib/learner-store";
```

```tsx
{session.screen === "profile" && <ProfileScreen
  state={state}
  onReset={() => { const reset = createDefaultLearnerState(); saveLearnerState(storage, reset); setState(reset); setSession({ screen: "home", events: [] }); }}
  onLevelChange={(level: LearnerLevel) => { const next = updateLearnerLevel(state, level); saveLearnerState(storage, next); setState(next); }}
/>}
```

- [x] **Step 5: 단위 테스트와 타입 검사**

Run: `npm test && npm run lint`
Expected: PASS 전부, TypeScript exit 0.

- [x] **Step 6: 레벨 변경 E2E 추가**

`e2e/learner-journey.spec.ts`에 추가한다. 기존 여정 테스트는 그대로 둔다.

```ts
test("레벨을 다시 정해도 학습 기록이 남는다", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "가장 쉬운 단계부터" }).click();
  await page.getByRole("button", { name: "프로필" }).click();
  await page.getByRole("button", { name: "레벨 다시 확인하기" }).click();
  await page.getByRole("button", { name: "내 AR 지수 입력" }).click();
  await page.getByLabel("AR 지수").fill("3.4");
  await page.getByRole("button", { name: "이 수준으로 시작" }).click();
  await expect(page.getByText("나의 읽기 수준")).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "프로필" }).click();
  await expect(page.getByText("3.4")).toBeVisible();
});
```

- [x] **Step 7: 전체 검증**

Run: `npm run verify`
Expected: 모든 Vitest 파일 통과, TypeScript exit 0, 프로덕션 빌드 성공, Playwright 여정 전부 통과.

- [x] **Step 8: 커밋**

```bash
git add components/profile-screen.tsx components/learner-app.tsx tests/profile-screen.test.tsx e2e/learner-journey.spec.ts
git commit -m "feat: let learners recheck reading level from profile"
```
