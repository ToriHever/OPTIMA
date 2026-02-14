import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject, takeUntil, Observable } from 'rxjs';
import { ModalService } from '../../../core/services/modal.service';
import { EmailService, EmailData } from '../../../core/services/email.service';

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
    private emailService: EmailService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isOpen$ = this.modalService.getState('callback-modal');
  }
  
  ngOnInit(): void {
    this.modalService.register('callback-modal');
    this.initForm();
    
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
  
  private resetForm(): void {
    this.callbackForm.reset({
      consent: false
    });
    this.submitStatus = null;
    this.isSubmitting = false;
  }
  
  isFieldInvalid(fieldName: string): boolean {
    const field = this.callbackForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  
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
      await this.sendEmail(this.callbackForm.value);
      
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
  
  private async sendEmail(data: any): Promise<void> {
    const emailData: EmailData = {
      from_name: data.name,
      phone: data.phone,
      device_type: data.deviceType,
      message: data.message,
      address: data.address,
      preferred_time: data.preferredTime
    };
    
    await this.emailService.sendCallbackRequest(emailData);
  }
  
  close(): void {
    this.modalService.close('callback-modal');
  }
  
  openPrivacyPolicy(event: Event): void {
    event.preventDefault();
    console.log('Open privacy policy');
  }
}