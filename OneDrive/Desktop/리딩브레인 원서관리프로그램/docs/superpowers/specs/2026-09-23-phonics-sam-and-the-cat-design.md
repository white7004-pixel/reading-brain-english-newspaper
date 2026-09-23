# 파닉스 단계 + Sam and the Cat 설계

**날짜:** 2026-09-23
**승인:** 원장 승인 — 파닉스 칸을 새로 만든다

## 무엇을 만드나

1. **파닉스 단계** — 학습 화면에 새 칸 하나. 말묶음(word family)으로 읽는 법을 익힌다
2. **Sam and the Cat** — 14번째 학습 책
3. **없는 단계는 숨긴다** — 지금은 탭 9개가 책과 상관없이 늘 다 뜬다

## 왜

원장님이 주신 책은 **Story Phonics Level 1-1**(Langsoc)이다. 70낱말짜리 파닉스 리더이고, 목표음이 **-ad / -am / -an / -at**(단모음 a)다.

지금 프로그램에는 파닉스 칸이 없다. 이 책을 단어·독해·퀴즈로만 다루면 **이 책이 가르치려는 것을 빼놓고** 가르치는 꼴이 된다. 앞으로 나올 Level 1-2, 1-3도 같은 칸을 쓴다.

또 이 책에는 북디베이트도 IB워크시트도 없다. 그런데 지금 코드는 탭 9개를 무조건 그린다 — 유치원 아이가 빈 탭을 누르게 된다.

## 책

| | |
|---|---|
| 제목 | Sam and the Cat |
| 시리즈 | Story Phonics Level 1-1 · Storybook & Workbook |
| 글·그림 | E. J. Lewis · Kate Daubney |
| 출판사 | Langsoc, Inc. (2026) |
| 수준 | 유치~초1 · 파닉스 1단계(단모음 a) — **AR 은 출판사가 매기지 않았다. 지어내지 않는다** |
| 분량 | 70낱말 · 내지 24쪽 |
| 목표음 | -ad, -am, -an, -at |
| 등장인물 | Sam / Pam(누나) / Ted(친구) / Sid(아기 동생) / 고양이 |

**영상** (Jay Shim 채널 — 출판사 쪽 공식)
- 이북: `https://youtu.be/EOW9Re0hvb4` ("SP L1-1 이북")
- 챈트: `https://youtu.be/ZrTK9i9J01E` ("SP L1-1 챈트")

### 저작권

판권에 "출판사의 사전 서면 허락 없이 어떤 부분도 복제할 수 없다"고 적혀 있다. 원장이 공동구매로 산 책이고 학원 아이들만 쓰는 내부 도구라는 판단으로 **내지 24쪽을 E북으로 넣는다.** 원장에게 이 사실을 알렸고 그대로 진행하라는 뜻을 받았다.

밖으로 내보내지 않는다: 이 E북 그림은 서재(`library.html`)에 올리지 않고 학습 화면에서만 쓴다.

## 파닉스 단계

**탭 이름:** 파닉스 · **자리:** 맨 앞 (단어학습보다 먼저 — 소리를 먼저 익히고 낱말로 간다)

세 가지를 한 화면에 위에서 아래로 놓는다.

### ① 말묶음 보기

같은 소리로 끝나는 낱말을 묶어 보여 준다. 낱말을 누르면 소리가 난다(브라우저가 읽는다).

```
-ad   mad  sad
-am   ham  jam
-an   van
-at   bat  cat  fat  hat  mat
```

### ② 첫소리 바꾸기

파닉스의 핵심 기술이다. 끝소리를 고정해 두고 첫소리만 갈아 끼우며 읽는다.

```
_at  →  b at    c at    f at    h at    m at
```

아이가 첫소리 글자를 누르면 낱말이 완성되고 소리가 난다. 맞히는 문제가 아니라 **해 보는 곳**이라 점수를 매기지 않는다.

### ③ 듣고 고르기

소리를 들려주고 세 낱말 중 고른다. 10문제(목표 낱말 10개). 맞힌 개수를 저장한다.

보기 세 개는 **같은 말묶음에서 먼저 고른다.** `cat` 문제의 보기가 `cat / hat / mat` 이어야 첫소리를 듣는 연습이 된다. `cat / jam / van` 이면 끝소리만 듣고도 맞힌다. 말묶음에 낱말이 모자라면 다른 묶음에서 채운다.

**저장:** 이 책의 다른 단계와 같은 방식(`get`/`set`). 키는 `phonics`.

```js
{ score: 8, total: 10, at: "2026-09-23" }
```

## 없는 단계는 숨긴다

