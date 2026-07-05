import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { HeroSection } from '../../../shared/components/hero-section/hero-section';
import { CategoriesGrid } from '../../../shared/components/categories-grid/categories-grid';
import { ProcessAccordion } from '../../../shared/components/process-accordion/process-accordion';
import { PageProgressNavComponent } from '../../../shared/components/page-progress-nav/page-progress-nav';
import { ReviewsSection } from '../../../shared/components/reviews-section/reviews-section';
import { DEVICE_REPAIR_DATA, DeviceRepairData } from '../device-repair/device-repair-data';
import { BRAND_REPAIR_DATA, BrandRepairData } from './brand-repair-data';

@Component({
  selector: 'app-brand-repair',
  standalone: true,
  imports: [CommonModule, HeroSection, CategoriesGrid, ProcessAccordion, PageProgressNavComponent, ReviewsSection],
  templateUrl: './brand-repair.html',
  styleUrl: './brand-repair.scss'
})
export class BrandRepairPage implements OnInit {
  brandData: BrandRepairData | null = null;
  deviceData: DeviceRepairData | null = null;

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

    this.deviceData = DEVICE_REPAIR_DATA[slug] ?? null;
    this.brandData = BRAND_REPAIR_DATA[slug]?.[brand] ?? null;

    if (!this.brandData || !this.deviceData) {
      this.router.navigate(['/remont-bytovoy-tekhniki', slug]);
      return;
    }

    this.title.setTitle(this.brandData.meta.title);
    this.meta.updateTag({ name: 'description', content: this.brandData.meta.description });
  }
}
