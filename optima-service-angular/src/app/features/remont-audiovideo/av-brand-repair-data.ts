import { BrandRepairData } from '../remont-bytovoy-tekhniki/brand-repair/brand-repair-data';

export const AV_BRAND_REPAIR_DATA: Record<string, Record<string, BrandRepairData>> = {

  'televizory': {
    'lg': {
      brandName: 'LG', slug: 'lg',
      meta: {
        title: 'Ремонт телевизоров LG в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт телевизоров LG OLED, NanoCell, QNED в Ростове-на-Дону. Замена подсветки, матрицы, ремонт Smart TV. Выезд мастера, гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт телевизоров',
        titleAccent: 'LG',
        subtitle: 'Ремонт телевизоров LG OLED, NanoCell и QNED в Ростове-на-Дону. Выезд мастера на дом, замена подсветки и матрицы. Гарантия до 90 дней.',
        features: ['OLED, NanoCell, QNED', 'Замена подсветки IPS панелей', 'Ремонт WebOS Smart TV', 'Выезд мастера на дом', 'Гарантия до 90 дней']
      }
    },
    'samsung': {
      brandName: 'Samsung', slug: 'samsung',
      meta: {
        title: 'Ремонт телевизоров Samsung в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт телевизоров Samsung QLED, Neo QLED, Crystal UHD в Ростове-на-Дону. Замена подсветки, матрицы, ремонт Tizen Smart TV. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт телевизоров',
        titleAccent: 'Samsung',
        subtitle: 'Ремонт телевизоров Samsung QLED, Neo QLED и Crystal UHD в Ростове-на-Дону. Выезд мастера, ремонт Tizen, замена подсветки. Гарантия до 90 дней.',
        features: ['QLED, Neo QLED, Crystal UHD', 'Ремонт платы One Connect', 'Восстановление Tizen Smart TV', 'Выезд мастера на дом', 'Гарантия до 90 дней']
      }
    },
    'sony': {
      brandName: 'Sony', slug: 'sony',
      meta: {
        title: 'Ремонт телевизоров Sony в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт телевизоров Sony BRAVIA OLED, LED в Ростове-на-Дону. Замена подсветки, матрицы, ремонт Google TV. Выезд мастера, гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт телевизоров',
        titleAccent: 'Sony',
        subtitle: 'Ремонт телевизоров Sony BRAVIA OLED и LED в Ростове-на-Дону. Замена подсветки, ремонт Google TV и Android TV. Гарантия до 90 дней.',
        features: ['BRAVIA OLED, LED, Mini LED', 'Ремонт Google TV / Android TV', 'Замена подсветки', 'Выезд мастера на дом', 'Гарантия до 90 дней']
      }
    }
  },

  'akusticheskie-sistemy': {
    'jbl': {
      brandName: 'JBL', slug: 'jbl',
      meta: {
        title: 'Ремонт колонок JBL в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт портативных колонок JBL в Ростове-на-Дону. Замена аккумулятора, ремонт динамика, зарядки USB-C. JBL Charge, Flip, Xtreme. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт колонок',
        titleAccent: 'JBL',
        subtitle: 'Ремонт портативных колонок JBL Charge, Flip, Boombox, Xtreme в Ростове-на-Дону. Замена аккумулятора, ремонт динамика и зарядки. Гарантия до 90 дней.',
        features: ['Charge, Flip, Boombox, Xtreme', 'Замена аккумулятора', 'Ремонт динамика', 'Ремонт зарядки USB-C', 'Гарантия до 90 дней']
      }
    },
    'sony': {
      brandName: 'Sony', slug: 'sony',
      meta: {
        title: 'Ремонт колонок Sony в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт портативных и стационарных колонок Sony в Ростове-на-Дону. Замена аккумулятора, ремонт Bluetooth, динамиков. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт колонок',
        titleAccent: 'Sony',
        subtitle: 'Ремонт колонок Sony SRS, GTK, HT серий в Ростове-на-Дону. Замена аккумулятора, ремонт Bluetooth-модуля и динамиков. Гарантия до 90 дней.',
        features: ['SRS, GTK, HT серии', 'Замена аккумулятора', 'Ремонт Bluetooth', 'Ремонт динамиков', 'Гарантия до 90 дней']
      }
    },
    'marshall': {
      brandName: 'Marshall', slug: 'marshall',
      meta: {
        title: 'Ремонт колонок Marshall в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт колонок Marshall в Ростове-на-Дону. Замена аккумулятора, ремонт динамика, кнопок управления. Stanmore, Woburn, Emberton. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт колонок',
        titleAccent: 'Marshall',
        subtitle: 'Ремонт колонок Marshall Stanmore, Woburn, Emberton, Acton в Ростове-на-Дону. Замена аккумулятора, ремонт усилителя и динамиков. Гарантия до 90 дней.',
        features: ['Stanmore, Woburn, Emberton, Acton', 'Замена аккумулятора', 'Ремонт усилителя', 'Ремонт динамиков', 'Гарантия до 90 дней']
      }
    }
  },

  'naushniki': {
    'sony': {
      brandName: 'Sony', slug: 'sony',
      meta: {
        title: 'Ремонт наушников Sony в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт наушников Sony WH, WF, XM в Ростове-на-Дону. Замена аккумулятора, ремонт ANC, динамика. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт наушников',
        titleAccent: 'Sony',
        subtitle: 'Ремонт наушников Sony WH-1000XM, WF-1000XM, XB серий в Ростове-на-Дону. Замена аккумулятора, ремонт ANC. Гарантия до 90 дней.',
        features: ['WH-1000XM3/4/5, WF-1000XM', 'Замена аккумулятора', 'Ремонт шумоподавления ANC', 'Ремонт динамика', 'Гарантия до 90 дней']
      }
    },
    'bose': {
      brandName: 'Bose', slug: 'bose',
      meta: {
        title: 'Ремонт наушников Bose в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт наушников Bose QC, 700, NC700 в Ростове-на-Дону. Замена аккумулятора, ремонт ANC, динамика. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт наушников',
        titleAccent: 'Bose',
        subtitle: 'Ремонт наушников Bose QuietComfort 45, 700, NC700 в Ростове-на-Дону. Замена аккумулятора, ремонт ANC и оголовья. Гарантия до 90 дней.',
        features: ['QC45, 700, NC700, SportEarbuds', 'Замена аккумулятора', 'Ремонт шумоподавления', 'Ремонт оголовья', 'Гарантия до 90 дней']
      }
    },
    'apple': {
      brandName: 'Apple', slug: 'apple',
      meta: {
        title: 'Ремонт AirPods в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт AirPods Pro, AirPods 2/3, AirPods Max в Ростове-на-Дону. Замена аккумулятора, ремонт кейса, восстановление ANC. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт',
        titleAccent: 'AirPods',
        subtitle: 'Ремонт AirPods Pro 1/2, AirPods 2/3, AirPods Max в Ростове-на-Дону. Замена аккумулятора, ремонт кейса, восстановление ANC. Гарантия до 90 дней.',
        features: ['AirPods Pro 1/2, AirPods 2/3', 'AirPods Max', 'Замена аккумулятора', 'Ремонт зарядного кейса', 'Гарантия до 90 дней']
      }
    }
  },

  'igrovye-konsoli': {
    'sony': {
      brandName: 'Sony PlayStation', slug: 'sony',
      meta: {
        title: 'Ремонт PlayStation 4 и 5 в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт PlayStation 4 и PlayStation 5 в Ростове-на-Дону. Замена HDMI, ремонт привода, устранение перегрева, drift DualSense. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт',
        titleAccent: 'PlayStation',
        subtitle: 'Ремонт PlayStation 4 и PlayStation 5 в Ростове-на-Дону. Замена HDMI, ремонт привода, устранение перегрева. Ремонт DualSense и DualShock. Гарантия до 90 дней.',
        features: ['PlayStation 4 и PlayStation 5', 'Замена HDMI разъёма', 'Ремонт привода дисков', 'Исправление drift DualSense', 'Гарантия до 90 дней']
      }
    },
    'microsoft': {
      brandName: 'Microsoft Xbox', slug: 'microsoft',
      meta: {
        title: 'Ремонт Xbox в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт Xbox One, Xbox Series X и S в Ростове-на-Дону. Замена HDMI, ремонт привода, устранение перегрева. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт',
        titleAccent: 'Xbox',
        subtitle: 'Ремонт Xbox One, Series X и S в Ростове-на-Дону. Замена HDMI, ремонт привода, устранение перегрева, ремонт контроллеров. Гарантия до 90 дней.',
        features: ['Xbox One, Series X, Series S', 'Замена HDMI разъёма', 'Ремонт привода дисков', 'Ремонт контроллера Xbox', 'Гарантия до 90 дней']
      }
    },
    'nintendo': {
      brandName: 'Nintendo', slug: 'nintendo',
      meta: {
        title: 'Ремонт Nintendo Switch в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт Nintendo Switch, Switch Lite, Switch OLED в Ростове-на-Дону. Замена дисплея, Joy-Con drift, аккумулятора, разъёма зарядки. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт',
        titleAccent: 'Nintendo Switch',
        subtitle: 'Ремонт Nintendo Switch, Switch Lite и Switch OLED в Ростове-на-Дону. Исправление Joy-Con drift, замена дисплея и аккумулятора. Гарантия до 90 дней.',
        features: ['Switch, Switch Lite, Switch OLED', 'Исправление Joy-Con drift', 'Замена дисплея', 'Замена аккумулятора', 'Гарантия до 90 дней']
      }
    }
  },

  'proektory': {
    'epson': {
      brandName: 'Epson', slug: 'epson',
      meta: {
        title: 'Ремонт проекторов Epson в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт проекторов Epson в Ростове-на-Дону. Замена лампы, ремонт блока питания, чистка оптики. EH, EB, EF серии. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт проекторов',
        titleAccent: 'Epson',
        subtitle: 'Ремонт проекторов Epson EH, EB, EF серий в Ростове-на-Дону. Замена лампы, ремонт блока питания, чистка оптики. Гарантия до 90 дней.',
        features: ['EH, EB, EF серии', 'Замена лампы Epson ELPLP', 'Ремонт блока питания', 'Чистка оптической системы', 'Гарантия до 90 дней']
      }
    },
    'benq': {
      brandName: 'BenQ', slug: 'benq',
      meta: {
        title: 'Ремонт проекторов BenQ в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт проекторов BenQ в Ростове-на-Дону. Замена лампы, ремонт DLP, блока питания. W, TH, TK серии. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт проекторов',
        titleAccent: 'BenQ',
        subtitle: 'Ремонт проекторов BenQ W, TH, TK серий в Ростове-на-Дону. Замена лампы, ремонт DLP-матрицы, блока питания. Гарантия до 90 дней.',
        features: ['W, TH, TK, MH серии', 'Замена лампы BenQ 5J', 'Ремонт DLP-системы', 'Ремонт блока питания', 'Гарантия до 90 дней']
      }
    },
    'optoma': {
      brandName: 'Optoma', slug: 'optoma',
      meta: {
        title: 'Ремонт проекторов Optoma в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт проекторов Optoma в Ростове-на-Дону. Замена лампы, ремонт блока питания, оптики. HD, UHD, ZH серии. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт проекторов',
        titleAccent: 'Optoma',
        subtitle: 'Ремонт проекторов Optoma HD, UHD, ZH и GT серий в Ростове-на-Дону. Замена лампы, ремонт DLP и блока питания. Гарантия до 90 дней.',
        features: ['HD, UHD, ZH, GT серии', 'Замена лампы Optoma SP', 'Ремонт DLP-матрицы', 'Ремонт блока питания', 'Гарантия до 90 дней']
      }
    }
  }

};
