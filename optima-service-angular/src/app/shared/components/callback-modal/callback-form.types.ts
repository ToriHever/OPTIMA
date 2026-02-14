export type FormPurpose =
  | 'diagnostic'   // Вызов мастера (полная форма)
  | 'callback'     // Заказать звонок (минимум полей)
  | 'question';    // Задать вопрос

export type FormField =
  | 'name'
  | 'phone'
  | 'email'
  | 'deviceType'
  | 'address'
  | 'message';

export interface CallbackFormConfig {
  title: string;
  subtitle: string;
  submitText: string;
  fields: FormField[];
}