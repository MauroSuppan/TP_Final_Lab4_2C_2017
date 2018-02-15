import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReservaService } from  '../../servicios/reserva/reserva.service';
import { SweetAlertService } from 'angular-sweetalert-service';


@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {

  salon: string;
  fecha:string;
  reserva : any = {};
  mostrarReservaSalon:boolean;
  mostrarCargaDeInvitados:boolean;
  mesa:Number;
  invitado:string;
  dni:string;
  usuario:string;

  mesaEInvitado : Array<any>;
  auxMesa:any={};

contadorInvitadosMesa=0;

  constructor(private route: ActivatedRoute,private router: Router, private reservaServ:ReservaService,public alertService: SweetAlertService) { 

    //tengo que agarrar el salon desde el local storage

    this.mostrarReservaSalon=true;
    this.mostrarCargaDeInvitados=false;
    this.mesaEInvitado =  new Array<any>();

    this.salon=localStorage.getItem("salon");
    this.usuario=localStorage.getItem("usuario");
  }


  ngOnInit() {
    if(this.usuario==null || this.usuario=="" )
      {
  this.router.navigateByUrl("/Login");
      }
  }

  RedireccionarSalon(salon:string)
  {
    this.mostrarReservaSalon=true;
    this.mostrarCargaDeInvitados=false;

      switch(salon)
      {
       case 'cairel':
       localStorage.setItem("salon","Cairel");
       this.salon=localStorage.getItem("salon");
       break;
       case 'portal':
       localStorage.setItem("salon","Portal Mágico");
       this.salon=localStorage.getItem("salon");
       break;
       case 'quinta':
       localStorage.setItem("salon","Quinta Casabonna");
       this.salon=localStorage.getItem("salon");
       break;
      }
    
  }

  Reservar()
  {
    if(this.fecha==undefined)
      {
        alert("Debe ingresar una fecha");
        return;
      }
      
    this.reserva.fecha=this.fecha;
   
    if(this.salon=='Cairel')
      {
        this.reserva.id_salon=1;
      }
      if(this.salon=='Portal Mágico')
        {
          this.reserva.id_salon=2;
        }
        if(this.salon=='Quinta Casabonna')
          {
            this.reserva.id_salon=3;
          }
 //console.log(this.reserva);

//llamar a los servicios para ver si esa disponible la fecha y reservar
this.reservaServ.ReservarSalon({
  datos: {
    fecha: this.reserva.fecha,
    id_salon: this.reserva.id_salon

   
}}).then(datos=>
{
if(datos.mensaje=="ok")
  {
    alert("La fecha del salon esta disponible y se ha reservado para usted. Cargue las mesas y a sus invitados");
  this.mostrarReservaSalon=false;
    this.mostrarCargaDeInvitados=true;
  }
  else
    {
      alert("La fecha para el evento no esta disponible. Elija otra");
    }
});

  }

  agregarInvitado()
  {
    if(this.mesa==null || this.invitado=="" || this.dni==null)
      {
        alert("Complete todos los datos");
        return;
      }
      for(let i=0;i<this.mesaEInvitado.length;i++)
        {
          
          if(this.mesaEInvitado[i]['id_mesa']==this.mesa)
          {
           //  console.log("mesa en for: "+this.mesaEInvitado[i]['id_mesa']);
           // console.log("mesa elegida: "+this.mesa);
          this.contadorInvitadosMesa++;

          console.log("contador: "+this.contadorInvitadosMesa);
          if(this.contadorInvitadosMesa==10)
            {
              let error = {
                title: 'Maximo de invitado en mesa!',
                text: "Ya tiene 10 invitados la mesa seleccionada",
                type: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
              //  imageUrl: "/../assets/imagenes/globos-de-colores.jpg"
              };
              this.alertService.alert(error);
              this.contadorInvitadosMesa=0;
              return;
            }
    
          }
    
        }

        this.contadorInvitadosMesa=0;


   this.auxMesa = {
     id_salon:this.reserva.id_salon,
     fecha:this.reserva.fecha,
id_mesa:this.mesa,
invitado:this.invitado,
dni_invitado:this.dni,
organizador: this.usuario

   };
  
  
   this.mesaEInvitado.push(this.auxMesa);
  this.invitado="";
  this.mesa=null;
  this.dni="";
  }

  CargarALaBase()
  {

// agregar el organizador en todos lados
//mejorar el tema de las vista de lista de invitados

    for(let i=0;i<this.mesaEInvitado.length;i++)
    {

      this.reservaServ.CargarDatosEventos({
        datos: {
          fecha: this.mesaEInvitado[i]['fecha'],
          id_mesa: this.mesaEInvitado[i]['id_mesa'],
          id_salon: this.mesaEInvitado[i]['id_salon'],
          invitado: this.mesaEInvitado[i]['invitado'],
          dni_invitado:this.mesaEInvitado[i]['dni_invitado'],
          organizador: this.mesaEInvitado[i]['organizador'],
         
      }}).then(datos=>
      {
      });
 
    }

    alert("cargo bien");
    this.router.navigateByUrl("/Inicio");
  
  }

  
  myFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}

cerrarSesion()
{
  localStorage.clear();
  alert("usted se ha deslogueado correctamente");
  this.router.navigateByUrl("/Inicio");
}



}
