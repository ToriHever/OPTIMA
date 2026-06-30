import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.Home)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then(m => m.About)
  },
  {
    path: 'remont-bytovoy-tekhniki',
    loadComponent: () => import('./features/remont-bytovoy-tekhniki/remont-bytovoy-tekhniki').then(m => m.RemontBytovoyTekhniki)
  },
  {
    path: '**',
    redirectTo: ''
  }
];