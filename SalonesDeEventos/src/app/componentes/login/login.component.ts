import { Component, OnInit } from '@angular/core';
import {WsService} from '../../servicios/ws/ws.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SweetAlertService } from 'angular-sweetalert-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario;
  clave;



  constructor(private ws: WsService,private router: Router,public alertService: SweetAlertService) { }

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
      console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', data.datos.usuario);
<<<<<<< HEAD
      localStorage.setItem('dni', data.datos.dni);
=======
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28
          
    }
    else
      {
        if(data.error=="no es usuario valido")
          {
            let error = {
              title: 'Error de usuario y contraseña!',
              text: "Reingrese datos",
<<<<<<< HEAD
              type: 'error',
=======
              type: 'warning',
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            };
            this.alertService.alert(error);
          }
          if(data.error=="Faltan los datos del usuario y su clave")
            {
              let error = {
                title: 'Error!',
                text: "Ingrese todos los campos",
                type: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
              };
              this.alertService.alert(error);
            }
      }

      //redireccion a inicios
<<<<<<< HEAD
      if(data.datos.rol=='')
=======
      if(data.datos.rol=='cliente')
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28
        {
          if(localStorage.getItem("salon")!=null)
            {
          this.router.navigateByUrl("/Reservar");
            }
            else{
              this.router.navigateByUrl("/Inicio");
            }
        }

        if(data.datos.rol=='encargado')
          {
            /*if(localStorage.getItem("salon")!=null)
              {
            this.router.navigateByUrl("/Reservar");
              }*/
            this.router.navigateByUrl("/InicioEncargado");
              
          }

<<<<<<< HEAD
          if(data.datos.rol=='empleado')
            {
              /*if(localStorage.getItem("salon")!=null)
                {
              this.router.navigateByUrl("/Reservar");
                }*/
              this.router.navigateByUrl("/InicioEmpleado");
                
            }

=======
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28
  })
  .catch( e => {
    console.info(e);
  } );

  }
  else
    {
      let error = {
        title: 'Error!',
        text: "Ingrese todos los campos",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      };
      this.alertService.alert(error);
    }
 //cierre if



  }
  loguearseComo(persona)
  {
    if(persona=="Cliente")
      {
        this.usuario="mauro11";
        this.clave="1234";
      }

      if(persona=="Encargado")
        {
          this.usuario="pepe11";
          this.clave="1234";
        }
        if(persona=="Empleado")
          {
            this.usuario="franco11";
            this.clave="1234";
          }
  }



}
