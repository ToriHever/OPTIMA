import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { TechHero } from '../../../shared/components/tech-hero/tech-hero';
import { CategoriesGrid } from '../../../shared/components/categories-grid/categories-grid';
import { ProcessAccordion } from '../../../shared/components/process-accordion/process-accordion';
import { PageProgressNavComponent } from '../../../shared/components/page-progress-nav/page-progress-nav';
import { ReviewsSection } from '../../../shared/components/reviews-section/reviews-section';
import { FaqSection } from '../../../shared/components/faq-section/faq-section';
import { BrandSelector } from '../../../shared/components/brand-selector/brand-selector';
import { TrustBlock } from '../../../shared/components/trust-block/trust-block';
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
  imports: [CommonModule, TechHero, CategoriesGrid, ProcessAccordion, PageProgressNavComponent, ReviewsSection, FaqSection, BrandSelector, TrustBlock],
  templateUrl: './device-repair.html',
  styleUrl: './device-repair.scss'
})
export class DeviceRepairPage implements OnInit {
  data: DeviceRepairData | null = null;
  brands: BrandRepairData[] = [];
  brandBasePath: string = '';
  breadcrumbs: BreadcrumbItem[] = [];

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
  }
}
