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
        children: [
          {
            path: '',
            loadComponent: () => import('./features/remont-bytovoy-tekhniki/device-repair/device-repair').then(m => m.DeviceRepairPage)
          },
          {
            path: ':brand',
            loadComponent: () => import('./features/remont-bytovoy-tekhniki/brand-repair/brand-repair').then(m => m.BrandRepairPage)
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
