/**
 * COURIER-MODAL.JS
 * Модуль для вызова курьера с бесплатной диагностикой
 */

class CourierModal {
    constructor() {
        this.modal = document.getElementById('courier-modal');
        this.form = document.getElementById('courier-form');
        this.closeBtn = this.modal?.querySelector('.courier-modal__close');
        this.overlay = this.modal?.querySelector('.courier-modal__overlay');
        this.successMessage = document.getElementById('courier-success');
        
        // Поля формы
        this.addressInput = document.getElementById('courier-address');
        this.nameInput = document.getElementById('courier-name');
        this.phoneInput = document.getElementById('courier-phone');
        this.categorySelect = document.getElementById('courier-category');
        this.customInput = document.getElementById('courier-custom');
        this.customGroup = document.getElementById('custom-category-group');
        
        // EmailJS конфигурация (используем те же данные)
        this.emailJSConfig = {
            serviceID: 'service_thnzyml',
            templateID: 'template_dxojfmz',
            publicKey: 'vCkYa4-SoL08aERAN'
        };
        
        this.init();
    }
    
    init() {
        if (!this.modal || !this.form) {
            console.error('Courier modal or form not found!');
            return;
        }
        
        console.log('Courier Modal initialized');
        
        // Загружаем EmailJS SDK если еще не загружен
        this.loadEmailJS();
        
        // Закрытие модального окна
        this.closeBtn?.addEventListener('click', () => this.close());
        this.overlay?.addEventListener('click', () => this.close());
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
        
        // Показ/скрытие поля "Другое"
        this.categorySelect?.addEventListener('change', () => this.toggleCustomInput());
        
        // Валидация в реальном времени
        this.setupValidation();
        
        // Отправка формы
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    // ============================================
    // ОТКРЫТИЕ/ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
    // ============================================
    
    open() {
        if (!this.modal) return;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        this.addressInput?.focus();
    }
    
    close() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        this.resetForm();
    }
    
    // ============================================
    // ЗАГРУЗКА EMAILJS
    // ============================================
    
