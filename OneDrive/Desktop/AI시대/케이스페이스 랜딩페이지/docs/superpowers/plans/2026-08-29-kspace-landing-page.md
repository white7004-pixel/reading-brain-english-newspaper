# 케이스페이스 오피스앤스터디 랜딩페이지 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 케이스페이스 오피스앤스터디(안산공유오피스·안산스터디카페)를 위한 세련된 단일 정적 랜딩페이지를 만든다. 네이버예약으로의 전환이 핵심 목표이며, 실제 사업 정보·사진·후기만 사용하고 SEO/GEO(안산공유오피스, 안산스터디카페 키워드)에 최적화한다.

**Architecture:** 빌드 도구 없는 순수 정적 사이트(`index.html` + `styles.css` + `script.js`). 별도 서버·프레임워크 없음. 실내 사진과 로고는 구글드라이브에서 다운로드해 로컬 자산으로 저장한다.

**Tech Stack:** HTML5, CSS3(커스텀 프로퍼티, 반응형), 바닐라 JavaScript. 이미지 리사이즈는 Windows PowerShell `System.Drawing`(외부 툴 설치 불필요). 검증은 Node.js 내장 `assert`/`fs`만 사용(프레임워크 설치 없음).

## Global Constraints

- 별도 서버·빌드 파이프라인·npm 패키지 설치 금지 (정적 파일만).
- 배포 도메인은 아직 미정 — `https://kspace-officestudy.kr` 를 자리표시용 절대 URL로 전체에 일관되게 사용한다(실제 도메인 확정 시 전체 파일에서 이 문자열만 검색·치환하면 됨).
- 입주자 개인정보(이름·전화번호·계약조건·현재 계약 단가)가 담긴 구글드라이브 "ROOM" 시트 내용은 어떤 형태로도 사용하지 않는다.
- 정확한 현재 이용 요금은 하드코딩하지 않는다 — 요금 관련 CTA는 항상 네이버예약(`https://naver.me/x9Jr9zgM`)으로 연결한다.
- 실제로 확인되지 않은 후기·통계·수치는 절대 지어내지 않는다.
- 색상: `--color-mint:#7FE0D4`, `--color-teal:#2FB8AC`, `--color-navy:#16324A`, `--color-navy-dark:#0F2438`, `--color-bg:#FFFFFF`, `--color-bg-alt:#F4F8F8`, `--color-text:#223338`, `--color-text-muted:#5B6B70` (로고의 민트/틸 그라데이션 + 다크 네이비 기준).
- 사업 정보(모든 태스크에서 동일하게 사용): 상호 "케이스페이스 오피스앤스터디"(K-SPACE OFFICE & STUDY), 주소 "경기도 안산시 단원구 광덕3로 178, 화승타운 6층(고잔동)", 전화 010-2646-0326 / 010-5295-0326, 카카오톡 채널 `http://pf.kakao.com/_lxlLxbxj`, 네이버예약 `https://naver.me/x9Jr9zgM`.

---

## 파일 구조

```
index.html                 전체 페이지 마크업 (섹션은 마커 주석으로 구분, Task별로 채움)
styles.css                 디자인 토큰 + 전체 스타일 (반응형)
script.js                  모바일 내비 토글, 스무스 스크롤, 갤러리 라이트박스, FAQ 아코디언
robots.txt
sitemap.xml
assets/logo/kspace-logo.png
assets/images/kspace-01.jpg ~ kspace-10.jpg
scripts/resize-image.ps1   이미지 리사이즈/압축 유틸리티 (PowerShell, 외부 의존성 없음)
tests/check-task1.js ~ check-task9.js   각 태스크 검증용 Node 스크립트(검증 후 삭제하지 않고 유지)
```

---

### Task 1: 프로젝트 스캐폴드 — index.html 뼈대, robots.txt, sitemap.xml

**Files:**
- Create: `index.html`
- Create: `robots.txt`
- Create: `sitemap.xml`
- Test: `tests/check-task1.js`

**Interfaces:**
- Produces: `index.html`의 섹션 마커 주석 — `<!-- SECTION:HERO -->`, `<!-- SECTION:SERVICES -->`, `<!-- SECTION:FACILITIES -->`, `<!-- SECTION:EVENTS -->`, `<!-- SECTION:GALLERY -->`, `<!-- SECTION:REVIEWS -->`, `<!-- SECTION:LOCATION -->`, `<!-- SECTION:FAQ -->`. 이후 태스크는 이 마커를 찾아 그 다음 줄에 내용을 삽입한다(마커 자체는 유지).
- Produces: `<head>`에 이미 완성된 JSON-LD 2개(`LocalBusiness`, `FAQPage`) — 이후 태스크는 수정하지 않는다.

- [ ] **Step 1: 실패하는 테스트 작성**

`tests/check-task1.js` 생성:

