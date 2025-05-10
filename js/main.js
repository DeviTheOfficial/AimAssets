// js/main.js

const cardData = [
  {
    label: 'Audio',
    img: 'assets/images/audio.png',
    description: 'Music, Sound Effects, Dialogue/Voice, Audio Mixers/Presets',
    url: 'cards/audio.html'
  },
  {
    label: 'Visual',
    img: 'assets/images/visual.png',
    description: 'Textures & Sprites, Models & Meshes, Materials & Shaders, Animations, VFX',
    url: 'cards/visual.html'
  },
  {
    label: 'Code & Logic',
    img: 'assets/images/code-logic.png',
    description: 'Gameplay Systems, AI & Pathfinding, UI & HUD, Input & Controls, Analytics & Telemetry',
    url: 'cards/code-logic.html'
  },
  {
    label: 'Scenes & Levels',
    img: 'assets/images/scenes-levels.png',
    description: 'Game Levels, Menus & Overlays, Persistent Managers',
    url: 'cards/scenes-levels.html'
  },
  {
    label: 'Data & Config',
    img: 'assets/images/data-config.png',
    description: 'Buildable Data, Addressables/Catalogs, Save/Load Schemas, Configuration Tables',
    url: 'cards/data-config.html'
  },
  {
    label: 'UI',
    img: 'assets/images/ui.png',
    description: 'Fonts & Typography, Iconography & Buttons, Layout Prefabs/Templates',
    url: 'cards/ui.html'
  },
  {
    label: 'Templates',
    img: 'assets/images/templates-prefabs.png',
    description: 'Templates for all types of assets',
    url: 'cards/templates-prefabs.html'
  },
  {
    label: 'Documentation & Artifacts',
    img: 'assets/images/documentation.png',
    description: 'Design Docs & GDDs, Technical Docs, Style Guides',
    url: 'cards/documentation.html'
  },
  {
    label: 'Full Projects',
    img: 'assets/images/full-projects.png',
    description: 'Automated Tests, Build Pipelines',
    url: 'cards/tests-ci.html'
  },
  {
    label: 'Plugins & SDKs',
    img: 'assets/images/plugins-sdks.png',
    description: 'Third-Party Libraries, Native Plugins',
    url: 'cards/plugins-sdks.html'
  },
  {
    label: 'Performance & Optimization',
    img: 'assets/images/performance.png',
    description: 'Profiling Data, Build Settings, Optimization Assets, Automated Tests, CI Pipelines',
    url: 'cards/performance.html'
  },
  {
    label: 'Localization & Accessibility',
    img: 'assets/images/localization.png',
    description: 'String Tables, Font Fallbacks & RTL Support, Subtitle Tracks & Audio Localizations, Accessibility Settings',
    url: 'cards/localization-accessibility.html'
  },
  
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    const grid        = document.getElementById('craft-grid');
    const searchInput = document.getElementById('search');
    const randomBtn   = document.getElementById('random-btn');
    const sound       = document.getElementById('click-sound');
  
    function renderCards(cards) {
      grid.innerHTML = '';
      cards.forEach(({ label, img, description, url }) => {
        const card = document.createElement('a');
        card.className     = 'card';
        card.href          = url;
        card.target        = '_self';
        card.dataset.label = label;
        card.innerHTML = `
          <div class="card-inner">
            <div class="card-front">
              <img src="${img}" alt="${label}" />
              <div class="label">${label}</div>
            </div>
            <div class="card-back">
              <p>${description}</p>
            </div>
          </div>
        `;
  
        card.addEventListener('click', e => {
          e.preventDefault();
          const inner = card.querySelector('.card-inner');
          inner.classList.remove('flipped');    // ensure front shows
          card.classList.add('loading');        // block hover & show shot
          sound.currentTime = 0;
          sound.play();
          sound.addEventListener('ended', () => {
            window.location.href = url;
          }, { once: true });
        });
  
        grid.appendChild(card);
      });
    }
  
    // initial render
    cardData.sort((a, b) => a.label.localeCompare(b.label));
    renderCards(cardData);
  
    function allCards() {
      return Array.from(document.querySelectorAll('.card'));
    }
    function filterTo(term) {
      allCards().forEach(card => {
        card.style.display = card.dataset.label.toLowerCase().includes(term) ? '' : 'none';
      });
    }
  
    searchInput.addEventListener('input', e => filterTo(e.target.value.toLowerCase()));
  
    randomBtn.addEventListener('click', () => {
      searchInput.value = '';
      allCards().forEach(c => (c.style.display = ''));
      const pick = allCards()[Math.floor(Math.random() * allCards().length)];
      allCards().forEach(c => (c.style.display = c === pick ? '' : 'none'));
      pick.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
  