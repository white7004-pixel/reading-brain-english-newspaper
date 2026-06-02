# CLAUDE.md

이 파일은 [Claude Code](https://docs.claude.com/en/docs/claude-code) 가 프로젝트를 빠르게 이해하기 위한 컨텍스트 문서입니다. 프로젝트 루트에 `claude` 명령으로 진입하면 자동 로드됩니다.

---

## 프로젝트 한 줄 요약

리딩브레인영어학원 영자신문반의 **AR(ATOS) 지수 맞춤 영자신문 교재 자동 제작 웹 애플리케이션**.
사용자가 학년/AR 지수/주제를 선택하면 LLM이 영자신문 본문 + 워크북을 생성하고 인쇄용 PDF로 출력합니다.

## 두 가지 제작 모드
- **단일 회차** — 1 분야 → 주제 6개 후보 → 5쪽 교재 한 부 (빠른 1회차 제작)
- **월간 합본 책** — 8개 분야 모두 큐레이션 → 표지+TOC+8섹션 한 권의 책 (~50쪽/판본)

## 워크북 구성 (각 기사 = 5쪽)
1. Newspaper Article (2단 컬럼, 헤드라인+바이라인+데이트라인)
2. Vocabulary Builder (10개 어휘 + 정의 + 한국어 뜻 + 예문 + 자기 작문)
3. Reading Comprehension (객관식 + 단답형)
4. Main Idea & Summary + Discussion + Writing Prompt
5. Grammar Focus (본문 발췌 + 연습 4문항)

## 학생용 / 교사용
- 미리보기에서 토글 (배지: 파란색=학생, 빨간색=교사)
- "학생용 + 교사용 한 번에 PDF" 버튼으로 통합 PDF 출력 (학생용 → 교사용 표지 → 교사용)

---

## 기술 스택

| 레이어 | 기술 |
|---|---|
| 프론트엔드 | Vite + React 18 + TypeScript (strict) + Tailwind CSS |
| 백엔드 | Express + Node 18+, dotenv hot-reload (재시작 없이 .env 갱신) |
| LLM | OpenAI SDK / Anthropic SDK 멀티 프로바이더 (`LLM_PROVIDER=openai|anthropic`) |
| PDF | 브라우저 인쇄(Ctrl+P) + `@media print` A4 최적화 (외부 PDF 라이브러리 없음) |

## 디렉토리 구조

```
ar/
├── CLAUDE.md                 ← 이 파일
├── README.md
├── package.json              ← 루트: concurrently로 client/server 동시 실행
├── client/                   ← Vite + React 프론트엔드 (port 5173)
│   ├── public/reading-brain-logo.jpg   ← 학원 로고 (5곳에 임베드)
│   ├── index.html
│   ├── vite.config.ts        ← /api 프록시 → localhost:3001
│   ├── tailwind.config.js
│   ├── tsconfig.json (strict)
│   └── src/
│       ├── main.tsx
│       ├── App.tsx           ← 4단계 마법사 (config → topics → preview)
│       ├── Worksheet.tsx     ← Edition / CombinedWorksheet / Book / CombinedBook / TableOfContents
│       ├── types.ts          ← WorkbookData / BookData / CategoryTopics
│       └── index.css         ← Tailwind + @media print 인쇄 CSS
└── server/                   ← Express 백엔드 (port 3001)
    ├── .env.example
    ├── package.json
    └── src/index.js          ← /api/categories, /api/topics, /api/topics/all, /api/generate, /api/health
```

---

## 빠른 시작

```bash
# 1) 의존성 일괄 설치
npm run install:all

# 2) 환경변수 파일 생성 후 키 입력
cp server/.env.example server/.env
# server/.env 를 편집 — Anthropic 사용 시:
#   LLM_PROVIDER=anthropic
#   ANTHROPIC_API_KEY=sk-ant-...
#   ANTHROPIC_MODEL=claude-3-5-sonnet-20241022

# 3) 개발 서버 실행 (백엔드 + 프론트엔드 동시)
npm run dev
# → http://localhost:5173
```

## 검증 명령

```bash
# TypeScript 타입체크
npm --prefix client exec -- tsc -b --noEmit

# 프로덕션 빌드
npm --prefix client run build

# 서버 구문 검사
node --check server/src/index.js

# Health check (서버 실행 중)
curl http://localhost:3001/api/health
# → {"ok":true,"provider":"anthropic","model":"...","keyConfigured":true}
```

---

## API 엔드포인트

모든 LLM 호출은 `chatJson({ system, user, temperature })` 헬퍼를 거쳐 OpenAI/Anthropic 으로 분기됩니다.

| 메서드 | 경로 | 입력 | 출력 |
|---|---|---|---|
| `GET` | `/api/health` | — | `{ ok, provider, model, keyConfigured }` |
| `GET` | `/api/categories` | — | `{ categories: [{id, label, ko}] }` (8개) |
| `POST` | `/api/topics` | `{ category, ar, grade, count? }` | `{ topics: [{title, angle, ko}] }` |
| `POST` | `/api/topics/all` | `{ ar, grade, perCategory? }` | `{ results: [{categoryId, categoryLabel, topics}] }` (병렬, 부분 실패 graceful) |
| `POST` | `/api/generate` | `{ topic, angle, category, ar, grade, length }` | `WorkbookData` |

## AR 지수별 통제

서버 `arGuide(ar)` 함수가 AR 구간별로 시스템 프롬프트에 다음을 주입:
- 문장 길이 (예: AR 3.0 → "6~10 words/sentence")
- 어휘대 (예: AR 3.0 → "CEFR A1, very common high-frequency words")
- 문법 범위 (예: AR 3.0 → "simple present, past, basic conjunctions")

지원 범위: AR 1.0 ~ 12.0 (Pre-Beginner ~ Advanced)

---

## 주요 설계 결정

### 1. LLM 응답 파싱 (`server/src/index.js: parseJsonLoose`)
- OpenAI는 `response_format: { type: 'json_object' }` 사용 → 깔끔한 JSON
- Anthropic은 강제 JSON 모드가 없으므로 `parseJsonLoose` 가 마크다운 fence/preamble 제거 + 객체/배열 모두 추출
- Claude가 `Here is the JSON: ```json\n{...}\n``` ` 형태로 응답해도 안전

### 2. 책 모드 부분 실패 허용 (`client/src/App.tsx: generateBook`)
- 8개 분야를 `runChunked(items, BOOK_CONCURRENCY=3, fn)` 으로 청크 단위 호출 (Tier 1 RPM 보호)
- 각 호출은 개별 try/catch → `{ ok: true, data } | { ok: false, categoryLabel }` 결과 객체
- `flatMap`으로 성공한 섹션만 추출, 실패는 amber 배너로 사용자 안내
- 8개 모두 실패한 경우에만 에러로 처리

### 3. 인쇄 트리거 (`client/src/App.tsx`)
- `printMode: 'idle' | 'single' | 'combined'` 상태 + `useEffect` + `requestAnimationFrame ×2`
- React 커밋 → 브라우저 페인트 완료 후 `window.print()` 호출 (~100쪽 합본도 안정)
- `afterprint` 이벤트로 자동 idle 복귀

### 4. 본문 자동 축소 (`client/src/Worksheet.tsx`)
- `data.article.word_count` 기반 4단계 폰트 크기 자동 조절 (11.5px ~ 14px)
- Long 본문(약 570단어)도 신문 1면에 들어가도록 보장

### 5. 학원 브랜딩
- 로고 5곳: TopBar / 신문 마스트헤드 / 워크북 페이지 헤더 / 마지막 푸터 / favicon
- 슬로건: "Reading Is The Only Way!"

---

## 코딩 규칙

- **TypeScript strict** 활성. `catch (e: unknown)` + `errMsg(e)` 헬퍼로 narrowing
- 컴포넌트는 함수형 + 훅. 상태는 `useState` 우선, 복잡할 때만 reducer 검토
- 인쇄 전용 스타일은 `client/src/index.css` 의 `@media print` 블록에 집중. UI 요소는 `.no-print` 클래스로 숨김
- Tailwind 우선, 임의 값은 `text-[12px]` 같은 임의 값 표기 사용
- 한국어/영어 혼용: UI 라벨은 한국어, 인쇄물 본문은 영어. 워크시트 헤더/배지는 학원 홍보 + 영어 본문 둘 다

## 보안

- **API 키는 절대 커밋 금지** (`.env`는 `.gitignore` 포함됨)
- LLM 응답을 React에 렌더할 때 `dangerouslySetInnerHTML` 사용 안 함 (XSS 방어)
- Express CORS는 현재 전체 허용 (`app.use(cors())`) — 운영 환경에서는 origin 제한 권장

---

## 후속 작업 후보 (Claude Code 추천 작업)

다음 항목은 후속 PR로 처리하기 좋은 단위들입니다.

### 단기
- [ ] **PDF 파일명 자동 지정**: 인쇄 시 `<title>` 동적 변경 → 학원명_AR_Grade_날짜.pdf 형태
- [ ] **생성 이력 보관**: localStorage에 최근 5권 저장, 한 번 더 보기 기능
- [ ] **로고/슬로건/학원명 커스터마이징 설정 화면** (다른 학원에서도 재사용 가능)

### 중기
- [ ] **서버사이드 PDF 생성**: Puppeteer로 직접 PDF 출력 (브라우저 인쇄 의존 제거)
- [ ] **429 응답 시 지수 백오프 재시도** (1s, 2s, 4s — Rate Limit 대응 강화)
- [ ] **SSE 진행 스트리밍**: 책 생성 중 실시간으로 섹션별 결과 전달

### 장기
- [ ] **다국어 워크북** (중국어 학원/일본어 학원도 활용 가능하도록 i18n)
- [ ] **음성 듣기 자료 자동 생성** (TTS 통합 → MP3/QR코드)
- [ ] **학생 답안 채점 모드** (제출한 워크북 답안을 LLM이 자동 채점)

---

## 자주 묻는 질문

- **저작권은 안전한가?** 모든 본문은 LLM이 새로 작성한 원본이며 학원 내 수업 자료로 사용 가능
- **AR 지수 정확도?** ATOS 가이드(문장 길이/어휘 빈도)에 맞춘 시스템 프롬프트로 통제. 미세조정은 슬라이더 0.1 단위
- **OpenAI vs Claude?** 영자신문 자연스러움/AR 통제력은 Claude 3.5 Sonnet이 우수. 비용 절약은 GPT-4o-mini 추천
- **합본 PDF가 너무 길다?** Long 옵션을 Medium/Short로 낮추거나, 단일 회차 모드로 5쪽씩만 생성

## 문제 해결

| 증상 | 원인 | 해결 |
|---|---|---|
| `OPENAI_API_KEY가 설정되지 않았습니다` | `server/.env` 누락 | `.env.example` 복사 후 키 입력 |
| `provider:openai`인데 Anthropic 키 사용 중 | `LLM_PROVIDER=anthropic` 미설정 | `.env`에 `LLM_PROVIDER=anthropic` 추가 |
| 인쇄 시 빈 페이지 출력 | (구버전) setTimeout 타이밍 문제 | 최신 main 브랜치 동기화 — rAF 적용된 PR #1 머지 후 해결 |
| Claude 응답 JSON 파싱 실패 | preamble로 인한 fence 잔류 | `parseJsonLoose` 글로벌 fence 제거 적용 (PR #1) |
| 책 생성 시 일부 분야만 실패 | LLM Rate Limit | 자동으로 amber 배너 안내 + 성공한 섹션만 책으로 조립 |
