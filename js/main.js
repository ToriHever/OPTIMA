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
        
        // УБИРАЕМ анимацию для category-card - она конфликтует!
        const categoryCards = document.querySelectorAll('.category-card');
        // categoryCards.forEach((card, index) => {
        //     card.classList.add('animate-scale', `delay-${(index % 2) + 1}`);
        //     this.animatedElements.push(card);
        // });
        
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
        
        // Процесс работы
        const processSteps = document.querySelectorAll('.process-step');
        processSteps.forEach((step, index) => {
            step.classList.add('animate-on-scroll', `delay-${(index % 3) + 1}`);
            this.animatedElements.push(step);
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
// МОДАЛЬНОЕ ОКНО ДЛЯ СЕРТИФИКАТОВ
// ============================================
class CertificateModal {
    constructor() {
        this.modal = document.getElementById('certificateModal');
        this.modalImage = this.modal?.querySelector('.certificate-modal-image');
        this.closeBtn = this.modal?.querySelector('.certificate-modal-close');
        this.overlay = this.modal?.querySelector('.certificate-modal-overlay');
        
        this.init();
    }
    
    init() {
        if (!this.modal) return;
        
        // Обработчики для карточек сертификатов
        const certificateCards = document.querySelectorAll('.certificate-card');
        
        certificateCards.forEach(card => {
            card.addEventListener('click', () => {
                const img = card.querySelector('img');
                if (img) {
                    this.openModal(img.src, img.alt);
                }
            });
        });
        
        // Закрытие по кнопке
        this.closeBtn?.addEventListener('click', () => this.closeModal());
        
        // Закрытие по overlay
        this.overlay?.addEventListener('click', () => this.closeModal());
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal(src, alt) {
        if (!this.modal || !this.modalImage) return;
        
        this.modalImage.src = src;
        this.modalImage.alt = alt;
        
        // Блокируем прокрутку страницы
        document.body.style.overflow = 'hidden';
        
        // Показываем модалку
        this.modal.classList.add('active');
    }
    
    closeModal() {
        if (!this.modal) return;
        
        // Разблокируем прокрутку
        document.body.style.overflow = '';
        
        // Скрываем модалку
        this.modal.classList.remove('active');
        
        // Очищаем изображение после закрытия анимации
        setTimeout(() => {
            if (this.modalImage) {
                this.modalImage.src = '';
            }
        }, 300);
    }
}

// ============================================
// АККОРДЕОН ДЛЯ ПРОЦЕССА РАБОТЫ
// ============================================
class ProcessAccordion {
    constructor() {
        this.steps = document.querySelectorAll('.process-step');
        this.init();
    }
    
    init() {
        if (!this.steps.length) return;
        
        // Закрываем все этапы кроме первого
        this.steps.forEach((step, index) => {
            if (index !== 0) {
                step.classList.add('collapsed');
            }
            
            // Добавляем обработчик клика
            const content = step.querySelector('.process-step-content');
            if (content) {
                content.addEventListener('click', () => {
                    this.toggleStep(step);
                });
            }
        });
        
        console.log('Process accordion initialized:', this.steps.length, 'steps');
    }
    
    toggleStep(clickedStep) {
        const isCollapsed = clickedStep.classList.contains('collapsed');
        
        if (isCollapsed) {
            // Открываем кликнутый
            clickedStep.classList.remove('collapsed');
        } else {
            // Закрываем кликнутый
            clickedStep.classList.add('collapsed');
        }
        
        // Опционально: закрывать другие этапы при открытии нового
        // Раскомментируйте если нужно, чтобы был открыт только один этап
        /*
        this.steps.forEach(step => {
            if (step !== clickedStep) {
                step.classList.add('collapsed');
            }
        });
        */
    }
}

// ============================================
// АККОРДЕОН ДЛЯ ТАБЛИЦЫ УСЛУГ
// ============================================
class ServicesAccordion {
    constructor() {
        this.table = document.querySelector('.services-table tbody');
        this.sections = [];
        this.init();
    }
    
    init() {
        if (!this.table) return;
        
        // Находим все заголовки секций
        const headers = this.table.querySelectorAll('.table-section-header');
        
        headers.forEach((header, index) => {
            // Собираем строки каждой секции
            const sectionRows = [];
            let currentRow = header.nextElementSibling;
            
            // Идем по строкам до следующего заголовка или конца таблицы
            while (currentRow && !currentRow.classList.contains('table-section-header')) {
                sectionRows.push(currentRow);
                currentRow = currentRow.nextElementSibling;
            }
            
            // Сохраняем информацию о секции
            this.sections.push({
                header: header,
                rows: sectionRows
            });
            
            // Скрываем все секции кроме первой
            if (index !== 0) {
                header.classList.add('collapsed');
                sectionRows.forEach(row => {
                    row.classList.add('hidden-row');
                });
            }
            
            // Добавляем обработчик клика
            header.addEventListener('click', () => {
                this.toggleSection(header, sectionRows);
            });
        });
        
        console.log('Services accordion initialized:', this.sections.length, 'sections');
    }
    
    toggleSection(header, rows) {
        const isCollapsed = header.classList.contains('collapsed');
        
        if (isCollapsed) {
            // Открываем секцию
            header.classList.remove('collapsed');
            rows.forEach(row => {
                row.classList.remove('hidden-row');
            });
        } else {
            // Закрываем секцию
            header.classList.add('collapsed');
            rows.forEach(row => {
                row.classList.add('hidden-row');
            });
        }
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
    new CertificateModal();
    new ProcessAccordion(); // Добавили аккордеон
    new ServicesAccordion(); // Аккордеон таблицы услуг
    
    // Дополнительная проверка и инициализация для сертификатов
    setTimeout(() => {
        const modal = document.getElementById('certificateModal');
        const cards = document.querySelectorAll('.certificate-card');
        
        console.log('Certificate modal:', modal);
        console.log('Certificate cards:', cards.length);
        
        if (modal && cards.length > 0) {
            cards.forEach((card, index) => {
                card.addEventListener('click', function(e) {
                    console.log(`Card ${index} clicked`);
                    const img = this.querySelector('img');
                    if (img) {
                        const modalImg = modal.querySelector('.certificate-modal-image');
                        if (modalImg) {
                            modalImg.src = img.src;
                            modalImg.alt = img.alt;
                            modal.classList.add('active');
                            document.body.style.overflow = 'hidden';
                            console.log('Modal opened with:', img.src);
                        }
                    }
                });
            });
            
            // Закрытие
            const closeBtn = modal.querySelector('.certificate-modal-close');
            const overlay = modal.querySelector('.certificate-modal-overlay');
            
            const closeModal = () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                console.log('Modal closed');
            };
            
            if (closeBtn) {
                closeBtn.addEventListener('click', closeModal);
            }
            
            if (overlay) {
                overlay.addEventListener('click', closeModal);
            }
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeModal();
                }
            });
        } else {
            console.error('Modal или карточки не найдены!');
        }
    }, 100);
    
    console.log('🚀 Сайт загружен успешно!');
});