```js
const fs = require('fs');
const assert = require('assert');

const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('<title>케이스페이스 오피스앤스터디 | 안산공유오피스·안산스터디카페'), 'title에 핵심 키워드 누락');
assert(html.includes('안산공유오피스') , 'meta description에 안산공유오피스 키워드 누락');
assert(html.includes('안산스터디카페'), 'meta description에 안산스터디카페 키워드 누락');
assert(html.match(/<script type="application\/ld\+json">/g).length === 2, 'JSON-LD 스크립트가 2개(LocalBusiness, FAQPage)가 아님');

const ldJsonBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
const localBusiness = ldJsonBlocks.find(b => b['@type'] === 'LocalBusiness');
assert(localBusiness, 'LocalBusiness JSON-LD 없음');
assert(localBusiness.telephone === '+82-10-2646-0326', 'LocalBusiness 전화번호 불일치');
assert(localBusiness.address.streetAddress.includes('광덕3로 178'), 'LocalBusiness 주소 불일치');

const faqPage = ldJsonBlocks.find(b => b['@type'] === 'FAQPage');
assert(faqPage, 'FAQPage JSON-LD 없음');
assert(faqPage.mainEntity.length === 6, 'FAQ 문항이 6개가 아님');

const markers = ['SECTION:HERO','SECTION:SERVICES','SECTION:FACILITIES','SECTION:EVENTS','SECTION:GALLERY','SECTION:REVIEWS','SECTION:LOCATION','SECTION:FAQ'];
markers.forEach(m => assert(html.includes(`<!-- ${m} -->`), `마커 ${m} 없음`));

const robots = fs.readFileSync('robots.txt', 'utf8');
assert(robots.includes('Sitemap: https://kspace-officestudy.kr/sitemap.xml'), 'robots.txt에 sitemap 참조 없음');

const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
assert(sitemap.includes('https://kspace-officestudy.kr/'), 'sitemap.xml에 홈 URL 없음');

console.log('PASS: check-task1');
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `node tests/check-task1.js`
Expected: `Error: ENOENT: no such file or directory, open 'index.html'` (아직 파일 없음)

- [ ] **Step 3: index.html 작성**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>케이스페이스 오피스앤스터디 | 안산공유오피스·안산스터디카페 – 중앙역 도보 10분</title>
<meta name="description" content="경기 안산시 단원구 광덕3로 178(고잔동, 화승타운) 6층, 4호선 중앙역 도보 10분. 보증금·관리비·의무계약 없는 안산공유오피스 겸 안산스터디카페 케이스페이스 오피스앤스터디. 24시간 운영, 무료주차, 무료 회의실.">
<link rel="canonical" href="https://kspace-officestudy.kr/">
<meta property="og:type" content="website">
<meta property="og:title" content="케이스페이스 오피스앤스터디 | 안산공유오피스·안산스터디카페">
<meta property="og:description" content="4호선 중앙역 도보 10분, 보증금·관리비·의무계약 없는 24시간 안산공유오피스·안산스터디카페.">
<meta property="og:url" content="https://kspace-officestudy.kr/">
<meta property="og:image" content="https://kspace-officestudy.kr/assets/images/kspace-01.jpg">
<meta property="og:locale" content="ko_KR">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
<link rel="stylesheet" href="styles.css">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "케이스페이스 오피스앤스터디",
  "alternateName": "K-SPACE OFFICE & STUDY",
  "image": "https://kspace-officestudy.kr/assets/images/kspace-01.jpg",
  "telephone": "+82-10-2646-0326",
  "priceRange": "문의",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "광덕3로 178, 화승타운 6층",
    "addressLocality": "안산시 단원구",
    "addressRegion": "경기도",
    "addressCountry": "KR"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "url": "https://kspace-officestudy.kr/",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "3"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "author": { "@type": "Person", "name": "네이버플레이스 방문자" },
      "reviewBody": "스터디카페 유목민이었던 취준생인데, 여기를 왜 이제서야 알게됐나 싶어요! 처음엔 사무실 공간 대여만 하는 곳인 줄 알았는데, 스터디룸으로 쓰시는 분들도 있더라고요."
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "author": { "@type": "Person", "name": "네이버플레이스 방문자" },
      "reviewBody": "스낵과 간식이 맛있어요~ 책 읽고 공부하기도 좋네요~ 회의실까지 무료로 이용하니 여유롭고 좋습니다."
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "author": { "@type": "Person", "name": "네이버플레이스 방문자" },
      "reviewBody": "공용 공간도 깔끔하고 위치도 좋아서 점심먹고 와서 다시 작업하기 좋아요! 1인실도 다른 오피스에 비해 좀 큰 편인 것 같아요, 쾌적해요 굿"
    }
  ]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "안산공유오피스 케이스페이스는 보증금이나 관리비가 있나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "없습니다. 보증금, 관리비, 공과금, 의무계약기간 없이 필요한 기간만큼만 이용하실 수 있습니다." }
    },
    {
      "@type": "Question",
      "name": "주차는 어떻게 하나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "아이파킹 앱에 차량번호를 등록하면 1일 1대 1시간 무료주차가 제공됩니다." }
    },
    {
      "@type": "Question",
      "name": "24시간 이용이 가능한가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "네, 연중무휴 365일 24시간 지문인식 출입으로 언제든 이용하실 수 있습니다." }
    },
    {
      "@type": "Question",
      "name": "안산스터디카페로도 이용할 수 있나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "네, 1인실·2인실을 프라이빗 스터디룸(독서실)으로 이용하시는 분들이 많습니다. 1600×700 와이드 책상과 프리미엄 스탠드가 구비되어 있습니다." }
    },
    {
      "@type": "Question",
      "name": "예약과 결제는 어떻게 하나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "네이버예약에서 요금과 실내 사진을 확인하고 바로 예약·결제하실 수 있습니다. 전화(010-2646-0326) 또는 카카오톡 채널로도 상담 가능합니다." }
    },
    {
      "@type": "Question",
      "name": "4호선 중앙역에서 얼마나 걸리나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "도보 약 10분 거리입니다. 주소는 경기도 안산시 단원구 광덕3로 178, 화승타운 6층입니다." }
    }
  ]
}
</script>
</head>
<body>
<a class="skip-link" href="#main">본문 바로가기</a>
<header class="site-header">
  <div class="container site-header__inner">
    <a href="#top" class="site-header__logo">
      <img src="assets/logo/kspace-logo.png" alt="케이스페이스 오피스앤스터디 로고" width="40" height="40">
      <span>케이스페이스</span>
    </a>
    <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="siteNav" aria-label="메뉴 열기">
      <span></span><span></span><span></span>
    </button>
    <nav class="site-nav" id="siteNav">
      <a href="#services">서비스</a>
      <a href="#facilities">시설</a>
      <a href="#gallery">갤러리</a>
      <a href="#reviews">후기</a>
      <a href="#location">오시는길</a>
      <a href="#faq">FAQ</a>
      <a href="https://naver.me/x9Jr9zgM" class="btn btn--primary btn--small" target="_blank" rel="noopener">네이버예약</a>
    </nav>
  </div>
</header>
<main id="main">
<!-- SECTION:HERO -->
<!-- SECTION:SERVICES -->
<!-- SECTION:FACILITIES -->
<!-- SECTION:EVENTS -->
<!-- SECTION:GALLERY -->
<!-- SECTION:REVIEWS -->
<!-- SECTION:LOCATION -->
<!-- SECTION:FAQ -->
</main>
<footer class="site-footer" id="contact">
  <div class="container site-footer__inner">
    <div class="site-footer__brand">
      <img src="assets/logo/kspace-logo.png" alt="케이스페이스 오피스앤스터디 로고" width="32" height="32">
      <p>케이스페이스 오피스앤스터디</p>
    </div>
    <div class="site-footer__cta">
      <a href="https://naver.me/x9Jr9zgM" class="btn btn--primary" target="_blank" rel="noopener">네이버예약으로 바로 예약하기</a>
      <a href="tel:01026460326" class="btn btn--outline-light">전화 상담 010-2646-0326</a>
      <a href="http://pf.kakao.com/_lxlLxbxj" class="btn btn--outline-light" target="_blank" rel="noopener">카카오톡 채널 상담</a>
    </div>
    <p class="site-footer__meta">상호 케이스페이스 오피스앤스터디 | 사업장 경기도 안산시 단원구 광덕3로 178, 610·611호(고잔동, 화승타운) | 입주문의 010-2646-0326 / 010-5295-0326</p>
  </div>
</footer>
<script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 4: robots.txt, sitemap.xml 작성**

`robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://kspace-officestudy.kr/sitemap.xml
```

`sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kspace-officestudy.kr/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `node tests/check-task1.js`
Expected: `PASS: check-task1`

- [ ] **Step 6: 커밋**

```bash
git add index.html robots.txt sitemap.xml tests/check-task1.js
git commit -m "feat: scaffold index.html shell with SEO meta and JSON-LD"
```

---

### Task 2: 기본 스타일 & 스크립트 — 디자인 토큰, 리셋, 헤더/푸터, 버튼, 반응형 유틸리티

**Files:**
- Create: `styles.css`
- Create: `script.js`
- Test: `tests/check-task2.js`

**Interfaces:**
- Consumes: Task 1의 `index.html`(헤더 nav id `siteNav`, 버튼 id `navToggle`, `btn`/`btn--primary`/`btn--outline-light`/`btn--small` 클래스)
- Produces: CSS 클래스 `.container`, `.btn`, `.btn--primary`, `.btn--outline-light`, `.btn--small`, `.section`, `.section__title` — 이후 모든 섹션 태스크가 이 클래스를 사용한다.
- Produces: `script.js`의 모바일 내비 토글 로직 — 이후 태스크(갤러리, FAQ)가 같은 파일에 함수를 추가한다.

- [ ] **Step 1: 실패하는 테스트 작성**

`tests/check-task2.js`:

