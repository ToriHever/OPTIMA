/**
 * HERO-PARALLAX.JS
 * Эффект движения фона при наведении мыши
 */

class HeroParallax {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.intensity = 15; // Интенсивность движения (в пикселях)
        this.init();
    }
    
    init() {
        if (!this.hero) return;
        
        // Добавляем transition для плавности
        this.addStyles();
        
        // Обработчик движения мыши
        this.hero.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Возврат в исходное положение при уходе мыши
        this.hero.addEventListener('mouseleave', () => this.resetPosition());
        
        console.log('Hero parallax initialized');
    }
    
    addStyles() {
        // Добавляем плавный переход для фона
        const style = document.createElement('style');
        style.textContent = `
            .hero::before {
                transition: transform 0.3s ease-out;
            }
        `;
        document.head.appendChild(style);
    }
    
    handleMouseMove(e) {
        // Получаем размеры hero блока
        const rect = this.hero.getBoundingClientRect();
        
        // Вычисляем позицию мыши относительно центра блока (от -1 до 1)
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Вычисляем смещение (умножаем на интенсивность)
        const moveX = x * this.intensity;
        const moveY = y * this.intensity;
        
        // Применяем трансформацию к фоновому изображению
        this.hero.style.setProperty('--parallax-x', `${moveX}px`);
        this.hero.style.setProperty('--parallax-y', `${moveY}px`);
    }
    
    resetPosition() {
        // Возвращаем фон в исходное положение
        this.hero.style.setProperty('--parallax-x', '0px');
        this.hero.style.setProperty('--parallax-y', '0px');
    }
}

// Экспорт для использования в main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroParallax;
}