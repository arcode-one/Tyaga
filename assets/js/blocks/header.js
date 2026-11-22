import { $$ } from '../core/dom.js';
export function initHeader() {
  // подсветка пункта меню по текущему блоку
  const navLinks = $$('.nav__link');
  const sections = navLinks.map((a) => a.hash && a.pathname === location.pathname ? document.getElementById(a.hash.slice(1)) : null).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => io.observe(s));
  }
}
