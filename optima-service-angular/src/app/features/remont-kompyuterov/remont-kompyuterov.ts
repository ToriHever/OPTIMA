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
import { MastersTeam } from '../../shared/components/masters-team/masters-team';

@Component({
  selector: 'app-remont-kompyuterov',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSection, CategoriesGrid, ProcessAccordion, PageProgressNavComponent, ReviewsSection, FaqSection, MastersTeam],
  templateUrl: './remont-kompyuterov.html',
  styleUrl: './remont-kompyuterov.scss'
})
export class RemontKompyuterov implements OnInit {

  heroFeatures = [
    'Ремонт в день обращения',
    'Гарантия до 90 дней',
    'Оригинальные запчасти',
    'Выезд мастера на дом',
    'Бесплатная диагностика'
  ];

  categoryStats: SidebarStat[] = [
    { number: '7', label: 'Видов техники' },
    { number: '30+', label: 'Видов работ' }
  ];

  categories: CategoryItem[] = [
    {
      name: 'Ноутбуки',
      description: 'Ремонт ноутбуков всех марок и моделей',
      icon: 'M6 6H22V18H2V8H6V6Z M8 14H20 M12 18H16',
      features: ['Замена матрицы', 'Замена клавиатуры', 'Чистка от пыли', 'Ремонт материнской платы'],
      priceFrom: '1 200 ₽',
      link: '/remont-kompyuterov/noutbuki'
    },
    {
      name: 'Смартфоны',
      description: 'Ремонт смартфонов iPhone и Android любых моделей',
      icon: 'M12 2C10 2 8 4 8 6V18C8 20 10 22 12 22H16C18 22 20 20 20 18V6C20 4 18 2 16 2H12Z M14 18H14.01',
      features: ['Замена дисплея', 'Замена аккумулятора', 'Ремонт после залития', 'Замена разъёма'],
      priceFrom: '800 ₽',
      link: '/remont-kompyuterov/smartfony'
    },
    {
      name: 'Планшеты',
      description: 'Ремонт планшетов iPad, Samsung, Huawei и других',
      icon: 'M6 4H22V20H6V4Z M10 8H18V10H10V8Z M10 12H18V14H10V12Z',
      features: ['Замена дисплея', 'Замена аккумулятора', 'Ремонт разъёма', 'Ремонт корпуса'],
      priceFrom: '1 500 ₽',
      link: '/remont-kompyuterov/planshety'
    },
    {
      name: 'Компьютеры и ПК',
      description: 'Диагностика и ремонт настольных компьютеров',
      icon: 'M4 4H20V20H4V4Z M8 8H16 M8 12H16 M8 16H12',
      features: ['Замена комплектующих', 'Сборка ПК', 'Чистка системы охлаждения', 'Замена SSD/HDD'],
      priceFrom: '1 000 ₽',
      link: '/remont-kompyuterov/pk-i-komputery'
    },
    {
      name: 'Мониторы',
      description: 'Ремонт мониторов всех марок и типов',
      icon: 'M6 6H22V18H2V8H6V6Z M8 20H20 M14 18V20',
      features: ['Замена подсветки', 'Замена матрицы', 'Ремонт блока питания', 'Ремонт разъёмов'],
      priceFrom: '1 500 ₽',
      link: '/remont-kompyuterov/monitory'
    },
    {
      name: 'Принтеры и МФУ',
      description: 'Ремонт принтеров, МФУ и плоттеров',
      icon: 'M6 9v3h12V9M6 18h12M9 3h6v6H9z',
      features: ['Заправка картриджей', 'Замена головки', 'Устранение замятий', 'Прошивка'],
      priceFrom: '500 ₽',
      link: '/remont-kompyuterov/printeryi-i-mfu'
    },
    {
      name: 'Умные часы',
      description: 'Ремонт смарт-часов Apple Watch, Samsung, Garmin',
      icon: 'M9 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2h-2M9 3v3h6V3M9 3a2 2 0 012-2h2a2 2 0 012 2',
      features: ['Замена дисплея', 'Замена аккумулятора', 'Ремонт кейса AirPods', 'Ремонт зарядки'],
      priceFrom: '1 200 ₽',
      link: '/remont-kompyuterov/umnye-chasy'
    }
  ];

