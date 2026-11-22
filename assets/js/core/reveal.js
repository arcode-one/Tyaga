import { $$ } from './dom.js';
import { gsap } from './motion.js';
export function initReveal() {
  $$('main section:not(.intro)').forEach((section) => {
    const items = $$('[data-reveal]', section);
    if (!items.length) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none none' },
      defaults: { duration: .7, ease: 'power2.out' },
    });
    items.forEach((el, i) => {
      const targets = el.dataset.reveal === 'stagger' ? Array.from(el.children).slice(0, 6) : el;
      tl.from(targets, { autoAlpha: 0, y: 30, stagger: .12, clearProps: 'opacity,visibility,transform' }, i ? '>-=0.45' : 0);
    });
  });
}
