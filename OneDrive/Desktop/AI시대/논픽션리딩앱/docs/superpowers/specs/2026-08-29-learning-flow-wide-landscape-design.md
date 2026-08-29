# 학습 플로우 와이드/가로화면 대응 설계

## 배경

현재 `.app-shell`은 `max-width: 430px`로 고정되어 있어, PC나 태블릿/폰 가로 화면에서도 좁은 세로 폰 카드가 화면 가운데 떠 있는 형태로만 보인다 (`app/globals.css:41`). 요청은 "디자인이 현재 모바일 기준이라, PC에서도 가로 화면으로 학습이 되도록" — 즉 학습(읽기 → 핵심 찾기 → 퀴즈 → 결과) 플로우가 넓은 화면에서 폰 카드가 아니라 넓은 단일 컬럼으로 보이게 하는 것.

## 범위

- **대상**: 학습 세션 화면만 — `ReaderScreen`, `QuizScreen`, `QuestResultScreen` (이 셋은 모두 `AppShell`이 `active === "learn"`일 때 `app-shell--learning` 클래스를 받는 화면, `components/learner-app.tsx:77-79`).
- **비대상**: 오늘 / 지식지도 / 탐험 / 나 탭, Studio(`/studio`) 화면 — 기존 430px 폰 카드 UI 그대로 유지. 온보딩/레벨체크 화면도 이번 범위에서 제외.
- 컴포넌트 구조(JSX)는 변경하지 않는다. `app/globals.css`에 브레이크포인트별 스타일만 추가한다.

## 설계

`app/globals.css`에 아래 규칙 추가 (기존 `@media (min-width: 720px)` 블록 근처):

```css
@media (min-width: 760px) {
  .app-shell--learning { max-width: 760px; }
  .app-shell--learning .reader-action { width: min(calc(100% - 40px), 720px); }
}
```

- `.app-shell--learning`의 `max-width`를 430px → 760px로 확장. `margin: 0 auto`는 `.app-shell`에서 이미 상속되므로 그대로 가운데 정렬됨.
- `.reader-action`(읽기 화면 하단 고정 CTA 바)의 `width: min(calc(100% - 40px), 390px)`도 넓은 화면에서 720px까지 늘어나도록 재정의 — 안 그러면 카드는 넓어졌는데 버튼만 좁게 남는 불일치가 생긴다.
- 지문 폰트 크기(`.article-copy`)는 기존 `@media (min-width: 720px)` 규칙에서 이미 20px로 커지므로 재사용, 별도 규칙 불필요.
- 퀴즈 옵션(`.quiz-options`), 지식카드(`.knowledge-card`), 결과 통계(`.quest-result-screen__stats`) 등은 구조 변경 없이 넓어진 컨테이너 안에서 자연스럽게 여백만 늘어난다. 이번 설계에서 2단 레이아웃이나 그리드 컬럼 추가는 하지 않는다.
- Studio 미리보기(`.studio-preview__phone`)는 항상 폰 프레임 안에서 학습 화면을 보여주는 용도이므로 이 브레이크포인트의 영향을 받지 않아야 한다 — `.studio-preview__phone .app-shell--learning`처럼 스코프가 좁아 자연히 영향 없음을 확인한다(부모 `.studio-preview__phone`가 `width: min(100%, 390px)`로 이미 제한).

## 브레이크포인트 값

760px 선택 이유: 학습 카드 폭 760px + 좌우 여백을 고려하면 뷰포트 760px 근방부터 폰 카드보다 와이드 컬럼이 자연스럽다. 이는 아이폰 가로모드(~844px 이상)와 대부분의 태블릿/PC를 포함하고, 일반 스마트폰 가로모드 폭(390~430px대는 세로 기준이라 가로 시 844px 근처)보다 작은 애매한 구간은 없다.

## 테스트

- Playwright e2e(`playwright.config.ts`에 이미 모바일/데스크톱 프로젝트 존재)로 761px 이상 뷰포트에서 학습 플로우 진입 시 `.app-shell--learning`의 실제 렌더 폭이 430px보다 넓은지 확인하는 시각 회귀는 아님 — 대신 computed style 또는 스냅샷으로 폭 검증하는 테스트를 추가하거나, 기존 데스크톱 프로젝트 테스트에 폭 assertion을 추가.
- 760px 미만(모바일 세로)에서는 기존 430px 그대로 유지되는지 회귀 확인.

## 이번 범위 밖

- 2단(사이드 패널) 레이아웃
- 다른 탭(오늘/지식지도/탐험/나) 와이드 대응
- 온보딩/레벨체크 화면 와이드 대응
