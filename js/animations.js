/**
 * ANIMATIONS.JS
 * Анимации при скролле страницы
 */

class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.init();
    }
    
    init() {
        // Собираем все элементы для анимации
        this.collectElements();
        
        // Создаем наблюдатель
        this.createObserver();
        
        // Начинаем наблюдение
        this.observeElements();
    }
    
    collectElements() {
        // Добавляем классы анимации к элементам
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.classList.add('animate-on-scroll', `delay-${(index % 4) + 1}`);
            this.animatedElements.push(card);
        });
        
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach((card, index) => {
            card.classList.add('animate-scale', `delay-${(index % 2) + 1}`);
            this.animatedElements.push(card);
        });
        
        const ctaFeatures = document.querySelectorAll('.cta-feature');
        ctaFeatures.forEach((feature, index) => {
            feature.classList.add('animate-on-scroll', `delay-${(index % 4) + 1}`);
            this.animatedElements.push(feature);
        });
        
        const certificateCards = document.querySelectorAll('.certificate-card');
        certificateCards.forEach((card, index) => {
            card.classList.add('animate-scale', `delay-${(index % 4) + 1}`);
            this.animatedElements.push(card);
        });
        
        const warrantyCards = document.querySelectorAll('.warranty-card');
        warrantyCards.forEach((card, index) => {
            card.classList.add(index === 0 ? 'animate-left' : 'animate-right');
            this.animatedElements.push(card);
        });
        
        // Заголовки секций
        const sectionTitles = document.querySelectorAll('.section-title, .section-title-dark');
        sectionTitles.forEach(title => {
            title.classList.add('animate-on-scroll');
            this.animatedElements.push(title);
        });
    }
    
    createObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Можно не отписываться, если хотим повторять анимацию
                    // this.observer.unobserve(entry.target);
                }
            });
        }, options);
    }
    
    observeElements() {
        this.animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Экспорт для использования в main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollAnimations;
}