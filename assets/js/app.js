/* iNWEB static website — v0.1.0 */
(() => {
  'use strict';

  const profiles = {
    yoursamibd: {
      name: 'YourSamiBD',
      initials: 'YS',
      role: {en: 'CEO & Founder', bn: 'সিইও ও প্রতিষ্ঠাতা'},
      department: {en: 'Leadership', bn: 'নেতৃত্ব'},
      bio: {
        en: 'YourSamiBD leads iNWEB with a focus on durable products, focused teams and responsible technology decisions. The role connects company direction, client outcomes and the conditions engineers need to deliver with confidence.',
        bn: 'YourSamiBD দীর্ঘস্থায়ী প্রোডাক্ট, মনোযোগী টিম এবং দায়িত্বশীল প্রযুক্তিগত সিদ্ধান্তের ওপর গুরুত্ব দিয়ে iNWEB পরিচালনা করেন। এই ভূমিকা প্রতিষ্ঠানের দিকনির্দেশনা, ক্লায়েন্টের ফলাফল এবং আত্মবিশ্বাসের সঙ্গে কাজ করার পরিবেশকে একত্র করে।'
      },
      expertise: {en: ['Leadership', 'Product direction', 'Partnerships'], bn: ['নেতৃত্ব', 'প্রোডাক্ট দিকনির্দেশনা', 'অংশীদারিত্ব']}
    },
    inana: {
      name: 'iNWEB-iNANA', initials: 'IN', role: {en: 'Manager', bn: 'ম্যানেজার'}, department: {en: 'Leadership', bn: 'নেতৃত্ব'},
      bio: {en: 'iNWEB-iNANA coordinates the operational rhythm behind the team. The role keeps priorities visible, removes avoidable friction and helps specialist disciplines work together around clear delivery outcomes.', bn: 'iNWEB-iNANA টিমের পেছনের পরিচালন ছন্দ সমন্বয় করেন। এই ভূমিকা অগ্রাধিকার দৃশ্যমান রাখে, অপ্রয়োজনীয় বাধা দূর করে এবং বিশেষায়িত টিমগুলোকে সুস্পষ্ট ফলাফলের জন্য একসঙ্গে কাজ করতে সহায়তা করে।'},
      expertise: {en: ['Operations', 'Coordination', 'Team enablement'], bn: ['অপারেশন', 'সমন্বয়', 'টিম সহায়তা']}
    },
    aira: {
      name: 'iNWEB-AIRA', initials: 'AI', role: {en: 'Project Leader', bn: 'প্রজেক্ট লিডার'}, department: {en: 'Leadership', bn: 'নেতৃত্ব'},
      bio: {en: 'iNWEB-AIRA leads project execution across specialist disciplines. The role translates outcomes into manageable increments, keeps decisions visible and helps the team respond to risk without losing direction.', bn: 'iNWEB-AIRA বিশেষায়িত টিমগুলোর মধ্যে প্রজেক্ট বাস্তবায়নের নেতৃত্ব দেন। এই ভূমিকা ফলাফলকে পরিচালনাযোগ্য ধাপে ভাগ করে, সিদ্ধান্ত দৃশ্যমান রাখে এবং দিক না হারিয়ে ঝুঁকির প্রতি সাড়া দিতে সহায়তা করে।'},
      expertise: {en: ['Project leadership', 'Planning', 'Delivery'], bn: ['প্রজেক্ট নেতৃত্ব', 'পরিকল্পনা', 'ডেলিভারি']}
    },
    apex: {
      name: 'iNWEB-APEX', initials: 'AP', role: {en: 'Architecture Lead', bn: 'আর্কিটেকচার লিড'}, department: {en: 'Architecture', bn: 'আর্কিটেকচার'},
      bio: {en: 'iNWEB-APEX guides architecture across product and platform work. The role makes constraints explicit, evaluates trade-offs and creates foundations that remain understandable as products evolve.', bn: 'iNWEB-APEX প্রোডাক্ট ও প্ল্যাটফর্মের আর্কিটেকচার নির্দেশনা দেন। এই ভূমিকা সীমাবদ্ধতা স্পষ্ট করে, বিকল্পের ভারসাম্য মূল্যায়ন করে এবং প্রোডাক্ট পরিবর্তনের সঙ্গে বোধগম্য থাকে এমন ভিত্তি গড়ে তোলে।'},
      expertise: {en: ['System architecture', 'Technical strategy', 'Design reviews'], bn: ['সিস্টেম আর্কিটেকচার', 'টেকনিক্যাল স্ট্র্যাটেজি', 'ডিজাইন রিভিউ']}
    },
    beacon: {
      name: 'iNWEB-BEACON', initials: 'BE', role: {en: 'Technical Direction', bn: 'টেকনিক্যাল ডিরেকশন'}, department: {en: 'Architecture', bn: 'আর্কিটেকচার'},
      bio: {en: 'iNWEB-BEACON connects day-to-day engineering choices with the broader technical direction. The role clarifies standards, supports reviews and helps teams choose maintainable solutions.', bn: 'iNWEB-BEACON দৈনন্দিন ইঞ্জিনিয়ারিং সিদ্ধান্তকে বৃহত্তর প্রযুক্তিগত দিকনির্দেশনার সঙ্গে যুক্ত করেন। এই ভূমিকা স্ট্যান্ডার্ড স্পষ্ট করে, রিভিউয়ে সহায়তা করে এবং রক্ষণাবেক্ষণযোগ্য সমাধান বেছে নিতে সাহায্য করে।'},
      expertise: {en: ['Technical direction', 'Engineering standards', 'Mentoring'], bn: ['টেকনিক্যাল দিকনির্দেশনা', 'ইঞ্জিনিয়ারিং স্ট্যান্ডার্ড', 'মেন্টরিং']}
    },
    aegis: {
      name: 'iNWEB-AEGIS', initials: 'AE', role: {en: 'Security Engineer', bn: 'সিকিউরিটি ইঞ্জিনিয়ার'}, department: {en: 'Security', bn: 'নিরাপত্তা'},
      bio: {en: 'iNWEB-AEGIS focuses on application security from early design through release. The role supports threat modelling, secure implementation patterns and risk-based review that teams can act on.', bn: 'iNWEB-AEGIS প্রাথমিক ডিজাইন থেকে রিলিজ পর্যন্ত অ্যাপ্লিকেশন নিরাপত্তায় কাজ করেন। এই ভূমিকা থ্রেট মডেলিং, নিরাপদ বাস্তবায়ন প্যাটার্ন এবং কার্যকর ঝুঁকিভিত্তিক রিভিউয়ে সহায়তা করে।'},
      expertise: {en: ['Application security', 'Threat modelling', 'Secure design'], bn: ['অ্যাপ্লিকেশন নিরাপত্তা', 'থ্রেট মডেলিং', 'নিরাপদ ডিজাইন']}
    },
    vault: {
      name: 'iNWEB-VAULT', initials: 'VA', role: {en: 'Core Security Engineer', bn: 'কোর সিকিউরিটি ইঞ্জিনিয়ার'}, department: {en: 'Security', bn: 'নিরাপত্তা'},
      bio: {en: 'iNWEB-VAULT works on core controls that protect systems and operational access. The role focuses on secure defaults, secrets handling and hardening measures that remain clear enough to maintain.', bn: 'iNWEB-VAULT সিস্টেম ও অপারেশনাল অ্যাক্সেস সুরক্ষিত রাখার মূল নিয়ন্ত্রণে কাজ করেন। এই ভূমিকা নিরাপদ ডিফল্ট, সিক্রেটস ব্যবস্থাপনা এবং রক্ষণাবেক্ষণযোগ্য হার্ডেনিং ব্যবস্থায় গুরুত্ব দেয়।'},
      expertise: {en: ['Platform security', 'Secrets', 'Hardening'], bn: ['প্ল্যাটফর্ম নিরাপত্তা', 'সিক্রেটস', 'হার্ডেনিং']}
    },
    cipher: {
      name: 'iNWEB-CIPHER', initials: 'CI', role: {en: 'Cryptography Engineer', bn: 'ক্রিপ্টোগ্রাফি ইঞ্জিনিয়ার'}, department: {en: 'Security', bn: 'নিরাপত্তা'},
      bio: {en: 'iNWEB-CIPHER supports decisions involving encryption, signatures, key handling and protocol boundaries. The role favours established primitives, explicit threat assumptions and reviewable designs.', bn: 'iNWEB-CIPHER এনক্রিপশন, স্বাক্ষর, কী ব্যবস্থাপনা ও প্রোটোকল সীমা সম্পর্কিত সিদ্ধান্তে সহায়তা করেন। এই ভূমিকা প্রতিষ্ঠিত প্রিমিটিভ, স্পষ্ট থ্রেট ধারণা এবং পর্যালোচনাযোগ্য ডিজাইনকে অগ্রাধিকার দেয়।'},
      expertise: {en: ['Cryptography', 'Data protection', 'Protocol review'], bn: ['ক্রিপ্টোগ্রাফি', 'ডেটা সুরক্ষা', 'প্রোটোকল রিভিউ']}
    },
    nova: {
      name: 'iNWEB-NOVA', initials: 'NO', role: {en: 'Android Engineer', bn: 'অ্যান্ড্রয়েড ইঞ্জিনিয়ার'}, department: {en: 'Mobile', bn: 'মোবাইল'},
      bio: {en: 'iNWEB-NOVA focuses on Android product engineering, from application structure and interaction to performance and release quality. The role keeps mobile choices aligned with the wider product system.', bn: 'iNWEB-NOVA অ্যাপ্লিকেশন কাঠামো ও ইন্টারঅ্যাকশন থেকে পারফরম্যান্স ও রিলিজ মান পর্যন্ত অ্যান্ড্রয়েড প্রোডাক্ট ইঞ্জিনিয়ারিংয়ে কাজ করেন। এই ভূমিকা মোবাইল সিদ্ধান্তকে বৃহত্তর প্রোডাক্ট সিস্টেমের সঙ্গে সমন্বিত রাখে।'},
      expertise: {en: ['Android', 'Mobile architecture', 'Performance'], bn: ['অ্যান্ড্রয়েড', 'মোবাইল আর্কিটেকচার', 'পারফরম্যান্স']}
    },
    orbit: {
      name: 'iNWEB-ORBIT', initials: 'OR', role: {en: 'iOS Engineer', bn: 'আইওএস ইঞ্জিনিয়ার'}, department: {en: 'Mobile', bn: 'মোবাইল'},
      bio: {en: 'iNWEB-ORBIT develops iOS experiences with close attention to interaction, integration and operational quality. The role balances platform conventions with a consistent cross-product experience.', bn: 'iNWEB-ORBIT ইন্টারঅ্যাকশন, ইন্টিগ্রেশন ও পরিচালন মানে গুরুত্ব দিয়ে আইওএস অভিজ্ঞতা তৈরি করেন। এই ভূমিকা প্ল্যাটফর্ম কনভেনশন এবং সব প্রোডাক্টের সমন্বিত অভিজ্ঞতার মধ্যে ভারসাম্য রাখে।'},
      expertise: {en: ['iOS', 'Mobile experience', 'Platform integration'], bn: ['আইওএস', 'মোবাইল অভিজ্ঞতা', 'প্ল্যাটফর্ম ইন্টিগ্রেশন']}
    },
    horizon: {
      name: 'iNWEB-HORIZON', initials: 'HO', role: {en: 'Web Engineer', bn: 'ওয়েব ইঞ্জিনিয়ার'}, department: {en: 'Web', bn: 'ওয়েব'},
      bio: {en: 'iNWEB-HORIZON works across web architecture, rendering and browser experience. The role prioritises accessible foundations, measured performance and progressive enhancement.', bn: 'iNWEB-HORIZON আধুনিক ওয়েব আর্কিটেকচার, রেন্ডারিং ও ব্রাউজার অভিজ্ঞতা নিয়ে কাজ করেন। এই ভূমিকা প্রবেশযোগ্য ভিত্তি, পরিমাপযোগ্য পারফরম্যান্স এবং প্রগ্রেসিভ এনহ্যান্সমেন্টকে অগ্রাধিকার দেয়।'},
      expertise: {en: ['Web engineering', 'Performance', 'Accessibility'], bn: ['ওয়েব ইঞ্জিনিয়ারিং', 'পারফরম্যান্স', 'অ্যাক্সেসিবিলিটি']}
    },
    forge: {
      name: 'iNWEB-FORGE', initials: 'FO', role: {en: 'Backend & CI Engineer', bn: 'ব্যাকএন্ড ও CI ইঞ্জিনিয়ার'}, department: {en: 'Backend', bn: 'ব্যাকএন্ড'},
      bio: {en: 'iNWEB-FORGE works across backend services, API contracts and continuous integration. The role connects dependable runtime behaviour with fast, repeatable feedback before production.', bn: 'iNWEB-FORGE ব্যাকএন্ড সার্ভিস, এপিআই কন্ট্রাক্ট এবং কন্টিনিউয়াস ইন্টিগ্রেশন নিয়ে কাজ করেন। এই ভূমিকা নির্ভরযোগ্য রানটাইম আচরণকে প্রোডাকশনের আগের দ্রুত ও পুনরাবৃত্তিযোগ্য ফিডব্যাকের সঙ্গে যুক্ত করে।'},
      expertise: {en: ['Backend systems', 'APIs', 'Continuous integration'], bn: ['ব্যাকএন্ড সিস্টেম', 'এপিআই', 'কন্টিনিউয়াস ইন্টিগ্রেশন']}
    },
    canvas: {
      name: 'iNWEB-CANVAS', initials: 'CA', role: {en: 'Frontend Engineer', bn: 'ফ্রন্টএন্ড ইঞ্জিনিয়ার'}, department: {en: 'Web', bn: 'ওয়েব'},
      bio: {en: 'iNWEB-CANVAS builds frontend foundations and interaction patterns that keep experiences consistent. The role works with design, content and engineering to make interfaces useful at every screen size.', bn: 'iNWEB-CANVAS ফ্রন্টএন্ড ভিত্তি ও ইন্টারঅ্যাকশন প্যাটার্ন তৈরি করেন যা অভিজ্ঞতাকে সামঞ্জস্যপূর্ণ রাখে। এই ভূমিকা ডিজাইন, কনটেন্ট ও ইঞ্জিনিয়ারিংয়ের সঙ্গে কাজ করে প্রতিটি স্ক্রিনে ইন্টারফেসকে কার্যকর করে।'},
      expertise: {en: ['Frontend systems', 'Design systems', 'Interaction'], bn: ['ফ্রন্টএন্ড সিস্টেম', 'ডিজাইন সিস্টেম', 'ইন্টারঅ্যাকশন']}
    },
    veritas: {
      name: 'iNWEB-VERITAS', initials: 'VE', role: {en: 'Quality Engineer', bn: 'কোয়ালিটি ইঞ্জিনিয়ার'}, department: {en: 'Quality', bn: 'কোয়ালিটি'},
      bio: {en: 'iNWEB-VERITAS develops quality strategy across features, integrations and releases. The role combines exploratory thinking with focused automation so teams can make decisions with evidence.', bn: 'iNWEB-VERITAS ফিচার, ইন্টিগ্রেশন ও রিলিজজুড়ে কোয়ালিটি স্ট্র্যাটেজি তৈরি করেন। এই ভূমিকা অনুসন্ধানী চিন্তাকে লক্ষ্যভিত্তিক অটোমেশনের সঙ্গে মিলিয়ে প্রমাণভিত্তিক সিদ্ধান্তে সহায়তা করে।'},
      expertise: {en: ['Quality strategy', 'Test automation', 'Risk assessment'], bn: ['কোয়ালিটি স্ট্র্যাটেজি', 'টেস্ট অটোমেশন', 'ঝুঁকি মূল্যায়ন']}
    },
    pulse: {
      name: 'iNWEB-PULSE', initials: 'PU', role: {en: 'DevOps Engineer', bn: 'ডেভঅপস ইঞ্জিনিয়ার'}, department: {en: 'Delivery', bn: 'ডেলিভারি'},
      bio: {en: 'iNWEB-PULSE focuses on deployment systems, runtime visibility and operational feedback. The role makes the path to production repeatable and gives teams the signals needed to operate responsibly.', bn: 'iNWEB-PULSE ডেপ্লয়মেন্ট সিস্টেম, রানটাইম দৃশ্যমানতা ও অপারেশনাল ফিডব্যাক নিয়ে কাজ করেন। এই ভূমিকা প্রোডাকশনের পথকে পুনরাবৃত্তিযোগ্য করে এবং দায়িত্বশীল পরিচালনার জন্য প্রয়োজনীয় সংকেত দেয়।'},
      expertise: {en: ['DevOps', 'Observability', 'Cloud operations'], bn: ['ডেভঅপস', 'পর্যবেক্ষণ', 'ক্লাউড অপারেশন']}
    },
    relay: {
      name: 'iNWEB-RELAY', initials: 'RE', role: {en: 'CD Engineer', bn: 'CD ইঞ্জিনিয়ার'}, department: {en: 'Delivery', bn: 'ডেলিভারি'},
      bio: {en: 'iNWEB-RELAY works on continuous-delivery workflows, release controls and deployment automation. The role aims to make releases understandable, reversible and proportionate to risk.', bn: 'iNWEB-RELAY কন্টিনিউয়াস ডেলিভারি ওয়ার্কফ্লো, রিলিজ নিয়ন্ত্রণ এবং ডেপ্লয়মেন্ট অটোমেশন নিয়ে কাজ করেন। এই ভূমিকা রিলিজকে বোধগম্য, পূর্বাবস্থায় ফেরানোযোগ্য এবং ঝুঁকির সঙ্গে সামঞ্জস্যপূর্ণ করতে কাজ করে।'},
      expertise: {en: ['Continuous delivery', 'Release automation', 'Deployment safety'], bn: ['কন্টিনিউয়াস ডেলিভারি', 'রিলিজ অটোমেশন', 'ডেপ্লয়মেন্ট নিরাপত্তা']}
    }
  };

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
  const profileDialog = document.querySelector('[data-profile-dialog]');
  const dialogClose = document.querySelector('[data-dialog-close]');

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
      // The interface still works when storage is unavailable or blocked.
    }
  }

  let language = readLanguagePreference();
  if (!['en', 'bn'].includes(language)) {
    language = navigator.language.toLowerCase().startsWith('bn') ? 'bn' : 'en';
  }
  let activeFilter = 'all';
  let currentProfile = null;

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

  function setTextLanguage(nextLanguage) {
    language = nextLanguage;
    storeLanguagePreference(language);
    documentElement.lang = language;
    documentElement.dataset.language = language;
    document.title = interfaceText[language].title;
    document.querySelector('meta[name="description"]').setAttribute('content', interfaceText[language].description);

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
    document.querySelectorAll('[data-profile]').forEach((button) => {
      const profile = profiles[button.dataset.profile];
      const action = language === 'en' ? 'View profile for' : 'প্রোফাইল দেখুন';
      if (profile) button.setAttribute('aria-label', `${action} ${profile.name}`);
    });

    const copyright = document.querySelector('[data-copyright]');
    if (copyright) copyright.textContent = interfaceText[language].copyright;
    updateMenuLabel();
    filterDirectory();
    if (currentProfile && profileDialog.open) populateDialog(currentProfile);
  }

  function updateMenuLabel() {
    if (!menuButton) return;
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-label', expanded ? interfaceText[language].closeMenu : interfaceText[language].openMenu);
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

  function populateDialog(profileId) {
    const profile = profiles[profileId];
    if (!profile || !profileDialog) return;
    currentProfile = profileId;
    profileDialog.querySelector('[data-dialog-avatar]').textContent = profile.initials;
    profileDialog.querySelector('[data-dialog-department]').textContent = profile.department[language];
    profileDialog.querySelector('[data-dialog-name]').textContent = profile.name;
    profileDialog.querySelector('[data-dialog-role]').textContent = profile.role[language];
    profileDialog.querySelector('[data-dialog-bio]').textContent = profile.bio[language];

    const expertiseList = profileDialog.querySelector('[data-dialog-expertise]');
    expertiseList.replaceChildren();
    profile.expertise[language].forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      expertiseList.append(listItem);
    });
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

  document.querySelectorAll('[data-profile]').forEach((button) => {
    button.addEventListener('click', () => {
      populateDialog(button.dataset.profile);
      profileDialog.showModal();
    });
  });
  if (dialogClose) dialogClose.addEventListener('click', () => profileDialog.close());
  if (profileDialog) {
    profileDialog.addEventListener('click', (event) => {
      if (event.target === profileDialog) profileDialog.close();
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
