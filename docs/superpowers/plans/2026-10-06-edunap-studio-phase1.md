# 에듀냅 스튜디오 1단계 구현 계획 (사진 스토리 · 화면 크기·길이 · 설명멘트)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 원장님이 사진 + 사진 설명 + 방향만 적으면 사진 중심 영상(삽화 생성 없이)이 만들어지고, 화면 크기와 길이를 직접 정할 수 있으며, 완성 화면에서 채널별 설명멘트(인스타·당근·유튜브·공지)를 복사해 쓸 수 있게 한다.

**Architecture:** 기존 `VideoProject` 상태 머신·게이트1/2·원가 기록·접근 제어를 그대로 두고, 선택 필드(`style`, `width`, `height`, `captions`, `captionHints`)만 추가한다. `style`이 비어 있으면(기존 프로젝트) 지금과 똑같이 동작한다. 사진 스토리는 **모든 장면에 `mediaIndex`를 배정**해서 기존의 "미디어 장면은 삽화·씬 Lambda를 건너뛴다" 경로(`generate-assets.ts`, `render/lambda.ts`)를 그대로 탄다. 새로 필요한 렌더는 Remotion의 새 컴포지션 `flex` 하나(폭·높이를 props로 받음)다. 설명멘트는 대본 확정 직후 글자만으로 생성한다.

**Tech Stack:** Next.js 16/React 19/Prisma(기존), `@anthropic-ai/sdk`(기존, `claude-sonnet-4-6`), Remotion 4.0.512 + zod 4.4.3(`video-service/remotion` 자체 package.json), ElevenLabs(기존), Vercel Blob(기존).

**근거 문서:** `docs/superpowers/specs/2026-10-05-edunap-studio-upgrade-design.md` (이 계획은 그 4.1~4.5의 1단계 분량). 이 계획서는 영어신문 저장소에 있고, 실행은 에듀냅 저장소(`dolai1863/edunap`)에서 한다.

## Global Constraints

- **사용자에게 보이는 모든 문구에 "AI" 단어 금지.** UI·에러 메시지·메타데이터뿐 아니라 **생성되는 설명멘트에도** 쓰지 않는다(Task 6에서 후처리로 검사). 이미지·아이콘·이모지 사용 금지(텍스트와 CSS만). (에듀냅 `CLAUDE.md` 필수 규칙)
- **구현 후 `/simplify`로 코드 리뷰 필수.** (`CLAUDE.md`)
- 새 컬럼은 전부 **nullable**. `style == null`은 `whiteboard`로 해석한다. 기존 프로젝트·기존 화면은 변하면 안 된다.
- **커밋·푸시는 사용자가 요청할 때만.** 각 태스크의 끝은 "검증 통과" 상태다. 작업 브랜치는 에듀냅 저장소에 쓰기 권한을 연결할 때 사용자와 정한다.
- 테스트 방식: 기존 영상비서 관례대로 **`scripts/probe-studio-*.ts` 정적 프로브**(라이브 API 호출 없음, `npx tsx`로 실행) + `npx tsc --noEmit` + `npm run lint`. 실화면 E2E와 영상 품질 판정은 사용자가 한다.
- 새 npm 의존성 추가 금지.
- **롤아웃 안전장치:** 환경변수 `STUDIO_PHOTO_STORY_ENABLED=1`일 때만 서버가 `style=photo-story` 생성을 허용하고 UI가 선택지를 보여준다(`BLOG_AUTO_SERVER_ENABLED` 관례와 같음). 꺼져 있으면 지금과 100% 동일.
- **배포 순서:** ① Remotion 사이트 재배포(`video-service/remotion/deploy-lambda.sh`) → ② Prisma 마이그레이션 적용 → ③ 앱 배포 → ④ 환경변수 켜기. 순서가 바뀌면 새 컴포지션을 못 찾아 렌더가 실패한다.
- 월 프로젝트 상한(`MONTHLY_PROJECT_CAP = 10`)은 **이번 단계에서 바꾸지 않는다.** 모드별 한도는 결정 대기 항목이다. (바꾸게 되면 `access.ts` 주석대로 pricing·terms·chatbot-faq 3곳을 함께 수정)

## 파일 구조 (한눈에)

| 구분 | 파일 | 변경 |
|---|---|---|
| DB | `prisma/schema.prisma`, `prisma/migrations/<ts>_studio_photo_story/migration.sql` | 컬럼 5개 추가 |
| 타입·규칙 | `src/lib/studio/types.ts` | 스타일·화면 크기·길이·장면 수 규칙 |
| 대본 | `src/lib/studio/script-gen.ts` | 사진 스토리 프롬프트·검증 |
| 목소리 | `src/lib/studio/tts.ts`, `generate-assets.ts` | `none`(자막만) |
| 렌더 | `src/lib/studio/render/{props,lambda,local}.ts`, `video-service/remotion/src/{schema,Video,Captions,Root}.tsx` | `flex` 컴포지션 |
| 설명멘트 | `src/lib/studio/captions-gen.ts`(신규), `captions-risk.ts`(신규), `cost.ts` | 생성·검사 |
| API | `src/app/api/studio/projects/route.ts`, `[id]/script/route.ts`, `[id]/captions/route.ts`(신규), `[id]/render/route.ts` | 입력 확장 |
| UI | `src/app/(main)/services/studio/app/_components/{PromptStep,ScriptStep,AssetsStep,RenderStep,shared}.ts(x)`, `CaptionsPanel.tsx`(신규), `page.tsx` | 화면 |
| 프로브 | `scripts/probe-studio-format.ts`, `probe-studio-script.ts`, `probe-studio-captions.ts` | 신규 |

