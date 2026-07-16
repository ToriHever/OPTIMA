import { Component, Input, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ModalService } from '../../../core/services/modal.service';

export interface CategoryItem {
  name: string;
  description: string;
  icon: string;
  features: string[];
  priceFrom: string;
  link?: string;
  image?: string;
}

export interface SidebarStat {
  number: string;
  label: string;
}

@Component({
  selector: 'app-categories-grid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories-grid.html',
  styleUrl: './categories-grid.scss'
})
export class CategoriesGrid implements OnInit {
  @Input() sectionId: string = 'technique';
  @Input() navTitle: string = 'Техника';
  @Input() sectionTitle: string = 'Что мы';
  @Input() sectionTitleAccent: string = 'ремонтируем';
  @Input() sectionDescription: string = '';
  @Input() stats: SidebarStat[] = [];
  @Input() ctaTitle: string = 'Не нашли свою технику?';
  @Input() ctaDescription: string = 'Ремонтируем любую технику. Напишите — поможем.';
  @Input() categories: CategoryItem[] = [];
  @Input() cardStyle: 'flip' | 'photo' | 'photo-overlay' = 'flip';

  isVisible = false;
  failedImages = new Set<string>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkVisibility();
    }
  }

  @HostListener('window:scroll')
  checkVisibility(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = document.querySelector('.categories-grid');
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        this.isVisible = true;
      }
    }
  }

  onCardClick(category: CategoryItem): void {
    if (category.link && isPlatformBrowser(this.platformId)) {
      const isMobile = window.matchMedia('(hover: none)').matches;
      if (!isMobile) {
        this.router.navigateByUrl(category.link);
      }
    }
  }

  openCallbackForm(): void {
    this.modalService.open('callback-modal', { purpose: 'callback' });
  }

  onImageError(category: CategoryItem): void {
    this.failedImages.add(category.name);
  }

  openQuestionForm(): void {
    this.modalService.open('callback-modal', { purpose: 'question' });
  }
}
