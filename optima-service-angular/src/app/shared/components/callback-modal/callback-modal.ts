import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject, takeUntil, Observable } from 'rxjs';
import { ModalService } from '../../../core/services/modal.service';
import { EmailService, EmailData } from '../../../core/services/email.service';
import { FormPurpose, CallbackFormConfig, FormField } from './callback-form.types';
import { CALLBACK_FORM_CONFIGS } from './callback-form.config';

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
  
  // Текущая конфигурация формы
  config: CallbackFormConfig = CALLBACK_FORM_CONFIGS['diagnostic']; // по умолчанию
  
  private destroy$ = new Subject<void>();
  
  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private emailService: EmailService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isOpen$ = this.modalService.getState('callback-modal');
  }
  
  ngOnInit(): void {
    this.modalService.register('callback-modal');
    
    // Следим за открытием модалки
    this.isOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isOpen => {
        if (isOpen) {
          // Получаем данные из modalService
          const data = this.modalService.getData('callback-modal');
          const purpose: FormPurpose = data?.purpose || 'diagnostic';
          
          // Обновляем конфигурацию
          this.config = CALLBACK_FORM_CONFIGS[purpose];
          
          // Пересоздаем форму
          this.buildForm();
          this.resetForm();
        }
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  /**
   * Проверяет есть ли поле в текущей конфигурации
   */
  hasField(field: FormField): boolean {
    return this.config.fields.includes(field);
  }
  
  /**
   * Строит форму на основе конфигурации
   */
  private buildForm(): void {
    const controls: any = {};
    
    // Добавляем поля в зависимости от конфигурации
    if (this.hasField('name')) {
      controls.name = ['', [Validators.required, Validators.minLength(2)]];
    }
    
    if (this.hasField('phone')) {
      controls.phone = ['', [
        Validators.required,
        Validators.pattern(/^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/)
      ]];
    }
    
    if (this.hasField('email')) {
      controls.email = ['', [Validators.required, Validators.email]];
    }
    
    if (this.hasField('deviceType')) {
      controls.deviceType = ['', Validators.required];
    }
    
    if (this.hasField('address')) {
      controls.address = [''];
    }
    
    if (this.hasField('message')) {
      controls.message = [''];
    }
    
    // Согласие всегда обязательно
    controls.consent = [false, Validators.requiredTrue];
    
    this.callbackForm = this.fb.group(controls);
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
      Object.keys(this.callbackForm.controls).forEach(key => {
        this.callbackForm.get(key)?.markAsTouched();
      });
      return;
    }
    
    this.isSubmitting = true;
    this.submitStatus = null;
    
    try {
      const emailData: EmailData = {
        from_name: this.callbackForm.value.name,
        phone: this.callbackForm.value.phone || '',
        device_type: this.callbackForm.value.deviceType || '',
        message: this.callbackForm.value.message || '',
        address: this.callbackForm.value.address || ''
      };
      
      await this.emailService.sendCallbackRequest(emailData);
      
      this.submitStatus = 'success';
      
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
    console.log('Open privacy policy');
  }
}