    loadEmailJS() {
        if (window.emailjs) {
            console.log('EmailJS already loaded');
            this.initEmailJS();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.async = true;
        script.onload = () => {
            console.log('EmailJS SDK loaded');
            this.initEmailJS();
        };
        script.onerror = () => {
            console.error('Failed to load EmailJS SDK');
        };
        document.head.appendChild(script);
    }
    
    initEmailJS() {
        if (window.emailjs && this.emailJSConfig.publicKey) {
            emailjs.init(this.emailJSConfig.publicKey);
            console.log('EmailJS initialized for courier modal');
        }
    }
    
    // ============================================
    // ПОКАЗ/СКРЫТИЕ КАСТОМНОГО ПОЛЯ
    // ============================================
    
    toggleCustomInput() {
        const value = this.categorySelect?.value;
        
        if (value === 'other') {
            this.customGroup?.style.setProperty('display', 'flex');
            this.customInput?.setAttribute('required', 'required');
        } else {
            this.customGroup?.style.setProperty('display', 'none');
            this.customInput?.removeAttribute('required');
            this.customInput.value = '';
            this.clearFieldError(this.customInput, 'courier-custom-error');
        }
    }
    
    // ============================================
    // ВАЛИДАЦИЯ
    // ============================================
    
    setupValidation() {
        // Адрес
        this.addressInput?.addEventListener('blur', () => this.validateAddress());
        this.addressInput?.addEventListener('input', () => {
            this.clearFieldError(this.addressInput, 'courier-address-error');
        });
        
        // ФИО
        this.nameInput?.addEventListener('blur', () => this.validateName());
        this.nameInput?.addEventListener('input', () => {
            this.clearFieldError(this.nameInput, 'courier-name-error');
        });
        
        // Телефон
        this.phoneInput?.addEventListener('input', (e) => this.formatPhone(e));
        this.phoneInput?.addEventListener('blur', () => this.validatePhone());
        
        // Категория
        this.categorySelect?.addEventListener('change', () => this.validateCategory());
        
        // Кастомное поле
        this.customInput?.addEventListener('blur', () => this.validateCustom());
        this.customInput?.addEventListener('input', () => {
            this.clearFieldError(this.customInput, 'courier-custom-error');
        });
    }
    
    validateAddress() {
        const value = this.addressInput?.value.trim();
        const error = document.getElementById('courier-address-error');
        
        if (!value) {
            this.showError(this.addressInput, error, 'Пожалуйста, укажите адрес');
            return false;
        }
        
        if (value.length < 10) {
            this.showError(this.addressInput, error, 'Укажите полный адрес (минимум 10 символов)');
            return false;
        }
        
        this.showSuccess(this.addressInput, error);
        return true;
    }
    
    validateName() {
        const value = this.nameInput?.value.trim();
        const error = document.getElementById('courier-name-error');
        
        if (!value) {
            this.showError(this.nameInput, error, 'Пожалуйста, введите ФИО');
            return false;
        }
        
        if (value.length < 3) {
            this.showError(this.nameInput, error, 'ФИО должно содержать минимум 3 символа');
            return false;
        }
        
        if (!/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(value)) {
            this.showError(this.nameInput, error, 'ФИО должно содержать только буквы');
            return false;
        }
        
        this.showSuccess(this.nameInput, error);
        return true;
    }
    
    validatePhone() {
        const value = this.phoneInput?.value.trim();
        const error = document.getElementById('courier-phone-error');
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
    
    validateCategory() {
        const value = this.categorySelect?.value;
        const error = document.getElementById('courier-category-error');
        
        if (!value) {
            this.showError(this.categorySelect, error, 'Пожалуйста, выберите категорию техники');
            return false;
        }
        
        this.showSuccess(this.categorySelect, error);
        return true;
    }
    
    validateCustom() {
        const categoryValue = this.categorySelect?.value;
        
        if (categoryValue !== 'other') {
            return true;
        }
        
        const value = this.customInput?.value.trim();
        const error = document.getElementById('courier-custom-error');
        
        if (!value) {
            this.showError(this.customInput, error, 'Пожалуйста, опишите технику');
            return false;
        }
        
        if (value.length < 5) {
            this.showError(this.customInput, error, 'Опишите технику подробнее (минимум 5 символов)');
            return false;
        }
        
        this.showSuccess(this.customInput, error);
        return true;
    }
    
    formatPhone(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value[0] === '8') {
                value = '7' + value.slice(1);
            }
            
            if (value[0] !== '7') {
                value = '7' + value;
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
    
    showError(input, errorElement, message) {
        if (!input || !errorElement) return;
        
        input.classList.add('error');
        input.classList.remove('success');
        
        errorElement.textContent = message;
        errorElement.classList.add('active');
    }
    
    showSuccess(input, errorElement) {
        if (!input) return;
        
        input.classList.remove('error');
        input.classList.add('success');
        
        if (errorElement) {
            errorElement.classList.remove('active');
            errorElement.textContent = '';
        }
    }
    
    clearFieldError(input, errorId) {
        if (!input) return;
        
        input.classList.remove('error');
        
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.classList.remove('active');
            errorElement.textContent = '';
        }
    }
    
    clearAllErrors() {
        const inputs = this.form?.querySelectorAll('.form-input, .form-textarea, .form-select');
        const errors = this.form?.querySelectorAll('.form-error');
        
        inputs?.forEach(input => {
            input.classList.remove('error', 'success');
        });
        
        errors?.forEach(error => {
            error.classList.remove('active');
            error.textContent = '';
        });
    }
    
    // ============================================
    // ОТПРАВКА ФОРМЫ
    // ============================================
    
    async handleSubmit(e) {
        e.preventDefault();
        
        console.log('Courier form submit triggered');
        
        // Валидация всех полей
        const isAddressValid = this.validateAddress();
        const isNameValid = this.validateName();
        const isPhoneValid = this.validatePhone();
        const isCategoryValid = this.validateCategory();
        const isCustomValid = this.validateCustom();
        
        if (!isAddressValid || !isNameValid || !isPhoneValid || !isCategoryValid || !isCustomValid) {
            console.log('Validation failed');
            return;
        }
        
        // Получаем категорию
        let category = this.categorySelect?.options[this.categorySelect.selectedIndex].text;
        if (this.categorySelect?.value === 'other') {
            category = `Другое: ${this.customInput?.value.trim()}`;
        }
        
        // Получаем данные формы
        const formData = {
            from_name: this.nameInput?.value.trim(),
            address: this.addressInput?.value.trim(),
            phone: this.phoneInput?.value.trim(),
            category: category,
            to_email: 'vika.miroshnikova2016@gmail.com'
        };
        
        console.log('Courier form data:', formData);
        
        // Показываем загрузку
        const submitBtn = this.form?.querySelector('.btn-submit');
        const originalText = submitBtn?.textContent;
        
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
        }
        
        try {
            await this.sendEmail(formData);
            console.log('Courier request sent successfully');
            this.showSuccessMessage();
        } catch (error) {
            console.error('Ошибка отправки:', error);
            this.showErrorMessage(error);
        } finally {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    }
    
    async sendEmail(data) {
        if (!window.emailjs) {
            throw new Error('EmailJS не загружен');
        }
        
        const now = new Date();
        const dateStr = now.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const timeStr = now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const templateParams = {
            from_name: data.from_name,
            from_email: 'courier@optima-service.ru', // Системный email
            phone: data.phone,
            message: `ЗАЯВКА НА ВЫЗОВ КУРЬЕРА\n\nАдрес: ${data.address}\nКатегория техники: ${data.category}`,
            to_email: data.to_email,
            date: dateStr,
            time: timeStr,
            section: 'Вызов курьера'
        };
        
        const response = await emailjs.send(
            this.emailJSConfig.serviceID,
            this.emailJSConfig.templateID,
            templateParams
        );
        
        if (response.status !== 200) {
            throw new Error(`EmailJS error: ${response.text}`);
        }
        
        return response;
    }
    
    showSuccessMessage() {
        if (!this.form || !this.successMessage) return;
        
        console.log('Showing courier success message');
        
        this.form.style.display = 'none';
        this.successMessage.style.display = 'block';
        
        setTimeout(() => {
            this.close();
        }, 5000);
    }
    
    showErrorMessage(error) {
        alert(`Произошла ошибка при отправке заявки: ${error.message}\n\nПожалуйста, попробуйте позже или позвоните нам: 8 (988) 516-31-31`);
    }
    
    resetForm() {
        if (!this.form) return;
        
        console.log('Resetting courier form');
        
        this.form.reset();
        this.clearAllErrors();
        this.toggleCustomInput();
        
        if (this.successMessage) {
            this.successMessage.style.display = 'none';
        }
        
        this.form.style.display = 'flex';
    }
}

// Экспорт для использования в main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CourierModal;
}