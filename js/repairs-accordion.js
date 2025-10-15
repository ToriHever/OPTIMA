/**
 * REPAIRS-ACCORDION.JS
 * Модальное окно для блока "Работаем с неисправностями"
 */

class RepairsAccordion {
    constructor() {
        this.categories = document.querySelectorAll('.repair-category');
        this.modal = document.getElementById('repairs-modal');
        this.modalTitle = this.modal?.querySelector('.repairs-modal__title');
        this.modalIcon = this.modal?.querySelector('.repairs-modal__icon');
        this.modalBody = this.modal?.querySelector('.repairs-modal__body');
        this.closeBtn = this.modal?.querySelector('.repairs-modal__close');
        this.overlay = this.modal?.querySelector('.repairs-modal__overlay');
        
        this.init();
    }
    
    init() {
        if (!this.categories.length || !this.modal) {
            console.error('Repair categories or modal not found!');
            return;
        }
        
        console.log('Repairs modal initialized:', this.categories.length, 'categories');
        
        // Обработчики для категорий
        this.categories.forEach((category) => {
            category.addEventListener('click', () => {
                this.openModal(category);
            });
        });
        
        // Закрытие модального окна
        this.closeBtn?.addEventListener('click', () => this.closeModal());
        this.overlay?.addEventListener('click', () => this.closeModal());
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal(category) {
        if (!this.modal) return;
        
        // Получаем данные категории
        const icon = category.querySelector('.repair-category-icon')?.textContent || '';
        const title = category.querySelector('.repair-category-title')?.textContent || '';
        const content = category.querySelector('.repair-category-content');
        
        if (!content) return;
        
        // Заполняем модальное окно
        if (this.modalIcon) {
            this.modalIcon.textContent = icon;
        }
        
        if (this.modalTitle) {
            this.modalTitle.textContent = title;
        }
        
        if (this.modalBody) {
            // Клонируем контент
            const clonedContent = content.cloneNode(true);
            clonedContent.style.display = 'block';
            this.modalBody.innerHTML = '';
            this.modalBody.appendChild(clonedContent);
        }
        
        // Показываем модальное окно
        this.modal.classList.add('active');
        
        // Блокируем скролл страницы (как в других модалках)
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        
        // Разблокируем скролл (как в других модалках)
        document.body.style.overflow = '';
        
        // Очищаем содержимое после закрытия
        setTimeout(() => {
            if (this.modalBody) {
                this.modalBody.innerHTML = '';
            }
        }, 300);
    }
}

// Экспорт для использования в main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RepairsAccordion;
}