import { Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface NavItem {
  id: string;
  title: string;
  altTitle?: string;
  element?: HTMLElement;
  offsetTop: number;
  progress: number;
}

@Component({
  selector: 'app-page-progress-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-progress-nav.html',
  styleUrl: './page-progress-nav.scss'
})
export class PageProgressNavComponent implements OnInit, OnDestroy {
  navItems: NavItem[] = [];
  currentSection: number = 0;
  totalProgress: number = 0;
  isVisible: boolean = false;
  
  private isBrowser: boolean;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  ngOnInit(): void {
    if (this.isBrowser) {
      // Ждем полной загрузки DOM и всех стилей
      setTimeout(() => {
        this.initNavigation();
        this.updateProgress();
      }, 500);
      
      // Дополнительная инициализация после загрузки изображений
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.initNavigation();
          this.updateProgress();
        }, 100);
      });
    }
  }
  
  ngOnDestroy(): void {
    // Очистка при необходимости
  }
  
  /**
   * Инициализация навигации - сканирование заголовков на странице
   */
  private initNavigation(): void {
    // Приоритет: ищем section с data-nav-title (это основной способ)
    const sections = document.querySelectorAll('section[data-nav-title]');
    
    this.navItems = Array.from(sections).map((section: Element) => {
      const sectionElement = section as HTMLElement;
      const id = sectionElement.id;
      
      // Получаем альтернативное название из data-nav-title на section
      const altTitle = sectionElement.getAttribute('data-nav-title');
      
      // Пытаемся найти заголовок внутри для основного названия
      const heading = sectionElement.querySelector('h2, h3, .section-title');
      const title = heading?.textContent?.trim() || altTitle || '';
      
      return {
        id: id || `section-${Math.random().toString(36).substr(2, 9)}`,
        title: title,
        altTitle: altTitle || undefined,
        element: sectionElement,
        offsetTop: sectionElement.offsetTop,
        progress: 0
      };
    });
    
    // Показываем меню только если есть хотя бы 2 секции
    this.isVisible = this.navItems.length >= 2;
    
    console.log('Navigation initialized:', this.navItems.length, 'sections found');
  }
  
  /**
   * Обработчик скролла страницы
   */
  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isBrowser) {
      this.updateProgress();
    }
  }
  
  /**
   * Обработчик изменения размера окна
   */
  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      // Пересчитываем offsetTop при изменении размера
      this.navItems.forEach(item => {
        if (item.element) {
          item.offsetTop = item.element.offsetTop;
        }
      });
      this.updateProgress();
    }
  }
  
  /**
   * Обновление прогресса скролла
   */
  private updateProgress(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;

    // 1. Общий прогресс страницы (0-100)
    this.totalProgress = Math.min(100, (scrollTop / maxScroll) * 100);

    // Проверка: если мы в самом низу, принудительно завершаем прогресс всех секций
    const isAtBottom = Math.abs(scrollTop - maxScroll) < 5; // запас в 5px
    
    // Пересчитываем offsetTop для всех элементов (на случай динамического контента)
    this.navItems.forEach(item => {
      if (item.element) {
        const rect = item.element.getBoundingClientRect();
        item.offsetTop = rect.top + scrollTop;
      }
    });

    this.navItems.forEach((item, index) => {
      if (!item.element) return;

      const nextItem = this.navItems[index + 1];
      const sectionTop = item.offsetTop - 170;
      
      // Для последней секции ограничиваем низ максимально возможным скроллом
      let sectionBottom = nextItem ? nextItem.offsetTop - 170 : maxScroll;

      // Если это последняя секция, она должна заканчиваться там, где заканчивается скролл
      if (!nextItem) {
        sectionBottom = maxScroll;
      }

      const sectionHeight = sectionBottom - sectionTop;

      if (isAtBottom) {
        // Если внизу страницы - завершаем все секции
        item.progress = 100;
        this.currentSection = this.navItems.length - 1;
      } else if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
        // Текущая активная секция
        this.currentSection = index;
        const progressInSection = scrollTop - sectionTop;
        item.progress = Math.min(100, Math.max(0, (progressInSection / sectionHeight) * 100));
      } else if (scrollTop >= sectionBottom) {
        // Секция уже пройдена
        item.progress = 100;
      } else {
        // Секция еще не достигнута
        item.progress = 0;
      }
    });
    
    // Если в самом начале страницы (до первой секции)
    if (scrollTop < 150 && this.navItems.length > 0) {
      this.currentSection = 0;
    }
  }
  
  /**
   * Переход к секции по клику
   */
  scrollToSection(index: number): void {
    const item = this.navItems[index];
    if (!item.element) return;
    
    // Пересчитываем offsetTop перед скроллом (на случай динамического контента)
    const element = document.getElementById(item.id);
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offsetTop = rect.top + scrollTop - 100; // Отступ для fixed header (настройте под свой header)
    
    console.log('Scrolling to section:', item.id, 'offset:', offsetTop);
    
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
  
  /**
   * Получить отображаемое название секции
   */
  getDisplayTitle(item: NavItem): string {
    return item.altTitle || item.title;
  }
}