/**
 * GALLERY-GENERATOR.JS
 * Вспомогательный скрипт для генерации HTML разметки галереи
 * Использование: запустите в консоли браузера или Node.js
 */

function generateGalleryHTML(count = 170) {
    // Примеры названий устройств для разнообразия
    const devices = [
        'iPhone 14 Pro', 'iPhone 13', 'iPhone 12', 'iPhone 11', 'iPhone XR',
        'Samsung Galaxy S23', 'Samsung Galaxy S22', 'Samsung Galaxy A54', 'Samsung Galaxy Note 20',
        'Xiaomi 13 Pro', 'Xiaomi 12', 'Xiaomi Redmi Note 12', 'Xiaomi Mi 11',
        'MacBook Pro', 'MacBook Air', 'iMac', 'Mac mini',
        'iPad Pro', 'iPad Air', 'iPad mini',
        'Apple Watch Series 8', 'Apple Watch SE',
        'AirPods Pro', 'AirPods 3', 'AirPods Max',
        'Huawei P50', 'Huawei Mate 40', 'Honor 50',
        'Google Pixel 7', 'Google Pixel 6',
        'OnePlus 11', 'OnePlus 10 Pro',
        'Sony Xperia 1', 'Nokia 8.3',
        'Oppo Find X5', 'Vivo X90',
        'Realme GT 3', 'Asus ROG Phone',
        'Lenovo ThinkPad', 'HP Pavilion', 'Dell XPS'
    ];
    
    const repairs = [
        'Ремонт', 'Замена экрана', 'Замена батареи', 'Замена стекла',
        'Чистка от влаги', 'Замена камеры', 'Ремонт разъема зарядки',
        'Замена корпуса', 'Восстановление после падения', 'Замена кнопок'
    ];
    
    const colors = ['00444D', '30676E', '88d4dd', '85f3ff'];
    
    let html = '';
    
    for (let i = 0; i < count; i++) {
        const device = devices[i % devices.length];
        const repair = repairs[i % repairs.length];
        const color = colors[i % colors.length];
        const title = `${repair} ${device}`;
        
        html += `
                <div class="gallery-item">
                    <img src="https://via.placeholder.com/160x100/${color}/FFFFFF?text=${encodeURIComponent(device.replace(/\s+/g, '+'))}" alt="${title}" class="gallery-item-img">
                    <div class="gallery-item-overlay">${title}</div>
                </div>
`;
    }
    
    return html;
}

// Использование:
// console.log(generateGalleryHTML(170));
// Или скопируйте результат и вставьте в HTML

// Для Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = generateGalleryHTML;
}

// Автоматическая генерация при загрузке в браузере
if (typeof window !== 'undefined') {
    console.log('🎨 Генератор галереи загружен!');
    console.log('Используйте: generateGalleryHTML(170)');
}