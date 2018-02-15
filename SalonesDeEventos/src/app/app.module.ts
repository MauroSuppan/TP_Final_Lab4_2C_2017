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
import { ReservarComponent } from './componentes/reservar/reservar.component';
import {ReservaService} from './servicios/reserva/reserva.service';
import {MiHttpService} from './servicios/mi-http/mi-http.service';
import { ListaDeInvitadosComponent } from './componentes/lista-de-invitados/lista-de-invitados.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ReservasComponent } from './componentes/reservas/reservas.component';
import { SweetAlertService } from 'angular-sweetalert-service';
import { InicioEncargadoComponent } from './componentes/inicio-encargado/inicio-encargado.component';
import {AuthService} from './servicios/auth/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ReservarComponent,
    ListaDeInvitadosComponent,
    InicioComponent,
    ReservasComponent,
    InicioEncargadoComponent
  ],
  imports: [
    BrowserModule,
    RuteandoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
   
  ],
  providers: [WsService,ReservaService,MiHttpService,SweetAlertService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
