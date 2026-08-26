# Handoff: 몽글 (Monggle) — ADHD 집중력 관리 앱

## 개요
초등학생부터 성인까지 쓰는 ADHD 친화 할 일·집중 관리 모바일 앱. 핵심 전략은 **캐릭터 애착 + 잠금화면 상시 노출**로, "앱을 열지 않으면 존재하지 않는" 문제를 외부 단서로 보완한다.

세 가지 축:
1. **캐릭터(버디)** — 화면 안을 걸어다니며 실시간으로 말을 건다. 톤 3종(징징/단호/응원) × 상황 7종 = 총 101개 대사.
2. **잠금화면 학습** — 학년에 맞춘 수학 공식 / 영문법 / 영단어 3개 / 명언을 잠금화면 위젯으로 노출.
3. **추천 → 담기** — 오늘 학습 카드와 이어진 할 일 4개를 이유·예상시간과 함께 제시, 한 번 탭으로 할 일 목록에 추가.

## 이 번들의 디자인 파일에 대해
이 폴더의 파일은 **HTML로 만든 디자인 레퍼런스**다 — 의도한 모양과 동작을 보여주는 프로토타입이며, 그대로 복사해 쓸 프로덕션 코드가 아니다.

해야 할 일은 이 HTML 디자인을 **대상 코드베이스의 기존 환경(React / Vue / SwiftUI / Flutter / 네이티브 등)에서 그 환경의 확립된 패턴과 라이브러리로 재구현**하는 것이다. 아직 코드베이스가 없다면 프로젝트에 가장 적합한 프레임워크를 골라 그 위에 구현한다. (모바일 앱이므로 React Native / Flutter / SwiftUI+Kotlin 중 하나를 권장 — 잠금화면 위젯과 앱 사용시간 제어는 네이티브 API가 필요하다.)

프로토타입은 `.dc.html` 형식이며 브라우저에서 바로 열린다. VS Code에서 폴더를 열고 `Monggle 프로토타입.dc.html`을 Live Server 등으로 서브하면 그대로 동작한다(파일 프로토콜 `file://`에서는 모듈 로딩이 막힐 수 있으므로 로컬 서버 권장).

```bash
cd design_handoff_monggle
npx serve .      # 또는 python3 -m http.server
```

## 충실도(Fidelity)
**하이파이(hifi)** — 최종 색상, 타이포그래피, 간격, 인터랙션이 모두 확정된 상태다. UI는 대상 코드베이스의 라이브러리로 픽셀 단위까지 재현할 것. 아래 디자인 토큰 표의 값이 정답이다.

단, 캐릭터 도형(뽀약이 등)은 CSS `border-radius` + 그라디언트로 만든 **플레이스홀더**다. 실제 제품에서는 일러스트레이터가 그린 스프라이트/Lottie 애니메이션으로 교체해야 한다.

---

## 화면 구성 (5개 탭)

기기 프레임: 390×844 논리 픽셀(iPhone 14 기준). 콘텐츠 영역 좌우 패딩 `--space-6` (17px). 하단 탭바가 `position: absolute; bottom: 24px`로 떠 있으므로 스크롤 콘텐츠 하단에 96px 여백 필요.

### 1. 홈 (`tab: 'home'`)
**목적**: 오늘 할 일 확인 + "지금 이것만" 단일 과제 실행.

레이아웃 (위→아래, 세로 flex):
- **헤더 행** — `display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:var(--space-8)`
  - 좌: 날짜 `12px/600, letter-spacing .01em, color:--app-accent-ink, white-space:nowrap` → 그 아래 "오늘" `42px/.98, weight 600, --font-heading, letter-spacing -.02em, margin-top 6px`
  - 우: 스트릭 필 배지 `padding:7px 13px; border-radius:99px; background:--app-glow2; font-size:14px/600; color:--app-text`. 안에 Phosphor `ph-fill ph-flame` 16px(색 `--app-accent`) + 숫자(`font-variant-numeric:tabular-nums`) + "일". 그 아래 학년 칩 행 `gap:4px`.
