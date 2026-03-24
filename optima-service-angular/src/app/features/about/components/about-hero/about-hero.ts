import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-about-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-hero.html',
  styleUrl: './about-hero.scss'
})
export class AboutHero {
  constructor(private modalService: ModalService) {}

  openRepairForm(): void {
    this.modalService.open('callback-modal', { purpose: 'diagnostic' });
  }
}