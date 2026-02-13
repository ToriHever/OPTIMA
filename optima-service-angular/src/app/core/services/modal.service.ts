import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ModalConfig {
  id: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals = new Map<string, BehaviorSubject<boolean>>();
  private modalData = new Map<string, any>();

  /**
   * Регистрация модального окна
   */
  register(modalId: string): void {
    if (!this.modals.has(modalId)) {
      this.modals.set(modalId, new BehaviorSubject<boolean>(false));
    }
  }

  /**
   * Открытие модального окна
   */
  open(modalId: string, data?: any): void {
    const modal = this.modals.get(modalId);
    if (modal) {
      if (data) {
        this.modalData.set(modalId, data);
      }
      modal.next(true);
      // Блокируем скролл body
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Закрытие модального окна
   */
  close(modalId: string): void {
    const modal = this.modals.get(modalId);
    if (modal) {
      modal.next(false);
      this.modalData.delete(modalId);
      // Восстанавливаем скролл body
      document.body.style.overflow = '';
    }
  }

  /**
   * Закрытие всех модальных окон
   */
  closeAll(): void {
    this.modals.forEach((modal) => modal.next(false));
    this.modalData.clear();
    document.body.style.overflow = '';
  }

  /**
   * Получение состояния модального окна
   */
  getState(modalId: string): Observable<boolean> {
    this.register(modalId);
    return this.modals.get(modalId)!.asObservable();
  }

  /**
   * Получение данных модального окна
   */
  getData(modalId: string): any {
    return this.modalData.get(modalId);
  }
}