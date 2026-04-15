/* =========================================================
   Dr. Fabrício Costa — main.js | Sano Lab
   ========================================================= */

/* ── Header scroll ── */
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── Menu mobile ── */
const navToggle  = document.querySelector('.nav-toggle');
const navMobile  = document.querySelector('.nav-mobile');
if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    const open = navMobile.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // fechar ao clicar em link
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  // fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ── Active nav link ── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ── Fade-in on scroll ── */
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => {
    observer.observe(el);
  });
} else {
  // fallback sem IntersectionObserver
  fadeEls.forEach(el => el.classList.add('visible'));
}

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // fecha todos
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
    // abre o clicado (toggle)
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Formulário de contato ── */
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const nome    = form.querySelector('#nome')?.value.trim();
    const telefone = form.querySelector('#telefone')?.value.trim();
    const assunto = form.querySelector('#assunto')?.value || 'Site';
    const mensagem = form.querySelector('#mensagem')?.value.trim();

    const texto = `Olá, Dr. Fabrício! Vim pelo site.%0A%0ANome: ${encodeURIComponent(nome)}%0ATelefone: ${encodeURIComponent(telefone)}%0AAssunto: ${encodeURIComponent(assunto)}%0A%0A${encodeURIComponent(mensagem)}`;
    const numero = '5547992232316';

    btn.textContent = 'Redirecionando...';
    btn.disabled = true;

    setTimeout(() => {
      window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');
      btn.textContent = 'Enviar pelo WhatsApp';
      btn.disabled = false;
      form.reset();
    }, 600);
  });
}

/* ── Animação toggle hamburger ── */
if (navToggle) {
  const spans = navToggle.querySelectorAll('span');
  const observer = new MutationObserver(() => {
    const open = navMobile?.classList.contains('open');
    if (spans.length === 3) {
      spans[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
      spans[1].style.opacity   = open ? '0' : '';
      spans[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
    }
  });
  if (navMobile) observer.observe(navMobile, { attributes: true });
}
