import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Certificate {
  image: string;
  alt: string;
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.html',
  styleUrl: './certificates.scss'
})
export class Certificates {
  isModalOpen = false;
  currentImage = '';
  currentAlt = '';
  
  private certificates: Certificate[] = [
    {
      image: '/assets/img/certificates/dreme.png',
      alt: 'Сертификат авторизованного сервисного центра Dreame'
    },
    {
      image: '/assets/img/certificates/polaris.png',
      alt: 'Сертификат авторизованного сервисного центра Polaris'
    }
  ];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  openCertificate(index: number): void {
    const cert = this.certificates[index];
    this.currentImage = cert.image;
    this.currentAlt = cert.alt;
    this.isModalOpen = true;
    
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }
  
  closeModal(): void {
    this.isModalOpen = false;
    
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }
}