```js
const fs = require('fs');
const assert = require('assert');

const css = fs.readFileSync('styles.css', 'utf8');
['--color-mint', '--color-teal', '--color-navy', '--color-bg', '.container', '.btn', '.btn--primary', '.section__title'].forEach(token => {
  assert(css.includes(token), `styles.css에 ${token} 없음`);
});

const html = fs.readFileSync('index.html', 'utf8');
assert(html.includes('href="styles.css"'), 'index.html이 styles.css를 링크하지 않음');
assert(html.includes('src="script.js"'), 'index.html이 script.js를 링크하지 않음');

const js = fs.readFileSync('script.js', 'utf8');
assert(js.includes('navToggle'), 'script.js에 모바일 내비 토글 로직 없음');

console.log('PASS: check-task2');
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `node tests/check-task2.js`
Expected: `Error: ENOENT ... 'styles.css'`

- [ ] **Step 3: styles.css 작성**

```css
:root {
  --color-mint: #7FE0D4;
  --color-teal: #2FB8AC;
  --color-navy: #16324A;
  --color-navy-dark: #0F2438;
  --color-bg: #FFFFFF;
  --color-bg-alt: #F4F8F8;
  --color-text: #223338;
  --color-text-muted: #5B6B70;
  --font-sans: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
  --radius-lg: 20px;
  --radius-md: 12px;
  --shadow-soft: 0 8px 30px rgba(22, 50, 74, 0.08);
  --container-width: 1120px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-sans);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

.skip-link {
  position: absolute; left: -999px; top: 0;
  background: var(--color-navy); color: #fff; padding: 12px 20px; z-index: 1000;
}
.skip-link:focus { left: 0; }

.container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 24px;
}

.section { padding: 80px 0; }
.section--alt { background: var(--color-bg-alt); }
.section__eyebrow {
  color: var(--color-teal);
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
}
.section__title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 700;
  color: var(--color-navy);
  margin-bottom: 16px;
}
.section__desc {
  color: var(--color-text-muted);
  max-width: 640px;
  margin-bottom: 48px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 999px;
  font-weight: 600;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;
  border: none;
}
.btn--primary {
  background: linear-gradient(135deg, var(--color-mint), var(--color-teal));
  color: var(--color-navy-dark);
  box-shadow: var(--shadow-soft);
}
.btn--primary:hover { transform: translateY(-2px); }
.btn--outline-light {
  background: transparent;
  border: 1.5px solid rgba(255,255,255,0.6);
  color: #fff;
}
.btn--outline-light:hover { background: rgba(255,255,255,0.1); }
.btn--small { padding: 10px 20px; font-size: 0.9rem; }

/* Header */
.site-header {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(22,50,74,0.06);
}
.site-header__inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 72px;
}
.site-header__logo {
  display: flex; align-items: center; gap: 10px;
  font-weight: 700; color: var(--color-navy); font-size: 1.05rem;
}
.site-nav {
  display: flex; align-items: center; gap: 28px;
}
.site-nav a:not(.btn) { color: var(--color-text); font-weight: 500; }
.site-nav a:not(.btn):hover { color: var(--color-teal); }

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none; border: none; cursor: pointer;
  padding: 8px;
}
.nav-toggle span { width: 24px; height: 2px; background: var(--color-navy); }

@media (max-width: 860px) {
  .nav-toggle { display: flex; }
  .site-nav {
    position: fixed; top: 72px; left: 0; right: 0;
    background: #fff;
    flex-direction: column; align-items: flex-start; gap: 0;
    max-height: 0; overflow: hidden;
    transition: max-height 0.25s ease;
    border-bottom: 1px solid rgba(22,50,74,0.06);
  }
  .site-nav.is-open { max-height: 400px; }
  .site-nav a:not(.btn) { padding: 16px 24px; width: 100%; border-top: 1px solid rgba(22,50,74,0.05); }
  .site-nav .btn { margin: 16px 24px; }
}

/* Footer */
.site-footer {
  background: var(--color-navy-dark);
  color: rgba(255,255,255,0.85);
  padding: 56px 0 32px;
}
.site-footer__inner { display: flex; flex-direction: column; gap: 24px; align-items: flex-start; }
.site-footer__brand { display: flex; align-items: center; gap: 10px; font-weight: 700; color: #fff; }
.site-footer__cta { display: flex; flex-wrap: wrap; gap: 12px; }
.site-footer__meta { font-size: 0.85rem; color: rgba(255,255,255,0.55); line-height: 1.7; }
```

- [ ] **Step 4: script.js 작성**

```js
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `node tests/check-task2.js`
Expected: `PASS: check-task2`

- [ ] **Step 6: 브라우저에서 모바일 내비 토글 수동 확인**

`index.html`을 브라우저로 열고 창 너비를 860px 이하로 줄인 뒤 햄버거 버튼 클릭 시 메뉴가 펼쳐지는지 확인한다.

- [ ] **Step 7: 커밋**

```bash
git add styles.css script.js tests/check-task2.js
git commit -m "feat: add design tokens, base styles, and mobile nav toggle"
```

---

### Task 3: 브랜드 자산 다운로드 — 로고 + 실내 사진 10장 (구글드라이브 → 로컬, 리사이즈)

**Files:**
- Create: `assets/logo/kspace-logo.png`
- Create: `assets/images/kspace-01.jpg` ~ `kspace-10.jpg`
- Create: `scripts/resize-image.ps1`
- Test: `tests/check-task3.js`

**Interfaces:**
- Produces: `assets/images/kspace-01.jpg` ~ `kspace-10.jpg`, `assets/logo/kspace-logo.png` — Task 4, 6, 7이 `<img src="assets/images/kspace-0N.jpg">` 형태로 참조한다.

이 태스크는 구글드라이브 MCP 도구(`mcp__claude_ai_Google_Drive__download_file_content`)에 대한 접근이 필요하다. 아래 10개 파일이 다운로드 대상이다(모두 2025-08-03 촬영, "케이스페이스 사진" 폴더):

| 대상 파일명 | Drive fileId |
|---|---|
| kspace-01.jpg | 13goTEzAmmvP30Vy667eRv0OirB19FwsQ |
| kspace-02.jpg | 10f_-I5X4WknDd9aYciUMVPt8fuBaIEJA |
| kspace-03.jpg | 19g3_2We1uY8-BNlfOOKhGQEgyRgVTD9Z |
| kspace-04.jpg | 18dLARQuQ8VKHZj2sEoVprA3i9pip0vgy |
| kspace-05.jpg | 1CYJIHkiI4z6MtkthOyhd7Us_xin14UAY |
| kspace-06.jpg | 1PIbqalDhwEXKJtlEdMlcgBtOFpkHu6lG |
| kspace-07.jpg | 1XOc--w_5SBYwAKg5fKtYkGcCmC0Dlq2E |
| kspace-08.jpg | 15h5T4LJFHTLEUeT8HvetiI5AgZQ50JRO |
| kspace-09.jpg | 1KMeQrJHRlU2ANeyLlDvTlhZrnbeSocmT |
| kspace-10.jpg | 1FcY4LQNQadFpX5j2Jc4j_taTL9V4zlFa |

로고는 fileId `1PORfAUB1e9Ep4xt9UJ5dIy4Dn5fE5b36` (`K2.png`, 이미 PNG·10KB로 작아 리사이즈 불필요).

- [ ] **Step 1: 실패하는 테스트 작성**

`tests/check-task3.js`:

```js
const fs = require('fs');
const assert = require('assert');

assert(fs.existsSync('assets/logo/kspace-logo.png'), '로고 파일 없음');

for (let i = 1; i <= 10; i++) {
  const name = `assets/images/kspace-${String(i).padStart(2, '0')}.jpg`;
  assert(fs.existsSync(name), `${name} 없음`);
  const sizeKB = fs.statSync(name).size / 1024;
  assert(sizeKB < 500, `${name} 용량이 500KB를 초과함 (${Math.round(sizeKB)}KB) — 리사이즈 필요`);
}

console.log('PASS: check-task3');
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `node tests/check-task3.js`
Expected: `AssertionError: 로고 파일 없음`

- [ ] **Step 3: 이미지 리사이즈 스크립트 작성**

`scripts/resize-image.ps1`:

```powershell
param(
    [Parameter(Mandatory=$true)][string]$InputPath,
    [Parameter(Mandatory=$true)][string]$OutputPath,
    [int]$MaxWidth = 1600,
    [int]$Quality = 78
)
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Resolve-Path $InputPath))
$ratio = [math]::Min(1.0, $MaxWidth / $img.Width)
$newWidth = [int]($img.Width * $ratio)
$newHeight = [int]($img.Height * $ratio)
$bitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)
$bitmap.Save((Join-Path (Get-Location) $OutputPath), $encoder, $encoderParams)
$graphics.Dispose(); $bitmap.Dispose(); $img.Dispose()
Write-Host "Resized $InputPath -> $OutputPath ($newWidth x $newHeight, quality $Quality)"
```

- [ ] **Step 4: 각 파일을 구글드라이브에서 다운로드 후 리사이즈**

각 파일에 대해 반복 (로고 1개 + 사진 10개, 총 11회):

1. `mcp__claude_ai_Google_Drive__download_file_content` 도구를 `fileId`로 호출해 base64 `data`를 받는다.
2. Write 도구로 그 base64 문자열을 임시 파일(`tmp/<name>.b64`)에 저장한다.
3. Bash로 디코드한다: `mkdir -p tmp assets/logo assets/images && base64 -d "tmp/<name>.b64" > "tmp/<name>.raw"`
4. 사진(jpg)은 리사이즈 실행: `pwsh -File scripts/resize-image.ps1 -InputPath "tmp/kspace-0N.raw" -OutputPath "assets/images/kspace-0N.jpg" -MaxWidth 1600 -Quality 78` (Windows PowerShell 환경이면 `pwsh` 대신 `powershell` 사용)
5. 로고(png)는 리사이즈 없이 그대로 이동: `mv "tmp/kspace-logo.raw" "assets/logo/kspace-logo.png"`
6. `rm -rf tmp` 로 임시 파일 정리

- [ ] **Step 5: 다운로드한 사진 육안 확인 및 대표 이미지 결정**

Read 도구로 `assets/images/kspace-01.jpg` ~ `kspace-10.jpg`를 모두 열어본다. 가장 넓고 밝은 전경 사진(라운지/입구 전경)을 히어로 배경 후보로 표시해 둔다 — Task 4에서 사용. 각 사진이 어떤 공간(1인실/라운지/회의실/카페테리아/복도 등)인지 한 줄로 메모해 둔다 — Task 6(갤러리 alt 텍스트)에서 사용.

- [ ] **Step 6: 테스트 통과 확인**

Run: `node tests/check-task3.js`
Expected: `PASS: check-task3` (모든 이미지가 500KB 미만이 될 때까지 `-Quality`를 낮춰 재실행)

- [ ] **Step 7: 커밋**

```bash
git add assets/ scripts/resize-image.ps1 tests/check-task3.js
git commit -m "feat: add optimized logo and interior photos from Google Drive"
```

---

### Task 4: 히어로 섹션 (사진 크로스페이드 슬라이드쇼)

**변경 사유:** 사용자가 명시적으로 "메인헤더부분을 사진으로 번갈아가면서 동영상식으로 채워죠"(단일 배경 이미지 대신 여러 사진이 번갈아 크로스페이드되는 슬라이드쇼)를 요청함. 순수 CSS `@keyframes` 애니메이션으로 구현하여 별도 JS·라이브러리·빌드 도구 없이 처리한다.

**Files:**
- Modify: `index.html:` `<!-- SECTION:HERO -->` 마커 다음 줄
- Modify: `styles.css` (끝에 추가)
- Test: `tests/check-task4.js`

**Interfaces:**
- Consumes: Task 3의 `assets/images/kspace-01.jpg`, `kspace-06.jpg`, `kspace-03.jpg`, `kspace-04.jpg`, `kspace-07.jpg` (5장), Task 2의 `.btn`/`.container` 클래스

- [ ] **Step 1: 실패하는 테스트 작성**

`tests/check-task4.js`:

```js
const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('class="hero"'), 'hero 섹션 없음');
assert(html.includes('안산공유오피스'), 'hero에 안산공유오피스 키워드 없음');
assert(html.includes('안산스터디카페'), 'hero에 안산스터디카페 키워드 없음');
assert(html.includes('hero__slideshow'), 'hero 슬라이드쇼 컨테이너 없음');