- **버디 성장 바** — `border-radius:999px; background:--app-sunken; border:1px solid --app-line; padding:var(--space-3) var(--space-4)`. 성장 단계 라벨 `11.5px --app-accent-ink` + "함께한 N일" `11.5px --app-dim` + 진행바 `height:4px; radius:2px`.
- **벤토 통계 2단** — `display:grid; grid-template-columns:1fr 1fr; gap:var(--space-3)`. 각 타일 `padding:16px 16px 14px; border-radius:22px`.
  - 좌("오늘 집중"): `background:--app-sunken`
  - 우("완료"): `background:linear-gradient(150deg, --app-glow, --app-sunken)`
  - 숫자 `30px/600 --font-heading, letter-spacing -.03em, line-height 1, tabular-nums`, 단위 `13px --app-dim`
- **히어로 카드 ("지금 이것만")** — 강조 카드. `border-radius:24px`, 제목 `33px/1.14 weight 600 --font-heading`, 메타 행에 `ph-timer` + 예상시간 + 점 구분(3px 원, `--app-dim2`) + 목표명(`--app-accent-ink`). CTA 2개: 시작(알약, `background:--app-glow2; color:--app-text; box-shadow:0 8px 28px --app-glow; padding:0 28px; font-weight:600`) / 나중에(고스트, `background:--app-sunken; border-color:transparent`).
- **할 일 목록** — 진행바 `height:9px; border-radius:99px` → 행들. 각 행 `display:flex; align-items:center; gap:var(--space-4); padding:var(--space-4); border-radius:20px(초등 24px); background:--app-sunken`. 체크 아이콘 21px. 완료 시 `text-decoration:line-through`, 텍스트 `--app-dim`. hover: `border-color:--app-glow2; background:--app-surface`.
- **추천 섹션** — 라벨 "{버디이름} 추천" `13px/600 --app-accent-ink` + 우측 "{학년} 기준" `11px --app-dim2`. 안내문 `12px --app-dim, line-height 1.6`. 카드 4개: 아이콘 19px(`--app-accent`) + 제목 `13.5px/500` + 이유 `11px --app-dim2` + `ph-timer` 예상시간 `10.5px --app-dim` + 우측 "담기" 버튼(고스트, `min-height:46px`). 담은 뒤에는 `ph-fill ph-check-circle` + "담았어" 라벨로 교체(비활성).

### 2. 잠금화면 (`tab: 'lock'`)
**목적**: 앱을 열지 않아도 학습 내용이 눈에 들어오게 함.

- 중앙 정렬 헤더: "몽글 잠금화면" `12px/600 --app-accent-ink` → 시계 `9:41` **72px weight 600, letter-spacing -.04em, line-height 1.05, tabular-nums** → 날짜·학년 `12.5px --app-dim`
- 카드 4장 세로 스택 `gap:var(--space-3)`, 모두 `border-radius:24px; padding:var(--space-6); box-shadow:var(--shadow-sm)`:
  1. **수학 공식** — `background:linear-gradient(160deg, --app-surface, --app-sunken)`. 라벨(`ph-fill ph-function` + "오늘의 공식") → 공식 `19px --font-heading weight 500` → 설명 `11.5px --app-dim`
  2. **영문법** — `background:--app-sunken`. 라벨(`ph-fill ph-text-aa`) → 규칙 `14.5px/500` → 예문 `12.5px --app-accent-ink` → 설명 `11.5px --app-dim`
  3. **영단어 3개** — 라벨(`ph-fill ph-cards`) + 우측 "탭하면 뜻 보기" `10.5px --app-dim2`. 단어 탭 시 뜻 공개(`revealed` 상태)
  4. **명언** — 좌측에 세로 액센트 라인(`width:2px; background:linear-gradient(180deg,transparent,--app-accent,transparent)`, `left:var(--space-4)`). 라벨(`ph-fill ph-quotes`) + 우측 순번(`ph-arrows-clockwise` + N/총). 본문 `15px/1.6 --font-heading weight 500, text-wrap:pretty`. 출처 `11.5px --app-accent-ink`, `— ` 접두.

