import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReservaService } from  '../../servicios/reserva/reserva.service';
import { SweetAlertService } from 'angular-sweetalert-service';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {AuthService} from '../../servicios/auth/auth.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {

  estetica="";
  comida="";
  bebida="";
  musica="";
  ubicacion="";
  vajilla="";
  mozos="";
  estacionamiento="";
  salon;
  fecha;
  usuario;

  constructor(private route: ActivatedRoute,private router: Router, private reservaServ:ReservaService,public alertService: SweetAlertService,private builder: FormBuilder,private auth:AuthService,) {
    this.usuario=localStorage.getItem("usuario");
  }


  ngOnInit() {

    if(this.usuario==null || this.usuario=="" )
      {
  this.router.navigateByUrl("/Login");
      }

    let token = this.auth.decodificarToken();
    //console.log(token);
   // console.log("usuarioooo: "+token.data.usuario);
   //console.log("roll: "+token.data.rol);

    if(token.data.rol!="")
      {
        let error = {
          title: 'Error de permiso',
          text: "Usted no es cliente",
          type: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        };
        this.alertService.alert(error);

        this.router.navigateByUrl("/Login");
      }
    if(localStorage.getItem('idSalonParacargarEncuesta')=="1")
      {
        this.salon="Cairel";
      }
      if(localStorage.getItem('idSalonParacargarEncuesta')=="2")
        {
          this.salon="Portal Mágico";
        }
        if(localStorage.getItem('idSalonParacargarEncuesta')=="3")
          {
            this.salon="Quinta Casabonna";
          }

          this.fecha=localStorage.getItem('fechaParacargarEncuesta');


  }


  Enviar()
  {
    if(
      this.estetica==""||
      this.comida==""||
      this.bebida==""||
      this.musica==""||
      this.ubicacion==""||
      this.vajilla==""||
      this.mozos==""||
      this.estacionamiento==""
    )
    {
      const exito = {
        title: 'Error!',
        text: "Ingrese todos los campos",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Listo'
      };
      this.alertService.alert(exito);
      return;
    }
    else
      {

        this.reservaServ.CargarEncuesta({
          datos: {
            usuario: localStorage.getItem('usuario'),
  
            id_salon: localStorage.getItem('idSalonParacargarEncuesta'),
            fecha: this.fecha,
            estetica:this.estetica ,
            comida:this.comida,
            bebida:this.bebida,
            musica:this.musica,
            ubicacion:this.ubicacion,
            vajilla:this.vajilla,
            mozos:this.mozos,
            estacionamiento:this.estacionamiento,
            respondio: 'true'
           
        }}).then(datos=>
        {
          const exito = {
            title: 'Exito!',
            text: "Gracias por responder!",
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Listo'
          };
          this.alertService.success(exito);
          this.router.navigateByUrl("/Reservas");
        });

      }
  }

  cerrarSesion()
  {
    localStorage.clear();
    const exito = {
      title: 'Exito!',
      text: "usted se ha deslogueado correctamente",
      type: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Listo'
    };
    this.alertService.success(exito);
    this.router.navigateByUrl("/Inicio");
  }

}
