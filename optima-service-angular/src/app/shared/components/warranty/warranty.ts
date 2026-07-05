import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtaBanner } from '../cta-banner/cta-banner';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-warranty',
  standalone: true,
  imports: [CommonModule, CtaBanner],
  templateUrl: './warranty.html',
  styleUrl: './warranty.scss'
})
export class Warranty {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: ModalService
  ) {}

  openQuestionForm() {
    this.modalService.open('callback-modal', { purpose: 'question' });
  }
}
