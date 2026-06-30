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
    children: [
      {
        path: '',
        loadComponent: () => import('./features/remont-bytovoy-tekhniki/remont-bytovoy-tekhniki').then(m => m.RemontBytovoyTekhniki)
      },
      {
        path: ':slug',
        loadComponent: () => import('./features/remont-bytovoy-tekhniki/device-repair/device-repair').then(m => m.DeviceRepairPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
