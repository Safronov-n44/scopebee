/* Strings for the showcase section.

   Same shape and the same rules as news/news-i18n.js: loaded before main.js,
   every visible string carries data-i18n and lives here.
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
      'showcase.icon.candybalance': 'Candy Balance icon',
      'showcase.icon.magicschool': 'Magic School icon',
      'showcase.desc.magicschool': 'A full game moved from Unity to ScopeBee: locations, UI, animation and saves \u2014 and the main location on screen in under a second.',
      'showcase.desc.candybalance': 'A Flash game from more than 14 years ago, remade on ScopeBee with physics, joints, animation and streamed music.',
    }
  };

  var bag = window.SCOPEBEE_I18N_EXTRA || (window.SCOPEBEE_I18N_EXTRA = {});
  Object.keys(add).forEach(function (lang) {
    if (!bag[lang]) bag[lang] = {};
    Object.keys(add[lang]).forEach(function (key) { bag[lang][key] = add[lang][key]; });
  });
})();