명언 카드는 탭하면 다음 명언으로 순환한다.

### 3. 집중 (`tab: 'focus'`)
**목적**: 단일 과제 타이머.

- 중앙 정렬. 라벨 "집중" → 과제명 `18px/500 --font-heading, max-width:250px, text-wrap:pretty`
- **타이머 링** — 236×236px. SVG 원형 진행 링(액센트), 중앙에 남은 시간 `58px weight 600, tabular-nums`
- CTA: 시작/일시정지(알약, 액센트 글로우, `padding:0 30px`) + 초기화(고스트)
- 타이머 완료 시 해당 할 일이 **자동으로 체크됨** (ADHD 사용자의 "끝냈는데 체크를 안 함" 문제 해결)

### 4. 목표 (`tab: 'goals'`)
라벨 "왜 하는가" → "목표" `42px`. 목표 카드마다 이름 + 진행바(`height:9px; radius:99px`) + 퍼센트.

### 5. 설정 (`tab: 'settings'`)
- 헤더: "몽글 · Monggle" `12px/600 --app-accent-ink` → "설정" `42px`
- **학년 선택** — 세그먼트/칩. 초1~고3 + 성인. 선택에 따라 UI 스케일·캐릭터 말투·학습 내용이 모두 바뀜
- **밝기** — 자동 / 밝게 / 어둡게 (자동 = 07~19시 밝게)
- **테마 색 8종** — `display:grid; grid-template-columns:1fr 1fr; gap:var(--space-2)`. 각 버튼 `min-height:50px; border-radius:18px; padding:0 14px`, 좌측에 18px 원형 색 스와치. 선택 시 `background:--app-glow2; border:1px solid --app-accent; color:--app-text`
- **캐릭터 7종** — `display:grid; grid-template-columns:repeat(4,1fr); gap:var(--space-2)`. 각 셀 `padding:14px 4px 10px; border-radius:20px`, 캐릭터 도형 + 이름
- **잔소리 설정** — 토글 목록. 스위치 `width/height/radius` 는 학년 스케일에 연동, knob `background:#fbfbfe`
- **앱 차단** — 토글 목록
- **워드마크** — 하단 중앙, "몽글" `20px/600 --font-heading` + "조금씩, 매일. Monggle 0.1 프로토타입" `11px --app-dim2`
- **삭제 플로우** — 삭제 시 캐릭터 작별 다이얼로그 → 7일 복구 기간

### 탭바
`position:absolute; left/right:var(--space-6); bottom:24px; display:flex; gap:4px; padding:6px; border-radius:26px; background:--app-tabbar; backdrop-filter:blur(14px); border:1px solid --app-line`.
각 탭 버튼: `flex:1; padding:11px 0; border-radius:20px; gap:4px` 세로 배치. 아이콘 21px + 라벨 `10px/600`. 활성 탭: `background:--app-tab-active; color:--app-accent-ink; box-shadow:0 4px 16px --app-glow`.

Phosphor 아이콘: `ph-house` 홈 / `ph-lock-simple` 잠금화면 / `ph-timer` 집중 / `ph-target` 목표 / `ph-gear` 설정.

---

## 캐릭터 시스템

### 캐릭터 7종
| id | 이름 | 특징 플래그 | border-radius |
|---|---|---|---|
| `ppo` | 뽀약이 | antenna | `50% 50% 44% 44%` |
| `nyang` | 냥냥이 | ears | `46%` |
| `ppyak` | 삐약이 | beak, tuft | `52% 52% 48% 48%` |
| `mung` | 뭉이 | — | `48% 52% 42% 46%` |
| `toto` | 토토 | ears, tuft | `54% 54% 42% 42%` |
| `kong` | 콩이 | antenna, beak | `42% 42% 50% 50%` |
| `duri` | 두리 | tuft | `50%` |

