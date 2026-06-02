# 리딩브레인영어학원 · 영자신문 교재 빌더

AR(ATOS) 지수와 학년을 입력하면 AI가 분야별 주제를 추천하고, 선택한 주제로 **영자신문 본문 + 워크북(어휘·독해·요약·토론·작문·문법)** 을 자동 생성하여 인쇄용 PDF로 저장할 수 있는 웹 애플리케이션입니다.

## 1. 사전 준비

- Node.js 18 이상 (`node --version`)
- OpenAI API 키 (https://platform.openai.com/api-keys)

## 2. 설치

PowerShell에서 프로젝트 루트(`ar/`)로 이동 후:

```powershell
npm run install:all
```

## 3. API 키 설정

`server/.env.example` 파일을 복사해 `server/.env` 로 만들고 키를 입력합니다.

```powershell
Copy-Item server\.env.example server\.env
notepad server\.env
```

```
OPENAI_API_KEY=sk-여기에_키_붙여넣기
OPENAI_MODEL=gpt-4o-mini
PORT=3001
```

비용을 더 들이고 품질을 높이려면 `OPENAI_MODEL=gpt-4o` 로 변경하세요.

## 4. 실행

```powershell
npm run dev
```

- 백엔드: http://localhost:3001
- 프론트엔드: http://localhost:5173 ← 브라우저에서 접속

## 5. 사용 흐름

1. **레벨 설정** — AR 지수(슬라이더 2.0~12.0) · 학년 · 본문 분량 직접 선택
2. **분야 선택** — 과학/환경/문화/스포츠/경제/사회/역사/교육 8개 분야
3. **주제 선택** — AI가 즉시 6개 주제 후보 제안 → 마음에 들지 않으면 "다른 후보 다시 받기"
4. **미리보기·인쇄** — 5쪽 구성의 교재가 화면에 표시됩니다.
   - p1: 신문 1면 형태의 본문(헤드라인·바이라인·2단 컬럼)
   - p2: Vocabulary Builder
   - p3: Reading Comprehension (객관식 + 단답형)
   - p4: Main Idea & Summary + Discussion + Writing Prompt
   - p5: Grammar Focus
5. **PDF 저장** — 두 가지 옵션 제공
   - **현재 보기만**: 학생용 또는 교사용 중 한 부만 저장
   - **학생용 + 교사용 한 번에 PDF**: 학생용 5쪽 → 교사용 표지 → 교사용 5쪽(정답·해설 포함) 순서로 11쪽 통합 PDF 생성. 한 번의 인쇄로 두 부 모두 산출됩니다.

## 6. 산출물 구조

각 회차 교재는 다음을 포함합니다.

| Section | 내용 |
|---|---|
| Article | AR 지수에 맞춘 원본 영자신문 기사 (저작권 안전) |
| Vocabulary | 본문에서 추출한 핵심 어휘 10개 + 정의 + 한국어 뜻 + 예문 + 자기 작문 |
| Comprehension | 객관식 4지선다 + 단답형 |
| Summary | 3문장 요약 과제 + 모범 답안(교사용) |
| Discussion | 토론 질문 4개 |
| Writing Prompt | 본문 연계 작문 과제(80~120 단어) + 체크리스트 |
| Grammar Focus | 본문에서 다룰 문법 포인트 1개 + 설명 + 예문 + 연습 4문항 |

## 7. 자주 묻는 질문

- **저작권**: 모든 본문은 AI가 새로 작성한 원본이며, 학원 내 수업 자료로 안전하게 사용 가능합니다.
- **AR 지수 정확도**: AR은 ATOS 가이드(문장 길이/어휘 빈도)에 맞춰 프롬프트로 통제합니다. 미세 조정이 필요하면 슬라이더로 0.1 단위 조절하세요.
- **다른 모델 사용**: `server/.env`의 `OPENAI_MODEL` 값을 변경하면 즉시 적용됩니다.
- **로고 변경**: `client/src/Worksheet.tsx` 상단의 신문 마스트헤드, `App.tsx`의 `TopBar` 영역에서 학원 브랜딩을 직접 수정할 수 있습니다.

## 8. 디렉토리 구조

```
ar/
├── client/           # React + Vite + Tailwind (UI, 워크시트 렌더, 인쇄)
│   └── src/
│       ├── App.tsx          # 4단계 마법사
│       ├── Worksheet.tsx    # 영자신문 본문 + 워크북 5쪽 레이아웃
│       └── types.ts
├── server/           # Express + OpenAI (주제·교재 생성 API)
│   └── src/index.js
└── package.json      # 루트 (concurrently로 동시 실행)
```
