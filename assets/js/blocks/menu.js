import { $, body } from '../core/dom.js';
import { reduce, hasGsap, gsap } from '../core/motion.js';
export function initMenu(scroll) {
  const { lockScroll } = scroll;
  const menu = $('#menu');
  const openMenu = () => {
    body.classList.add('menu-open');
    menu.setAttribute('aria-hidden', 'false');
    lockScroll(true);
    if (hasGsap && !reduce) {
      gsap.fromTo('.menu__nav a', { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .7, stagger: .06, delay: .25, ease: 'power3.out' });
    }
  };
  function closeMenu() {
    body.classList.remove('menu-open');
    menu.setAttribute('aria-hidden', 'true');
    lockScroll(false);
  }
  $('[data-menu-open]')?.addEventListener('click', openMenu);
  $('[data-menu-close]')?.addEventListener('click', closeMenu);
  return { close: closeMenu };
}
