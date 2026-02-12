import { Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements OnInit, OnDestroy {
  isVisible = false;
  parallaxOffset = 0;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  ngOnInit(): void {
    // Анимация при загрузке - сразу показываем контент
    if (isPlatformBrowser(this.platformId)) {
      // Небольшая задержка (50-100мс), чтобы браузер успел отрисовать 
      // начальное состояние перед запуском анимации
      setTimeout(() => {
        this.isVisible = true;
      }, 50); 
    }
  }
  
  ngOnDestroy(): void {
    // Cleanup если нужно
  }
  
  /**
   * Параллакс эффект при скролле
   */
  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.pageYOffset;
      // Параллакс: фон двигается медленнее чем скролл
      this.parallaxOffset = scrollPosition * 0.5;
    }
  }
  
  /**
   * Открытие формы вызова мастера
   */
  openRepairForm(): void {
    // TODO: Реализовать модальное окно с формой
    console.log('Open repair form modal');
  }
  
  /**
   * Скролл к секции с услугами
   */
  scrollToServices(): void {
    if (isPlatformBrowser(this.platformId)) {
      const servicesSection = document.querySelector('#services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  
  /**
   * Скролл к следующей секции
   */
  scrollToNext(event: Event): void {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const brandsSection = document.querySelector('#brands');
      if (brandsSection) {
        brandsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}