몸통 색은 선택된 테마 액센트에서 `color-mix(in oklab, var(--app-accent) N%, #fff|#000)` 로 파생 — 테마를 바꾸면 캐릭터 색도 따라간다. 그라디언트는 `linear-gradient(165deg, A, B 62%, C)`.

애니메이션: `bob` (2.6s 무한, ±7px 상하 + ±2deg 회전), 눈 `blink` (4s 무한, 96% 지점에서 `scaleY(.1)`). 화면 안 위치는 `bx`/`by` 퍼센트 좌표로 탭에 따라 이동.

### 말풍선
`bottom:60px; max-width:186px; padding:9px 12px; border-radius:14px; background:--app-bubble-bg; color:--app-bubble-fg; font-size:12.5px(초등 13.5px); line-height:1.45; weight 500; box-shadow:0 6px 20px --app-shadow`. 꼬리는 11×11px `rotate(45deg)` + `border-radius:2px`. 등장 애니메이션 `pop .25s ease both`.

### 대사 풀 (총 101개)
`talk()` 메서드가 7개 풀을 반환. 프로토타입 소스의 배열을 그대로 가져갈 것.

| 풀 | 개수 | 언제 |
|---|---|---|
| `kidIdle` | 16 | 초등 + 대기 중 |
| `kidRunning` | 12 | 초등 + 타이머 실행 중 |
| `allDone` | 14 | 오늘 할 일 전부 완료 |
| `running` | 14 | 중등 이상 + 타이머 실행 중 |
| `cheer` | 15 | 톤=응원 |
| `stern` | 14 | 톤=단호 |
| `whine` | 16 | 톤=징징 |

플레이스홀더: `{n}` → 현재 할 일 이름(없으면 "오늘 할 일"), `{m}` → 남은 분. 잔소리 주기(`nagSeconds`, 기본 7초)마다 `lineIdx`가 1 증가하며 풀 안을 순환한다.

> **제품 주의**: `whine`(징징) 풀은 죄책감을 유발한다. ADHD 사용자는 실패 경험이 누적돼 있어 죄책감 유발이 앱 회피·삭제로 이어질 위험이 크다. 프로덕션에서는 기본 톤을 `cheer`로 두고 `whine`은 옵션으로 숨기는 것을 권장.

---

## 학년별 콘텐츠 (4계층)
학년 선택은 UI 스케일·말투·학습 내용을 동시에 바꾼다.

| 계층 | 학년 | 카드 radius | CTA 높이/폰트 | 말풍선 | 특징 |
|---|---|---|---|---|---|
| 초등 | 초1–초6 | 24px | 58px / 16px | 13.5px | 유아 톤(폭신폭신, 폴짝폴짝), 큰 터치 영역 |
| 중등 | 중1–중3 | 20px | 54px / 15px | 12.5px | 시험 범위 중심 |
| 고등 | 고1–고3 | 20px | 54px / 15px | 12.5px | 수능형 독해·유형 문제 |
| 성인 | 성인 | 20px | 54px / 15px | 12.5px | 비즈니스 영어, 존댓말 |

학습 카드(수학 공식·문법·단어·명언)와 추천 할 일 4개가 계층별로 각각 준비되어 있다. 예: 초등 `3+4=7` ↔ 성인 비즈니스 표현.

추천 할 일 데이터 형식:
```js
{ icon: 'ph-cards', title: '영단어 20개 암기', why: '오늘 나온 단어 포함 — 시험 범위', est: '25분' }
```

---

