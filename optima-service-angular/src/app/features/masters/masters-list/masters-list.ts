import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';
import { MasterCard } from '../../../shared/components/master-card/master-card';
import { MASTERS_DATA } from '../masters-data';

@Component({
  selector: 'app-masters-list',
  standalone: true,
  imports: [CommonModule, Breadcrumb, MasterCard],
  templateUrl: './masters-list.html',
  styleUrl: './masters-list.scss'
})
export class MastersList implements OnInit {
  masters = MASTERS_DATA;
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'Мастера' }
  ];

  constructor(
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 0]);
    this.title.setTitle('Мастера сервисного центра — Optima Сервис');
    this.meta.updateTag({
      name: 'description',
      content: 'Мастера сервисного центра Optima в Ростове-на-Дону: опыт, специализация и отзывы о каждом специалисте.'
    });
  }
}
