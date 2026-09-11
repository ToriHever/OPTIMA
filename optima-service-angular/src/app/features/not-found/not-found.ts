import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ModalService } from '../../core/services/modal.service';

interface QuickLink {
  icon: string;
  title: string;
  desc: string;
  path: string;
}

/**
 * 404 — не редиректим на главную молча (как раньше делал wildcard-роут),
 * а показываем страницу с шапкой/футером и путями "спасения" визита:
 * звонок, поиск по разделам, переход на популярные страницы. Индексацию
 * закрываем через meta robots — сама страница не должна попадать в поиск.
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound implements OnInit {
  readonly phone = '8 (988) 516-31-31';
  readonly phoneHref = 'tel:89885163131';

  readonly quickLinks: QuickLink[] = [
    {
      icon: 'washer',
      title: 'Ремонт бытовой техники',
      desc: 'Стиральные машины, холодильники, посудомойки',
      path: '/remont-bytovoy-tekhniki'
    },
    {
      icon: 'laptop',
      title: 'Ремонт компьютеров и телефонов',
      desc: 'Смартфоны, ноутбуки, ПК, планшеты',
      path: '/remont-kompyuterov'
    },
    {
      icon: 'tv',
      title: 'Ремонт аудио- и видеотехники',
      desc: 'Телевизоры, консоли, акустика',
      path: '/remont-audiovideo'
    },
    {
      icon: 'badge',
      title: 'Авторизованные бренды',
      desc: 'Официальный сервис по вашему бренду',
      path: '/brands'
    },
    {
      icon: 'tag',
      title: 'Цены на ремонт',
      desc: 'Актуальная стоимость услуг',
      path: '/prices'
    },
    {
      icon: 'pin',
      title: 'Контакты и адрес',
      desc: 'Как до нас добраться и связаться',
      path: '/contacts'
    }
  ];

  constructor(
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 0]);
    this.title.setTitle('Страница не найдена — Optima Сервис');
    this.meta.updateTag({
      name: 'description',
      content: 'Такой страницы не существует или она была перемещена. Перейдите в каталог услуг или свяжитесь с сервисным центром Optima.'
    });
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  openCallbackForm(): void {
    this.modalService.open('callback-modal', { purpose: 'callback' });
  }
}
