import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb';
import { DEVICE_REPAIR_DATA, DeviceRepairData } from '../remont-bytovoy-tekhniki/device-repair/device-repair-data';
import { IT_REPAIR_DATA } from '../remont-kompyuterov/it-repair-data';
import { AV_REPAIR_DATA } from '../remont-audiovideo/av-repair-data';

interface PriceCard {
  name: string;
  path: string;
  priceFrom: string;
}

interface PriceSection {
  title: string;
  cards: PriceCard[];
}

function minPriceLabel(data: DeviceRepairData): string {
  const numeric = data.categories.items
    .map(i => ({ raw: i.priceFrom, value: parseInt(i.priceFrom.replace(/\D/g, ''), 10) }))
    .filter(i => !isNaN(i.value) && i.value > 0);

  if (numeric.length === 0) {
    return data.categories.items[0]?.priceFrom ?? '—';
  }

  return numeric.reduce((min, i) => i.value < min.value ? i : min).raw;
}

function toCards(data: Record<string, DeviceRepairData>, basePath: string): PriceCard[] {
  return Object.values(data).map(d => ({
    name: d.name,
    path: `${basePath}/${d.slug}`,
    priceFrom: minPriceLabel(d)
  }));
}

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [CommonModule, RouterModule, Breadcrumb],
  templateUrl: './prices.html',
  styleUrl: './prices.scss'
})
export class Prices implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'Цены' }
  ];

  sections: PriceSection[] = [
    { title: 'Бытовая техника', cards: toCards(DEVICE_REPAIR_DATA, '/remont-bytovoy-tekhniki') },
    { title: 'Компьютеры и гаджеты', cards: toCards(IT_REPAIR_DATA, '/remont-kompyuterov') },
    { title: 'Аудио и видео', cards: toCards(AV_REPAIR_DATA, '/remont-audiovideo') }
  ];

  constructor(
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 0]);
    this.title.setTitle('Цены на ремонт техники в Ростове-на-Дону — Optima Сервис');
    this.meta.updateTag({
      name: 'description',
      content: 'Ориентировочные цены на ремонт бытовой техники, компьютеров, ноутбуков, телевизоров и аудио в Ростове-на-Дону. Точная стоимость — после бесплатной диагностики.'
    });
  }
}
