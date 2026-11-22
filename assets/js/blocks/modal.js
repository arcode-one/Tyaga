import { $, $$, body } from '../core/dom.js';
export function initModal(scroll, menu) {
  const { lockScroll } = scroll;
  let modal = null;
  let lastFocus = null;
  const openModal = (m, trigger) => {
    const title = $('.modal__title', m);
    const lead = $('.modal__lead', m);
    title.dataset.default ??= title.textContent;
    lead.dataset.default ??= lead.textContent;
    title.textContent = trigger.dataset.modalTitle || title.dataset.default;
    lead.textContent = trigger.dataset.modalLead || lead.dataset.default;
    $$('.form.is-sent', m).forEach((f) => { f.classList.remove('is-sent'); f.reset(); });
    if (trigger.dataset.vacancy) {
      const select = $('select[name="vacancy"]', m);
      if (select) select.value = trigger.dataset.vacancy;
    }
    modal = m;
    lastFocus = trigger;
    m.classList.add('is-open');
    m.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
    lockScroll(true);
    setTimeout(() => $('input', m).focus(), 300);
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
    lockScroll(false);
    modal = null;
    if (lastFocus) lastFocus.focus();
  };
  $$('[data-modal-open]').forEach((b) => b.addEventListener('click', () => {
    const m = document.getElementById(b.dataset.modalOpen || 'modal') || $('#modal');
    if (m) openModal(m, b);
  }));
  $$('[data-modal-close]').forEach((b) => b.addEventListener('click', closeModal));
  $$('.modal').forEach((m) => m.addEventListener('click', (e) => { if (e.target === m) closeModal(); }));
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (modal) closeModal();
    else if (body.classList.contains('menu-open')) menu.close();
  });
}
