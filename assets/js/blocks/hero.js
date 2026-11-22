import { $, $$, header } from '../core/dom.js';
import { gsap } from '../core/motion.js';
export function initHero() {
  // заголовок по буквам (главная) или по словам (внутренние)
  const title = $('[data-split]');
  if (title) {
    const text = title.textContent.trim().replace(/\s+/g, ' ');
    const byWords = title.dataset.split === 'words';
    const parts = byWords ? text.split(' ') : [...text];
    const cls = byWords ? 'word' : 'char';
    title.setAttribute('aria-label', text);
    title.innerHTML = parts.map((p) => `<span class="${cls}" aria-hidden="true"><i>${p}</i></span>`).join(byWords ? ' ' : '');
  }
  const heroBg = $('.intro__parallax, .page-hero__ph');
  const hero = $('.intro, .page-hero');
  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  if (heroBg) intro.from(heroBg, { scale: 1.12, duration: 1.8, ease: 'power2.out' }, 0);
  if (title) intro.from($$('i', title), { yPercent: 110, duration: 1.1, stagger: .07, ease: 'power4.out' }, .15);
  if ($('[data-intro]')) intro.from('[data-intro]', { autoAlpha: 0, y: 30, duration: .8, stagger: .12 }, .6);
  // CSS owns header movement when scrolling; the entrance only fades it in.
  intro.from(header, { autoAlpha: 0, duration: .8, clearProps: 'opacity,visibility' }, .4);

  const mm = gsap.matchMedia();
  mm.add('(min-width: 769px)', () => {
    const layers = hero && heroBg ? $$('.intro__bg, .intro__content, .intro__numbers, .page-hero__bg, .page-hero__inner', hero) : [];
    if (layers.length) {
      gsap.to(layers, {
        y: () => hero.offsetHeight * 0.5,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
      });
    }
    // карта выезжает из-под тёмного блока с объектами
    const objects = $('.objects');
    if (!objects || !$('.geo')) return;
    gsap.from('.geo', {
      y: () => -objects.offsetHeight * 0.4,
      ease: 'none',
      scrollTrigger: {
        trigger: objects,
        start: 'bottom bottom',
        end: 'bottom top+=30%',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });
}
