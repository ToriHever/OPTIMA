import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { NavigationService } from '../../core/services/navigation.service';
import { ScrollService } from '../../core/services/scroll.service';
import { HeroSection } from '../../shared/components/hero-section/hero-section';
import { CategoriesGrid, CategoryItem, SidebarStat } from '../../shared/components/categories-grid/categories-grid';
import { ProcessAccordion, ProcessStep } from '../../shared/components/process-accordion/process-accordion';
import { BrandsCarousel } from '../../shared/components/brands-carousel/brands-carousel';
import { ServicesTable } from '../../shared/components/services-table/services-table';
import { Warranty } from '../../shared/components/warranty/warranty';
import { ReviewsSection } from '../../shared/components/reviews-section/reviews-section';
import { Certificates } from '../../shared/components/certificates/certificates';
import { PageProgressNavComponent } from '../../shared/components/page-progress-nav/page-progress-nav';
import { FaqSection, FaqItem } from '../../shared/components/faq-section/faq-section';
import { ServiceSections } from '../../shared/components/service-sections/service-sections';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSection,
    BrandsCarousel,
    CategoriesGrid,
    ServicesTable,
    ProcessAccordion,
    Warranty,
    ReviewsSection,
    Certificates,
    PageProgressNavComponent,
    FaqSection,
    ServiceSections
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  heroFeatures = [
    'Гарантия до 90 дней',
    'Выезд мастера в течение 2 часов',
    'Оригинальные запчасти',
    'Авторизация DREAME',
    'Авторизация POLARIS'
  ];

  categoryStats: SidebarStat[] = [
    { number: '9+', label: 'Категорий техники' },
    { number: '50+', label: 'Видов работ' }
  ];

  categories: CategoryItem[] = [
    {
      name: 'Смартфоны',
      description: 'Ремонт смартфонов iPhone и Android любых моделей',
      icon: 'M12 2C10 2 8 4 8 6V18C8 20 10 22 12 22H16C18 22 20 20 20 18V6C20 4 18 2 16 2H12Z M14 18H14.01',
      features: ['Замена дисплея и стекла', 'Замена аккумулятора', 'Ремонт после залития', 'Ремонт разъёма зарядки'],
      priceFrom: '800 ₽',
      link: '/remont-kompyuterov/smartfony'
    },
    {
      name: 'Ноутбуки',
      description: 'Ремонт ноутбуков всех моделей и марок',
      icon: 'M6 6H22V18H2V8H6V6Z M8 14H20 M12 18H16',
      features: ['Замена матрицы', 'Чистка от пыли', 'Ремонт материнской платы', 'Замена клавиатуры'],
      priceFrom: '1 200 ₽',
      link: '/remont-kompyuterov/noutbuki'
    },
    {
      name: 'Планшеты',
      description: 'Ремонт планшетов iPad, Galaxy Tab и других брендов',
      icon: 'M6 4H22V20H6V4Z M10 8H18V10H10V8Z M10 12H18V14H10V12Z',
      features: ['Замена экрана', 'Замена аккумулятора', 'Ремонт разъёма', 'Восстановление после залития'],
      priceFrom: '1 500 ₽',
      link: '/remont-kompyuterov/planshety'
    },
    {
      name: 'Телевизоры',
      description: 'Ремонт телевизоров LED, OLED, QLED любых марок',
      icon: 'M4 6H24V16H4V6Z M10 18H18',
      features: ['Замена подсветки', 'Ремонт матрицы', 'Ремонт блока питания', 'Выезд мастера'],
      priceFrom: '2 000 ₽',
      link: '/remont-audiovideo/televizory'
    },
    {
      name: 'Игровые консоли',
      description: 'Ремонт PlayStation, Xbox, Nintendo Switch',
      icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
      features: ['Ремонт HDMI и привода', 'Устранение перегрева', 'Drift джойстика', 'PS4/PS5, Xbox, Switch'],
      priceFrom: '1 500 ₽',
      link: '/remont-audiovideo/igrovye-konsoli'
    },
    {
      name: 'Кофемашины',
      description: 'Ремонт автоматических и рожковых кофемашин',
      icon: 'M20 20H4V16H20V20Z M6 10H18V14H6V10Z M8 4H16V8H8V4Z',
      features: ['Ремонт заварочного блока', 'Чистка и декальцинация', 'Замена помпы', 'Ремонт кофемолки'],
      priceFrom: '2 000 ₽',
      link: '/remont-bytovoy-tekhniki/kofemashiny'
    },
    {
      name: 'Стиральные машины',
      description: 'Ремонт стиральных и сушильных машин',
      icon: 'M6 4H22V20H6V4Z M10 8H18V10H10V8Z M14 14C14 15.1 13.1 16 12 16C10.9 16 10 15.1 10 14C10 12.9 10.9 12 12 12C13.1 12 14 12.9 14 14Z',
      features: ['Замена подшипников', 'Ремонт двигателя', 'Замена ТЭНа', 'Ремонт модуля управления'],
      priceFrom: '2 000 ₽',
      link: '/remont-bytovoy-tekhniki/stiralnye-mashiny'
    },
    {
      name: 'Холодильники',
      description: 'Ремонт холодильников и морозильных камер любых марок',
      icon: 'M8 3H16V21H8V3Z M8 10H16 M10 6H10.01 M10 14H10.01',
      features: ['Замена компрессора', 'Заправка фреоном', 'Ремонт электроники', 'Выезд мастера'],
      priceFrom: '1 500 ₽',
      link: '/remont-bytovoy-tekhniki/kholodilniki'
    }
  ];

  processStats: SidebarStat[] = [
    { number: '6', label: 'этапов работы' },
    { number: 'до 90 дней', label: 'гарантия' }
  ];

  processSteps: ProcessStep[] = [
    {
      title: 'Прием устройства / Выезд мастера',
      subtitle: 'Начало работы с вашей техникой',
      description: 'Клиент оставляет заявку по телефону, онлайн или лично. Сотрудник СЦ принимает устройство или мастер прибывает на место, проводит первичный осмотр, фиксирует внешний вид и комплектацию.',
      features: ['Рекомендуем сдавать устройство в чистом виде', 'Фиксируем внешний вид при приеме', 'Выдаем акт приема'],
      duration: '10-15 минут'
    },
    {
      title: 'Диагностика',
      subtitle: 'Точное определение неисправности',
      description: 'Проводится внешний осмотр и проверка программных и аппаратных компонентов. Определяется точная причина поломки, необходимый объем работ и стоимость ремонта.',
      features: ['На месте: 10–15 минут для простых случаев', 'В СЦ: от 1 до 48 часов', 'Рассчитываем точную стоимость'],
      duration: 'от 15 минут до 48 часов'
    },
    {
      title: 'Согласование',
      subtitle: 'Прозрачность и ваше одобрение',
      description: 'СЦ связывается с клиентом и сообщает результаты диагностики, точную стоимость и сроки. Работы начинаются только после получения согласия.',
      features: ['Сообщаем результаты диагностики', 'Называем точную стоимость', 'Ремонт только после вашего согласия'],
      duration: 'по договоренности'
    },
    {
      title: 'Ремонт',
      subtitle: 'Качественное восстановление техники',
      description: 'Мастер проводит необходимые работы: замену неисправных деталей, ремонт электронных компонентов, восстановление программного обеспечения.',
      features: ['Срочный ремонт: от 15 минут', 'Обычный ремонт: от 1 до 48 часов', 'Гарантийный ремонт: до 45 дней'],
      duration: 'от 15 минут до 48 часов'
    },
    {
      title: 'Тестирование',
      subtitle: 'Финальная проверка качества',
      description: 'Отремонтированное устройство проходит финальное тестирование. Клиент уведомляется о готовности.',
      features: ['Полное тестирование всех функций', 'Проверка устранения неисправности', 'Уведомление о готовности'],
      duration: 'от 30 минут'
    },
    {
      title: 'Выдача и оплата',
      subtitle: 'Завершающий этап',
      description: 'Клиент проверяет устройство, оплачивает ремонт и получает акт выполненных работ и гарантийный талон.',
      features: ['Проверка устройства при получении', 'Акт выполненных работ', 'Гарантия до 90 дней'],
      duration: '10-20 минут'
    }
  ];

  faqItems: FaqItem[] = [
    { question: 'Сколько стоит диагностика?', answer: 'Диагностика бесплатна при последующем ремонте. Если решите не ремонтировать — от 500 ₽ в зависимости от вида техники.' },
    { question: 'Делаете ли выезд мастера на дом?', answer: 'Да. Крупная техника (стиральные машины, холодильники) ремонтируется на дому. Ма��ую технику (смартфоны, ноутбуки, кофемашины) удобнее ��ринести в серви�� — большинство ремонтов занимает 30–90 минут.' },
    { question: 'Как долго ждать ремонта?', answer: 'Большинство ремонтов выполняется в день обращения. Сложные случаи или ремонты под заказ редкой запч��сти — до 2 дней. Срочный ремонт смартфонов — от 15 минут.' },
    { question: 'Есть ли ��арантия на ремонт?', answer: 'Да, гарантия до 90 дней на все виды работ и запчасти. При гарантийном обращении — бесплатный повторный ремонт.' },
    { question: 'Нужна ли запись или можно прийти сразу?', answer: 'Можно прийти без записи в рабочие часы. Запись позволяет выбрать удобное время и гарантирует, что мастер будет ждать именно вас.' },
    { question: 'Как узнать статус ремонта?', answer: 'Позвоните по номеру 8 (988) 516-31-31 или воспользуйтесь кнопкой «С��атус ремонта» на сайте — введите номер квитанции и получите актуальный статус.' }
  ];

  constructor(
    private navigationService: NavigationService,
    private scrollService: ScrollService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    const pendingId = this.navigationService.getPendingScroll();
    if (pendingId) {
      this.navigationService.clearPendingScroll();
      setTimeout(() => { this.scrollService.scrollToId(pendingId); }, 400);
    }

    this.title.setTitle('Ремонт техники в центре — Optima');
    this.meta.updateTag({
      name: 'description',
      content: 'Сервисный центр в городе Ростов-на-Дону. Ремонт телефонов, ноутбуков, бытовой техники. Адрес: Ларина 18 Кировский район (Центр)'
    });
  }
}
