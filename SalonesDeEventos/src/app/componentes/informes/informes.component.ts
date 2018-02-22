import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReservaService } from  '../../servicios/reserva/reserva.service';
import {AuthService} from '../../servicios/auth/auth.service';
import { SweetAlertService } from 'angular-sweetalert-service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
 
  usuarioReservas;
  ultimaFiesta;

  constructor(private route: ActivatedRoute,private router: Router, private reservaServ:ReservaService,private auth:AuthService,public alertService: SweetAlertService) {


   }

  ngOnInit() {

this.usuariosQueReservaron(); 


    document.getElementById("pagina").style.display = 'none';
    document.getElementById("spinner").style.display = 'block';
    setTimeout(function(){
      document.getElementById("spinner").style.display = 'none';
      document.getElementById("pagina").style.display = 'block';
     
      }, 3000);


  }


  usuariosQueReservaron()
  {
    //PARA EL CLIENTE
    this.reservaServ.usuariosQueReservaron().then(datos=>{this.usuarioReservas=datos;});
   this.reservaServ.usuariosQueReservaron().then(datos=>console.log(datos));


  }


  ultimaFiestaLista()
  {
    //PARA EL CLIENTE
    this.reservaServ.ultimaFiesta().then(datos=>{this.ultimaFiesta=datos;});
   this.reservaServ.ultimaFiesta().then(datos=>console.log(datos));


  }

}
