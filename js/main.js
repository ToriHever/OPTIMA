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
// class Modal {
//     constructor() {
//         this.init();
//     }
    
//     init() {
//         // Кнопки "Оставить заявку" открывают форму обратной связи
//         const modalBtns = document.querySelectorAll('.btn-primary, .btn-secondary');
        
//         modalBtns.forEach(btn => {
//             const btnText = btn.textContent.toLowerCase();
            
//             // Если кнопка "Оставить заявку", открываем форму
//             if (btnText.includes('оставить заявку') || btnText.includes('обратная связь')) {
//                 btn.addEventListener('click', (e) => {
//                     e.preventDefault();
//                     window.contactModal?.open();
//                 });
//             }
//         });
//     }
// }

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
// МОДАЛЬНОЕ ОКНО ПРОВЕРКИ СТАТУСА РЕМОНТА
// ============================================
class RepairStatusModal {
    constructor() {
        this.modal = document.getElementById('check-state-modal');
        this.closeBtn = document.querySelector('.check-state-modal__close');
        this.searchBtn = document.querySelector('.check-state-modal__search-button');
        this.searchInput = document.getElementById('check-state-modal__search-input');
        this.tableBody = document.querySelector('#data-table tbody');
        this.triggerButtons = document.querySelectorAll('[data-modal-target]');
        
        this.init();
    }
    
