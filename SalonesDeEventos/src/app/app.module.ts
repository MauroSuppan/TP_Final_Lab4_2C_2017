import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RuteandoModule } from './ruteando/ruteando.module';

import {WsService} from './servicios/ws/ws.service';
import { HttpModule } from '@angular/http';
import { RegistroComponent } from './componentes/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    RuteandoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [WsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
