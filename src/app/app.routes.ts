import { Routes } from '@angular/router';
import { authGuard } from './utils/auth-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./layouts/auth/auth').then((c) => c.Auth),
      },
      {
        path: 'main',
        loadComponent: () => import('./layouts/base/base').then((c) => c.Base),
        loadChildren: () => import('./pages/pages.routes').then((r) => r.pagesRoutes),
      },
    ],
  },
];
