import { IT_REPAIR_DATA } from '../../features/remont-kompyuterov/it-repair-data';
import { IT_BRAND_REPAIR_DATA } from '../../features/remont-kompyuterov/it-brand-repair-data';
import { BRAND_REPAIR_DATA } from '../../features/remont-bytovoy-tekhniki/brand-repair/brand-repair-data';
import { AV_BRAND_REPAIR_DATA } from '../../features/remont-audiovideo/av-brand-repair-data';

export interface NavLink {
  name: string;
  path: string;
}

// Собирает уникальные (по названию) бренды из нескольких устройств
// одного раздела меню — ссылка ведёт на первое найденное устройство.
function uniqueBrands(
  data: Record<string, Record<string, { brandName: string; slug: string }>>,
  deviceSlugs: string[],
  basePath: string
): NavLink[] {
  const seen = new Map<string, NavLink>();

  for (const deviceSlug of deviceSlugs) {
    for (const brand of Object.values(data[deviceSlug] ?? {})) {
      if (!seen.has(brand.brandName)) {
        seen.set(brand.brandName, { name: brand.brandName, path: `${basePath}/${deviceSlug}/${brand.slug}` });
      }
    }
  }

  return Array.from(seen.values());
}

// ── Ремонт телефонов: единственный пункт меню с готовой парой
// «бренд» / «неисправность» — все остальные категории пока
// сгруппированы по типам устройств (см. ниже).
export const PHONE_BASE_PATH = '/remont-kompyuterov/smartfony';

export const PHONE_BRANDS: NavLink[] = Object.values(IT_BRAND_REPAIR_DATA['smartfony'] ?? {})
  .map(b => ({ name: b.brandName, path: `${PHONE_BASE_PATH}/${b.slug}` }));

export const PHONE_ISSUES: NavLink[] = (IT_REPAIR_DATA['smartfony']?.categories.items ?? [])
  .map(i => ({ name: i.name, path: PHONE_BASE_PATH }));

// ── Ремонт компьютеров и ноутбуков: список устройств + бренды.
// Планшеты и умные часы сюда намеренно не включены — по договорённости
// каждый вид техники со временем получит свой раздел меню.
const COMPUTER_DEVICE_SLUGS = ['noutbuki', 'pk-i-komputery', 'monitory', 'printeryi-i-mfu'];

export const COMPUTER_DEVICES: NavLink[] = [
  { name: 'Ноутбуки', path: '/remont-kompyuterov/noutbuki' },
  { name: 'Компьютеры и ПК', path: '/remont-kompyuterov/pk-i-komputery' },
  { name: 'Мониторы', path: '/remont-kompyuterov/monitory' },
  { name: 'Принтеры и МФУ', path: '/remont-kompyuterov/printeryi-i-mfu' }
];

export const COMPUTER_BRANDS: NavLink[] = uniqueBrands(IT_BRAND_REPAIR_DATA, COMPUTER_DEVICE_SLUGS, '/remont-kompyuterov');

// ── Ремонт телевизоров и аудио устройств: список устройств + бренды.
const AV_DEVICE_SLUGS = ['televizory', 'akustika', 'naushniki', 'konsoli', 'proektory'];

export const AV_DEVICES: NavLink[] = [
  { name: 'Телевизоры', path: '/remont-audiovideo/televizory' },
  { name: 'Акустика', path: '/remont-audiovideo/akustika' },
  { name: 'Наушники', path: '/remont-audiovideo/naushniki' },
  { name: 'Игровые консоли', path: '/remont-audiovideo/konsoli' },
  { name: 'Проекторы', path: '/remont-audiovideo/proektory' }
];

export const AV_BRANDS: NavLink[] = uniqueBrands(AV_BRAND_REPAIR_DATA, AV_DEVICE_SLUGS, '/remont-audiovideo');

// ── Ремонт бытовой техники: крупногабаритная / малогабаритная + бренды.
const APPLIANCE_DEVICE_SLUGS = [
  'kholodilniki', 'stiralnye-mashiny', 'posudomoechnye-mashiny',
  'kofemashiny', 'pylesosy', 'mikrovolnovye-pechi', 'utyugi-i-parogeneratory'
];

export const APPLIANCE_LARGE: NavLink[] = [
  { name: 'Холодильники', path: '/remont-bytovoy-tekhniki/kholodilniki' },
  { name: 'Стиральные машины', path: '/remont-bytovoy-tekhniki/stiralnye-mashiny' },
  { name: 'Посудомоечные машины', path: '/remont-bytovoy-tekhniki/posudomoechnye-mashiny' }
];

export const APPLIANCE_SMALL: NavLink[] = [
  { name: 'Кофемашины', path: '/remont-bytovoy-tekhniki/kofemashiny' },
  { name: 'Пылесосы', path: '/remont-bytovoy-tekhniki/pylesosy' },
  { name: 'Микроволновые печи', path: '/remont-bytovoy-tekhniki/mikrovolnovye-pechi' },
  { name: 'Утюги и парогенераторы', path: '/remont-bytovoy-tekhniki/utyugi-i-parogeneratory' }
];

export const APPLIANCE_BRANDS: NavLink[] = uniqueBrands(BRAND_REPAIR_DATA, APPLIANCE_DEVICE_SLUGS, '/remont-bytovoy-tekhniki');
