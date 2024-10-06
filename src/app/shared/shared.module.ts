import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketPlaygroundComponent } from "./components/socket-playground/socket-playground.component";
import { SocketUserUnitComponent } from "./components/socket-user-unit/socket-user-unit.component";

@NgModule({
  declarations: [
    SocketPlaygroundComponent,
    SocketUserUnitComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SocketPlaygroundComponent,
    SocketUserUnitComponent
  ]
})
export class SharedModule { }
