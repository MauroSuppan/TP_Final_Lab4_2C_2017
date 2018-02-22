import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MiHttpService {

  //esto es para laburar local
  //serv= "http://localhost/apiFinal/";
  serv="https://suppaneventos.000webhostapp.com/apiFinal/";
  constructor(public http:Http) { }

  ReservarSalon(rutaApi:string,reserva:any)
  {
    return this.http.post(this.serv+rutaApi,reserva)
    .toPromise().then(this.ExtraerDatos).catch(this.ManejadorDeError);
  }

  CargarDatosEventos(rutaApi:string,datos:any)
  {
    return this.http.post(this.serv+rutaApi,datos)
    .toPromise().then(this.ExtraerDatos).catch(this.ManejadorDeError);
  }

  TraerReservas(rutaApi:string)
  {
    return this.http.get(this.serv+rutaApi)
    .toPromise().then(this.ExtraerDatos).catch(this.ManejadorDeError);
  }

  ListarFiestas(rutaApi:string)
  {
    return this.http.get(this.serv+rutaApi)
    .toPromise().then(this.ExtraerDatos).catch(this.ManejadorDeError);
  }

  DetallesEvento(rutaApi:string,datos:any)
  {
    return this.http.post(this.serv+rutaApi,datos)
    .toPromise().then(this.ExtraerDatos).catch(this.ManejadorDeError);
  }

  ModificarDatosEventos(rutaApi:string,datos:any)
  {
    return this.http.post(this.serv+rutaApi,datos)
    .toPromise().then(this.ExtraerDatos).catch(this.ManejadorDeError);
  }


  EliminarRegistro(rutaApi:string)
  {
    //cambie delete por get
    return this.http.get(this.serv+rutaApi)
    .toPromise().then(this.ExtraerDatos).catch(this.ManejadorDeError);
  }


  TraerFiestaPorSalon(rutaApi:string,datos:any)
{
  //console.log(id_salon);
  return this.http.post(this.serv+rutaApi,datos)
  .toPromise().then(this.ExtraerDatos).catch(this.ManejadorDeError); 
}

CargarEncuesta(rutaApi:string,datos:any)
{
  return this.http.post(this.serv+rutaApi,datos)
  .toPromise().then(this.ExtraerDatos).catch(this.ManejadorDeError);
}

TraerEncuestas(rutaApi:string)
{
  return this.http.get(this.serv+rutaApi)
  .toPromise().then(this.ExtraerDatos).catch(this.ManejadorDeError);
}


verSiRespondioEncuesta(rutaApi:string,reserva:any)
{
  return this.http.post(this.serv+rutaApi,reserva)
  .toPromise().then(this.ExtraerDatos).catch(this.ManejadorDeError);
}


  ManejadorDeError(error:Response|any){
    return error;
  }
  ExtraerDatos(respuesta:Response){
    return respuesta.json()||{};
  }

  EliminarFiesta(rutaApi:string,datos:any)
  {
    console.log(datos);
    return this.http.post(this.serv+rutaApi,datos)
    .toPromise().then(this.ExtraerDatos).catch(this.ManejadorDeError);
  }


  
  usuariosQueReservaron(rutaApi:string)
  {
    return this.http.get(this.serv+rutaApi)
    .toPromise().then(this.ExtraerDatos).catch(this.ManejadorDeError);
  }

  
  ultimaFiesta(rutaApi:string)
  {
    return this.http.get(this.serv+rutaApi)
    .toPromise().then(this.ExtraerDatos).catch(this.ManejadorDeError);
  }

}