---

### Task 1: Prisma 컬럼 추가 + 마이그레이션

**Files:**
- Modify: `prisma/schema.prisma` (`model VideoProject`)
- Create: `prisma/migrations/<YYYYMMDDHHMMSS>_studio_photo_story/migration.sql` (최신 마이그레이션 `20261003230000_add_exam_report_student` 이후 시각)

**Interfaces:**
- Produces: `VideoProject.style`, `width`, `height`, `captions`, `captionHints` — 이후 모든 태스크가 사용

- [ ] **Step 1: 모델에 컬럼 5개 추가** (모두 nullable)

```prisma
  style        String? // whiteboard | photo-story — null=whiteboard(기존 프로젝트)
  width        Int? // 출력 가로 px — null이면 kind 기본(shorts916 1080, explain169 1920)
  height       Int? // 출력 세로 px
  captions     Json? // 게시용 설명멘트 { instagram, daangn, youtube, notice } — captions-gen.ts 형태
  captionHints Json? // 설명멘트 입력 { region?, link?, mustInclude? }
```

- [ ] **Step 2: 마이그레이션 SQL 작성**

```sql
ALTER TABLE "VideoProject" ADD COLUMN "style" TEXT,
ADD COLUMN "width" INTEGER,
ADD COLUMN "height" INTEGER,
ADD COLUMN "captions" JSONB,
ADD COLUMN "captionHints" JSONB;
```

- [ ] **Step 3: 검증** — `npx prisma validate`, `npx prisma generate`, `npx tsc --noEmit`(기존 코드가 깨지지 않는지). 마이그레이션 적용 방식(`prisma migrate deploy`를 누가 언제 실행하는지)은 기존 마이그레이션 관례를 따른다. 빌드 스크립트(`prisma generate && next build`)에는 적용 단계가 없으므로, 적용 담당과 시점을 사용자에게 확인한다.

---

### Task 2: 타입·규칙 (스타일 · 화면 크기 · 길이 · 장면 수)

**Files:**
- Modify: `src/lib/studio/types.ts`
- Create: `scripts/probe-studio-format.ts`

**Interfaces:**
- Produces: `VideoStyle`, `VideoFormat`, `ASPECT_PRESETS`, `resolveFormat`, `validateFormat`, `targetSecRange`, `photoStoryBounds`, `UploadedMedia.caption?`, `ProjectSnapshot`의 `style/width/height`, `VideoVoice`에 `"none"`, `compositionIdFor`
- Consumes: 기존 `deriveSceneBounds`, `TARGET_CHOICES`

- [ ] **Step 1: 타입 추가**

```ts
export type VideoStyle = "whiteboard" | "photo-story";
export const VIDEO_STYLES: VideoStyle[] = ["whiteboard", "photo-story"];

/** 목소리: none = 자막만(TTS 생성 안 함) */
export type VideoVoice = "ko_female" | "ko_male" | "none";

export interface UploadedMedia {
  // ...기존 필드
  /** 원장이 단 한 줄 설명(예: "5학년 에세이 쓰기 수업") — 대본 생성에 전달. 최대 80자 */
  caption?: string;
}

export interface VideoFormat { width: number; height: number }
```

- [ ] **Step 2: 화면 크기 규칙** — 프리셋과 검증을 한 곳에 둔다.

```ts
export const ASPECT_PRESETS: Record<string, VideoFormat> = {
  "9:16": { width: 1080, height: 1920 },
  "4:5": { width: 1080, height: 1350 },
  "1:1": { width: 1080, height: 1080 },
  "16:9": { width: 1920, height: 1080 },
};

/** h264는 짝수 해상도 필요. 긴 변 ≤ 1920, 짧은 변 ≥ 540, 비율 1:2 ~ 2:1 */
export function validateFormat(f: VideoFormat): string | null {
  const { width: w, height: h } = f;
  if (!Number.isInteger(w) || !Number.isInteger(h)) return "화면 크기는 정수여야 합니다.";
  if (w % 2 || h % 2) return "가로·세로는 짝수여야 합니다.";
  if (Math.max(w, h) > 1920 || Math.min(w, h) < 540) return "긴 변은 1920 이하, 짧은 변은 540 이상이어야 합니다.";
  const r = w / h;
  if (r < 0.5 || r > 2) return "가로:세로 비율은 1:2 ~ 2:1 사이여야 합니다.";
  return null;
}

/** 저장된 폭·높이가 없으면 kind 기본값 */
export function resolveFormat(p: { kind: VideoKind; width?: number | null; height?: number | null }): VideoFormat {
  if (p.width && p.height) return { width: p.width, height: p.height };
  return p.kind === "shorts916" ? ASPECT_PRESETS["9:16"] : ASPECT_PRESETS["16:9"];
}

/** 세로·정사각 = shorts916, 가로 = explain169 (기존 kind 기반 코드와의 호환 키) */
export function kindForFormat(f: VideoFormat): VideoKind {
  return f.height >= f.width ? "shorts916" : "explain169";
}

/** 렌더 컴포지션 id — 사진 스토리는 폭·높이를 props로 받는 flex, 그 외는 기존 kind */
export function compositionIdFor(p: { kind: VideoKind; style?: string | null }): string {
  return p.style === "photo-story" ? "flex" : p.kind;
}
```

