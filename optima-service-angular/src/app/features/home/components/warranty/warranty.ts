import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-warranty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warranty.html',
  styleUrl: './warranty.scss'
})
export class Warranty {
  constructor(
  @Inject(PLATFORM_ID) private platformId: Object,
  private modalService: ModalService  // ← Новое
) {}
  /**
   * Открытие формы обратного звонка
   */
  openCallbackForm(): void {
    // TODO: Реализовать модальное окно
    this.modalService.open('callback-modal');
  }
}