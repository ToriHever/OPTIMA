import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface ProcessStep {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  duration: string;
}

@Component({
  selector: 'app-work-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-process.html',
  styleUrl: './work-process.scss',
  animations: [
    trigger('slideDown', [
      state('closed', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden',
        paddingTop: '0',
        paddingBottom: '0',
        marginTop: '0',
        marginBottom: '0',
        visibility: 'hidden'
      })),
      state('open', style({
        height: '*',
        opacity: '1',
        overflow: 'visible', // После завершения анимации контент может выходить за рамки (например, тени)
        visibility: 'visible'
      })),
      transition('closed => open', [
        // В начале анимации принудительно ставим hidden, чтобы не было скачков
        style({ overflow: 'hidden', visibility: 'visible' }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)') // Cubic-bezier делает движение более "живым"
      ]),
      transition('open => closed', [
        style({ overflow: 'hidden' }),
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class WorkProcess {
  activeStep: number | null = 0;
  
  processSteps: ProcessStep[] = [
    {
      title: 'Заявка',
      subtitle: 'Свяжитесь с нами удобным способом',
      description: 'Позвоните нам, оставьте заявку на сайте или напишите в мессенджер. Наш специалист уточнит детали поломки, модель техники и согласует удобное время для визита мастера.',
      features: [
        'Работаем 24/7, принимаем заявки круглосуточно',
        'Бесплатная консультация по телефону',
        'Предварительная оценка стоимости'
      ],
      duration: '5-10 минут'
    },
    {
      title: 'Диагностика',
      subtitle: 'Определяем точную причину поломки',
      description: 'Мастер выезжает на дом в согласованное время. Проводит комплексную диагностику техники, определяет причину неисправности и озвучивает точную стоимость ремонта.',
      features: [
        'Бесплатно при ремонте у нас',
        'Профессиональное оборудование',
        'Полный отчет о состоянии техники',
        'Прозрачное ценообразование'
      ],
      duration: '30-60 минут'
    },
    {
      title: 'Согласование',
      subtitle: 'Утверждаем план ремонта и стоимость',
      description: 'Мастер подробно объясняет суть поломки, предлагает варианты решения и озвучивает финальную стоимость. Ремонт начинается только после вашего согласия.',
      features: [
        'Никаких скрытых платежей',
        'Фиксированная цена',
        'Несколько вариантов ремонта при возможности',
        'Гарантия на все работы'
      ],
      duration: '10-15 минут'
    },
    {
      title: 'Ремонт',
      subtitle: 'Устраняем неисправность',
      description: 'Мастер выполняет ремонт с использованием оригинальных запчастей. По возможности ремонт проводится на месте. Сложный ремонт выполняется в нашем сервисном центре.',
      features: [
        'Только оригинальные запчасти',
        'Сертифицированные мастера',
        'Современное оборудование',
        'Соблюдение технологий производителя'
      ],
      duration: 'От 1 часа до 5 дней'
    },
    {
      title: 'Проверка',
      subtitle: 'Тестируем работу техники',
      description: 'После ремонта техника проходит полное тестирование. Проверяем все функции, убеждаемся что неисправность устранена полностью. Только после успешных тестов передаем технику клиенту.',
      features: [
        'Полная функциональная проверка',
        'Тестирование в разных режимах',
        'Проверка безопасности',
        'Консультация по эксплуатации'
      ],
      duration: '15-30 минут'
    },
    {
      title: 'Выдача',
      subtitle: 'Получаете рабочую технику с гарантией',
      description: 'Выдаем отремонтированную технику, оформляем гарантийный талон, предоставляем рекомендации по эксплуатации. Техника готова к использованию сразу после получения.',
      features: [
        'Гарантия до 2 лет',
        'Акт выполненных работ',
        'Гарантийный талон',
        'Рекомендации по уходу',
        'Бесплатная доставка при необходимости'
      ],
      duration: '10-15 минут'
    }
  ];
  
  /**
   * Переключение шага аккордеона
   */
  toggleStep(index: number): void {
    this.activeStep = this.activeStep === index ? null : index;
  }
}