- [ ] **Step 3: 길이 규칙** — 사진 스토리는 자유 입력.

```ts
/** 사진 스토리 목표 길이(초) 허용 범위 — 세로·정사각 15~90, 가로 15~180 */
export function targetSecRange(f: VideoFormat): { min: number; max: number } {
  return { min: 15, max: f.height >= f.width ? 90 : 180 };
}
```

- [ ] **Step 4: 사진 스토리 장면 수** — 사진이 적으면 한 사진을 여러 장면에 재사용한다(허용).

```ts
/** 장면 수: 글자 예산(장면당 140자 상한)에서 최소, 사진 수와 8장면 상한에서 최대 */
export function photoStoryBounds(targetSec: number, photoCount: number) {
  const { minScenes, targetChars } = deriveSceneBounds(targetSec);
  const maxScenes = Math.min(8, Math.max(minScenes, photoCount));
  return { minScenes, maxScenes, targetChars };
}
```

- [ ] **Step 5: `ProjectSnapshot`에 `style?: VideoStyle | null; width?: number | null; height?: number | null` 추가.** `kindGuide`는 사진 스토리일 때 형태 문구를 "사진 스토리"로 바꾸는 분기를 추가한다.

- [ ] **Step 6: 프로브 작성** `scripts/probe-studio-format.ts` — 아래를 `console.assert`/`process.exit(1)`로 검증한다.
  - `validateFormat`: 1080×1920 통과, 1080×1081(홀수) 실패, 2000×1080(긴 변) 실패, 540×1920(비율 초과) 실패, 1080×1350 통과
  - `kindForFormat`: 1080×1080 → `shorts916`, 1920×1080 → `explain169`
  - `targetSecRange`: 세로 max 90, 가로 max 180
  - `photoStoryBounds(30, 4)`: min ≥ 1, max ≥ min, max ≤ 8; `photoStoryBounds(90, 1)`에서 max ≥ min
  - `compositionIdFor`: `{style:"photo-story"}` → `"flex"`, `{style:null, kind:"shorts916"}` → `"shorts916"`

- [ ] **Step 7: 검증** — `npx tsx scripts/probe-studio-format.ts` 통과, `npx tsc --noEmit` 통과.

---

### Task 3: Remotion `flex` 컴포지션 (사진 스토리 렌더)

**Files:**
- Modify: `video-service/remotion/src/schema.ts`, `Video.tsx`, `Captions.tsx`, `Root.tsx`
- Create: `video-service/remotion/src/PhotoStoryVideo.tsx`

**Interfaces:**
- Produces: 컴포지션 id `flex` — `videoPropsSchema`의 선택 필드 `width`, `height`를 받아 `calculateMetadata`가 `{ width, height, durationInFrames }`를 돌려준다
- Consumes: 기존 `scenes[].kind: "photo" | "video"`, `captions`, `audioClips`, `branding`, `bgmSrc`
- 기존 컴포지션 `shorts916`·`explain169`는 **변경하지 않는다**(Task 3의 모든 변경은 추가 방향)

- [ ] **Step 1: 스키마에 선택 필드 추가**

```ts
  /** flex 컴포지션 전용 — 출력 크기(px). 없으면 사용 안 함 */
  width: z.number().int().optional(),
  height: z.number().int().optional(),
```

- [ ] **Step 2: `PhotoStoryVideo` 컴포넌트** — `WhiteboardVideo`와 같은 구조(인트로 → 장면들 → 아웃트로, 장면별 나레이션 오디오, BGM 덕킹)를 쓰되 장면 렌더만 다르다.
  - 사진 장면: **전면 채움**(액자·흰 테두리 없음). 사진 비율과 화면 비율 차이가 35%를 넘으면 흐리게 확대한 같은 사진을 뒤에 깔고 사진은 `contain`으로 올린다(잘림 방지). 그 외에는 `cover`. 켄번즈(확대 1.0→1.12, 이동 방향은 장면 번호 홀짝 교차)는 기존 `PhotoScene`의 값을 따른다.
  - 영상 장면: 기존 `ClipScene` 재사용(export해서 import).
  - 배경색은 `#000`.
  - 자막은 Step 3의 비율 인식 `Captions`를 쓴다.

- [ ] **Step 3: `Captions` 안전영역을 화면비로 계산** — 현재는 `height > width`면 하단 28%, 아니면 8%이다. 아래 함수로 바꾸되 기존 두 경우의 결과값은 그대로 유지한다.

