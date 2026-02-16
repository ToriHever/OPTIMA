import { Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ModalService } from '../../../../core/services/modal.service';
import { ScrollService } from '../../../../core/services/scroll.service';

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
    private modalService: ModalService,
    private scrollService: ScrollService
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
   * Скроллы
   */
 scrollToServices(): void {
  this.scrollService.scrollToId('services');
}

  scrollToNext(event: Event): void {
  event.preventDefault();
  this.scrollService.scrollToId('brands');
}
}