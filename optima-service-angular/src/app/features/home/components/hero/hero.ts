import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  
  ngOnInit(): void {
    // Анимация при загрузке
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }
  
  ngOnDestroy(): void {
    // Cleanup если нужно
  }
  
  /**
   * Параллакс эффект при скролле
   */
  @HostListener('window:scroll')
  onScroll(): void {
    const scrollPosition = window.pageYOffset;
    // Параллакс: фон двигается медленнее чем скролл
    this.parallaxOffset = scrollPosition * 0.5;
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
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  /**
   * Скролл к следующей секции
   */
  scrollToNext(event: Event): void {
    event.preventDefault();
    const brandsSection = document.querySelector('#brands');
    if (brandsSection) {
      brandsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}