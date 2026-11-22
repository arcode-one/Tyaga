import { $$ } from '../core/dom.js';
import { gsap } from '../core/motion.js';
export function initAchievements() {
  const fmt = (n) => n.toLocaleString('ru-RU');
  $$('[data-count]').forEach((el) => {
    const to = Number(el.dataset.count);
    const state = { v: 0 };
    el.textContent = '0';
    gsap.to(state, {
      v: to,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      onUpdate: () => { el.textContent = fmt(Math.round(state.v)); },
    });
  });
}
