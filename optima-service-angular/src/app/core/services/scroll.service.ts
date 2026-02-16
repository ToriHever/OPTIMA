import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private headerHeight: number = 0;
  private headerElement: HTMLElement | null = null;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initHeaderHeight();
  }
  
  /**
   * Инициализация и кеширование высоты header
   */
  private initHeaderHeight(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    // Ждем когда DOM загрузится
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.cacheHeader());
    } else {
      this.cacheHeader();
    }
  }
  
  /**
   * Кеширование header элемента и его высоты
   */
  private cacheHeader(): void {
    this.headerElement = document.querySelector('app-header');
    this.updateHeaderHeight();
    
    // Подписываемся на изменение размера окна
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', () => this.updateHeaderHeight());
    }
  }
  
  /**
   * Обновление высоты header (при resize)
   */
  private updateHeaderHeight(): void {
    if (this.headerElement) {
      this.headerHeight = this.headerElement.clientHeight;
    }
  }
  
  /**
   * Получить высоту header
   */
  public getHeaderHeight(): number {
    return this.headerHeight;
  }
  
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
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - this.headerHeight - 30 - offset;
    
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