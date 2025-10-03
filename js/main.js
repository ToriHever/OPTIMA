/**
 * MAIN.JS
 * Главный файл JavaScript
 * Инициализация всех модулей
 */

// ============================================
// МОБИЛЬНОЕ МЕНЮ
// ============================================
class MobileMenu {
    constructor() {
        this.menuBtn = document.querySelector('.mobile-menu-btn');
        this.nav = document.querySelector('.nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        if (!this.menuBtn || !this.nav) return;
        
        this.menuBtn.addEventListener('click', () => this.toggleMenu());
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target) && !this.menuBtn.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.menuBtn.classList.toggle('active');
        this.nav.classList.toggle('active');
        
        if (this.nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMenu() {
        this.menuBtn.classList.remove('active');
        this.nav.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// АНИМАЦИИ ПРИ СКРОЛЛЕ
// ============================================
class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.init();
    }
    
    init() {
        this.collectElements();
        this.createObserver();
        this.observeElements();
    }
    
    collectElements() {
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

// ============================================
// ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ
// ============================================
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// STICKY HEADER
// ============================================
class StickyHeader {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScroll = 0;
        this.init();
    }
    
    init() {
        if (!this.header) return;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                this.header.style.boxShadow = '0 4px 16px rgba(0, 68, 77, 0.15)';
            } else {
                this.header.style.boxShadow = '0 2px 8px rgba(0, 68, 77, 0.08)';
            }
            
            this.lastScroll = currentScroll;
        });
    }
}

// ============================================
// МОДАЛЬНОЕ ОКНО (для форм)
// ============================================
class Modal {
    constructor() {
        this.init();
    }
    
    init() {
        // Здесь можно добавить логику для модальных окон
        // При клике на кнопки "Оставить заявку" открывать модальное окно
        const modalBtns = document.querySelectorAll('.btn-primary');
        
        modalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Если кнопка ведет на якорь, не открываем модалку
                if (btn.getAttribute('href')?.startsWith('#')) return;
                
                e.preventDefault();
                console.log('Открыть форму обратной связи');
                // Здесь код для открытия модального окна
            });
        });
    }
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем все модули
    new MobileMenu();
    new ScrollAnimations();
    new SmoothScroll();
    new StickyHeader();
    new Modal();
    
    console.log('🚀 Сайт загружен успешно!');
});