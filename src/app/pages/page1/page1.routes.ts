import { Routes } from '@angular/router';

export const page1Routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./page1/page1').then((p) => p.Page1),
  },
];
