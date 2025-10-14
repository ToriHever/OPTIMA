/**
 * REVIEWS-EMAIL-SENDER.JS
 * Модуль для отправки писем из формы обратной связи в секции отзывов
 * Использует EmailJS для надежной доставки писем
 */

class ReviewsEmailSender {
    constructor() {
        this.form = document.getElementById('reviews-contact-form');
        this.successMessage = document.getElementById('reviews-success');
        
        // Поля формы
        this.nameInput = document.getElementById('reviews-name');
        this.emailInput = document.getElementById('reviews-email');
        this.phoneInput = document.getElementById('reviews-phone');
        this.messageInput = document.getElementById('reviews-message');
        
        // Счетчик символов
        this.messageCounter = document.getElementById('reviews-message-counter');
        
        // Минимальная длина сообщения
        this.minMessageLength = 15;
        
        // EmailJS конфигурация
        // ВАЖНО: Зарегистрируйтесь на https://www.emailjs.com/
        // После регистрации получите эти данные из dashboard
        this.emailJSConfig = {
            serviceID: 'service_thnzyml',      // Из EmailJS Dashboard
            templateID: 'template_dxojfmz',    // Из EmailJS Dashboard  
            publicKey: 'vCkYa4-SoL08aERAN'       // Из EmailJS Dashboard
        };
        
        this.init();
    }
    
