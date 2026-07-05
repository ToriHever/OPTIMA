import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { HeroSection } from '../../../shared/components/hero-section/hero-section';
import { CategoriesGrid } from '../../../shared/components/categories-grid/categories-grid';
import { ProcessAccordion } from '../../../shared/components/process-accordion/process-accordion';
import { PageProgressNavComponent } from '../../../shared/components/page-progress-nav/page-progress-nav';
import { ReviewsSection } from '../../../shared/components/reviews-section/reviews-section';
import { FaqSection } from '../../../shared/components/faq-section/faq-section';
import { DEVICE_REPAIR_DATA, DeviceRepairData } from './device-repair-data';
import { IT_REPAIR_DATA } from '../../remont-kompyuterov/it-repair-data';
import { AV_REPAIR_DATA } from '../../remont-audiovideo/av-repair-data';

@Component({
  selector: 'app-device-repair',
  standalone: true,
  imports: [CommonModule, HeroSection, CategoriesGrid, ProcessAccordion, PageProgressNavComponent, ReviewsSection, FaqSection],
  templateUrl: './device-repair.html',
  styleUrl: './device-repair.scss'
})
export class DeviceRepairPage implements OnInit {
  data: DeviceRepairData | null = null;

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

    this.title.setTitle(this.data.meta.title);
    this.meta.updateTag({ name: 'description', content: this.data.meta.description });
  }
}
