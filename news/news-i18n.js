/* Strings for the article pages in this folder.

   Loaded before main.js, which merges this into its own dictionaries, so a new
   article means adding its keys here — never editing main.js. Same rule as the
   landing page: every visible string carries data-i18n and lives below. Keys
   are namespaced by article slug.

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

      /* --- updated engine comparison (engine-comparison.html) --- */
      'acmp.meta.title': 'Updated engine comparison — ScopeBee',
      'acmp.meta.desc': 'Flappy Bird on seven engines: ScopeBee, Cocos Creator, Defold, Unity, Phaser, Pixi and PlayCanvas, measured on one bench — how it was measured and what the numbers mean.',
      'acmp.when': '5 OCT 2026',
      'acmp.title': 'Updated engine comparison',
      'acmp.card.title': 'Updated engine comparison',
      'acmp.card.text': 'Flappy Bird on seven engines: Phaser, Pixi and PlayCanvas join, and every build is measured again on one bench.',
      'acmp.lead': 'Flappy Bird now runs on seven engines instead of four: Phaser, Pixi and PlayCanvas have joined ScopeBee, Cocos Creator, Defold and Unity. Every build was rebuilt and measured again on one bench, and the builds on the site are exactly the ones that were measured.',

      'acmp.h1': 'How it was measured',
      'acmp.p1': 'Each build is made only with its own engine’s tools. The images are the same and at their original size, the game logic repeats the Unity original, and the physics is Box2D everywhere: built into the engine for ScopeBee, Defold, Unity and Cocos, and Planck.js — a JavaScript port of Box2D — for the three frameworks, which have no Box2D of their own.',
      'acmp.p2': 'Load times were measured on a local server that serves everything in brotli: a ready-made .br file where the build has one, brotli at quality 11 where it does not, compressed in advance so that compressing takes no time during the load. The point was to keep the speed of the internet connection out of the results: over a real network the download time changes from run to run and would bury the difference between the engines.',

      'acmp.h2': 'Results',
      'acmp.m1': 'Transferred — what the browser downloads, compressed.',
      'acmp.m2': 'Resources — the same files after decompression.',
      'acmp.m3': 'First frame — the time from opening the page to the first frame the engine draws, download included.',
      'acmp.m4': 'Heap Snapshot — the memory the page holds, as Chrome DevTools shows it under Memory → Heap snapshot; Web Workers are not part of it.',

      'acmp.h3': 'Why Phaser and Pixi download less',
      'acmp.p6': 'Because they carry less. Pixi is only a rendering library: it draws sprites and leaves everything else to you. Phaser is only a 2D engine.',
      'acmp.h7': 'Playable builds',
      'acmp.p12': 'A playable ad is the same game as one HTML file with the engine, the assets and the script inside it. Only the engines that can produce one are compared here, and none of the builds was optimised further: ScopeBee, Cocos Creator and Defold come out of their own playable modes, Pixi and PlayCanvas are the same web projects as above, packed into a single file. Unity has no such mode.',
      'acmp.m5': 'HTML file — the file on disk: what goes to the ad network and what its size limit is checked against.',
      'acmp.p13': 'The other rows mean the same as in the table above. Each figure is one cold load read off Chrome DevTools; Transferred is what actually came over the network — for Pixi and PlayCanvas the DevTools total also counts the data URIs these pages read from themselves through fetch(), which never touch the network.',



      'acmp.h6': 'A note',
      'acmp.li4': 'The site serves these builds differently from the test server, so a stopwatch here will not match the table: the difference is the network, not the engine.',

      /* --- 0.4.0 --------------------------------------------------------- */
      'a040.meta.title': 'ScopeBee 0.4.0 — lighting, instancing and binary scenes',
      'a040.meta.desc': 'ScopeBee 0.4.0: light and shadows, thousands of objects in two draw calls, and scenes stored line by line and baked to binary for the build.',
      'a040.when': '1 OCT 2026',
      'a040.title': 'ScopeBee 0.4.0',
      'a040.card.title': 'ScopeBee 0.4.0',
      'a040.card.text': 'Light and shadows, thousands of objects in two draw calls, and scenes baked to binary for the build.',
      'a040.lead': 'The release is about 3D and about how scenes are stored: light and shadows, thousands of objects in two draw calls, a scene format a diff can read, and a binary one for the build.',
      'a040.h2': 'Light and shadows',
      'a040.p3': 'A scene now has a Light component: up to four directional lights, each with its own colour and intensity. Ambient light is set in a Lighting window of its own, either one flat colour or three — sky, horizon and ground — blended along the surface normal. Lighting is computed in linear space, with tonemapping to choose from (none, PBR Neutral or ACES) and an intensity for environment reflections.',
      'a040.p4': 'The main light casts a shadow map, hard or soft, with a strength and two biases to keep the surface free of acne. Edges are smoothed with MSAA.',
      'a040.cap1': 'A meadow of imported models under a directional light with soft shadows, and an animated fox walking through it',
      'a040.credit1a': 'Scenery: ',
      'a040.credit1b': 'Nature Kit by Kenney',
      'a040.credit1c': '. Fox: ',
      'a040.credit1d': 'Khronos glTF Sample Assets',
      'a040.h3': 'Instancing',
      'a040.p5': 'On the web a draw call is the first thing to run out, and a thousand identical objects drawn one by one are a thousand of them. Graphics.DrawMeshInstanced draws one mesh with one material in many places at once: the matrices go into a single buffer and the GPU gets one call for all of them. An overload takes a colour per instance as well.',
      'a040.p6': 'In the clip below there is not a single MeshRenderer in the scene. A field of 64 × 48 columns, whose heights and colours are recomputed every frame, and 120 ducks circling above it — 3,192 objects with lighting and shadows — take two draw calls, as the counter in the corner shows: one for the columns, one for the ducks. Instancing is a module of its own in the build settings, so a project that does not use it does not carry it.',
      'a040.cap2': '3,072 columns and 120 ducks in two DrawMeshInstanced calls: Drawcalls: 2 in the corner',
      'a040.credit2a': 'Duck: ',
      'a040.credit2b': 'Khronos glTF Sample Assets',
      'a040.h4': 'Scenes a diff can read',
      'a040.p7': 'Scenes and prefabs used to be saved as one line of minified JSON. Git saw every save as the whole file changing, and object ids were handed out afresh on each save, so inserting one object renumbered every object after it. Now a file is still JSON, but every field sits on a line of its own:',
      'a040.p8': 'Changing a field is one line in the diff, a new object is only its own lines, and two people editing different fields of one component merge without a conflict. An id now lives on the object and stays with it from save to save; new ones are random 64-bit numbers, so two branches that each added an object cannot hand out the same id. Floats are written as floats — 0.92 rather than 0.9200000166893005. Old single-line files open as they are, and Resave All Scenes and Prefabs rewrites a project in one go.',
      'a040.h5': 'The build reads binary',
      'a040.p9': 'Text is for the editor and for git; the game does not need it. When a build is made, every scene and prefab is baked into a binary file next to its source, and that is what the game loads. Field names are matched against the type once per shape of object instead of once per field of every object, values are read in sequence, and Instantiate creates a prefab straight from the binary without a round trip through a JSON document. One file serves every platform: integers are stored without a fixed width, so the same file reads on wasm and on desktop.',
      'a040.p10': 'This is a win in load time and memory, not in traffic: compressed, the binary and the JSON weigh about the same. The editor still keeps and edits the text.',
      'a040.h6': 'Also in this release',
      'a040.li1': 'A mesh from code, two ways: vertices, triangles and RecalculateNormals, or SetData, which uploads at once and keeps no CPU copy.',
      'a040.li2': 'Sprites and tiles in the world read the depth of meshes: a mesh hides a sprite behind it, while sprites keep their order among themselves.',
      'a040.li3': 'On import each mesh keeps only the vertices it uses: exporters often share one buffer between many parts, and every part used to carry a copy of all of it.',
      'a040.li4': 'The Unity project converter brings over MeshFilter and MeshRenderer along with the models.',

      /* --- Magic School: from Unity to ScopeBee ------------------------------ */
      'ams.meta.title': 'Magic School — from Unity to ScopeBee',
      'ams.meta.desc': 'Magic School moved from Unity to ScopeBee: the same game, measured twice — build size, download, load time and memory.',
      'ams.when': '29 OCT 2026',
      'ams.title': 'Magic School: from Unity to ScopeBee',
      'ams.card.title': 'Magic School: from Unity to ScopeBee',
      'ams.card.text': 'The same game on two engines: a build 2.8 times smaller, the game on screen 5.9 times sooner, 4.6 times less memory.',
      'ams.lead': 'Magic School was a Unity game. Now it runs on ScopeBee \u2014 the same game with the same code and art, and both builds are on this site, so the difference can be measured rather than described.',
      'ams.play': 'Play it in the browser',
      'ams.alt1': 'Magic School loading screen art',
      'ams.h1': 'One game, two builds',
      'ams.p1': 'This is not a small demo made for a benchmark: Magic School is a full game with locations, UI, animation and saves. Both builds print the same timing lines from the game code itself \u2014 when the preloader shows its first frame and when the main location does \u2014 so the load time is measured by the game, not guessed from the outside.',
      'ams.h2': 'Results',
      'ams.th.build': 'Build size',
      'ams.th.preloader': 'Preloader on screen',
      'ams.th.location': 'Main location on screen',
      'ams.table.note': 'Measured on a local server that serves everything in brotli, so that the speed of the internet connection stays out of the results: over a real network the download time changes from run to run and would bury the difference between the engines.',
      'ams.h3': 'What the move gave the game',
      'ams.i.size': 'A build 2.8 times smaller: 20.9 MB instead of 58.0 MB, and the player downloads 2.8 times less.',
      'ams.i.start': 'A start 5.9 times sooner: the main location is on screen in under a second rather than in almost six.',
      'ams.i.scene': 'Almost no wait between the preloader and the game: 0.3 s on ScopeBee, 3.8 s on Unity.',
      'ams.i.mem': '4.6 times less memory: 94.7 MB instead of 434.4 MB \u2014 the figure a phone browser runs out of first.',
      'ams.h4': 'How it was measured',
      'ams.p2': 'Each build was served from its own local server that serves only its folder in brotli, with caching off, so the speed of the connection stays out of the result. Every load is a cold one in a fresh Chrome profile on Apple Silicon, driven over the DevTools protocol; each figure is the median of five loads.',
      'ams.m.build': 'Build size \u2014 every file of the build folder on disk, as it is published.',
      'ams.m.net': 'Transferred \u2014 what the server actually sent, by its own log.',
      'ams.m.res': 'Resources \u2014 the same files after decompression.',
      'ams.m.first': 'Preloader and main location on screen \u2014 the lines the game prints on its first frame of each, performance.now() counted from opening the page, download included.',
      'ams.m.heap': 'Heap Snapshot \u2014 a heap snapshot of the page ten seconds after the main location appears, after garbage collection.',
      'ams.note': 'The Unity build is Unity 6000.4. For how the other engines compare on a smaller game, see',
      'ams.note.link': 'the engine comparison',
      'ams.h5': 'Try it',
      'ams.p3': 'Open both builds side by side and watch which one reaches the game first.',

      /* --- Candy Balance remake ---------------------------------------------- */
      'acandy.meta.title': 'Candy Balance — a Flash game remade in ScopeBee',
      'acandy.meta.desc': 'A remake of a Flash game released more than 14 years ago: sound, streamed music, physics, tags and animated objects, and what the build weighs.',
      'acandy.when': '24 SEP 2026',
      'acandy.title': 'Candy Balance: a Flash game, remade',
      'acandy.card.title': 'Candy Balance: a Flash game, remade',
      'acandy.card.text': 'A Flash game from more than 14 years ago, rebuilt with tags, physics materials, joints, animation and streamed music.',
      'acandy.lead': 'A remake of a game that came out on Flash more than 14 years ago. Flash is long gone from the browser; the game is back in it, rebuilt on ScopeBee.',
      'acandy.play': 'Play it in the browser',
      'acandy.h1': 'A remake, not a port',
      'acandy.p1': 'The original was a Flash game, and Flash stopped running in browsers at the end of 2020, taking thousands of games like it along. The remake is built in the ScopeBee editor, with the game code in Beef.',
      'acandy.h2': 'What is inside',
      'acandy.p2': 'What the game uses from the engine:',
      'acandy.i.tags': 'Tags — collision handlers identify the other body by its tag, so one rule covers every object with that tag.',
      'acandy.i.mats': 'Physics materials — friction and bounce per body; density and gravity scale on Rigidbody2D, including negative gravity.',
      'acandy.i.blast': 'Physics queries and impulses — OverlapCircle finds the bodies around a point, AddForce pushes them.',
      'acandy.i.hinge': 'Joints — HingeJoint2D with angle limits.',
      'acandy.i.anim': 'Animator — state machines on the objects themselves, with the clip length read from the asset.',
      'acandy.i.sound': 'Audio — one-shot effects and streamed music.',
      'acandy.h3': 'What it weighs',
      'acandy.p3': 'A whole game with sound and music, measured the same way as every other figure on this site.',
      'acandy.w.net': 'Transferred',
      'acandy.w.res': 'Resources',
      'acandy.w.first': 'First frame',
      'acandy.w.heap': 'Heap snapshot',
      'acandy.w.note': 'Transferred is what the browser downloads on a cold load; Resources is the size of everything the page loaded, as Chrome DevTools reports it on the Network tab. First frame is the line the build prints when its first frame is drawn. Heap snapshot is a Chrome DevTools heap snapshot on the idle main menu.',
      'acandy.h4': 'Try it',
      'acandy.p4': 'The build runs in the browser: turn the sound on and play a few levels.',
      'acandy.alt1': 'The Candy Balance main menu',

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
    }
  };

  var bag = window.SCOPEBEE_I18N_EXTRA || (window.SCOPEBEE_I18N_EXTRA = {});
  Object.keys(add).forEach(function (lang) {
    if (!bag[lang]) bag[lang] = {};
    Object.keys(add[lang]).forEach(function (key) { bag[lang][key] = add[lang][key]; });
  });
})();
