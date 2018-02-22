import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../servicios/auth/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SweetAlertService } from 'angular-sweetalert-service';
import { ReservaService } from  '../../servicios/reserva/reserva.service';
import { Angular2Csv } from 'angular2-csv';

declare var jsPDF: any;
import * as autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-inicio-encargado',
  templateUrl: './inicio-encargado.component.html',
  styleUrls: ['./inicio-encargado.component.css']
})
export class InicioEncargadoComponent implements OnInit {

  usuario;
  todasLasFiestas: Array<any>;
  nuevoArray =   Array<any>();
  aux:any={};
  detallesEvento: Array<any>;
  fiestasPorSalon: Array<any>;
  id_salon;
  fecha;
  salon;
  idRegistro;
  organizador;

  id_mesa;
  invitado:string;
  dni:string;

  
  
  constructor(private auth:AuthService, private router: Router,public alertService: SweetAlertService, private reservaServ:ReservaService ) { 
    
    this.usuario=localStorage.getItem("usuario");
    this.nuevoArray =  new Array<any>();
    this.TraerTodasFiestas();

  
  }

  ngOnInit() {
<<<<<<< HEAD

    if(this.usuario==null || this.usuario=="" )
      {
  this.router.navigateByUrl("/Login");
      }

=======
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28
    let token = this.auth.decodificarToken();
    //console.log(token);
   // console.log("usuarioooo: "+token.data.usuario);
   //console.log("roll: "+token.data.rol);

    if(token.data.rol!="encargado")
      {
        let error = {
          title: 'Error de permiso',
          text: "Usted no es encargado",
          type: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        };
        this.alertService.alert(error);

        this.router.navigateByUrl("/Login");
      }
<<<<<<< HEAD
      document.getElementById("pagina").style.display = 'none';
      document.getElementById("spinner").style.display = 'block';
      setTimeout(function(){
        document.getElementById("spinner").style.display = 'none';
        document.getElementById("pagina").style.display = 'block';
       
        }, 3000);
=======
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28

      document.getElementById("detallesDeEvento").style.display = 'none';
     document.getElementById("todosLosEventos").style.display = 'block';

     document.getElementById("detallesDeEventoDeUnSalon").style.display = 'none';
     document.getElementById("fiestasPorSalon").style.display = 'none';
     

  }

