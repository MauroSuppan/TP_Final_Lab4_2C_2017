import { Injectable } from '@angular/core';
import {MiHttpService} from '../mi-http/mi-http.service';

@Injectable()
export class ReservaService {

  constructor(private miHtpp:MiHttpService) { }

  ReservarSalon(reserva:any)
  {
    return this.miHtpp.ReservarSalon("reservarLocal/",reserva);

  }

  CargarDatosEventos(datos:any)
  {
    return this.miHtpp.CargarDatosEventos("reservas/",datos);
  }

  ListarReservas()
{
  return this.miHtpp.TraerReservas("reservas/");
}


}
