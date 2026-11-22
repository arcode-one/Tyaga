import { $ } from './dom.js';
import Swiper from '../../vendor/swiper/swiper.mjs';
export { Swiper };
export const pad = () => parseFloat(getComputedStyle($('.container')).paddingLeft) || 16;
export const sliderBase = () => ({ slidesPerView: 'auto', speed: 600, grabCursor: true, slidesOffsetBefore: pad(), slidesOffsetAfter: pad() });
