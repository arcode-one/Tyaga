export function initVacancies() {
  const openFromHash = () => {
    const el = location.hash.length > 1 ? document.getElementById(location.hash.slice(1)) : null;
    if (el && el.tagName === 'DETAILS') el.open = true;
  };
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
}
