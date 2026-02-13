import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModalService } from '../../../core/services/modal.service';
import { Observable } from 'rxjs';

interface RepairInfo {
  orderNumber: string;
  deviceType: string;
  brand: string;
  acceptedDate: Date;
  issue: string;
  status: 'accepted' | 'diagnosis' | 'repair' | 'ready';
  statusStep: number;
}

@Component({
  selector: 'app-repair-status-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './repair-status-modal.html',
  styleUrl: './repair-status-modal.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-50px)' }))
      ])
    ])
  ]
})
export class RepairStatusModal implements OnInit {
  isOpen$!: Observable<boolean>;
  searchForm!: FormGroup;
  isLoading = false;
  repairInfo: RepairInfo | null = null;
  notFound = false;
  
  // Моковые данные для демонстрации
  private mockRepairs: RepairInfo[] = [
    {
      orderNumber: '0123',
      deviceType: 'Холодильник',
      brand: 'Samsung',
      acceptedDate: new Date('2024-02-08'),
      issue: 'Не морозит',
      status: 'ready',
      statusStep: 4
    },
    {
      orderNumber: '0124',
      deviceType: 'Стиральная машина',
      brand: 'Bosch',
      acceptedDate: new Date('2024-02-10'),
      issue: 'Не сливает воду',
      status: 'repair',
      statusStep: 3
    },
    {
      orderNumber: '0125',
      deviceType: 'Посудомоечная машина',
      brand: 'Electrolux',
      acceptedDate: new Date('2024-02-12'),
      issue: 'Не греет воду',
      status: 'diagnosis',
      statusStep: 2
    }
  ];
  
  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Используем новый API
    this.isOpen$ = this.modalService.getState('repair-status-modal');
  }
  
  ngOnInit(): void {
    this.modalService.register('repair-status-modal');
    
    this.searchForm = this.fb.group({
      orderNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}$/)
      ]]
    });
  }
  
  close(): void {
    this.modalService.close('repair-status-modal');
    this.resetSearch();
  }
  
  searchRepair(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    this.notFound = false;
    
    // Имитация запроса к серверу
    setTimeout(() => {
      const orderNumber = this.searchForm.get('orderNumber')?.value;
      const found = this.mockRepairs.find(r => r.orderNumber === orderNumber);
      
      if (found) {
        this.repairInfo = found;
        this.notFound = false;
      } else {
        this.repairInfo = null;
        this.notFound = true;
      }
      
      this.isLoading = false;
    }, 1500);
  }
  
  resetSearch(): void {
    this.searchForm.reset();
    this.repairInfo = null;
    this.notFound = false;
    this.isLoading = false;
  }
  
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'accepted': 'Принято',
      'diagnosis': 'Диагностика',
      'repair': 'В ремонте',
      'ready': 'Готово к выдаче'
    };
    return statusMap[status] || 'Неизвестно';
  }
}