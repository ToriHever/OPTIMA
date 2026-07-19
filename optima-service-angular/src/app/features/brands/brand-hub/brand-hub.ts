import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';
import { CategoriesGrid } from '../../../shared/components/categories-grid/categories-grid';
import { ProcessAccordion, ProcessStep, SidebarStat } from '../../../shared/components/process-accordion/process-accordion';
import { ReviewsSection } from '../../../shared/components/reviews-section/reviews-section';
import { FaqSection, FaqItem } from '../../../shared/components/faq-section/faq-section';
import { PageProgressNavComponent } from '../../../shared/components/page-progress-nav/page-progress-nav';
import { ModalService } from '../../../core/services/modal.service';
import { getBrandHub, BrandHub } from '../brand-hub-data';

@Component({
  selector: 'app-brand-hub',
  standalone: true,
  imports: [CommonModule, RouterModule, Breadcrumb, CategoriesGrid, ProcessAccordion, ReviewsSection, FaqSection, PageProgressNavComponent],
  templateUrl: './brand-hub.html',
  styleUrl: './brand-hub.scss'
})
export class BrandHubPage implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 0]);

    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.hub = getBrandHub(slug);

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
  }

  get heroDescription(): string {
    const devices = this.hub?.categories.map(c => c.device.name.toLowerCase()).join(', ') ?? '';
    const list = devices ? `: ${devices}` : '';
    return `Ремонтируем всю технику ${this.hub?.brandName}${list}. Ставим оригинальные запчасти, работаем по стандарту производителя и отвечаем за каждый ремонт.`;
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