```ts
/** 세로(≥1.5) 28% · 4:5 22% · 정사각 18% · 가로 8% */
function safeBottomPercent(w: number, h: number): number {
  const r = h / w;
  if (r >= 1.5) return 28;
  if (r >= 1.2) return 22;
  if (r >= 1.0) return 18;
  return 8;
}
```
  글자 크기는 `min(width, height) * 0.043`을 기본으로 하되 1080 기준 세로 쇼츠에서 기존 46px과 같은 값이 되게 맞춘다(`1080*0.043 ≈ 46`). 가로(1920×1080)는 기존 44px을 유지해야 하므로, 가로일 때는 기존 값을 그대로 쓰는 분기를 둔다.

- [ ] **Step 4: `Root.tsx`에 `flex` 컴포지션 추가** — `width`/`height` 기본값 1080×1920, `calculateMetadata`에서 파싱한 props의 `width`/`height`를 그대로 반환한다(Remotion `calculateMetadata`는 `width`·`height`를 반환할 수 있음 — 구현 시 4.0.512 문서로 확인).

- [ ] **Step 5: 로컬 검증** (`video-service/remotion`에서): 샘플 props(사진 3장 · 자막 · 오디오 없음)로 4개 크기(1080×1920, 1080×1350, 1080×1080, 1920×1080)의 정지컷을 `npx remotion still flex ... --props=...`로 뽑아 자막이 화면 안과 안전영역 안에 있는지 사람이 확인한다. 기존 `shorts916` 샘플 정지컷이 변경 전과 동일한지도 확인한다.

- [ ] **Step 6: 배포는 이 태스크에서 하지 않는다.** `deploy-lambda.sh` 재실행은 롤아웃 단계(Task 12)에서 한다.

---

### Task 4: 대본 생성 — 사진 설명 입력과 사진 스토리 검증

**Files:**
- Modify: `src/lib/studio/script-gen.ts`
- Create: `scripts/probe-studio-script.ts`

**Interfaces:**
- Produces: `generateScript({ ..., style, photos })`, `validateScript(parsed, kind, { ..., style, uploadsCount })`가 사진 스토리 규칙을 적용
- Consumes: `photoStoryBounds`, `UploadedMedia`

- [ ] **Step 1: 입력 확장** — `generateScript` params에 `style?: VideoStyle | null`, `photos?: Array<{ index: number; type: "image" | "video"; caption?: string; name: string }>` 추가.

- [ ] **Step 2: 사진 스토리용 시스템 프롬프트** `PHOTO_STORY_SYSTEM_PROMPT` 신설(화이트보드 프롬프트와 분리). 핵심 규칙:
  - 자연스러운 한국어 존댓말 낭독용 문장, 장면당 2~5문장·140자 이내, 학원명은 전체에서 1회
  - **모든 장면에 `mediaIndex`를 반드시 지정**(사진 번호). 사진 설명을 근거로 가장 어울리는 사진을 배정하고, 사진이 장면 수보다 적으면 같은 사진을 다시 써도 된다
  - 사진 설명에 없는 사실·수치·성과를 지어내지 않는다. 사진 속 인물의 이름을 쓰지 않는다
  - 과장 광고·최상급·합격 보장 표현 금지
  - 출력은 JSON만: `{"title":"...","scenes":[{"narration":"...","mediaIndex":0}]}` (`illustPrompt` 없음)
  - 사용자 입력 블록에 `사진 목록: 0: <설명> (사진) ...` 형태로 번호와 설명을 넣는다. 설명이 없으면 `0: (설명 없음, 파일명 <name>)`로 적는다.

- [ ] **Step 3: `validateScript` 분기** — `style === "photo-story"`일 때:
  - 장면 수 범위를 `photoStoryBounds(targetSec, uploadsCount)`로 검사
  - 모든 장면의 `mediaIndex`가 정수이고 `0 ≤ mediaIndex < uploadsCount`여야 한다(null 금지)
  - `illustPrompt`는 없어도 되고 없으면 `""`로 채운다
  - `whiteboard`의 기존 검증은 한 줄도 바꾸지 않는다

- [ ] **Step 4: 프로브** `scripts/probe-studio-script.ts` — 고정 응답 문자열로 `parseScriptResponse`/`validateScript`를 검증한다.
  - 정상 사진 스토리 응답(사진 3장, 장면 3개) 통과
  - `mediaIndex` 누락 → 실패, 범위 밖(예: 3, 사진 3장) → 실패
  - 같은 사진 재사용 → 통과
  - `illustPrompt` 없는 장면 → 통과하고 `""`로 채워짐
  - 기존 화이트보드 응답이 변경 전과 같은 결과인지(회귀)

- [ ] **Step 5: 검증** — 프로브와 `npx tsc --noEmit` 통과.

---

### Task 5: 목소리 `none`(자막만) + 자산 생성 보정

**Files:**
- Modify: `src/lib/studio/tts.ts`, `generate-assets.ts`, `render/props.ts`, `render/lambda.ts`, `render/local.ts`
- Modify: `video-service/remotion/src/Video.tsx`·`PhotoStoryVideo.tsx` (BGM 볼륨 분기 — 아래 Step 3)

