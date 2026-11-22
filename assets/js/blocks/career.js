import { sliderBase as base, Swiper } from '../core/sliders.js';
import { $ } from '../core/dom.js';
export function initCareer() {
  const element = $('[data-slider="career"]');
  if (element) new Swiper(element, base());
}
