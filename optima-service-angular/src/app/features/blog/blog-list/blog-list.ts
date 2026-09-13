import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';
import { BLOG_POSTS } from '../blog-data.generated';
import { formatPostDate } from '../blog-date.util';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Breadcrumb],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.scss'
})
export class BlogList implements OnInit {
  posts = BLOG_POSTS;
  formatPostDate = formatPostDate;
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'Блог' }
  ];

  constructor(
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 0]);
    this.title.setTitle('Блог сервисного центра — Optima Сервис');
    this.meta.updateTag({
      name: 'description',
      content: 'Советы по уходу за техникой, разбор частых поломок и новости сервисного центра Optima в Ростове-на-Дону.'
    });
  }
}
