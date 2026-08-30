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
});
