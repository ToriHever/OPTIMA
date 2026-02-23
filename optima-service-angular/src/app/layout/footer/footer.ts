import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../core/services/modal.service';
import { ScrollService } from '../../core/services/scroll.service';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  currentYear = new Date().getFullYear();
  
  constructor(private modalService: ModalService,
    private scrollService: ScrollService
  ) {}

   scrollTo(sectionId: string): void {
    this.scrollService.scrollToId(sectionId);
  }
  
  openRepairStatusModal(event: Event): void {
    event.preventDefault();
    this.modalService.open('repair-status-modal');
  }
  
  openPrivacyPolicy(event: Event): void {
    event.preventDefault();
    console.log('Open privacy policy');
  }
  
  openTerms(event: Event): void {
    event.preventDefault();
    console.log('Open terms');
  }
}