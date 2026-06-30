import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  PLATFORM_ID,
  Inject,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription, filter } from 'rxjs';

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
  imports: [CommonModule, RouterModule],
  templateUrl: './page-progress-nav.html',
  styleUrl: './page-progress-nav.scss'
})
export class PageProgressNavComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('navItemsRef') navItemsRef!: ElementRef<HTMLElement>;

  navItems: NavItem[] = [];
  currentSection: number = 0;
  totalProgress: number = 0;

  isInitialized: boolean = false;
  isVisible: boolean = false;

  private isBrowser: boolean;
  private footerElement: HTMLElement | null = null;
  private scrollAnimationId: number | null = null;
  private routerSub!: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Инициализация при старте
    setTimeout(() => this.reinit(), 500);

    // Переинициализация при каждой смене маршрута
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        // Сбрасываем состояние
        this.navItems = [];
        this.isInitialized = false;
        this.isVisible = false;
        this.currentSection = 0;
        this.totalProgress = 0;

        // Ждём отрисовки нового контента
        setTimeout(() => this.reinit(), 500);
      });

    window.addEventListener('load', () => {
      setTimeout(() => this.reinit(), 100);
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    if (this.scrollAnimationId !== null) {
      cancelAnimationFrame(this.scrollAnimationId);
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  private reinit(): void {
    this.cacheFooter();
    this.initNavigation();
    this.updateProgress();
  }

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
        title,
        altTitle: altTitle || undefined,
        element: sectionElement,
        offsetTop: sectionElement.offsetTop,
        progress: 0
      };
    });

    // Показываем меню только если секций БОЛЬШЕ 2
    if (this.navItems.length > 2) {
      this.isInitialized = true;
      setTimeout(() => {
        this.isVisible = !this.isFooterVisible();
      }, 50);
    } else {
      this.isInitialized = false;
      this.isVisible = false;
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

    const prevSection = this.currentSection;

    this.navItems.forEach((item, index) => {
      if (!item.element) return;

      const nextItem = this.navItems[index + 1];
      const sectionTop = item.offsetTop - 170;
      const sectionBottom = nextItem ? nextItem.offsetTop - 170 : maxScroll;
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

    if (prevSection !== this.currentSection) {
      this.scrollNavToShowCurrent();
    }
  }

  private scrollNavToShowCurrent(): void {
    if (!this.isBrowser) return;

    requestAnimationFrame(() => {
      const container = this.navItemsRef?.nativeElement
        ?? document.querySelector('.nav-items') as HTMLElement;

      if (!container) return;

      const buttons = container.querySelectorAll<HTMLElement>('.nav-item');
      if (!buttons.length) return;

      const current = buttons[this.currentSection];
      if (!current) return;

      const targetIndex = Math.min(this.currentSection + 1, buttons.length - 1);
      const target = buttons[targetIndex];

      const containerScrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const currentLeft = current.offsetLeft;
      const targetRight = target.offsetLeft + target.offsetWidth;

      let desiredScrollLeft: number;

      if (targetRight > containerScrollLeft + containerWidth) {
        desiredScrollLeft = targetRight - containerWidth + 16;
      } else if (currentLeft < containerScrollLeft) {
        desiredScrollLeft = currentLeft - 16;
      } else {
        return;
      }

      desiredScrollLeft = Math.max(0, desiredScrollLeft);
      this.smoothScrollNav(container, desiredScrollLeft);
    });
  }

  private smoothScrollNav(container: HTMLElement, targetScrollLeft: number): void {
    if (this.scrollAnimationId !== null) {
      cancelAnimationFrame(this.scrollAnimationId);
    }

    const startScrollLeft = container.scrollLeft;
    const distance = targetScrollLeft - startScrollLeft;
    const duration = 300;
    let startTime: number | null = null;

    const easeInOut = (t: number): number =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollLeft = startScrollLeft + distance * easeInOut(progress);

      if (progress < 1) {
        this.scrollAnimationId = requestAnimationFrame(step);
      } else {
        this.scrollAnimationId = null;
      }
    };

    this.scrollAnimationId = requestAnimationFrame(step);
  }

  scrollToSection(index: number): void {
    const item = this.navItems[index];
    if (!item.element) return;

    const element = document.getElementById(item.id);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offsetTop = rect.top + scrollTop - 100;

    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }

  getDisplayTitle(item: NavItem): string {
    return item.altTitle || item.title;
  }
}