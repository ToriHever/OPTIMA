import { Component, Input, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ModalService } from '../../../core/services/modal.service';
import { ScrollService } from '../../../core/services/scroll.service';
import { Breadcrumb, BreadcrumbItem } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-tech-hero',
  standalone: true,
  imports: [CommonModule, Breadcrumb],
  templateUrl: './tech-hero.html',
  styleUrl: './tech-hero.scss'
})
export class TechHero implements OnInit {
  @Input() titleLine1 = '';
  @Input() titleAccent = '';
  @Input() subtitle = '';
  @Input() features: string[] = [];
  @Input() ctaPrimaryText = 'Вызвать мастера';
  @Input() ctaSecondaryText = 'Узнать стоимость';
  @Input() ctaSecondaryScrollTarget = 'services';
  @Input() phone = '8 (988) 516-31-31';
  @Input() phoneHref = 'tel:89885163131';
  @Input() breadcrumbs: BreadcrumbItem[] = [];
  @Input() imageUrl?: string;
  @Input() calloutText = 'Что сломалось?';

  isVisible = false;
  imageFailed = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: ModalService,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => { this.isVisible = true; }, 50);
    }
  }

  openRepairForm(): void {
    this.modalService.open('callback-modal');
  }

  scrollToNext(): void {
    this.scrollService.scrollToId(this.ctaSecondaryScrollTarget);
  }

  onCalloutClick(event: Event): void {
    event.preventDefault();
    this.scrollToNext();
  }

  onImageError(): void {
    this.imageFailed = true;
  }
}
