import { $$ } from '../core/dom.js';
import { gsap } from '../core/motion.js';
export function initCta() {
  const ducts = $$('.cta__duct');
  if (ducts.length) {
    const len = ducts[0].getTotalLength();
    gsap.set(ducts, { strokeDasharray: len, strokeDashoffset: len });
    gsap.timeline({
      scrollTrigger: { trigger: '.cta', start: 'top 70%', end: 'center 50%', scrub: 0.6 },
    })
      .to(ducts, { strokeDashoffset: 0, ease: 'none', duration: 1 })
      .from('.cta__diff', { autoAlpha: 0, scaleX: .6, transformOrigin: '50% 0%', duration: .2 }, '>-0.05')
      .from('.cta__air', { autoAlpha: 0, y: -8, duration: .2 });
  }
}
