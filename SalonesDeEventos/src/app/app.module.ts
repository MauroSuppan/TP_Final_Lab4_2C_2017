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

import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { NguiMapModule} from '@ngui/map';
import { MapaInvitadoComponent } from './componentes/mapa-invitado/mapa-invitado.component';
import { Location, LocationStrategy } from '@angular/common';
import { InvitacionesComponent } from './componentes/invitaciones/invitaciones.component';
import { EncuestasComponent } from './componentes/encuestas/encuestas.component';
import { ChartsModule } from 'ng2-charts';
import { ResultadoEncuestaComponent } from './componentes/resultado-encuesta/resultado-encuesta.component';
import { InicioEmpleadoComponent } from './componentes/inicio-empleado/inicio-empleado.component';
import { InformesComponent } from './componentes/informes/informes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ReservarComponent,
    ListaDeInvitadosComponent,
    InicioComponent,
    ReservasComponent,
    InicioEncargadoComponent,
    MapaInvitadoComponent,
    InvitacionesComponent,
    EncuestasComponent,
    ResultadoEncuestaComponent,
    InicioEmpleadoComponent,
    InformesComponent
  ],
  imports: [
    BrowserModule,
    RuteandoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAFl-8KlMMV3aelDZs91xpmSOfKmrjEsV4'}),
    ChartsModule
   
  ],
  providers: [WsService,ReservaService,MiHttpService,SweetAlertService,AuthService,Location],
  bootstrap: [AppComponent]
})
export class AppModule { }
