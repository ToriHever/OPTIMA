import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-cta-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-banner.html',
  styleUrl: './cta-banner.scss'
})
export class CtaBanner {
  @Input() title = 'Остались вопросы?';
  @Input() description = 'Наши специалисты проконсультируют вас и помогут подобрать решение.';
  @Input() primaryLabel = 'Получить консультацию';
  @Input() secondaryLabel = 'Позвонить сейчас';
  @Input() phone = 'tel:89885163131';

  private modalService = inject(ModalService);

  openQuestion() {
    this.modalService.open('callback-modal', { purpose: 'question' });
  }
}
