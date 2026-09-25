import { BrandRepairData } from '../remont-bytovoy-tekhniki/brand-repair/brand-repair-data';

// Раньше это была часть IT_BRAND_REPAIR_DATA (ключ 'smartfony') —
// вынесено вместе с остальными данными телефонов в независимый раздел.
export const PHONE_BRAND_REPAIR_DATA: Record<string, Record<string, BrandRepairData>> = {

  'smartfony': {
    'apple': {
      brandName: 'Apple', slug: 'apple',
      meta: {
        title: 'Ремонт iPhone в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт iPhone всех моделей в Ростове-на-Дону. Замена дисплея, аккумулятора, ремонт после залития. Диагностика бесплатно при ремонте, гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт',
        titleAccent: 'iPhone',
        subtitle: 'Профессиональный ремонт iPhone всех моделей в Ростове-на-Дону. Замена OLED-дисплея, аккумулятора, ремонт после залития. Гарантия до 90 дней.',
        features: ['iPhone 8 — iPhone 16 Pro Max', 'Оригинальные дисплеи OLED', 'Замена за 30–60 минут', 'Бесплатная диагностика', 'Гарантия до 90 дней'],
        image: '/assets/img/technique/computers/phone/smartfony-apple.png'
      }
    },
    'samsung': {
      brandName: 'Samsung', slug: 'samsung',
      meta: {
        title: 'Ремонт смартфонов Samsung в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт Samsung Galaxy в Ростове-на-Дону. Замена дисплея, аккумулятора, ремонт после залития. Все серии: S, A, M, Note, Z Fold/Flip. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт смартфонов',
        titleAccent: 'Samsung',
        subtitle: 'Ремонт Samsung Galaxy всех серий в Ростове-на-Дону. Galaxy S, A, M, Note, Z Fold и Flip — знаем каждую модель. Гарантия до 90 дней.',
        features: ['Galaxy S, A, M, Note, Z Fold/Flip', 'Оригинальные Super AMOLED дисплеи', 'Ремонт складных смартфонов', 'Оригинальные запчасти', 'Гарантия до 90 дней'],
        image: '/assets/img/technique/computers/phone/smartfony-samsung.png'
      }
    },
    'xiaomi': {
      brandName: 'Xiaomi', slug: 'xiaomi',
      meta: {
        title: 'Ремонт смартфонов Xiaomi в Ростове-на-Дону — Optima Сервис',
        description: 'Ремонт Xiaomi, Redmi, POCO в Ростове-на-Дону. Замена дисплея, аккумулятора, ремонт разъёма. Все серии. Гарантия до 90 дней.'
      },
      hero: {
        titleLine1: 'Ремонт смартфонов',
        titleAccent: 'Xiaomi',
        subtitle: 'Ремонт смартфонов Xiaomi, Redmi и POCO в Ростове-на-Дону. Замена дисплея, аккумулятора, ремонт разъёма зарядки. Гарантия до 90 дней.',
        features: ['Xiaomi, Redmi, POCO', 'Замена дисплея и АКБ', 'Ремонт разъёма зарядки', 'Оригинальные запчасти', 'Гарантия до 90 дней'],
        image: '/assets/img/technique/computers/phone/smartfony-xiaomi.png'
      }
    }
  }

};
