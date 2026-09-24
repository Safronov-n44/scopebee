/* Strings for the article pages in this folder.

   Loaded before main.js, which merges this into its own dictionaries, so a new
   article means adding its keys here — never editing main.js. Same rule as the
   landing page: every visible string carries data-i18n and lives in BOTH
   languages below. Keys are namespaced by article slug.

   Merges into SCOPEBEE_I18N_EXTRA rather than assigning it: main.js reads one
   global, and a second strings file that assigned would leave only whichever ran
   last. A strings file merges, it never assigns. */

(function () {
  var add = {
    en: {
      /* --- shared chrome ------------------------------------------------- */
      'article.back': 'Back to the site',

      /* --- the archive page (index.html in this folder) ------------------ */
      'archive.meta.title': 'News — ScopeBee',
      'archive.meta.desc': 'Every ScopeBee post: releases, demos and engine measurements, by month.',
      'archive.title': 'News',
      'archive.nav': 'Archive by month',
      'archive.all': 'All news',

      /* Full month names, for the archive rail. Not the roadmap's AUG..DEC:
         those are abbreviations and belong to the roadmap. */
      'month.1': 'January',
      'month.2': 'February',
      'month.3': 'March',
      'month.4': 'April',
      'month.5': 'May',
      'month.6': 'June',
      'month.7': 'July',
      'month.8': 'August',
      'month.9': 'September',
      'month.10': 'October',
      'month.11': 'November',
      'month.12': 'December',

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

      /* --- 0.3.0 --------------------------------------------------------- */
      'a030.meta.title': 'ScopeBee 0.3.0 \u2014 playable ad builds',
      'a030.meta.desc': 'ScopeBee 0.3.0 builds a playable ad: the whole game in one HTML file, packed with Zstd.',
      'a030.when': '11 SEP 2026',
      'a030.title': 'ScopeBee 0.3.0',
      'a030.card.title': 'ScopeBee 0.3.0',
      'a030.card.text': 'A playable ad build: the whole game in a single HTML file, packed with Zstd.',
      'a030.lead': 'The release is about one build mode. --playable puts the whole game \u2014 wasm, assets and script \u2014 into a single HTML file that an ad network can run with nothing behind it.',

      'a030.h1': 'What a playable ad is',
      'a030.p1': 'A playable ad is a short interactive creative in another app\u2019s ad slot: a few seconds of the actual game, then a button to the store. The network drops the file into a WebView and gives it nothing else \u2014 no server, no second request. Everything the game needs has to be inside the file that was uploaded, and that file has a hard size limit, usually between two and five megabytes.',
      'a030.p2': 'So it is not judged the way a web build is. What counts is the weight of the file, how fast the first frame arrives, and how much memory it holds on someone else\u2019s phone.',

      'a030.h2': 'One file',
      'a030.p3': 'The new mode packs the engine, the assets and the script into the page itself. The creative makes no network requests at all \u2014 it starts from what is already in the file.',
      'a030.p4': 'The ad network layer goes in with it: the build recognises Meta, Google Ads, Mintegral, AppLovin, ironSource and the rest, and hands the CTA click and the pause to whichever one is showing it. Nothing in the project changes between a web build and a creative.',

      'a030.h3': 'Zstd, not Brotli',
      'a030.p6': 'A site serves the build Brotli-compressed for free, because the decoder is the browser\u2019s own. A creative has no server: the file is served exactly as it was uploaded, so the compression has to live inside the page \u2014 and the decoder rides along inside the same limit.',
      'a030.p7': 'That changes the answer. A Brotli decoder weighs around 151 KB against 8 KB for Zstd, and Zstd compresses this game only about 36 KB worse \u2014 94 KB saved on the page by picking the smaller decoder over the better ratio.',

      'a030.h4': 'What it comes to',
      'a030.p9': 'The same Flappy Bird as in the comparison on the front page, built as a single-file creative in each engine that has that mode. Unity has none: it cannot export one HTML file, and its wasm alone is heavier than any network\u2019s limit for the whole creative.',
      'a030.t.caption': 'Flappy Bird as a playable ad',
      'a030.t.file': 'HTML file',
      'a030.t.res': 'Resources',
      'a030.t.first': 'First frame',
      'a030.cap1': 'The same game as a single-file creative in three engines. Bar length is the share of the largest value in that column.',
      'a030.note': 'HTML file is the file on disk \u2014 what gets uploaded, and what the network measures against its limit. Transferred is the same file as this site actually serves it, gzip over the wire. Resources and Heap Snapshot come from Chrome DevTools on the loaded page. First frame is the line each build prints when its first frame is drawn. Median of five cold loads served locally, so the download does not count towards it. Mac mini M2, 16 GB, Chrome 153.',

      'a030.h5': 'Try it',
      'a030.p10': 'All three creatives are behind the links in the table above, each the single file its network would receive. Open one with DevTools on the Network tab: one request, and the whole game behind it.',

      /* --- first steps in 3D --------------------------------------------- */
      'a3d.meta.title': 'First steps in 3D',
      'a3d.meta.desc': 'Meshes, glTF models, skinning and the animator: the first 3D in a 2D engine.',
      'a3d.when': '16 SEP 2026',
      'a3d.title': 'First steps in 3D',
      'a3d.card.title': 'First steps in 3D',
      'a3d.card.text': 'Meshes and a perspective camera, models through GLB/glTF, a skeleton and the same animator as in 2D.',
      'a3d.lead': 'The engine stays 2D-first, but it can now draw a mesh, import a model and animate a skeleton. Here is what has appeared, in short.',

      'a3d.h1': 'A second geometry path',
      'a3d.p1': 'Meshes are drawn alongside sprites, not instead of them: their own vertex buffers, their own shader and their own pass with a depth buffer. The camera learned a perspective projection next to the orthographic one, and the scene view in the editor switched to an orbit camera with a ground grid, a ray picker and a transform gizmo working on real matrices.',
      'a3d.p2': 'Eight primitives come with it — cube, sphere, capsule, cylinder, plane, quad, plus a cone and a torus — so a scene can be put together before any model is imported. Lighting is deliberately minimal for now: unlit or a single directional light.',

      'a3d.h2': 'Models: GLB and glTF',
      'a3d.p3': 'GLB/glTF is the format the engine reads natively. Everything else — FBX, OBJ, DAE, STL, PLY, ABC, USD, BLEND — is converted to GLB by Blender in headless CLI mode, and from there it goes through the same pipeline. One importer for every format, at the cost of one external dependency: without Blender those formats are not imported, and the editor says so instead of quietly doing nothing.',
      'a3d.p4': 'The import bakes a binary asset of its own. One model is one file: all of its meshes and the node hierarchy with their transforms, so wheels and doors keep their own pivots. Drag it into the hierarchy and it unfolds into objects. Geometry compression is a project-level switch — meshopt, whose decoder weighs 4.7 KB in the wasm.',

      'a3d.h3': 'Skeleton, skinning, animator',
      'a3d.p5': 'A skinned character comes in from the same file: the skeleton and the clips ride inside the model, and a bone track is simply a third kind of track inside the animation clip the engine already had. That is the point of it — there is no separate 3D animation system.',
      'a3d.p6': 'So the animator is the one you already know from 2D. A graph of states, parameters of four types (float, int, bool, trigger), transitions with conditions on them — greater, less, equal, not equal, set or not set — exit time, and a crossfade duration per transition. The same controller asset, the same editor tab.',
      'a3d.cap1': 'An imported Fox: walk and run played from the model’s own clips, and the animator graph that switches between them',

      'a3d.h4': 'A 2D game pays nothing for it',
      'a3d.p7': 'All of it is behind two build switches. Turning 3D meshes off drops the meshes, the models, the primitives, the skinning, the mesh pass and both 3D shaders out of the web build; skinning has a switch of its own for a project that only needs static props. A 2D game keeps the wasm it had.',

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

      /* --- страница архива (index.html в этой папке) ---------------------- */
      'archive.meta.title': 'Новости — ScopeBee',
      'archive.meta.desc': 'Все записи ScopeBee: релизы, демо и замеры движка, по месяцам.',
      'archive.title': 'Новости',
      'archive.nav': 'Архив по месяцам',
      'archive.all': 'Все новости',

      /* Полные названия месяцев для колонки архива. Не AUG..DEC из дорожной
         карты: там сокращения, и они принадлежат ей. */
      'month.1': 'Январь',
      'month.2': 'Февраль',
      'month.3': 'Март',
      'month.4': 'Апрель',
      'month.5': 'Май',
      'month.6': 'Июнь',
      'month.7': 'Июль',
      'month.8': 'Август',
      'month.9': 'Сентябрь',
      'month.10': 'Октябрь',
      'month.11': 'Ноябрь',
      'month.12': 'Декабрь',

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

      /* --- 0.3.0 --------------------------------------------------------- */
      'a030.meta.title': 'ScopeBee 0.3.0 \u2014 сборка Playable Ad',
      'a030.meta.desc': 'В ScopeBee 0.3.0 появилась сборка playable-креатива: вся игра в одном HTML-файле, упакованная Zstd.',
      'a030.when': '11 СЕН 2026',
      'a030.title': 'ScopeBee 0.3.0',
      'a030.card.title': 'ScopeBee 0.3.0',
      'a030.card.text': 'Сборка Playable Ad: вся игра в одном HTML-файле, упакованная Zstd.',
      'a030.lead': 'Релиз про один режим сборки. --playable складывает всю игру \u2014 wasm, ассеты и скрипт \u2014 в единственный HTML-файл, который рекламная площадка запускает, не имея за собой ничего.',

      'a030.h1': 'Что такое playable',
      'a030.p1': 'Playable \u2014 это короткий интерактивный креатив в рекламном блоке чужого приложения: несколько секунд настоящей игры и кнопка в стор. Площадка кладёт файл в WebView и больше не даёт ничего \u2014 ни сервера, ни второго запроса. Всё, что игре нужно, должно лежать внутри загруженного файла, а у файла есть жёсткий лимит размера \u2014 обычно от двух до пяти мегабайт.',
      'a030.p2': 'Поэтому меряется он не тем же, чем веб-сборка. Важны вес файла, время до первого кадра и объём памяти на чужом телефоне.',

      'a030.h2': 'Один файл',
      'a030.p3': 'Новый режим упаковывает движок, ассеты и скрипт в саму страницу. Креатив не делает ни одного сетевого запроса \u2014 он стартует с того, что уже лежит в файле.',
      'a030.p4': 'Вместе с ним внутрь попадает и слой рекламных сетей: сборка узнаёт Meta, Google Ads, Mintegral, AppLovin, ironSource и остальных и передаёт клик по CTA и паузу той, которая показывает креатив. В проекте между веб-сборкой и креативом не меняется ничего.',

      'a030.h3': 'Zstd вместо Brotli',
      'a030.p6': 'На сайте сборка отдаётся сжатой Brotli, и это бесплатно: декодер там браузерный. У креатива сервера нет \u2014 файл отдают ровно таким, каким его загрузили, поэтому сжатие приходится держать внутри страницы, а декодер едет туда же, внутрь того же лимита.',
      'a030.p7': 'От этого меняется ответ. Декодер Brotli весит около 151 КБ против 8 КБ у Zstd, а сжимает Zstd эту игру всего на 36 КБ хуже \u2014 94 КБ экономии на странице за выбор меньшего декодера вместо лучшего сжатия.',

      'a030.h4': 'Что получилось',
      'a030.p9': 'Тот же Flappy Bird, что и в сравнении на главной, собранный однофайловым креативом в каждом движке, у которого такой режим есть. У Unity его нет: выгрузить один HTML он не умеет, а его wasm в одиночку тяжелее, чем лимит любой площадки на весь креатив.',
      'a030.t.caption': 'Flappy Bird как playable-креатив',
      'a030.t.file': 'HTML-файл',
      'a030.t.res': 'Resources',
      'a030.t.first': 'Первый кадр',
      'a030.cap1': 'Одна и та же игра однофайловым креативом на трёх движках. Длина полосы \u2014 доля от наибольшего значения в столбце.',
      'a030.note': 'HTML-файл \u2014 это файл на диске: то, что загружают на площадку, и то, с чем она сверяет свой лимит. Transferred \u2014 тот же файл, как его отдаёт этот сайт: gzip по сети. Resources и Heap Snapshot \u2014 из Chrome DevTools на загруженной странице. Первый кадр \u2014 строка, которую каждая сборка печатает при отрисовке первого кадра. Медиана пяти холодных загрузок с локальной отдачи, чтобы в неё не входило само скачивание. Mac mini M2, 16 ГБ, Chrome 153.',

      'a030.h5': 'Попробовать',
      'a030.p10': 'Все три креатива открываются по ссылкам в таблице выше \u2014 каждый тем самым единственным файлом, который получила бы площадка. Откройте любой с DevTools на вкладке Network: один запрос, и за ним вся игра.',

      /* --- первые шаги в 3D ----------------------------------------------- */
      'a3d.meta.title': 'Первые шаги в 3D',
      'a3d.meta.desc': 'Меши, модели glTF, скиннинг и аниматор: первое 3D в 2D-движке.',
      'a3d.when': '16 СЕН 2026',
      'a3d.title': 'Первые шаги в 3D',
      'a3d.card.title': 'Первые шаги в 3D',
      'a3d.card.text': 'Меши и перспективная камера, модели через GLB/glTF, скелет и тот же аниматор, что и в 2D.',
      'a3d.lead': 'Движок остаётся 2D-first, но теперь умеет нарисовать меш, импортировать модель и анимировать скелет. Коротко о том, что появилось.',

      'a3d.h1': 'Второй путь геометрии',
      'a3d.p1': 'Меши рисуются рядом со спрайтами, а не вместо них: свои вершинные буферы, свой шейдер и свой проход с буфером глубины. Камера научилась перспективной проекции рядом с ортографической, а вид сцены в редакторе получил орбитальную камеру, сетку по земле, пикинг лучом и гизмо трансформа на настоящих матрицах.',
      'a3d.p2': 'Вместе с этим появились восемь примитивов — куб, сфера, капсула, цилиндр, плоскость, quad, плюс конус и тор — чтобы собрать сцену можно было ещё до того, как импортирована первая модель. Освещение пока намеренно минимальное: unlit или один направленный свет.',

      'a3d.h2': 'Модели: GLB и glTF',
      'a3d.p3': 'GLB/glTF — формат, который движок читает сам. Всё остальное — FBX, OBJ, DAE, STL, PLY, ABC, USD, BLEND — переводит в GLB Blender, запущенный в фоновом режиме из командной строки, а дальше начинается тот же конвейер. Один импортёр на все форматы, ценой одной внешней зависимости: без Blender эти форматы не импортируются, и редактор об этом говорит, а не молчит.',
      'a3d.p4': 'Импорт печёт собственный бинарный ассет. Одна модель — один файл: все её меши и иерархия узлов со своими трансформами, поэтому у колёс и дверей остаются свои пивоты. Перетащили в иерархию — модель развернулась в объекты. Сжатие геометрии включается на уровне проекта: meshopt, декодер которого весит в wasm 4.7 КБ.',

      'a3d.h3': 'Скелет, скиннинг, аниматор',
      'a3d.p5': 'Скиннутый персонаж приезжает из того же файла: скелет и клипы лежат внутри модели, а костная дорожка — просто третий вид трека внутри того же клипа анимации, который в движке уже был. В этом и смысл: отдельной системы 3D-анимации нет.',
      'a3d.p6': 'Поэтому аниматор — тот же, что и в 2D. Граф состояний, параметры четырёх типов (float, int, bool, trigger), переходы с условиями на них — больше, меньше, равно, не равно, взведён или не взведён — exit time и длительность кроссфейда у каждого перехода. Тот же ассет контроллера, та же вкладка редактора.',
      'a3d.cap1': 'Импортированный Fox: ходьба и бег из собственных клипов модели и граф аниматора, который между ними переключает',

      'a3d.h4': '2D-игра за это не платит',
      'a3d.p7': 'Всё это стоит за двумя галочками сборки. Выключение 3D-мешей уносит из веб-билда меши, модели, примитивы, скиннинг, меш-проход и оба 3D-шейдера; у скиннинга есть отдельная галочка — для проекта, которому нужна только статика. 2D-игра остаётся с тем же wasm, что и была.',

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

  var bag = window.SCOPEBEE_I18N_EXTRA || (window.SCOPEBEE_I18N_EXTRA = {});
  Object.keys(add).forEach(function (lang) {
    if (!bag[lang]) bag[lang] = {};
    Object.keys(add[lang]).forEach(function (key) { bag[lang][key] = add[lang][key]; });
  });
})();
