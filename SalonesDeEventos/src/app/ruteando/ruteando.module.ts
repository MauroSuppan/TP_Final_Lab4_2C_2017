import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../componentes/login/login.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { ReservarComponent } from '../componentes/reservar/reservar.component';
import { InicioComponent } from '../componentes/inicio/inicio.component';
import { ReservasComponent } from '../componentes/reservas/reservas.component';
import { InicioEncargadoComponent } from '../componentes/inicio-encargado/inicio-encargado.component';
import { MapaInvitadoComponent } from '../componentes/mapa-invitado/mapa-invitado.component';
import { InvitacionesComponent } from '../componentes/invitaciones/invitaciones.component';
import { EncuestasComponent } from '../componentes/encuestas/encuestas.component';
import { ResultadoEncuestaComponent } from '../componentes/resultado-encuesta/resultado-encuesta.component';
import { InicioEmpleadoComponent } from '../componentes/inicio-empleado/inicio-empleado.component';
import { InformesComponent } from '../componentes/informes/informes.component';

const MiRuteo = [
  
  {path: '' , component: InicioComponent},
  {path: 'Login' , component: LoginComponent},
  {path: 'Registro' , component: RegistroComponent},
  {path: 'Reservar' , component: ReservarComponent},
  {path: 'Inicio' , component: InicioComponent},
  {path: 'Reservas' , component: ReservasComponent},
  {path: 'InicioEncargado' , component: InicioEncargadoComponent},
  {path: 'MapaInvitado' , component: MapaInvitadoComponent},
  {path: 'Invitaciones' , component: InvitacionesComponent},
  {path: 'Encuestas' , component: EncuestasComponent},
  {path: 'ResultadoEncuestas' , component: ResultadoEncuestaComponent},
  {path: 'InicioEmpleado' , component: InicioEmpleadoComponent},
  {path: 'Informes' , component: InformesComponent}
  
  ]


  @NgModule({
    imports: [
      RouterModule.forRoot(MiRuteo)
    ],
    exports: [
      RouterModule
    ]
  })
  export class RuteandoModule { }
