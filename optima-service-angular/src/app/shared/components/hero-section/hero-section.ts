import { Component, Input, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ModalService } from '../../../core/services/modal.service';
import { ScrollService } from '../../../core/services/scroll.service';
import { Breadcrumb, BreadcrumbItem } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, Breadcrumb],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss'
})
export class HeroSection implements OnInit, OnDestroy {
  @Input() titleLine1: string = '';
  @Input() titleAccent: string = '';
  @Input() subtitle: string = '';
  @Input() features: string[] = [];
  @Input() ctaPrimaryText: string = 'Вызвать мастера';
  @Input() ctaSecondaryText: string = 'Узнать стоимость';
  @Input() ctaSecondaryScrollTarget: string = 'services';
  @Input() phone: string = '8 (988) 516-31-31';
  @Input() phoneHref: string = 'tel:89885163131';
  @Input() breadcrumbs: BreadcrumbItem[] = [];

  isVisible = false;
  parallaxOffset = 0;

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

  ngOnDestroy(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.parallaxOffset = window.pageYOffset * 0.5;
    }
  }

  openRepairForm(): void {
    this.modalService.open('callback-modal');
  }

  scrollToNext(): void {
    this.scrollService.scrollToId(this.ctaSecondaryScrollTarget);
  }
}
