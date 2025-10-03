/**
 * MOBILE-MENU.JS
 * Управление мобильным меню
 */

class MobileMenu {
    constructor() {
        this.menuBtn = document.querySelector('.mobile-menu-btn');
        this.nav = document.querySelector('.nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        if (!this.menuBtn || !this.nav) return;
        
        // Открытие/закрытие меню
        this.menuBtn.addEventListener('click', () => this.toggleMenu());
        
        // Закрытие при клике на ссылку
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target) && !this.menuBtn.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Закрытие при изменении размера окна
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.menuBtn.classList.toggle('active');
        this.nav.classList.toggle('active');
        
        // Блокировка прокрутки при открытом меню
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

// Экспорт для использования в main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileMenu;
}