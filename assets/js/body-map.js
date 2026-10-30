(() => {
  'use strict';
  const host = document.querySelector('[data-body-map]');
  if (!host) return;
  const controls = [...host.querySelectorAll('[data-organ]')];
  const panels = [...host.querySelectorAll('[data-organ-detail]')];
  const ids = new Set(panels.map(panel => panel.dataset.organDetail));
  function select(id) {
    if (!ids.has(id)) return;
    controls.forEach(control => control.setAttribute('aria-pressed', String(control.dataset.organ === id)));
    panels.forEach(panel => { panel.hidden = panel.dataset.organDetail !== id; });
  }
  host.addEventListener('click', event => {
    const control = event.target.closest('[data-organ]');
    if (control) select(control.dataset.organ);
  });
  host.querySelectorAll('.fm-organ-marker').forEach(marker => {
    marker.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select(marker.dataset.organ);
      }
    });
  });
  host.classList.add('fm-body-ready');
})();
