import { DEVICE_REPAIR_DATA, DeviceRepairData } from '../remont-bytovoy-tekhniki/device-repair/device-repair-data';
import { BRAND_REPAIR_DATA } from '../remont-bytovoy-tekhniki/brand-repair/brand-repair-data';
import { IT_REPAIR_DATA } from '../remont-kompyuterov/it-repair-data';
import { IT_BRAND_REPAIR_DATA } from '../remont-kompyuterov/it-brand-repair-data';
import { AV_REPAIR_DATA } from '../remont-audiovideo/av-repair-data';
import { AV_BRAND_REPAIR_DATA } from '../remont-audiovideo/av-brand-repair-data';

export interface BrandCategoryLink {
  sectionLabel: string;
  deviceName: string;
  path: string;
  device: DeviceRepairData;
}

export interface BrandHub {
  slug: string;
  brandName: string;
  logo: string;
  categories: BrandCategoryLink[];
}

interface SectionConfig {
  label: string;
  basePath: string;
  deviceData: Record<string, DeviceRepairData>;
  brandData: Record<string, Record<string, { brandName: string; slug: string }>>;
}

const SECTIONS: SectionConfig[] = [
  { label: 'Бытовая техника', basePath: '/remont-bytovoy-tekhniki', deviceData: DEVICE_REPAIR_DATA, brandData: BRAND_REPAIR_DATA },
  { label: 'Компьютеры и гаджеты', basePath: '/remont-kompyuterov', deviceData: IT_REPAIR_DATA, brandData: IT_BRAND_REPAIR_DATA },
  { label: 'Аудио и видео', basePath: '/remont-audiovideo', deviceData: AV_REPAIR_DATA, brandData: AV_BRAND_REPAIR_DATA }
];

export function getBrandHub(slug: string): BrandHub | null {
  let brandName: string | null = null;
  const categories: BrandCategoryLink[] = [];

  for (const section of SECTIONS) {
    for (const deviceSlug of Object.keys(section.brandData)) {
      const brand = section.brandData[deviceSlug][slug];
      if (!brand) continue;

      brandName ??= brand.brandName;
      const device = section.deviceData[deviceSlug];
      if (!device) continue;
      categories.push({
        sectionLabel: section.label,
        deviceName: device.categories.sectionTitleAccent ?? device.name ?? deviceSlug,
        path: `${section.basePath}/${deviceSlug}/${slug}`,
        device
      });
    }
  }

  if (!brandName) return null;

  return {
    slug,
    brandName,
    logo: `/assets/img/brands/${brandName}.png`,
    categories
  };
}