## 인터랙션 & 동작
- **할 일 체크** — 행 전체가 탭 영역. 토글 시 `line-through` + 텍스트 색 `--app-dim`
- **집중 타이머** — 링 애니메이션, 완료 시 해당 할 일 자동 체크
- **추천 담기** — `added[title]` 맵으로 중복 방지. 초등이면 `kidTasks`, 아니면 `tasks` 배열에 추가
- **단어 뜻 공개** — `revealed[word]` 맵
- **명언 순환** — 탭 시 `qIdx` 증가
- **캐릭터 잔소리** — `nagSeconds` 간격 타이머로 `lineIdx` 증가
- **테마/캐릭터/학년 변경** — 즉시 반영, 페이지 리로드 없음
- **삭제 플로우** — 작별 다이얼로그 → 7일 복구 기간 안내
- 전환 시간: 색·배경 `.15s`, 스위치 `.2s`, 등장 `rise .4s ease both` / `pop .25s ease both`
- `:focus-visible` — `outline: 2px solid var(--app-accent); outline-offset: 2px` (기본 파란 링 금지)
- 모든 터치 타깃 최소 46px, 초등 계층은 52px 이상

## 상태 관리
```js
{
  tab: 'home' | 'lock' | 'focus' | 'goals' | 'settings',
  grade: string,            // '초1' … '고3' | '성인'
  skin: string,             // 테마 색 id
  charId: string,           // 캐릭터 id
  themeMode: '자동'|'밝게'|'어둡게',
  tasks: Task[],            // 중등 이상
  kidTasks: Task[],         // 초등
  added: Record<string, boolean>,   // 추천 담기 이력
  revealed: Record<string, boolean>,// 단어 뜻 공개
  running: boolean,         // 타이머 실행 중
  remaining: number,        // 남은 초
  lineIdx: number,          // 대사 인덱스
  qIdx: number,             // 명언 인덱스
  bx: number, by: number,   // 캐릭터 위치 (%)
  buddyGone: boolean,       // 삭제됨
  reminders: {name, on}[],
  blocks: {name, on}[],
  goals: {name, pct}[]
}

Task = { id: number, title: string, goal: string|null, est: string, done: boolean }
```

데이터 페칭 없음 — 전부 로컬 상태. 프로덕션에서는 할 일·목표·성장 기록을 로컬 DB(예: SQLite/Realm)에 저장하고 잠금화면 위젯이 읽을 수 있도록 공유 저장소(iOS App Group / Android SharedPreferences)에 미러링해야 한다.

## 디자인 토큰

베이스는 Nocturne 디자인 시스템(`_ds/nocturne-*/styles.css`) — 폰트, 간격 스케일(density 0.70×), radius, shadow를 여기서 가져온다. 앱 레이어는 그 위에 `--app-*` 시맨틱 토큰을 얹고, 8개 스킨이 이를 재정의하는 구조다.

### 시맨틱 토큰 (역할)
| 토큰 | 역할 |
|---|---|
| `--app-bg` | 화면 배경 |
| `--app-surface` | 카드 표면(밝은 쪽) |
| `--app-sunken` | 눌린 표면 — 할 일 행, 통계 타일, 고스트 버튼 |
| `--app-line` | 경계선 |
| `--app-text` | 본문 텍스트 |
| `--app-dim` | 보조 텍스트 |
| `--app-dim2` | 3차 텍스트 |
| `--app-accent` | 액센트 — 아이콘, 라인, 큰 텍스트 |
| `--app-accent-ink` | **본문 크기 텍스트용 진한 액센트** (대비 확보용, 반드시 구분) |
| `--app-glow` / `--app-glow2` | 액센트 틴트 16% / 28% — 글로우, 필 배경 |
| `--app-tab-active` | 활성 탭 배경 |
| `--app-tabbar` | 탭바 배경(반투명) |
| `--app-bubble-bg` / `--app-bubble-fg` | 말풍선 배경/글자 |
| `--app-scrim` | 다이얼로그 배경막 |
| `--app-shadow` | 그림자 색 |

