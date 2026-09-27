/* iNWEB static website — v0.2.0 */
(() => {
  'use strict';

  const documentElement = document.documentElement;
  const languageButtons = [...document.querySelectorAll('[data-language-button]')];
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const header = document.querySelector('[data-header]');
  const searchInput = document.querySelector('#team-search');
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const teamCards = [...document.querySelectorAll('[data-member]')];
  const resultCount = document.querySelector('[data-result-count]');
  const clearFilters = document.querySelector('[data-clear-filters]');
  const emptyState = document.querySelector('[data-empty-state]');

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
      // Language selection still works when browser storage is unavailable.
    }
  }

  let language = readLanguagePreference();
  if (!['en', 'bn'].includes(language)) {
    language = navigator.language.toLowerCase().startsWith('bn') ? 'bn' : 'en';
  }
  let activeFilter = 'all';

  const interfaceText = {
    en: {
      title: 'iNWEB — Engineering with clarity',
      description: 'Meet iNWEB, a multidisciplinary engineering team across architecture, security, web, mobile, backend, quality and delivery.',
      openMenu: 'Open navigation',
      closeMenu: 'Close navigation',
      noSpecialists: 'No specialists',
      specialist: 'specialist',
      specialists: 'specialists',
      copyright: `© ${new Date().getFullYear()} iNWEB. Built with clarity.`
    },
    bn: {
      title: 'iNWEB — স্বচ্ছতার সঙ্গে ইঞ্জিনিয়ারিং',
      description: 'আর্কিটেকচার, নিরাপত্তা, ওয়েব, মোবাইল, ব্যাকএন্ড, কোয়ালিটি ও ডেলিভারির বহুমুখী iNWEB টিম।',
      openMenu: 'নেভিগেশন খুলুন',
      closeMenu: 'নেভিগেশন বন্ধ করুন',
      noSpecialists: 'কোনো বিশেষজ্ঞ নেই',
      specialist: 'জন বিশেষজ্ঞ',
      specialists: 'জন বিশেষজ্ঞ',
      copyright: `© ${new Intl.NumberFormat('bn').format(new Date().getFullYear())} iNWEB। স্বচ্ছতার সঙ্গে নির্মিত।`
    }
  };

  function updateMenuLabel() {
    if (!menuButton) return;
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-label', expanded ? interfaceText[language].closeMenu : interfaceText[language].openMenu);
  }

  function setTextLanguage(nextLanguage) {
    language = nextLanguage;
    storeLanguagePreference(language);
    documentElement.lang = language;
    documentElement.dataset.language = language;
    document.title = interfaceText[language].title;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', interfaceText[language].description);

    document.querySelectorAll('[data-en][data-bn]').forEach((element) => {
      element.textContent = element.dataset[language];
    });
    document.querySelectorAll('[data-placeholder-en]').forEach((element) => {
      element.setAttribute('placeholder', element.dataset[`placeholder${language === 'en' ? 'En' : 'Bn'}`]);
    });
    document.querySelectorAll('[data-aria-en]').forEach((element) => {
      element.setAttribute('aria-label', element.dataset[`aria${language === 'en' ? 'En' : 'Bn'}`]);
    });
    languageButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.languageButton === language));
    });

    const copyright = document.querySelector('[data-copyright]');
    if (copyright) copyright.textContent = interfaceText[language].copyright;
    updateMenuLabel();
    filterDirectory();
  }

  function toggleMenu(forceOpen) {
    if (!menuButton || !mobileMenu) return;
    const nextOpen = typeof forceOpen === 'boolean' ? forceOpen : menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(nextOpen));
    mobileMenu.hidden = !nextOpen;
    updateMenuLabel();
  }

  function resultLabel(count) {
    if (count === 0) return interfaceText[language].noSpecialists;
    const number = new Intl.NumberFormat(language).format(count);
    const noun = count === 1 ? interfaceText[language].specialist : interfaceText[language].specialists;
    return `${number} ${noun}`;
  }

  function filterDirectory() {
    if (!searchInput || !resultCount) return;
    const query = searchInput.value.trim().toLocaleLowerCase(language);
    let visible = 0;

    teamCards.forEach((card) => {
      const matchesDepartment = activeFilter === 'all' || card.dataset.department === activeFilter;
      const searchValue = card.dataset[language === 'en' ? 'searchEn' : 'searchBn'].toLocaleLowerCase(language);
      const matchesSearch = !query || searchValue.includes(query);
      const matches = matchesDepartment && matchesSearch;
      card.hidden = !matches;
      if (matches) visible += 1;
    });

    resultCount.textContent = resultLabel(visible);
    if (emptyState) emptyState.hidden = visible !== 0;
    if (clearFilters) clearFilters.hidden = !query && activeFilter === 'all';
  }

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => setTextLanguage(button.dataset.languageButton));
  });

  if (menuButton) menuButton.addEventListener('click', () => toggleMenu());
  if (mobileMenu) {
    mobileMenu.addEventListener('click', (event) => {
      if (event.target.closest('a')) toggleMenu(false);
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterDirectory);
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((candidate) => {
        const selected = candidate === button;
        candidate.classList.toggle('is-active', selected);
        candidate.setAttribute('aria-pressed', String(selected));
      });
      filterDirectory();
    });
  });

  if (clearFilters) {
    clearFilters.addEventListener('click', () => {
      activeFilter = 'all';
      if (searchInput) searchInput.value = '';
      filterButtons.forEach((button) => {
        const selected = button.dataset.filter === 'all';
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      filterDirectory();
      if (searchInput) searchInput.focus();
    });
  }

  filterButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter));
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = [...document.querySelectorAll('.reveal')];
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {threshold: 0.12}
    );
    documentElement.classList.add('js');
    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const navigationLinks = [...document.querySelectorAll('.desktop-navigation a')];
  const observedSections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const navigationObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visibleEntry) return;
        navigationLinks.forEach((link) => {
          link.classList.toggle('is-current', link.getAttribute('href') === `#${visibleEntry.target.id}`);
        });
      },
      {rootMargin: '-25% 0px -65% 0px', threshold: [0, 0.25]}
    );
    observedSections.forEach((section) => navigationObserver.observe(section));
  }

  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  }, {passive: true});

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) toggleMenu(false);
  });

  setTextLanguage(language);
})();
