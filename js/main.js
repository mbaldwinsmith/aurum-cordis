'use strict';

/* ============================================================
   INTERSECTION OBSERVER — animate-on-scroll
   ============================================================ */

function initScrollAnimations() {
  const targets = document.querySelectorAll('.animate-on-scroll');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ============================================================
   SMOOTH ANCHOR SCROLL
   ============================================================ */

function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href').slice(1);
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72',
      10
    );
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}

/* ============================================================
   ACTIVE NAV LINK — highlights link matching current page
   ============================================================ */

function initActiveNav() {
  const links = document.querySelectorAll('.nav__link');
  const current = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop();
    if (linkPage === current || (current === '' && linkPage === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ============================================================
   MOBILE HAMBURGER MENU
   ============================================================ */

function initHamburger() {
  const btn = document.querySelector('.nav__hamburger');
  const links = document.querySelector('.nav__links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('open', !expanded);
  });

  // Close on nav link click (mobile)
  links.addEventListener('click', (e) => {
    if (e.target.closest('.nav__link')) {
      btn.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      btn.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
    }
  });
}

/* ============================================================
   NAV SCROLL EFFECT
   ============================================================ */

function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const update = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ============================================================
   SCROLL TO TOP BUTTON
   ============================================================ */

function initScrollToTop() {
  const btn = document.querySelector('.scroll-to-top');
  if (!btn) return;

  const THRESHOLD = 400;

  window.addEventListener(
    'scroll',
    () => btn.classList.toggle('visible', window.scrollY > THRESHOLD),
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   GRAIN OVERLAY SVG FILTER
   ============================================================ */

function injectGrainFilter() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
  svg.innerHTML = `
    <defs>
      <filter id="grain" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
        <feColorMatrix type="saturate" values="0" in="noise" result="grey"/>
        <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="blend"/>
      </filter>
    </defs>`;
  document.body.prepend(svg);
}

/* ============================================================
   FOOTNOTE BACK-LINKS
   Adds return arrows to footnote entries that link to the ref
   ============================================================ */

function initFootnotes() {
  const refs = document.querySelectorAll('sup.footnote-ref[data-fn]');
  refs.forEach((ref) => {
    const id = ref.dataset.fn;
    ref.id = `fnref-${id}`;
    const note = document.getElementById(`fn-${id}`);
    if (note && !note.querySelector('.fn-back')) {
      const back = document.createElement('a');
      back.href = `#fnref-${id}`;
      back.className = 'fn-back';
      back.setAttribute('aria-label', 'Return to text');
      back.textContent = ' ↩';
      note.appendChild(back);
    }
  });
}

/* ============================================================
   BOOT
   ============================================================ */

function init() {
  injectGrainFilter();
  initScrollAnimations();
  initSmoothScroll();
  initActiveNav();
  initHamburger();
  initNavScroll();
  initScrollToTop();
  initFootnotes();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
