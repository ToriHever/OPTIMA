import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandRepairData } from '../../../features/remont-bytovoy-tekhniki/brand-repair/brand-repair-data';

const FALLBACK_BRANDS = ['Ardo', 'Gorenje', 'Zanussi', 'LG', 'Siemens', 'Electrolux', 'Ariston', 'Candy', 'Samsung', 'Beko', 'Indesit', 'Bosch'];

@Component({
  selector: 'app-trust-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trust-block.html',
  styleUrl: './trust-block.scss'
})
export class TrustBlock {
  @Input() deviceGenitive = 'бытовой техники';
  @Input() brands: BrandRepairData[] = [];

  get brandsText(): string {
    const names = this.brands.length
      ? this.brands.map(b => b.brandName)
      : FALLBACK_BRANDS;
    return names.join(', ') + ' и другие';
  }
}
