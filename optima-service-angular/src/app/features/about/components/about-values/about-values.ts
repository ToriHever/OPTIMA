import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Value {
  title: string;
  desc: string;
  icon: string;
}

interface TeamMember {
  name: string;
  role: string;
  experience: string;
  initials: string;
  bg: string;
  skills: string[];
}

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-about-values',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-values.html',
  styleUrl: './about-values.scss'
})
export class AboutValues {
  values: Value[] = [
    {
      title: 'Честность',
      desc: 'Называем реальную стоимость ремонта. Никаких скрытых платежей и навязанных услуг.',
      icon: 'M16 8A8 8 0 1 1 0 8 8 8 0 0 1 16 8ZM6 8l3 3 5-5'
    },
    {
      title: 'Скорость',
      desc: 'Большинство ремонтов выполняем в течение суток. Срочный выезд мастера — за 2 часа.',
      icon: 'M16 8A8 8 0 1 1 0 8 8 8 0 0 1 16 8ZM8 4v4l3 3'
    },
    {
      title: 'Качество',
      desc: 'Используем только оригинальные запчасти от производителей. Гарантия на все виды работ — до 90 дней.',
      icon: 'M8 2l2 4 4.5.5-3.25 3.25 1 4.5L8 12l-4.25 2.25 1-4.5L1.5 6.5 6 6Z'
    },
    {
      title: 'Прозрачность',
      desc: 'Вы можете отслеживать статус ремонта онлайн. После завершения выдаём акт выполненных работ.',
      icon: 'M4 6h8M4 10h8M4 14h5 M12 12l3 3 5-5'
    }
  ];

  team: TeamMember[] = [
    {
      name: 'Алексей',
      role: 'Главный мастер',
      experience: 'Опыт работы 12 лет. Специализируется на сложных электронных поломках и BGA-пайке.',
      initials: 'АВ',
      bg: 'linear-gradient(135deg, #00444D 0%, #30676E 100%)',
      skills: ['Смартфоны', 'Ноутбуки', 'BGA-пайка', 'Платы']
    },
    {
      name: 'Дмитрий',
      role: 'Мастер по крупной технике',
      experience: 'Опыт работы 9 лет. Авторизован Dreame и Polaris. Специалист по холодильникам и СМА.',
      initials: 'ДС',
      bg: 'linear-gradient(135deg, #1e8a8a 0%, #00444D 100%)',
      skills: ['Холодильники', 'Стиральные машины', 'Dreame', 'Polaris']
    },
    {
      name: 'Станислав',
      role: 'Администратор сервиса',
      experience: 'Координирует приём заявок, контролирует сроки и качество обслуживания клиентов.',
      initials: 'НЛ',
      bg: 'linear-gradient(135deg, #2a7a80 0%, #00444D 100%)',
      skills: ['Клиентский сервис', 'Документооборот', 'Контроль качества']
    }
  ];

  timeline: TimelineEvent[] = [
    // {
    //   year: '2016',
    //   title: 'Открытие сервисного центра',
    //   desc: 'Начали работу в небольшом помещении на улице Ларина. Первые клиенты — соседи и знакомые.'
    // },
    {
      year: 'до 2025',
      title: 'Первая авторизация',
      desc: 'Получили статус авторизованного сервисного центра Polaris. Стали первыми в Ростове-на-Дону.'
    },
    {
      year: 'до 2025',
      title: 'Расширение команды',
      desc: 'В команду добавились новые мастера. Ввели систему онлайн-записи и отслеживания статуса ремонта.'
    },
    {
      year: 'до 2025',
      title: 'Авторизация Dreame',
      desc: 'Добавили авторизацию по бренду Dreame — производителю роботов-пылесосов и мойщиков окон.'
    },
    {
      year: '2026',
      title: 'Обновление сервиса',
      desc: 'Запустили новый сайт с онлайн-заявкой и интеграцией с CRM. Сократили время ожидания на 40%.'
    }
  ];
}