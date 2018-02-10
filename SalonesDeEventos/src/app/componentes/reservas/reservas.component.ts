import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReservaService } from  '../../servicios/reserva/reserva.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  reservas: Array<any>;
  reservasAux: Array<any>;
  usuario;
  constructor(private route: ActivatedRoute,private router: Router, private reservaServ:ReservaService) {

    this.usuario= this.usuario=localStorage.getItem("usuario");
    this.TraerReservas();
   }

  ngOnInit() {
    if(this.usuario==null || this.usuario=="" )
      {
  this.router.navigateByUrl("/Login");
      }
   
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
     
      return data.organizador ==localStorage.getItem("usuario");
    });
    
  }




  cerrarSesion()
  {
    localStorage.clear();
    alert("usted se ha deslogueado correctamente");
    this.router.navigateByUrl("/Inicio");
  }

}
