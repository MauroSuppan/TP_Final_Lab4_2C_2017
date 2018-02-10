import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  Tiempo: number;
  repetidor:any;
  usuario;

 
  
  constructor(private router: Router) {
    this.Tiempo=5; 
    this.usuario=localStorage.getItem("usuario");
    
 }

  ngOnInit() {
    document.getElementById("3").style.display = 'none';
   //alert("entro al ngonit");
  document.getElementById("1").style.display = 'block';
   this.Tiempo=5;

   this.repetidor = setInterval(()=>{ 
    
    this.Tiempo--;
   // console.log("llego", this.Tiempo);
    if(this.Tiempo==0 ) {
      clearInterval(this.repetidor);
    
     this.prueba();
      this.Tiempo=5;
    }
    }, 600);

  }

  prueba()
  {
   // alert("entro al prueba");
    document.getElementById("1").style.display = 'none';
    document.getElementById("2").style.display = 'block';
    this.Tiempo=5;
 
    this.repetidor = setInterval(()=>{ 
     
     this.Tiempo--;
    // console.log("llego", this.Tiempo);
     if(this.Tiempo==0 ) {
       clearInterval(this.repetidor);
     
      this.prueba2();
       this.Tiempo=5;
     }
     }, 600);
   
  }

  prueba2()
  {
   // alert("entro al prueba2");
    document.getElementById("2").style.display = 'none';
    document.getElementById("3").style.display = 'block';
    //alert("entro al prueba3");
   // this.ngOnInit();
   this.Tiempo=5;
   
      this.repetidor = setInterval(()=>{ 
       
       this.Tiempo--;
     //  console.log("llego", this.Tiempo);
       if(this.Tiempo==0 ) {
         clearInterval(this.repetidor);
       
        this.ngOnInit();
         this.Tiempo=5;
       }
       }, 600);
  }


  Redireccionar(salon:string)
  {
      switch(salon)
      {
       case 'cairel':
       localStorage.setItem("salon","Cairel");
       break;
       case 'portal':
       localStorage.setItem("salon","Portal Mágico");
       break;
       case 'quinta':
       localStorage.setItem("salon","Quinta Casabonna");
       break;
      }


      if(this.usuario==null || this.usuario=="" )
        {
    this.router.navigateByUrl("/Login");
        }
         else
          {
            this.router.navigateByUrl("/Reservar");
          }

    
  }

  cerrarSesion()
  {
    this.usuario=null;
    localStorage.clear();
    alert("usted se ha deslogueado correctamente");
    this.router.navigateByUrl("/Inicio");
  }






}
