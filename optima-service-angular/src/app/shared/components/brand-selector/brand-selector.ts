import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrandRepairData } from '../../../features/remont-bytovoy-tekhniki/brand-repair/brand-repair-data';

@Component({
  selector: 'app-brand-selector',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './brand-selector.html',
  styleUrl: './brand-selector.scss'
})
export class BrandSelector {
  @Input() brands: BrandRepairData[] = [];
  @Input() basePath: string = '';
  @Input() deviceName: string = '';

  failedLogos = new Set<string>();

  logoUrl(brand: BrandRepairData): string {
    return `/assets/img/brands/${brand.brandName}.png`;
  }

  onLogoError(slug: string): void {
    this.failedLogos.add(slug);
  }
}
