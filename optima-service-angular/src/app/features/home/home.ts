import { Component, OnInit } from '@angular/core';
import { Hero } from './components/hero/hero';
import { BrandsCarousel } from './components/brands-carousel/brands-carousel';
import { ServicesTable } from './components/services-table/services-table';
import { RepairCategories } from './components/repair-categories/repair-categories';
import { WorkProcess } from './components/work-process/work-process';
import { Warranty } from './components/warranty/warranty';
import { ReviewsSection } from './components/reviews-section/reviews-section';
import { Certificates } from './components/certificates/certificates';
import { PageProgressNavComponent } from '../../shared/components/page-progress-nav/page-progress-nav';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';
import { ScrollService } from '../../core/services/scroll.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Hero, BrandsCarousel, RepairCategories, ServicesTable, WorkProcess, Warranty, ReviewsSection, Certificates, PageProgressNavComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  constructor(
    private navigationService: NavigationService,
    private scrollService: ScrollService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    
    const pendingId = this.navigationService.getPendingScroll();
    if (pendingId) {
      this.navigationService.clearPendingScroll();
      // Ждём отрисовки DOM перед скроллом
      setTimeout(() => {
        this.scrollService.scrollToId(pendingId);
      }, 400);
    }

    this.title.setTitle('Ремонт техники в центре — Optima');

    this.meta.updateTag({
      name: 'description',
      content: 'Сервисный центр в городе Ростов-на-Дону. Ремонт телефонов, ноутбуков, бытовой техники. Адрес: Ларина 18 Кировский район (Центр)'
    });

  }
}