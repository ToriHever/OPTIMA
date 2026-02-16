import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  /**
   * Плавный скролл к элементу с учетом высоты header
   * @param selector - CSS селектор элемента (например, '#services')
   * @param offset - Дополнительный отступ сверху (по умолчанию 0)
   */
  scrollToElement(selector: string, offset: number = 0): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`ScrollService: Element with selector "${selector}" not found`);
      return;
    }
    
    const header = document.querySelector('app-header');
    const headerHeight = header ? header.clientHeight : 0;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  
  /**
   * Плавный скролл к элементу по ID
   * @param elementId - ID элемента (без #)
   * @param offset - Дополнительный отступ сверху
   */
  scrollToId(elementId: string, offset: number = 0): void {
    this.scrollToElement(`#${elementId}`, offset);
  }
  
  /**
   * Скролл на самый верх страницы
   */
  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  /**
   * Получить текущую позицию скролла
   */
  getScrollPosition(): number {
    if (!isPlatformBrowser(this.platformId)) {
      return 0;
    }
    
    return window.pageYOffset || document.documentElement.scrollTop;
  }
  
  /**
   * Проверить, находится ли элемент в области видимости
   */
  isElementInViewport(selector: string): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    
    const element = document.querySelector(selector);
    if (!element) {
      return false;
    }
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}