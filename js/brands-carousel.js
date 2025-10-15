/**
 * BRANDS-CAROUSEL.JS
 * Функционал перетаскивания карусели брендов мышкой
 */

class BrandsCarousel {
    constructor() {
        this.track = document.querySelector('.brands-track');
        this.content = document.querySelector('.brands-content');
        
        // Параметры перетаскивания
        this.isDragging = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.velocity = 0;
        this.lastX = 0;
        this.lastTime = 0;
        this.animationId = null;
        
        // Коэффициент инерции
        this.friction = 0.95;
        this.minVelocity = 0.1;
        
        this.init();
    }
    
    init() {
        if (!this.track || !this.content) {
            console.error('Brands track or content not found!');
            return;
        }
        
        console.log('Brands carousel drag initialized');
        
        // Останавливаем анимацию при наведении
        this.track.addEventListener('mouseenter', () => this.pauseAnimation());
        this.track.addEventListener('mouseleave', () => this.resumeAnimation());
        
        // События мыши
        this.content.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseup', () => this.handleMouseUp());
        
        // Предотвращаем выделение текста при перетаскивании
        this.content.addEventListener('selectstart', (e) => {
            if (this.isDragging) {
                e.preventDefault();
            }
        });
        
        // Предотвращаем переход по ссылкам при перетаскивании
        this.content.querySelectorAll('.brand-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (this.isDragging || Math.abs(this.velocity) > 1) {
                    e.preventDefault();
                }
            });
        });
        
        // Touch события для мобильных устройств
        this.content.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
        document.addEventListener('touchend', () => this.handleTouchEnd());
    }
    
    // ============================================
    // УПРАВЛЕНИЕ АНИМАЦИЕЙ
    // ============================================
    
    pauseAnimation() {
        this.content.style.animationPlayState = 'paused';
    }
    
    resumeAnimation() {
        if (!this.isDragging) {
            this.content.style.animationPlayState = 'running';
        }
    }
    
    // ============================================
    // ОБРАБОТЧИКИ МЫШИ
    // ============================================
    
    handleMouseDown(e) {
        this.isDragging = true;
        this.startX = e.pageX;
        this.scrollLeft = this.getCurrentTranslateX();
        this.velocity = 0;
        this.lastX = e.pageX;
        this.lastTime = Date.now();
        
        // Останавливаем CSS анимацию
        this.content.style.animation = 'none';
        
        // Меняем курсор
        this.content.style.cursor = 'grabbing';
        this.content.style.userSelect = 'none';
        
        // Отменяем инерцию если она была
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    handleMouseMove(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        
        const currentX = e.pageX;
        const currentTime = Date.now();
        const deltaX = currentX - this.startX;
        const deltaTime = currentTime - this.lastTime;
        
        // Вычисляем скорость для инерции
        if (deltaTime > 0) {
            this.velocity = (currentX - this.lastX) / deltaTime * 16; // Нормализуем к 60fps
        }
        
        this.lastX = currentX;
        this.lastTime = currentTime;
        
        // Применяем смещение
        const newTranslate = this.scrollLeft + deltaX;
        this.setTranslateX(newTranslate);
    }
    
    handleMouseUp() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        
        // Возвращаем курсор
        this.content.style.cursor = 'grab';
        this.content.style.userSelect = '';
        
        // Применяем инерцию
        this.applyInertia();
    }
    
    // ============================================
    // ОБРАБОТЧИКИ TOUCH
    // ============================================
    
    handleTouchStart(e) {
        const touch = e.touches[0];
        this.isDragging = true;
        this.startX = touch.pageX;
        this.scrollLeft = this.getCurrentTranslateX();
        this.velocity = 0;
        this.lastX = touch.pageX;
        this.lastTime = Date.now();
        
        this.content.style.animation = 'none';
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    handleTouchMove(e) {
        if (!this.isDragging) return;
        
        const touch = e.touches[0];
        const currentX = touch.pageX;
        const currentTime = Date.now();
        const deltaX = currentX - this.startX;
        const deltaTime = currentTime - this.lastTime;
        
        if (deltaTime > 0) {
            this.velocity = (currentX - this.lastX) / deltaTime * 16;
        }
        
        this.lastX = currentX;
        this.lastTime = currentTime;
        
        const newTranslate = this.scrollLeft + deltaX;
        this.setTranslateX(newTranslate);
    }
    
    handleTouchEnd() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.applyInertia();
    }
    
    // ============================================
    // ИНЕРЦИЯ
    // ============================================
    
    applyInertia() {
        if (Math.abs(this.velocity) < this.minVelocity) {
            // Возвращаем CSS анимацию
            this.restoreAnimation();
            return;
        }
        
        const currentTranslate = this.getCurrentTranslateX();
        const newTranslate = currentTranslate + this.velocity;
        
        this.setTranslateX(newTranslate);
        
        // Уменьшаем скорость
        this.velocity *= this.friction;
        
        // Продолжаем анимацию
        this.animationId = requestAnimationFrame(() => this.applyInertia());
    }
    
    // ============================================
    // УТИЛИТЫ
    // ============================================
    
    getCurrentTranslateX() {
        const style = window.getComputedStyle(this.content);
        const matrix = new DOMMatrix(style.transform);
        return matrix.m41;
    }
    
    setTranslateX(value) {
        // Получаем ширину контента
        const contentWidth = this.content.scrollWidth / 2; // Делим на 2 т.к. контент дублирован
        
        // Зацикливаем позицию
        let normalizedValue = value % contentWidth;
        
        // Если сместились за левую границу, переносим вправо
        if (normalizedValue > 0) {
            normalizedValue -= contentWidth;
        }
        
        // Если сместились за правую границу, переносим влево
        if (normalizedValue < -contentWidth) {
            normalizedValue += contentWidth;
        }
        
        this.content.style.transform = `translateX(${normalizedValue}px)`;
    }
    
    restoreAnimation() {
        // Плавно возвращаем к ближайшей позиции цикла
        const currentTranslate = this.getCurrentTranslateX();
        const contentWidth = this.content.scrollWidth / 2;
        
        // Находим ближайшую позицию цикла
        const targetTranslate = Math.round(currentTranslate / contentWidth) * contentWidth;
        
        // Восстанавливаем анимацию с текущей позиции
        this.content.style.animation = 'scroll 120s linear infinite';
        
        // Устанавливаем начальную точку анимации
        const currentProgress = (Math.abs(currentTranslate) % contentWidth) / contentWidth;
        this.content.style.animationDelay = `-${120 * currentProgress}s`;
        
        console.log('Animation restored');
    }
}

// Экспорт для использования в main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrandsCarousel;
}