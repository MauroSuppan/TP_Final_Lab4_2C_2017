import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {WsService} from '../../servicios/ws/ws.service';
import { Usuario } from '../../Clases/Usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router, private ws: WsService) { 
   
    this.unUsuario= new Usuario();

  }

  ngOnInit() {
  }

  nombre: string;
  usuario:string;
  clave: string;
  correo: string;
  claveRep: string;
  unUsuario:Usuario;

  Registrar()
  {
    //console.log(this.nombre+ this.usuario+this.clave+this.correo+this.claveRep);
   
    if( this.nombre &&  this.usuario && this.clave && this.correo && this.claveRep )
      {
    
        if(this.clave == this.claveRep)
          {
            this.unUsuario.nombre=this.nombre;
            this.unUsuario.usuario=this.usuario;
            this.unUsuario.clave= this.clave;
            this.unUsuario.correo=this.correo;
            
    this.ws.altaUsuario( {
      datosUsuario: {
        nombre: this.unUsuario.nombre,
        usuario: this.unUsuario.usuario,
        clave: this.unUsuario.clave,
        correo: this.unUsuario.correo

       
    }} )
  .then( data => {
    alert("usted se registro correctamente");
    this.router.navigate(['/Login']);
 
  })
  .catch( e => {
    console.info(e);
  } );
    

      }
      else
        {
          alert("Las claves ingresadas no son iguales");
        }
    
    }
    else
      {
        alert("Ingrese todos los campos");
      }


  }


}
