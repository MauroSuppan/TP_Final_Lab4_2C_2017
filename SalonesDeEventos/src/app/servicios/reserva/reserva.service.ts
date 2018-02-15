import { Injectable } from '@angular/core';
import {MiHttpService} from '../mi-http/mi-http.service';

@Injectable()
export class ReservaService {

  constructor(private miHtpp:MiHttpService) { }

  ReservarSalon(reserva:any)
  {
   // console.log(reserva);
    return this.miHtpp.ReservarSalon("reservarLocal/",reserva);

  }

  CargarDatosEventos(datos:any)
  {
    return this.miHtpp.CargarDatosEventos("reservas/",datos);
  }

  ListarReservas()
{
  //trae todos los datos de la tabla reservas
  return this.miHtpp.TraerReservas("reservas/");
}

ListarFiestas()
{
  //traer solo la fecha y salon de la fiesta, solo una vez, no repite registros
  return this.miHtpp.ListarFiestas("traerFiestas/");
}

DetallesEvento(datos:any)
{
  //traer los detalles del evento cuando le paso fecha y salon
  return this.miHtpp.DetallesEvento("traerDetallesEvento/",datos);
}

ModificarDatosEventos(id,datos:any)
{
  //modifica un evento que paso por parametro
 // console.log(datos);
  return this.miHtpp.ModificarDatosEventos("reservas/modificar/"+id,datos);
}

EliminarRegistro(id)
{
  return this.miHtpp.EliminarRegistro("reservas/borrar/"+id);
}

TraerFiestaPorSalon(datos:any)
{
  return this.miHtpp.TraerFiestaPorSalon("traerFiestaPorSalon/",datos);
}

}