  TraerTodasFiestas()
  {
    
    this.reservaServ.ListarFiestas().then(datos=>{ this.todasLasFiestas=datos;});
    

  // this.reservaServ.ListarReservas().then(datos=>console.log(datos));
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
  document.getElementById("fiestasPorSalon").style.display = 'none';
  document.getElementById("todosLosEventos").style.display = 'none';
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

  traerDetallesDeEvento2(fecha,id_salon)
  {

this.reservaServ.DetallesEvento(
  {
    datos: {
      fecha: fecha,
      id_salon: id_salon
  
     
  }}
).then(datos=>{ this.detallesEvento=datos; /*console.log(this.detallesEvento);*/
  document.getElementById("fiestasPorSalon").style.display = 'none';
  document.getElementById("todosLosEventos").style.display = 'none';
  document.getElementById("detallesDeEvento").style.display = 'none';
  
  document.getElementById("detallesDeEventoDeUnSalon").style.display = 'block';

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

  ModificarEvento(item)
  {
   // document.getElementById("detallesDeEvento").style.display = 'none';
    document.getElementById("ticketModal").style.display = 'block';
    this.invitado=item.persona;
    this.dni=item.dni_invitado;
    this.id_mesa=item.id_mesa;
    this.idRegistro=item.id;
    this.organizador=item.organizador;
  // console.log(item);
  }

  EnviarModificacion()
  {
<<<<<<< HEAD
    if(this.id_mesa =='' || this.invitado =='' ||  this.dni=='')
      {
        const alerta = {
          title: 'Error!',
          text: "Complete todos los campos",
          type: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Listo'
        };
        this.alertService.success(alerta);
        return;
      }
=======
    
    
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28
    this.reservaServ.ModificarDatosEventos(this.idRegistro,{
      
      datos: {
        id: this.idRegistro,
        id_mesa: this.id_mesa,
       id_salon:this.id_salon,
        invitado: this.invitado,
        dni_invitado:this.dni,
       organizador:this.organizador,
        fecha:this.fecha
       
    }
   }).then(datos=>
    {
      this.traerDetallesDeEvento(this.fecha,this.id_salon);
      document.getElementById("ticketModal").style.display = 'none';
<<<<<<< HEAD
      const alerta = {
        title: 'Bien!',
        text: "Se edito correctamente.",
        type: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Listo'
      };
      this.alertService.success(alerta);
      
=======
      alert("se edito bien");
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28
    });
  }


  EliminarRegistro(item)
  {


     
    this.reservaServ.EliminarRegistro(item.id).then(datos=>
    {
<<<<<<< HEAD
      const alerta = {
        title: 'Bien!',
        text: "Dato borrado.",
        type: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Listo'
      };
      this.alertService.success(alerta);
=======
      alert("se borro bien");
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28
      this.traerDetallesDeEvento(this.fecha,this.id_salon);
    });
  
  }


  TraerFiestaPorSalon(id_salon)
  {

    if(id_salon==1)
      {
        this.salon="Cairel";
      }
      if(id_salon==2)
        {
          this.salon="Portal Mágico";
        }
        if(id_salon==3)
          {
            this.salon="Quinta Cosabonna";
          }
         // console.log(this.salon);

    this.reservaServ.TraerFiestaPorSalon(
      {
        datos: {
          id_salon: id_salon
      
      }}
    ).then(datos=>{ this.fiestasPorSalon=datos; /*console.log(this.fiestasPorSalon);*/
      document.getElementById("todosLosEventos").style.display = 'none';
      document.getElementById("fiestasPorSalon").style.display = 'block';
      });
    
  }

  DescargarExcel()
  {
<<<<<<< HEAD
    document.getElementById("pagina").style.display = 'none';
    document.getElementById("spinner").style.display = 'block';
    setTimeout(function(){
      document.getElementById("spinner").style.display = 'none';
      document.getElementById("pagina").style.display = 'block';
     
      }, 3000);
=======
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28

    var encabezado = ['Fecha','ID_Salon','Organizador'];
    let datos : any = [];
    for (let i = 0; i < this.todasLasFiestas.length; i++) {
      let aux= {"fecha" : this.todasLasFiestas[i].fecha, "id_salon" : this.todasLasFiestas[i].id_salon, "organizador" : this.todasLasFiestas[i].organizador};
      datos[i]=aux;
    }

    new Angular2Csv(datos, 'Fechas y salones',{headers: (encabezado)});
  }

  DescargarPdf()
  {
<<<<<<< HEAD
    document.getElementById("pagina").style.display = 'none';
    document.getElementById("spinner").style.display = 'block';
    setTimeout(function(){
      document.getElementById("spinner").style.display = 'none';
      document.getElementById("pagina").style.display = 'block';
     
      }, 3000);

=======
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28
    var columns = [
      {title: "FECHA", dataKey: "fecha"},
      {title: "IDSALON", dataKey: "id_salon"},
      {title: "ORGANIZADOR", dataKey: "organizador"}
    ];    
    
    
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, this.todasLasFiestas, {
      styles: {
        overflow: 'linebreak',
        fontSize: 12,
        valign: 'middle'
    },
      columnStyles: {
        id: {fillColor: [203, 208, 0]}
      },
      margin: {top: 60},
      addPageContent: function(data) {
        doc.text("Fechas y salones", 250, 30);
      }
    });
    doc.save('Fechas_salones.pdf');
  }

  DescargarExcelPorSalon()
  {
<<<<<<< HEAD
    document.getElementById("pagina").style.display = 'none';
    document.getElementById("spinner").style.display = 'block';
    setTimeout(function(){
      document.getElementById("spinner").style.display = 'none';
      document.getElementById("pagina").style.display = 'block';
     
      }, 3000);
=======
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28

    var encabezado = ['Fecha','ID_Salon','Organizador'];
    let datos : any = [];
    for (let i = 0; i < this.fiestasPorSalon.length; i++) {
      let aux= {"fecha" : this.fiestasPorSalon[i].fecha, "id_salon" : this.fiestasPorSalon[i].id_salon, "organizador" : this.fiestasPorSalon[i].organizador};
      datos[i]=aux;
    }

    new Angular2Csv(datos, 'Fechas y salones',{headers: (encabezado)});
  }

  DescargarPdfPorSalon()
  {
<<<<<<< HEAD
    document.getElementById("pagina").style.display = 'none';
    document.getElementById("spinner").style.display = 'block';
    setTimeout(function(){
      document.getElementById("spinner").style.display = 'none';
      document.getElementById("pagina").style.display = 'block';
     
      }, 3000);

=======
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28
    var columns = [
      {title: "FECHA", dataKey: "fecha"},
      {title: "IDSALON", dataKey: "id_salon"},
      {title: "ORGANIZADOR", dataKey: "organizador"}
    ];    
    
    
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, this.fiestasPorSalon, {
      styles: {
        overflow: 'linebreak',
        fontSize: 12,
        valign: 'middle'
    },
      columnStyles: {
        id: {fillColor: [203, 208, 0]}
      },
      margin: {top: 60},
      addPageContent: function(data) {
        doc.text("Fechas y salones", 250, 30);
      }
    });
    doc.save('Fechas_salones.pdf');
  }


  NavbarTodasLasFiestasEInicio()
  {
    document.getElementById("detallesDeEvento").style.display = 'none';
    document.getElementById("detallesDeEventoDeUnSalon").style.display = 'none';
    document.getElementById("todosLosEventos").style.display = 'block';
    document.getElementById("fiestasPorSalon").style.display = 'none';
  }


Volver()
{
  document.getElementById("detallesDeEvento").style.display = 'none';
  document.getElementById("todosLosEventos").style.display = 'block';
}

VolverAlSalon()
{
  document.getElementById("detallesDeEventoDeUnSalon").style.display = 'none';
  document.getElementById("fiestasPorSalon").style.display = 'block';
}

  cerrarSesion()
  {
    this.usuario=null;
    localStorage.clear();
<<<<<<< HEAD
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

  myFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
  }

  EliminarFiesta(item)
  {


     
    this.reservaServ.EliminarFiesta(
      {
        datos: {
          fecha: item.fecha,
          id_salon: item.id_salon
         
      }}
    ).then(datos=>
    {
      const alerta = {
        title: 'Bien!',
        text: "Fiesta borrada.",
        type: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Listo'
      };
      this.alertService.success(alerta);
      this.TraerTodasFiestas();
    });
  
  }

  EliminarFiestaPorSalon(item)
  {

    this.reservaServ.EliminarFiesta(
      {
        datos: {
          fecha: item.fecha,
          id_salon: item.id_salon
         
      }}
    ).then(datos=>
    {
      const alerta = {
        title: 'Bien!',
        text: "Fiesta borrada.",
        type: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Listo'
      };
      this.alertService.success(alerta);
      this.TraerFiestaPorSalon(item.id_salon);
    });
  
  }

  AgregarInvitado(item)
  {
   // console.log(item);
    this.fecha=item.fecha;
    this.id_salon=item.id_salon;
    this.organizador=item.organizador;
    this.dni='';
    this.id_mesa='';
    this.invitado='';
    document.getElementById("altainvitado").style.display = 'block';
    
 
  }

  EnviarNuevoInvitado()
  {
    if(this.id_mesa =='' || this.invitado =='' ||  this.dni=='')
      {
        const alerta = {
          title: 'Error!',
          text: "Complete todos los campos",
          type: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Listo'
        };
        this.alertService.success(alerta);
        return;
      }
    this.reservaServ.EnviarNuevoInvitado({
      
      datos: {
        id_mesa: this.id_mesa,
       id_salon:this.id_salon,
        invitado: this.invitado,
        dni_invitado:this.dni,
       organizador:this.organizador,
        fecha:this.fecha
       
    }
   }).then(datos=>
    {
      //this.traerDetallesDeEvento(this.fecha,this.id_salon);
      document.getElementById("altainvitado").style.display = 'none';
      const alerta = {
        title: 'Bien!',
        text: "Se cargo el invitado.",
        type: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Listo'
      };
      this.alertService.success(alerta);
      
    });

  }

=======
    alert("usted se ha deslogueado correctamente");
    this.router.navigateByUrl("/Inicio");
  }

  
>>>>>>> e11332a27268671c3e79873bbcc6f3c8f94d9c28

}
