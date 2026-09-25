import { RenderMode, ServerRoute } from '@angular/ssr';
import { DEVICE_REPAIR_DATA, DeviceRepairData } from './features/remont-bytovoy-tekhniki/device-repair/device-repair-data';
import { IT_REPAIR_DATA } from './features/remont-kompyuterov/it-repair-data';
import { AV_REPAIR_DATA } from './features/remont-audiovideo/av-repair-data';
import { BRAND_REPAIR_DATA, BrandRepairData } from './features/remont-bytovoy-tekhniki/brand-repair/brand-repair-data';
import { IT_BRAND_REPAIR_DATA } from './features/remont-kompyuterov/it-brand-repair-data';
import { AV_BRAND_REPAIR_DATA } from './features/remont-audiovideo/av-brand-repair-data';
import { PHONE_BRAND_REPAIR_DATA } from './features/remont-telefonov/phone-brand-repair-data';
import { PHONE_MODELS } from './features/remont-telefonov/phone-models-data';
import { MASTERS_DATA } from './features/masters/masters-data';
import { BLOG_POSTS } from './features/blog/blog-data.generated';

// Сайт раздаётся обычным статическим хостингом без Node — на нём не может
// работать RenderMode.Server (рендер по запросу). Поэтому каждая
// параметризованная страница (вид техники, бренд, модель телефона) заранее
// перечисляется здесь и превращается в готовый HTML-файл при сборке.

type DeviceMap = Record<string, DeviceRepairData>;
type BrandMap = Record<string, Record<string, BrandRepairData>>;

function deviceParams(deviceMap: DeviceMap): { slug: string }[] {
  return Object.keys(deviceMap).map(slug => ({ slug }));
}

function brandParams(deviceMap: DeviceMap, brandMap: BrandMap): { slug: string; brand: string }[] {
  const params: { slug: string; brand: string }[] = [];
  for (const slug of Object.keys(deviceMap)) {
    for (const brand of Object.keys(brandMap[slug] ?? {})) {
      params.push({ slug, brand });
    }
  }
  return params;
}

function phoneBrandParams(): { brand: string }[] {
  return Object.keys(PHONE_BRAND_REPAIR_DATA['smartfony'] ?? {}).map(brand => ({ brand }));
}

function phoneModelParams(): { brand: string; model: string }[] {
  const params: { brand: string; model: string }[] = [];
  for (const [brand, models] of Object.entries(PHONE_MODELS['smartfony'] ?? {})) {
    for (const model of models) {
      params.push({ brand, model: model.slug });
    }
  }
  return params;
}

function brandHubParams(): { slug: string }[] {
  const slugs = new Set<string>();
  for (const brandMap of [BRAND_REPAIR_DATA, IT_BRAND_REPAIR_DATA, AV_BRAND_REPAIR_DATA, PHONE_BRAND_REPAIR_DATA] as BrandMap[]) {
    for (const brands of Object.values(brandMap)) {
      for (const brand of Object.values(brands)) {
        slugs.add(brand.slug);
      }
    }
  }
  return Array.from(slugs, slug => ({ slug }));
}

function masterParams(): { slug: string }[] {
  return MASTERS_DATA.map(m => ({ slug: m.slug }));
}

function blogParams(): { slug: string }[] {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export const serverRoutes: ServerRoute[] = [
  { path: 'brands/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => brandHubParams() },
  { path: 'masters/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => masterParams() },
  { path: 'blog/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => blogParams() },

  { path: 'remont-bytovoy-tekhniki/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => deviceParams(DEVICE_REPAIR_DATA) },
  { path: 'remont-bytovoy-tekhniki/:slug/:brand', renderMode: RenderMode.Prerender, getPrerenderParams: async () => brandParams(DEVICE_REPAIR_DATA, BRAND_REPAIR_DATA) },

  { path: 'remont-kompyuterov/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => deviceParams(IT_REPAIR_DATA) },
  { path: 'remont-kompyuterov/:slug/:brand', renderMode: RenderMode.Prerender, getPrerenderParams: async () => brandParams(IT_REPAIR_DATA, IT_BRAND_REPAIR_DATA) },

  { path: 'remont-audiovideo/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => deviceParams(AV_REPAIR_DATA) },
  { path: 'remont-audiovideo/:slug/:brand', renderMode: RenderMode.Prerender, getPrerenderParams: async () => brandParams(AV_REPAIR_DATA, AV_BRAND_REPAIR_DATA) },

  { path: 'remont-telefonov/:brand', renderMode: RenderMode.Prerender, getPrerenderParams: async () => phoneBrandParams() },
  { path: 'remont-telefonov/:brand/:model', renderMode: RenderMode.Prerender, getPrerenderParams: async () => phoneModelParams() },

  { path: '**', renderMode: RenderMode.Prerender }
];
