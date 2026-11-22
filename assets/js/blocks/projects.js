import { $$ } from '../core/dom.js';
import { reduce, hasGsap, gsap, ScrollTrigger } from '../core/motion.js';
export function initProjects() {
  const filters = $$('.filter');
  const pcards = $$('.pcard[data-type]');
  filters.forEach((btn) => btn.addEventListener('click', () => {
    const type = btn.dataset.filter;
    filters.forEach((b) => {
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });
    const shown = [];
    pcards.forEach((card) => {
      const on = type === 'all' || card.dataset.type === type;
      card.classList.toggle('is-hidden', !on);
      if (on) shown.push(card);
    });
    if (hasGsap && !reduce) {
      gsap.fromTo(shown, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .5, stagger: .06, ease: 'power2.out', clearProps: 'opacity,visibility,transform' });
      ScrollTrigger.refresh();
    }
  }));
}
