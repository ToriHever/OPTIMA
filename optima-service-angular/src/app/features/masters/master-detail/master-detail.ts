import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';
import { ModalService } from '../../../core/services/modal.service';
import { MASTERS_DATA, MasterData } from '../masters-data';

@Component({
  selector: 'app-master-detail',
  standalone: true,
  imports: [CommonModule, Breadcrumb],
  templateUrl: './master-detail.html',
  styleUrl: './master-detail.scss'
})
export class MasterDetail implements OnInit {
  master: MasterData | null = null;
  breadcrumbs: BreadcrumbItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 0]);

    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.master = MASTERS_DATA.find(m => m.slug === slug) ?? null;

    if (!this.master) {
      this.router.navigate(['/masters']);
      return;
    }

    this.breadcrumbs = [
      { label: 'Главная', path: '/' },
      { label: 'Мастера', path: '/masters' },
      { label: this.master.name }
    ];

    this.title.setTitle(`${this.master.name} — ${this.master.role} — Optima Сервис`);
    this.meta.updateTag({
      name: 'description',
      content: `${this.master.name}, ${this.master.role} сервисного центра Optima в Ростове-на-Дону. ${this.master.experience}`
    });
  }

  openCallbackForm(): void {
    this.modalService.open('callback-modal', { purpose: 'callback' });
  }
}
