import { RenderMode, ServerRoute } from '@angular/ssr';
import { DEVICE_REPAIR_DATA, DeviceRepairData } from './features/remont-bytovoy-tekhniki/device-repair/device-repair-data';
import { IT_REPAIR_DATA } from './features/remont-kompyuterov/it-repair-data';
import { AV_REPAIR_DATA } from './features/remont-audiovideo/av-repair-data';
import { BRAND_REPAIR_DATA, BrandRepairData } from './features/remont-bytovoy-tekhniki/brand-repair/brand-repair-data';
import { IT_BRAND_REPAIR_DATA } from './features/remont-kompyuterov/it-brand-repair-data';
import { AV_BRAND_REPAIR_DATA } from './features/remont-audiovideo/av-brand-repair-data';
import { PHONE_MODELS } from './features/remont-kompyuterov/phone-models-data';
import { MASTERS_DATA } from './features/masters/masters-data';

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

function phoneModelParams(): { slug: string; brand: string; model: string }[] {
  const params: { slug: string; brand: string; model: string }[] = [];
  for (const [slug, brands] of Object.entries(PHONE_MODELS)) {
    for (const [brand, models] of Object.entries(brands)) {
      for (const model of models) {
        params.push({ slug, brand, model: model.slug });
      }
    }
  }
  return params;
}

function brandHubParams(): { slug: string }[] {
  const slugs = new Set<string>();
  for (const brandMap of [BRAND_REPAIR_DATA, IT_BRAND_REPAIR_DATA, AV_BRAND_REPAIR_DATA] as BrandMap[]) {
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

export const serverRoutes: ServerRoute[] = [
  { path: 'brands/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => brandHubParams() },
  { path: 'masters/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => masterParams() },

  { path: 'remont-bytovoy-tekhniki/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => deviceParams(DEVICE_REPAIR_DATA) },
  { path: 'remont-bytovoy-tekhniki/:slug/:brand', renderMode: RenderMode.Prerender, getPrerenderParams: async () => brandParams(DEVICE_REPAIR_DATA, BRAND_REPAIR_DATA) },

  { path: 'remont-kompyuterov/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => deviceParams(IT_REPAIR_DATA) },
  { path: 'remont-kompyuterov/:slug/:brand', renderMode: RenderMode.Prerender, getPrerenderParams: async () => brandParams(IT_REPAIR_DATA, IT_BRAND_REPAIR_DATA) },
  { path: 'remont-kompyuterov/:slug/:brand/:model', renderMode: RenderMode.Prerender, getPrerenderParams: async () => phoneModelParams() },

  { path: 'remont-audiovideo/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => deviceParams(AV_REPAIR_DATA) },
  { path: 'remont-audiovideo/:slug/:brand', renderMode: RenderMode.Prerender, getPrerenderParams: async () => brandParams(AV_REPAIR_DATA, AV_BRAND_REPAIR_DATA) },

  { path: '**', renderMode: RenderMode.Prerender }
];