**Interfaces:**
- Produces: `silentSceneClips(narration)`, `ttsClips[].url === ""` 의미 = 무음 자막 전용 클립
- Consumes: `splitSentences`, `sceneDurationMs`

- [ ] **Step 1: 무음 클립 생성기** (`tts.ts`)

```ts
/** 자막만 모드 — 낭독 실측 대신 글자 수로 길이를 정한다(유효 5.3자/초, 문장당 최소 1.2초) */
export function silentSceneClips(narration: string): TtsClip[] {
  const sentences = splitSentences(narration);
  if (sentences.length === 0) throw new Error("나레이션에 문장이 없습니다");
  return sentences.map((text) => ({
    text,
    url: "",
    durationMs: Math.max(1200, Math.round((text.length / 5.3) * 1000)),
  }));
}
```

- [ ] **Step 2: `generate-assets.ts`** — `project.voice === "none"`이면 `generateSceneTts` 대신 `silentSceneClips`를 쓴다(비용 기록 없음). 삽화 건너뛰기는 이미 `mediaIndex != null`로 처리되어 있으므로 사진 스토리는 추가 수정이 없다.

- [ ] **Step 3: 렌더 경로에서 빈 URL 건너뛰기**
  - `render/lambda.ts startCompose`: 클립 `url`이 빈 문자열이면 S3 복사·presign을 하지 않고 `""`를 `audioSrcs`에 넣는다.
  - `render/props.ts buildRemotionProps`: `audioClips`를 만들 때 `src`가 빈 문자열인 항목을 제외한다.
  - `render/local.ts`도 같은 방식으로 건너뛴다.
  - Remotion 쪽은 `audioClips`가 빈 배열이면 오디오 Sequence가 하나도 생기지 않으므로 별도 수정이 필요 없다(확인만).
  - `voice === "none"`이면 BGM 덕킹 기준 구간이 자막 구간이 되지만 나레이션이 없으므로, BGM 볼륨을 일정하게(0.25) 쓰도록 `bgmVolume` 분기를 추가한다(`windows`가 있어도 `scenes.every(s => s.audioClips.length === 0)`이면 상수 반환).

- [ ] **Step 4: 검증** — `npx tsc --noEmit`. 프로브에 추가: `silentSceneClips("첫 문장입니다. 두 번째 문장입니다.")`가 클립 2개, 각 `durationMs ≥ 1200`, `url === ""`.

---

### Task 6: 설명멘트 생성기

**Files:**
- Create: `src/lib/studio/captions-gen.ts`, `src/lib/studio/captions-risk.ts`, `scripts/probe-studio-captions.ts`
- Modify: `src/lib/studio/cost.ts` (`CostEntry.step`에 `"CAPTIONS"` 추가)

**Interfaces:**
- Produces: `generateCaptions(params): Promise<ChannelCaptions>`, `findRiskyPhrases(text): string[]`, `ChannelCaptions`
- Consumes: 확정된 `VideoScript`, 학원명, 연락처, `captionHints`

- [ ] **Step 1: 결과 타입**

```ts
export interface ChannelCaptions {
  instagram: { body: string; hashtags: string[] };
  daangn: { body: string };
  youtube: { title: string; description: string; hashtags: string[] };
  notice: { body: string };
  /** 생성 후 금지어 검사 경고 — 화면에 안내만 한다 */
  warnings: string[];
}
```

- [ ] **Step 2: 금지어 검사** (`captions-risk.ts`) — 단순 부분일치 목록. 초안 목록: 최고, 최상, 1등, 일등, 유일, 국내 최초, 100%, 무조건, 반드시 합격, 합격 보장, 성적 보장, 완벽, 기적. 더해서 **"AI"·"인공지능"이 나오면 별도 위반으로 반환**한다(사용자 노출 금지 규칙). 반환은 발견된 구절 배열.

- [ ] **Step 3: 프롬프트** — 시스템 프롬프트 요점:
  - 입력은 확정 대본·학원명·연락처·지역/링크/꼭 넣을 말뿐이다. **입력에 없는 수치·성과·혜택을 지어내지 않는다**
  - 채널별 형식(초안, 당근·유튜브 서식은 Task 12에서 실제 입력창을 보고 확정):
    - 인스타: 첫 줄 훅 → 3~5줄 본문 → 행동 유도 → 해시태그 5~10개
    - 당근: 동네 이웃에게 말하듯 친근한 존댓말, 학원 소개·위치·문의 방법, 해시태그 없음
    - 유튜브: 제목 40자 이내 + 설명 + 해시태그 3~5개
    - 공지: 정중한 안내문 한 편(블로그·카톡 공용)
  - 최상급·합격 보장 등 과장 표현과 "AI" 단어를 쓰지 않는다
  - 출력은 위 `ChannelCaptions`에서 `warnings`를 뺀 JSON만

- [ ] **Step 4: 호출·검증·재시도** — 모델 `claude-sonnet-4-6`(`script-gen.ts`의 `MODEL` 상수를 export해서 재사용), `max_tokens: 2000`. JSON 파싱 + 필드 검증 후, 모든 문자열에 `findRiskyPhrases`를 적용해 `warnings`를 채운다. "AI" 위반이 있으면 1회 재생성하고, 그래도 남으면 해당 구절을 제거하지 말고 `warnings`에 넣어 원장이 보도록 한다. 파싱 실패 시 1회 재시도(기존 `generateScript` 패턴). 비용은 `logCost(projectId, { step: "CAPTIONS", ... })`로 기록한다.

