import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModalService } from '../../../../core/services/modal.service';
import { ScrollService } from '../../../../core/services/scroll.service';

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
  name: 'Диагностика и ПО',
  description: 'Диагностика неисправностей и восстановление программного обеспечения',
  icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  services: [
    { name: 'Диагностика неисправности', price: 'Бесплатно', duration: 'Проведем диагностику техники, устройства бесплатно' },
    { name: 'Восстановление программного обеспечения', price: 'от 1 000 ₽', duration: 'Включает восстановление ПО, обновление прошивки, чистку от вирусов и настройку' },
    { name: 'Прошивка BIOS', price: 'от 1 000 ₽', duration: 'Обновление, восстановление или ремонт базовой системы ввода/вывода' }
  ]
},

{
  name: 'Аппаратный ремонт',
  description: 'Ремонт портативной техники и компьютеров',
  icon: 'M4 6h16v12H4V6zm2 2v8h12V8H6zm2 2h8v4H8v-4z',
  services: [
    { name: 'Замена дисплеев и тачскринов', price: 'от 2 000 ₽', duration: 'Только стоимость работы. Актуально для смартфонов, планшетов, ноутбуков' },
    { name: 'Замена аккумуляторов', price: 'от 1 500 ₽', duration: 'Только стоимость работы. Для всех типов портативных устройств' },
    { name: 'Ремонт разъемов', price: 'от 1 500 ₽', duration: 'Включает пайку или замену разъемов. Зарядки, Аудиовыхода, HDMI' },
    { name: 'Ремонт после залития жидкостями', price: 'от 1 500 ₽', duration: 'Включает чистку от коррозии и восстановление платы' },
    { name: 'Ремонт электронных плат', price: 'от 2 000 ₽', duration: 'Сложный ремонт платы с заменой чипов (чипсетов, видеочипов)' },
    { name: 'Восстановление дорожек платы', price: 'от 2 000 ₽', duration: 'Сложные паяльные работы по восстановлению поврежденных соединений' },
    { name: 'Ремонт систем охлаждения', price: 'от 1 500 ₽', duration: 'Чистка от пыли, замена термопасты, кулеров' },
    { name: 'Замена корпусных деталей', price: 'Цена зависит от ТЗ', duration: 'Финальная стоимость зависит от модели устройства и включает как работу мастера, так и цену выбранной запчасти' },
    { name: 'Ремонт и замена кнопок', price: 'Цена зависит от ТЗ', duration: 'Ремонт производится путем замены неисправного шлейфа с кнопкой' },
    { name: 'Калибровка датчиков', price: 'Цена зависит от ТЗ', duration: 'Актуально для многих гаджетов' }
  ]
},

{
  name: 'Ремонт телевизоров и аудиотехники',
  description: 'Профессиональный ремонт телевизоров и аудиосистем',
  icon: 'M4 7h16v10H4V7zm2 2v6h12V9H6zm2 2h8v2H8v-2z',
  services: [
    { name: 'Ремонт подсветки телевизоров', price: 'от 3 000 ₽', duration: 'Актуально для LED, OLED, QLED телевизоров' },
    { name: 'Ремонт аудиосистем и колонок', price: 'Цена зависит от ТЗ', duration: 'Ремонт акустических систем, саундбаров, портативных колонок' }
  ]
},
{
  name: 'Ремонт бытовой техники',
  description: 'Ремонт крупной и мелкой бытовой техники',
  icon: 'M19 6h-4V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h2v2h-2V4zm0 12h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 0h-2v-2h2v2z',
  services: [
    { name: 'Ремонт электронных плат (Блок управления)', price: 'от 3 000 ₽', duration: 'Актуально для всех видов бытовой техники (СМА, холодильники, посудомойки)' },
    { name: 'Ремонт механических компонентов (Кофемашины)', price: 'от 3 000 ₽', duration: 'Включает ремонт помпы, заварочного блока и других узлов' },
    { name: 'Заправка хладагентом', price: 'Цена зависит от ТЗ', duration: 'Ключевая услуга для охлаждения холодильников' },
    { name: 'Профилактическое обслуживание', price: 'от 1 500 ₽', duration: 'Может включать чистку пылесосов, чистку от накипи кофемашин и т.д.' },
    { name: 'Замена механических компонентов', price: 'Цена зависит от ТЗ', duration: 'Моторы, компрессоры, помпы' }
  ]
}
  ];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, 
  private modalService: ModalService,
  private scrollService: ScrollService
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
  this.scrollService.scrollToId('warranty');
  }
}