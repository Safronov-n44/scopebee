// core.js — ядро веб-коннектора ScopeBee (CoPlatform / CoAds / CoPlayer / CoCloudSaves).
//
// build_web.sh склеивает этот файл с адаптерами отмеченных площадок (yandex.js, crazygames.js, telegram.js)
// в build/web/<Проект>/sb_platform.js и подключает его в шелл ОТДЕЛЬНЫМ <script> до index.js:
// файл идёт мимо Closure (здесь можно писать обычный JS), SDK площадки грузится параллельно
// с wasm. Ни одна площадка не отмечена — файла нет вовсе, C-мост видит отсутствие глобали.
//
// Контракт с C-мостом (external/src/platform/platform_web.c), ключи менять только парно:
//   globalThis.CowPlatform.call(op, req, arg, s1, s2) → int   (Beef → JS, синхронно)
//   globalThis.CowPlatform.queue  — [{k: kind, c: code, s: string|null}]   (JS → Beef)
//   globalThis.CowPlatform.cur    — последнее снятое событие
//   globalThis.CowPlatform.getStr(key) → string|null
// Константы E / OP / STR / CAPS — зеркало enum'ов в src/Engine/Platform/PlatformBridge.bf.
//
// Инвариант: JS никогда не зовёт wasm. Всё асинхронное превращается в записи очереди,
// Beef снимает их раз в кадр. Вызовы из Beef до подключения SDK копятся в pending и
// уходят после init (в том числе GameReady — лоадер площадки снимется вовремя).
//
// Контракт адаптера (см. yandex.js / crazygames.js / telegram.js):
//   обязательные: name, caps{interstitial,rewarded,banner,auth,profile,cloud},
//                 load(ok, fail), init(ok(env), fail); env = {lang, appId, payload, country, device}
//   опциональные: gameReady, gameplayStart, gameplayStop, happyTime,
//                 showInterstitial(req, cb), showRewarded(req, cb)  — cb: onOpen/onRewarded/onClose(shown)/onError(msg)
//                 showBanner(req, on) → emit BANNER_STATUS
//                 requestAuth(req), refreshPlayer(req)               → emit AUTH_CHANGED / PLAYER_INFO
//                 cloudLoad(req, key), cloudSave(req, key, value, flush), cloudRemove(req, key)
//   Адаптер сам держит P.player = {authorized, id, name, photo} и сам подписывается на паузу
//   SDK (P.setPaused(2, on)) и мьют (P.emit(E.AUDIO_MUTE, 1|0)).
(function () {
  'use strict';

  var E = {
    CONNECTED: 100, CONNECT_FAILED: 101, PAUSE: 102, RESUME: 103, AUDIO_MUTE: 104,
    AD_OPENED: 200, AD_REWARDED: 201, AD_FINISHED: 202, AD_FAILED: 203, BANNER_STATUS: 204,
    AUTH_CHANGED: 300, PLAYER_INFO: 301,
    CLOUD_LOADED: 400, CLOUD_LOAD_FAILED: 401, CLOUD_SAVED: 402, CLOUD_SAVE_FAILED: 403
  };
  var OP = {
    ID: 0, IS_CONNECTED: 1, CAPS: 2,
    GAME_READY: 10, GAMEPLAY_START: 11, GAMEPLAY_STOP: 12, HAPPY_TIME: 13,
    AD_SHOW: 20, BANNER_SHOW: 21,
    PLAYER_IS_AUTHORIZED: 30, PLAYER_REQUEST_AUTH: 31, PLAYER_REFRESH: 32,
    CLOUD_LOAD: 40, CLOUD_SAVE: 41, CLOUD_REMOVE: 42
  };
  var STR = { LANG: 0, APP_ID: 1, PAYLOAD: 2, COUNTRY: 3, PLATFORM_NAME: 4, PLAYER_ID: 10, PLAYER_NAME: 11, PLAYER_PHOTO: 12 };
  var CAPS = { ADS: 0, PLAYER: 1, CLOUD: 2, DEVICE: 3 };
  var IDS = { none: 0, yandex: 1, crazygames: 2, telegram: 4 };   // 3 — playable.js
  var SDK_NAMES = { yandex: 'Yandex Games', crazygames: 'CrazyGames', telegram: 'Telegram Mini Apps' };

  function now() {
    try { return performance.now(); } catch (e) { return Date.now(); }
  }

  // Детект по хосту страницы, referrer'а и предков iframe (PATTERNS) либо по следам запуска
  // в самой странице (MARKERS). Самое хрупкое место слоя, поэтому первым идёт явный
  // override ?sb_platform=<id> (в том числе =none).
  var PATTERNS = [
    { id: 'yandex', re: /(^|\.)yandex\.[a-z]+$|(^|\.)yandex\.net$|games\.s3\.yandex|(^|\.)ya\.ru$|yandexcloud\.net$/i },
    { id: 'crazygames', re: /(^|\.)crazygames\.[a-z]+$|(^|\.)1001juegos\.com$|(^|\.)onlinegames\.io$/i }
  ];

  // Площадки без своего хоста — по следам запуска в самой странице, проверяются ДО хостов.
  // Telegram: клиент открывает Mini App на домене игры и кладёт параметры запуска в хеш
  // (#tgWebAppData=…&tgWebAppPlatform=…); SDK сохраняет их в sessionStorage, откуда они
  // переживают перезагрузку страницы, когда хеш уже снят.
  var MARKERS = [
    { id: 'telegram', test: function () {
      try { if (/(^|[#&])tgWebApp(Platform|Data|Version)=/.test(globalThis.location.hash)) { return true; } } catch (e) {}
      try { return !!globalThis.sessionStorage.getItem('__telegram__initParams'); } catch (e) {}
      return false;
    } }
  ];

  function hostOf(url) {
    try { return url ? new URL(url).hostname : ''; } catch (e) { return ''; }
  }

  var P = {
    E: E, OP: OP, STR: STR, CAPS: CAPS,
    adapters: {},
    adapter: null,
    id: 'none',
    state: 'idle',          // idle | loading | connecting | connected
    queue: [],
    cur: null,
    pending: [],
    env: { lang: '', appId: '', payload: '', country: '', device: 0 },
    player: { authorized: false, id: '', name: '', photo: '' },
    pauseSources: {},

    log: function (level, msg, extra) {
      try { (console[level] || console.log)('[CowPlatform] ' + msg, extra === undefined ? '' : extra); } catch (e) {}
    },

    // Лог инициализации SDK: тег [INIT] + мс от начала загрузки страницы (performance.now),
    // чтобы по одному фильтру в консоли видеть старт, успех/сбой и длительность.
    initLog: function (level, msg) {
      try { (console[level] || console.log)('[INIT] [' + Math.round(now()) + ' ms] ' + msg); } catch (e) {}
    },

    emit: function (kind, code, str) {
      this.queue.push({ k: kind | 0, c: code | 0, s: (str === undefined || str === null) ? null : String(str) });
    },

    register: function (name, factory) {
      this.adapters[name] = factory;
    },

    detect: function () {
      var forced = '';
      try { forced = new URLSearchParams(globalThis.location.search).get('sb_platform') || ''; } catch (e) {}
      if (forced) { return forced; }

      for (var m = 0; m < MARKERS.length; m++) {
        if (MARKERS[m].test()) { return MARKERS[m].id; }
      }

      var hosts = [];
      try { hosts.push(globalThis.location.hostname); } catch (e) {}
      try { hosts.push(hostOf(document.referrer)); } catch (e) {}
      try {
        var anc = globalThis.location.ancestorOrigins;
        if (anc) { for (var i = 0; i < anc.length; i++) { hosts.push(hostOf(anc[i])); } }
      } catch (e) {}

      for (var h = 0; h < hosts.length; h++) {
        if (!hosts[h]) { continue; }
        for (var p = 0; p < PATTERNS.length; p++) {
          if (PATTERNS[p].re.test(hosts[h])) { return PATTERNS[p].id; }
        }
      }
      return 'none';
    },

    loadScript: function (src, ok, fail) {
      var s = document.createElement('script');
      s.async = true;
      s.src = src;
      s.onload = function () { ok(); };
      s.onerror = function () { fail('script load failed: ' + src); };
      document.head.appendChild(s);
    },

    // detect → adapter.load → adapter.init → connected. Любой сбой — площадка none:
    // игра работает без SDK, Beef получает CONNECT_FAILED, затем CONNECTED(none).
    boot: function () {
      var self = this;
      var id = this.detect();
      if (!this.adapters[id]) {
        if (id !== 'none') { this.log('warn', 'platform "' + id + '" detected but its adapter is not in this build'); }
        id = 'none';
      }
      this.id = id;
      this.state = 'loading';
      this.log('info', 'platform: ' + id);

      var sdk = (SDK_NAMES[id] || id) + ' SDK';
      var tLoad = now();
      var tInit = 0;
      if (id === 'none') {
        this.initLog('info', 'no platform SDK detected, running without SDK');
      }

      var failed = function (reason) {
        if (id !== 'none') {
          var stage = tInit ? 'initialization' : 'script loading';
          var since = tInit || tLoad;
          self.initLog('warn', sdk + ': ' + stage + ' FAILED after ' + Math.round(now() - since) + ' ms: ' + reason);
          self.initLog('warn', 'falling back to no platform SDK');
        }
        self.log('warn', 'connect failed (' + id + '): ' + reason);
        self.emit(E.CONNECT_FAILED, IDS[id] || 0, String(reason));
        self.id = 'none';
        self.adapter = self.adapters.none(self);
        self.adapter.init(function (env) { self.connected(env); }, function () { self.connected({}); });
      };

      var succeeded = function (env) {
        if (id !== 'none') {
          var t = now();
          self.initLog('info', sdk + ': initialized successfully in ' + Math.round(t - tInit) +
            ' ms (total ' + Math.round(t - tLoad) + ' ms since loading started)');
        }
        self.connected(env);
      };

      try {
        this.adapter = this.adapters[id](this);
        if (id !== 'none') { this.initLog('info', sdk + ': loading script...'); }
        this.adapter.load(function () {
          self.state = 'connecting';
          if (id !== 'none') {
            tInit = now();
            self.initLog('info', sdk + ': script loaded in ' + Math.round(tInit - tLoad) + ' ms');
            self.initLog('info', sdk + ': initialization started');
          }
          try {
            self.adapter.init(succeeded, failed);
          } catch (e) { failed(e && e.message || e); }
        }, failed);
      } catch (e) { failed(e && e.message || e); }
    },

    connected: function (env) {
      env = env || {};
      this.env = {
        lang: String(env.lang || '').slice(0, 2).toLowerCase(),
        appId: String(env.appId || ''),
        payload: String(env.payload || ''),
        country: String(env.country || ''),
        device: env.device | 0
      };
      this.state = 'connected';
      this.emit(E.CONNECTED, IDS[this.id] || 0);
      var q = this.pending;
      this.pending = [];
      for (var i = 0; i < q.length; i++) { q[i](); }
    },

    capsMask: function (category) {
      var c = (this.adapter && this.adapter.caps) || {};
      switch (category) {
        case CAPS.ADS: return (c.interstitial ? 1 : 0) | (c.rewarded ? 2 : 0) | (c.banner ? 4 : 0);
        case CAPS.PLAYER: return (c.auth ? 1 : 0) | (c.profile ? 2 : 0);
        case CAPS.CLOUD: return c.cloud ? 1 : 0;
        case CAPS.DEVICE: return this.env.device | 0;
      }
      return 0;
    },

    // Вызов метода адаптера. До connected — в pending (SDK ещё грузится, ответ придёт позже);
    // метода нет — failKind с 'unsupported'; исключение — failKind с текстом.
    invoke: function (method, failKind, req, args) {
      var self = this;
      if (this.state !== 'connected') {
        this.pending.push(function () { self.invoke(method, failKind, req, args); });
        return 0;
      }
      var fn = this.adapter[method];
      if (typeof fn !== 'function') {
        if (failKind) { this.emit(failKind, req, 'unsupported'); }
        return 0;
      }
      try {
        fn.apply(this.adapter, [req].concat(args));
      } catch (e) {
        this.log('error', method + ' threw', e);
        if (failKind) { this.emit(failKind, req, String(e && e.message || e)); }
      }
      return 1;
    },

    showAd: function (type) {
      var self = this;
      var cb = {
        onOpen: function () { self.emit(E.AD_OPENED, type); },
        onRewarded: function () { self.emit(E.AD_REWARDED, type); },
        onClose: function (shown) { self.emit(E.AD_FINISHED, shown ? 1 : 0); },
        onError: function (msg) { self.emit(E.AD_FAILED, type, msg == null ? 'error' : String(msg)); }
      };
      return this.invoke(type === 1 ? 'showRewarded' : 'showInterstitial', E.AD_FAILED, type, [cb]);
    },

    call: function (op, req, arg, s1, s2) {
      switch (op) {
        case OP.ID: return IDS[this.id] || 0;
        case OP.IS_CONNECTED: return this.state === 'connected' ? 1 : 0;
        case OP.CAPS: return this.capsMask(arg);

        case OP.GAME_READY: return this.invoke('gameReady', 0, req, []);
        case OP.GAMEPLAY_START: return this.invoke('gameplayStart', 0, req, []);
        case OP.GAMEPLAY_STOP: return this.invoke('gameplayStop', 0, req, []);
        case OP.HAPPY_TIME: return this.invoke('happyTime', 0, req, []);

        case OP.AD_SHOW: return this.showAd(arg);
        case OP.BANNER_SHOW: return this.invoke('showBanner', E.BANNER_STATUS, 0, [arg === 1]);

        case OP.PLAYER_IS_AUTHORIZED: return this.player.authorized ? 1 : 0;
        case OP.PLAYER_REQUEST_AUTH: return this.invoke('requestAuth', E.AUTH_CHANGED, req, []);
        case OP.PLAYER_REFRESH: return this.invoke('refreshPlayer', E.PLAYER_INFO, req, []);

        case OP.CLOUD_LOAD: return this.invoke('cloudLoad', E.CLOUD_LOAD_FAILED, req, [s1]);
        case OP.CLOUD_SAVE: return this.invoke('cloudSave', E.CLOUD_SAVE_FAILED, req, [s1, s2 == null ? '' : s2, arg === 1]);
        case OP.CLOUD_REMOVE: return this.invoke('cloudRemove', E.CLOUD_SAVE_FAILED, req, [s1]);
      }
      this.log('warn', 'unknown op ' + op);
      return 0;
    },

    getStr: function (key) {
      switch (key) {
        case STR.LANG: return this.env.lang;
        case STR.APP_ID: return this.env.appId;
        case STR.PAYLOAD: return this.env.payload;
        case STR.COUNTRY: return this.env.country;
        case STR.PLATFORM_NAME: return this.id;
        case STR.PLAYER_ID: return this.player.id;
        case STR.PLAYER_NAME: return this.player.name;
        case STR.PLAYER_PHOTO: return this.player.photo;
      }
      return null;
    },

    // source: 1 — вкладка скрыта, 2 — площадка (Yandex game_api_pause, Telegram deactivated). Дубликаты одного
    // источника отсекаются здесь, чтобы не гонять очередь на каждый visibilitychange.
    setPaused: function (source, on) {
      on = !!on;
      if (!!this.pauseSources[source] === on) { return; }
      this.pauseSources[source] = on;
      this.emit(on ? E.PAUSE : E.RESUME, source);
    },

    // Контейнер стики-баннера (CrazyGames responsive banner). Создаётся лениво.
    bannerContainer: function () {
      var el = document.getElementById('cow-banner');
      if (!el) {
        el = document.createElement('div');
        el.id = 'cow-banner';
        el.style.cssText = 'position:fixed;left:0;right:0;bottom:0;height:90px;display:flex;justify-content:center;align-items:flex-end;pointer-events:auto;z-index:10';
        document.body.appendChild(el);
      }
      return el;
    },

    deviceType: function (s) {
      switch (String(s || '').toLowerCase()) {
        case 'desktop': return 1;
        case 'mobile': return 2;
        case 'tablet': return 3;
        case 'tv': return 4;
      }
      return 0;
    }
  };

  // Скрытая вкладка = пауза на любой площадке (требование Яндекса 1.3: звук глушится при
  // потере фокуса; Yandex дополнительно шлёт game_api_pause — маска в Beef это переживает).
  try {
    document.addEventListener('visibilitychange', function () { P.setPaused(1, document.hidden); });
  } catch (e) {}

  // Площадка none: SDK нет. Реклама симулируется (лог + награда), чтобы игровой флоу
  // проверялся в обычном браузере; кнопку игра прячет по caps (rewarded=false).
  // Облако — localStorage.
  P.register('none', function (P) {
    var E = P.E;
    function ls() { try { return globalThis.localStorage; } catch (e) { return null; } }
    return {
      name: 'none',
      caps: { interstitial: false, rewarded: false, banner: false, auth: false, profile: false, cloud: true },
      load: function (ok) { ok(); },
      init: function (ok) {
        var lang = '';
        try { lang = (navigator.language || '').slice(0, 2); } catch (e) {}
        ok({ lang: lang, device: 0 });
      },
      showInterstitial: function (req, cb) {
        P.log('info', 'simulated interstitial');
        cb.onOpen();
        setTimeout(function () { cb.onClose(true); }, 500);
      },
      showRewarded: function (req, cb) {
        P.log('info', 'simulated rewarded');
        cb.onOpen();
        setTimeout(function () { cb.onRewarded(); cb.onClose(true); }, 500);
      },
      cloudLoad: function (req, key) {
        var s = ls();
        var v = s ? s.getItem('cow_cloud.' + key) : null;
        P.emit(E.CLOUD_LOADED, req, v === null ? null : v);
      },
      cloudSave: function (req, key, value) {
        var s = ls();
        if (!s) { P.emit(E.CLOUD_SAVE_FAILED, req, 'no localStorage'); return; }
        s.setItem('cow_cloud.' + key, value);
        P.emit(E.CLOUD_SAVED, req);
      },
      cloudRemove: function (req, key) {
        var s = ls();
        if (s) { s.removeItem('cow_cloud.' + key); }
        P.emit(E.CLOUD_SAVED, req);
      }
    };
  });

  globalThis.CowPlatform = P;
  // Адаптеры из склейки регистрируются синхронно ниже по файлу — boot после них.
  setTimeout(function () { P.boot(); }, 0);
})();

// telegram.js — адаптер Telegram Mini Apps для веб-коннектора ScopeBee (склеивается за core.js).
// Документация SDK: https://core.telegram.org/bots/webapps
//
// Детект — не по хосту (игра лежит на своём домене), а по параметрам запуска, которые клиент
// Telegram кладёт в хеш страницы (MARKERS в core.js). SDK telegram-web-app.js грузится
// динамически, как у остальных площадок; читает он тот же хеш, так что порядок не важен.
//
// Что делает init, помимо окружения: expand() — Mini App на всю высоту (иначе ~¾ экрана);
// на телефонах ещё requestFullscreen() (Bot API 8.0 — убирает и шапку Telegram; на десктопе
// не зовём: окно клиента ушло бы в настоящий полноэкранный режим); disableVerticalSwipes()
// (7.7 — вертикальный жест по игре больше не сворачивает её; по шапке — сворачивает, так
// задумано площадкой); пауза по activated/deactivated (8.0 — Mini App свёрнут или ушёл в
// неактивную вкладку). ready() — по GameReady: это снимает заглушку загрузки Telegram, и
// звать его раньше первого кадра нельзя. Рекламы у площадки нет (caps false, методы не
// объявлены — ядро отвечает 'unsupported'). Игрок — из initDataUnsafe.user, авторизация
// неявная (auth=false). Облако — WebApp.CloudStorage (6.9): ключ 1–128 символов [A-Za-z0-9_-],
// значение ≤ 4096 символов, до 1024 ключей.
// Локальная проверка: открыть билд с ?sb_platform=telegram — SDK загрузится, platform будет
// 'unknown', его методы — no-op, облако ответит ошибкой; жизненный цикл при этом виден в логе.
CowPlatform.register('telegram', function (P) {
  'use strict';
  var E = P.E;
  var W = null;
  var MAX_VALUE = 4096;

  function errStr(e) {
    if (!e) { return 'error'; }
    return String(e.message || e);
  }

  function atLeast(v) {
    try { return typeof W.isVersionAtLeast === 'function' && W.isVersionAtLeast(v); } catch (e) { return false; }
  }

  function on(event, fn) {
    try { W.onEvent(event, fn); } catch (e) {}
  }

  // Ключ CloudStorage: только [A-Za-z0-9_-], не длиннее 128. Игры шлют ключи вида
  // "cb.progress" — точка меняется на '_' детерминированно, одинаково для load/save/remove.
  function ckey(key) {
    return String(key || '').replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 128) || '_';
  }

  function deviceOf(platform) {
    switch (String(platform || '')) {
      case 'android': case 'android_x': case 'ios': return 2;        // Mobile
      case 'tdesktop': case 'macos': case 'weba': case 'webk': case 'web': return 1;  // Desktop
    }
    return 0;
  }

  function isPhone(platform) { return deviceOf(platform) === 2; }

  function publishUser(u) {
    var name = '';
    if (u) {
      name = [u.first_name, u.last_name].filter(Boolean).join(' ').trim() || String(u.username || '');
    }
    P.player = {
      authorized: !!u,
      id: u && u.id != null ? String(u.id) : '',
      name: name,
      photo: u ? String(u.photo_url || '') : ''
    };
    P.emit(E.AUTH_CHANGED, u ? 1 : 0);
  }

  var A = {
    name: 'telegram',
    caps: { interstitial: false, rewarded: false, banner: false, auth: false, profile: true, cloud: false },

    load: function (ok, fail) {
      if (globalThis.Telegram && globalThis.Telegram.WebApp) { ok(); return; }
      P.loadScript('https://telegram.org/js/telegram-web-app.js', ok, fail);
    },

    init: function (ok, fail) {
      W = globalThis.Telegram && globalThis.Telegram.WebApp;
      if (!W) { fail('window.Telegram.WebApp missing'); return; }

      var platform = '';
      try { platform = String(W.platform || ''); } catch (e) {}
      if (!platform || platform === 'unknown') {
        P.log('warn', 'running outside the Telegram client: SDK calls are no-ops, CloudStorage unavailable');
      }

      // Разворот. Каждый вызов в своём try: отсутствие метода у старого клиента — не сбой init.
      try { W.expand(); } catch (e) {}
      if (atLeast('7.7')) {
        try { W.disableVerticalSwipes(); } catch (e) {}
      }
      if (atLeast('8.0')) {
        if (isPhone(platform)) {
          on('fullscreenFailed', function (ev) { P.log('warn', 'fullscreen failed: ' + (ev && ev.error || 'unknown')); });
          try { W.requestFullscreen(); } catch (e) {}
        }
        on('activated', function () { P.setPaused(2, false); });
        on('deactivated', function () { P.setPaused(2, true); });
      }
      // Фон за канвасом во время анимации разворота — чёрный, как шелл; иначе мигает тема.
      if (atLeast('6.1')) {
        try { W.setBackgroundColor('#000000'); } catch (e) {}
      }

      var data = {};
      try { data = W.initDataUnsafe || {}; } catch (e) {}
      var u = data.user || null;
      A.caps.profile = !!u;
      A.caps.cloud = atLeast('6.9') && !!W.CloudStorage;

      var lang = '';
      try { lang = String((u && u.language_code) || navigator.language || '').slice(0, 2); } catch (e) {}
      ok({ lang: lang, appId: '', payload: String(data.start_param || ''), country: '', device: deviceOf(platform) });

      publishUser(u);
    },

    // --- Жизненный цикл: ready() снимает заглушку загрузки Telegram ---
    gameReady: function () { try { W.ready(); } catch (e) {} },

    // --- Игрок: данные статичны на сессию, запрос авторизации не нужен (auth=false) ---
    refreshPlayer: function (req) { P.emit(E.PLAYER_INFO, 0); },

    // --- Облако: WebApp.CloudStorage, колбэки (err, value) ---
    cloudLoad: function (req, key) {
      try {
        W.CloudStorage.getItem(ckey(key), function (err, v) {
          if (err) { P.emit(E.CLOUD_LOAD_FAILED, req, errStr(err)); return; }
          P.emit(E.CLOUD_LOADED, req, (v === undefined || v === null || v === '') ? null : String(v));
        });
      } catch (e) { P.emit(E.CLOUD_LOAD_FAILED, req, errStr(e)); }
    },
    cloudSave: function (req, key, value) {
      var s = value == null ? '' : String(value);
      if (s.length > MAX_VALUE) {
        P.emit(E.CLOUD_SAVE_FAILED, req, 'value too large (' + s.length + ' > ' + MAX_VALUE + ' chars)');
        return;
      }
      try {
        W.CloudStorage.setItem(ckey(key), s, function (err) {
          if (err) { P.emit(E.CLOUD_SAVE_FAILED, req, errStr(err)); return; }
          P.emit(E.CLOUD_SAVED, req);
        });
      } catch (e) { P.emit(E.CLOUD_SAVE_FAILED, req, errStr(e)); }
    },
    cloudRemove: function (req, key) {
      try {
        W.CloudStorage.removeItem(ckey(key), function (err) {
          if (err) { P.emit(E.CLOUD_SAVE_FAILED, req, errStr(err)); return; }
          P.emit(E.CLOUD_SAVED, req);
        });
      } catch (e) { P.emit(E.CLOUD_SAVE_FAILED, req, errStr(e)); }
    }
  };
  return A;
});
