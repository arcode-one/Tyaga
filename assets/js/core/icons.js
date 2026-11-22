const sprite = new URL('../../icons/lucide/sprite.svg', import.meta.url).href;
const names = new Set(['plus', 'minus', 'x', 'locate-fixed']);
export function iconMarkup(name) {
  if (!names.has(name)) throw new Error('Unknown dynamic icon: ' + name);
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="${sprite}#${name}"></use></svg>`;
}
