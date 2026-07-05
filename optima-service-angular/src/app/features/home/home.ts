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
    PageProgressNavComponent
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
      features: ['Замена дисплея и стекла', 'Замена аккумулятора', 'Ремонт после залития', 'Ремонт разъемов зарядки'],
      priceFrom: '1 000 ₽'
    },
    {
      name: 'Планшеты',
      description: 'Ремонт планшетов iPad, Galaxy Tab и других брендов',
      icon: 'M6 4H22V20H6V4Z M10 8H18V10H10V8Z M10 12H18V14H10V12Z',
      features: ['Замена экрана', 'Замена аккумулятора', 'Ремонт корпуса', 'Восстановление после залития'],
      priceFrom: '1 500 ₽'
    },
    {
      name: 'Ноутбуки',
      description: 'Ремонт ноутбуков всех моделей и марок',
      icon: 'M6 6H22V18H2V8H6V6Z M8 14H20 M12 18H16',
      features: ['Замена матрицы', 'Ремонт видеокарты', 'Чистка системы охлаждения', 'Замена клавиатуры'],
      priceFrom: '1 500 ₽'
    },
    {
      name: 'Телевизоры',
      description: 'Ремонт телевизоров LED, OLED, QLED любых марок',
      icon: 'M4 6H24V16H4V6Z M10 18H18',
      features: ['Замена подсветки', 'Ремонт матрицы', 'Ремонт блока питания'],
      priceFrom: '2 000 ₽'
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
      name: 'Пылесосы',
      description: 'Ремонт пылесосов, вертикальных и роботов-пылесосов',
      icon: 'M8 4H20V12H8V4Z M6 12H22V16H6V12Z M10 16H18V20H10V16Z',
      features: ['Замена аккумулятора', 'Ремонт двигателя', 'Чистка и обслуживание'],
      priceFrom: '1 500 ₽',
      link: '/remont-bytovoy-tekhniki/pylesosy'
    },
    {
      name: 'Холодильники',
      description: 'Ремонт холодильников и морозильных камер любых марок',
      icon: 'M8 3H16V21H8V3Z M8 10H16 M10 6H10.01 M10 14H10.01',
      features: ['Замена компрессора', 'Заправка фреоном', 'Ремонт электроники'],
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
