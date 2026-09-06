# 리딩브레인영어학원 랜딩페이지

이 폴더는 **리딩브레인영어학원(광명 일직동) 공식 랜딩페이지**다.
`https://www.readingbrain.co.kr` 로 Vercel 배포된다.

주소를 헷갈리기 쉬우니 적어 둔다.
- 도메인은 `readingbrain.co.kr` 이다. `readingbrain.kr` 이 아니다.
- Vercel 프로젝트 이름은 `output` 이다. 이름만 보면 다른 프로젝트 같지만
  운영 도메인이 걸려 있는 것은 이쪽이다.

## ⚠ 폴더 혼동 주의 — 가장 먼저 읽을 것

**`C:\Users\white` 홈 폴더 전체가 하나의 git 저장소다.** 이 폴더 전용 저장소가 아니다.

그래서 `git log` 를 그냥 실행하면 홈 아래 **모든 프로젝트의 커밋이 섞여** 나온다.
세션 시작 시 자동으로 실리는 "Recent commits" 도 마찬가지라, 옆 폴더
(`AI시대\케이스페이스 랜딩페이지` 등)에서 방금 작업한 커밋이 이 프로젝트의
최근 작업인 것처럼 보인다. 실제로 이것 때문에 "계속해줘" 를 케이스페이스
작업 이어가기로 잘못 읽은 적이 있다.

지킬 것:

1. 커밋 기록을 볼 때는 **반드시 현재 폴더로 한정**한다.
   - `git log --oneline -- .`  (O)
   - `git log --oneline`        (X — 홈 전체가 섞임)
2. "계속해줘" 처럼 대상이 생략된 지시는 **커밋 기록이 아니라 작업 폴더**를 기준으로 삼는다.
   작업 폴더가 여기라면 대상은 리딩브레인 랜딩페이지다.
3. 이름이 비슷한 이웃 폴더가 있다 — `AI시대\랜딩페이지`(여기)와
   `AI시대\케이스페이스 랜딩페이지`(별개 사업장, 안산 공유오피스). 헷갈리지 말 것.

## 파일 구조

- `index.html` — 페이지 전체(약 4,300줄). **CSS 가 113~2405행 인라인 `<style>` 에 들어 있다.**
- `redesign.css` — useschool.co.kr 디자인 언어 레이어. 인라인 `<style>` 뒤에 로드되어 톤을 덮어쓴다.
- `redesign.js` — 스크롤 리빌 / 가로 후기 캐러셀 / 맨 위로 버튼
- `new_styles.css` — **어디에도 링크되어 있지 않다.** 실제 스타일은 `index.html` 인라인이다.
- `curriculum-detail.html`, `images/`, `videos/`, `docs/superpowers/`(스펙·플랜), `tmp/`(작업용 스크래치)

## 색상 팔레트 (임의로 바꾸지 말 것)

`index.html` 의 `:root` 에 정의되어 있다.

- `--brand-navy: #0C354D`
- `--brand-burgundy: #8B1E24`
- `--brand-gold: #8B3038` — 이름은 gold 지만 **실제 값은 와인색**이다
- `--gold-on-dark: #E3B873` — 어두운 배경 위에서 쓰는 진짜 골드
- `--brand-ivory: #F6F2E9`, `--brand-ink: #18242D`

밝은 배경의 강조는 와인(`--brand-gold`), 네이비·사진 위 강조는 골드(`--gold-on-dark`)를 쓴다.
와인색은 어두운 배경에서 대비가 부족하다.

## 확인 방법

로컬 미리보기와 헤드리스 스크린샷 도구가 `tmp/` 에 있다.

```bash
python -m http.server 8765          # 로컬 서버
node tmp/shoot.js "http://localhost:8765/index.html" ".hero" "#philosophy"
VW=390 SUFFIX=-m node tmp/shoot.js "http://localhost:8765/index.html" ".us-zig"
node tmp/functest.js                # 캐러셀·맨위로·리빌 동작 검증
```

`shoot.js` 주의: 페이지에 `scroll-behavior: smooth` 가 걸려 있어 스크롤 시
`behavior: 'instant'` 를 써야 리빌이 제때 발동한다. 안 그러면 섹션이 빈 화면으로 찍힌다.

`python -m http.server` 는 동영상 요청이 중간에 끊기면 `ConnectionResetError` 로
프로세스째 죽는다. 대신 `python tmp/serve.py 8765` 를 쓴다.

## ⚠ 배포 — 폴더째 올리지 말 것

`images/` 에 파일이 295개인데 페이지가 실제로 쓰는 것은 58개다. 나머지는
학생 얼굴이 담긴 원본 사진이라, 링크가 걸려 있지 않아도 **주소만 알면
누구나 받을 수 있는 상태**가 된다.

그래서 `vercel --prod` 를 이 폴더에서 바로 실행하지 않는다. 참조되는 파일만
골라 담은 배포본을 만든 뒤 그 폴더에서 배포한다. 991MB 가 75MB 로 줄고,
쓰지 않는 사진은 애초에 올라가지 않는다.

배포본을 만드는 방법은 `index.html` 과 `curriculum-detail.html` 에서 시작해
링크된 css/js 를 따라가고, 그 안의 `url()` 과 `images/` `videos/` 참조를
전부 모아 그 파일들만 복사하는 것이다. `.vercel/project.json` 을 배포본
폴더에 같이 넣어야 같은 프로젝트로 올라간다.

`.vercelignore` 도 있지만 그것만 믿으면 안 된다. 새로 생긴 초안 파일은
목록에 없어서 그대로 공개된다.