    init() {
        if (!this.form) {
            console.error('Reviews form not found!');
            return;
        }
        
        console.log('Reviews Email Sender initialized');
        
        // Загружаем EmailJS SDK
        this.loadEmailJS();
        
        // Валидация в реальном времени
        this.setupValidation();
        
        // Отправка формы
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    // ============================================
    // ЗАГРУЗКА EMAILJS SDK
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
            console.log('EmailJS initialized');
        }
    }
    
    // ============================================
    // НАСТРОЙКА ВАЛИДАЦИИ
    // ============================================
    
    setupValidation() {
        // Имя
        this.nameInput?.addEventListener('blur', () => this.validateName());
        this.nameInput?.addEventListener('input', () => {
            this.clearFieldError(this.nameInput, 'reviews-name-error');
        });
        
        // Email
        this.emailInput?.addEventListener('blur', () => this.validateEmail());
        this.emailInput?.addEventListener('input', () => {
            this.clearFieldError(this.emailInput, 'reviews-email-error');
        });
        
        // Телефон
        this.phoneInput?.addEventListener('input', (e) => this.formatPhone(e));
        this.phoneInput?.addEventListener('blur', () => this.validatePhone());
        
        // Сообщение
        this.messageInput?.addEventListener('input', () => {
            this.updateCounter();
            this.clearFieldError(this.messageInput, 'reviews-message-error');
        });
        this.messageInput?.addEventListener('blur', () => this.validateMessage());
    }
    
    // ============================================
    // ВАЛИДАЦИЯ ПОЛЕЙ
    // ============================================
    
    validateName() {
        const value = this.nameInput?.value.trim();
        const errorElement = document.getElementById('reviews-name-error');
        
        if (!value) {
            this.showError(this.nameInput, errorElement, 'Пожалуйста, введите ваше имя');
            return false;
        }
        
        if (value.length < 2) {
            this.showError(this.nameInput, errorElement, 'Имя должно содержать минимум 2 символа');
            return false;
        }
        
        if (!/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(value)) {
            this.showError(this.nameInput, errorElement, 'Имя должно содержать только буквы');
            return false;
        }
        
        this.showSuccess(this.nameInput, errorElement);
        return true;
    }
    
    validateEmail() {
        const value = this.emailInput?.value.trim();
        const errorElement = document.getElementById('reviews-email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            this.showError(this.emailInput, errorElement, 'Пожалуйста, введите вашу почту');
            return false;
        }
        
        if (!emailRegex.test(value)) {
            this.showError(this.emailInput, errorElement, 'Введите корректный email адрес');
            return false;
        }
        
        this.showSuccess(this.emailInput, errorElement);
        return true;
    }
    
    validatePhone() {
        const value = this.phoneInput?.value.trim();
        const errorElement = document.getElementById('reviews-phone-error');
        const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        
        // Телефон необязательное поле
        if (!value) {
            this.clearFieldError(this.phoneInput, 'reviews-phone-error');
            return true;
        }
        
        if (!phoneRegex.test(value)) {
            this.showError(this.phoneInput, errorElement, 'Введите корректный номер телефона');
            return false;
        }
        
        this.showSuccess(this.phoneInput, errorElement);
        return true;
    }
    
    validateMessage() {
        const value = this.messageInput?.value.trim();
        const errorElement = document.getElementById('reviews-message-error');
        
        if (!value) {
            this.showError(this.messageInput, errorElement, 'Пожалуйста, опишите ваш вопрос');
            return false;
        }
        
        if (value.length < this.minMessageLength) {
            this.showError(
                this.messageInput, 
                errorElement, 
                `Минимум ${this.minMessageLength} символов (введено: ${value.length})`
            );
            return false;
        }
        
        this.showSuccess(this.messageInput, errorElement);
        return true;
    }
    
    // ============================================
    // ФОРМАТИРОВАНИЕ ТЕЛЕФОНА
    // ============================================
    
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
    
    // ============================================
    // СЧЕТЧИК СИМВОЛОВ
    // ============================================
    
    updateCounter() {
        const value = this.messageInput?.value.trim() || '';
        const length = value.length;
        
        if (this.messageCounter) {
            this.messageCounter.textContent = `${length} / ${this.minMessageLength}`;
            
            if (length >= this.minMessageLength) {
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
    
    // ============================================
    // ПОКАЗ ОШИБОК И УСПЕХА
    // ============================================
    
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
    
    // ============================================
    // ОТПРАВКА ФОРМЫ
    // ============================================
    
    async handleSubmit(e) {
        e.preventDefault();
        
        console.log('Form submit triggered');
        
        // Валидация всех полей
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isPhoneValid = this.validatePhone();
        const isMessageValid = this.validateMessage();
        
        if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
            console.log('Validation failed');
            return;
        }
        
        // Получаем данные формы
        const formData = {
            from_name: this.nameInput?.value.trim(),
            from_email: this.emailInput?.value.trim(),
            phone: this.phoneInput?.value.trim() || 'Не указан',
            message: this.messageInput?.value.trim(),
            to_email: 'vika.miroshnikova2016@gmail.com'
        };
        
        console.log('Form data:', formData);
        
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
            console.log('Email sent successfully');
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
    
    // ============================================
    // ОТПРАВКА EMAIL
    // ============================================
    
    async sendEmail(data) {
        // Проверяем наличие EmailJS
        if (!window.emailjs) {
            throw new Error('EmailJS не загружен');
        }
        
        // Добавляем дату и время
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
            from_email: data.from_email,
            phone: data.phone,
            message: data.message,
            to_email: data.to_email,
            date: dateStr,
            time: timeStr,
            section: 'Секция отзывов'
        };
        
        // Отправляем через EmailJS
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
    
    // ============================================
    // АЛЬТЕРНАТИВНАЯ ОТПРАВКА ЧЕРЕЗ FORMSUBMIT
    // ============================================
    
    async sendViaFormSubmit(data) {
        const response = await fetch('https://formsubmit.co/ajax/vika.miroshnikova2016@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: data.from_name,
                email: data.from_email,
                phone: data.phone,
                message: data.message,
                _subject: 'Новый вопрос из секции отзывов - Оптима Сервис',
                _template: 'table',
                _captcha: 'false'
            })
        });
        
        if (!response.ok) {
            throw new Error('Ошибка отправки через FormSubmit');
        }
        
        return response.json();
    }
    
    // ============================================
    // ПОКАЗ СООБЩЕНИЙ
    // ============================================
    
    showSuccessMessage() {
        if (!this.form || !this.successMessage) return;
        
        console.log('Showing success message');
        
        // Скрываем форму
        this.form.style.display = 'none';
        
        // Показываем сообщение об успехе
        this.successMessage.style.display = 'block';
        
        // Через 5 секунд возвращаем форму
        setTimeout(() => {
            this.resetForm();
        }, 5000);
    }
    
    showErrorMessage(error) {
        alert(`Произошла ошибка при отправке вопроса: ${error.message}\n\nПожалуйста, попробуйте позже или свяжитесь с нами по телефону: 8 (988) 516-31-31`);
    }
    
    // ============================================
    // СБРОС ФОРМЫ
    // ============================================
    
    resetForm() {
        if (!this.form) return;
        
        console.log('Resetting form');
        
        this.form.reset();
        this.clearAllErrors();
        this.updateCounter();
        
        if (this.successMessage) {
            this.successMessage.style.display = 'none';
        }
        
        this.form.style.display = 'flex';
    }
}

// Экспорт для использования в main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReviewsEmailSender;
}