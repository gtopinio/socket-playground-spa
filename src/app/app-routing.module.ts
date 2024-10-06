import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  { path: '', loadChildren: () => import('./socket-testing/socket-testing.module').then(m => m.SocketTestingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
