import { Component, OnInit, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';  // ← добавить
import { ModalService } from '../../../core/services/modal.service';
import { Observable } from 'rxjs';

// ---- Структура ответа от API devicedoctors.ru ----
interface ApiSuccessResponse {
  Status: 'OK' | string;
  data: {
    id: string;
    deviceFullName: string;
    status: string;
    state: string;
  };
}

interface ApiErrorResponse {
  Status: 'ExternalRequestFailed';
  UserMessage: string;
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

// ---- Внутренняя модель для отображения ----
interface RepairInfo {
  orderNumber: string;
  deviceFullName: string;
  status: string;
  state: string;
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
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
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
  errorMessage = '';

  // Относительный путь — и dev-proxy (proxy.conf.json), и Express-proxy (server.ts)
  // слушают /repair-api и проксируют на devicedoctors.ru
  private readonly API_BASE = '/repair-api/api/ExternalAccess/';

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isOpen$ = this.modalService.getState('repair-status-modal');
  }

  ngOnInit(): void {
    this.modalService.register('repair-status-modal');

    // Валидатор: произвольная непустая строка (номер заказ-наряда из API может
    // быть любой длины — не ограничиваем ровно 6 цифрами как было раньше)
    this.searchForm = this.fb.group({
      orderNumber: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(/^\d+$/)   // только цифры, любое количество
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

  const orderNumber: string = this.searchForm.get('orderNumber')!.value.trim();

  this.isLoading = true;
  this.notFound = false;
  this.repairInfo = null;
  this.errorMessage = '';

  this.http.get<ApiResponse>(this.API_BASE + encodeURIComponent(orderNumber))
    .subscribe({
      next: (json) => {
        if (json.Status === 'ExternalRequestFailed') {
          this.notFound = true;
          this.errorMessage = (json as ApiErrorResponse).UserMessage || 'Заказ-наряд не найден';
        } else {
          const data = (json as ApiSuccessResponse).data;
          this.repairInfo = {
            orderNumber: data.id,
            deviceFullName: data.deviceFullName,
            status: data.status,
            state: data.state
          };
          this.notFound = false;
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Repair status API error:', err);
        this.notFound = true;
        this.errorMessage = 'Не удалось подключиться к серверу. Попробуйте позже.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
}

  resetSearch(): void {
    this.searchForm.reset();
    this.repairInfo = null;
    this.notFound = false;
    this.isLoading = false;
    this.errorMessage = '';
  }
}