const heroImages = ['kspace-01.jpg', 'kspace-06.jpg', 'kspace-03.jpg', 'kspace-04.jpg', 'kspace-07.jpg'];
for (const img of heroImages) {
  assert(html.includes(`assets/images/${img}`), `hero 슬라이드에 ${img} 없음`);
}
assert(html.includes('naver.me/x9Jr9zgM'), 'hero CTA에 네이버예약 링크 없음');

const css = fs.readFileSync('styles.css', 'utf8');
assert(css.includes('.hero'), 'styles.css에 .hero 스타일 없음');
assert(css.includes('.hero__slide'), 'styles.css에 .hero__slide 스타일 없음');
assert(css.includes('@keyframes heroFade'), 'styles.css에 heroFade 키프레임 없음');
assert(css.includes('prefers-reduced-motion'), '모션 최소화 대응(prefers-reduced-motion) 없음');

console.log('PASS: check-task4');
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `node tests/check-task4.js`
Expected: `AssertionError: hero 섹션 없음`

- [ ] **Step 3: index.html의 `<!-- SECTION:HERO -->` 마커 다음에 삽입**

5장의 사진(라운지, 라운지+화분, 1인 부스 복도, 회의실, 창가 좌석)이 5초씩 번갈아 크로스페이드되는 슬라이드쇼. 총 애니메이션 주기는 25초(5장 × 5초)이며, `animation-delay`로 각 슬라이드를 순차 배치한다.

```html
<section class="hero" id="top">
  <div class="hero__slideshow" aria-hidden="true">
    <div class="hero__slide" style="background-image:url('assets/images/kspace-01.jpg')"></div>
    <div class="hero__slide" style="background-image:url('assets/images/kspace-06.jpg')"></div>
    <div class="hero__slide" style="background-image:url('assets/images/kspace-03.jpg')"></div>
    <div class="hero__slide" style="background-image:url('assets/images/kspace-04.jpg')"></div>
    <div class="hero__slide" style="background-image:url('assets/images/kspace-07.jpg')"></div>
  </div>
  <div class="hero__overlay"></div>
  <div class="container hero__inner">
    <p class="section__eyebrow" style="color:var(--color-mint)">안산공유오피스 · 안산스터디카페</p>
    <h1>케이스페이스 오피스앤스터디</h1>
    <p class="hero__desc">4호선 중앙역 도보 10분, 보증금·관리비·의무계약 없이 24시간 조용하고 쾌적하게 이용하는 안산공유오피스이자 안산스터디카페입니다.</p>
    <div class="hero__actions">
      <a href="https://naver.me/x9Jr9zgM" class="btn btn--primary" target="_blank" rel="noopener">네이버예약으로 바로 예약하기</a>
      <a href="tel:01026460326" class="btn btn--outline-light">전화 상담 010-2646-0326</a>
    </div>
  </div>
</section>
```

- [ ] **Step 4: styles.css 끝에 히어로 슬라이드쇼 스타일 추가**

