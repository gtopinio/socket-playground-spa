import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketPlaygroundComponent } from "./components/socket-playground/socket-playground.component";
import { SocketUserUnitComponent } from "./components/socket-user-unit/socket-user-unit.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    SocketPlaygroundComponent,
    SocketUserUnitComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    SocketPlaygroundComponent,
    SocketUserUnitComponent
  ]
})
export class SharedModule { }
