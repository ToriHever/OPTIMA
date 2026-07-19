import { Component, Input, inject } from '@angular/core';
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
export class BrandHero {
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

  private modalService = inject(ModalService);

  get logoPath(): string {
    return `assets/img/brands/technique/phone/${this.brandName}.png`;
  }

  openCallback() {
    this.modalService.open('callback-modal', { purpose: 'callback' });
  }

  scrollToPrice() {
    const el = document.getElementById(this.priceScrollTarget);
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
