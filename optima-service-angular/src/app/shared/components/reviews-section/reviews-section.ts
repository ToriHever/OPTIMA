import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService, EmailData } from '../../../core/services/email.service';

@Component({
  selector: 'app-reviews-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reviews-section.html',
  styleUrl: './reviews-section.scss'
})
export class ReviewsSection implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  submitStatus: 'success' | 'error' | null = null;
  messageLength = 0;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.contactForm.get('message')?.valueChanges.subscribe(value => {
      this.messageLength = (value || '').trim().length;
    });
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/)]],
      deviceType: ['', Validators.required],
      message: ['']
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = null;

    try {
      const emailData: EmailData = {
        from_name: this.contactForm.value.name,
        phone: this.contactForm.value.phone,
        device_type: this.contactForm.value.deviceType,
        message: this.contactForm.value.message
      };

      await this.emailService.sendCallbackRequest(emailData);

      this.submitStatus = 'success';
      this.isSubmitted = true;

    } catch (error) {
      console.error('Error sending form:', error);
      this.submitStatus = 'error';
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm(): void {
    this.contactForm.reset();
    this.isSubmitted = false;
    this.submitStatus = null;
    this.isSubmitting = false;
    this.messageLength = 0;
  }
}
