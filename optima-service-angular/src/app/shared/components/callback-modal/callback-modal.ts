import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject, takeUntil, Observable } from 'rxjs';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-callback-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './callback-modal.html',
  styleUrl: './callback-modal.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-50px)', opacity: 0 }))
      ])
    ])
  ]
})
export class CallbackModal implements OnInit, OnDestroy {
  isOpen$!: Observable<boolean>;
  callbackForm!: FormGroup;
  isSubmitting = false;
  submitStatus: 'success' | 'error' | null = null;
  
  private destroy$ = new Subject<void>();
  
  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Инициализируем isOpen$ в конструкторе после modalService
    this.isOpen$ = this.modalService.getState('callback-modal');
  }
  
  ngOnInit(): void {
    this.modalService.register('callback-modal');
    this.initForm();
    
    // Сброс формы при открытии модалки
    this.isOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isOpen => {
        if (isOpen) {
          this.resetForm();
        }
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  /**
   * Инициализация формы
   */
  private initForm(): void {
    this.callbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/)]],
      deviceType: ['', Validators.required],
      message: [''],
      address: [''],
      preferredTime: [''],
      consent: [false, Validators.requiredTrue]
    });
  }
  
  /**
   * Сброс формы
   */
  private resetForm(): void {
    this.callbackForm.reset({
      consent: false
    });
    this.submitStatus = null;
    this.isSubmitting = false;
  }
  
  /**
   * Проверка валидности поля
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.callbackForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  
  /**
   * Отправка формы
   */
  async onSubmit(): Promise<void> {
    if (this.callbackForm.invalid) {
      // Помечаем все поля как touched для показа ошибок
      Object.keys(this.callbackForm.controls).forEach(key => {
        this.callbackForm.get(key)?.markAsTouched();
      });
      return;
    }
    
    this.isSubmitting = true;
    this.submitStatus = null;
    
    try {
      // TODO: Интеграция с EmailJS или backend API
      await this.sendEmail(this.callbackForm.value);
      
      this.submitStatus = 'success';
      
      // Автозакрытие через 3 секунды
      setTimeout(() => {
        this.close();
      }, 3000);
      
    } catch (error) {
      console.error('Error sending form:', error);
      this.submitStatus = 'error';
    } finally {
      this.isSubmitting = false;
    }
  }
  
  /**
   * Отправка email (заглушка)
   */
  private async sendEmail(data: any): Promise<void> {
    // Имитация отправки
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form data:', data);
        resolve();
      }, 1500);
    });
  }
  
  /**
   * Закрытие модального окна
   */
  close(): void {
    this.modalService.close('callback-modal');
  }
  
  /**
   * Открытие политики конфиденциальности
   */
  openPrivacyPolicy(event: Event): void {
    event.preventDefault();
    // TODO: Открыть модалку с политикой
    console.log('Open privacy policy');
  }
}