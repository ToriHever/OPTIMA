import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';
import { NotFound } from '../../not-found/not-found';
import { BLOG_POSTS, BlogPostData } from '../blog-data.generated';
import { formatPostDate } from '../blog-date.util';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule, Breadcrumb, NotFound],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.scss'
})
export class BlogPost implements OnInit {
  post: BlogPostData | null = null;
  breadcrumbs: BreadcrumbItem[] = [];
  formatPostDate = formatPostDate;

  constructor(
    private route: ActivatedRoute,
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 0]);

    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.post = BLOG_POSTS.find(p => p.slug === slug) ?? null;

    if (!this.post) {
      // Показываем 404 на этом же URL, а не уводим на /blog — см. master-detail.ts.
      return;
    }

    this.breadcrumbs = [
      { label: 'Главная', path: '/' },
      { label: 'Блог', path: '/blog' },
      { label: this.post.title }
    ];

    this.title.setTitle(`${this.post.title} — Блог Optima Сервис`);
    this.meta.updateTag({
      name: 'description',
      content: this.post.excerpt || this.post.title
    });
  }
}
