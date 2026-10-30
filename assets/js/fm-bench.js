(() => {
  'use strict';
  document.querySelectorAll('[data-fm-inventory]').forEach(inventory => {
    const search = inventory.querySelector('[data-fm-search]');
    if (!search) return;
    const rows = [...inventory.querySelectorAll('tbody tr')];
    const count = inventory.querySelector('[data-fm-count]');
    const empty = inventory.querySelector('[data-fm-empty]');
    const entries = rows.map(row => ({ row, text: row.textContent.toLowerCase() }));
    function filter() {
      const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      let shown = 0;
      entries.forEach(({ row, text }) => {
        row.hidden = !terms.every(term => text.includes(term));
        if (!row.hidden) shown++;
      });
      count.textContent = `${shown} of ${rows.length} datasets`;
      empty.hidden = shown !== 0;
    }
    inventory.querySelector('[data-fm-search-label]').hidden = false;
    search.addEventListener('input', filter);
    filter();
  });
})();
