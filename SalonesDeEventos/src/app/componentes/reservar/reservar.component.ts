import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReservaService } from  '../../servicios/reserva/reserva.service';
import { SweetAlertService } from 'angular-sweetalert-service';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {AuthService} from '../../servicios/auth/auth.service';



@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {

  salon: string;
  fecha:string;
//fecha;

  reserva : any = {};
  mostrarReservaSalon:boolean;
  mostrarCargaDeInvitados:boolean;
  mesa:Number;
 // invitado:string;
 // dni:string;
  usuario:string;

  mesaEInvitado : Array<any>;
  auxMesa:any={};

contadorInvitadosMesa=0;

  captcha;
  imagenCaptcha;

  fechaActual;
  fechaActualFormato;

  constructor(private route: ActivatedRoute,private router: Router, private reservaServ:ReservaService,public alertService: SweetAlertService,private builder: FormBuilder,private auth:AuthService) { 

    //tengo que agarrar el salon desde el local storage

    this.mostrarReservaSalon=true;
    this.mostrarCargaDeInvitados=false;
    this.mesaEInvitado =  new Array<any>();

    this.salon=localStorage.getItem("salon");
    this.usuario=localStorage.getItem("usuario");
    this.captcha="GHIJ";
    //this.fecha=new Date();
   // this.fecha=(this.fecha.getDate()+ "-" +(this.fecha.getMonth() +1) + "-" +this.fecha.getFullYear());
   // alert(this.fecha);
   this.fechaActual=new Date();
  // this.fechaActualFormato=(this.fechaActual.getFullYear() + "-" + (this.fechaActual.getMonth() +1)+ "-" +this.fechaActual.getDate());
  }

  captchaIngresado = new FormControl('', [ Validators.required]);
  invitado : FormControl = new FormControl("",[Validators.required]);
  dni : FormControl = new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(8)]);
  


  



  formRegistro: FormGroup= this.builder.group({
    // captchaIngresado:this.captchaIngresado,
    invitado:this.invitado,
    dni:this.dni

    });

    formCaptcha: FormGroup= this.builder.group({
      captchaIngresado:this.captchaIngresado,
  
      });
 



  ngOnInit() {
    document.getElementById("spinner").style.display = 'none';
    document.getElementById("mostrarCaptcha").style.display = 'none';
    
    if(this.usuario==null || this.usuario=="" )
      {
  this.router.navigateByUrl("/Login");
      }

      let token = this.auth.decodificarToken();

      if(token.data.rol!="")
        {
          let error = {
            title: 'Error de permiso',
            text: "Usted no es un cliente",
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          };
          this.alertService.alert(error);
  
          this.router.navigateByUrl("/Login");
        }

        
     
  }

  RedireccionarSalon(salon:string)
  {
    this.mostrarReservaSalon=true;
    this.mostrarCargaDeInvitados=false;
    document.getElementById("cargaInvitados").style.display = 'block';
    document.getElementById("mostrarCaptcha").style.display = 'none';

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

     
      document.getElementById("mostrarCaptcha").style.display = 'none';
  }

  Reservar()
  {
  
    if(this.fecha==undefined)
      {
        
        let error = {
          title: 'Error',
          text: "Debe ingresar una fecha.",
          type: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        };
        this.alertService.alert(error);
        return;
      }

      if(new Date(this.fechaActual).getTime()>new Date(this.fecha).getTime())
        {      let error = {
          title: 'Error',
          text: "Elija una fecha a futuro!",
          type: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        };
        this.alertService.alert(error);
        this.fecha='';
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

//oculto el body
//muestro el spiner
document.getElementById("pagina").style.display = 'none';
document.getElementById("spinner").style.display = 'block';
document.getElementById("mostrarCaptcha").style.display = 'none';
setTimeout(function(){
  document.getElementById("spinner").style.display = 'none';
  document.getElementById("pagina").style.display = 'block';
 
  }, 3000);

this.reservaServ.ReservarSalon({
  datos: {
    fecha: this.reserva.fecha,
    id_salon: this.reserva.id_salon

   
}}).then(datos=>
{
if(datos.mensaje=="ok")
  {
    this.GenerarCaptcha();
   
    const exito = {
      title: 'Exito!',
      text: "La fecha del salon esta disponible y se ha reservado para usted. Cargue las mesas y a sus invitados",
      type: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Listo'
    };
    this.alertService.success(exito);

  this.mostrarReservaSalon=false;
    this.mostrarCargaDeInvitados=true;
  }
  else
    {
     
      let error = {
        title: 'Error',
        text: "La fecha para el evento no esta disponible. Elija otra",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      };
      this.alertService.alert(error);
    }
});

  }

  agregarInvitado()
  {
    document.getElementById("mostrarCaptcha").style.display = 'none';
    if(this.mesa==undefined)
      {
       
        let error = {
          title: 'Complete todos los datos',
          text: "ingrese numero de mesa",
          type: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        //  imageUrl: "/../assets/imagenes/globos-de-colores.jpg"
        };
        this.alertService.alert(error);
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
invitado:this.formRegistro.get("invitado").value,
dni_invitado:this.formRegistro.get("dni").value,
organizador: this.usuario

   };
  
  
   this.mesaEInvitado.push(this.auxMesa);
   this.invitado.setValue('');
  this.mesa=null;
  this.dni.setValue('');
  }

  mostrarCaptcha()
  {
    document.getElementById("cargaInvitados").style.display = 'none';
    document.getElementById("mostrarCaptcha").style.display = 'block';
    
  
  }

  CargarALaBase()
  {

// agregar el organizador en todos lados
//mejorar el tema de las vista de lista de invitados

//console.log(this.captchaIngresado.value);


  if(this.captchaIngresado.value!=this.captcha)
    {
      let error = {
        title: 'Error de captcha',
        text: "Captcha incorrecto!",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      //  imageUrl: "/../assets/imagenes/globos-de-colores.jpg"
      };
      this.alertService.alert(error);
      this.contadorInvitadosMesa=0;
      //this.controls[name].setValue(value[name], {onlySelf: true, emitEvent});
      this.captchaIngresado.setValue('');
      this.GenerarCaptcha();
      return;
    }


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
    const exito = {
      title: 'Exito!',
      text: "Su fiesta ha sido cargada. Muchas gracias por confiar en nosotros!",
      type: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Listo'
    };
    this.alertService.success(exito);
    
    this.router.navigateByUrl("/Inicio");
  
  }

  GenerarCaptcha()
  {
    
    let indice;
    indice =Math.floor((Math.random() * 5) + 0);
    if(indice==1)
      {
        this.captcha="GHIJ";
      }
        if(indice==2)
          {
            this.captcha="BCDE";
          }
          if(indice==3)
            {
              this.captcha="NOPQ";
            }
            if(indice==4)
              {
                this.captcha="UVWX";
              }
              if(indice==5)
                {
                  this.captcha="QRST";
                }
    this.imagenCaptcha=indice;
    console.log(this.captcha);
   
   
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
