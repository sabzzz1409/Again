import { Routes } from '@angular/router';

export const page2Routes: Routes = [
  {
    path: 'subpage1',
    loadComponent: () => import('./subpage1/subpage1').then((p) => p.Subpage1),
  },
  {
    path: 'subpage2',
    loadComponent: () => import('./subpage2/subpage2').then((p) => p.Subpage2),
  },
];
