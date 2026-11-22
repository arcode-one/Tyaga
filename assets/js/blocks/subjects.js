import { $, $$ } from '../core/dom.js';
import { reduce, hasGsap, gsap, ScrollTrigger } from '../core/motion.js';
export function initSubjects() {
  const subjects = $('.subjects');
  if (subjects) {
    const tabs = $$('.subjects__tab', subjects);
    const imgs = $$('.subjects__img', subjects);
    const nums = $$('.subjects__nums', subjects);
    const panels = $$('.subjects__panel', subjects);
    let current = 0;
    let prevTimer = 0;
    const setSubject = (i) => {
      if (i === current) return;
      // старая картинка остаётся под новой, пока та выезжает шторкой
      const prev = imgs[current];
      imgs.forEach((el) => el.classList.remove('is-prev'));
      prev.classList.add('is-prev');
      clearTimeout(prevTimer);
      prevTimer = setTimeout(() => prev.classList.remove('is-prev'), 950);
      [imgs, nums, panels].forEach((list) => list.forEach((el, j) => el.classList.toggle('is-active', j === i)));
      tabs.forEach((t, j) => {
        t.classList.toggle('is-active', j === i);
        t.setAttribute('aria-pressed', String(j === i));
      });
      if (hasGsap && !reduce) {
        gsap.fromTo(panels[i].children, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .6, stagger: .08, ease: 'power2.out' });
        gsap.fromTo(nums[i].children, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .5, stagger: .08, ease: 'power2.out' });
      }
      current = i;
      if (hasGsap) ScrollTrigger.refresh();
    };
    tabs.forEach((t, i) => t.addEventListener('click', () => setSubject(i)));
  }
}
