import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { HeroSection } from '../../shared/components/hero-section/hero-section';
import { CategoriesGrid, CategoryItem, SidebarStat } from '../../shared/components/categories-grid/categories-grid';
import { ProcessAccordion, ProcessStep } from '../../shared/components/process-accordion/process-accordion';
import { PageProgressNavComponent } from '../../shared/components/page-progress-nav/page-progress-nav';
import { ReviewsSection } from '../../shared/components/reviews-section/reviews-section';
import { FaqSection, FaqItem } from '../../shared/components/faq-section/faq-section';
import { MastersTeam } from '../../shared/components/masters-team/masters-team';

@Component({
  selector: 'app-remont-bytovoy-tekhniki',
  imports: [CommonModule, HeroSection, CategoriesGrid, ProcessAccordion, PageProgressNavComponent, ReviewsSection, FaqSection, MastersTeam],
  templateUrl: './remont-bytovoy-tekhniki.html',
  styleUrl: './remont-bytovoy-tekhniki.scss'
})
export class RemontBytovoyTekhniki implements OnInit {

  heroFeatures = [
    'Ремонт в день обращения',
    'Гарантия до 90 дней',
    'Оригинальные запчасти',
    'Выезд мастера на дом',
    'Бесплатная диагностика'
  ];

  categoryStats: SidebarStat[] = [
    { number: '7+', label: 'Видов техники' },
    { number: '40+', label: 'Видов работ' }
  ];

  categories: CategoryItem[] = [
    {
      name: 'Стиральные машины',
      description: 'Ремонт стиральных и сушильных машин всех марок',
      icon: 'M6 4H22V20H6V4Z M10 8H18V10H10V8Z M14 14C14 15.1 13.1 16 12 16C10.9 16 10 15.1 10 14C10 12.9 10.9 12 12 12C13.1 12 14 12.9 14 14Z',
      image: '/assets/img/technique/appliances/stiralnye-mashiny.png',
      features: ['Замена подшипников и ТЭНа', 'Ремонт двигателя', 'Замена помпы', 'Ремонт модуля управления'],
      priceFrom: '1 500 ₽',
      link: '/remont-bytovoy-tekhniki/stiralnye-mashiny'
    },
    {
      name: 'Холодильники',
      description: 'Ремонт холодильников и морозильных камер',
      icon: 'M8 3H16V21H8V3Z M8 10H16 M10 6H10.01 M10 14H10.01',
      image: '/assets/img/technique/appliances/kholodilniki.png',
      features: ['Замена компрессора', 'Заправка фреоном', 'Ремонт электроники', 'Устранение утечек'],
      priceFrom: '1 500 ₽',
      link: '/remont-bytovoy-tekhniki/kholodilniki'
    },
    {
      name: 'Посудомоечные машины',
      description: 'Ремонт посудомоечных машин любых брендов',
      icon: 'M4 6H20V18H4V6Z M8 10H16 M8 14H12',
      image: '/assets/img/technique/appliances/posudomoechnye-mashiny.png',
      features: ['Замена помпы', 'Ремонт нагревательного элемента', 'Устранение протечек', 'Ремонт электронного блока'],
      priceFrom: '1 500 ₽',
      link: '/remont-bytovoy-tekhniki/posudomoechnye-mashiny'
    },
    {
      name: 'Кофемашины',
      description: 'Ремонт автоматических и рожковых кофемашин',
      icon: 'M20 20H4V16H20V20Z M6 10H18V14H6V10Z M8 4H16V8H8V4Z',
      image: '/assets/img/technique/appliances/kofemashiny.png',
      features: ['Ремонт заварочного блока', 'Чистка и декальцинация', 'Замена помпы', 'Ремонт кофемолки'],
      priceFrom: '2 000 ₽',
      link: '/remont-bytovoy-tekhniki/kofemashiny'
    },
    {
      name: 'Пылесосы',
      description: 'Ремонт вертикальных, традиционных и роботов-пылесосов',
      icon: 'M8 4H20V12H8V4Z M6 12H22V16H6V12Z M10 16H18V20H10V16Z',
      image: '/assets/img/technique/appliances/pylesosy.png',
      features: ['Замена аккумулятора', 'Ремонт двигателя', 'Чистка фильтров', 'Ремонт щёток'],
      priceFrom: '1 000 ₽',
      link: '/remont-bytovoy-tekhniki/pylesosy'
    },
    {
      name: 'Микроволновые печи',
      description: 'Ремонт микроволновок всех производителей',
      icon: 'M4 6H22V18H4V6Z M18 10V14 M15 12H21',
      image: '/assets/img/technique/appliances/mikrovolnovye-pechi.png',
      features: ['Замена магнетрона', 'Ремонт блока питания', 'Замена тарелки привода', 'Ремонт дверцы'],
      priceFrom: '1 000 ₽',
      link: '/remont-bytovoy-tekhniki/mikrovolnovye-pechi'
    },
    {
      name: 'Утюги и парогенераторы',
      description: 'Ремонт утюгов и паровых станций',
      icon: 'M4 14H20V18H4V14Z M6 10H18V14H6V10Z M10 6H14V10H10V6Z',
      image: '/assets/img/technique/appliances/utyugi-i-parogeneratory.png',
      features: ['Замена нагревательного элемента', 'Чистка от накипи', 'Ремонт парогенератора', 'Замена шнура'],
      priceFrom: '800 ₽',
      link: '/remont-bytovoy-tekhniki/utyugi-i-parogeneratory'
    }
  ];