  processStats: SidebarStat[] = [
    { number: '4', label: 'этапа работы' },
    { number: 'до 90 дней', label: 'гарантия' }
  ];

  processSteps: ProcessStep[] = [
    {
      title: 'Заявка и диагностика',
      subtitle: 'Быстрый старт',
      description: 'Оставьте заявку по телефону или онлайн. Привезите устройство в сервис или закажите выезд мастера. Проводим бесплатную диагностику.',
      features: ['Бесплатная диагностика при ремонте', 'Выезд мастера для крупной техники', 'Фиксируем состояние при приёме'],
      duration: '10–30 минут'
    },
    {
      title: 'Согласование стоимости',
      subtitle: 'Никаких скрытых платежей',
      description: 'Сообщаем причину поломки, точную стоимость запчастей и работ. Приступаем только после вашего согласия.',
      features: ['Озвучиваем полную стоимость', 'Ремонт только с вашего согласия', 'Оригинальные запчасти'],
      duration: 'по договорённости'
    },
    {
      title: 'Ремонт',
      subtitle: 'Профессиональный подход',
      description: 'Мастер устраняет неисправность: заменяет детали, чинит плату, проводит чистку и настройку.',
      features: ['Большинство ремонтов — в день обращения', 'Сложные случаи — до 2 дней', 'Оригинальные и совместимые запчасти'],
      duration: 'от 30 минут до 2 дней'
    },
    {
      title: 'Выдача с гарантией',
      subtitle: 'Уходите с уверенностью',
      description: 'Тестируем устройство при клиенте, выдаём акт выполненных работ и гарантийный талон сроком до 90 дней.',
      features: ['Тестирование при клиенте', 'Акт выполненных работ', 'Гарантия до 90 дней'],
      duration: '10–15 минут'
    }
  ];

  faqItems: FaqItem[] = [
    { question: 'Сколько стоит диагностика компьютерной техники?', answer: 'Диагностика бесплатна при последующем ремонте. Если решите не ремонтировать — от 500 ₽.' },
    { question: 'Выезжает ли мастер на дом?', answer: 'Да, выезжаем по Ростову-на-Дону для ремонта компьютеров, мониторов и принтеров. Ноутбуки, смартфоны и планшеты удобнее принести в сервис.' },
    { question: 'Сколько занимает ремонт ноутбука?', answer: 'Большинство ремонтов — в день обращения: замена клавиатуры, аккумулятора, чистка. Ремонт материнской платы — 1–3 дня при наличии запчастей.' },
    { question: 'Занимаетесь ли ремонтом MacBook?', answer: 'Да, ремонтируем MacBook Air и Pro всех поколений. Замена дисплея Retina, аккумулятора, клавиатуры, ремонт Logic Board.' },
    { question: 'Перенесёте ли данные при замене SSD?', answer: 'Да, переносим данные и операционную систему на новый накопитель без переустановки и потери данных.' },
    { question: 'Какая гарантия на ремонт?', answer: 'Гарантия до 90 дней на все выполненные работы и запчасти. При гарантийном обращении — бесплатный повторный ремонт.' }
  ];

  constructor(
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 0]);
    this.title.setTitle('Ремонт компьютеров и гаджетов в Ростове-на-Дону — Optima Сервис');
    this.meta.updateTag({
      name: 'description',
      content: 'Ремонт ноутбуков, смартфонов, планшетов, компьютеров, мониторов в Ростове-на-Дону. Диагностика бесплатно, гарантия до 90 дней. Сервисный центр Optima.'
    });
  }
}
