import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModalService } from '../../../../core/services/modal.service';

interface Service {
  name: string;
  price: string;
  duration: string;
  note?: string;
}

interface ServiceCategory {
  name: string;
  description: string;
  icon: string;
  services: Service[];
}

@Component({
  selector: 'app-services-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-table.html',
  styleUrl: './services-table.scss',
  animations: [
    trigger('slideDown', [
      state('closed', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden'
      })),
      state('open', style({
        height: '*',
        opacity: '1',
        overflow: 'visible'
      })),
      transition('closed <=> open', animate('300ms ease-in-out'))
    ])
  ]
})
export class ServicesTable {
  activeCategory: number = 0;
  
  serviceCategories: ServiceCategory[] = [
    {
      name: 'Ремонт холодильников',
      description: 'Все виды ремонта холодильников и морозильных камер',
      icon: 'M8 4H16V20H8V4Z M10 8H14V10H10V8Z M10 12H14V14H10V12Z',
      services: [
        { name: 'Замена термостата', price: 'от 1 500 ₽', duration: '1-2 часа' },
        { name: 'Замена компрессора', price: 'от 3 500 ₽', duration: '2-4 часа' },
        { name: 'Заправка фреоном', price: 'от 2 000 ₽', duration: '1-2 часа' },
        { name: 'Замена уплотнителя', price: 'от 800 ₽', duration: '30 мин' },
        { name: 'Ремонт электронного модуля', price: 'от 2 500 ₽', duration: '2-3 часа' },
        { name: 'Устранение утечки фреона', price: 'от 2 500 ₽', duration: '2-4 часа' }
      ]
    },
    {
      name: 'Ремонт стиральных машин',
      description: 'Ремонт всех типов стиральных машин на дому',
      icon: 'M6 4H18V20H6V4Z M12 8A4 4 0 0112 16A4 4 0 0112 8Z',
      services: [
        { name: 'Замена подшипников', price: 'от 2 500 ₽', duration: '2-3 часа' },
        { name: 'Замена ТЭНа', price: 'от 1 800 ₽', duration: '1-2 часа' },
        { name: 'Замена помпы (насоса)', price: 'от 1 500 ₽', duration: '1 час' },
        { name: 'Замена амортизаторов', price: 'от 1 200 ₽', duration: '1 час' },
        { name: 'Замена ремня привода', price: 'от 800 ₽', duration: '30 мин' },
        { name: 'Ремонт модуля управления', price: 'от 2 800 ₽', duration: '2-4 часа' }
      ]
    },
    {
      name: 'Ремонт посудомоечных машин',
      description: 'Профессиональный ремонт посудомоек',
      icon: 'M4 6H20V18H4V6Z M6 8H8V10H6V8Z M10 8H12V10H10V8Z M14 8H16V10H14V8Z',
      services: [
        { name: 'Замена циркуляционного насоса', price: 'от 2 200 ₽', duration: '1-2 часа' },
        { name: 'Замена ТЭНа', price: 'от 1 800 ₽', duration: '1-2 часа' },
        { name: 'Замена сливного насоса', price: 'от 1 500 ₽', duration: '1 час' },
        { name: 'Замена датчика уровня воды', price: 'от 1 200 ₽', duration: '1 час' },
        { name: 'Чистка фильтров', price: 'от 600 ₽', duration: '30 мин' },
        { name: 'Ремонт системы Aquastop', price: 'от 1 800 ₽', duration: '1-2 часа' }
      ]
    },
    {
      name: 'Ремонт варочных панелей',
      description: 'Ремонт индукционных, электрических и газовых панелей',
      icon: 'M4 8H20V16H4V8Z M8 10A2 2 0 108 14A2 2 0 108 10Z M16 10A2 2 0 1016 14A2 2 0 1016 10Z',
      services: [
        { name: 'Замена конфорки', price: 'от 1 500 ₽', duration: '1 час' },
        { name: 'Замена сенсорной панели', price: 'от 3 000 ₽', duration: '1-2 часа' },
        { name: 'Замена блока управления', price: 'от 2 800 ₽', duration: '1-2 часа' },
        { name: 'Замена переключателей', price: 'от 1 200 ₽', duration: '1 час' },
        { name: 'Ремонт индукционной катушки', price: 'от 2 500 ₽', duration: '2-3 часа' }
      ]
    },
    {
      name: 'Ремонт духовых шкафов',
      description: 'Все виды ремонта духовок и встраиваемой техники',
      icon: 'M6 4H18V20H6V4Z M8 8H16V16H8V8Z M10 6H14V7H10V6Z',
      services: [
        { name: 'Замена ТЭНа', price: 'от 1 800 ₽', duration: '1-2 часа' },
        { name: 'Замена вентилятора конвекции', price: 'от 2 000 ₽', duration: '1-2 часа' },
        { name: 'Замена терморегулятора', price: 'от 1 500 ₽', duration: '1 час' },
        { name: 'Замена стекла дверцы', price: 'от 2 500 ₽', duration: '1-2 часа' },
        { name: 'Ремонт блока управления', price: 'от 2 800 ₽', duration: '2-3 часа' }
      ]
    },
    {
      name: 'Ремонт кофемашин',
      description: 'Ремонт и обслуживание кофемашин всех брендов',
      icon: 'M8 6H16V14H8V6Z M10 4H14V6H10V4Z M7 14H17V18H7V14Z',
      services: [
        { name: 'Декальцинация (чистка)', price: 'от 1 200 ₽', duration: '1 час' },
        { name: 'Замена заварочного блока', price: 'от 3 500 ₽', duration: '1-2 часа' },
        { name: 'Замена помпы', price: 'от 2 200 ₽', duration: '1-2 часа' },
        { name: 'Замена термоблока', price: 'от 2 800 ₽', duration: '2-3 часа' },
        { name: 'Ремонт капучинатора', price: 'от 1 800 ₽', duration: '1 час' },
        { name: 'Замена прокладок и уплотнителей', price: 'от 800 ₽', duration: '30 мин' }
      ]
    }
  ];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private modalService: ModalService
) {}
  
  /**
   * Выбор категории
   */
  selectCategory(index: number): void {
    this.activeCategory = index;
  }
  
  /**
   * Открытие формы обратного звонка
   */
  openCallbackForm() {
    this.modalService.open('callback-modal', { purpose: 'callback' });
  }
   openDiagnosticForm() {
    this.modalService.open('callback-modal', { purpose: 'diagnostic' });
  }
  
  /**
   * Скролл к секции гарантий
   */
  scrollToWarranty(): void {
    if (isPlatformBrowser(this.platformId)) {
      const warrantySection = document.querySelector('#warranty');
      if (warrantySection) {
        warrantySection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}