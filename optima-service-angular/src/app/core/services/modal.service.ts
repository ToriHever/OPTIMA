import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private repairStatusModalOpen = new BehaviorSubject<boolean>(false);
  
  repairStatusModalOpen$ = this.repairStatusModalOpen.asObservable();
  
  openRepairStatusModal(): void {
    this.repairStatusModalOpen.next(true);
    document.body.style.overflow = 'hidden';
  }
  
  closeRepairStatusModal(): void {
    this.repairStatusModalOpen.next(false);
    document.body.style.overflow = '';
  }
}