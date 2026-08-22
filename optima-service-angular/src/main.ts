import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    // Успешный старт — снимаем флаг «уже пробовали перезагрузиться из-за
    // сбоя загрузки чанка» (см. index.html), чтобы следующий сбой (в другой
    // сессии/вкладке) тоже получил свою одну попытку авто-восстановления.
    try { sessionStorage.removeItem('chunkRetry'); } catch (_) {}
  })
  .catch((err) => console.error(err));