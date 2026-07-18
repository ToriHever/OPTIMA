import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterCard } from '../../../../shared/components/master-card/master-card';
import { MASTERS_DATA } from '../../../masters/masters-data';

interface Value {
  title: string;
  desc: string;
  icon: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-about-values',
  standalone: true,
  imports: [CommonModule, MasterCard],
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

  team = MASTERS_DATA;

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