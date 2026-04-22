'use strict';

const SITE_INDEX = [
  { title: 'Prima Materia', url: 'pages/prima-materia.html', desc: 'Chaos before creation; the unformed substrate of the work.' },
  { title: 'Four Elements', url: 'pages/four-elements.html', desc: 'Earth, Water, Air, Fire, and the hidden quinta essentia.' },
  { title: 'Tria Prima', url: 'pages/sulphur-mercury-salt.html', desc: 'Sulphur, Mercury, and Salt as body-soul-spirit grammar.' },
  { title: 'Seven Metals', url: 'pages/seven-metals.html', desc: 'Planetary metals and the ladder from lead to gold.' },
  { title: 'Nigredo', url: 'pages/nigredo.html', desc: 'Blackening, dissolution, dark night, and death of false form.' },
  { title: 'Albedo', url: 'pages/albedo.html', desc: 'Whitening, washing, and the moonlit purification phase.' },
  { title: 'Citrinitas', url: 'pages/citrinitas.html', desc: 'Yellow dawn; wisdom emerging before full solar union.' },
  { title: 'Rubedo', url: 'pages/rubedo.html', desc: 'Red phase, coniunctio, and transformative completion.' },
  { title: "Philosopher's Stone", url: 'pages/philosophers-stone.html', desc: 'The lapis as synthesis of grace, matter, and spirit.' },
  { title: 'Opus Magnum', url: 'pages/opus-magnum.html', desc: 'The full process map in alchemical, theological, and Jungian parallel.' },
  { title: 'Jung & Alchemy', url: 'pages/jung.html', desc: 'Depth psychology in dialogue with Christian theology.' },
  { title: 'Bibliography', url: 'pages/bibliography.html', desc: 'Primary and secondary sources for deeper study.' },
  { title: 'Cross-Reference Index', url: 'pages/cross-reference.html', desc: 'Filter terms by scripture, category, and Jungian concept.' },
  { title: 'Symbol Gallery', url: 'pages/symbol-gallery.html', desc: 'Visual catalog of alchemical symbols and motifs.' }
];

function initSiteSearch() {
  const wrapper = document.querySelector('[data-site-search]');
  const input = document.getElementById('home-search-input');
  const results = document.getElementById('home-search-results');
  if (!wrapper || !input || !results) return;

  const render = (items) => {
    results.innerHTML = items.slice(0, 6).map((item) => `
      <li>
        <a href="${item.url}">
          <article class="home-search__result">
            <h3 class="home-search__result-title">${item.title}</h3>
            <p class="home-search__result-desc">${item.desc}</p>
          </article>
        </a>
      </li>
    `).join('');
  };

  const search = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) return SITE_INDEX;
    return SITE_INDEX.filter((item) => (
      item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    ));
  };

  input.addEventListener('input', () => render(search(input.value)));

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    }
  });

  render(SITE_INDEX);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSiteSearch);
} else {
  initSiteSearch();
}