```css
.hero {
  position: relative;
  min-height: 640px;
  display: flex;
  align-items: center;
  color: #fff;
  overflow: hidden;
}
.hero__slideshow { position: absolute; inset: 0; }
.hero__slide {
  position: absolute; inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1.03);
  animation: heroFade 25s infinite;
}
.hero__slide:nth-child(1) { animation-delay: 0s; }
.hero__slide:nth-child(2) { animation-delay: 5s; }
.hero__slide:nth-child(3) { animation-delay: 10s; }
.hero__slide:nth-child(4) { animation-delay: 15s; }
.hero__slide:nth-child(5) { animation-delay: 20s; }

@keyframes heroFade {
  0% { opacity: 0; }
  4% { opacity: 1; }
  20% { opacity: 1; }
  24% { opacity: 0; }
  100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .hero__slide { animation: none; opacity: 0; }
  .hero__slide:first-child { opacity: 1; }
}

.hero__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(15,36,56,0.55) 0%, rgba(15,36,56,0.78) 100%);
}
.hero__inner { position: relative; z-index: 1; padding: 120px 24px; max-width: 720px; }
.hero h1 { font-size: clamp(2.2rem, 6vw, 3.4rem); font-weight: 800; margin-bottom: 20px; }
.hero__desc { font-size: 1.1rem; color: rgba(255,255,255,0.9); margin-bottom: 36px; max-width: 560px; }
.hero__actions { display: flex; flex-wrap: wrap; gap: 14px; }
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `node tests/check-task4.js`
Expected: `PASS: check-task4`

- [ ] **Step 6: 커밋**

```bash
git add index.html styles.css tests/check-task4.js
git commit -m "feat: add hero section with photo crossfade slideshow"
```

---

### Task 5: 서비스 소개 + 시설/편의 섹션

**Files:**
- Modify: `index.html:` `<!-- SECTION:SERVICES -->`, `<!-- SECTION:FACILITIES -->` 마커 다음 줄
- Modify: `styles.css`
- Test: `tests/check-task5.js`

- [ ] **Step 1: 실패하는 테스트 작성**

`tests/check-task5.js`:

```js
const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="services"'), 'services 섹션 id 없음');
assert(html.includes('id="facilities"'), 'facilities 섹션 id 없음');
['공유오피스', '스터디룸', '비상주사무실'].forEach(word => assert(html.includes(word), `services에 ${word} 없음`));
['지문인식', '무료 회의실', '아이파킹', '무인택배함'].forEach(word => assert(html.includes(word), `facilities에 ${word} 없음`));

console.log('PASS: check-task5');
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `node tests/check-task5.js`
Expected: `AssertionError: services 섹션 id 없음`

- [ ] **Step 3: `<!-- SECTION:SERVICES -->` 마커 다음에 삽입**

```html
<section class="section" id="services">
  <div class="container">
    <p class="section__eyebrow">SERVICE</p>
    <h2 class="section__title">안산 공유오피스 · 스터디카페 이용 안내</h2>
    <p class="section__desc">업무부터 공부까지, 필요한 만큼만 부담 없이 이용하세요.</p>
    <div class="card-grid">
      <article class="card">
        <h3>공유오피스 (1인실/2인실)</h3>
        <p>1600×700 와이드 책상과 프리미엄 스탠드를 갖춘 1인실·2인실. 보증금·관리비·의무계약기간 없이 필요한 기간만 이용하세요.</p>
      </article>
      <article class="card">
        <h3>스터디룸 (프라이빗 독서실)</h3>
        <p>조용히 집중할 수 있는 프라이빗 독서실. 24시간 언제든 이용 가능한 안산 스터디카페 대안입니다.</p>
      </article>
      <article class="card">
        <h3>비상주사무실</h3>
        <p>사업자등록이 필요한 분들을 위한 비상주사무실 서비스. 제휴세무사 기장 서비스도 함께 안내해드립니다.</p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 4: `<!-- SECTION:FACILITIES -->` 마커 다음에 삽입**

```html
<section class="section section--alt" id="facilities">
  <div class="container">
    <p class="section__eyebrow">FACILITY</p>
    <h2 class="section__title">24시간 무료로 누리는 편의시설</h2>
    <ul class="facility-grid">
      <li>24시간 연중무휴 운영</li>
      <li>지문인식 출입 + 개인실 디지털도어록</li>
      <li>무료 회의실 (회원)</li>
      <li>유무선 초고속 인터넷 무료</li>
      <li>출력·복사·스캔·팩스 무료</li>
      <li>커피·차·다과·음료 무료</li>
      <li>무인택배함</li>
      <li>CCTV 24시간 + 아이파킹 무료주차(1일 1대 1시간)</li>
    </ul>
  </div>
</section>
```

- [ ] **Step 5: styles.css에 카드/그리드 스타일 추가**

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(22,50,74,0.06);
}
.card h3 { color: var(--color-navy); margin-bottom: 12px; font-size: 1.15rem; }
.card p { color: var(--color-text-muted); }

.facility-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.facility-grid li {
  background: #fff;
  border-radius: var(--radius-md);
  padding: 20px;
  font-weight: 600;
  color: var(--color-navy);
  border-left: 3px solid var(--color-teal);
}

@media (max-width: 860px) {
  .card-grid { grid-template-columns: 1fr; }
  .facility-grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 6: 테스트 통과 확인**

Run: `node tests/check-task5.js`
Expected: `PASS: check-task5`

- [ ] **Step 7: 커밋**

```bash
git add index.html styles.css tests/check-task5.js
git commit -m "feat: add services and facilities sections"
```

---

### Task 6: 이벤트/할인 배너 + 갤러리 섹션(라이트박스)

**Files:**
- Modify: `index.html:` `<!-- SECTION:EVENTS -->`, `<!-- SECTION:GALLERY -->` 마커 다음 줄
- Modify: `styles.css`
- Modify: `script.js` (라이트박스 함수 추가)
- Test: `tests/check-task6.js`

**Interfaces:**
- Consumes: Task 3의 `assets/images/kspace-01.jpg` ~ `kspace-10.jpg`, Task 3 Step 5에서 메모한 사진별 공간 설명(alt 텍스트에 사용)
- Produces: `script.js`에 `initGalleryLightbox()` 함수 — 다른 태스크는 사용하지 않지만 이후 유지보수 시 참고.

- [ ] **Step 1: 실패하는 테스트 작성**

`tests/check-task6.js`:

```js
const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="events"'), 'events 섹션 id 없음');
['3개월', '6개월', '12개월', '친구초대', '네이버 리뷰'].forEach(w => assert(html.includes(w), `events에 ${w} 없음`));

assert(html.includes('id="gallery"'), 'gallery 섹션 id 없음');
for (let i = 1; i <= 10; i++) {
  const name = `assets/images/kspace-${String(i).padStart(2, '0')}.jpg`;
  assert(html.includes(name), `gallery에 ${name} 없음`);
}
assert((html.match(/class="gallery-item"/g) || []).length === 10, 'gallery-item이 10개가 아님');
// alt 텍스트가 전부 동일한 제네릭 문구가 아닌지 확인 (최소한의 다양성 체크)
const alts = [...html.matchAll(/class="gallery-item"[\s\S]*?alt="([^"]+)"/g)].map(m => m[1]);
assert(new Set(alts).size >= 5, '갤러리 alt 텍스트가 지나치게 획일적임(서술형으로 다양화 필요)');

const js = fs.readFileSync('script.js', 'utf8');
assert(js.includes('initGalleryLightbox'), 'script.js에 라이트박스 함수 없음');

console.log('PASS: check-task6');
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `node tests/check-task6.js`
Expected: `AssertionError: events 섹션 id 없음`

- [ ] **Step 3: `<!-- SECTION:EVENTS -->` 마커 다음에 삽입**

