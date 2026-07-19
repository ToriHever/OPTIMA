export interface PhoneModel {
  slug: string;
  name: string;
}

// Модели смартфонов для табов на странице «бренд-телефон».
// Ключи: deviceSlug -> brandSlug -> модели.
export const PHONE_MODELS: Record<string, Record<string, PhoneModel[]>> = {
  smartfony: {
    apple: [
      { slug: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max' },
      { slug: 'iphone-16-pro', name: 'iPhone 16 Pro' },
      { slug: 'iphone-16', name: 'iPhone 16' },
      { slug: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max' },
      { slug: 'iphone-15', name: 'iPhone 15' },
      { slug: 'iphone-14', name: 'iPhone 14' },
      { slug: 'iphone-13', name: 'iPhone 13' },
      { slug: 'iphone-12', name: 'iPhone 12' }
    ],
    samsung: [
      { slug: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra' },
      { slug: 'galaxy-s24', name: 'Galaxy S24' },
      { slug: 'galaxy-s23', name: 'Galaxy S23' },
      { slug: 'galaxy-z-fold-6', name: 'Galaxy Z Fold 6' },
      { slug: 'galaxy-z-flip-6', name: 'Galaxy Z Flip 6' },
      { slug: 'galaxy-a55', name: 'Galaxy A55' },
      { slug: 'galaxy-a35', name: 'Galaxy A35' },
      { slug: 'galaxy-note-20', name: 'Galaxy Note 20' }
    ],
    xiaomi: [
      { slug: 'xiaomi-14-pro', name: 'Xiaomi 14 Pro' },
      { slug: 'xiaomi-14', name: 'Xiaomi 14' },
      { slug: 'xiaomi-13', name: 'Xiaomi 13' },
      { slug: 'redmi-note-13-pro', name: 'Redmi Note 13 Pro' },
      { slug: 'redmi-note-13', name: 'Redmi Note 13' },
      { slug: 'redmi-note-12', name: 'Redmi Note 12' },
      { slug: 'poco-x6-pro', name: 'POCO X6 Pro' },
      { slug: 'poco-f6', name: 'POCO F6' }
    ]
  }
};

// Список моделей для конкретной страницы. Модели заведены только для
// смартфонов (section === 'computers', deviceSlug === 'smartfony').
export function getPhoneModels(section: string, deviceSlug: string, brandSlug: string): PhoneModel[] {
  if (section !== 'computers') return [];
  return PHONE_MODELS[deviceSlug]?.[brandSlug] ?? [];
}

export function findPhoneModel(models: PhoneModel[], slug: string | null | undefined): PhoneModel | null {
  return slug ? (models.find(m => m.slug === slug) ?? null) : null;
}
