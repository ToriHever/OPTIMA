import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ModalService } from '../../../../core/services/modal.service';
import { ScrollService } from '../../../../core/services/scroll.service';

interface RepairCategory {
  name: string;
  description: string;
  icon: string;
  features: string[];
  priceFrom: string;
}

@Component({
  selector: 'app-repair-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repair-categories.html',
  styleUrl: './repair-categories.scss'
})
export class RepairCategories implements OnInit {
  isVisible = false;
  
  categories: RepairCategory[] = [
  {
    name: 'Смартфоны',
    description: 'Ремонт смартфонов iPhone и Android любых моделей',
    icon: 'M12 2C10 2 8 4 8 6V18C8 20 10 22 12 22H16C18 22 20 20 20 18V6C20 4 18 2 16 2H12Z M14 18H14.01',
    features: [
      'Замена дисплея и стекла',
      'Замена аккумулятора',
      'Ремонт после залития',
      'Ремонт разъемов зарядки'
    ],
    priceFrom: '1 000 ₽'
  },
  {
    name: 'Планшеты',
    description: 'Ремонт планшетов iPad, Galaxy Tab и других брендов',
    icon: 'M6 4H22V20H6V4Z M10 8H18V10H10V8Z M10 12H18V14H10V12Z',
    features: [
      'Замена экрана',
      'Замена аккумулятора',
      'Ремонт корпуса',
      'Восстановление после залития'
    ],
    priceFrom: '1 500 ₽'
  },
  {
    name: 'Электронные книги',
    description: 'Ремонт электронных книг E-Book любых производителей',
    icon: 'M6 4H20V20H6V4Z M10 8H16V10H10V8Z',
    features: [
      'Замена экрана',
      'Замена аккумулятора',
      'Ремонт разъемов'
    ],
    priceFrom: '1 000 ₽'
  },
  {
    name: 'Ноутбуки',
    description: 'Ремонт ноутбуков всех моделей и марок',
    icon: 'M6 6H22V18H2V8H6V6Z M8 14H20 M12 18H16',
    features: [
      'Замена матрицы',
      'Ремонт видеокарты',
      'Чистка системы охлаждения',
      'Замена клавиатуры',
      'Восстановление после залития'
    ],
    priceFrom: '1 500 ₽'
  },
  {
    name: 'Системные блоки',
    description: 'Ремонт ПК, моноблоков и компьютерной техники',
    icon: 'M6 4H22V20H6V4Z M10 8H18V10H10V8Z M10 12H18V14H10V12Z M10 16H18V18H10V16Z',
    features: [
      'Диагностика и замена комплектующих',
      'Ремонт блока питания',
      'Замена термопасты',
      'Восстановление данных'
    ],
    priceFrom: '1 000 ₽'
  },
  {
    name: 'Мониторы',
    description: 'Ремонт мониторов и дисплеев для компьютеров',
    icon: 'M6 4H22V16H2V6H6V4Z M12 20H16',
    features: [
      'Замена подсветки',
      'Ремонт матрицы',
      'Замена блока питания'
    ],
    priceFrom: '1 500 ₽'
  },
  {
    name: 'Телевизоры',
    description: 'Ремонт телевизоров LED, OLED, QLED любых марок',
    icon: 'M4 6H24V16H4V6Z M10 18H18',
    features: [
      'Замена подсветки',
      'Ремонт матрицы',
      'Ремонт блока питания'
    ],
    priceFrom: '2 000 ₽'
  },
  {
    name: 'Акустические системы',
    description: 'Ремонт колонок, саундбаров и домашних кинотеатров',
    icon: 'M8 8L16 4V20L8 16V8Z M18 10C20 12 20 16 18 18',
    features: [
      'Замена динамиков',
      'Ремонт усилителя',
      'Восстановление корпуса'
    ],
    priceFrom: '1 500 ₽'
  },
  {
    name: 'Кофемашины',
    description: 'Ремонт автоматических и рожковых кофемашин',
    icon: 'M20 20H4V16H20V20Z M6 10H18V14H6V10Z M8 4H16V8H8V4Z',
    features: [
      'Ремонт заварочного блока',
      'Чистка и декальцинация',
      'Замена помпы',
      'Ремонт кофемолки'
    ],
    priceFrom: '2 000 ₽'
  },
  {
    name: 'Стиральные машины',
    description: 'Ремонт стиральных и сушильных машин',
    icon: 'M6 4H22V20H6V4Z M10 8H18V10H10V8Z M10 14H18V16H10V14Z',
    features: [
      'Замена подшипников',
      'Ремонт двигателя',
      'Замена ТЭНа',
      'Ремонт модуля управления'
    ],
    priceFrom: '2 000 ₽'
  },
  {
    name: 'Холодильники',
    description: 'Ремонт холодильников и морозильных камер любых марок',
    icon: 'M16 8H48V56H16V8Z M20 16H44V20H20V16Z M20 28H44V32H20V28Z',
    features: [
      'Замена компрессора',
      'Заправка фреоном',
      'Ремонт электроники'
    ],
    priceFrom: '1 500 ₽'
  },
  {
    name: 'Посудомоечные машины',
    description: 'Ремонт посудомоечных машин',
    icon: 'M6 6H22V18H6V6Z M10 10H18V14H10V10Z',
    features: [
      'Замена ТЭНа',
      'Ремонт помпы',
      'Замена модуля управления'
    ],
    priceFrom: '2 000 ₽'
  },
  {
    name: 'Пылесосы',
    description: 'Ремонт пылесосов, вертикальных и роботов-пылесосов',
    icon: 'M8 4H20V12H8V4Z M6 12H22V16H6V12Z M10 16H18V20H10V16Z',
    features: [
      'Замена аккумулятора',
      'Ремонт двигателя',
      'Чистка и обслуживание'
    ],
    priceFrom: '1 500 ₽'
  },
  {
    name: 'Кухонная техника',
    description: 'Ремонт варочных панелей, духовых шкафов и СВЧ',
    icon: 'M6 4H22V12H6V4Z M8 14H20V20H8V14Z',
    features: [
      'Замена ТЭНа',
      'Ремонт электроники',
      'Замена магнетрона'
    ],
    priceFrom: '1 500 ₽'
  }
];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  private modalService: ModalService,
  private scrollService: ScrollService
) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkVisibility();
    }
  }
  
  /**
   * Проверка видимости для анимации
   */
  @HostListener('window:scroll')
  checkVisibility(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const element = document.querySelector('.categories-grid');
    if (element) {
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewport && !this.isVisible) {
        this.isVisible = true;
      }
    }
  }
  
  /**
   * Скролл к секции услуг
   */
  scrollToServices(): void {
    this.scrollService.scrollToId('services');
  }
  
  /**
   * Открытие формы обратного звонка
   */
   openQuestionForm() {
    this.modalService.open('callback-modal', { purpose: 'question' });
  }
   
  openCallbackForm() {
    this.modalService.open('callback-modal', { purpose: 'callback' });
  }
}