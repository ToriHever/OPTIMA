import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ModalService } from '../../core/services/modal.service';
import { ScrollService } from '../../core/services/scroll.service';
import { NavigationService } from '../../core/services/navigation.service';
import { MobileMenu } from '../mobile-menu/mobile-menu';
import {
  PHONE_BRANDS, PHONE_ISSUES,
  COMPUTER_DEVICES, COMPUTER_BRANDS,
  AV_DEVICES, AV_BRANDS,
  APPLIANCE_LARGE, APPLIANCE_SMALL, APPLIANCE_BRANDS
} from '../../shared/data/nav-data';

type MegaMenuKey = 'phones' | 'computers' | 'appliances' | 'av';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MobileMenu],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  isMenuOpen = false;
  isScrolled = false;
  activeMegaMenu: MegaMenuKey | null = null;

  readonly phoneBrands = PHONE_BRANDS;
  readonly phoneIssues = PHONE_ISSUES;
  readonly computerDevices = COMPUTER_DEVICES;
  readonly computerBrands = COMPUTER_BRANDS;
  readonly avDevices = AV_DEVICES;
  readonly avBrands = AV_BRANDS;
  readonly applianceLarge = APPLIANCE_LARGE;
  readonly applianceSmall = APPLIANCE_SMALL;
  readonly applianceBrands = APPLIANCE_BRANDS;

  constructor(
    private modalService: ModalService,
    private scrollService: ScrollService,
    private navigationService: NavigationService,
    private router: Router
  ) {}

  /**
   * Навигация к секции с учётом текущего маршрута.
   * Если уже на главной — скроллим сразу.
   * Если на другой странице — сохраняем цель и переходим на главную.
   */
  scrollTo(sectionId: string): void {
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      this.scrollService.scrollToId(sectionId);
    } else {
      this.navigationService.setPendingScroll(sectionId);
      this.router.navigate(['/']);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openMegaMenu(key: MegaMenuKey): void {
    this.activeMegaMenu = key;
  }

  closeMegaMenu(): void {
    this.activeMegaMenu = null;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  openRepairStatusModal(): void {
    this.modalService.open('repair-status-modal');
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 100;

    const header = document.querySelector('.header') as HTMLElement;
    if (header) {
      header.style.boxShadow = this.isScrolled
        ? '0 4px 16px rgba(0, 68, 77, 0.15)'
        : '0 2px 8px rgba(0, 68, 77, 0.08)';
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }
}