```html
<section class="section" id="events">
  <div class="container">
    <p class="section__eyebrow">EVENT</p>
    <h2 class="section__title">지금 참여할 수 있는 혜택</h2>
    <div class="event-grid">
      <div class="event-card event-card--highlight">
        <h3>일시납 할인</h3>
        <ul class="event-card__list">
          <li>3개월 결제 — <strong>10% 할인</strong></li>
          <li>6개월 결제 — <strong>1개월 무료</strong></li>
          <li>12개월 결제 — <strong>3개월 무료</strong></li>
        </ul>
      </div>
      <div class="event-card">
        <h3>친구초대 이벤트</h3>
        <p>친구에게 케이스페이스를 소개하고 등록하면 나는 27일 연장, 친구는 7일 연장! (1개월권 이상 이용자 대상, 바로 사용 가능)</p>
      </div>
      <div class="event-card">
        <h3>네이버 리뷰 이벤트</h3>
        <p>사진과 함께 30자 이상 리뷰를 남기면 1일 사용권 무료 지급. 중복 참여 가능합니다.</p>
      </div>
    </div>
    <p class="event-note">※ 이벤트 내용은 변경될 수 있으니 최신 조건은 네이버예약 또는 전화(010-2646-0326)로 확인해주세요.</p>
  </div>
</section>
```

- [ ] **Step 4: `<!-- SECTION:GALLERY -->` 마커 다음에 삽입**

(alt 텍스트는 컨트롤러가 Read 도구로 10장 전부를 직접 확인하고 작성한 정확한 서술이다 — 지어내거나 촬영 순서로 추측한 문구가 아니므로 그대로 사용한다.)

```html
<section class="section section--alt" id="gallery">
  <div class="container">
    <p class="section__eyebrow">GALLERY</p>
    <h2 class="section__title">케이스페이스 공간 둘러보기</h2>
    <div class="gallery-grid">
      <button class="gallery-item" data-full="assets/images/kspace-01.jpg"><img src="assets/images/kspace-01.jpg" alt="안산공유오피스 케이스페이스 라운지 소파 좌석과 원목 테이블" loading="lazy"></button>
      <button class="gallery-item" data-full="assets/images/kspace-02.jpg"><img src="assets/images/kspace-02.jpg" alt="안산스터디카페 케이스페이스 1인 개인 데스크와 스탠드 조명" loading="lazy"></button>
      <button class="gallery-item" data-full="assets/images/kspace-03.jpg"><img src="assets/images/kspace-03.jpg" alt="케이스페이스 오픈형 개인 부스 좌석 복도" loading="lazy"></button>
      <button class="gallery-item" data-full="assets/images/kspace-04.jpg"><img src="assets/images/kspace-04.jpg" alt="케이스페이스 회의실 내부 전경" loading="lazy"></button>
      <button class="gallery-item" data-full="assets/images/kspace-05.jpg"><img src="assets/images/kspace-05.jpg" alt="케이스페이스 카페테리아 간식 코너" loading="lazy"></button>
      <button class="gallery-item" data-full="assets/images/kspace-06.jpg"><img src="assets/images/kspace-06.jpg" alt="케이스페이스 라운지 소파 좌석과 초록 식물" loading="lazy"></button>
      <button class="gallery-item" data-full="assets/images/kspace-07.jpg"><img src="assets/images/kspace-07.jpg" alt="안산스터디카페 케이스페이스 창가 좌석 책상" loading="lazy"></button>
      <button class="gallery-item" data-full="assets/images/kspace-08.jpg"><img src="assets/images/kspace-08.jpg" alt="케이스페이스 개인 데스크 2인 좌석" loading="lazy"></button>
      <button class="gallery-item" data-full="assets/images/kspace-09.jpg"><img src="assets/images/kspace-09.jpg" alt="안산스터디카페 케이스페이스 독서실형 개인 부스" loading="lazy"></button>
      <button class="gallery-item" data-full="assets/images/kspace-10.jpg"><img src="assets/images/kspace-10.jpg" alt="케이스페이스 사무 지원 공간의 프린터 및 복합기" loading="lazy"></button>
    </div>
  </div>
  <div class="lightbox" id="lightbox" hidden>
    <button class="lightbox__close" id="lightboxClose" aria-label="닫기">✕</button>
    <img id="lightboxImg" src="" alt="">
  </div>
</section>
```

- [ ] **Step 5: styles.css에 이벤트/갤러리 스타일 추가**

```css
.event-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 24px;
  margin-bottom: 20px;
}
.event-card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 28px;
  border: 1px solid rgba(22,50,74,0.06);
}
.event-card--highlight {
  background: linear-gradient(135deg, var(--color-mint), var(--color-teal));
  color: var(--color-navy-dark);
}
.event-card h3 { margin-bottom: 14px; }
.event-card__list li { margin-bottom: 8px; }
.event-note { font-size: 0.85rem; color: var(--color-text-muted); }

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}
.gallery-item {
  border: none; padding: 0; cursor: pointer;
  border-radius: var(--radius-md);
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: none;
}
.gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.2s ease; }
.gallery-item:hover img { transform: scale(1.06); }

.lightbox {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(15,36,56,0.92);
  display: flex; align-items: center; justify-content: center;
  padding: 40px;
}
.lightbox img { max-width: 90vw; max-height: 85vh; border-radius: var(--radius-md); }
.lightbox__close {
  position: absolute; top: 24px; right: 24px;
  background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;
}

@media (max-width: 860px) {
  .event-grid { grid-template-columns: 1fr; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 6: script.js에 라이트박스 로직 추가**

Task 8에서 이미 `initFaqAccordion()`을 추가해 두었으므로, 현재 `script.js`는 아래와 같은 상태다(28줄):

```js
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  initFaqAccordion();

  function initFaqAccordion() {
    document.querySelectorAll('.faq-item__question').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.faq-item').classList.toggle('is-open');
      });
    });
  }
});
```

파일의 마지막 줄인 `});`(DOMContentLoaded 콜백을 닫는 줄)을 아래 블록 전체로 교체한다(새 블록도 `});`로 끝나므로 콜백은 계속 닫혀 있다). 만약 실제 파일이 위 내용과 다르다면(다른 태스크가 먼저 실행되어 내용이 바뀐 경우), 실제 파일에서 콜백을 닫는 마지막 `});`을 직접 찾아 동일한 방식으로 교체한다 — 줄 번호를 가정하지 말 것:

```js
  initGalleryLightbox();

  function initGalleryLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');
    if (!lightbox) return;

    items.forEach(item => {
      item.addEventListener('click', () => {
        const full = item.getAttribute('data-full');
        const alt = item.querySelector('img').getAttribute('alt');
        lightboxImg.src = full;
        lightboxImg.alt = alt;
        lightbox.hidden = false;
      });
    });

    closeBtn.addEventListener('click', () => { lightbox.hidden = true; });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.hidden = true;
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.hidden = true;
    });
  }
});
```

- [ ] **Step 7: 테스트 통과 확인**

Run: `node tests/check-task6.js`
Expected: `PASS: check-task6`

- [ ] **Step 8: 브라우저에서 갤러리 클릭 → 라이트박스 확대 → ESC/배경클릭/✕ 닫힘 수동 확인**

- [ ] **Step 9: 커밋**

```bash
git add index.html styles.css script.js tests/check-task6.js
git commit -m "feat: add events banner and gallery with lightbox"
```

---

### Task 7: 후기 섹션

**Files:**
- Modify: `index.html:` `<!-- SECTION:REVIEWS -->` 마커 다음 줄
- Modify: `styles.css`
- Test: `tests/check-task7.js`

- [ ] **Step 1: 실패하는 테스트 작성**

`tests/check-task7.js`:

```js
const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="reviews"'), 'reviews 섹션 id 없음');
assert((html.match(/class="review-card"/g) || []).length === 5, '후기 카드가 5개가 아님');
assert(html.includes('네이버플레이스 방문자 리뷰'), '네이버플레이스 출처 표기 없음');
assert(html.includes('방문자 블로그 후기'), '블로그 출처 표기 없음');
assert(html.includes('스터디카페 유목민이었던 취준생'), '실제 후기 원문 1 누락');
assert(html.includes('7개월 동안 이용한 공유오피스'), '실제 블로그 후기 원문 누락');

