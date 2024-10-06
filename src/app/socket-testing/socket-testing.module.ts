import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketTestingRoutingModule } from './socket-testing-routing.module';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    SocketTestingRoutingModule
  ]
})
export class SocketTestingModule { }
