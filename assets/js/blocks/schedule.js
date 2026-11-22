import { $ } from '../core/dom.js';
import { gsap } from '../core/motion.js';
export function initSchedule() {
  if ($('.gantt__bar')) {
    gsap.from('.gantt__bar', {
      scaleX: 0,
      duration: .9,
      stagger: .1,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: '.gantt', start: 'top 75%', toggleActions: 'play none none none' },
    });
  }
}