console.log('PASS: check-task7');
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `node tests/check-task7.js`
Expected: `AssertionError: reviews 섹션 id 없음`

- [ ] **Step 3: `<!-- SECTION:REVIEWS -->` 마커 다음에 삽입**

```html
<section class="section" id="reviews">
  <div class="container">
    <p class="section__eyebrow">REVIEW</p>
    <h2 class="section__title">실제 이용자들의 이야기</h2>
    <div class="review-grid">
      <article class="review-card">
        <p class="review-card__source">네이버플레이스 방문자 리뷰 · ★★★★★</p>
        <p class="review-card__body">"스터디카페 유목민이었던 취준생인데, 여기를 왜 이제서야 알게됐나 싶어요! 처음엔 사무실 공간 대여만 하는 곳인 줄 알았는데, 스터디룸으로 쓰시는 분들도 있더라고요."</p>
        <p class="review-card__tags">설명이 자세해요 · 친절해요 · 분위기가 편안해요 · 거래 방식이 안전해요</p>
      </article>
      <article class="review-card">
        <p class="review-card__source">네이버플레이스 방문자 리뷰</p>
        <p class="review-card__body">"스낵과 간식이 맛있어요~ 책 읽고 공부하기도 좋네요~ 1인실에서 일하다가 가끔씩 라운지에서 일하니 분위기가 새로워요~ 회의실까지 무료로 이용하니 여유롭고 좋습니다♡"</p>
        <p class="review-card__tags">친절해요 · 설명이 자세해요 · 분위기가 편안해요</p>
      </article>
      <article class="review-card">
        <p class="review-card__source">네이버플레이스 방문자 리뷰</p>
        <p class="review-card__body">"1개월 50% 할인 옵션으로 첫달 이용중인데 공용 공간도 깔끔하고 위치도 좋아서 점심먹고 와서 다시 작업하기 좋아요! 1인실도 다른 오피스에 비해 좀 큰 편인 것 같아요, 쾌적해요 굿"</p>
        <p class="review-card__tags">분위기가 편안해요</p>
      </article>
      <article class="review-card">
        <p class="review-card__source">방문자 블로그 후기</p>
        <p class="review-card__body">"약 7개월 동안 이용한 공유오피스 케이스페이스... 결론부터 말하자면 완전 만족! 집중 잘 되는 환경 + 편리한 시설 덕분에 매일 학원 다니듯 출근해서 열공했던 공간이에요." 모던하고 깔끔한 오픈라운지, 츄파춥스·스낵·쿠키·캡슐커피 등 무제한 간식, 무료 프린트, 화상회의에도 좋은 넓은 개인 공간을 꼽았다.</p>
      </article>
      <article class="review-card">
        <p class="review-card__source">방문자 블로그 후기</p>
        <p class="review-card__body">"안산에서 조용하고 깔끔한 공유오피스를 찾고 계신 분들을 위해 케이스페이스 소개해 드릴게요... 가격도 저렴하고 완전 쾌적한 환경에다 주차도 가능하고(무료 1시간!) 거기다 간식까지! 4無(보증금·관리비·공과금·의무계약기간 없음)라 막 시작하신 분들이나 출장 많으신 분들에게 부담 없이 좋아요. 별 다섯개"</p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 4: styles.css에 후기 카드 스타일 추가**

```css
.review-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.review-card {
  background: var(--color-bg-alt);
  border-radius: var(--radius-lg);
  padding: 28px;
}
.review-card__source { font-weight: 700; color: var(--color-teal); font-size: 0.85rem; margin-bottom: 12px; }
.review-card__body { color: var(--color-text); margin-bottom: 12px; }
.review-card__tags { font-size: 0.8rem; color: var(--color-text-muted); }

