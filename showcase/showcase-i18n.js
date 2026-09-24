/* Strings for the showcase section.

   Same shape and the same rules as news/news-i18n.js: loaded before main.js,
   every visible string carries data-i18n and lives in BOTH languages here.
   Keys are namespaced showcase.*. Game names are names and carry no key.

   Merges into SCOPEBEE_I18N_EXTRA rather than assigning it: main.js reads one
   global, and a second strings file that assigned would leave only whichever ran
   last. A strings file merges, it never assigns. */

(function () {
  var add = {
    en: {
      'showcase.meta.title': 'Games — ScopeBee showcase',
      'showcase.meta.desc': 'Games built with the ScopeBee engine, playable in the browser.',
      'showcase.tabs.aria': 'Showcase sections',
      'showcase.tab.games': 'Games',
      'showcase.eyebrow': 'Showcase',
      'showcase.lead': 'Games built with ScopeBee. Every one of them runs in the browser, right here on the engine’s site.',
      'showcase.about': 'About the game',
      'showcase.play': 'Play here',
      'showcase.yandex': 'Yandex Games',
      'showcase.pending': 'On moderation',
      'showcase.icon.alt': 'Candy Balance icon',
    },
    ru: {
      'showcase.meta.title': 'Игры — витрина ScopeBee',
      'showcase.meta.desc': 'Игры на движке ScopeBee, в которые можно сыграть прямо в браузере.',
      'showcase.tabs.aria': 'Разделы витрины',
      'showcase.tab.games': 'Игры',
      'showcase.eyebrow': 'Витрина',
      'showcase.lead': 'Игры, сделанные на ScopeBee. Каждая работает в браузере — прямо здесь, на сайте движка.',
      'showcase.about': 'Об игре',
      'showcase.play': 'Играть здесь',
      'showcase.yandex': 'Яндекс Игры',
      'showcase.pending': 'На модерации',
      'showcase.icon.alt': 'Иконка Candy Balance',
    },
  };

  var bag = window.SCOPEBEE_I18N_EXTRA || (window.SCOPEBEE_I18N_EXTRA = {});
  Object.keys(add).forEach(function (lang) {
    if (!bag[lang]) bag[lang] = {};
    Object.keys(add[lang]).forEach(function (key) { bag[lang][key] = add[lang][key]; });
  });
})();
