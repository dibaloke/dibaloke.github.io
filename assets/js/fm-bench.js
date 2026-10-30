(() => {
  'use strict';
  const search = document.querySelector('[data-fm-search]');
  if (!search) return;
  const rows = [...document.querySelectorAll('#fm-dataset-rows tr')];
  const count = document.querySelector('[data-fm-count]');
  const empty = document.querySelector('[data-fm-empty]');
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
  document.querySelector('[data-fm-search-label]').hidden = false;
  search.addEventListener('input', filter);
  filter();
})();
