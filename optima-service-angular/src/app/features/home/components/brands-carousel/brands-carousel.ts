import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Brand {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-brands-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands-carousel.html',
  styleUrl: './brands-carousel.scss'
})
export class BrandsCarousel implements OnInit {
  isPaused = false;
  isVisible = false;
  
  brands: Brand[] = [
    { name: 'Bosch', logo: 'assets/img/brands/bosch.svg' },
    { name: 'Samsung', logo: 'assets/img/brands/samsung.svg' },
    { name: 'LG', logo: 'assets/img/brands/lg.svg' },
    { name: 'Electrolux', logo: 'assets/img/brands/electrolux.svg' },
    { name: 'Siemens', logo: 'assets/img/brands/siemens.svg' },
    { name: 'Indesit', logo: 'assets/img/brands/indesit.svg' },
    { name: 'Ariston', logo: 'assets/img/brands/ariston.svg' },
    { name: 'Whirlpool', logo: 'assets/img/brands/whirlpool.svg' },
    { name: 'Liebherr', logo: 'assets/img/brands/liebherr.svg' },
    { name: 'Gorenje', logo: 'assets/img/brands/gorenje.svg' },
    { name: 'Candy', logo: 'assets/img/brands/candy.svg' },
    { name: 'Beko', logo: 'assets/img/brands/beko.svg' }
  ];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  ngOnInit(): void {
    // Проверяем видимость только в браузере
    if (isPlatformBrowser(this.platformId)) {
      this.checkVisibility();
    }
  }
  
  /**
   * Проверка видимости для анимации статистики
   */
  @HostListener('window:scroll')
  checkVisibility(): void {
    // Проверяем что код выполняется в браузере
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const element = document.querySelector('.brands-stats');
    if (element) {
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewport && !this.isVisible) {
        this.isVisible = true;
      }
    }
  }
  
  /**
   * Пауза карусели при наведении
   */
  pauseCarousel(): void {
    this.isPaused = true;
  }
  
  /**
   * Возобновление карусели
   */
  resumeCarousel(): void {
    this.isPaused = false;
  }
}