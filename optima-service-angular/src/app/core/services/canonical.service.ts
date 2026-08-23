import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

const SITE_ORIGIN = 'https://larina.optima-sc.ru';

/**
 * Проставляет <link rel="canonical"> на каждой странице — единая точка,
 * а не дублирование в ngOnInit каждого page-компонента. Работает и при
 * статическом prerender (через DOCUMENT, не глобальный window.document —
 * корректно на сервере при сборке), и при клиентской SPA-навигации между
 * уже отрендеренными страницами.
 */
@Injectable({ providedIn: 'root' })
export class CanonicalService {
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private router: Router
  ) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => this.setCanonical(e.urlAfterRedirects));
  }

  private setCanonical(url: string): void {
    const path = url.split('?')[0].split('#')[0];
    const href = `${SITE_ORIGIN}${path}`;

    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
