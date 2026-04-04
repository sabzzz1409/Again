import { Routes } from '@angular/router';

export const pagesRoutes: Routes = [
  {
    path: 'page1',
    loadChildren: () => import('./page1/page1.routes').then((r) => r.page1Routes),
  },
  {
    path: 'page2',
    loadChildren: () => import('./page2/page2.routes').then((r) => r.page2Routes),
  },
];
