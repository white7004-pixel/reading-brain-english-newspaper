/* 우측 섹션 도트 내비게이션
   페이지가 매우 길어(약 38,000px) 지금 어디쯤인지 알기 어렵다.
   현재 위치를 점으로 표시하고, 점을 누르면 해당 섹션으로 이동한다.
   HTML 은 건드리지 않고 실행 시점에 만들어 붙인다.
   되돌리려면 index.html 에서 이 파일의 <script> 한 줄만 제거하세요. */
(function () {
  'use strict';

  // 표시할 섹션 — 순서대로. [앵커, 라벨]
  var SECTIONS = [
    ['top',          '처음'],
    ['director',     '원장 인사'],
    ['philosophy',   '교육철학'],
    ['programs',     '커리큘럼'],
    ['heidi',        '원서 정독 9단계'],
    ['diagnostic',   '레벨 진단'],
    ['hall',         '성과'],
    ['testimonials', '학부모 후기'],
    ['gallery',      '학원 시설'],
    ['location',     '오시는 길']
  ];

  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    // 실제로 존재하는 섹션만 남긴다
    var items = SECTIONS
      .map(function (s) {
        var el = s[0] === 'top' ? document.body : document.getElementById(s[0]);
        return el ? { id: s[0], label: s[1], el: el } : null;
      })
      .filter(Boolean);

    if (items.length < 3) return;

    var nav = document.createElement('nav');
    nav.className = 'dotnav';
    nav.setAttribute('aria-label', '섹션 바로가기');

    items.forEach(function (it) {
      var a = document.createElement('a');
      a.className = 'dotnav__dot';
      a.href = it.id === 'top' ? '#' : '#' + it.id;
      a.setAttribute('aria-label', it.label);
      a.innerHTML = '<i aria-hidden="true"></i><span>' + it.label + '</span>';
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var y = it.id === 'top' ? 0 : it.el.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
      });
      it.dot = a;
      nav.appendChild(a);
    });

    document.body.appendChild(nav);

    // 화면 중앙에 걸린 섹션을 현재 위치로 본다
    function update() {
      var mid = window.pageYOffset + window.innerHeight * 0.35;
      var current = items[0];
      items.forEach(function (it) {
        var top = it.id === 'top' ? 0 : it.el.getBoundingClientRect().top + window.pageYOffset;
        if (top <= mid) current = it;
      });
      items.forEach(function (it) {
        it.dot.classList.toggle('is-on', it === current);
      });
      // 히어로를 벗어나면 나타난다
      nav.classList.toggle('is-visible', window.pageYOffset > window.innerHeight * 0.6);
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { update(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();
