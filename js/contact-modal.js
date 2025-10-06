/**
 * CONTACT-MODAL.JS
 * Форма обратной связи
 */

class ContactModal {
    constructor() {
        this.modal = document.getElementById('contact-modal');
        this.form = document.getElementById('contact-form');
        this.closeBtn = this.modal?.querySelector('.contact-modal__close');
        this.overlay = this.modal?.querySelector('.contact-modal__overlay');
        this.successMessage = document.getElementById('success-message');
        
        // Поля формы
        this.nameInput = document.getElementById('contact-name');
        this.emailInput = document.getElementById('contact-email');
        this.phoneInput = document.getElementById('contact-phone');
        this.messageInput = document.getElementById('contact-message');
        
        // Счетчик символов
        this.messageCounter = document.getElementById('message-counter');
        
        this.init();
    }
    
    init() {
        if (!this.modal || !this.form) return;
        
        // Закрытие модального окна
        this.closeBtn?.addEventListener('click', () => this.close());
        this.overlay?.addEventListener('click', () => this.close());
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
        
        // Валидация в реальном времени
        this.nameInput?.addEventListener('blur', () => this.validateName());
        this.emailInput?.addEventListener('blur', () => this.validateEmail());
        this.phoneInput?.addEventListener('input', (e) => this.formatPhone(e));
        // Убираем валидацию при потере фокуса для необязательного поля
        this.messageInput?.addEventListener('input', () => this.updateCounter());
        this.messageInput?.addEventListener('blur', () => this.validateMessage());
    }
    
    open() {
        if (!this.modal) return;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Блокируем скролл body
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        this.nameInput?.focus();
    }
    
    close() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        // Разблокируем скролл
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        this.resetForm();
    }
    
    resetForm() {
        this.form?.reset();
        this.clearErrors();
        this.updateCounter();
        
        // Скрываем сообщение об успехе
        this.successMessage?.classList.remove('active');
        this.form?.style.removeProperty('display');
    }
    
    clearErrors() {
        const inputs = this.form?.querySelectorAll('.form-input, .form-textarea');
        const errors = this.form?.querySelectorAll('.form-error');
        
        inputs?.forEach(input => {
            input.classList.remove('error', 'success');
        });
        
        errors?.forEach(error => {
            error.classList.remove('active');
            error.textContent = '';
        });
    }
    
    // Валидация имени
    validateName() {
        const value = this.nameInput?.value.trim();
        const error = document.getElementById('name-error');
        
        if (!value) {
            this.showError(this.nameInput, error, 'Пожалуйста, введите ваше имя');
            return false;
        }
        
        if (value.length < 2) {
            this.showError(this.nameInput, error, 'Имя должно содержать минимум 2 символа');
            return false;
        }
        
        this.showSuccess(this.nameInput, error);
        return true;
    }
    
    // Валидация email
    validateEmail() {
        const value = this.emailInput?.value.trim();
        const error = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            this.showError(this.emailInput, error, 'Пожалуйста, введите вашу почту');
            return false;
        }
        
        if (!emailRegex.test(value)) {
            this.showError(this.emailInput, error, 'Введите корректный email адрес');
            return false;
        }
        
        this.showSuccess(this.emailInput, error);
        return true;
    }
    
    // Форматирование и валидация телефона
    formatPhone(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value[0] === '8') {
                value = '7' + value.slice(1);
            }
            
            let formatted = '+7';
            
            if (value.length > 1) {
                formatted += ' (' + value.slice(1, 4);
            }
            if (value.length >= 5) {
                formatted += ') ' + value.slice(4, 7);
            }
            if (value.length >= 8) {
                formatted += '-' + value.slice(7, 9);
            }
            if (value.length >= 10) {
                formatted += '-' + value.slice(9, 11);
            }
            
            e.target.value = formatted;
        }
    }
    
    validatePhone() {
        const value = this.phoneInput?.value.trim();
        const error = document.getElementById('phone-error');
        const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        
        if (!value) {
            this.showError(this.phoneInput, error, 'Пожалуйста, введите номер телефона');
            return false;
        }
        
        if (!phoneRegex.test(value)) {
            this.showError(this.phoneInput, error, 'Введите корректный номер телефона');
            return false;
        }
        
        this.showSuccess(this.phoneInput, error);
        return true;
    }
    
    // Валидация сообщения
    validateMessage() {
        const value = this.messageInput?.value.trim();
        const error = document.getElementById('message-error');
        
        if (!value) {
            this.showError(this.messageInput, error, 'Пожалуйста, опишите вашу проблему');
            return false;
        }
        
        if (value.length < 15) {
            this.showError(this.messageInput, error, `Минимум 15 символов (введено: ${value.length})`);
            return false;
        }
        
        this.showSuccess(this.messageInput, error);
        return true;
    }
    
    // Обновление счетчика символов
    updateCounter() {
        const value = this.messageInput?.value.trim() || '';
        const length = value.length;
        
        if (this.messageCounter) {
            this.messageCounter.textContent = `${length} / 15`;
            
            if (length >= 15) {
                this.messageCounter.classList.remove('error');
                this.messageCounter.classList.add('success');
            } else {
                this.messageCounter.classList.remove('success');
                if (length > 0) {
                    this.messageCounter.classList.add('error');
                } else {
                    this.messageCounter.classList.remove('error');
                }
            }
        }
    }
    
    // Показать ошибку
    showError(input, errorElement, message) {
        input?.classList.add('error');
        input?.classList.remove('success');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('active');
        }
    }
    
    // Показать успех
    showSuccess(input, errorElement) {
        input?.classList.remove('error');
        input?.classList.add('success');
        errorElement?.classList.remove('active');
    }
    
    // Отправка формы
    async handleSubmit(e) {
        e.preventDefault();
        
        // Валидация всех полей
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isPhoneValid = this.validatePhone();
        const isMessageValid = this.validateMessage();
        
        if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
            return;
        }
        
        // Получаем данные формы
        const formData = {
            name: this.nameInput?.value.trim(),
            email: this.emailInput?.value.trim(),
            phone: this.phoneInput?.value.trim(),
            message: this.messageInput?.value.trim()
        };
        
        // Показываем загрузку
        const submitBtn = this.form?.querySelector('.btn-submit');
        const originalText = submitBtn?.textContent;
        
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
        }
        
        try {
            // Отправка через FormSubmit
            await this.sendEmail(formData);
            
            // Показываем сообщение об успехе
            this.showSuccessMessage();
        } catch (error) {
            console.error('Ошибка отправки:', error);
            alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
        } finally {
            // Возвращаем кнопку в исходное состояние
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    }
    
    // Отправка email через FormSubmit
    async sendEmail(data) {
        // Используем FormSubmit.co - бесплатный сервис для отправки форм на email
        const response = await fetch('https://formsubmit.co/ajax/vika.miroshnikova2016@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message,
                _subject: 'Новая заявка с сайта Оптима Сервис',
                _template: 'table'
            })
        });
        
        if (!response.ok) {
            throw new Error('Ошибка отправки');
        }
        
        return response.json();
    }
    
    // Показать сообщение об успехе
    showSuccessMessage() {
        if (this.form && this.successMessage) {
            this.form.style.display = 'none';
            this.successMessage.classList.add('active');
        }
    }
}

// Экспорт для использования в main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactModal;
}