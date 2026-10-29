/* ScopeBee landing — strings, scroll reveal, top bar state, mobile menu.
   No dependencies, no build step: the page must work straight from file://. */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     i18n
     Every user-visible string in index.html carries data-i18n="<key>".
     Text that lives in an attribute instead of a text node uses the sibling
     forms data-i18n-aria (aria-label) and data-i18n-alt (alt) — same keys,
     same dictionary. The site is English only; the dictionary is what the
     archive rail and each article's <title> and description are read from.
     --------------------------------------------------------------------- */

  var I18N = {
    en: {
      'skip': 'Skip to content',

      'meta.title': 'ScopeBee \u2014 Web-first, lightweight and performant game engine',
      'meta.description': 'ScopeBee \u2014 most lightweight and performant game engine. Coming soon.',

      'a11y.menu': 'Menu',

      'a11y.zoom': 'Open the image at full size',
      'a11y.close': 'Close',
      'a11y.prev': 'Previous image',
      'a11y.next': 'Next image',

      'alt.engine': 'ScopeBee editor with a Flappy Bird scene open',
      'alt.panels': 'ScopeBee editor panels: colour picker, gradient and curve editors',
      'alt.converter': 'The converter window inside Unity, listing assemblies and types to export',

      'hero.stat.size': 'Downloaded',
      'hero.stat.memory': 'Memory',
      'hero.stat.start': 'Game on screen',
      'hero.stat.note': 'The same Magic School, release build',
      'hero.game.alt': 'Magic School: two wizards and an owl in a snowy courtyard',
      'hero.made': 'Made with ScopeBee',
      'hero.stat.link': 'see how it was measured',
      'hero.partners': 'Partners',

      'news.title': 'News',
      'news.all': 'All news',

      'nav.news': 'News',
      'nav.features': 'Features',
      'nav.compare': 'Comparison',
      'nav.roadmap': 'Roadmap',
      'nav.contact': 'Contact',
      'nav.docs': 'Docs',
      'nav.showcase': 'Showcase',

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
      'compare.lead': 'The same projects built with different engines. Each bar is the share of the largest value it is compared against.',
      'compare.physics': 'Physics stress test',
      'compare.th.engine': 'Engine',
      'compare.th.metric': 'Metric',
      'compare.th.ranked': 'Engines, best first',
      'compare.play.label': 'Play the builds:',
      'compare.th.bodies': 'Bodies at 60 FPS',
      'compare.th.transferred': 'Transferred',
      'compare.th.heap': 'Heap Snapshot',
      'compare.th.demo': 'Demo',
      'compare.th.file': 'HTML file',
      'compare.th.res': 'Resources',
      'compare.th.first': 'First frame',
      'compare.playable': 'Flappy Bird as a playable ad',
      'compare.platform.html': 'HTML5 \u00b7 .html',
      'compare.playable.lead': 'The same game as an ad creative: one HTML file with the engine, the assets and the script inside it, the way an ad network runs it. Built without extra optimisation — ScopeBee, Cocos Creator and Defold through their own playable modes, Pixi and PlayCanvas as the same web projects packed into one file. Unity has no such build mode.',
      'compare.playable.more': 'How the playable builds were made',
      'compare.play': 'Play',
      'compare.open': 'Open',
      'compare.platform.fps': 'HTML5 · 60 FPS',
      'compare.note3': 'The same tumbler scene in every engine: a rotating box, bodies added until the frame stops holding 60 FPS. Higher is better. Measured on a Mac mini M2, 16 GB, Chrome 151.0.7922.138 (arm64).',
      'compare.flappy.lead': 'Seven builds of one game, made with different engines.',
      'compare.flappy.more': 'How it was measured and what the numbers mean',
      'compare.platform.webgl': 'HTML5 \u00b7 WebGL',

      'roadmap.eyebrow': "What's next",
      'roadmap.title': 'Roadmap',
      'roadmap.now': 'In progress',
      'roadmap.done': 'Done',
      'roadmap.m1': 'AUG',
      'roadmap.m2': 'SEP',
      'roadmap.m3': 'OCT',
      'roadmap.m4': 'NOV',
      'roadmap.m5': 'DEC',
      'roadmap.m6': 'JAN',
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
      'roadmap.ai.title': 'AI integration',
      'roadmap.ai.text': 'AI, built into the workflow.',
      'roadmap.ai.tag1': 'MCP',
      'roadmap.ai.tag2': 'Skills',
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

  };

  /* Sub-pages (news/) ship their own strings in a small script loaded before
     this one, so a new article never means editing the dictionaries above.
     Same shape as I18N: { en: {...} }. */
  var extra = window.SCOPEBEE_I18N_EXTRA;
  if (extra) {
    Object.keys(I18N).forEach(function (lang) {
      if (!extra[lang]) return;
      Object.keys(extra[lang]).forEach(function (key) { I18N[lang][key] = extra[lang][key]; });
    });
  }

  /* News archive (news/index.html): the rail of months on the left.

     Built from the cards already in the page — each one's <time datetime> is
     the only date the rail reads, so a post is described once and adding one
     to the archive is a card and nothing else.

     This has to sit here, after the strings above are merged and before
     applyLang runs below: the links it builds carry data-i18n, and applyLang
     is called once and never watches the DOM, so anything built later would
     keep empty labels. */
  var archiveNav = document.getElementById('archive-nav');
  var archiveList = document.getElementById('archive-list');

  if (archiveNav && archiveList) {
    var MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
    var archiveStatus = document.getElementById('archive-status');
    var posts = Array.prototype.slice.call(archiveList.children);
    var counts = {};
    var months = [];

    posts.forEach(function (li) {
      var time = li.querySelector('time[datetime]');
      var month = time ? time.getAttribute('datetime').slice(0, 7) : '';
      if (!MONTH_RE.test(month)) return; // no usable date: stays in the list, out of the rail
      li.dataset.month = month;
      if (!counts[month]) { counts[month] = 0; months.push(month); }
      counts[month] += 1;
    });

    /* newest first by plain string compare — YYYY-MM sorts that way. Not by
       DOM order: that is the editor's order, and one card in the wrong place
       would tilt the whole rail. */
    months.sort();
    months.reverse();

    var years = [];
    months.forEach(function (month) {
      var year = month.slice(0, 4);
      if (years.indexOf(year) === -1) years.push(year);
    });
    /* with a single year the group heading already says it; printing it in
       every link under it would only repeat the heading */
    var yearInLink = years.length > 1;

    function archiveLabel(key, year) {
      var wrap = document.createElement('span');
      wrap.className = 'archive__label';

      /* the key goes on its own span: applyLang replaces a whole textContent,
         so a key on the link itself would swallow the count with it */
      var text = document.createElement('span');
      text.dataset.i18n = key;
      text.textContent = I18N.en[key] || key;
      wrap.appendChild(text);

      if (year) {
        var stamp = document.createElement('span');
        stamp.className = 'archive__link-year';
        stamp.textContent = year;
        wrap.appendChild(stamp);
      }
      return wrap;
    }

    function archiveItem(hash, key, year, count) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.className = 'archive__link';
      /* never '#': an empty fragment means the top of the document, and
         scroll-behavior is smooth, so the one item that should behave like
         the rest would be the one that jumps */
      a.href = '#' + hash;
      a.appendChild(archiveLabel(key, year));

      var badge = document.createElement('span');
      badge.className = 'archive__count';
      badge.textContent = String(count);
      a.appendChild(badge);

      li.appendChild(a);
      return li;
    }

    /* role="list" because the global `ul { list-style: none }` drops list
       semantics in Safari/VoiceOver, and this list is the navigation */
    var rail = document.createElement('ul');
    rail.setAttribute('role', 'list');
    rail.appendChild(archiveItem('all', 'archive.all', '', posts.length));

    years.forEach(function (year) {
      var group = document.createElement('li');
      group.className = 'archive__group';

      var heading = document.createElement('p');
      heading.className = 'archive__year';
      heading.textContent = year;
      group.appendChild(heading);

      var inner = document.createElement('ul');
      inner.setAttribute('role', 'list');
      months.forEach(function (month) {
        if (month.slice(0, 4) !== year) return;
        inner.appendChild(archiveItem(
          month, 'month.' + Number(month.slice(5, 7)), yearInLink ? year : '', counts[month]
        ));
      });

      group.appendChild(inner);
      rail.appendChild(group);
    });

    archiveNav.appendChild(rail);
    var railLinks = rail.querySelectorAll('.archive__link');

    function applyArchive(month) {
      posts.forEach(function (li) {
        /* a class, not [hidden]: the UA rule behind [hidden] loses to any
           rule that sets display */
        li.classList.toggle('is-filtered', Boolean(month) && li.dataset.month !== month);
      });

      var current = null;
      railLinks.forEach(function (a) {
        if (a.getAttribute('href') === '#' + (month || 'all')) {
          a.setAttribute('aria-current', 'true');
          current = a;
        } else {
          a.removeAttribute('aria-current'); // not "false" — that still reads as current
        }
      });

      if (!archiveStatus) return;
      archiveStatus.textContent = '';
      /* a clone of the active label rather than a sentence assembled here: it
         carries data-i18n and is already filled in, and leaving the count out
         keeps plurals out of it */
      if (current) archiveStatus.appendChild(current.querySelector('.archive__label').cloneNode(true));
    }

    function archiveFromHash() {
      var hash = location.hash.slice(1);
      /* everything else — #all, the skip link's #main, an empty hash, a month
         with no posts — means "all news", so the page can never go blank */
      return MONTH_RE.test(hash) && counts[hash] ? hash : '';
    }

    /* the rail is made of real links, so the browser records history and Back
       works on its own. pushState is deliberately not used: it throws on
       file:// in some browsers and buys nothing here. No element on that page
       may take id="all" or a YYYY-MM id, which is what keeps the hash from
       scrolling anywhere.
       If the list ever outgrows the screen, scroll it into view from the
       hashchange handler only — never on load, or Back lands in the wrong
       place. */
    window.addEventListener('hashchange', function () { applyArchive(archiveFromHash()); });
    applyArchive(archiveFromHash()); // directly, not via a synthetic event: before first paint
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

  }

  applyLang('en');

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
     Showreel
     The hero's carousel of games. One slide is .is-active; the rest are
     hidden by CSS and made inert here, so Tab never lands on a link nobody
     can see. It steps on its own every few seconds, stops while the pointer
     or the focus is inside, and does not step at all with reduced motion or
     while the tab is hidden — the dots still work in every case.
     --------------------------------------------------------------------- */

  var showreel = document.querySelector('.showreel');

  if (showreel) {
    var slides = showreel.querySelectorAll('.hero__game');
    var dots = showreel.querySelectorAll('.showreel__dot');
    var slideNow = 0;
    var slideTimer = null;
    var SLIDE_MS = 10000;

    var showSlide = function (n) {
      slideNow = (n + slides.length) % slides.length;
      slides.forEach(function (slide, k) {
        var on = k === slideNow;
        slide.classList.toggle('is-active', on);
        slide.inert = !on;
        slide.setAttribute('aria-hidden', String(!on));
      });
      dots.forEach(function (dot, k) {
        if (k === slideNow) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current'); // not "false" — that still reads as current
      });
    };

    var stopReel = function () {
      clearInterval(slideTimer);
      slideTimer = null;
    };

    var startReel = function () {
      if (reduceMotion || slides.length < 2 || document.hidden) return;
      stopReel();
      slideTimer = setInterval(function () { showSlide(slideNow + 1); }, SLIDE_MS);
    };

    dots.forEach(function (dot, k) {
      dot.addEventListener('click', function () {
        showSlide(k);
        startReel(); // a fresh interval, so the chosen slide gets its full time
      });
    });

    showreel.addEventListener('mouseenter', stopReel);
    showreel.addEventListener('mouseleave', startReel);
    showreel.addEventListener('focusin', stopReel);
    showreel.addEventListener('focusout', function (e) {
      if (!showreel.contains(e.relatedTarget)) startReel();
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopReel();
      else if (!showreel.matches(':hover, :focus-within')) startReel();
    });

    showSlide(0);
    startReel();
  }

  /* ---------------------------------------------------------------------
     Mobile menu
     --------------------------------------------------------------------- */

  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    var setMenu = function (open) {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    };

    var isMenuOpen = function () {
      return burger.getAttribute('aria-expanded') === 'true';
    };

    burger.addEventListener('click', function () {
      setMenu(!isMenuOpen());
    });

    // the way into the docs sits in this panel too, so it closes the menu like
    // any other link — and then navigates away
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

    /* The breakpoint lives in styles.css and nowhere else. The burger is only
       displayed below it, so its computed display IS the media query — a second
       copy of the number here would be one more thing to keep in step. */
    window.addEventListener('resize', function () {
      if (getComputedStyle(burger).display === 'none') setMenu(false);
    });
  }

  /* ---------------------------------------------------------------------
     Visit duration
     Umami measures a visit as the time between its first and last event, so
     a one-page visit always reads 0s. This sends an "engaged" event at each
     mark below, counted in time the tab was actually visible — a background
     tab does not stretch the duration, and a crawler that leaves within
     seconds never sends one. The marks thin out so a long read costs a dozen
     events, and stop at 30 minutes.
     This is the only umami call site, so unlike the data-umami-event
     attributes it guards: a blocked or not yet loaded tracker leaves
     window.umami missing. data-domains still keeps file:// and localhost out.
     --------------------------------------------------------------------- */

  var BEATS = [15, 30, 60, 90, 120, 180, 240, 300, 420, 600, 900, 1200, 1800]; // seconds
  var beat = 0;
  var visibleMs = 0;
  var shownAt = Date.now();
  var beatTimer = null;

  var scheduleBeat = function () {
    clearTimeout(beatTimer);
    if (document.hidden || beat >= BEATS.length) return;
    beatTimer = setTimeout(function () {
      var now = Date.now();
      visibleMs += now - shownAt;
      shownAt = now;
      if (window.umami && typeof window.umami.track === 'function') {
        window.umami.track('engaged', { seconds: BEATS[beat] });
      }
      beat++;
      scheduleBeat();
    }, BEATS[beat] * 1000 - visibleMs);
  };

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      visibleMs += Date.now() - shownAt;
      clearTimeout(beatTimer);
    } else {
      shownAt = Date.now();
      scheduleBeat();
    }
  });

  scheduleBeat();

})();
