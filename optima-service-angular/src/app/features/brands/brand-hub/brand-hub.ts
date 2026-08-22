import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';
import { ServicesTable, ServiceCategory } from '../../../shared/components/services-table/services-table';
import { ProcessAccordion, ProcessStep, SidebarStat } from '../../../shared/components/process-accordion/process-accordion';
import { ReviewsSection } from '../../../shared/components/reviews-section/reviews-section';
import { FaqSection, FaqItem } from '../../../shared/components/faq-section/faq-section';
import { PageProgressNavComponent } from '../../../shared/components/page-progress-nav/page-progress-nav';
import { ModalService } from '../../../core/services/modal.service';
import { getBrandHub, BrandHub } from '../brand-hub-data';

// Единая иконка для вкладок таблицы цен — вкладка обозначает вид техники,
// а не конкретную услугу, поэтому одной декоративной иконки-инструмента достаточно.
const DEVICE_TAB_ICON = 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z';

@Component({
  selector: 'app-brand-hub',
  standalone: true,
  imports: [CommonModule, RouterModule, Breadcrumb, ServicesTable, ProcessAccordion, ReviewsSection, FaqSection, PageProgressNavComponent],
  templateUrl: './brand-hub.html',
  styleUrl: './brand-hub.scss'
})
export class BrandHubPage implements OnInit, OnDestroy {
  hub: BrandHub | null = null;
  breadcrumbs: BreadcrumbItem[] = [];
  logoFailed = false;

  readonly phone = '8 (988) 516-31-31';
  readonly phoneHref = 'tel:89885163131';

  readonly utp = [
    'Бесплатная диагностика',
    'Любой способ оплаты',
    'Оригинальные запчасти и качественные аналоги',
    'Выезд мастера на дом'
  ];

  private modalService = inject(ModalService);
  private navSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Родительский узел ':slug' — один и тот же объект route-конфига для
    // любого значения slug, поэтому при переходе между разными брендами
    // через меню (URL /brands/apple -> /brands/samsung) Angular переиспользует
    // этот компонент, а не пересоздаёт его — ngOnInit больше не вызывается.
    // Реагируем на каждую навигацию отдельно и парсим актуальный URL.
    this.render();
    this.navSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.render());
  }

  ngOnDestroy(): void {
    this.navSub?.unsubscribe();
  }

  private render(): void {
    this.scroller.scrollToPosition([0, 0]);

    const path = this.router.url.split('?')[0].split('#')[0];
    const slug = path.split('/').filter(Boolean)[1] ?? '';
    this.hub = getBrandHub(slug);
    this.logoFailed = false;

    if (!this.hub) {
      this.router.navigate(['/brands']);
      return;
    }

    this.breadcrumbs = [
      { label: 'Главная', path: '/' },
      { label: 'Бренды', path: '/brands' },
      { label: this.hub.brandName }
    ];

    this.title.setTitle(`Ремонт техники ${this.hub.brandName} с гарантией в Ростове-на-Дону — Optima Сервис`);
    this.meta.updateTag({
      name: 'description',
      content: `Ремонтируем всю технику ${this.hub.brandName}: ${this.hub.categories.map(c => c.deviceName).join(', ')}. Ставим оригинальные запчасти, соблюдаем стандарт ремонта, даём гарантию до 90 дней.`
    });

    // Zoneless: подписка на router.events сама по себе не запускает change
    // detection — без этого вид не обновится при переиспользовании компонента.
    this.cdr.markForCheck();
  }

  get heroDescription(): string {
    const devices = this.hub?.categories.map(c => c.device.name.toLowerCase()).join(', ') ?? '';
    const list = devices ? `: ${devices}` : '';
    return `Ремонтируем всю технику ${this.hub?.brandName}${list}. Ставим оригинальные запчасти, работаем по стандарту производителя и отвечаем за каждый ремонт.`;
  }

  // Компактная таблица цен (как на главной): вкладка — вид техники бренда,
  // строки — типовые неисправности этого вида с ценой.
  get priceCategories(): ServiceCategory[] {
    return (this.hub?.categories ?? []).map(c => ({
      name: `Ремонт ${c.deviceName}`,
      description: c.device.categories.sectionDescription,
      icon: DEVICE_TAB_ICON,
      services: c.device.categories.items.map(item => ({
        name: item.name,
        price: item.priceFrom,
        duration: item.description
      })),
      link: c.path,
      linkLabel: `Перейти к разделу «${c.device.name}»`
    }));
  }

  // Процесс ремонта берём из первой связанной категории (шаги универсальны).
  get processSteps(): ProcessStep[] {
    return this.hub?.categories[0]?.device.process.steps ?? [];
  }

  get processStats(): SidebarStat[] {
    return this.hub?.categories[0]?.device.process.stats ?? [];
  }

  // FAQ: общие вопросы по бренду + сводка типовых поломок из связанных категорий.
  get brandFaq(): FaqItem[] {
    const brand = this.hub?.brandName ?? '';
    const faults = this.faultTypes;
    return [
      {
        question: `Сколько стоит диагностика техники ${brand}?`,
        answer: `Диагностика бесплатна при последующем ремонте. Если решите не ремонтировать — назовём стоимость заранее.`
      },
      {
        question: `Даёте гарантию на ремонт ${brand}?`,
        answer: `Да, даём гарантию до 90 дней на работы и запчасти. При гарантийном случае устраняем повторно бесплатно.`
      },
      {
        question: `Используете оригинальные запчасти?`,
        answer: `Ставим оригинальные запчасти ${brand}, а по желанию клиента — качественные сертифицированные аналоги. Тип запчасти согласуем до ремонта.`
      },
      {
        question: `Выезжаете на дом?`,
        answer: `Да, выезжаем на дом по Ростову-на-Дону. Крупную технику чиним на месте, малую удобнее принести в сервис.`
      },
      {
        question: `Какие бывают виды поломок техники ${brand}?`,
        answer: faults.length
          ? `Чаще всего обращаются с такими неисправностями: ${faults.join(', ')}. Точную причину определим на диагностике.`
          : `Ремонтируем любые неисправности — точную причину определим на бесплатной диагностике.`
      }
    ];
  }

  private get faultTypes(): string[] {
    const names = new Set<string>();
    for (const c of this.hub?.categories ?? []) {
      for (const item of c.device.categories.items) {
        names.add(item.name.toLowerCase());
        if (names.size >= 8) break;
      }
    }
    return Array.from(names);
  }

  openCallback(): void {
    this.modalService.open('callback-modal', { purpose: 'callback' });
  }

  onLogoError(): void {
    this.logoFailed = true;
  }
}
