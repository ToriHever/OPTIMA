import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HeroSection } from '../../shared/components/hero-section/hero-section';
import { CategoriesGrid, CategoryItem, SidebarStat } from '../../shared/components/categories-grid/categories-grid';
import { ProcessAccordion, ProcessStep } from '../../shared/components/process-accordion/process-accordion';
import { PageProgressNavComponent } from '../../shared/components/page-progress-nav/page-progress-nav';
import { ReviewsSection } from '../../shared/components/reviews-section/reviews-section';
import { FaqSection, FaqItem } from '../../shared/components/faq-section/faq-section';

@Component({
  selector: 'app-remont-audiovideo',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSection, CategoriesGrid, ProcessAccordion, PageProgressNavComponent, ReviewsSection, FaqSection],
  templateUrl: './remont-audiovideo.html',
  styleUrl: './remont-audiovideo.scss'
})
export class RemontAudiovideo implements OnInit {

  heroFeatures = [
    'Ремонт в день обращения',
    'Гарантия до 90 дней',
    'Выезд мастера для телевизоров',
    'Оригинальные запчасти',
    'Бесплатная диагностика'
  ];

  categoryStats: SidebarStat[] = [
    { number: '5', label: 'Видов техники' },
    { number: '25+', label: 'Видов работ' }
  ];

  categories: CategoryItem[] = [
    {
      name: 'Телевизоры',
      description: 'Ремонт LED, OLED, QLED и плазменных телевизоров',
      icon: 'M4 6H24V16H4V6Z M10 18H18',
      features: ['Замена подсветки', 'Ремонт матрицы', 'Ремонт блока питания', 'Выезд мастера'],
      priceFrom: '2 000 ₽',
      link: '/remont-audiovideo/televizory'
    },
    {
      name: 'Акустические системы',
      description: 'Ремонт колонок и домашних кинотеатров',
      icon: 'M15.536 8.464a5 5 0 010 7.072M12 6a7 7 0 010 12M6 9v6',
      features: ['Замена динамика', 'Ремонт усилителя', 'Замена аккумулятора', 'Ремонт Bluetooth'],
      priceFrom: '1 000 ₽',
      link: '/remont-audiovideo/akusticheskie-sistemy'
    },
    {
      name: 'Наушники',
      description: 'Ремонт наушников Sony, Bose, Apple AirPods',
      icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z',
      features: ['Замена динамика', 'Замена аккумулятора', 'Ремонт ANC', 'Ремонт кейса AirPods'],
      priceFrom: '800 ₽',
      link: '/remont-audiovideo/naushniki'
    },
    {
      name: 'Игровые консоли',
      description: 'Ремонт PlayStation, Xbox, Nintendo Switch',
      icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
      features: ['Ремонт HDMI и привода', 'Устранение перегрева', 'Drift джойстика', 'Восстановление ПО'],
      priceFrom: '1 500 ₽',
      link: '/remont-audiovideo/igrovye-konsoli'
    },
    {
      name: 'Проекторы',
      description: 'Ремонт мультимедийных и домашних проекторов',
      icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
      features: ['Замена лампы', 'Ремонт блока питания', 'Чистка оптики', 'Ремонт разъёмов'],
      priceFrom: '1 500 ₽',
      link: '/remont-audiovideo/proektory'
    }
  ];

  processStats: SidebarStat[] = [
    { number: '4', label: 'этапа работы' },
    { number: 'до 90 дней', label: 'гарантия' }
  ];

  processSteps: ProcessStep[] = [
    {
      title: 'Заявка и диагностика',
      subtitle: 'Удобно для вас',
      description: 'Для телевизоров — вызов мастера на дом. Для наушников, колонок, консолей — приносите в сервис. Диагностика бесплатна при ремонте.',
      features: ['Выезд мастера для телевизоров', 'Приём в сервисе', 'Бесплатная диагностика'],
      duration: '10–30 минут'
    },
    {
      title: 'Согласование',
      subtitle: 'Прозрачные цены',
      description: 'Называем точную стоимость и сроки. Приступаем только после вашего согласия.',
      features: ['Полная стоимость без скрытых платежей', 'Ремонт только с вашего согласия', 'Оригинальные запчасти'],
      duration: 'по договорённости'
    },
    {
      title: 'Ремонт',
      subtitle: 'Качественно и в срок',
      description: 'Большинство ремонтов — в день обращения. Сложные случаи — до 2 дней.',
      features: ['Ремонт в день обращения', 'Профессиональные инструменты', 'Оригинальные и совместимые запчасти'],
      duration: 'от 30 минут до 2 дней'
    },
    {
      title: 'Выдача с гарантией',
      subtitle: 'С документами',
      description: 'Тестируем при вас, выдаём акт выполненных работ и гарантийный талон до 90 дней.',
      features: ['Тестирование при клиенте', 'Акт и гарантийный талон', 'Гарантия до 90 дней'],
      duration: '10–15 минут'
    }
  ];

  faqItems: FaqItem[] = [
    { question: 'Выезжает ли мастер для ремонта телевизора?', answer: 'Да, выезжаем по Ростову-на-Дону. Большинство типовых ремонтов (замена подсветки, блок питания) делаем на месте за 1–2 часа.' },
    { question: 'Сколько стоит замена подсветки телевизора?', answer: 'В зависимости от диагонали и марки: от 2 500 ₽ за 32" до 6 000–8 000 ₽ за 65"+. Значительно дешевле нового телевизора.' },
    { question: 'Ремонтируете ли JBL и Sony колонки?', answer: 'Да, работаем с JBL Charge, Flip, Boombox, Xtreme, Sony SRS-серии. Замена аккумулятора, ремонт динамика и зарядки.' },
    { question: 'Joy-Con Nintendo Switch дрифтит — можно починить?', answer: 'Да, это одна из частых жалоб. Заменяем модуль стика за 30–60 минут. Гарантия 90 дней.' },
    { question: 'Занимаетесь ли ремонтом AirPods?', answer: 'Да, ремонтируем AirPods Pro 1/2, AirPods 2/3 и AirPods Max. Замена аккумулятора, ремонт кейса, восстановление ANC.' },
    { question: 'Какая гарантия на ремонт?', answer: 'Гарантия до 90 дней на все выполненные работы и установленные запчасти.' }
  ];

  constructor(
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 0]);
    this.title.setTitle('Ремонт аудио и видео техники в Ростове-на-Дону — Optima Сервис');
    this.meta.updateTag({
      name: 'description',
      content: 'Ремонт телевизоров, акустики, наушников, игровых консолей и проекторов в Ростове-на-Дону. Диагностика бесплатно, выезд мастера, гарантия до 90 дней. Optima Сервис.'
    });
  }
}
