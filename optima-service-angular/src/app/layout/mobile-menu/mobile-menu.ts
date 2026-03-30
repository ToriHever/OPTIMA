import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModalService } from '../../core/services/modal.service';
import { ScrollService } from '../../core/services/scroll.service';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.scss',
  animations: [
    trigger('overlayFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms ease', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease', style({ opacity: 0 }))
      ])
    ]),
    trigger('drawerSlide', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('250ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class MobileMenu implements OnChanges {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  constructor(
    private modalService: ModalService,
    private scrollService: ScrollService,
    private navigationService: NavigationService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (changes['isOpen']) {
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }
  }

  onClose(): void {
    this.close.emit();
  }

  scrollTo(sectionId: string): void {
    this.onClose();
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      this.scrollService.scrollToId(sectionId);
    } else {
      this.navigationService.setPendingScroll(sectionId);
      this.router.navigate(['/']);
    }
  }

  openRepairStatusModal(): void {
    this.modalService.open('repair-status-modal');
    this.onClose();
  }
}