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
    document.querySelectorAll('.faq-item__question').forEach((btn, i) => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-item__answer');
      const id = 'faq-answer-' + (i + 1);
      answer.id = id;
      btn.type = 'button';
      btn.setAttribute('aria-controls', id);
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', () => {
        const open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  }

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

  initExitIntent();

  function initExitIntent() {
    const modal = document.getElementById('exitModal');
    const closeBtn = document.getElementById('exitModalClose');
    if (!modal || !closeBtn) return;
    if (sessionStorage.getItem('exitIntentShown')) return;

    const show = () => {
      modal.hidden = false;
      sessionStorage.setItem('exitIntentShown', '1');
      document.removeEventListener('mouseout', onMouseOut);
    };
    const onMouseOut = (e) => {
      if (!e.relatedTarget && e.clientY <= 0) show();
    };
    document.addEventListener('mouseout', onMouseOut);

    closeBtn.addEventListener('click', () => { modal.hidden = true; });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.hidden = true;
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modal.hidden = true;
    });
  }

  initScrollReveal();
  initHeaderScroll();

  // 스크롤해서 화면에 들어오면 하나씩 나타나게 한다
  function initScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const targets = document.querySelectorAll([
      '.section__eyebrow', '.section__title', '.section__desc',
      '.compare-card', '.gallery-group', '.room-detail-card',
      '.card', '.vo-list li', '.facility-grid li', '.event-card',
      '.cta-band__inner > *', '.location__grid > *', '.faq-item'
    ].join(','));

    targets.forEach(el => el.classList.add('reveal'));

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    targets.forEach(el => io.observe(el));
  }

  // 맨 위를 벗어나면 머리띠를 얇게 바꾼다.
  // 스크롤 이벤트 대신 감시자를 쓴다 - 창이 아니라 다른 요소가 스크롤돼도 동작한다.
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header || !('IntersectionObserver' in window)) return;

    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:40px;pointer-events:none';
    document.body.prepend(sentinel);

    new IntersectionObserver(([entry]) => {
      header.classList.toggle('is-scrolled', !entry.isIntersecting);
    }).observe(sentinel);
  }

  initPauseOffscreen();

  // 화면 밖으로 나간 사진 띠는 멈춘다.
  // 폰에서 보이지도 않는 애니메이션이 계속 도는 것이 끊김의 큰 몫이다.
  function initPauseOffscreen() {
    if (!('IntersectionObserver' in window)) return;
    const tracks = document.querySelectorAll('.gallery-track, .review-track');
    if (!tracks.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-offscreen', !entry.isIntersecting);
      });
    }, { rootMargin: '120px 0px' });

    // 도는 상태로 시작한다. 감시자가 화면을 벗어난 것을 본 뒤에만 멈춘다.
    // 이렇게 해야 감시자가 어긋나도 갤러리가 멈춘 채로 굳지 않는다.
    tracks.forEach(t => io.observe(t));
  }
});
