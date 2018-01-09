import { Component, OnInit } from '@angular/core';
import {WsService} from '../../servicios/ws/ws.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario;
  clave;

  constructor(private ws: WsService,private router: Router) { }

  ngOnInit() {
  }

  logearse()
  {
   //console.log(this.usuario + this.clave);

   
    if( this.usuario &&  this.clave )
      {
    
    this.ws.post( {
      datosLogin: {
        usuario: this.usuario,
        clave: this.clave
       
    }} )
  .then( data => {
    console.info("data>>>",data);
    if ( data.token )
    {
      localStorage.setItem('token', data.token);
     // this.router.navigateByUrl("/pagina2");
     //this.mostrarLogin=false;
    // this.mostrarTabla= true;
      
   
    }
    else
      {
        if(data.error=="no es usuario valido")
          {
            alert("Usuario incorrecto. Reigrese!");
          }
          if(data.error=="Faltan los datos del usuario y su clave")
            {
              alert("Ingrese todos los campos");
            }
      }
  })
  .catch( e => {
    console.info(e);
  } );

  }
  else
    {
      alert("ingrese todos los campos");
    }
 //cierre if



  }



}
