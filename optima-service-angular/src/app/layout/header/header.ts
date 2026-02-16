import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../core/services/modal.service';
import { ScrollService } from '../../core/services/scroll.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  isMenuOpen = false;
  isScrolled = false;
  
  constructor(private modalService: ModalService,
    private scrollService: ScrollService
  ) {}

  scrollTo(sectionId: string): void {
    this.scrollService.scrollToId(sectionId);
  }
  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }
  
  openRepairStatusModal(): void {
    this.modalService.open('repair-status-modal');
    this.closeMenu();
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