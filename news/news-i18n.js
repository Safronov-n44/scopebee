/* Strings for the article pages in this folder.

   Loaded before main.js, which merges this into its own dictionaries, so a new
   article means adding its keys here — never editing main.js. Same rule as the
   landing page: every visible string carries data-i18n and lives in BOTH
   languages below. Keys are namespaced by article slug. */

window.SCOPEBEE_I18N_EXTRA = {
  en: {
    /* --- shared chrome ------------------------------------------------- */
    'article.back': 'Back to the site',

    /* --- 0.2.0 --------------------------------------------------------- */
    'a020.meta.title': 'ScopeBee 0.2.0 — gizmos and frustum culling',
    'a020.meta.desc': 'ScopeBee 0.2.0 adds gizmos in the scene view and frustum culling in the renderer.',
    'a020.when': '31 AUG 2026',
    'a020.title': 'ScopeBee 0.2.0',
    'a020.card.title': 'ScopeBee 0.2.0',
    'a020.card.text': 'Gizmos in the scene view, and a renderer that stops drawing what the camera cannot see.',
    'a020.lead': 'Two things this release is about: you can now move and rotate objects directly in the scene, and the renderer stops drawing what the camera cannot see.',

    'a020.p1': 'Until now, placing an object meant typing numbers into the inspector. You knew where the sprite had to go, but you had to describe that position in coordinates instead of pointing at it. That is a strange way to build a scene, and it is the first thing this release fixes.',

    'a020.h1': 'Gizmos',
    'a020.p2': 'Selecting an object now draws handles on it. Drag an axis to move along it, drag the corner to move freely, grab the ring to rotate. The inspector keeps working exactly as before and the fields update as you drag, so nothing you already know stops being true — there is simply a second way to say the same thing, and it is the faster one.',
    'a020.p3': 'The handles keep a constant size on screen regardless of zoom, so they stay usable when you are far out looking at a whole level, and they do not swallow the object when you are close in on a single sprite.',
    'a020.cap1': 'Moving, rotating and scaling an object with gizmos',

    'a020.h2': 'Frustum culling',
    'a020.p4': 'The other half of the release is invisible by design. The renderer now checks every sprite against the camera before drawing it, and everything outside the view is dropped before it costs anything. A level much larger than the screen used to pay for all of itself on every frame; now it pays for the part you can actually see.',
    'a020.p5': 'The saving grows with the gap between level size and screen size, so a side-scroller with a long map benefits most and a single-screen game barely notices. It is on by default and there is nothing to configure.',
    'a020.cap2': 'Watch the draw call count as the camera\u2019s orthographic size changes',

    'a020.h3': 'Also in this release',
    'a020.li1': 'Deeper C# to Beef conversion, covering more of the language',
    'a020.li2': 'A web facade for the Yandex Games and CrazyGames APIs',

    /* --- sample game --------------------------------------------------- */
    'agame.meta.title': 'An idle game — UI, atlas baking and responsive layout',
    'agame.meta.desc': 'An idle game built with ScopeBee, showing the UI layer, atlas baking and responsive layout.',
    'agame.play': 'Play it in the browser',
    'agame.alt1': 'The farm scene without a baked atlas: the counter reads 181 draw calls',
    'agame.alt2': 'The same scene with a baked atlas: the counter reads 22 draw calls',
    'agame.alt3': 'The game in a portrait window',
    'agame.alt4': 'The same build in a landscape window',
    'agame.h5': 'What it weighs',
    'agame.p8a': 'Numbers only mean something next to other numbers, so here is the farm against a game of the same kind from a real portal:',
    'agame.p8link': 'Bulba Clicker',
    'agame.p8b': ' on Yandex Games \u2014 also a clicker, also built in Unity, with artwork of a comparable weight.',
    'agame.w.net': 'Downloaded',
    'agame.w.res': 'Unpacked',
    'agame.w.heap': 'Heap snapshot',
    'agame.w.note': 'Both measured the same way: everything the browser pulls on a cold load, then the same files unpacked, then a Chrome DevTools heap snapshot on an idle scene.',
    'agame.when': '8 SEP 2026',
    'agame.title': 'A more complex sample game',
    'agame.card.title': 'A more complex sample game',
    'agame.card.text': 'An idle game showing the UI layer, what atlas baking does to draw calls, and a layout that survives any screen.',
    'agame.lead': 'An idle game, built to show three things that are hard to judge from a feature list: the UI layer, what atlas baking does to draw calls, and how a layout survives a screen it was not designed for.',

    'agame.p1': 'Go easy on the game design and the art \u2014 the whole thing was put together to show the engine off. The cows came out rather nice, though.',

    'agame.h1': 'The UI layer',
    'agame.p2': 'Menus, the HUD and every button are built from the same UI system, laid out in the editor rather than positioned from code. Elements anchor to the edges and corners they belong to, so the layout is described once and holds wherever it lands. The windows lean on ScrollRect for scrolling lists, on the Layout components for arranging their contents, and on RectMask2D to clip whatever runs past the edge. Text is drawn from SDF, so labels stay crisp at whatever scale the layout puts them at.',

    'agame.h2': 'Atlas baking',
    'agame.p4': 'Every sprite drawn from its own texture is a separate draw call, and draw calls are what a browser runs out of first. Baking those textures into one atlas lets the renderer batch them: the same frame, the same pixels, far fewer calls to the GPU.',
    'agame.p5': 'The editor bakes the atlas as part of the build, so this is not something to remember to do. The shots below are the same scene built both ways, with the counter left on screen — the only honest way to show the difference.',
    'agame.cap1': 'The same scene, same 257 quads: 181 draw calls without a baked atlas, 22 with one',

    'agame.h3': 'Responsive layout',
    'agame.p6': 'A web game does not get to pick its screen. It opens inside a portal frame, on a phone held either way, on a desktop window someone is actively dragging. The sample handles all of it through anchors and scaling rules rather than a set of fixed breakpoints.',
    'agame.cap2': 'The same build in portrait and landscape: the HUD stays in its corners, the bar keeps the bottom edge',

    'agame.h4': 'Try it',
    'agame.p7': 'The build runs in the browser, so the UI, the atlas and the layout can be poked at directly rather than taken on trust.',
  },

  ru: {
    /* --- общие элементы ------------------------------------------------ */
    'article.back': 'На главную',

    /* --- 0.2.0 --------------------------------------------------------- */
    'a020.meta.title': 'ScopeBee 0.2.0 — гизмо и отсечение по фрустуму',
    'a020.meta.desc': 'В ScopeBee 0.2.0 появились гизмо в сцене и отсечение спрайтов за пределами камеры.',
    'a020.when': '31 АВГ 2026',
    'a020.title': 'ScopeBee 0.2.0',
    'a020.card.title': 'ScopeBee 0.2.0',
    'a020.card.text': 'Гизмо в сцене и рендер, который больше не рисует то, чего камера не видит.',
    'a020.lead': 'Релиз про две вещи: объекты теперь двигаются и поворачиваются прямо в сцене, а рендер перестал рисовать то, чего камера не видит.',

    'a020.p1': 'Раньше поставить объект означало вписать числа в инспектор. Вы знали, куда должен встать спрайт, но описывали это координатами вместо того, чтобы просто показать место. Странный способ собирать сцену — и первое, что этот релиз исправляет.',

    'a020.h1': 'Гизмо',
    'a020.p2': 'При выделении объекта на нём появляются рукоятки. Тянете за ось — двигаете вдоль неё, за угол — свободно, за кольцо — поворачиваете. Инспектор работает как работал, поля обновляются прямо во время перетаскивания, так что ничего из привычного не перестаёт быть верным — просто появился второй способ сказать то же самое, и он быстрее.',
    'a020.p3': 'Рукоятки сохраняют постоянный размер на экране независимо от зума: они остаются пригодными, когда вы отошли и смотрите на весь уровень, и не закрывают объект, когда вы вплотную к одному спрайту.',
    'a020.cap1': 'Перемещение, поворот и масштабирование объекта с помощью гизмо',

    'a020.h2': 'Отсечение по фрустуму',
    'a020.p4': 'Вторая половина релиза невидима намеренно. Рендер теперь сверяет каждый спрайт с камерой до отрисовки, и всё, что за пределами кадра, отбрасывается прежде, чем что-то стоить. Уровень заметно больше экрана раньше оплачивался целиком каждый кадр — теперь оплачивается та часть, которую действительно видно.',
    'a020.p5': 'Выигрыш растёт вместе с разрывом между размером уровня и размером экрана: сайд-скроллер с длинной картой выигрывает больше всего, игра на один экран почти не заметит разницы. Включено по умолчанию, настраивать нечего.',
    'a020.cap2': 'Обратите внимание, как меняется количество draw calls при изменении ортографического размера камеры',

    'a020.h3': 'Что ещё в этой версии',
    'a020.li1': 'Более глубокая конвертация C# в Beef, покрыто больше языка',
    'a020.li2': 'Веб-фасад для вызова API Yandex Games и CrazyGames',

    /* --- пример игры --------------------------------------------------- */
    'agame.meta.title': 'Idle-игра — UI, запекание атласа и адаптивная вёрстка',
    'agame.meta.desc': 'Idle-игра на ScopeBee: слой UI, запекание атласа и адаптивная вёрстка.',
    'agame.play': 'Поиграть в браузере',
    'agame.alt1': 'Сцена фермы без запечённого атласа: счётчик показывает 181 отрисовку',
    'agame.alt2': 'Та же сцена с запечённым атласом: счётчик показывает 22',
    'agame.alt3': 'Игра в вертикальном окне',
    'agame.alt4': 'Та же сборка в горизонтальном окне',
    'agame.h5': 'Сколько это весит',
    'agame.p8a': 'Числа что-то значат только рядом с другими числами, поэтому вот ферма против игры того же рода с реального портала:',
    'agame.p8link': '«Бульба-кликер»',
    'agame.p8b': ' на Яндекс Играх — тоже кликер, тоже на Unity, с графикой сопоставимого веса.',
    'agame.w.net': 'Скачивается',
    'agame.w.res': 'Распаковано',
    'agame.w.heap': 'Heap snapshot',
    'agame.w.note': 'Обе игры измерены одинаково: всё, что браузер тянет при холодной загрузке, затем те же файлы в распакованном виде, затем heap snapshot в Chrome DevTools на простаивающей сцене.',
    'agame.when': '8 СЕН 2026',
    'agame.title': 'Пример более сложной игры',
    'agame.card.title': 'Пример более сложной игры',
    'agame.card.text': 'Idle-игра: слой UI, что запекание атласа делает с числом отрисовок, и вёрстка, которая держится на любом экране.',
    'agame.lead': 'Idle-игра. Собрана, чтобы показать три вещи, которые плохо оцениваются по списку возможностей: слой UI, что запекание атласа делает с количеством отрисовок и как вёрстка переживает экран, под который её не рисовали.',

    'agame.p1': 'К геймдизайну и рисовке отнеситесь снисходительно — всё это затевалось ради движка. Хотя коровы, по-моему, вышли славные.',

    'agame.h1': 'Слой UI',
    'agame.p2': 'Меню, HUD и все кнопки собраны одной системой UI и разложены в редакторе, а не расставлены из кода. Элементы привязаны к тем краям и углам, к которым относятся, поэтому вёрстка описывается один раз и держится там, куда попадёт. Окна опираются на ScrollRect для прокручиваемых списков, на компоненты Layout для раскладки содержимого и на RectMask2D, чтобы обрезать всё, что выходит за край. Текст рисуется через SDF, поэтому надписи остаются чёткими в любом масштабе, в который их поставит вёрстка.',

    'agame.h2': 'Запекание атласа',
    'agame.p4': 'Каждый спрайт со своей текстурой — отдельная отрисовка, а отрисовки заканчиваются в браузере первыми. Запекание текстур в один атлас позволяет рендеру группировать их: тот же кадр, те же пиксели, кратно меньше обращений к GPU.',
    'agame.p5': 'Редактор запекает атлас во время сборки, так что помнить об этом не нужно. Ниже — одна и та же сцена, собранная обоими способами, со счётчиком на экране: единственный честный способ показать разницу.',
    'agame.cap1': 'Одна и та же сцена, те же 257 квадов: 181 отрисовка без запечённого атласа и 22 с ним',

    'agame.h3': 'Адаптивная вёрстка',
    'agame.p6': 'Веб-игра не выбирает себе экран. Она открывается во фрейме портала, на телефоне, повёрнутом как угодно, в окне десктопа, которое прямо сейчас тянут за угол. Пример справляется со всем этим через привязки и правила масштабирования, а не через набор фиксированных брейкпоинтов.',
    'agame.cap2': 'Одна и та же сборка вертикально и горизонтально: HUD держится по углам, панель — нижнего края',

    'agame.h4': 'Попробовать',
    'agame.p7': 'Сборка запускается прямо в браузере: UI, атлас и вёрстку можно потрогать, а не принимать на слово.',
  },
};
