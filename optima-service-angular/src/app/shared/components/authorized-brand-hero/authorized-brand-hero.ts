import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '../breadcrumb/breadcrumb';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-authorized-brand-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, Breadcrumb],
  templateUrl: './authorized-brand-hero.html',
  styleUrl: './authorized-brand-hero.scss'
})
export class AuthorizedBrandHero {
  @Input() brandName = '';
  @Input() subtitle = '';
  @Input() imageUrl?: string;
  @Input() breadcrumbs: BreadcrumbItem[] = [];
  @Input() ctaText = 'Оформить ремонт';

  private modalService = inject(ModalService);

  imageFailed = false;

  get computedSubtitle(): string {
    return this.subtitle || `Официальный ремонт и обслуживание бытовой техники ${this.brandName}. Оригинальные запчасти. Сертифицированные мастера.`;
  }

  openCallback(): void {
    this.modalService.open('callback-modal', { purpose: 'callback' });
  }

  onImageError(): void {
    this.imageFailed = true;
  }
}
