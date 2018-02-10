import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MiHttpService {

  serv= "http://localhost/apiFinal/";
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



  ManejadorDeError(error:Response|any){
    return error;
  }
  ExtraerDatos(respuesta:Response){
    return respuesta.json()||{};
  }



}
