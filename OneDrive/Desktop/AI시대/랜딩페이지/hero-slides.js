/* 메인 헤더 사진 크로스페이드
   한 장이던 히어로 사진을 여러 장이 서서히 겹쳐 넘어가게 바꾼다.
   천천히 확대(ken burns)까지 겹쳐 동영상처럼 보이게 하되,
   실제 동영상이 아니라 사진이라 데이터는 훨씬 가볍다.

   첫 장은 HTML 에 그대로 있고, 나머지는 페이지가 다 뜬 뒤에
   자바스크립트로 붙인다 — 첫 화면이 뜨는 속도를 늦추지 않기 위해서다.
   자바스크립트가 꺼져 있으면 첫 장이 그대로 남는다.

   되돌리려면 index.html 에서 이 파일의 <script> 한 줄만 제거하세요. */
(function () {
  'use strict';

  var HOLD = 5000;   // 한 장이 머무는 시간
  var FADE = 1400;   // 겹쳐 넘어가는 시간 (CSS 와 맞춘다)

  function start() {
    var first = document.querySelector('.hero-static-image[data-hero-slides]');
    if (!first) return;

    var list = (first.getAttribute('data-hero-slides') || '')
      .split('|').map(function (s) { return s.trim(); }).filter(Boolean);
    if (!list.length) return;

    // 움직임을 줄여 달라는 설정이면 한 장으로 둔다
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var wrap = first.parentNode;
    var slides = [first];

    list.forEach(function (src) {
      var img = new Image();
      img.className = 'hero-static-image';
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.decoding = 'async';
      img.src = src;
      wrap.appendChild(img);
      slides.push(img);
    });

    // 숨은 탭은 브라우저가 알아서 타이머를 늦춘다.
    // document.hidden 으로 직접 막으면 일부 환경(미리보기 창 등)에서
    // 계속 '숨김' 으로 보고되어 사진이 아예 넘어가지 않는다.
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('is-on');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-on');
    }, HOLD + FADE);
  }

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
