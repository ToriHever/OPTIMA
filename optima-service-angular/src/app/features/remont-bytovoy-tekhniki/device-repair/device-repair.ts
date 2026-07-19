import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TechHero } from '../../../shared/components/tech-hero/tech-hero';
import { CategoriesGrid } from '../../../shared/components/categories-grid/categories-grid';
import { ProcessAccordion } from '../../../shared/components/process-accordion/process-accordion';
import { PageProgressNavComponent } from '../../../shared/components/page-progress-nav/page-progress-nav';
import { ReviewsSection } from '../../../shared/components/reviews-section/reviews-section';
import { FaqSection } from '../../../shared/components/faq-section/faq-section';
import { BrandSelector } from '../../../shared/components/brand-selector/brand-selector';
import { TrustBlock } from '../../../shared/components/trust-block/trust-block';
import { MastersTeam } from '../../../shared/components/masters-team/masters-team';
import { DEVICE_REPAIR_DATA, DeviceRepairData } from './device-repair-data';
import { IT_REPAIR_DATA } from '../../remont-kompyuterov/it-repair-data';
import { AV_REPAIR_DATA } from '../../remont-audiovideo/av-repair-data';
import { BRAND_REPAIR_DATA, BrandRepairData } from '../brand-repair/brand-repair-data';
import { BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';
import { IT_BRAND_REPAIR_DATA } from '../../remont-kompyuterov/it-brand-repair-data';
import { AV_BRAND_REPAIR_DATA } from '../../remont-audiovideo/av-brand-repair-data';

@Component({
  selector: 'app-device-repair',
  standalone: true,
  imports: [CommonModule, TechHero, CategoriesGrid, ProcessAccordion, PageProgressNavComponent, ReviewsSection, FaqSection, BrandSelector, TrustBlock, MastersTeam],
  templateUrl: './device-repair.html',
  styleUrl: './device-repair.scss'
})
export class DeviceRepairPage implements OnInit, OnDestroy {
  data: DeviceRepairData | null = null;
  brands: BrandRepairData[] = [];
  brandBasePath: string = '';
  breadcrumbs: BreadcrumbItem[] = [];

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
    // любого значения slug (тот же путь ''), поэтому при переходе между
    // видами техники через второстепенное меню Angular переиспользует этот
    // компонент, а не пересоздаёт его — ngOnInit больше не вызывается.
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
    const section = this.route.snapshot.data['section'] ?? 'appliances';
    const backPath = this.route.snapshot.data['backPath'] ?? '/remont-bytovoy-tekhniki';

    const dataMap = section === 'computers' ? IT_REPAIR_DATA
                  : section === 'av' ? AV_REPAIR_DATA
                  : DEVICE_REPAIR_DATA;

    this.data = (dataMap as Record<string, DeviceRepairData>)[slug] ?? null;

    if (!this.data) {
      this.router.navigate([backPath]);
      return;
    }

    const brandMap = section === 'computers' ? IT_BRAND_REPAIR_DATA
                   : section === 'av' ? AV_BRAND_REPAIR_DATA
                   : BRAND_REPAIR_DATA;
    this.brands = Object.values((brandMap as Record<string, Record<string, BrandRepairData>>)[slug] ?? {});
    this.brandBasePath = `${backPath}/${slug}`;

    const sectionLabel = section === 'computers' ? 'Компьютеры'
                       : section === 'av' ? 'Аудио и видео'
                       : 'Бытовая техника';
    this.breadcrumbs = [
      { label: 'Главная', path: '/' },
      { label: sectionLabel, path: backPath },
      { label: this.data.name }
    ];

    this.title.setTitle(this.data.meta.title);
    this.meta.updateTag({ name: 'description', content: this.data.meta.description });

    // Zoneless: подписка на router.events сама по себе не запускает change
    // detection — без этого вид не обновится при переиспользовании компонента.
    this.cdr.markForCheck();
  }
}