- [ ] **Step 5: 프로브** `scripts/probe-studio-captions.ts`
  - `findRiskyPhrases("우리 학원이 최고입니다")` → `["최고"]`, `"합격 보장"`, `"AI 학습"` 감지, 정상 문장은 빈 배열
  - 고정 JSON 응답 문자열 파서(`parseCaptionsResponse`)의 정상·필드 누락·해시태그 형식(앞에 `#` 정규화) 케이스

- [ ] **Step 6: 검증** — 프로브와 `npx tsc --noEmit` 통과.

---

### Task 7: API 확장

**Files:**
- Modify: `src/app/api/studio/projects/route.ts`, `src/app/api/studio/projects/[id]/script/route.ts`, `src/app/api/studio/projects/[id]/render/route.ts`
- Create: `src/app/api/studio/projects/[id]/captions/route.ts`

**Interfaces:**
- Consumes: Task 2·4·6의 함수들
- Produces: `POST /api/studio/projects` 본문에 `style`, `width`, `height`, `captionHints` 추가, `uploads[].caption` 허용; `POST|PATCH /api/studio/projects/[id]/captions`

- [ ] **Step 1: 프로젝트 생성 (`route.ts` POST)**
  - `style`이 `photo-story`면 환경변수 `STUDIO_PHOTO_STORY_ENABLED === "1"`이어야 하고, 아니면 400("지원하지 않는 영상 종류입니다.").
  - `photo-story`: 업로드 ≥ 1개 필수, `width`/`height`는 `validateFormat` 통과(프리셋 값도 같은 검증), `kind = kindForFormat(...)`, `targetSec`는 `targetSecRange` 범위의 정수. 사진 스토리가 아니면 기존 검증(`TARGET_CHOICES`)을 그대로 쓴다.
  - 목소리: `VOICES`에 `"none"` 추가(두 스타일 모두 허용).
  - `parseUploads`: `caption`이 문자열이면 80자로 자르고 보존한다. 다른 검증은 건드리지 않는다.
  - `captionHints`: `region`(40자), `link`(200자, `https://` 시작이면 보존, 아니면 거부), `mustInclude`(100자) 문자열만 허용.
  - `generateScript`에 `style`, `photos`(업로드의 `index`, `type`, `caption`, `name`)를 전달하고 `projectId`도 넘겨 비용을 기록한다.
  - 응답은 기존과 같은 `{ project }`.

- [ ] **Step 2: 대본 수정 (`script/route.ts` PATCH)** — `validateScript`에 `style`을 전달한다.

- [ ] **Step 3: 대본 확정 (`script/route.ts` POST)** — `generateAllAssets(id)`와 설명멘트 생성을 **병렬**로 돌린다. 설명멘트는 실패해도 영상 제작을 막지 않는다.

```ts
await Promise.allSettled([
  generateAllAssets(id),
  generateAndSaveCaptions(id), // captions-gen.ts — 내부에서 에러를 삼키고 로그만 남김
]);
```
  `generateAndSaveCaptions`는 프로젝트의 확정 대본·브랜딩(`getVideoBranding`)·`captionHints`를 읽어 `captions` 컬럼에 저장한다. 설명멘트에는 25초 타임아웃을 걸어 `maxDuration 300`을 넘기지 않게 한다.

- [ ] **Step 4: 설명멘트 전용 라우트 `captions/route.ts`** — 소유자 확인(`findFirst({ id, userId })`) 후:
  - `POST`: 재생성(대본이 확정된 상태 `ASSETS_READY`·`RENDERING`·`DONE`에서만, 프로젝트당 재생성 5회 제한 — 횟수는 `captions` JSON 내부 `regenCount`로 기록)
  - `PATCH`: 원장이 고친 본문을 저장(길이 상한: 본문 2000자, 제목 100자, 해시태그 15개). 저장 시 `findRiskyPhrases`를 다시 돌려 `warnings`를 갱신한다.

- [ ] **Step 5: 렌더 라우트 (`render/route.ts`)** — `ProjectSnapshot`에 `style`, `width`, `height`를 채운다(`resolveFormat` 사용). 나머지 흐름은 그대로.

- [ ] **Step 6: 렌더 실행기** — `render/lambda.ts startCompose`에서 `composition: compositionIdFor(snapshot)`로 바꾸고, `snapshot.style === "photo-story"`일 때 `inputProps`에 `width`, `height`를 포함한다. `render/local.ts`도 같은 컴포지션 id와 props를 쓴다.

- [ ] **Step 7: 검증** — `npx tsc --noEmit`, `npm run lint`. 라우트는 라이브 호출 없이 타입·분기 확인만 한다(실호출은 사용자 E2E).

---

### Task 8: 위저드 UI — 입력 단계(`PromptStep`)

**Files:**
- Modify: `src/app/(main)/services/studio/app/_components/PromptStep.tsx`, `shared.ts`, `page.tsx`

