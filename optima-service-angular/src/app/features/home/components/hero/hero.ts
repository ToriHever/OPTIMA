import { Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ModalService } from '../../../../core/services/modal.service';

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
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private modalService: ModalService
  ) {}
  
  ngOnInit(): void {
  // Проверяем, что код выполняется в браузере, а не на сервере (SSR)
  if (isPlatformBrowser(this.platformId)) {
    // Небольшой таймаут (50мс) гарантирует, что браузер успеет 
    // запустить CSS-анимацию из начального состояния в конечное
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
    this.modalService.open('callback-modal');
  }
  
  /**
   * Скролл к секции с услугами
   */
  scrollToServices(): void {
  const servicesSection = document.querySelector('#services');
  const header = document.querySelector('header'); // если у тебя фиксированный header

  if (servicesSection) {
    const headerHeight = header ? header.clientHeight : 0;
    const top = servicesSection.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
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