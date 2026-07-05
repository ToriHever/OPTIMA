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
            data: { section: 'appliances', backPath: '/remont-bytovoy-tekhniki' },
            loadComponent: () => import('./features/remont-bytovoy-tekhniki/device-repair/device-repair').then(m => m.DeviceRepairPage)
          },
          {
            path: ':brand',
            data: { section: 'appliances', backPath: '/remont-bytovoy-tekhniki' },
            loadComponent: () => import('./features/remont-bytovoy-tekhniki/brand-repair/brand-repair').then(m => m.BrandRepairPage)
          }
        ]
      }
    ]
  },
  {
    path: 'remont-kompyuterov',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/remont-kompyuterov/remont-kompyuterov').then(m => m.RemontKompyuterov)
      },
      {
        path: ':slug',
        children: [
          {
            path: '',
            data: { section: 'computers', backPath: '/remont-kompyuterov' },
            loadComponent: () => import('./features/remont-bytovoy-tekhniki/device-repair/device-repair').then(m => m.DeviceRepairPage)
          },
          {
            path: ':brand',
            data: { section: 'computers', backPath: '/remont-kompyuterov' },
            loadComponent: () => import('./features/remont-bytovoy-tekhniki/brand-repair/brand-repair').then(m => m.BrandRepairPage)
          }
        ]
      }
    ]
  },
  {
    path: 'remont-audiovideo',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/remont-audiovideo/remont-audiovideo').then(m => m.RemontAudiovideo)
      },
      {
        path: ':slug',
        children: [
          {
            path: '',
            data: { section: 'av', backPath: '/remont-audiovideo' },
            loadComponent: () => import('./features/remont-bytovoy-tekhniki/device-repair/device-repair').then(m => m.DeviceRepairPage)
          },
          {
            path: ':brand',
            data: { section: 'av', backPath: '/remont-audiovideo' },
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