**Interfaces:**
- Produces: `PromptSubmit`에 `style`, `width`, `height`, `captionHints`, `uploads[].caption`
- Consumes: Task 2의 상수·검증 함수

규칙: **"AI" 단어, 이모지, 아이콘 금지.** 기존 컴포넌트 스타일(Tailwind 클래스, `Button`)을 따른다. 모바일 우선.

- [ ] **Step 1: 영상 스타일 선택** — `NEXT_PUBLIC_STUDIO_PHOTO_STORY_ENABLED === "1"`일 때만 노출(꺼져 있으면 지금과 동일). 선택지 두 개: "손그림 영상"(기존), "사진 스토리 — 올린 사진으로 영상 만들기".
- [ ] **Step 2: 사진 스토리 선택 시 화면 구성**
  - 화면 크기: 프리셋 4개(9:16, 4:5, 1:1, 16:9) + "직접 입력"(가로·세로 숫자 입력, 하단에 `validateFormat` 오류 문구). 선택한 비율의 미리보기 박스를 보여준다.
  - 길이: 숫자 입력 + 15/30/45/60 빠른 칩, 범위는 `targetSecRange`. 범위를 벗어나면 입력창 아래에 문구.
  - 업로드: 기존 업로더를 쓰되 **사진마다 한 줄 설명 입력칸**을 둔다(placeholder 예: "어떤 사진인가요? 예) 5학년 에세이 쓰기 수업", 80자). 업로드가 1장 이상이어야 제출 가능.
  - 방향 입력: 기존 `prompt` 입력칸을 "어떤 영상을 만들고 싶으세요?"로 문구만 바꿔 재사용한다.
  - 설명멘트 정보(선택, 접힘): 지역, 신청·문의 링크, 꼭 넣을 말.
  - 목소리: 기존 `여성`·`남성`에 "자막만" 추가. BGM은 기존 그대로.
- [ ] **Step 3: 손그림 영상 선택 시** — 기존 화면과 동작이 바뀌지 않아야 한다. 목소리에 "자막만"을 추가하는 것만 두 스타일 공통으로 허용한다.
- [ ] **Step 4: 제출 데이터** — `onSubmit({ ..., style, width, height, captionHints, uploads })`. 사진 스토리가 아니면 `style`을 보내지 않는다.
- [ ] **Step 5: `shared.ts`의 `VideoProjectDto`** — `style?`, `width?`, `height?`, `captions?`, `captionHints?` 추가. `page.tsx`의 소개 문구에 "사진 스토리"를 반영하되 "AI" 단어를 쓰지 않는다.
- [ ] **Step 6: 검증** — `npx tsc --noEmit`, `npm run lint`. 환경변수를 끈 상태의 화면이 변경 전과 동일한지 사람이 확인한다.

---

### Task 9: 위저드 UI — 대본·자산 확인 단계

**Files:**
- Modify: `ScriptStep.tsx`, `AssetsStep.tsx`, `page.tsx`

- [ ] **Step 1: `ScriptStep`** — `style === "photo-story"`이면: 장면마다 **배정된 사진 썸네일 + 사진 선택 드롭다운**(필수, "손그림" 선택지 없음)을 보여주고, 삽화 프롬프트(고급) 영역은 숨긴다. `onConfirm`으로 올라가는 `script`의 `illustPrompt`는 `""`.
- [ ] **Step 2: `AssetsStep`** — 사진 스토리는 삽화 카드가 없으므로 안내 문구를 "나레이션을 확인해 주세요"로 바꾸고, 그림 다시 만들기 버튼을 숨긴다. 기존 미디어 장면 표시 로직(사진 썸네일·나레이션 재생)을 그대로 쓴다. 목소리가 `none`이면 나레이션 재생 대신 자막 문장만 보여준다.
- [ ] **Step 3: 진행 문구** — `page.tsx`의 `ASSETS_GENERATING` 문구를 스타일별로 분기(사진 스토리: "나레이션을 만들고 있습니다…", 목소리 없음: "자막을 정리하고 있습니다…").
- [ ] **Step 4: 검증** — `npx tsc --noEmit`, `npm run lint`.

---

### Task 10: 위저드 UI — 완성 화면과 설명멘트 패널

**Files:**
- Modify: `RenderStep.tsx`
- Create: `CaptionsPanel.tsx`

**Interfaces:**
- Consumes: `project.captions`, `/api/studio/projects/[id]/captions`

