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
<<<<<<< HEAD

CargarEncuesta(datos:any)
{
  return this.miHtpp.CargarEncuesta("cargarEncuesta/",datos);
}


TraerEncuestas()
{
  //trae todos los datos de la tabla reservas
  return this.miHtpp.TraerEncuestas("traerResultadosEncuestas/");
}


verSiRespondioEncuesta(reserva:any)
{
 // console.log(reserva);
  return this.miHtpp.ReservarSalon("verSiRespondioEncuesta/",reserva);

}

EliminarFiesta(datos:any)
{
  //console.log(datos);
  return this.miHtpp.ReservarSalon("eliminarFiesta/",datos);
}

EnviarNuevoInvitado(datos:any)
{
  return this.miHtpp.CargarDatosEventos("reservas/",datos);
}

usuariosQueReservaron()
{
  //trae todos los datos de la tabla reservas
  return this.miHtpp.usuariosQueReservaron("usuariosQueReservaron/");
}


ultimaFiesta()
{
  
  return this.miHtpp.ultimaFiesta("ultimaFiesta/");
}


=======
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28

}
