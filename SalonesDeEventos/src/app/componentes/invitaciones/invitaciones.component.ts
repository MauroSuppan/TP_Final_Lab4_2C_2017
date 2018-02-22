import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReservaService } from  '../../servicios/reserva/reserva.service';
import {AuthService} from '../../servicios/auth/auth.service';
import { SweetAlertService } from 'angular-sweetalert-service';

@Component({
  selector: 'app-invitaciones',
  templateUrl: './invitaciones.component.html',
  styleUrls: ['./invitaciones.component.css']
})
export class InvitacionesComponent implements OnInit {

  reservas: Array<any>;
  reservasAux: Array<any>;
  usuario;
  constructor(private route: ActivatedRoute,private router: Router, private reservaServ:ReservaService,private auth:AuthService,public alertService: SweetAlertService) { 

    this.usuario= this.usuario=localStorage.getItem("usuario");
    this.TraerReservas();

  }

  ngOnInit() {

    if(this.usuario==null || this.usuario=="" )
      {
  this.router.navigateByUrl("/Login");
      }

    let token = this.auth.decodificarToken();

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

      document.getElementById("pagina").style.display = 'none';
      document.getElementById("spinner").style.display = 'block';
      setTimeout(function(){
        document.getElementById("spinner").style.display = 'none';
        document.getElementById("pagina").style.display = 'block';
       
        }, 3000);
  }

  TraerReservas()
  {
    //PARA EL CLIENTE
    this.reservaServ.ListarReservas().then(datos=>{this.reservasAux=datos; this.MisReservas()});
   this.reservaServ.ListarReservas().then(datos=>console.log(datos));


  }

  MisReservas()
  {
    this.reservas=this.reservasAux.filter(function(data)
    {
      
      //data tiene las propiedades de  listadoParaCompartir
     
      //return data.dni_invitado ==localStorage.getItem("dniUsuario");
      return data.dni_invitado ==localStorage.getItem('dni');
    });
    
  }

  redireccionarMapa(item)
  {
    console.log(item.id_salon);
localStorage.setItem('invitacion_id_salon',item.id_salon);
localStorage.setItem('invitacion_fecha',item.fecha);
localStorage.setItem('invitacion_mesa',item.id_mesa);
  this.router.navigateByUrl("/MapaInvitado");
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
