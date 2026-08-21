/* ScopeBee landing — i18n, scroll reveal, top bar state, mobile menu.
   No dependencies, no build step: the page must work straight from file://. */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     i18n
     Every user-visible string in index.html carries data-i18n="<key>".
     Text that lives in an attribute instead of a text node uses the sibling
     forms data-i18n-aria (aria-label) and data-i18n-alt (alt) — same keys,
     same dictionaries. Adding a string means adding the key to BOTH
     dictionaries below.
     The tagline and "COMING SOON" stay English in every locale by design.
     --------------------------------------------------------------------- */

  var I18N = {
    en: {
      'skip': 'Skip to content',

      'meta.title': 'ScopeBee \u2014 Web-first, lightweight and performant game engine',
      'meta.description': 'ScopeBee \u2014 most lightweight and performant game engine. Coming soon.',

      'a11y.menu': 'Menu',
      'a11y.lang': 'Language',

      'alt.editor': 'ScopeBee editor: hierarchy, scene viewport and inspector',
      'alt.engine': 'ScopeBee editor with a Flappy Bird scene open',
      'alt.panels': 'ScopeBee editor panels: colour picker, gradient and curve editors',
      'alt.converter': 'The converter window inside Unity, listing assemblies and types to export',

      'nav.engine': 'Engine',
      'nav.beef': 'Beef',
      'nav.editor': 'Editor',
      'nav.converter': 'Converter',
      'nav.compare': 'Comparison',
      'nav.roadmap': 'Roadmap',
      'nav.contact': 'Contact',

      'editor.eyebrow': 'Tooling',
      'editor.title': 'Editor',
      'editor.text': 'An editor that starts instantly and stays out of your way. No launchers, no ceremony — open a project and work.',
      'editor.check1': 'Lightweight',
      'editor.check2': 'Extensible',
      'editor.check3': 'No hub required',

      'engine.eyebrow': 'Runtime',
      'engine.title': 'Engine',
      'engine.text': 'A runtime built around a single rule: ship the smallest binary that runs the fastest, identically on every platform.',
      'engine.check1': 'Maximum performance',
      'engine.check2': 'Minimal build size',
      'engine.check3': 'Minimal RAM footprint',
      'engine.check4': 'Uniformity across platforms',

      'beef.eyebrow': 'Language',
      'beef.title': 'Beef',
      'beef.text': 'The engine is written in Beef — a compiled language that reads like C# and runs like C++. There is no garbage collector, so a frame never stalls on cleanup you did not schedule.',
      'beef.check1': 'Familiar syntax, native speed',
      'beef.check2': 'No garbage collector',
      'beef.check3': 'Code generated at compile time, not reflected at runtime',

      'convert.eyebrow': 'Migration',
      'convert.title': 'Unity converter',
      'convert.text': 'Bring an existing Unity project across instead of rewriting it. Scenes, prefabs and component data are converted, and C# scripts are translated into Beef.',
      'convert.check1': 'C# → AST → Beef',
      'convert.check2': 'Scenes and prefabs with their full hierarchy',
      'convert.check3': 'Unity components mapped onto engine ones',
      'convert.check4': 'Textures, sprites and animation clips',

      'compare.eyebrow': 'Numbers, not promises',
      'compare.title': 'Comparison',
      'compare.lead': 'The same projects built with different engines. Bar length is the share of the largest value in that column.',
      'compare.empty': 'Empty project',
      'compare.physics': 'Physics stress test',
      'compare.th.engine': 'Engine',
      'compare.th.wasm': 'WASM size',
      'compare.th.bodies': 'Bodies at 60 FPS',
      'compare.th.heap': 'Heap Snapshot',
      'compare.th.demo': 'Demo',
      'compare.open': 'Open',
      'compare.play': 'Play',
      'compare.platform.wasm': 'HTML5 · .wasm, uncompressed',
      'compare.platform.fps': 'HTML5 · 60 FPS',
      'compare.cocos.note': '(no wasm — assets + cocos-js measured)',
      'compare.note1': 'Empty project, release build, stripped as far as each engine allows. WASM size is the uncompressed .wasm on disk — Cocos Creator ships no wasm, so its assets and cocos-js folders are measured instead. Heap is a Chrome DevTools heap snapshot taken on an idle scene right after load.',
      'compare.note3': 'The same tumbler scene in every engine: a rotating box, bodies added until the frame stops holding 60 FPS. Higher is better. Measured on a Mac mini M2, 16 GB, Chrome 151.0.7922.138 (arm64).',
      'compare.note2': 'The same game ported to each engine, release build, default settings. WASM size is the uncompressed .wasm on disk — Cocos Creator ships no wasm, so its assets and cocos-js folders are measured instead. Heap is a Chrome DevTools heap snapshot taken on an idle scene right after load.',

      'roadmap.eyebrow': "What's next",
      'roadmap.title': 'Roadmap',
      'roadmap.now': 'In progress',
      'roadmap.m1': 'AUG',
      'roadmap.m2': 'SEP',
      'roadmap.m3': 'OCT',
      'roadmap.m4': 'NOV',
      'roadmap.m5': 'DEC',
      'roadmap.1.title': 'C# → Beef',
      'roadmap.1.text': 'Deeper and more accurate language conversion, sprites outside the view frustum dropped before drawing, hooks into web platforms.',
      'roadmap.1.tag1': 'Language coverage',
      'roadmap.1.tag2': 'Frustum culling',
      'roadmap.1.tag3': 'Web portals integration',
      'roadmap.2.title': 'Binary assets and gizmos',
      'roadmap.2.text': 'A compact binary data format, asset browsing in the editor, move and rotate handles right in the scene.',
      'roadmap.2.tag1': 'Binary serialisation',
      'roadmap.2.tag2': 'Asset browser',
      'roadmap.2.tag3': 'References and dependencies',
      'roadmap.2.tag4': 'Gizmos',
      'roadmap.3.title': 'Particles and materials',
      'roadmap.3.text': 'An effects system of its own, tunable materials, blend modes and shared presets.',
      'roadmap.3.tag1': 'Particle system',
      'roadmap.3.tag2': 'Material parameters',
      'roadmap.3.tag3': 'Blend modes and presets',
      'roadmap.4.title': 'Sound and tilemaps',
      'roadmap.4.text': 'Sound with mixers and volume groups, tile-based levels assembled in the editor.',
      'roadmap.4.tag1': 'Audio system',
      'roadmap.4.tag2': 'Mixers',
      'roadmap.4.tag3': 'Tilemap',
      'roadmap.5.title': '3D for real',
      'roadmap.5.text': 'Model import with materials, skeletons that move, bodies that collide in three dimensions.',
      'roadmap.5.tag1': 'Model import',
      'roadmap.5.tag2': 'Skeletal animation',
      'roadmap.5.tag3': '3D physics',

      'footer.tagline': 'Web-first, lightweight and performant game engine.',
      'footer.collab': 'Interested in working together?',
      'footer.copyright': '© 2026 ScopeBee. All rights reserved.',
    },

    ru: {
      'skip': 'Перейти к содержимому',

      'meta.title': 'ScopeBee — web-first игровой движок: лёгкий и производительный',
      'meta.description': 'ScopeBee — самый лёгкий и производительный игровой движок. Скоро.',

      'a11y.menu': 'Меню',
      'a11y.lang': 'Язык',

      'alt.editor': 'Редактор ScopeBee: иерархия, вьюпорт сцены и инспектор',
      'alt.engine': 'Редактор ScopeBee с открытой сценой Flappy Bird',
      'alt.panels': 'Панели редактора ScopeBee: пипетка, редакторы градиентов и кривых',
      'alt.converter': 'Окно конвертера внутри Unity со списком сборок и типов для экспорта',

      'nav.engine': 'Движок',
      'nav.beef': 'Beef',
      'nav.editor': 'Редактор',
      'nav.converter': 'Конвертер',
      'nav.compare': 'Сравнение',
      'nav.roadmap': 'Дорожная карта',
      'nav.contact': 'Контакты',

      'editor.eyebrow': 'Инструменты',
      'editor.title': 'Редактор',
      'editor.text': 'Редактор, который запускается мгновенно и не мешает работать. Никаких лаунчеров и лишних шагов — открыли проект и начали.',
      'editor.check1': 'Лёгкость',
      'editor.check2': 'Расширяемость',
      'editor.check3': 'Отсутствие хаба',

      'engine.eyebrow': 'Рантайм',
      'engine.title': 'Движок',
      'engine.text': 'Рантайм построен вокруг одного правила: собирать минимальный бинарник, который работает максимально быстро и одинаково на всех платформах.',
      'engine.check1': 'Максимальная производительность',
      'engine.check2': 'Минимальный билд',
      'engine.check3': 'Минимальный размер оперативной памяти',
      'engine.check4': 'Единообразие на всех платформах',

      'beef.eyebrow': 'Язык',
      'beef.title': 'Beef',
      'beef.text': 'Движок написан на Beef — компилируемом языке, который читается как C#, а работает как C++. Сборщика мусора нет, поэтому кадр не спотыкается об уборку, которую вы не назначали.',
      'beef.check1': 'Знакомый синтаксис, нативная скорость',
      'beef.check2': 'Без сборщика мусора',
      'beef.check3': 'Код порождается при компиляции, а не через рефлексию в рантайме',

      'convert.eyebrow': 'Миграция',
      'convert.title': 'Конвертер из Unity',
      'convert.text': 'Перенести готовый проект Unity, а не переписывать его заново. Сцены, префабы и данные компонентов конвертируются, а C#-скрипты переводятся в Beef.',
      'convert.check1': 'C# → AST → Beef',
      'convert.check2': 'Сцены и префабы со всей иерархией',
      'convert.check3': 'Компоненты Unity ложатся на движковые',
      'convert.check4': 'Текстуры, спрайты и клипы анимации',

      'compare.eyebrow': 'Цифры, а не обещания',
      'compare.title': 'Сравнение',
      'compare.lead': 'Одинаковые проекты, собранные разными движками. Длина полосы — доля от наибольшего значения в колонке.',
      'compare.empty': 'Пустой проект',
      'compare.physics': 'Стресс-тест физики',
      'compare.th.engine': 'Движок',
      'compare.th.wasm': 'Размер WASM',
      'compare.th.bodies': 'Тел при 60 FPS',
      'compare.th.heap': 'Heap Snapshot',
      'compare.th.demo': 'Демо',
      'compare.open': 'Открыть',
      'compare.play': 'Играть',
      'compare.platform.wasm': 'HTML5 · .wasm, без сжатия',
      'compare.platform.fps': 'HTML5 · 60 FPS',
      'compare.cocos.note': '(нет wasm — замерены assets + cocos-js)',
      'compare.note1': 'Пустой проект, release-сборка, настройки урезаны настолько, насколько позволяет движок. Размер WASM — несжатый .wasm на диске; Cocos Creator wasm не собирает, поэтому для него замерены папки assets и cocos-js. Heap — снапшот кучи в Chrome DevTools, снятый на простаивающей сцене сразу после загрузки.',
      'compare.note3': 'Одна и та же сцена на каждом движке: вращающийся ящик, тела добавляются до тех пор, пока кадр держит 60 FPS. Больше — лучше. Замеры на Mac mini M2, 16 ГБ, Chrome 151.0.7922.138 (arm64).',
      'compare.note2': 'Одна и та же игра, портированная на каждый движок, release-сборка, настройки по умолчанию. Размер WASM — несжатый .wasm на диске; Cocos Creator wasm не собирает, поэтому для него замерены папки assets и cocos-js. Heap — снапшот кучи в Chrome DevTools, снятый на простаивающей сцене сразу после загрузки.',

      'roadmap.eyebrow': 'Что дальше',
      'roadmap.title': 'Дорожная карта',
      'roadmap.now': 'Сейчас',
      'roadmap.m1': 'АВГ',
      'roadmap.m2': 'СЕН',
      'roadmap.m3': 'ОКТ',
      'roadmap.m4': 'НОЯ',
      'roadmap.m5': 'ДЕК',
      'roadmap.1.title': 'C# → Beef',
      'roadmap.1.text': 'Более глубокая и точная конвертация языка, отсечение спрайтов за пределами пирамиды видимости, подключение к веб-платформам.',
      'roadmap.1.tag1': 'Покрытие языка',
      'roadmap.1.tag2': 'Отсечение по фрустуму',
      'roadmap.1.tag3': 'Интеграция веб-порталов',
      'roadmap.2.title': 'Бинарные ассеты и гизмо',
      'roadmap.2.text': 'Компактный бинарный формат данных, обзор ассетов в редакторе, рукоятки перемещения и поворота прямо в сцене.',
      'roadmap.2.tag1': 'Бинарная сериализация',
      'roadmap.2.tag2': 'Браузер ассетов',
      'roadmap.2.tag3': 'Ссылки и зависимости',
      'roadmap.2.tag4': 'Гизмо',
      'roadmap.3.title': 'Частицы и материалы',
      'roadmap.3.text': 'Собственная система эффектов, настраиваемые материалы, режимы наложения и общие пресеты.',
      'roadmap.3.tag1': 'Система частиц',
      'roadmap.3.tag2': 'Параметры материалов',
      'roadmap.3.tag3': 'Режимы наложения и пресеты',
      'roadmap.4.title': 'Звук и тайлмапы',
      'roadmap.4.text': 'Звук с микшерами и группами громкости, сборка уровней из тайлов в редакторе.',
      'roadmap.4.tag1': 'Аудиосистема',
      'roadmap.4.tag2': 'Микшеры',
      'roadmap.4.tag3': 'Тайлмап',
      'roadmap.5.title': '3D по-настоящему',
      'roadmap.5.text': 'Импорт моделей вместе с материалами, движение скелетов, столкновение тел в трёх измерениях.',
      'roadmap.5.tag1': 'Импорт моделей',
      'roadmap.5.tag2': 'Скелетная анимация',
      'roadmap.5.tag3': '3D-физика',

      'footer.tagline': 'Web-first игровой движок: лёгкий и производительный.',
      'footer.collab': 'Интересует сотрудничество?',
      'footer.copyright': '© 2026 ScopeBee. Все права защищены.',
    }
  };

  var STORAGE_KEY = 'scopebee.lang';
  var langButtons = document.querySelectorAll('.lang__btn');

  function readStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null; // private mode / file:// restrictions
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* not fatal */ }
  }

  var metaDescription = document.querySelector('meta[name="description"]');

  function applyLang(lang) {
    var dict = I18N[lang] || I18N.en;

    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var value = dict[node.dataset.i18n];
      if (typeof value === 'string') node.textContent = value;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (node) {
      var value = dict[node.dataset.i18nAria];
      if (typeof value === 'string') node.setAttribute('aria-label', value);
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(function (node) {
      var value = dict[node.dataset.i18nAlt];
      if (typeof value === 'string') node.setAttribute('alt', value);
    });

    if (typeof dict['meta.title'] === 'string') document.title = dict['meta.title'];
    if (metaDescription && typeof dict['meta.description'] === 'string') {
      metaDescription.setAttribute('content', dict['meta.description']);
    }

    document.documentElement.lang = lang;

    langButtons.forEach(function (btn) {
      var active = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  function initialLang() {
    var stored = readStoredLang();
    if (stored && I18N[stored]) return stored;
    var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return I18N[nav] ? nav : 'en';
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.dataset.lang;
      applyLang(lang);
      storeLang(lang);
    });
  });

  applyLang(initialLang());

  /* ---------------------------------------------------------------------
     Scroll reveal
     One observer for every [data-reveal] element. Direction and delay come
     from CSS (data-side on the section, --i on the element) — never from JS.
     --------------------------------------------------------------------- */

  var revealTargets = document.querySelectorAll('[data-reveal]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // reveal once, then stop watching
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Top bar background on scroll
     --------------------------------------------------------------------- */

  var topbar = document.getElementById('topbar');
  var ticking = false;

  function syncTopbar() {
    topbar.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(syncTopbar);
  }, { passive: true });

  syncTopbar();

  /* ---------------------------------------------------------------------
     Mobile menu
     --------------------------------------------------------------------- */

  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  }

  function isMenuOpen() {
    return burger.getAttribute('aria-expanded') === 'true';
  }

  burger.addEventListener('click', function () {
    setMenu(!isMenuOpen());
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  // tapping the page behind an open menu should dismiss it, not fall through
  document.addEventListener('click', function (e) {
    if (!isMenuOpen()) return;
    if (nav.contains(e.target) || burger.contains(e.target)) return;
    setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !isMenuOpen()) return;
    setMenu(false);
    burger.focus(); // Escape must not strand the focus inside a hidden panel
  });

  // must match the nav breakpoint in styles.css, not the layout one
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1150) setMenu(false);
  });
})();
