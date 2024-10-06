import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SocketTestingModule } from "./socket-testing/socket-testing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    SocketTestingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
