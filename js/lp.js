/* =========================================================
   LP Método Balance Pro — lp.js | Sano Lab
   ========================================================= */

/* ── FAQ accordion ── */
document.querySelectorAll('.lp-faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.lp-faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.lp-faq-item').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.lp-faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ── Fade-in on scroll (respeita prefers-reduced-motion) ── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const styleEl = document.createElement('style');
  styleEl.textContent = '.lp-visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(styleEl);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('lp-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.lp-pain-card, .lp-pillar, .lp-benefit, .lp-price-card, .lp-curr-list li, .lp-forwhom-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .4s ease, transform .4s ease';
    observer.observe(el);
  });
}

document.addEventListener('scroll', () => {}, { passive: true });

/* ── Contador regressivo de oferta ── */
(function () {
  var els = document.querySelectorAll('.lp-countdown');
  if (!els.length) return;
  var KEY = 'promo-oferta-end';
  var HORAS = 48;
  var end = parseInt(localStorage.getItem(KEY) || '0');
  if (!end || end < Date.now()) {
    end = Date.now() + HORAS * 3600000;
    localStorage.setItem(KEY, end);
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    var rem = Math.max(0, end - Date.now());
    var h = Math.floor(rem / 3600000);
    var m = Math.floor((rem % 3600000) / 60000);
    var s = Math.floor((rem % 60000) / 1000);
    var str = pad(h) + ':' + pad(m) + ':' + pad(s);
    els.forEach(function (el) { el.textContent = str; });
  }
  tick();
  setInterval(tick, 1000);
})();
