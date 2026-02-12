import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warranty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warranty.html',
  styleUrl: './warranty.scss'
})
export class Warranty {
  
  /**
   * Открытие формы обратного звонка
   */
  openCallbackForm(): void {
    // TODO: Реализовать модальное окно
    console.log('Open callback form');
  }
}