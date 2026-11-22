import { iconMarkup } from '../core/icons.js';
import * as L from '../../vendor/leaflet/leaflet.mjs';
export function initGeography() {
  const canvas = document.querySelector('[data-geo-map]');
  if (!canvas) return;

  const section = canvas.closest('.geo');
  const fallback = section.querySelector('[data-map-fallback]');
  const sources = [...section.querySelectorAll('[data-geo-pins] .geo__pin')];
  let started = false;

  const unavailable = () => {
    fallback.hidden = false;
    section.classList.add('geo--unavailable');
  };

  const start = () => {
    if (started) return;
    started = true;

    const map = L.map(canvas, {
      scrollWheelZoom: false,
      minZoom: 4,
      maxZoom: 12,
      zoomControl: false,
    });
    map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer">Leaflet</a>');
    L.control.zoom({ position: 'topright', zoomInTitle: 'Приблизить', zoomOutTitle: 'Отдалить', zoomInText: iconMarkup('plus'), zoomOutText: iconMarkup('minus') }).addTo(map);

    let loadedTiles = 0;
    const tiles = L.tileLayer(canvas.dataset.tileUrl, {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
    });
    tiles.on('tileload', () => {
      loadedTiles++;
      fallback.hidden = true;
      section.classList.remove('geo--unavailable');
    });
    tiles.on('load', () => { if (!loadedTiles) unavailable(); });
    tiles.addTo(map);

    const locations = [];
    sources.forEach((source) => {
      // City centres indicate regional presence, not an individual site's address.
      const location = [Number(source.dataset.lat), Number(source.dataset.lng)];
      if (!location.every(Number.isFinite)) return;
      locations.push(location);
      const original = source.querySelector('.geo__point');
      const name = original.getAttribute('aria-label');
      const hq = source.classList.contains('geo__pin--hq');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'geo__marker-button' + (hq ? ' geo__marker-button--hq' : '');
      button.setAttribute('aria-label', name);
      button.setAttribute('aria-expanded', 'false');
      button.innerHTML = '<span class="geo__marker-dot" aria-hidden="true"></span>';

      const content = document.createElement('div');
      content.className = 'geo__popup-content';
      const icons = document.createElement('div');
      icons.className = 'geo__popup-icons';
      original.querySelectorAll('svg').forEach((icon) => icons.append(icon.cloneNode(true)));
      content.append(icons);
      source.querySelectorAll('.geo__pop > *').forEach((item) => content.append(item.cloneNode(true)));

      const marker = L.marker(location, {
        keyboard: false,
        zIndexOffset: hq ? 100 : 0,
        icon: L.divIcon({ className: 'geo__marker', html: button, iconSize: [44, 44], iconAnchor: [22, 22], popupAnchor: [0, -12] }),
      }).addTo(map);
      marker.bindTooltip(name, { direction: 'top', offset: [0, -12], className: 'geo__tooltip' });
      marker.bindPopup(content, {
        className: 'geo__popup', minWidth: 210, maxWidth: 270,
        autoPanPaddingTopLeft: [20, 164], autoPanPaddingBottomRight: [20, 20],
      });
      marker.on('popupopen', (event) => {
        button.setAttribute('aria-expanded', 'true');
        button.classList.add('is-active');
        const close = event.popup.getElement().querySelector('.leaflet-popup-close-button');
        close.setAttribute('aria-label', 'Закрыть карточку города');
        close.setAttribute('title', 'Закрыть карточку города');
        close.innerHTML = iconMarkup('x');
      });
      marker.on('popupclose', () => {
        button.setAttribute('aria-expanded', 'false');
        button.classList.remove('is-active');
      });
      button.addEventListener('click', (event) => {
        L.DomEvent.stopPropagation(event);
        marker.openPopup();
      });
      button.addEventListener('focus', () => marker.openTooltip());
      button.addEventListener('blur', () => marker.closeTooltip());
      button.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') { map.closePopup(); marker.closeTooltip(); }
      });
    });

    const bounds = L.latLngBounds(locations);
    const showAll = () => {
      map.closePopup();
      map.invalidateSize();
      const padding = matchMedia('(max-width: 768px)').matches ? [24, 48] : [80, 64];
      map.fitBounds(bounds, { padding, maxZoom: 6, animate: false });
    };
    const ResetControl = L.Control.extend({
      options: { position: 'topright' },
      onAdd() {
        const container = L.DomUtil.create('div', 'geo__reset leaflet-control');
        const button = L.DomUtil.create('button', '', container);
        button.type = 'button';
        button.innerHTML = iconMarkup('locate-fixed') + '<span>Все города</span>';
        button.addEventListener('click', showAll);
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);
        return container;
      },
    });
    new ResetControl().addTo(map);
    showAll();

    let resizeFrame = 0;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(showAll);
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        start();
        observer.disconnect();
      }
    }, { rootMargin: '300px' });
    observer.observe(canvas);
  } else start();
}
