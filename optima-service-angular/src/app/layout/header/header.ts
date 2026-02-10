import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  isMenuOpen = false;
  isScrolled = false;
  
  /**
   * Переключение мобильного меню
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Блокируем прокрутку при открытом меню
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  /**
   * Закрытие мобильного меню
   */
  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }
  
  /**
   * Открытие модального окна проверки статуса
   */
  openRepairStatusModal(): void {
    // TODO: Реализовать через сервис модальных окон
    console.log('Open repair status modal');
  }
  
  /**
   * Отслеживание скролла для изменения стилей шапки
   */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 100;
    
    // Применяем тень к header при скролле
    const header = document.querySelector('.header') as HTMLElement;
    if (header) {
      header.style.boxShadow = this.isScrolled 
        ? '0 4px 16px rgba(0, 68, 77, 0.15)' 
        : '0 2px 8px rgba(0, 68, 77, 0.08)';
    }
  }
  
  /**
   * Закрытие меню при изменении размера окна
   */
  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }
}