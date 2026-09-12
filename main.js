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
     The tagline stays English in every locale by design.
     --------------------------------------------------------------------- */

  var I18N = {
    en: {
      'skip': 'Skip to content',

      'meta.title': 'ScopeBee \u2014 Web-first, lightweight and performant game engine',
      'meta.description': 'ScopeBee \u2014 most lightweight and performant game engine. Coming soon.',

      'a11y.menu': 'Menu',
      'a11y.lang': 'Language',

      'a11y.zoom': 'Open the image at full size',
      'a11y.close': 'Close',
      'a11y.prev': 'Previous image',
      'a11y.next': 'Next image',
      'a11y.demo': 'ScopeBee demo: converting a Unity project and running it in the browser',

      'alt.engine': 'ScopeBee editor with a Flappy Bird scene open',
      'alt.panels': 'ScopeBee editor panels: colour picker, gradient and curve editors',
      'alt.converter': 'The converter window inside Unity, listing assemblies and types to export',

      'hero.stat.size': 'Downloaded',
      'hero.stat.memory': 'Memory',
      'hero.stat.physics': 'Physics at 60 FPS',
      'hero.stat.note': 'The same Flappy Bird, release build',
      'hero.stat.link': 'see how it was measured',

      'news.title': 'News',

      'nav.news': 'News',
      'nav.features': 'Features',
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
      'compare.th.transferred': 'Transferred',
      'compare.th.heap': 'Heap Snapshot',
      'compare.th.demo': 'Demo',
      'compare.th.file': 'HTML file',
      'compare.th.res': 'Resources',
      'compare.th.first': 'First frame',
      'compare.playable': 'Flappy Bird as a playable ad',
      'compare.platform.html': 'HTML5 \u00b7 .html',
      'compare.playable.lead': 'The same game as an ad creative: one HTML file with the engine, the assets and the script inside it, the way an ad network runs it \u2014 no server behind it and no second request. Unity has no such build mode.',
      'compare.note.playable': 'HTML file is the file on disk \u2014 what gets uploaded to the network, and what its size limit is measured against. Transferred is that file as this site serves it, gzip over the wire. Resources and Heap Snapshot are Chrome DevTools on the loaded page. First frame is the line each build prints when its first frame is drawn, on a local load so the download does not count towards it.',
      'compare.open': 'Open',
      'compare.play': 'Play',
      'compare.platform.wasm': 'HTML5 · .wasm',
      'compare.platform.fps': 'HTML5 · 60 FPS',
      'compare.cocos.note': '(no wasm — assets + cocos-js measured)',
      'compare.note1': 'Empty project, release build, stripped as far as each engine allows. WASM size is the .wasm on disk — Cocos Creator ships no wasm, so its assets and cocos-js folders are measured instead. Heap is a Chrome DevTools heap snapshot taken on an idle scene right after load. Transferred is what the browser actually downloads from the live site, with the server’s compression applied — Unity ships its wasm pre-gzipped, so the server passes it through as is.',
      'compare.note3': 'The same tumbler scene in every engine: a rotating box, bodies added until the frame stops holding 60 FPS. Higher is better. Measured on a Mac mini M2, 16 GB, Chrome 151.0.7922.138 (arm64).',
      'compare.note2': 'The same game ported to each engine, release build, default settings. WASM size is the .wasm on disk — Cocos Creator ships no wasm, so its assets and cocos-js folders are measured instead. Heap is a Chrome DevTools heap snapshot taken on an idle scene right after load. Transferred is what the browser actually downloads from the live site, with the server’s compression applied — Unity ships its wasm pre-gzipped, so the server passes it through as is.',

      'roadmap.eyebrow': "What's next",
      'roadmap.title': 'Roadmap',
      'roadmap.now': 'In progress',
      'roadmap.done': 'Done',
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
      'roadmap.1.tag4': 'Gizmos',
      'roadmap.2.title': 'Binary assets & 3D',
      'roadmap.2.text': 'A compact binary data format, and the first dimension past flat: models loaded straight from glb and drawn in the scene.',
      'roadmap.2.tag1': 'Binary serialisation',
      'roadmap.2.tag2': 'glb import',
      'roadmap.2.tag3': '3D rendering',
      'roadmap.3.title': 'Particles, materials and 3D physics',
      'roadmap.3.text': 'An effects system of its own, tunable materials and blend modes, and bodies that collide in three dimensions.',
      'roadmap.3.tag1': 'Particle system',
      'roadmap.3.tag2': 'Material parameters',
      'roadmap.3.tag3': 'Blend modes and presets',
      'roadmap.3.tag4': '3D physics',
      'roadmap.4.title': 'Tilemaps and audio mixers',
      'roadmap.4.text': 'Tile-based levels assembled from a palette in the editor, and sound routed through mixers and volume groups.',
      'roadmap.4.tag1': 'Tilemap',
      'roadmap.4.tag2': 'Audio system',
      'roadmap.4.tag3': 'Mixers',
      'roadmap.5.title': 'Cross-platform',
      'roadmap.5.text': 'The same project packaged past the browser without a second codebase, starting with Android.',
      'roadmap.5.tag1': 'Android',

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

      'a11y.zoom': 'Открыть изображение в полном размере',
      'a11y.close': 'Закрыть',
      'a11y.prev': 'Предыдущее изображение',
      'a11y.next': 'Следующее изображение',
      'a11y.demo': 'Демо ScopeBee: конвертация Unity-проекта и запуск в браузере',

      'alt.engine': 'Редактор ScopeBee с открытой сценой Flappy Bird',
      'alt.panels': 'Панели редактора ScopeBee: пипетка, редакторы градиентов и кривых',
      'alt.converter': 'Окно конвертера внутри Unity со списком сборок и типов для экспорта',

      'hero.stat.size': 'Скачивается',
      'hero.stat.memory': 'Память',
      'hero.stat.physics': 'Физика при 60 FPS',
      'hero.stat.note': 'Та же Flappy Bird, release-сборка',
      'hero.stat.link': 'как это измерялось',

      'news.title': 'Новости',

      'nav.news': 'Новости',
      'nav.features': 'Возможности',
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
      'compare.th.transferred': 'По сети',
      'compare.th.heap': 'Heap Snapshot',
      'compare.th.demo': 'Демо',
      'compare.th.file': 'HTML-файл',
      'compare.th.res': 'Resources',
      'compare.th.first': 'Первый кадр',
      'compare.playable': 'Flappy Bird как playable-креатив',
      'compare.platform.html': 'HTML5 \u00b7 .html',
      'compare.playable.lead': 'Та же игра рекламным креативом: один HTML-файл, внутри которого движок, ассеты и скрипт \u2014 так его и запускает рекламная площадка: без сервера за спиной и без второго запроса. У Unity такого режима сборки нет.',
      'compare.note.playable': 'HTML-файл \u2014 это файл на диске: то, что загружают на площадку, и то, с чем она сверяет свой лимит размера. Transferred \u2014 тот же файл, как его отдаёт этот сайт: gzip по сети. Resources и Heap Snapshot \u2014 из Chrome DevTools на загруженной странице. Первый кадр \u2014 строка, которую каждая сборка печатает при отрисовке первого кадра, на локальной отдаче, чтобы в него не входило скачивание.',
      'compare.open': 'Открыть',
      'compare.play': 'Играть',
      'compare.platform.wasm': 'HTML5 · .wasm',
      'compare.platform.fps': 'HTML5 · 60 FPS',
      'compare.cocos.note': '(нет wasm — замерены assets + cocos-js)',
      'compare.note1': 'Пустой проект, release-сборка, настройки урезаны настолько, насколько позволяет движок. Размер WASM — .wasm на диске; Cocos Creator wasm не собирает, поэтому для него замерены папки assets и cocos-js. Heap — снапшот кучи в Chrome DevTools, снятый на простаивающей сцене сразу после загрузки. «По сети» — то, что браузер реально скачивает с боевого сайта, со сжатием сервера: Unity отдаёт свой wasm уже сжатым, поэтому сервер передаёт его как есть.',
      'compare.note3': 'Одна и та же сцена на каждом движке: вращающийся ящик, тела добавляются до тех пор, пока кадр держит 60 FPS. Больше — лучше. Замеры на Mac mini M2, 16 ГБ, Chrome 151.0.7922.138 (arm64).',
      'compare.note2': 'Одна и та же игра, портированная на каждый движок, release-сборка, настройки по умолчанию. Размер WASM — .wasm на диске; Cocos Creator wasm не собирает, поэтому для него замерены папки assets и cocos-js. Heap — снапшот кучи в Chrome DevTools, снятый на простаивающей сцене сразу после загрузки. «По сети» — то, что браузер реально скачивает с боевого сайта, со сжатием сервера: Unity отдаёт свой wasm уже сжатым, поэтому сервер передаёт его как есть.',

      'roadmap.eyebrow': 'Что дальше',
      'roadmap.title': 'Дорожная карта',
      'roadmap.now': 'Сейчас',
      'roadmap.done': 'Готово',
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
      'roadmap.1.tag4': 'Гизмо',
      'roadmap.2.title': 'Бинарные ассеты и 3D',
      'roadmap.2.text': 'Компактный бинарный формат данных и первое измерение за пределами плоскости: модели загружаются прямо из glb и рисуются в сцене.',
      'roadmap.2.tag1': 'Бинарная сериализация',
      'roadmap.2.tag2': 'Импорт glb',
      'roadmap.2.tag3': '3D-рендеринг',
      'roadmap.3.title': 'Частицы, материалы и 3D-физика',
      'roadmap.3.text': 'Собственная система эффектов, настраиваемые материалы и режимы наложения, а также столкновение тел в трёх измерениях.',
      'roadmap.3.tag1': 'Система частиц',
      'roadmap.3.tag2': 'Параметры материалов',
      'roadmap.3.tag3': 'Режимы наложения и пресеты',
      'roadmap.3.tag4': '3D-физика',
      'roadmap.4.title': 'Тайлмапы и аудиомикшеры',
      'roadmap.4.text': 'Уровни из тайлов, выкладываемые в редакторе из палитры, и звук через микшеры и группы громкости.',
      'roadmap.4.tag1': 'Тайлмап',
      'roadmap.4.tag2': 'Аудиосистема',
      'roadmap.4.tag3': 'Микшеры',
      'roadmap.5.title': 'Кроссплатформенность',
      'roadmap.5.text': 'Тот же проект собирается за пределы браузера без второй кодовой базы — начиная с Android.',
      'roadmap.5.tag1': 'Android',

      'footer.tagline': 'Web-first игровой движок: лёгкий и производительный.',
      'footer.collab': 'Интересует сотрудничество?',
      'footer.copyright': '© 2026 ScopeBee. Все права защищены.',
    }
  };

  /* Sub-pages (news/) ship their own strings in a small script loaded before
     this one, so a new article never means editing the dictionaries above.
     Same shape as I18N: { en: {...}, ru: {...} }. */
  var extra = window.SCOPEBEE_I18N_EXTRA;
  if (extra) {
    Object.keys(I18N).forEach(function (lang) {
      if (!extra[lang]) return;
      Object.keys(extra[lang]).forEach(function (key) { I18N[lang][key] = extra[lang][key]; });
    });
  }

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

    /* A news page sets data-i18n-title / data-i18n-desc on <html> to point at
       its own strings; the landing page has neither and keeps meta.*. */
    var titleKey = document.documentElement.dataset.i18nTitle || 'meta.title';
    var descKey = document.documentElement.dataset.i18nDesc || 'meta.description';
    if (typeof dict[titleKey] === 'string') document.title = dict[titleKey];
    if (metaDescription && typeof dict[descKey] === 'string') {
      metaDescription.setAttribute('content', dict[descKey]);
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

  if (topbar) {
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(syncTopbar);
    }, { passive: true });

    syncTopbar();
  }

  /* ---------------------------------------------------------------------
     Lightbox
     Any [data-gallery] turns its .shot buttons into a viewer. The arrows walk
     the gallery the image was opened from and wrap inside it, so two separate
     pairs of shots never spill into one another. Nothing runs on pages that
     have no gallery.
     --------------------------------------------------------------------- */

  var galleries = [].slice.call(document.querySelectorAll('[data-gallery]'));

  if (galleries.length) {
    var ICON = {
      close: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"/></svg>',
      prev:  '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l-6 6 6 6"/></svg>',
      next:  '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4l6 6-6 6"/></svg>'
    };

    var box = document.createElement('div');
    box.className = 'lightbox';
    box.hidden = true;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML =
      '<button type="button" class="lightbox__close" data-i18n-aria="a11y.close" aria-label="Close">' + ICON.close + '</button>' +
      '<button type="button" class="lightbox__prev" data-i18n-aria="a11y.prev" aria-label="Previous image">' + ICON.prev + '</button>' +
      '<img class="lightbox__img" alt="">' +
      '<button type="button" class="lightbox__next" data-i18n-aria="a11y.next" aria-label="Next image">' + ICON.next + '</button>' +
      '<p class="lightbox__caption"></p>';
    document.body.appendChild(box);

    var boxImg = box.querySelector('.lightbox__img');
    var boxCaption = box.querySelector('.lightbox__caption');
    var current = [];     // shots of the gallery being viewed
    var index = 0;
    var opener = null;    // button to hand focus back to

    function show(i) {
      index = (i + current.length) % current.length;
      var img = current[index].querySelector('img');
      boxImg.src = img.currentSrc || img.src;
      boxImg.alt = img.alt;
      boxCaption.textContent = img.alt;
    }

    function open(shot) {
      var group = shot.closest('[data-gallery]');
      current = [].slice.call(group.querySelectorAll('.shot'));
      opener = shot;
      box.classList.toggle('is-solo', current.length < 2);
      show(current.indexOf(shot));
      box.hidden = false;
      document.body.classList.add('has-lightbox');
      // one frame before the class, or the fade has nothing to animate from
      requestAnimationFrame(function () { box.classList.add('is-open'); });
      box.querySelector('.lightbox__close').focus();
    }

    function close() {
      box.classList.remove('is-open');
      box.hidden = true;
      document.body.classList.remove('has-lightbox');
      boxImg.removeAttribute('src');
      if (opener) opener.focus();
      opener = null;
    }

    galleries.forEach(function (group) {
      group.querySelectorAll('.shot').forEach(function (shot) {
        shot.addEventListener('click', function () { open(shot); });
      });
    });

    box.querySelector('.lightbox__close').addEventListener('click', close);
    box.querySelector('.lightbox__prev').addEventListener('click', function () { show(index - 1); });
    box.querySelector('.lightbox__next').addEventListener('click', function () { show(index + 1); });

    // clicking the backdrop closes; clicking the image or a control does not
    box.addEventListener('click', function (e) { if (e.target === box) close(); });

    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowLeft' && current.length > 1) { e.preventDefault(); show(index - 1); }
      else if (e.key === 'ArrowRight' && current.length > 1) { e.preventDefault(); show(index + 1); }
    });
  }

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
