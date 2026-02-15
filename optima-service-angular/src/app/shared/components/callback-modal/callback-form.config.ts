import { CallbackFormConfig, FormPurpose } from './callback-form.types';

export const CALLBACK_FORM_CONFIGS: Record<FormPurpose, CallbackFormConfig> = {
  // Полная форма для вызова мастера
  diagnostic: {
    title: 'Вызвать мастера',
    subtitle: 'Оставьте заявку на вызов мастера, и мы свяжемся с вами в течение 15 минут',
    submitText: 'Отправить заявку',
    fields: ['name', 'phone', 'deviceType', 'address', 'message']
  },

  // Минимальная форма для звонка
  callback: {
    title: 'Заказать звонок',
    subtitle: 'Мы перезвоним в ближайшее время',
    submitText: 'Жду звонка',
    fields: ['name', 'phone']
  },

  // Форма для вопроса
  question: {
    title: 'Задать вопрос',
    subtitle: 'Напишите ваш вопрос, и мы ответим.',
    submitText: 'Отправить вопрос',
    fields: ['name', 'phone', 'email', 'message']
  }
};