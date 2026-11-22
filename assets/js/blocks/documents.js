import { sliderBase as base, Swiper } from '../core/sliders.js';
import { $ } from '../core/dom.js';
export function initDocuments() {
  const element = $('[data-slider="docs"]');
  if (element) new Swiper(element, base());
}
