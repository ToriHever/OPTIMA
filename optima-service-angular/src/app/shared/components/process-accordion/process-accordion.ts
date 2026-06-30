import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface ProcessStep {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  duration: string;
}

export interface SidebarStat {
  number: string;
  label: string;
}

@Component({
  selector: 'app-process-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process-accordion.html',
  styleUrl: './process-accordion.scss',
  animations: [
    trigger('slideDown', [
      state('closed', style({ height: '0', opacity: '0', overflow: 'hidden', paddingTop: '0', paddingBottom: '0', visibility: 'hidden' })),
      state('open', style({ height: '*', opacity: '1', overflow: 'visible', visibility: 'visible' })),
      transition('closed => open', [style({ overflow: 'hidden', visibility: 'visible' }), animate('400ms cubic-bezier(0.4, 0, 0.2, 1)')]),
      transition('open => closed', [style({ overflow: 'hidden' }), animate('300ms ease-in')])
    ])
  ]
})
export class ProcessAccordion {
  @Input() sectionTitle: string = 'Как мы';
  @Input() sectionTitleAccent: string = 'работаем';
  @Input() sectionDescription: string = '';
  @Input() stats: SidebarStat[] = [];
  @Input() steps: ProcessStep[] = [];
  @Input() navTitle: string = 'Как работаем';

  activeStep: number | null = 0;

  toggleStep(index: number): void {
    this.activeStep = this.activeStep === index ? null : index;
  }
}
