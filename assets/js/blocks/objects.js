import { sliderBase as base, Swiper } from '../core/sliders.js';
import { $ } from '../core/dom.js';
import { reduce, isMobile } from '../core/motion.js';
export function initObjects() {
  const objectsEl = $('[data-slider="objects"]');
    if (objectsEl) {
      if (isMobile() || reduce) {
        new Swiper(objectsEl, base());
      } else {
        // бесконечной ленте нужно карточек на несколько экранов, иначе Swiper выключает loop
        // и влево листать некуда. Если карточек мало (страницы направлений), дублируем их.
        const wrap = $('.swiper-wrapper', objectsEl);
        const originals = Array.from(wrap.children);
        while (originals.length && wrap.children.length < Math.max(12, originals.length * 2)) {
          originals.forEach((card) => {
            const copy = card.cloneNode(true);
            copy.setAttribute('aria-hidden', 'true');
            copy.setAttribute('tabindex', '-1');
            wrap.appendChild(copy);
          });
        }
        const s = new Swiper(objectsEl, {
          slidesPerView: 'auto',
          loop: true,
          speed: 5000,
          grabCursor: true,
          autoplay: { delay: 0, disableOnInteraction: true },
          on: {
            autoplayStop() {
              this.params.speed = 600;
              objectsEl.classList.add('is-dragged');
            },
          },
        });
        objectsEl.addEventListener('mouseenter', () => s.autoplay && s.autoplay.running && s.autoplay.pause());
        objectsEl.addEventListener('mouseleave', () => s.autoplay && s.autoplay.paused && s.autoplay.resume());
      }
    }
}
