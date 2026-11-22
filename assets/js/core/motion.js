import gsap from '../../vendor/gsap/gsap.mjs';
import ScrollTrigger from '../../vendor/gsap/scroll-trigger.mjs';
export { gsap, ScrollTrigger };
export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isMobile = () => matchMedia('(max-width: 768px)').matches;
export const hasGsap = Boolean(gsap && ScrollTrigger);
if (hasGsap) gsap.registerPlugin(ScrollTrigger);