    init() {
        if (!this.modal) return;
        
        // Открытие через data-modal-target
        this.triggerButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const target = btn.getAttribute('data-modal-target');
                if (target === 'check-state-modal') {
                    this.open();
                }
            });
        });
        
        // Закрытие модального окна
        this.closeBtn?.addEventListener('click', () => this.close());
        
        // Закрытие при клике вне модального окна
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('modal-show')) {
                this.close();
            }
        });
        
        // Поиск по Enter
        this.searchInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchRepair();
            }
        });
        
        // Поиск по кнопке
        this.searchBtn?.addEventListener('click', () => this.searchRepair());
    }
    
    open() {
        if (!this.modal) return;
        
        document.body.style.overflow = 'hidden';
        this.modal.style.display = 'flex';
        this.modal.classList.add('modal-show');
        
        // Очищаем поле и таблицу
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        if (this.tableBody) {
            this.tableBody.innerHTML = '';
        }
        
        this.searchInput?.focus();
    }
    
    close() {
        if (!this.modal) return;
        
        this.modal.classList.add('modal-hide');
        
        setTimeout(() => {
            document.body.style.overflow = 'initial';
            this.modal.classList.remove('modal-show', 'modal-hide');
            this.modal.style.display = 'none';
        }, 200);
    }
    
    showLoading() {
        if (!this.tableBody) return;
        
        this.tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 40px; color: var(--color-primary-light);">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <div style="width: 20px; height: 20px; border: 3px solid var(--color-bg-grey); border-top-color: var(--color-primary-light); border-radius: 50%; animation: rotate 1s linear infinite;"></div>
                        Загрузка...
                    </div>
                </td>
            </tr>
        `;
    }
    
    showError(message) {
        if (!this.tableBody) return;
        
        this.tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 40px; color: #721C24;">
                    ${message}
                </td>
            </tr>
        `;
    }
    
    async searchRepair() {
        const searchInputText = this.searchInput?.value.trim();
        
        if (!searchInputText) {
            this.showError('Введите номер ремонта');
            return;
        }
        
        this.showLoading();
        
        try {
            const response = await fetch(`https://devicedoctors.ru/api/ExternalAccess/${searchInputText}`, {
                headers: {
                    'signature': 'DeviceDoctors',
                }
            });
            
            const json = await response.json();
            
            if (!this.tableBody) return;
            
            this.tableBody.innerHTML = '';
            
            if (json.Status === 'ExternalRequestFailed') {
                const row = document.createElement('tr');
                row.innerHTML = `<td colspan="4" style="text-align: center; padding: 40px; color: #721C24;">${json.UserMessage}</td>`;
                this.tableBody.appendChild(row);
            } else {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="font-weight: 700; color: var(--color-primary-light);">${json.data.id}</td>
                    <td>${json.data.deviceFullName}</td>
                    <td>${this.formatStatus(json.data.status)}</td>
                    <td>${json.data.state}</td>
                `;
                this.tableBody.appendChild(row);
            }
        } catch (err) {
            console.error('Ошибка при запросе:', err);
            this.showError('Произошла ошибка при проверке статуса. Попробуйте позже.');
        }
    }
    
    formatStatus(status) {
        // Можно добавить красивые бейджи для статусов
        const statusMap = {
            'Ожидает': 'status-badge--pending',
            'В работе': 'status-badge--in-progress',
            'Завершен': 'status-badge--completed',
            'Готов': 'status-badge--ready',
            'Готов к выдаче': 'status-badge--ready'
        };
        
        const badgeClass = statusMap[status] || '';
        
        if (badgeClass) {
            return `<span class="status-badge ${badgeClass}">${status}</span>`;
        }
        
        return status;
    }
}

// ============================================
// ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ - ОБНОВЛЕННАЯ ВЕРСИЯ
// Поиск работает по alt И по title
// ============================================

class ImageGallery {
    constructor() {
        this.galleryContainer = document.querySelector('.gallery-grid');
        this.searchInput = document.querySelector('.gallery-search-input');
        this.counterElement = document.querySelector('.gallery-counter');
        this.emptyMessage = document.querySelector('.gallery-empty');
        this.modal = document.querySelector('.gallery-modal');
        this.modalImg = document.querySelector('.gallery-modal-img');
        this.modalTitle = document.querySelector('.gallery-modal-title');
        this.closeBtn = document.querySelector('.gallery-modal-close');
        this.prevBtn = document.querySelector('.gallery-modal-prev');
        this.nextBtn = document.querySelector('.gallery-modal-next');
        
        this.images = [];
        this.filteredImages = [];
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        if (!this.galleryContainer) return;
        
        this.collectImages();
        this.initSearch();
        this.initModal();
        this.updateCounter();
    }
    
    collectImages() {
        const items = this.galleryContainer.querySelectorAll('.gallery-item');
        
        items.forEach((item, index) => {
            const img = item.querySelector('.gallery-item-img');
            
            // Собираем все возможные источники текста для поиска
            const alt = img.getAttribute('alt') || '';
            const title = img.getAttribute('title') || '';
            const dataTitle = img.getAttribute('data-title') || '';
            
            // Объединяем все в одну строку для поиска
            const searchText = `${alt} ${title} ${dataTitle}`.toLowerCase().trim();
            
            // Для отображения используем приоритет: alt > title > data-title > дефолт
            const displayTitle = alt || title || dataTitle || `Изображение ${index + 1}`;
            
            this.images.push({
                element: item,
                img: img,
                searchText: searchText, // ← по этому полю ищем
                titleOriginal: displayTitle, // ← это показываем
                index: index
            });
            
            item.addEventListener('click', () => this.openModal(index));
        });
        
        this.filteredImages = [...this.images];
    }
    
    initSearch() {
        if (!this.searchInput) return;
        
        let searchTimeout;
        
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                this.filterImages(e.target.value);
            }, 300);
        });
        
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.searchInput.value = '';
                this.filterImages('');
            }
        });
    }
    
    filterImages(query) {
        const searchQuery = query.toLowerCase().trim();
        
        if (!searchQuery) {
            this.filteredImages = [...this.images];
            this.images.forEach(item => {
                item.element.classList.remove('hidden');
            });
            this.showEmptyMessage(false);
        } else {
            // Поиск по searchText (который включает и alt, и title)
            this.filteredImages = this.images.filter(item => 
                item.searchText.includes(searchQuery)
            );
            
            this.images.forEach(item => {
                if (item.searchText.includes(searchQuery)) {
                    item.element.classList.remove('hidden');
                } else {
                    item.element.classList.add('hidden');
                }
            });
            
            this.showEmptyMessage(this.filteredImages.length === 0);
        }
        
        this.updateCounter();
    }
    
    showEmptyMessage(show) {
        if (this.emptyMessage) {
            if (show) {
                this.emptyMessage.classList.add('active');
            } else {
                this.emptyMessage.classList.remove('active');
            }
        }
    }
    
    updateCounter() {
        if (this.counterElement) {
            const total = this.images.length;
            const visible = this.filteredImages.length;
            
            if (visible === total) {
                this.counterElement.textContent = `Показано ${total} изображений`;
            } else {
                this.counterElement.textContent = `Найдено ${visible} из ${total} изображений`;
            }
        }
    }
    
    initModal() {
        if (!this.modal) return;
        
        this.closeBtn?.addEventListener('click', () => this.closeModal());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        this.prevBtn?.addEventListener('click', () => this.showPrevious());
        this.nextBtn?.addEventListener('click', () => this.showNext());
        
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                this.closeModal();
            } else if (e.key === 'ArrowLeft') {
                this.showPrevious();
            } else if (e.key === 'ArrowRight') {
                this.showNext();
            }
        });
    }
    
    openModal(index) {
        if (!this.modal) return;
        
        this.currentIndex = index;
        const image = this.images[index];
        
        this.modalImg.src = image.img.src;
        this.modalImg.alt = image.titleOriginal;
        this.modalTitle.textContent = image.titleOriginal;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.updateNavigationButtons();
    }
    
    closeModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    showPrevious() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateModalContent();
    }
    
    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateModalContent();
    }
    
    updateModalContent() {
        const image = this.images[this.currentIndex];
        
        this.modalImg.src = image.img.src;
        this.modalImg.alt = image.titleOriginal;
        this.modalTitle.textContent = image.titleOriginal;
        
        this.updateNavigationButtons();
    }
    
    updateNavigationButtons() {
        // Циклическая навигация - кнопки всегда активны
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
    new ImageGallery();
    // new Modal();
    new CertificateModal();
    new ProcessAccordion(); 
    new ServicesAccordion();

    window.repairStatusModal = new RepairStatusModal();
    // window.contactModal = new ContactModal();
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