`TABS` 의 각 칸에 **그 책에 자료가 있는지 보는 함수**를 붙인다.

```js
const TABS = [
  { id: "phonics", name: "파닉스",     when: B => !!B.phonics,      draw: () => drawPhonics() },
  { id: "learn",   name: "단어학습",   when: B => !!(B.vocabulary && B.vocabulary.length), draw: () => drawLearn() },
  ...
];
```

`drawTabs` 가 `when` 이 참인 칸만 그린다. `when` 이 없는 칸은 늘 그린다(지금 그대로).

첫 탭은 목록의 첫 번째 **살아 있는** 칸으로 잡는다. 지금은 `let TAB = "learn"` 이 고정이라, 단어가 없는 책이 오면 빈 화면이 뜬다.

**기존 13권은 그대로여야 한다.** 13권 모두 `phonics` 가 없으니 파닉스 탭은 안 뜨고, 나머지 칸은 자료가 있으니 다 뜬다.

## E북 만들기

`scripts/make-ebook.py` (새 파일)

- 내지 PDF 24쪽 → `assets/ebook/sam-and-the-cat/p01.jpg` ~ `p24.jpg`
- 표지 PDF 1쪽의 **오른쪽 절반**(앞표지) → `p00.jpg` 와 `assets/covers/sam-and-the-cat.jpg`
- **인쇄용 잘라내기 표시와 색 막대를 잘라낸다.** PDF 의 TrimBox 를 쓰고, 없으면 상하좌우 여백을 정해 자른다
- 가로 1000px 안팎 JPG 품질 82 — 24쪽에 2~3MB 를 넘기지 않는다

기존 `lets-celebrate-birthdays` 와 같은 모양이라 `app.html` 의 E북 코드를 고치지 않는다.

```js
ebook: { dir: "assets/ebook/sam-and-the-cat/", pages: 24 }
```

## 책 파일의 새 칸

```js
phonics: {
  target: "단모음 a — -ad, -am, -an, -at",
  families: [
    { rime: "-ad", words: ["mad", "sad"] },
    { rime: "-am", words: ["ham", "jam"] },
    { rime: "-an", words: ["van"] },
    { rime: "-at", words: ["bat", "cat", "fat", "hat", "mat"] }
  ]
},
```

세 활동 모두 이 `families` 하나에서 나온다. 활동마다 자료를 따로 적지 않는다.

사이트워드(`a and is on the`)는 파닉스로 읽히지 않아 통째로 외우는 낱말이라 **단어학습 칸**에 둔다.

## 낱말 소리

mp3 를 만들지 않는다. 브라우저가 읽는다(`speechSynthesis`). 낱말 15개를 위해 파일을 만들 일이 아니고, 파닉스는 같은 낱말을 여러 자리에서 반복해 들려주므로 파일로 관리하면 되레 번거롭다.

`speechSynthesis` 는 **최상위에서 부르지 않는다.** 없는 기기에서는 낱말을 눌러도 소리만 안 날 뿐 화면은 멀쩡해야 한다.

## 재사용하는 것

- `app.css` 의 `.box`·`.btn`·`.row`·`.count`
- `app.html` 의 `get`/`set` 저장, `badge` 표시, E북 그리기
- `books/*.js` 의 모양과 `books/index.js` 한 줄 추가

`store.js`·`report.js`·`app.css`·`vercel.json` 은 손대지 않는다.

## 검증

- `node scripts/check-book.mjs sam-and-the-cat` (새 파일) — `books/*.js` 는 `window` 를 써서 node 로 바로 돌지 않는다. 이 검사기가 `window` 를 흉내 내어 읽고, `families` 의 낱말이 10개인지·`vocabulary` 와 어긋나지 않는지·`ebook.pages` 가 실제 그림 수와 맞는지 본다. `npm test` 에 잇는다
- `app.html?book=sam-and-the-cat#selftest` — 보기 고르기가 같은 말묶음에서 먼저 뽑는가, 탭 고르기가 맞는가
- **기존 13권이 그대로인가** — 아무 책이나 열어 탭 9개가 다 뜨는지 눈으로 본다
- `npm test`
- 옛 브라우저 문법 검사: `?.` `??` `(?<` 없음

## 하지 않는 것

- 낱말 mp3 (브라우저가 읽는다)
- 보드게임·숨은그림을 화면으로 옮기기 (종이책에서 하는 활동이다. 교사용 안내에만 적는다)
- 이 책을 서재 목록에 넣기 (학원 장서 목록에 없는 책이고, 원장이 "서재가 아니라 학습"이라고 했다)
- 파닉스 진단·평가 (앞서 보내 주신 Science of Reading 음가 평가는 따로 의논한다)
