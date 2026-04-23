'use strict';

(function () {
  const CAT_CLASS = {
    'Foundational Principles': 'cat-foundational',
    'Four Elements': 'cat-elements',
    'Tria Prima': 'cat-tria',
    'Stages of the Opus': 'cat-stages',
    'Alchemical Operations': 'cat-operations',
    'Seven Metals': 'cat-metals'
  };

  function bookName(ref) {
    const m = ref.match(/^([1-3]?\s*[A-Za-z]+)/);
    return m ? m[0].trim() : ref;
  }

  function esc(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlight(text, query) {
    if (!query) return text;
    return text.replace(new RegExp(`(${esc(query)})`, 'gi'), '<mark>$1</mark>');
  }

  function initMobileFilters() {
    const bar = document.querySelector('.filter-bar');
    const toggle = document.getElementById('filter-more-toggle');
    const advanced = document.getElementById('advanced-filters');

    if (!bar || !toggle || !advanced) return;

    const syncToggleLabel = () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.textContent = expanded ? 'Fewer filters' : 'More filters';
    };

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      const nextState = !expanded;
      toggle.setAttribute('aria-expanded', String(nextState));
      bar.classList.toggle('is-expanded', nextState);
      syncToggleLabel();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 767) {
        bar.classList.remove('is-expanded');
        toggle.setAttribute('aria-expanded', 'false');
        syncToggleLabel();
      }
    });

    syncToggleLabel();
  }

  let allEntries = [];

  function buildCard(e, query) {
    const catClass = CAT_CLASS[e.category] || '';
    const hName = highlight(e.alchemical_term, query);
    const hLatin = highlight(e.latin, query);
    const hCategory = highlight(e.category, query);
    const theoryCells = e.theological_correlates.map((t) => `<li>${highlight(t, query)}</li>`).join('');
    const scriptureCells = e.scripture.map((s) => `<li class="scripture-ref">${highlight(s, query)}</li>`).join('');
    const jungianCells = e.jungian.map((j) => `<li>${highlight(j, query)}</li>`).join('');
    const pageBase = e.page;

    return `
      <article class="xref-entry ${catClass}" data-id="${e.id}">
        <div class="entry-term">
          <div class="entry-term__name">${hName}</div>
          <div class="entry-term__latin">${hLatin}</div>
          <span class="entry-term__category">${hCategory}</span>
        </div>
        <div>
          <p class="entry-col__label">Theological Correlates</p>
          <ul class="tag-list">${theoryCells}</ul>
        </div>
        <div>
          <p class="entry-col__label">Scripture</p>
          <ul class="scripture-list">${scriptureCells}</ul>
        </div>
        <div>
          <p class="entry-col__label">Jungian</p>
          <ul class="tag-list">${jungianCells}</ul>
        </div>
        <div class="entry-link-col">
          <a href="${pageBase}" class="entry-link-btn" aria-label="Read full entry on ${e.alchemical_term}">
            Read →
          </a>
        </div>
      </article>`;
  }

  function populateFilters(entries) {
    const categories = [...new Set(entries.map((e) => e.category))].sort();
    const books = [...new Set(entries.flatMap((e) => e.scripture.map(bookName)))].sort();
    const jungianTerms = [...new Set(entries.flatMap((e) => e.jungian))].sort();

    const catSel = document.getElementById('category-filter');
    categories.forEach((c) => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      catSel.appendChild(opt);
    });

    const scripSel = document.getElementById('scripture-filter');
    books.forEach((b) => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b;
      scripSel.appendChild(opt);
    });

    const jungSel = document.getElementById('jungian-filter');
    jungianTerms.forEach((j) => {
      const opt = document.createElement('option');
      opt.value = j;
      opt.textContent = j;
      jungSel.appendChild(opt);
    });
  }

  function applyFilters() {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    const category = document.getElementById('category-filter').value;
    const book = document.getElementById('scripture-filter').value;
    const jungian = document.getElementById('jungian-filter').value;

    const grid = document.getElementById('xref-grid');
    const empty = document.getElementById('empty-state');
    let count = 0;

    grid.innerHTML = '';

    const filtered = allEntries.filter((e) => {
      if (category && e.category !== category) return false;
      if (book && !e.scripture.some((s) => bookName(s) === book)) return false;
      if (jungian && !e.jungian.some((j) => j === jungian)) return false;
      if (query) {
        const blob = [e.alchemical_term, e.latin, e.category, ...e.theological_correlates, ...e.scripture, ...e.jungian]
          .join(' ')
          .toLowerCase();
        if (!blob.includes(query)) return false;
      }
      return true;
    });

    filtered.forEach((e) => {
      grid.insertAdjacentHTML('beforeend', buildCard(e, query));
      count++;
    });

    document.getElementById('count-num').textContent = count;
    empty.classList.toggle('is-visible', count === 0);
  }

  function init(data) {
    allEntries = data.entries;
    populateFilters(allEntries);
    initMobileFilters();

    document.getElementById('search-input').addEventListener('input', applyFilters);
    document.getElementById('category-filter').addEventListener('change', applyFilters);
    document.getElementById('scripture-filter').addEventListener('change', applyFilters);
    document.getElementById('jungian-filter').addEventListener('change', applyFilters);
    document.getElementById('filter-reset').addEventListener('click', () => {
      document.getElementById('search-input').value = '';
      document.getElementById('category-filter').value = '';
      document.getElementById('scripture-filter').value = '';
      document.getElementById('jungian-filter').value = '';
      applyFilters();
    });

    applyFilters();
  }

  fetch('../data/cross-reference.json')
    .then((r) => r.json())
    .then(init)
    .catch((err) => {
      document.getElementById('empty-state').classList.add('is-visible');
      document.getElementById('empty-state').innerHTML = '<span class="empty-state__text">Could not load index data.</span>';
      console.error('Cross-reference load error:', err);
    });
})();
