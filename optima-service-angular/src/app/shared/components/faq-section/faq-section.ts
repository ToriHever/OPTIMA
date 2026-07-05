import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.scss',
  animations: [
    trigger('slideDown', [
      state('closed', style({ height: '0', opacity: '0', overflow: 'hidden', paddingTop: '0', paddingBottom: '0', visibility: 'hidden' })),
      state('open', style({ height: '*', opacity: '1', overflow: 'visible', visibility: 'visible' })),
      transition('closed => open', [style({ overflow: 'hidden', visibility: 'visible' }), animate('350ms cubic-bezier(0.4, 0, 0.2, 1)')]),
      transition('open => closed', [style({ overflow: 'hidden' }), animate('250ms ease-in')])
    ])
  ]
})
export class FaqSection {
  @Input() questions: FaqItem[] = [];
  @Input() sectionTitle: string = 'Часто задаваемые';
  @Input() sectionTitleAccent: string = 'вопросы';
  @Input() navTitle: string = 'FAQ';

  activeIndex: number | null = null;

  toggle(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
