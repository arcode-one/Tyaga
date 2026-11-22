import { body, header } from './dom.js';
import { reduce, hasGsap, gsap, ScrollTrigger } from './motion.js';
import Lenis from '../../vendor/lenis/lenis.mjs';
export function initScroll() {
  let lenis = null;
  if (Lenis && !reduce) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  const lockScroll = (on) => {
    body.classList.toggle('scroll-locked', on);
    if (lenis) on ? lenis.stop() : lenis.start();
  };

  const scrollToTarget = (el) => {
    const offset = -(header.offsetHeight + 12);
    if (lenis) lenis.scrollTo(el, { offset, duration: 1.4 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reduce ? 'auto' : 'smooth' });
  };
  return { lockScroll, scrollToTarget };
}
