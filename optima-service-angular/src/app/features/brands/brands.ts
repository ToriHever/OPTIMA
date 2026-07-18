import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb';
import { BRAND_REPAIR_DATA } from '../remont-bytovoy-tekhniki/brand-repair/brand-repair-data';
import { IT_BRAND_REPAIR_DATA } from '../remont-kompyuterov/it-brand-repair-data';
import { AV_BRAND_REPAIR_DATA } from '../remont-audiovideo/av-brand-repair-data';

interface BrandCard {
  name: string;
  path: string;
  logo: string;
}

interface BrandSection {
  title: string;
  cards: BrandCard[];
}

function toUniqueBrandCards(data: Record<string, Record<string, { brandName: string; slug: string }>>, basePath: string): BrandCard[] {
  const seen = new Map<string, BrandCard>();

  for (const deviceSlug of Object.keys(data)) {
    for (const brand of Object.values(data[deviceSlug])) {
      if (!seen.has(brand.brandName)) {
        seen.set(brand.brandName, {
          name: brand.brandName,
          path: `${basePath}/${deviceSlug}/${brand.slug}`,
          logo: `/assets/img/brands/${brand.brandName}.png`
        });
      }
    }
  }

  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
}

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, RouterModule, Breadcrumb],
  templateUrl: './brands.html',
  styleUrl: './brands.scss'
})
export class Brands implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'Бренды' }
  ];

  sections: BrandSection[] = [
    { title: 'Бытовая техника', cards: toUniqueBrandCards(BRAND_REPAIR_DATA, '/remont-bytovoy-tekhniki') },
    { title: 'Компьютеры и гаджеты', cards: toUniqueBrandCards(IT_BRAND_REPAIR_DATA, '/remont-kompyuterov') },
    { title: 'Аудио и видео', cards: toUniqueBrandCards(AV_BRAND_REPAIR_DATA, '/remont-audiovideo') }
  ];

  failedLogos = new Set<string>();

  onLogoError(name: string): void {
    this.failedLogos.add(name);
  }

  constructor(
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 0]);
    this.title.setTitle('Бренды техники, с которыми мы работаем — Optima Сервис');
    this.meta.updateTag({
      name: 'description',
      content: 'Ремонтируем технику всех популярных производителей: бытовую технику, компьютеры, ноутбуки, телевизоры и аудио в Ростове-на-Дону.'
    });
  }
}
