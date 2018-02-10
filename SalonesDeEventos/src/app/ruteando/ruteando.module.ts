import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../componentes/login/login.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { ReservarComponent } from '../componentes/reservar/reservar.component';
import { InicioComponent } from '../componentes/inicio/inicio.component';
import { ReservasComponent } from '../componentes/reservas/reservas.component';

const MiRuteo = [
  
  {path: '' , component: InicioComponent},
  {path: 'Login' , component: LoginComponent},
  {path: 'Registro' , component: RegistroComponent},
  {path: 'Reservar' , component: ReservarComponent},
  {path: 'Inicio' , component: InicioComponent},
  {path: 'Reservas' , component: ReservasComponent}
  
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
