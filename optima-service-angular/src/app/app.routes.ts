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
    path: 'prices',
    loadComponent: () => import('./features/prices/prices').then(m => m.Prices)
  },
  {
    path: 'contacts',
    loadComponent: () => import('./features/contacts/contacts').then(m => m.Contacts)
  },
  {
    path: 'brands',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/brands/brands').then(m => m.Brands)
      },
      {
        path: ':slug',
        loadComponent: () => import('./features/brands/brand-hub/brand-hub').then(m => m.BrandHubPage)
      }
    ]
  },
  {
    path: 'masters',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/masters/masters-list/masters-list').then(m => m.MastersList)
      },
      {
        path: ':slug',
        loadComponent: () => import('./features/masters/master-detail/master-detail').then(m => m.MasterDetail)
      }
    ]
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
            children: [
              {
                path: '',
                data: { section: 'computers', backPath: '/remont-kompyuterov' },
                loadComponent: () => import('./features/remont-bytovoy-tekhniki/brand-repair/brand-repair').then(m => m.BrandRepairPage)
              },
              {
                path: ':model',
                data: { section: 'computers', backPath: '/remont-kompyuterov' },
                loadComponent: () => import('./features/remont-bytovoy-tekhniki/brand-repair/brand-repair').then(m => m.BrandRepairPage)
              }
            ]
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
