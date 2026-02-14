import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ModalService } from '../../../../core/services/modal.service';

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
      name: 'Стиральные машины',
      description: 'Профессиональный ремонт стиральных машин на дому',
      icon: 'M12 8H52V56H12V8Z M32 24A12 12 0 1032 48A12 12 0 1032 24Z M20 14H28V16H20V14Z M36 14H44V16H36V14Z',
      features: [
        'Замена подшипников',
        'Ремонт модуля',
        'Замена ТЭНа'
      ],
      priceFrom: '1 200 ₽'
    },
    {
      name: 'Посудомоечные машины',
      description: 'Ремонт посудомоек всех типов и производителей',
      icon: 'M10 12H54V52H10V12Z M14 18H22V22H14V18Z M26 18H34V22H26V18Z M38 18H46V22H38V18Z M14 28H50V48H14V28Z',
      features: [
        'Замена насосов',
        'Чистка фильтров',
        'Ремонт системы Aquastop'
      ],
      priceFrom: '1 500 ₽'
    },
    {
      name: 'Варочные панели',
      description: 'Ремонт индукционных, электрических и газовых панелей',
      icon: 'M8 16H56V48H8V16Z M20 24A6 6 0 1020 36A6 6 0 1020 24Z M44 24A6 6 0 1044 36A6 6 0 1044 24Z',
      features: [
        'Замена конфорок',
        'Ремонт сенсора',
        'Замена блока управления'
      ],
      priceFrom: '1 500 ₽'
    },
    {
      name: 'Духовые шкафы',
      description: 'Все виды ремонта духовок и встраиваемой техники',
      icon: 'M12 8H52V56H12V8Z M16 16H48V48H16V16Z M20 10H28V12H20V10Z M36 10H44V12H36V10Z',
      features: [
        'Замена ТЭНа',
        'Ремонт конвекции',
        'Замена стекла'
      ],
      priceFrom: '1 800 ₽'
    },
    {
      name: 'Кофемашины',
      description: 'Ремонт и обслуживание кофемашин всех брендов',
      icon: 'M16 12H48V44H16V12Z M24 8H40V12H24V8Z M14 44H50V52H14V44Z M28 20H36V28H28V20Z',
      features: [
        'Декальцинация',
        'Замена помпы',
        'Ремонт капучинатора'
      ],
      priceFrom: '1 200 ₽'
    },
    {
      name: 'Микроволновые печи',
      description: 'Ремонт микроволновок и СВЧ-печей',
      icon: 'M10 14H54V50H10V14Z M14 20H50V44H14V20Z M14 14H18V18H14V14Z M22 14H26V18H22V14Z',
      features: [
        'Замена магнетрона',
        'Ремонт панели управления',
        'Замена слюды'
      ],
      priceFrom: '1 000 ₽'
    },
    {
      name: 'Вытяжки',
      description: 'Ремонт кухонных вытяжек любой сложности',
      icon: 'M8 8H56V24H8V8Z M12 28H20V56H12V28Z M44 28H52V56H44V28Z M16 12H48V16H16V12Z',
      features: [
        'Замена двигателя',
        'Ремонт освещения',
        'Чистка фильтров'
      ],
      priceFrom: '1 000 ₽'
    },
    {
      name: 'Водонагреватели',
      description: 'Ремонт бойлеров и водонагревателей',
      icon: 'M20 4H44V60H20V4Z M24 12H40V16H24V12Z M28 24H36V28H28V24Z',
      features: [
        'Замена ТЭНа',
        'Чистка от накипи',
        'Замена магниевого анода'
      ],
      priceFrom: '1 200 ₽'
    }
  ];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  private modalService: ModalService) {}
  
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
    if (isPlatformBrowser(this.platformId)) {
      const servicesSection = document.querySelector('#services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  
  /**
   * Открытие формы обратного звонка
   */
   openQuestionForm() {
    this.modalService.open('callback-modal', { purpose: 'question' });
  }
}