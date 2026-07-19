import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { BrandHero } from '../../../shared/components/brand-hero/brand-hero';
import { CategoriesGrid } from '../../../shared/components/categories-grid/categories-grid';
import { ProcessAccordion } from '../../../shared/components/process-accordion/process-accordion';
import { PageProgressNavComponent } from '../../../shared/components/page-progress-nav/page-progress-nav';
import { ReviewsSection } from '../../../shared/components/reviews-section/reviews-section';
import { FaqSection } from '../../../shared/components/faq-section/faq-section';
import { DEVICE_REPAIR_DATA, DeviceRepairData } from '../device-repair/device-repair-data';
import { BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';
import { BRAND_REPAIR_DATA, BrandRepairData } from './brand-repair-data';
import { IT_REPAIR_DATA } from '../../remont-kompyuterov/it-repair-data';
import { IT_BRAND_REPAIR_DATA } from '../../remont-kompyuterov/it-brand-repair-data';
import { AV_REPAIR_DATA } from '../../remont-audiovideo/av-repair-data';
import { AV_BRAND_REPAIR_DATA } from '../../remont-audiovideo/av-brand-repair-data';
import { MastersTeam } from '../../../shared/components/masters-team/masters-team';

@Component({
  selector: 'app-brand-repair',
  standalone: true,
  imports: [CommonModule, BrandHero, CategoriesGrid, ProcessAccordion, PageProgressNavComponent, ReviewsSection, FaqSection, MastersTeam],
  templateUrl: './brand-repair.html',
  styleUrl: './brand-repair.scss'
})
export class BrandRepairPage implements OnInit {
  brandData: BrandRepairData | null = null;
  deviceData: DeviceRepairData | null = null;
  backPath = '/remont-bytovoy-tekhniki';
  sectionLabel = 'Бытовая техника';
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
    const brand = this.route.snapshot.paramMap.get('brand') ?? '';
    const section = this.route.snapshot.data['section'] ?? 'appliances';
    this.backPath = this.route.snapshot.data['backPath'] ?? '/remont-bytovoy-tekhniki';

    this.sectionLabel = section === 'computers' ? 'Компьютеры'
                      : section === 'av' ? 'Аудио и видео'
                      : 'Бытовая техника';

    const deviceMap = section === 'computers' ? IT_REPAIR_DATA
                    : section === 'av' ? AV_REPAIR_DATA
                    : DEVICE_REPAIR_DATA;
    const brandMap = section === 'computers' ? IT_BRAND_REPAIR_DATA
                   : section === 'av' ? AV_BRAND_REPAIR_DATA
                   : BRAND_REPAIR_DATA;

    this.deviceData = (deviceMap as Record<string, DeviceRepairData>)[slug] ?? null;
    this.brandData = (brandMap as Record<string, Record<string, BrandRepairData>>)[slug]?.[brand] ?? null;

    if (!this.brandData || !this.deviceData) {
      this.router.navigate([this.backPath, slug]);
      return;
    }

    this.breadcrumbs = [
      { label: 'Главная', path: '/' },
      { label: this.sectionLabel, path: this.backPath },
      { label: this.deviceData.name, path: `${this.backPath}/${slug}` },
      { label: this.brandData.brandName }
    ];

    this.title.setTitle(this.brandData.meta.title);
    this.meta.updateTag({ name: 'description', content: this.brandData.meta.description });
  }

}
