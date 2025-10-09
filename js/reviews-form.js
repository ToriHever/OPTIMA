/**
 * REVIEWS-FORM.JS
 * Форма обратной связи в секции отзывов
 * Отправка сообщений в Telegram бот
 */

class ReviewsForm {
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
        
        // Telegram Bot настройки
        // ВАЖНО: Замените на ваши реальные данные!
        this.telegramConfig = {
            botToken: '',  // Токен вашего бота от @BotFather
            chatId: ''        // ID чата (можно получить от @userinfobot)
        };
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        console.log('Reviews form initialized');
        
        // Валидация в реальном времени
        this.nameInput?.addEventListener('blur', () => this.validateName());
        this.nameInput?.addEventListener('input', () => this.clearFieldError(this.nameInput, 'reviews-name-error'));
        
        this.emailInput?.addEventListener('blur', () => this.validateEmail());
        this.emailInput?.addEventListener('input', () => this.clearFieldError(this.emailInput, 'reviews-email-error'));
        
        this.phoneInput?.addEventListener('input', (e) => this.formatPhone(e));
        this.phoneInput?.addEventListener('blur', () => this.validatePhone());
        
        this.messageInput?.addEventListener('input', () => {
            this.updateCounter();
            this.clearFieldError(this.messageInput, 'reviews-message-error');
        });
        this.messageInput?.addEventListener('blur', () => this.validateMessage());
        
        // Отправка формы
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
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
            // Заменяем 8 на 7
            if (value[0] === '8') {
                value = '7' + value.slice(1);
            }
            
            // Если не начинается с 7, добавляем
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
        
        console.log('Validation results:', {
            name: isNameValid,
            email: isEmailValid,
            phone: isPhoneValid,
            message: isMessageValid
        });
        
        if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
            console.log('Validation failed');
            return;
        }
        
        // Получаем данные формы
        const formData = {
            name: this.nameInput?.value.trim(),
            email: this.emailInput?.value.trim(),
            phone: this.phoneInput?.value.trim() || 'Не указан',
            message: this.messageInput?.value.trim()
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
            // Отправка в Telegram
            console.log('Sending to Telegram...');
            await this.sendToTelegram(formData);
            console.log('Message sent successfully');
            
            // Показываем сообщение об успехе
            this.showSuccessMessage();
        } catch (error) {
            console.error('Ошибка отправки:', error);
            alert('Произошла ошибка при отправке вопроса. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
        } finally {
            // Возвращаем кнопку в исходное состояние
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    }
    
    // ============================================
    // ОТПРАВКА В TELEGRAM
    // ============================================
    
    async sendToTelegram(data) {
        // Формируем красивое сообщение для Telegram
        const message = this.formatTelegramMessage(data);
        
        // URL для Telegram Bot API
        const url = `https://api.telegram.org/bot${this.telegramConfig.botToken}/sendMessage`;
        
        // Параметры запроса
        const params = {
            chat_id: this.telegramConfig.chatId,
            text: message,
            parse_mode: 'HTML' // Поддержка HTML форматирования
        };
        
        // Отправляем запрос
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Telegram API error:', errorData);
            throw new Error(`Telegram API error: ${errorData.description || 'Unknown error'}`);
        }
        
        return response.json();
    }
    
    // ============================================
    // ФОРМАТИРОВАНИЕ СООБЩЕНИЯ ДЛЯ TELEGRAM
    // ============================================
    
    formatTelegramMessage(data) {
        // Получаем текущую дату и время
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
        
        // Формируем сообщение с HTML форматированием
        return `
🔔 <b>Новый вопрос с сайта</b>
📍 <i>Секция: Отзывы</i>

👤 <b>Имя:</b> ${this.escapeHtml(data.name)}
📧 <b>Email:</b> ${this.escapeHtml(data.email)}
📱 <b>Телефон:</b> ${this.escapeHtml(data.phone)}

💬 <b>Вопрос:</b>
${this.escapeHtml(data.message)}

⏰ <b>Дата и время:</b> ${dateStr} в ${timeStr}
🌐 <b>Источник:</b> Форма на странице отзывов
        `.trim();
    }
    
    // ============================================
    // ЭКРАНИРОВАНИЕ HTML ДЛЯ TELEGRAM
    // ============================================
    
    escapeHtml(text) {
        const map = {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;'
        };
        return text.replace(/[<>&]/g, char => map[char]);
    }
    
    // ============================================
    // ПОКАЗ УСПЕШНОЙ ОТПРАВКИ
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
    
    // ============================================
    // СБРОС ФОРМЫ
    // ============================================
    
    resetForm() {
        if (!this.form) return;
        
        console.log('Resetting form');
        
        // Очищаем поля
        this.form.reset();
        
        // Очищаем ошибки
        this.clearAllErrors();
        
        // Обновляем счетчик
        this.updateCounter();
        
        // Скрываем сообщение об успехе
        if (this.successMessage) {
            this.successMessage.style.display = 'none';
        }
        
        // Показываем форму
        this.form.style.display = 'flex';
    }
}

// Экспорт для использования в main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReviewsForm;
}