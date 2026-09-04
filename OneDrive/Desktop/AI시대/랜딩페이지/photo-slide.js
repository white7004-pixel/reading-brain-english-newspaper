/* 학원 시설 갤러리 — 사진이 옆으로 계속 흘러가는 슬라이드
   HTML 은 건드리지 않고, 실행 시점에 사진을 복제해 끊김 없이 순환시킵니다.
   되돌리려면 index.html 에서 이 파일의 <script> 한 줄만 제거하세요. */
(function () {
  'use strict';

  var SPEED = 0.45;                 // px / frame (약 27px/초)
  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function initGallerySlider() {
    var track = document.querySelector('.gallery-grid');
    if (!track) return;

    var items = Array.prototype.slice.call(track.children);
    if (items.length < 2) return;

    // 끊김 없이 순환하도록 원본 묶음을 한 벌 더 붙인다.
    // 복제본은 보조 자료이므로 스크린리더에서는 감춘다.
    items.forEach(function (el) {
      var clone = el.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('tabindex', '-1');
      clone.dataset.clone = 'true';
      track.appendChild(clone);
    });

    // 원본 묶음의 폭 = 한 바퀴 길이
    function loopWidth() {
      return track.scrollWidth / 2;
    }

    var paused = false;
    var raf = null;

    function step() {
      if (!paused) {
        track.scrollLeft += SPEED;
        // 한 바퀴를 다 돌면 처음으로 조용히 되돌린다
        if (track.scrollLeft >= loopWidth()) {
          track.scrollLeft -= loopWidth();
        }
      }
      raf = window.requestAnimationFrame(step);
    }

    function play() { if (!raf) raf = window.requestAnimationFrame(step); }
    function stop() { if (raf) { window.cancelAnimationFrame(raf); raf = null; } }

    // 마우스를 올리거나 직접 넘기는 동안에는 멈춘다
    ['mouseenter', 'focusin', 'touchstart', 'pointerdown'].forEach(function (ev) {
      track.addEventListener(ev, function () { paused = true; }, { passive: true });
    });
    ['mouseleave', 'focusout', 'touchend', 'touchcancel', 'pointerup'].forEach(function (ev) {
      track.addEventListener(ev, function () { paused = false; }, { passive: true });
    });

    // 화면 밖으로 나가면 멈춰 배터리·CPU 를 아낀다
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? play() : stop(); });
      }, { threshold: 0 });
      io.observe(track);
    } else {
      play();
    }

    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : play();
    });

    if (reduce) stop();   // 움직임 최소화 설정이면 자동 이동하지 않는다
  }

  ready(initGallerySlider);
})();
