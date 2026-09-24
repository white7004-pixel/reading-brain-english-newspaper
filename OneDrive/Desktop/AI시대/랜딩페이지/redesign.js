/* 리딩브레인 — useschool 디자인 언어 동작 레이어
   1) 스크롤 리빌  2) 가로 후기 캐러셀  3) 맨 위로 버튼
   되돌리려면 index.html에서 이 파일의 <script> 한 줄만 제거하세요. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* ── 1. 스크롤 리빌 ─────────────────────────────────────── */
  function initReveal() {
    var targets = document.querySelectorAll('.us-reveal');
    if (!targets.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* ── 2. 가로 후기 캐러셀 ────────────────────────────────── */
  function initReviewCarousel() {
    var root = document.querySelector('.us-reviews');
    if (!root) return;

    var viewport = root.querySelector('.us-reviews__viewport');
    var track = root.querySelector('.us-reviews__track');
    var prev = root.querySelector('.us-reviews__prev');
    var next = root.querySelector('.us-reviews__next');
    if (!viewport || !track) return;

    var offset = 0;

    function step() {
      var card = track.querySelector('.us-review');
      if (!card) return 340;
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 20;
      return card.getBoundingClientRect().width + gap;
    }

    function maxOffset() {
      return Math.max(0, track.scrollWidth - viewport.clientWidth);
    }

    function apply() {
      offset = Math.min(Math.max(offset, 0), maxOffset());
      track.style.transform = 'translate3d(' + -offset + 'px, 0, 0)';
      if (prev) prev.disabled = offset <= 0;
      if (next) next.disabled = offset >= maxOffset() - 1;
    }

    if (prev) prev.addEventListener('click', function () { offset -= step(); apply(); });
    if (next) next.addEventListener('click', function () { offset += step(); apply(); });

    // 터치 스와이프
    var startX = null;
    var startOffset = 0;
    viewport.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      startOffset = offset;
      track.style.transition = 'none';
    }, { passive: true });
    viewport.addEventListener('touchmove', function (e) {
      if (startX === null) return;
      offset = startOffset - (e.touches[0].clientX - startX);
      apply();
    }, { passive: true });
    viewport.addEventListener('touchend', function () {
      startX = null;
      track.style.transition = '';
    });

    window.addEventListener('resize', apply);
    apply();
  }

  /* ── 3. 맨 위로 ─────────────────────────────────────────── */
  function initBackToTop() {
    var btn = document.querySelector('.us-top');
    if (!btn) return;

    function toggle() {
      btn.classList.toggle('is-visible', window.pageYOffset > 600);
    }

    window.addEventListener('scroll', toggle, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    toggle();
  }

  ready(function () {
    initReveal();
    initReviewCarousel();
    initBackToTop();
  });
})();

/* 원서정독 결과물 — 처음 15장만 보이고 나머지는 버튼으로 편다.
   숨겨 두는 동안에는 lazy 이미지가 내려받아지지 않는다. */
(function () {
  var btn = document.getElementById('workMore');
  var grid = document.getElementById('workGrid');
  if (!btn || !grid) return;
  btn.addEventListener('click', function () {
    var open = grid.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = btn.getAttribute(open ? 'data-less' : 'data-more');
    if (!open) grid.scrollIntoView({ block: 'start' });
  });
})();

/* 단계 체험 도구 — 슬라이더와 버튼이 같은 값을 본다.
   자바스크립트가 붙기 전에는 세 단계가 모두 보이고, 붙으면 하나만 남는다. */
(function () {
  var range = document.getElementById('stageRange');
  var wrap = document.getElementById('stageExplorer');
  if (!range || !wrap) return;
  var tabs = [].slice.call(wrap.querySelectorAll('.stage-tab'));
  var panels = [].slice.call(wrap.querySelectorAll('.stage-panel'));

  function show(n) {
    panels.forEach(function (p) { p.hidden = Number(p.dataset.stage) !== n; });
    tabs.forEach(function (t) {
      var on = Number(t.dataset.stage) === n;
      t.classList.toggle('is-on', on);
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (range.value !== String(n)) range.value = String(n);
  }

  range.addEventListener('input', function () { show(Number(range.value)); });
  tabs.forEach(function (t) {
    t.addEventListener('click', function () { show(Number(t.dataset.stage)); });
  });
  show(Number(range.value));
})();
