import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./socket-testing/socket-testing.module').then(m => m.SocketTestingModule) },
];
