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

  // Фото вида техники (напр. device.hero.image) — общее для всех брендов
  // этого вида, не зависит от бренда/модели.
  @Input() imageUrl?: string;

  // Модельные табы (только для страниц телефонов)
  @Input() models: PhoneModel[] = [];
  @Input() activeModelSlug: string | null = null;
  @Input() modelName = '';
  @Input() brandBasePath = '';

  imageFailed = false;

  private modalService = inject(ModalService);

  // Компонент переиспользуется при смене бренда/устройства на той же
  // странице (тот же matcher-роут :brand) — без сброса флаг «картинка не
  // найдена» остался бы от предыдущего вида техники.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageUrl']) {
      this.imageFailed = false;
    }
  }

  onImageError(): void {
    this.imageFailed = true;
  }

  openCallback() {
    this.modalService.open('callback-modal', { purpose: 'callback' });
  }

  scrollToPrice() {
    const el = document.getElementById(this.priceScrollTarget);
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
