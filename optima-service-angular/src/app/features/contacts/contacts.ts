import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, Breadcrumb],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss'
})
export class Contacts implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'Контакты' }
  ];

  constructor(
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 0]);
    this.title.setTitle('Контакты — Optima Сервис');
    this.meta.updateTag({
      name: 'description',
      content: 'Контакты сервисного центра Optima в Ростове-на-Дону: адрес, телефон, email и график работы.'
    });
  }

  openCallbackForm(): void {
    this.modalService.open('callback-modal', { purpose: 'callback' });
  }
}
