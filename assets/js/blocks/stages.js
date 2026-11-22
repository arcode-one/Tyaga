import { sliderBase as base, Swiper } from '../core/sliders.js';
import { $ } from '../core/dom.js';
export function initStages() {
  const stagesEl = $('[data-slider="stages"]');
    if (stagesEl) {
      new Swiper(stagesEl, {
        ...base(),
        navigation: { prevEl: '[data-prev="stages"]', nextEl: '[data-next="stages"]' },
      });
    }
}
