import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ModalService } from '../../../core/services/modal.service';
import { CtaBanner } from '../cta-banner/cta-banner';

@Component({
  selector: 'app-service-sections',
  standalone: true,
  imports: [RouterModule, CtaBanner],
  templateUrl: './service-sections.html',
  styleUrl: './service-sections.scss'
})
export class ServiceSections {
  private router = inject(Router);
  private modalService = inject(ModalService);

  navigate(path: string) {
    this.router.navigate([path]);
  }

  openQuestion() {
    this.modalService.open('callback-modal', { purpose: 'question' });
  }
}
