import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface EmailData {
  from_name: string;
  phone: string;
  device_type: string;
  message?: string;
  address?: string;
  preferred_time?: string;
  request_type?: string; // Тип заявки: "Вызов мастера", "Заказать звонок", "Задать вопрос"
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // EmailJS конфигурация
  private serviceId = 'service_hmo3gog';
  private templateId = 'template_2ws5lqa';
  private publicKey = 'r_HWX02KYNeDxq5jd';

  /**
   * Отправка email через EmailJS
   */
  async sendCallbackRequest(data: EmailData): Promise<void> {
    try {
      const templateParams = {
        from_name: data.from_name,
        phone: data.phone,
        device_type: this.getDeviceTypeText(data.device_type),
        message: data.message || 'Не указано',
        address: data.address || 'Не указан',
        preferred_time: this.getPreferredTimeText(data.preferred_time),
        request_type: data.request_type || 'Обычная заявка',
        to_email: 'vika.miroshnikova2016@gmail.com' // Email получателя
      };

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams,
        this.publicKey
      );

      console.log('Email sent successfully:', response);
      return Promise.resolve();
    } catch (error) {
      console.error('Email send error:', error);
      throw error;
    }
  }

  /**
   * Преобразование типа техники в читаемый текст
   */
  private getDeviceTypeText(type: string): string {
    const types: { [key: string]: string } = {
      'fridge': 'Холодильник',
      'washing': 'Стиральная машина',
      'dishwasher': 'Посудомоечная машина',
      'cooktop': 'Варочная панель',
      'oven': 'Духовой шкаф',
      'coffee': 'Кофемашина',
      'other': 'Другое'
    };
    return types[type] || type;
  }

  /**
   * Преобразование времени в читаемый текст
   */
  private getPreferredTimeText(time?: string): string {
    if (!time) return 'Любое время';
    
    const times: { [key: string]: string } = {
      'morning': 'Утро (9:00 - 12:00)',
      'afternoon': 'День (12:00 - 15:00)',
      'evening': 'Вечер (15:00 - 18:00)'
    };
    return times[time] || time;
  }
}