- [ ] **Step 1: `RenderStep` 완성 화면** — 비디오 요소 크기를 `width/height` 비율로 계산(`aspect-ratio` 스타일, 세로형은 `max-h-[70vh]`)한다. 기존 "영상 내려받기"는 유지하고, 휴대폰에서 `navigator.canShare?.({ files })`가 참이면 **"공유하기"** 버튼을 추가한다(영상 URL을 `fetch` → `Blob` → `File`로 변환해 `navigator.share({ files, title })`). 지원하지 않는 환경에서는 버튼을 숨긴다. 이모지·아이콘 없이 텍스트 버튼만.
- [ ] **Step 2: `CaptionsPanel`** — 완성 화면 영상 아래에 배치.
  - 탭 4개: 인스타그램, 당근, 유튜브 쇼츠, 공지(블로그·카톡)
  - 탭마다 수정 가능한 `textarea`(인스타는 본문과 해시태그 칸 분리, 유튜브는 제목·설명·해시태그), **복사 버튼**(`navigator.clipboard.writeText`, 실패 시 선택 후 안내 문구), 글자 수 표시
  - 금지어 경고(`warnings`)가 있으면 패널 상단에 "고쳐 쓰시길 권합니다: 최고, 합격 보장" 형태로 표시
  - "다시 만들기" 버튼(`POST /captions`, 횟수 제한 안내)과 저장(`PATCH /captions`, 명시적 저장 버튼. 위저드의 다른 단계도 명시적 확정 방식이므로 같은 관례를 따름)
  - `captions`가 아직 `null`이면(생성 실패·진행 중) "설명 문구를 만드는 중입니다" 또는 "만들지 못했습니다. 다시 만들기를 눌러 주세요"를 보여준다
  - 안내 문구 한 줄: "올리기 전에 내용과 표현을 꼭 확인해 주세요." (책임은 원장 확인에 둔다)
- [ ] **Step 3: 검증** — `npx tsc --noEmit`, `npm run lint`. 복사·공유 동작은 사용자가 실기기에서 확인한다.

---

### Task 11: 회귀 확인

- [ ] **Step 1:** `style` 미설정 프로젝트(기존 데이터)로 위저드 전 과정(로컬에서 프롬프트 → 대본 → 자산 → 렌더)이 변경 전과 같은 화면·같은 흐름인지 확인한다. 특히 `AssetsStep`·`RenderStep`의 기존 표시와 `compositionIdFor`가 `kind`를 그대로 돌려주는지 본다.
- [ ] **Step 2:** 환경변수 `STUDIO_PHOTO_STORY_ENABLED` 미설정 상태에서 `style=photo-story`로 생성 요청 시 400이 나고 UI에 선택지가 보이지 않는지 확인한다.
- [ ] **Step 3:** `npx tsc --noEmit`, `npm run lint`, 프로브 3종 통과.
- [ ] **Step 4: `/simplify`로 변경 파일 코드 리뷰** (필수) 후 지적 사항을 반영한다.

---

### Task 12: 배포와 스모크 (사용자 협의 필요)

- [ ] **Step 1 (사전 확인):** 에듀냅 저장소 쓰기 권한과 작업 브랜치 이름, Prisma 마이그레이션 적용 담당, 미리보기 배포 환경을 사용자와 정한다.
- [ ] **Step 2:** `video-service/remotion/deploy-lambda.sh`로 Remotion 사이트를 재배포하고 `REMOTION_SERVE_URL` 변경 여부를 확인한다(사이트 이름 `video-secretary` 유지 시 URL이 같은지 확인).
- [ ] **Step 3:** 마이그레이션 적용 → 앱 미리보기 배포 → 미리보기에서만 `STUDIO_PHOTO_STORY_ENABLED=1`.
- [ ] **Step 4: 스모크(사용자 실기기):** 사진 5장(설명 입력) + 방향 한 줄로 30초 9:16 → 4:5 → 1:1 → 16:9 순서로 한 편씩 만들어 본다. 확인 항목: 자막이 안전영역 안에 있는지, 사진이 잘리지 않는지, 길이가 목표와 ±3초 이내인지, 설명멘트 4채널이 나오는지, 복사·공유 버튼이 동작하는지, 목소리 "자막만" 모드가 되는지.
- [ ] **Step 5:** 당근·유튜브 설명 서식을 실제 입력창과 대조해 `captions-gen.ts` 프롬프트의 채널 형식을 확정한다.
- [ ] **Step 6:** 원가 기록(`costLog`)에서 사진 스토리 편당 원가를 확인하고, 월 한도 정책(결정 대기)을 사용자와 정한다.
- [ ] **Step 7:** 운영 환경에 `STUDIO_PHOTO_STORY_ENABLED=1`, `NEXT_PUBLIC_STUDIO_PHOTO_STORY_ENABLED=1`을 켠다. 문제가 생기면 두 값을 지우면 즉시 이전 동작으로 돌아간다(데이터는 그대로 남음).

## 이 단계에서 일부러 하지 않는 것
- 글자 위주·퀴즈·후기·만화·원장님 한마디 스타일 (2~3단계)
- 사진을 대본 생성기에 직접 보여주기(설명 기반만 지원)
- 월 한도 변경, 인스타·유튜브·네이버·카카오 직접 게시
- 원장님 직접 녹음 목소리

## 결정 대기 항목 (구현 중 막히면 사용자에게 확인)
1. Remotion Lambda 사용이 라이선스 조건에 맞는지(약관 확인은 사용자 쪽)
2. 삽화·음성 없는 모드의 월 한도
3. 사진 자체를 대본 생성에 보여줄지
4. 당근·유튜브 설명 서식(Task 12에서 확정)
5. 학원 지역·링크 정보를 브랜딩 설정에 영구 저장할지(이번 단계는 프로젝트별 입력만)
