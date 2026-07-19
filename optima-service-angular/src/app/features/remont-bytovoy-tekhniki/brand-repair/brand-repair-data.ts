export interface BrandRepairData {
  brandName: string;
  slug: string;
  meta: { title: string; description: string };
  hero: {
    titleLine1: string;
    titleAccent: string;
    subtitle: string;
    features: string[];
    // Своё фото для этого бренда+вида техники. Необязательное — если не
    // задано, страница показывает общее фото вида техники (deviceData.hero.image).
    image?: string;
  };
}

export const BRAND_REPAIR_DATA: Record<string, Record<string, BrandRepairData>> = {

  'kholodilniki': {
    'haier': {
      brandName: 'Haier', slug: 'haier',
      meta: {
        title: 'Ремонт холодильников Haier в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт холодильников Haier в Ростове-на-Дону. Замена компрессора, заправка фреоном, ремонт электроники. Оригинальные запчасти, гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт холодильников',
        titleAccent: 'Haier',
        subtitle: 'Профессиональный ремонт холодильников Haier всех серий. Оригинальные запчасти, выезд мастера на дом, гарантия до 90 дней.',
        features: ['Оригинальные запчасти Haier', 'Выезд на дом', 'Бесплатная диагностика', 'Гарантия до 90 дней', 'Все серии Haier']
      }
    },
    'lg': {
      brandName: 'LG', slug: 'lg',
      meta: {
        title: 'Ремонт холодильников LG в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт холодильников LG в Ростове-на-Дону. No Frost, линейные компрессоры, InstaView. Оригинальные запчасти, гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт холодильников',
        titleAccent: 'LG',
        subtitle: 'Ремонт холодильников LG с технологиями No Frost, линейный компрессор, InstaView Door-in-Door. Знаем особенности каждой серии.',
        features: ['Знаем технологии LG', 'Линейный компрессор', 'No Frost системы', 'Оригинальные запчасти', 'Гарантия до 90 дней']
      }
    },
    'gorenje': {
      brandName: 'Gorenje', slug: 'gorenje',
      meta: {
        title: 'Ремонт холодильников Gorenje в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт холодильников Gorenje в Ростове-на-Дону. Все серии и модели. Оригинальные запчасти, выезд мастера, гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт холодильников',
        titleAccent: 'Gorenje',
        subtitle: 'Ремонт холодильников Gorenje всех серий — от бюджетных до премиальных моделей. Оригинальные запчасти и гарантия.',
        features: ['Все серии Gorenje', 'Оригинальные запчасти', 'Выезд на дом', 'Бесплатная диагностика', 'Гарантия до 90 дней']
      }
    }
  },

  'stiralnye-mashiny': {
    'bosch': {
      brandName: 'Bosch', slug: 'bosch',
      meta: {
        title: 'Ремонт стиральных машин Bosch в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт стиральных машин Bosch в Ростове-на-Дону. Замена подшипников, ТЭНа, модуля управления. Оригинальные запчасти, гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт стиральных машин',
        titleAccent: 'Bosch',
        subtitle: 'Ремонт стиральных машин Bosch Serie 2, 4, 6, 8. Знаем типичные неисправности каждой линейки. Оригинальные запчасти.',
        features: ['Serie 2 / 4 / 6 / 8', 'Оригинальные запчасти Bosch', 'Выезд на дом', 'Гарантия до 90 дней', 'Ремонт за 1–2 часа']
      }
    },
    'samsung': {
      brandName: 'Samsung', slug: 'samsung',
      meta: {
        title: 'Ремонт стиральных машин Samsung в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт стиральных машин Samsung в Ростове-на-Дону. AddWash, EcoBubble, WW, WD серии. Оригинальные запчасти, гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт стиральных машин',
        titleAccent: 'Samsung',
        subtitle: 'Ремонт стиральных машин Samsung с технологиями AddWash, EcoBubble, AI Control. Разбираемся в особенностях каждой серии.',
        features: ['AddWash / EcoBubble', 'Оригинальные запчасти Samsung', 'Выезд на дом', 'Гарантия до 90 дней', 'Ремонт за 1–2 часа']
      }
    },
    'indesit': {
      brandName: 'Indesit', slug: 'indesit',
      meta: {
        title: 'Ремонт стиральных машин Indesit в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт стиральных машин Indesit в Ростове-на-Дону. Замена подшипников, ТЭНа, помпы. Оригинальные запчасти, гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт стиральных машин',
        titleAccent: 'Indesit',
        subtitle: 'Ремонт стиральных машин Indesit всех моделей. Типичные проблемы — подшипники, ТЭН, помпа — решаем быстро и недорого.',
        features: ['Все модели Indesit', 'Доступные цены', 'Выезд на дом', 'Бесплатная диагностика', 'Гарантия до 90 дней']
      }
    }
  },

  'posudomoechnye-mashiny': {
    'bosch': {
      brandName: 'Bosch', slug: 'bosch',
      meta: {
        title: 'Ремонт посудомоечных машин Bosch в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт посудомоечных машин Bosch в Ростове-на-Дону. Serie 2, 4, 6, 8. Замена помпы, ТЭНа, устранение протечек. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт посудомоечных машин',
        titleAccent: 'Bosch',
        subtitle: 'Ремонт посудомоечных машин Bosch Serie 2, 4, 6, 8. Знаем все коды ошибок и типичные неисправности. Оригинальные запчасти.',
        features: ['Serie 2 / 4 / 6 / 8', 'Оригинальные запчасти Bosch', 'Все коды ошибок', 'Выезд на дом', 'Гарантия до 90 дней']
      }
    },
    'siemens': {
      brandName: 'Siemens', slug: 'siemens',
      meta: {
        title: 'Ремонт посудомоечных машин Siemens в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт посудомоечных машин Siemens в Ростове-на-Дону. iQ300, iQ500, iQ700. Оригинальные запчасти, гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт посудомоечных машин',
        titleAccent: 'Siemens',
        subtitle: 'Ремонт посудомоечных машин Siemens iQ300, iQ500, iQ700. Платформа совместима с Bosch — знаем каждую деталь.',
        features: ['iQ300 / iQ500 / iQ700', 'Оригинальные запчасти', 'Выезд на дом', 'Бесплатная диагностика', 'Гарантия до 90 дней']
      }
    },
    'electrolux': {
      brandName: 'Electrolux', slug: 'electrolux',
      meta: {
        title: 'Ремонт посудомоечных машин Electrolux в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт посудомоечных машин Electrolux в Ростове-на-Дону. Все серии, оригинальные запчасти, гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт посудомоечных машин',
        titleAccent: 'Electrolux',
        subtitle: 'Ремонт посудомоечных машин Electrolux всех серий. Протечка, ошибки, не сливает — устраним любую неисправность.',
        features: ['Все серии Electrolux', 'Оригинальные запчасти', 'Выезд на дом', 'Бесплатная диагностика', 'Гарантия до 90 дней']
      }
    }
  },

  'kofemashiny': {
    'delonghi': {
      brandName: 'DeLonghi', slug: 'delonghi',
      meta: {
        title: 'Ремонт кофемашин DeLonghi в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт кофемашин DeLonghi в Ростове-на-Дону. Magnifica, Dinamica, Eletta. Ремонт заварочного блока, замена помпы. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт кофемашин',
        titleAccent: 'DeLonghi',
        subtitle: 'Ремонт кофемашин DeLonghi Magnifica, Dinamica, Eletta, Perfecta. Знаем все модели — от простых до премиальных.',
        features: ['Magnifica / Dinamica / Eletta', 'Ремонт заварочного блока', 'Чистка молочного контура', 'Оригинальные запчасти', 'Гарантия до 90 дней']
      }
    },
    'jura': {
      brandName: 'Jura', slug: 'jura',
      meta: {
        title: 'Ремонт кофемашин Jura в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт кофемашин Jura в Ростове-на-Дону. E, S, Z, F, WE серии. Профессиональный ремонт швейцарских кофемашин. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт кофемашин',
        titleAccent: 'Jura',
        subtitle: 'Ремонт кофемашин Jura серий E, S, Z, F, WE, X. Швейцарская точность требует профессионального подхода — доверяйте опытным мастерам.',
        features: ['E / S / Z / F / WE / X серии', 'Сложный ремонт Jura', 'Оригинальные запчасти', 'Чистка и обслуживание', 'Гарантия до 90 дней']
      }
    },
    'philips': {
      brandName: 'Philips', slug: 'philips',
      meta: {
        title: 'Ремонт кофемашин Philips в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт кофемашин Philips в Ростове-на-Дону. Series 1200, 2200, 3200, 5400. Ремонт заварочного блока, чистка. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт кофемашин',
        titleAccent: 'Philips',
        subtitle: 'Ремонт кофемашин Philips Series 1200, 2200, 3200, 5400. Быстрая диагностика, оригинальные запчасти, ремонт в день обращения.',
        features: ['Series 1200 / 2200 / 3200 / 5400', 'Ремонт заварочного блока', 'Декальцинация', 'Оригинальные запчасти', 'Гарантия до 90 дней']
      }
    }
  },

  'pylesosy': {
    'dyson': {
      brandName: 'Dyson', slug: 'dyson',
      meta: {
        title: 'Ремонт пылесосов Dyson в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт пылесосов Dyson в Ростове-на-Дону. V7, V8, V10, V11, V12, V15. Замена аккумулятора, ремонт двигателя. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт пылесосов',
        titleAccent: 'Dyson',
        subtitle: 'Ремонт беспроводных пылесосов Dyson V7, V8, V10, V11, V12, V15 Detect. Замена аккумулятора, ремонт двигателя, чистка циклона.',
        features: ['V7 / V8 / V10 / V11 / V12 / V15', 'Замена аккумулятора Dyson', 'Ремонт двигателя', 'Оригинальные запчасти', 'Гарантия до 90 дней']
      }
    },
    'dreame': {
      brandName: 'Dreame', slug: 'dreame',
      meta: {
        title: 'Ремонт пылесосов Dreame в Ростове-на-Дону — Optima Сервис',
        description: 'Авторизованный ремонт пылесосов Dreame в Ростове-на-Дону. T20, T30, T30 Pro, L20 Ultra и другие. Оригинальные запчасти, гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт пылесосов',
        titleAccent: 'Dreame',
        subtitle: 'Авторизованный сервисный центр Dreame в Ростове-на-Дону. Ремонт T20, T30, T30 Pro, L20 Ultra, H12 и других моделей.',
        features: ['Авторизованный сервис Dreame', 'Оригинальные запчасти', 'T20 / T30 / L20 Ultra', 'Гарантийный ремонт', 'Гарантия до 90 дней']
      }
    },
    'xiaomi': {
      brandName: 'Xiaomi', slug: 'xiaomi',
      meta: {
        title: 'Ремонт пылесосов Xiaomi в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт пылесосов Xiaomi Mi Vacuum и роботов Roborock в Ростове-на-Дону. Замена аккумулятора, ремонт навигации. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт пылесосов',
        titleAccent: 'Xiaomi',
        subtitle: 'Ремонт пылесосов Xiaomi Mi Vacuum Cleaner G9, G10, G11 и роботов Roborock, Mi Robot Vacuum. Замена АКБ, ремонт лидара.',
        features: ['Mi Vacuum G9 / G10 / G11', 'Роботы Roborock', 'Замена аккумулятора', 'Ремонт навигации', 'Гарантия до 90 дней']
      }
    }
  },

  'mikrovolnovye-pechi': {
    'samsung': {
      brandName: 'Samsung', slug: 'samsung',
      meta: {
        title: 'Ремонт микроволновок Samsung в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт микроволновых печей Samsung в Ростове-на-Дону. Замена магнетрона, блока питания, дверцы. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт микроволновых печей',
        titleAccent: 'Samsung',
        subtitle: 'Ремонт микроволновых печей Samsung всех серий. Не греет, искрит, не включается — устраним любую неисправность.',
        features: ['Все серии Samsung', 'Замена магнетрона', 'Ремонт платы управления', 'Оригинальные запчасти', 'Гарантия до 90 дней']
      }
    },
    'lg': {
      brandName: 'LG', slug: 'lg',
      meta: {
        title: 'Ремонт микроволновок LG в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт микроволновых печей LG в Ростове-на-Дону. NeoChef, Smart Inverter и другие серии. Оригинальные запчасти, гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт микроволновых печей',
        titleAccent: 'LG',
        subtitle: 'Ремонт микроволновых печей LG NeoChef, Smart Inverter. Инверторные технологии — разбираемся в особенностях.',
        features: ['NeoChef / Smart Inverter', 'Инверторные модели', 'Оригинальные запчасти', 'Выезд на дом', 'Гарантия до 90 дней']
      }
    },
    'panasonic': {
      brandName: 'Panasonic', slug: 'panasonic',
      meta: {
        title: 'Ремонт микроволновок Panasonic в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт микроволновых печей Panasonic в Ростове-на-Дону. Inverter технология. Замена магнетрона, ремонт инвертора. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт микроволновых печей',
        titleAccent: 'Panasonic',
        subtitle: 'Ремонт микроволновых печей Panasonic с Inverter технологией. Знаем особенности инверторных схем и умеем их ремонтировать.',
        features: ['Inverter технология', 'Ремонт инвертора', 'Замена магнетрона', 'Оригинальные запчасти', 'Гарантия до 90 дней']
      }
    }
  },

  'utyugi-i-parogeneratory': {
    'philips': {
      brandName: 'Philips', slug: 'philips',
      meta: {
        title: 'Ремонт утюгов Philips в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт утюгов и паровых станций Philips в Ростове-на-Дону. PerfectCare, GC, PSG серии. Чистка, замена ТЭНа. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт утюгов',
        titleAccent: 'Philips',
        subtitle: 'Ремонт утюгов и паровых станций Philips PerfectCare, GC, PSG серий. Чистка от накипи, замена ТЭНа, ремонт парогенератора.',
        features: ['PerfectCare / GC / PSG', 'Паровые станции', 'Чистка от накипи', 'Оригинальные запчасти', 'Гарантия до 90 дней']
      }
    },
    'tefal': {
      brandName: 'Tefal', slug: 'tefal',
      meta: {
        title: 'Ремонт утюгов Tefal в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт утюгов и паровых станций Tefal в Ростове-на-Дону. Ultragliss, Pro Express, Access Steam. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт утюгов',
        titleAccent: 'Tefal',
        subtitle: 'Ремонт утюгов и паровых станций Tefal Ultragliss, Pro Express, Access Steam. Быстро восстановим любую модель.',
        features: ['Ultragliss / Pro Express', 'Access Steam', 'Чистка от накипи', 'Оригинальные запчасти', 'Гарантия до 90 дней']
      }
    },
    'rowenta': {
      brandName: 'Rowenta', slug: 'rowenta',
      meta: {
        title: 'Ремонт утюгов Rowenta в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт утюгов и паровых станций Rowenta в Ростове-на-Дону. Focus, Effective Comfort, Silence Steam. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт утюгов',
        titleAccent: 'Rowenta',
        subtitle: 'Ремонт утюгов и паровых станций Rowenta Focus, Effective Comfort, Silence Steam, Perfect Steam. Оригинальные запчасти и гарантия.',
        features: ['Focus / Effective Comfort', 'Silence / Perfect Steam', 'Чистка от накипи', 'Оригинальные запчасти', 'Гарантия до 90 дней']
      }
    }
  }

};
