import {
  Component,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
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

const CAT_SCROLL_STEP = 200;

@Component({
  selector: 'app-services-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-table.html',
  styleUrl: './services-table.scss',
  animations: [
    trigger('slideDown', [
      state('closed', style({ height: '0', opacity: '0', overflow: 'hidden' })),
      state('open',   style({ height: '*', opacity: '1', overflow: 'visible' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ServicesTable implements AfterViewInit {
  @ViewChild('catNavRef')  catNavRef!:  ElementRef<HTMLElement>;
  @ViewChild('ctaScroll')  ctaScrollRef!: ElementRef<HTMLElement>;

  activeCategory = 0;

  catArrowLeft  = false;
  catArrowRight = false;
  ctaFadeLeft   = false;
  ctaFadeRight  = false;

  private isMobileNav = false;

  serviceCategories: ServiceCategory[] = [
    {
      name: 'Диагностика и ПО',
      description: 'Профессиональная диагностика и восстановление программного обеспечения',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
      services: [
        { name: 'Диагностика неисправности',      price: 'Бесплатно',  duration: 'Профессиональный осмотр устройства для выявления поломки' },
        { name: 'Настройка и восстановление ПО',  price: 'от 1 000 ₽', duration: 'Прошивка, оптимизация, удаление вирусов и установка программ' },
        { name: 'Прошивка BIOS',                  price: 'от 1 000 ₽', duration: 'Обновление или ремонт базовой системы ввода-вывода (для ПК и ноутбуков)' },
      ],
    },
    {
      name: 'Ремонт электроники',
      description: 'Качественный ремонт портативной техники и компьютеров',
      icon: 'M4 6h16v12H4V6zm2 2v8h12V8H6zm2 2h8v4H8v-4z',
      services: [
        { name: 'Замена дисплея / Тачскрина',   price: 'от 2 000 ₽', duration: 'Работа по замене экрана на смартфонах, планшетах или ноутбуках' },
        { name: 'Замена аккумулятора (АКБ)',     price: 'от 1 500 ₽', duration: 'Замена батареи во всех типах портативных устройств' },
        { name: 'Ремонт разъемов',               price: 'от 1 500 ₽', duration: 'Пайка или замена гнезд зарядки, аудиовыходов, USB, HDMI' },
        { name: 'Ремонт после залития',          price: 'от 1 500 ₽', duration: 'Чистка платы от коррозии и восстановление после контакта с жидкостью' },
        { name: 'Ремонт плат (Замена чипов)',    price: 'от 2 000 ₽', duration: 'Сложная пайка: замена видеочипов, мостов, процессоров' },
        { name: 'Восстановление дорожек',        price: 'от 2 000 ₽', duration: 'Ремонт поврежденных токопроводящих соединений на плате' },
        { name: 'Ремонт системы охлаждения',    price: 'от 1 500 ₽', duration: 'Чистка от пыли, замена термопасты, ремонт или замена кулеров' },
        { name: 'Замена корпуса и кнопок',       price: 'от ТЗ',      duration: 'Ремонт петель, замена крышек или неисправных кнопок/шлейфов' },
      ],
    },
    {
      name: 'ТВ и Аудио',
      description: 'Профессиональный ремонт телевизоров и аудиосистем',
      icon: 'M4 7h16v10H4V7zm2 2v6h12V9H6zm2 2h8v2H8v-2z',
      services: [
        { name: 'Ремонт подсветки телевизора', price: 'от 3 000 ₽', duration: 'Замена светодиодных лент в LED, OLED и QLED панелях' },
        { name: 'Ремонт аудиосистем',          price: 'от ТЗ',      duration: 'Восстановление колонок, саундбаров и портативной акустики' },
      ],
    },
    {
      name: 'Бытовая техника',
      description: 'Ремонт крупной и мелкой бытовой техники',
      icon: 'M19 6h-4V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h2v2h-2V4zm0 12h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 0h-2v-2h2v2z',
      services: [
        { name: 'Ремонт модулей управления',      price: 'от 3 000 ₽', duration: 'Ремонт электроники стиральных машин, холодильников и др' },
        { name: 'Заправка фреоном',               price: 'от ТЗ',      duration: 'Обслуживание и заправка хладагентом холодильного оборудования' },
        { name: 'Замена механики (Моторы, помпы)', price: 'от ТЗ',     duration: 'Установка новых двигателей, насосов и компрессоров' },
      ],
    },
    {
      name: 'Кофемашины',
      description: 'Специализированный ремонт кофемашин',
      icon: 'M20 20H4v-4h16v4z M6 10h12v6H6z M8 4h8v4H8z',
      services: [
        { name: 'Ремонт механики кофемашин', price: 'от 3 000 ₽', duration: 'Ремонт заварочного блока, кофемолки и гидросистемы' },
      ],
    },
    {
      name: 'Обслуживание',
      description: 'Регулярное техническое обслуживание техники',
      icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2v-2 M12 6v8l4 2',
      services: [
        { name: 'Профилактическое ТО', price: 'от 1 500 ₽', duration: 'Регулярная чистка пылесосов, кофемашин (декальцинация) и т.д' },
      ],
    },
    {
      name: 'Роботы-пылесосы',
      description: 'Ремонт и обслуживание роботов-пылесосов',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z',
      services: [
        { name: 'Ремонт навигации (Лидар)', price: 'от ТЗ', duration: 'Замена лазерных датчиков и моторов системы навигации' },
      ],
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: ModalService,
    private scrollService: ScrollService,
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.checkMobileNav();
        this.updateCatArrows();
        this.updateCtaFades();
      }, 100);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobileNav();
      this.updateCatArrows();
    }
  }

  private checkMobileNav(): void {
    this.isMobileNav = window.innerWidth <= 1024;
  }

  scrollCatNav(direction: -1 | 1): void {
    const el = this.catNavRef?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: direction * CAT_SCROLL_STEP, behavior: 'smooth' });
  }

  onCatNavScroll(): void {
    this.updateCatArrows();
  }

  private updateCatArrows(): void {
    if (!this.isMobileNav) {
      this.catArrowLeft  = false;
      this.catArrowRight = false;
      return;
    }

    const el = this.catNavRef?.nativeElement;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    this.catArrowLeft  = scrollLeft > 4;
    this.catArrowRight = maxScroll > 4 && scrollLeft < maxScroll - 4;
  }

  onCtaScroll(): void {
    this.updateCtaFades();
  }

  private updateCtaFades(): void {
    const el = this.ctaScrollRef?.nativeElement;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    this.ctaFadeLeft  = scrollLeft > 4;
    this.ctaFadeRight = maxScroll > 4 && scrollLeft < maxScroll - 4;
  }

  selectCategory(index: number): void {
    this.activeCategory = index;
  }

  /**
   * Склонение слова «услуга» по количеству.
   * 1 услуга, 2 услуги, 5 услуг
   */
  getServiceLabel(count: number): string {
    const mod10  = count % 10;
    const mod100 = count % 100;

    if (mod100 >= 11 && mod100 <= 19) {
      return `${count} услуг`;
    }
    if (mod10 === 1) {
      return `${count} услуга`;
    }
    if (mod10 >= 2 && mod10 <= 4) {
      return `${count} услуги`;
    }
    return `${count} услуг`;
  }

  openCallbackForm(): void {
    this.modalService.open('callback-modal', { purpose: 'callback' });
  }

  openDiagnosticForm(): void {
    this.modalService.open('callback-modal', { purpose: 'diagnostic' });
  }

  scrollToWarranty(): void {
    this.scrollService.scrollToId('warranty');
  }
}