### 스킨 8종
| 스킨 | 이름 | 배경 | 표면 | 눌림 | 선 | 텍스트 | dim | dim2 | 액센트 | accent-ink | 밝기 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `lavender` | 라벤더 | Nocturne 토큰 | — | — | — | — | — | — | `#9184d9` 계열 | — | 밝기 설정 따름 |
| `cream` | 크림 코랄 | `#fdf5ef` | `#fffaf6` | `#f6e9e0` | `#ecd9cd` | `#2a1d16` | `#6b503f` | `#7a5c4a` | `#e0512c` | `#a8330f` | 라이트 |
| `mint` | 민트 | `#eff7f2` | `#fbfefc` | `#e0efe6` | `#cfe4d7` | `#12261c` | `#41594c` | `#506b5c` | `#0d8f6c` | `#046148` | 라이트 |
| `butter` | 버터 | `#fff8e6` | `#fffdf5` | `#faeecd` | `#eddfb8` | `#2b2211` | `#64522a` | `#6f5c31` | `#c9740a` | `#8a4b00` | 라이트 |
| `sky` | 스카이 | `#eff4ff` | `#fbfcff` | `#e2eaff` | `#cfdbfa` | `#141b30` | `#445070` | `#4f5c7e` | `#2f5fe8` | `#1f43ad` | 라이트 |
| `peach` | 피치 | `#fff2f6` | `#fffafc` | `#ffe4ee` | `#f8d1e0` | `#2c1420` | `#6d4558` | `#7a4f63` | `#d63472` | `#a5124d` | 라이트 |
| `grape` | 그레이프 | `#f5f1ff` | `#fdfbff` | `#eae2ff` | `#dbd0f7` | `#1e1533` | `#524671` | `#5e5280` | `#6b3fe0` | `#4f22c4` | 라이트 |
| `lime` | 라임 나이트 | `#12142a` | `#1d2043` | `#191c39` | `#2a2e58` | `#eef2e6` | `#a1a8ca` | `#8e95ba` | `#a8e838` | `#b9ee5c` | 다크 |

라벤더만 밝기 설정(자동/밝게/어둡게)을 따르고, 나머지 7종은 각자 고정 밝기다.

말풍선 글자색: cream `#fff6f2` / mint `#f2fdf8` / butter `#fffaf0` / sky `#f4f7ff` / peach `#fff5f9` / grape `#f7f3ff` / lime `#171c08`.
탭바 배경: 라이트 스킨은 표면색 88% 알파, lime은 `rgba(29,32,67,.84)`.

### 타이포그래피 스케일 (실측)
| 용도 | 크기 / 행간 / 굵기 | 자간 |
|---|---|---|
| 시계 (잠금화면) | 72px / 1.05 / 600 | -.04em |
| 화면 타이틀 | 42px / .98 / 600 | -.02em |
| 타이머 숫자 | 58px / — / 600 | — |
| 히어로 과제명 | 33px / 1.14 / 600 | — |
| 통계 숫자 | 30px / 1 / 600 | -.03em |
| 워드마크 | 20px / — / 600 | -.02em |
| 수학 공식 | 19px / 1.4 / 500 | -.01em |
| 집중 과제명 | 18px / — / 500 | — |
| 명언 본문 | 15px / 1.6 / 500 | -.01em |
| 문법 규칙 | 14.5px / 1.5 / 500 | — |
| 할 일 제목 | 14px / — / — | — |
| 추천 제목 / 설정 항목 | 13.5px / 1.4 / 500 | — |
| 섹션 라벨 | 13px / — / 600 | -.01em |
| 통계 라벨 / 문법 예문 | 12.5px / — / — | — |
| 화면 kicker / 날짜 | 12px / — / 600 | .01em |
| 카드 라벨 / 성장 라벨 | 11.5px / — / 600 | .01em |
| 보조 설명 | 11px / 1.6–1.7 / — | — |
| 3차 라벨 | 10.5px / — / — | — |
| 탭 라벨 | 10px / — / 600 | .01em |

헤딩 `var(--font-heading)`, 본문 `var(--font-body)` — 둘 다 Inter (Nocturne 기준). 숫자는 모두 `font-variant-numeric: tabular-nums`.

