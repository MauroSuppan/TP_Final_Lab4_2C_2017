import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReservaService } from  '../../servicios/reserva/reserva.service';
import {AuthService} from '../../servicios/auth/auth.service';
import { SweetAlertService } from 'angular-sweetalert-service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  reservas: Array<any>;
  reservasAux: Array<any>;
  usuario;
  detallesEvento: Array<any>;
  fecha;
  id_salon;
  salon;

  fechaActual;
  fechaActualFormato;
 
  constructor(private route: ActivatedRoute,private router: Router, private reservaServ:ReservaService,private auth:AuthService,public alertService: SweetAlertService) {

    this.usuario= this.usuario=localStorage.getItem("usuario");

    this.fechaActual=new Date();
    //var f = new Date();
    //console.log(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
   // console.log(f.getFullYear() + "-" + (f.getMonth() +1)+ "-" +f.getDate());
   this.fechaActualFormato=(this.fechaActual.getFullYear() + "-" + (this.fechaActual.getMonth() +1)+ "-" +this.fechaActual.getDate());
    console.log(this.fechaActualFormato);
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
            
            

      this.TraerReservas();

    

  }

  TraerReservas()
  {
    //PARA EL CLIENTE
   document.getElementById("eventos").style.display = 'block';
    document.getElementById("detallesDeEvento").style.display = 'none';
    this.reservaServ.ListarFiestas().then(datos=>{this.reservasAux=datos; this.MisReservas()});
  // this.reservaServ.ListarFiestas().then(datos=>console.log(datos));

 

  }

  MisReservas()
  {
    this.reservas=this.reservasAux.filter(function(data)
    {
      
     
      return data.organizador ==localStorage.getItem("usuario");
    });
    console.log(this.reservas);

    
    for (let i = 0; i < this.reservas.length; i++) 
    {
    if(new Date(this.fechaActualFormato).getTime()>new Date(this.reservas[i].fecha).getTime())
      {
        //tiene que mostrar la encuesta porque ya termino la fiesta
        //alert("algo paso");
        //tengo que buscar en la tabla encuetas haber si ya contesto y si no lo hizo redirecciono
        this.reservaServ.verSiRespondioEncuesta({
          datos: {
            fecha: this.reservas[i].fecha,
            id_salon: this.reservas[i].id_salon,
            usuario:this.reservas[i].organizador
        
           
        }}).then(datos=>
        {
        if(datos.mensaje=="noRespondio")
          {
            let error = {
              title: 'Responda encuesta',
              text: "Usted tiene encuestas sin responder. Por favor responda!",
              type: 'warning',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            };
            this.alertService.alert(error);

            localStorage.setItem("fechaParacargarEncuesta",this.reservas[i].fecha);
            localStorage.setItem("idSalonParacargarEncuesta",this.reservas[i].id_salon);
            //redirecciono a las encuetas
            this.router.navigateByUrl("/Encuestas");
          }
         
        });
      }
    }
    
    
  }


  traerDetallesDeEvento(fecha,id_salon)
  {

this.reservaServ.DetallesEvento(
  {
    datos: {
      fecha: fecha,
      id_salon: id_salon
  
     
  }}
).then(datos=>{ this.detallesEvento=datos; /*console.log(this.detallesEvento);*/
  document.getElementById("eventos").style.display = 'none';
  document.getElementById("detallesDeEvento").style.display = 'block';

  this.fecha=this.detallesEvento[0]["fecha"];
  this.id_salon=this.detallesEvento[0]["id_salon"];
  //console.log(this.fecha);
  if(this.id_salon==1)
    {
      this.salon="Cairel";
    }
    if(this.id_salon==2)
      {
        this.salon="Portal Mágico";
      }
      if(this.id_salon==3)
        {
          this.salon="Quinta Cosabonna";
        }
  });

  }


  Volver()
  {
    document.getElementById("eventos").style.display = 'block';
    document.getElementById("detallesDeEvento").style.display = 'none';
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
