import { $$ } from '../core/dom.js';
export function initForms() {
  $$('.form').forEach((form) => form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    $$('input[required]', form).forEach((input) => {
      const bad = input.value.trim().length < 2;
      input.closest('.field').classList.toggle('is-error', bad);
      if (bad) ok = false;
    });
    if (!ok) return;
    // TODO: отправка в Telegram-бота через серверную функцию
    form.classList.add('is-sent');
  }));
}
