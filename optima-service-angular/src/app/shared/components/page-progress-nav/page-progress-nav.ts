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
      // Небольшая задержка для корректной инициализации DOM
      setTimeout(() => {
        this.initNavigation();
        this.updateProgress();
      }, 100);
    }
  }
  
  ngOnDestroy(): void {
    // Очистка при необходимости
  }
  
  /**
   * Инициализация навигации - сканирование заголовков на странице
   */
  private initNavigation(): void {
    // Ищем все заголовки h2 с id (можно настроить селектор)
    const headings = document.querySelectorAll('h2[id], h3[id], section[id] > .section-title-dark, section[id] > .container > .section-title-dark');
    
    this.navItems = Array.from(headings).map((heading: Element) => {
      const element = heading as HTMLElement;
      const section = heading.closest('section') || element;
      const id = section.id || element.id;
      
      // Проверяем наличие data-nav-title для альтернативного названия
      const altTitle = element.getAttribute('data-nav-title') || 
                       section.getAttribute('data-nav-title');
      
      return {
        id: id,
        title: element.textContent?.trim() || '',
        altTitle: altTitle || undefined,
        element: section as HTMLElement,
        offsetTop: (section as HTMLElement).offsetTop,
        progress: 0
      };
    });
    
    // Показываем меню только если есть хотя бы 2 секции
    this.isVisible = this.navItems.length >= 2;
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
    
    // Общий прогресс страницы (0-100)
    this.totalProgress = Math.min(
      100,
      (scrollTop / (documentHeight - windowHeight)) * 100
    );
    
    // Определяем текущую секцию и прогресс каждой
    this.navItems.forEach((item, index) => {
      if (!item.element) return;
      
      const nextItem = this.navItems[index + 1];
      const sectionTop = item.offsetTop - 100; // Отступ для активации
      const sectionBottom = nextItem ? nextItem.offsetTop - 100 : documentHeight;
      const sectionHeight = sectionBottom - sectionTop;
      
      // Проверяем, находимся ли мы в этой секции
      if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
        this.currentSection = index;
        
        // Прогресс текущей секции
        const progressInSection = scrollTop - sectionTop;
        item.progress = Math.min(100, (progressInSection / sectionHeight) * 100);
      } else if (scrollTop >= sectionBottom) {
        item.progress = 100;
      } else {
        item.progress = 0;
      }
    });
  }
  
  /**
   * Переход к секции по клику
   */
  scrollToSection(index: number): void {
    const item = this.navItems[index];
    if (item.element) {
      const offsetTop = item.element.offsetTop - 80; // Отступ для fixed header
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }
  
  /**
   * Получить отображаемое название секции
   */
  getDisplayTitle(item: NavItem): string {
    return item.altTitle || item.title;
  }
}