  processStats: SidebarStat[] = [
    { number: '5', label: 'этапов работы' },
    { number: 'до 90 дней', label: 'гарантия' }
  ];

  processSteps: ProcessStep[] = [
    {
      title: 'Заявка и диагностика',
      subtitle: 'Быстрый старт — без лишних слов',
      description: 'Оставьте заявку по телефону или онлайн. Мастер приедет к вам домой или вы можете привезти технику в сервис. Проводим бесплатную диагностику и называем точную стоимость.',
      features: ['Бесплатная диагностика', 'Выезд мастера на дом', 'Фиксируем состояние при приёме'],
      duration: '10–30 минут'
    },
    {
      title: 'Согласование стоимости',
      subtitle: 'Никаких скрытых платежей',
      description: 'Сообщаем причину поломки, точную стоимость запчастей и работ. Приступаем только после вашего согласия.',
      features: ['Озвучиваем полную стоимость', 'Ремонт только с вашего согласия', 'Оригинальные запчасти по честным ценам'],
      duration: 'по договорённости'
    },
    {
      title: 'Ремонт',
      subtitle: 'Профессиональный подход',
      description: 'Мастер устраняет неисправность: заменяет детали, восстанавливает электронику, проводит необходимую чистку и наладку.',
      features: ['Срочный ремонт: от 30 минут', 'Сложный ремонт: до 2 дней', 'Только оригинальные или совместимые запчасти'],
      duration: 'от 30 минут до 2 дней'
    },
    {
      title: 'Тестирование',
      subtitle: 'Проверяем — вы принимаете',
      description: 'Перед выдачей техника проходит полное тестирование в рабочем режиме. Вы лично убеждаетесь, что всё работает.',
      features: ['Тестирование при клиенте', 'Проверка всех режимов работы', 'Финальный осмотр'],
      duration: '15–30 минут'
    },
    {
      title: 'Выдача с гарантией',
      subtitle: 'Уходите с уверенностью',
      description: 'Получаете отремонтированную технику, акт выполненных работ и гарантийный талон сроком до 90 дней.',
      features: ['Акт выполненных работ', 'Гарантия до 90 дней', 'Консультация по эксплуатации'],
      duration: '10 минут'
    }
  ];

  faqItems: FaqItem[] = [
    { question: 'Сколько стоит диагностика бытовой техники?', answer: 'Диагностика бесплатна при последующем ремонте. Если вы решите не ремонтировать — диагно��тика стоит от 500 ₽ в зависимости от вида техники.' },
    { question: 'Мастер приедет на дом или нужно привезти технику?', answer: 'Крупная техника (стиральные машины, холодильники, посудомойки) ремонтируется на дому. Малую технику (кофемашины, пылес��сы, утюги) удобнее привезти в сервис — ремонт занимает 30–60 минут, можно подождать.' },
    { question: 'Сколько времени занимает ремонт?', answer: 'Большинство ремонтов крупной техники — 1–2 часа на дому. Малая техника — 30–60 минут в сервисе. Сложные случаи (замена компрессора, ремонт электроники) — до 2 дней.' },
    { question: 'Даёте ли вы гарантию на ремонт?', answer: 'Да, гарантия до 90 дней на все виды работ и запчасти. При гарантийном случае — бесплатный повторный выезд и устранение неисправности.' },
    { question: 'Используете ли оригинальные запчасти?', answer: 'Да, используем оригинальные или сертифицированные аналоги. Для Dreame и Polaris — только оригинальные запчасти как авторизованный сервисный центр.' },
    { question: 'Что если не смогли починить технику?', answer: 'Если ремонт технически невозможен или нецелесообразен — честно скажем об этом. Плату за диаг��остику в таких случаях не берём.' }
  ];

  constructor(
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 0]);

    this.title.setTitle('Ремонт бытовой техники в Ростове-на-Дону — Optima Сервис');
    this.meta.updateTag({
      name: 'description',
      content: 'Профессиональный ремонт бытовой техники в Ростове-на-Дону. Стиральные машины, холодильники, посудомоечные машины. Гарантия до 90 дней. Сервисный центр Optima.'
    });
  }
}