@media (max-width: 860px) {
  .review-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `node tests/check-task7.js`
Expected: `PASS: check-task7`

- [ ] **Step 6: 커밋**

```bash
git add index.html styles.css tests/check-task7.js
git commit -m "feat: add reviews section with real Naver Place and blog reviews"
```

---

### Task 8: 오시는길 + FAQ 섹션(지도 임베드, 아코디언)

**Files:**
- Modify: `index.html:` `<!-- SECTION:LOCATION -->`, `<!-- SECTION:FAQ -->` 마커 다음 줄
- Modify: `styles.css`
- Modify: `script.js` (아코디언 함수 추가)
- Test: `tests/check-task8.js`

**Interfaces:**
- Consumes: Task 1의 FAQPage JSON-LD 문항(동일한 6개 질문/답을 HTML 아코디언에도 그대로 사용해 JSON-LD와 화면 내용을 일치시킨다)

지도는 스펙 문서의 "카카오맵 임베드" 대신 **Google Maps 기본 검색 임베드**(`output=embed`)를 쓴다. Kakao Maps JS SDK는 API 키 발급이 필요한데 이 프로젝트는 별도 백엔드·API 키 없는 정적 사이트를 지향하므로, API 키가 필요 없는 Google Maps embed로 대체한 설계 판단이다.

- [ ] **Step 1: 실패하는 테스트 작성**

`tests/check-task8.js`:

```js
const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="location"'), 'location 섹션 id 없음');
assert(html.includes('광덕3로 178'), 'location에 주소 없음');
assert(html.includes('<iframe'), 'location에 지도 iframe 없음');

assert(html.includes('id="faq"'), 'faq 섹션 id 없음');
const faqJsonMatch = html.match(/"@type": "FAQPage"[\s\S]*?"mainEntity": (\[[\s\S]*?\])\s*}\s*<\/script>/);
assert(faqJsonMatch, 'FAQPage JSON-LD 파싱 실패');
const faqQuestions = JSON.parse(faqJsonMatch[1]).map(q => q.name);
faqQuestions.forEach(q => assert(html.includes(q), `FAQ 화면에 "${q}" 질문 텍스트 없음 (JSON-LD와 불일치)`));
assert((html.match(/class="faq-item"/g) || []).length === 6, 'FAQ 아코디언 항목이 6개가 아님');

const js = fs.readFileSync('script.js', 'utf8');
assert(js.includes('initFaqAccordion'), 'script.js에 아코디언 함수 없음');

console.log('PASS: check-task8');
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `node tests/check-task8.js`
Expected: `AssertionError: location 섹션 id 없음`

- [ ] **Step 3: `<!-- SECTION:LOCATION -->` 마커 다음에 삽입**

```html
<section class="section section--alt" id="location">
  <div class="container location__grid">
    <div>
      <p class="section__eyebrow">LOCATION</p>
      <h2 class="section__title">오시는 길</h2>
      <ul class="location-info">
        <li><strong>주소</strong> 경기도 안산시 단원구 광덕3로 178, 화승타운 6층(고잔동)</li>
        <li><strong>대중교통</strong> 4호선 중앙역 도보 약 10분</li>
        <li><strong>주차</strong> 아이파킹 앱에 차량번호 등록 시 1일 1대 1시간 무료</li>
        <li><strong>운영시간</strong> 연중무휴 365일 24시간</li>
      </ul>
      <a href="https://naver.me/x9Jr9zgM" class="btn btn--primary" target="_blank" rel="noopener">네이버예약에서 위치·요금 확인</a>
    </div>
    <iframe
      title="케이스페이스 오피스앤스터디 위치 지도"
      src="https://www.google.com/maps?q=%EA%B2%BD%EA%B8%B0%EB%8F%84+%EC%95%88%EC%82%B0%EC%8B%9C+%EB%8B%A8%EC%9B%90%EA%B5%AC+%EA%B4%91%EB%8D%953%EB%A1%9C+178&output=embed"
      width="100%" height="360" style="border:0; border-radius: var(--radius-lg);" loading="lazy"></iframe>
  </div>
</section>
```

- [ ] **Step 4: `<!-- SECTION:FAQ -->` 마커 다음에 삽입**

```html
<section class="section" id="faq">
  <div class="container">
    <p class="section__eyebrow">FAQ</p>
    <h2 class="section__title">자주 묻는 질문</h2>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-item__question">안산공유오피스 케이스페이스는 보증금이나 관리비가 있나요?</button>
        <div class="faq-item__answer"><p>없습니다. 보증금, 관리비, 공과금, 의무계약기간 없이 필요한 기간만큼만 이용하실 수 있습니다.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-item__question">주차는 어떻게 하나요?</button>
        <div class="faq-item__answer"><p>아이파킹 앱에 차량번호를 등록하면 1일 1대 1시간 무료주차가 제공됩니다.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-item__question">24시간 이용이 가능한가요?</button>
        <div class="faq-item__answer"><p>네, 연중무휴 365일 24시간 지문인식 출입으로 언제든 이용하실 수 있습니다.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-item__question">안산스터디카페로도 이용할 수 있나요?</button>
        <div class="faq-item__answer"><p>네, 1인실·2인실을 프라이빗 스터디룸(독서실)으로 이용하시는 분들이 많습니다. 1600×700 와이드 책상과 프리미엄 스탠드가 구비되어 있습니다.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-item__question">예약과 결제는 어떻게 하나요?</button>
        <div class="faq-item__answer"><p>네이버예약에서 요금과 실내 사진을 확인하고 바로 예약·결제하실 수 있습니다. 전화(010-2646-0326) 또는 카카오톡 채널로도 상담 가능합니다.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-item__question">4호선 중앙역에서 얼마나 걸리나요?</button>
        <div class="faq-item__answer"><p>도보 약 10분 거리입니다. 주소는 경기도 안산시 단원구 광덕3로 178, 화승타운 6층입니다.</p></div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: styles.css에 위치/FAQ 스타일 추가**

```css
.location__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}
.location-info { margin: 24px 0 32px; }
.location-info li { margin-bottom: 12px; color: var(--color-text-muted); }
.location-info strong { color: var(--color-navy); display: inline-block; min-width: 84px; }

.faq-list { max-width: 760px; }
.faq-item { border-bottom: 1px solid rgba(22,50,74,0.1); }
.faq-item__question {
  width: 100%; text-align: left; background: none; border: none;
  padding: 20px 0; font-weight: 600; font-size: 1.02rem; color: var(--color-navy);
  cursor: pointer; display: flex; justify-content: space-between; align-items: center;
}
.faq-item__question::after { content: '+'; font-size: 1.4rem; color: var(--color-teal); }
.faq-item.is-open .faq-item__question::after { content: '–'; }
.faq-item__answer {
  max-height: 0; overflow: hidden; transition: max-height 0.25s ease;
  color: var(--color-text-muted);
}
.faq-item.is-open .faq-item__answer { max-height: 200px; padding-bottom: 20px; }

@media (max-width: 860px) {
  .location__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 6: script.js에 아코디언 로직 추가**

`script.js`에서 `DOMContentLoaded` 콜백을 닫는 마지막 줄 `});`(Task 6에서 추가한 블록의 마지막 `});`)을 아래 블록 전체로 교체한다(새 블록도 `});`로 끝나므로 콜백은 계속 닫혀 있다):

```js
  initFaqAccordion();

  function initFaqAccordion() {
    document.querySelectorAll('.faq-item__question').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.faq-item').classList.toggle('is-open');
      });
    });
  }
});
```

- [ ] **Step 7: 테스트 통과 확인**

Run: `node tests/check-task8.js`
Expected: `PASS: check-task8`

- [ ] **Step 8: 브라우저에서 FAQ 클릭 시 펼쳐짐/접힘, 지도 iframe 로드 수동 확인**

- [ ] **Step 9: 커밋**

```bash
git add index.html styles.css script.js tests/check-task8.js
git commit -m "feat: add location map and FAQ accordion sections"
```

---

### Task 9: 최종 QA — 전체 검증, 반응형 점검, 마무리

**Files:**
- Create: `tests/check-all.js`
- Modify: `styles.css` (필요 시 반응형 보정만)

**Interfaces:**
- Consumes: Task 1~8에서 만든 모든 마커/섹션/이미지/CTA

- [ ] **Step 1: 통합 검증 스크립트 작성 및 실행**

`tests/check-all.js`:

```js
const { execSync } = require('child_process');
const files = ['check-task1', 'check-task2', 'check-task3', 'check-task4', 'check-task5', 'check-task6', 'check-task7', 'check-task8'];
files.forEach(f => {
  console.log(`--- ${f} ---`);
  execSync(`node tests/${f}.js`, { stdio: 'inherit' });
});

const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

// 마커가 전부 실제 내용으로 이어졌는지 (마커 바로 뒤에 </main>나 다른 마커가 오면 비어있는 것)
const markers = ['SECTION:HERO','SECTION:SERVICES','SECTION:FACILITIES','SECTION:EVENTS','SECTION:GALLERY','SECTION:REVIEWS','SECTION:LOCATION','SECTION:FAQ'];
markers.forEach(m => {
  const idx = html.indexOf(`<!-- ${m} -->`);
  const after = html.slice(idx + `<!-- ${m} -->`.length, idx + `<!-- ${m} -->`.length + 50).trim();
  assert(after.startsWith('<section'), `${m} 마커 뒤에 섹션 내용이 없음`);
});

// nav 앵커가 실제 존재하는 id를 가리키는지
const navHrefs = [...html.matchAll(/<nav class="site-nav"[\s\S]*?<\/nav>/)[0].matchAll(/href="#([a-z]+)"/g)].map(m => m[1]);
navHrefs.forEach(id => assert(html.includes(`id="${id}"`), `nav 링크 #${id}에 해당하는 id 없음`));

console.log('PASS: check-all (모든 태스크 검증 통과)');
```

Run: `node tests/check-all.js`
Expected: 각 태스크 PASS 로그 후 마지막 줄 `PASS: check-all (모든 태스크 검증 통과)`

- [ ] **Step 2: 실제 브라우저에서 반응형 확인**

`/run` 스킬(또는 `index.html`을 직접 브라우저로 열기)로 다음을 확인한다:
- 데스크톱(1440px), 태블릿(768px), 모바일(375px) 폭에서 레이아웃이 깨지지 않는지
- 모든 CTA(네이버예약, 전화, 카카오톡, 갤러리, FAQ)가 실제로 동작하는지
- 히어로/갤러리 이미지가 로드되는지 (경로 오류로 깨진 이미지가 없는지)

문제가 발견되면 해당 태스크의 CSS/HTML로 돌아가 수정하고, 관련 `check-taskN.js`를 다시 통과시킨 뒤 새 커밋을 만든다(기존 커밋을 amend하지 않는다).

- [ ] **Step 3: 최종 커밋**

```bash
git add tests/check-all.js
git commit -m "test: add full-suite verification script for landing page"
```

---

## 완료 후 남은 일 (이 플랜의 범위 밖)

- 실제 배포 도메인이 정해지면 `index.html`, `robots.txt`, `sitemap.xml`의 `https://kspace-officestudy.kr` 문자열을 전부 실제 도메인으로 치환.
- 배포(Vercel/Netlify/호스팅) 자체는 사용자가 원할 때 별도로 진행.
