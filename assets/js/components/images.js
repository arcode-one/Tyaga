import { $$ } from '../core/dom.js';
export async function initImages() {
  $$('.ph__img').forEach((img) => {
    const drop = () => img.remove();
    if (img.complete && img.naturalWidth === 0) drop();
    else img.addEventListener('error', drop, { once: true });
  });
  const cache = new Map();
  await Promise.all($$('img[data-inline-svg]').map(async (img) => {
    try {
      const url = new URL(img.getAttribute('src'), document.baseURI);
      if (url.origin !== location.origin) return;
      if (!cache.has(url.href)) cache.set(url.href, fetch(url).then((response) => {
        if (!response.ok) throw new Error('Illustration unavailable');
        return response.text();
      }));
      const documentSvg = new DOMParser().parseFromString(await cache.get(url.href), 'image/svg+xml');
      const svg = documentSvg.documentElement;
      if (svg.localName !== 'svg') return;
      svg.querySelectorAll('style').forEach((style) => style.remove());
      svg.setAttribute('class', img.className);
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      img.replaceWith(document.importNode(svg, true));
    } catch { /* The local img remains as the static fallback. */ }
  }));
}
