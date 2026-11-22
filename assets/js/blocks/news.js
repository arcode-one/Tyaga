import { sliderBase as base, Swiper } from '../core/sliders.js';
import { $ } from '../core/dom.js';
import { isMobile } from '../core/motion.js';
export function initNews() {
  const newsEl = $('[data-slider="news"]');
  if (newsEl && isMobile()) new Swiper(newsEl, base());
}
