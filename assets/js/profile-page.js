/* iNWEB individual profile pages — v0.2.0 */
(() => {
  'use strict';

  const documentElement = document.documentElement;
  const page = document.querySelector('[data-profile-page]');
  const languageButtons = [...document.querySelectorAll('[data-language-button]')];

  function readLanguagePreference() {
    try {
      return localStorage.getItem('inweb-language');
    } catch {
      return null;
    }
  }

  function storeLanguagePreference(value) {
    try {
      localStorage.setItem('inweb-language', value);
    } catch {
      // Language selection remains available for the current page.
    }
  }

  let language = readLanguagePreference();
  if (!['en', 'bn'].includes(language)) {
    language = navigator.language.toLowerCase().startsWith('bn') ? 'bn' : 'en';
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage;
    storeLanguagePreference(language);
    documentElement.lang = language;
    documentElement.dataset.language = language;

    document.querySelectorAll('[data-en][data-bn]').forEach((element) => {
      element.textContent = element.dataset[language];
    });
    document.querySelectorAll('[data-aria-en]').forEach((element) => {
      element.setAttribute('aria-label', element.dataset[`aria${language === 'en' ? 'En' : 'Bn'}`]);
    });
    languageButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.languageButton === language));
    });

    if (page) {
      document.title = page.dataset[`title${language === 'en' ? 'En' : 'Bn'}`];
      const description = document.querySelector('meta[name="description"]');
      if (description) {
        description.setAttribute('content', page.dataset[`description${language === 'en' ? 'En' : 'Bn'}`]);
      }
    }

    const copyright = document.querySelector('[data-copyright]');
    if (copyright) {
      const year = new Intl.NumberFormat(language).format(new Date().getFullYear());
      copyright.textContent = language === 'en'
        ? `© ${year} iNWEB. Professional role profile.`
        : `© ${year} iNWEB। পেশাগত ভূমিকার প্রোফাইল।`;
    }
  }

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.languageButton));
  });

  setLanguage(language);
})();
