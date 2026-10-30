/* Small progressive enhancements. Content remains accessible without JavaScript. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-navigation');
  if (menu && nav) {
    const closeMenu = () => menu.setAttribute('aria-expanded', 'false');
    menu.addEventListener('click', () => {
      menu.setAttribute('aria-expanded', String(menu.getAttribute('aria-expanded') !== 'true'));
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menu.focus();
      }
    });
  }
  const profile = document.querySelector('#profile');
  if (profile && nav) {
    const links = [...nav.querySelectorAll('a')];
    const profileLink = links.find(link => new URL(link.href).hash === '#profile');
    const homeLink = links.find(link => {
      const url = new URL(link.href);
      return url.pathname === location.pathname && !url.hash;
    });
    if (profileLink && homeLink) {
      let pending = false;
      const updateProfileLink = () => {
        const bounds = profile.getBoundingClientRect();
        const active = (window.scrollY > 40 || location.hash === '#profile') && bounds.top <= 150 && bounds.bottom > 150;
        profileLink.removeAttribute('aria-current');
        homeLink.removeAttribute('aria-current');
        (active ? profileLink : homeLink).setAttribute('aria-current', active ? 'location' : 'page');
        pending = false;
      };
      window.addEventListener('scroll', () => {
        if (!pending) {
          pending = true;
          requestAnimationFrame(updateProfileLink);
        }
      }, { passive: true });
      window.addEventListener('hashchange', updateProfileLink);
      updateProfileLink();
    }
  }
  document.querySelectorAll('[data-certificate-preview]').forEach(preview => {
    const showFallback = () => { preview.hidden = true; };
    preview.addEventListener('error', showFallback);
    if (preview.complete && preview.naturalWidth === 0) showFallback();
  });
  const library = document.querySelector('[data-publication-library]');
  if (!library) return;
  const filters = [...library.querySelectorAll('[data-filter]')];
  const papers = [...library.querySelectorAll('[data-publication]')];
  const search = library.querySelector('[data-publication-search]');
  const count = library.querySelector('[data-result-count]');
  const empty = library.querySelector('[data-empty-state]');
  let selectedFilter = 'all';
  const update = () => {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    papers.forEach(paper => {
      const matches = (selectedFilter === 'all' || paper.dataset.type === selectedFilter || paper.dataset.status === selectedFilter) && paper.dataset.search.includes(query);
      paper.hidden = !matches;
      if (matches) visible += 1;
    });
    count.textContent = `${visible} publication${visible === 1 ? '' : 's'}`;
    empty.hidden = visible !== 0;
  };
  filters.forEach(button => button.addEventListener('click', () => {
    selectedFilter = button.dataset.filter;
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    update();
  }));
  search.addEventListener('input', update);
})();
