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

  // isInitialized — элемент присутствует в DOM (никогда не убираем)
  isInitialized: boolean = false;
  // isVisible — управляет CSS-классом .visible для плавной анимации
  isVisible: boolean = false;

  private isBrowser: boolean;
  private footerElement: HTMLElement | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.initNavigation();
        this.cacheFooter();
        this.updateProgress();
      }, 500);

      window.addEventListener('load', () => {
        setTimeout(() => {
          this.initNavigation();
          this.cacheFooter();
          this.updateProgress();
        }, 100);
      });
    }
  }

  ngOnDestroy(): void {}

  private cacheFooter(): void {
    this.footerElement = document.querySelector('footer');
  }

  private isFooterVisible(): boolean {
    if (!this.footerElement) return false;
    const rect = this.footerElement.getBoundingClientRect();
    return rect.top < window.innerHeight;
  }

  private initNavigation(): void {
    const sections = document.querySelectorAll('section[data-nav-title]');

    this.navItems = Array.from(sections).map((section: Element) => {
      const sectionElement = section as HTMLElement;
      const id = sectionElement.id;
      const altTitle = sectionElement.getAttribute('data-nav-title');
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

    if (this.navItems.length >= 2) {
      this.isInitialized = true;
      // Небольшая задержка чтобы браузер успел отрисовать элемент
      // перед запуском CSS-перехода
      setTimeout(() => {
        this.isVisible = !this.isFooterVisible();
      }, 50);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isBrowser) {
      this.updateProgress();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.navItems.forEach(item => {
        if (item.element) {
          item.offsetTop = item.element.offsetTop;
        }
      });
      this.updateProgress();
    }
  }

  private updateProgress(): void {
    if (this.isInitialized) {
      this.isVisible = !this.isFooterVisible();
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;

    this.totalProgress = Math.min(100, (scrollTop / maxScroll) * 100);

    const isAtBottom = Math.abs(scrollTop - maxScroll) < 5;

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
      let sectionBottom = nextItem ? nextItem.offsetTop - 170 : maxScroll;

      if (!nextItem) {
        sectionBottom = maxScroll;
      }

      const sectionHeight = sectionBottom - sectionTop;

      if (isAtBottom) {
        item.progress = 100;
        this.currentSection = this.navItems.length - 1;
      } else if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
        this.currentSection = index;
        const progressInSection = scrollTop - sectionTop;
        item.progress = Math.min(100, Math.max(0, (progressInSection / sectionHeight) * 100));
      } else if (scrollTop >= sectionBottom) {
        item.progress = 100;
      } else {
        item.progress = 0;
      }
    });

    if (scrollTop < 150 && this.navItems.length > 0) {
      this.currentSection = 0;
    }
  }

  scrollToSection(index: number): void {
    const item = this.navItems[index];
    if (!item.element) return;

    const element = document.getElementById(item.id);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offsetTop = rect.top + scrollTop - 100;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }

  getDisplayTitle(item: NavItem): string {
    return item.altTitle || item.title;
  }
}