import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '../breadcrumb/breadcrumb';
import { ModalService } from '../../../core/services/modal.service';
import { PhoneModel } from '../../../features/remont-kompyuterov/phone-models-data';

@Component({
  selector: 'app-brand-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, Breadcrumb],
  templateUrl: './brand-hero.html',
  styleUrl: './brand-hero.scss'
})
export class BrandHero implements OnChanges {
  @Input() brandName = '';
  @Input() deviceName = '';
  @Input() features: string[] = [];
  @Input() breadcrumbs: BreadcrumbItem[] = [];
  @Input() backPath = '/';
  @Input() backLabel = 'Техника';
  @Input() devicePath = '/';
  @Input() deviceLabel = '';
  @Input() priceScrollTarget = '';

  // Модельные табы (только для страниц телефонов)
  @Input() models: PhoneModel[] = [];
  @Input() activeModelSlug: string | null = null;
  @Input() modelName = '';
  @Input() brandBasePath = '';

  logoFailed = false;

  private modalService = inject(ModalService);

  get logoPath(): string {
    return `assets/img/brands/${this.brandName}.png`;
  }

  // Компонент переиспользуется при смене бренда на той же странице
  // (тот же matcher-роут :brand) — без сброса флаг «картинка не найдена»
  // остался бы от предыдущего бренда.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['brandName']) {
      this.logoFailed = false;
    }
  }

  onLogoError(): void {
    this.logoFailed = true;
  }

  openCallback() {
    this.modalService.open('callback-modal', { purpose: 'callback' });
  }

  scrollToPrice() {
    const el = document.getElementById(this.priceScrollTarget);
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
