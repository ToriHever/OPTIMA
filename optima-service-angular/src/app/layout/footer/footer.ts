import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  currentYear = new Date().getFullYear();
  
  /**
   * Открытие модального окна проверки статуса ремонта
   */
  openRepairStatusModal(event: Event): void {
    event.preventDefault();
    // TODO: Реализовать через сервис модальных окон
    console.log('Open repair status modal');
  }
  
  /**
   * Открытие политики конфиденциальности
   */
  openPrivacyPolicy(event: Event): void {
    event.preventDefault();
    // TODO: Реализовать модальное окно или отдельную страницу
    console.log('Open privacy policy');
  }
  
  /**
   * Открытие пользовательского соглашения
   */
  openTerms(event: Event): void {
    event.preventDefault();
    // TODO: Реализовать модальное окно или отдельную страницу
    console.log('Open terms');
  }
}