### Radius
`99px`(알약 — CTA, 스트릭 배지, 진행바) / `26px`(탭바) / `24px`(주요 카드, 초등 할 일 행) / `22px`(통계 타일) / `20px`(할 일 행, 활성 탭, 캐릭터 셀) / `18px`(스킨 버튼) / `14px`(말풍선) / `50%`(원형)

### 간격
Nocturne `--space-*` 스케일(density 0.70×) 사용. 주로 `--space-2`(약 6px) ~ `--space-8`(약 22px). 하드코딩된 예외: 통계 타일 `16px 16px 14px`, 캐릭터 셀 `14px 4px 10px`, 탭바 `6px`, 탭 버튼 `11px 0`, 탭바 하단 오프셋 `24px`.

### 그림자
`var(--shadow-sm)` (카드) / `0 8px 28px var(--app-glow)` (주요 CTA) / `0 4px 16px var(--app-glow)` (활성 탭) / `0 6px 20px var(--app-shadow)` (말풍선)

### 애니메이션
```css
@keyframes rise  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
@keyframes bob   { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-7px) rotate(2deg)} }
@keyframes blink { 0%,92%,100%{transform:scaleY(1)} 96%{transform:scaleY(.1)} }
@keyframes pop   { from{opacity:0;transform:translateY(6px) scale(.92)} to{opacity:1;transform:none} }
@keyframes glow  { 0%,100%{opacity:.3} 50%{opacity:.6} }
```

## 에셋
- **아이콘**: [Phosphor Icons](https://phosphoricons.com) 2.1.1 (regular + fill). 사용된 것: `ph-house` `ph-lock-simple` `ph-timer` `ph-target` `ph-gear` `ph-flame` `ph-play` `ph-pause` `ph-plus` `ph-check-circle` `ph-function` `ph-text-aa` `ph-cards` `ph-quotes` `ph-arrows-clockwise` `ph-book-open` `ph-backpack` `ph-broom` `ph-newspaper` `ph-notebook` `ph-moon` `ph-briefcase` `ph-envelope-open` `ph-person-simple-run`
- **폰트**: Inter (Nocturne `--font-heading` / `--font-body`)
- **캐릭터**: 순수 CSS 도형 — **일러스트 교체 필요**
- 사진/래스터 에셋 없음

## 구현 시 주의 (네이티브 필요 영역)
1. **잠금화면 위젯** — iOS WidgetKit(Lock Screen widget, iOS 16+) / Android App Widget + Glance. 학습 콘텐츠를 공유 저장소에서 읽어야 함.
2. **앱 사용 제어** — iOS Screen Time API(FamilyControls / DeviceActivity, 권한 필요) / Android UsageStatsManager + Accessibility. **프로토타입의 토글은 UI만 있고 실제 차단 로직은 없다.**
3. **잔소리 알림** — 프로토타입은 앱 내 타이머. 실제로는 로컬 푸시 알림 스케줄링 필요.
4. **캐릭터 애니메이션** — Lottie / Rive 권장.

## 파일 목록
| 파일 | 내용 |
|---|---|
| `Monggle 프로토타입.dc.html` | 메인 프로토타입 — 5개 탭 전체, 캐릭터 시스템, 대사 101개, 학년별 콘텐츠, 스킨 8종 |
| `ios-frame.jsx` | iPhone 기기 프레임(베젤·상태바) — 프리젠테이션용, 재구현 불필요 |
| `support.js` | 프로토타입 런타임 — 재구현 불필요 |
| `_ds/nocturne-*/styles.css` | Nocturne 디자인 시스템 토큰 + 컴포넌트 CSS |
| `_ds/nocturne-*/readme.md` | Nocturne 디자인 시스템 가이드 |

프로토타입 HTML은 상단 `<style>` 블록에 전체 토큰 정의가, 하단 `<script data-dc-script>` 블록에 모든 데이터(대사 풀, 학년별 학습 콘텐츠, 추천 목록, 명언)와 상태 로직이 들어 있다. **데이터 배열은 그대로 가져다 쓸 수 있다.**
