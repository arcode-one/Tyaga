import { $, body } from './dom.js';
export function initAnchors(scroll, menu) {
  const { scrollToTarget } = scroll;
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length < 2) { e.preventDefault(); return; }
    const target = $(id);
    if (!target) return;
    e.preventDefault();
    if (body.classList.contains('menu-open')) menu.close();
    scrollToTarget(target);
  });
}
