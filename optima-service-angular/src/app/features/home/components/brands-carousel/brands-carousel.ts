import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Brand {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-brands-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands-carousel.html',
  styleUrl: './brands-carousel.scss'
})
export class BrandsCarousel implements OnInit {
  isPaused = false;
  isVisible = false;
  
  brands: Brand[] = [
    { name: 'Krups', logo: 'assets/img/brands/Krups.png' },
    { name: 'Lenovo', logo: 'assets/img/brands/Lenovo.png' },
    { name: 'LG', logo: 'assets/img/brands/LG.png' },
    { name: 'Mamibot', logo: 'assets/img/brands/Mamibot.png' },
    { name: 'Midea', logo: 'assets/img/brands/Midea.png' },
    { name: 'MSI', logo: 'assets/img/brands/MSI.png' },
    { name: 'Nivona', logo: 'assets/img/brands/Nivona.png' },
    { name: 'Philips', logo: 'assets/img/brands/Philips.png' },
    { name: 'Polaris', logo: 'assets/img/brands/Polaris.png' },
    { name: 'Redmond', logo: 'assets/img/brands/Redmond.png' },
    { name: 'Roborock', logo: 'assets/img/brands/Roborock.png' },
    { name: 'Saeco', logo: 'assets/img/brands/Saeco.png' },
    { name: 'Samsung', logo: 'assets/img/brands/Samsung.png' },
    { name: 'Sharp', logo: 'assets/img/brands/Sharp.png' },
    { name: 'Sony', logo: 'assets/img/brands/Sony.png' },
    { name: 'TCL', logo: 'assets/img/brands/TCL.png' },
    { name: 'Tefal', logo: 'assets/img/brands/Tefal.png' },
    { name: 'Trouver', logo: 'assets/img/brands/Trouver.png' },
    { name: 'Xiaomi', logo: 'assets/img/brands/Xiaomi.png' },
    { name: '360 Robot', logo: 'assets/img/brands/360 Robot.png' },
    { name: 'Acer', logo: 'assets/img/brands/Acer.png' },
    { name: 'Apple', logo: 'assets/img/brands/Apple.png' },
    { name: 'Asus', logo: 'assets/img/brands/Asus.png' },
    { name: 'Atvel', logo: 'assets/img/brands/Atvel.png' },
    { name: 'BBK', logo: 'assets/img/brands/BBK.png' },
    { name: 'Bork', logo: 'assets/img/brands/Bork.png' },
    { name: 'Bosch', logo: 'assets/img/brands/Bosch.png' },
    { name: 'Dell', logo: 'assets/img/brands/Dell.png' },
    { name: 'DeLonghi', logo: 'assets/img/brands/DeLonghi.png' },
    { name: 'DEXP', logo: 'assets/img/brands/DEXP.png' },
    { name: 'Dreame', logo: 'assets/img/brands/Dreame.png' },
    { name: 'Dyson', logo: 'assets/img/brands/Dyson.png' },
    { name: 'Ecovacs', logo: 'assets/img/brands/Ecovacs.png' },
    { name: 'Haier', logo: 'assets/img/brands/Haier.png' },
    { name: 'Hisense', logo: 'assets/img/brands/Hisense.png' },
    { name: 'HONOR', logo: 'assets/img/brands/HONOR.png' },
    { name: 'Huawei', logo: 'assets/img/brands/Huawei.png' },
    { name: 'iRobot', logo: 'assets/img/brands/iRobot.png' },
    { name: 'Jura', logo: 'assets/img/brands/Jura.png' },
    { name: 'Kitfort', logo: 'assets/img/brands/Kitfort.png' }
];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  ngOnInit(): void {
    // Проверяем видимость только в браузере
    if (isPlatformBrowser(this.platformId)) {
      this.checkVisibility();
    }
  }
  
  /**
   * Проверка видимости для анимации статистики
   */
  @HostListener('window:scroll')
  checkVisibility(): void {
    // Проверяем что код выполняется в браузере
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const element = document.querySelector('.brands-stats');
    if (element) {
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewport && !this.isVisible) {
        this.isVisible = true;
      }
    }
  }
  
  /**
   * Пауза карусели при наведении
   */
  pauseCarousel(): void {
    this.isPaused = true;
  }
  
  /**
   * Возобновление карусели
   */
  resumeCarousel(): void {
    this.isPaused = false;
  }
}