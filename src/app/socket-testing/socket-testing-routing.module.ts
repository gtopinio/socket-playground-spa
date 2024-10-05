import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocketPlaygroundComponent } from "../shared/components/socket-playground/socket-playground.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: SocketPlaygroundComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocketTestingRoutingModule { }
