import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';
import { getBrandHub, BrandHub } from '../brand-hub-data';
import { isAuthorizedBrandSlug } from '../../../shared/data/authorized-brands';
import { HeaderThemeService } from '../../../core/services/header-theme.service';

@Component({
  selector: 'app-brand-hub',
  standalone: true,
  imports: [CommonModule, RouterModule, Breadcrumb],
  templateUrl: './brand-hub.html',
  styleUrl: './brand-hub.scss'
})
export class BrandHubPage implements OnInit {
  hub: BrandHub | null = null;
  breadcrumbs: BreadcrumbItem[] = [];
  logoFailed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta,
    private headerThemeService: HeaderThemeService
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 0]);

    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.hub = getBrandHub(slug);

    if (!this.hub) {
      this.router.navigate(['/brands']);
      return;
    }

    this.breadcrumbs = [
      { label: 'Главная', path: '/' },
      { label: 'Бренды', path: '/brands' },
      { label: this.hub.brandName }
    ];

    this.title.setTitle(`Ремонт техники ${this.hub.brandName} в Ростове-на-Дону — Optima Сервис`);
    this.meta.updateTag({
      name: 'description',
      content: `Ремонт техники ${this.hub.brandName} в Ростове-на-Дону: ${this.hub.categories.map(c => c.deviceName).join(', ')}. Оригинальные запчасти, гарантия до 90 дней.`
    });

    this.headerThemeService.setDark(this.isAuthorizedBrand);
  }

  get isAuthorizedBrand(): boolean {
    return isAuthorizedBrandSlug(this.hub?.slug);
  }

  onLogoError(): void {
    this.logoFailed = true;
  }
}
