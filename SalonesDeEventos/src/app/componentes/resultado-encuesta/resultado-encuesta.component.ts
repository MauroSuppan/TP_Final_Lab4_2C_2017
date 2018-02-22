import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReservaService } from  '../../servicios/reserva/reserva.service';
import { SweetAlertService } from 'angular-sweetalert-service';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {AuthService} from '../../servicios/auth/auth.service';
@Component({
  selector: 'app-resultado-encuesta',
  templateUrl: './resultado-encuesta.component.html',
  styleUrls: ['./resultado-encuesta.component.css']
})
export class ResultadoEncuestaComponent implements OnInit {

  salon;
  mostrar=false;
  resultados: Array<any>;
  resultadosPorSalon: Array<any>;

  esteticaBueno=0;
  esteticaMalo=0;
  esteticaRegular=0;
  public esteticaData:number[] ;

  comidaBueno=0;
  comidaRegular=0;
  comidaMalo=0;
  public comidaData:number[] ;

  bebidaBueno=0;
  bebidaRegular=0;
  bebidaMalo=0;
  public bebidaData:number[] ;

  musicaBueno=0;
  musicaRegular=0;
  musicaMalo=0;
  public musicaData:number[] ;

  ubicacionBueno=0;
  ubicacionRegular=0;
  ubicacionMalo=0;
  public ubicacionData:number[] ;

  vajillaBueno=0;
  vajillaRegular=0;
  vajillaMalo=0;
  public vajillaData:number[] ;

  mozosBueno=0;
  mozosRegular=0;
  mozosMalo=0;
  public mozosData:number[] ;

  estacionamientoBueno=0;
  estacionamientoRegular=0;
  estacionamientoMalo=0;
  public estacionamientoData:number[] ;

  public doughnutChartLabels:string[];
  public doughnutChartData:number[] ;
  public doughnutChartType:string;

  usuario;
  constructor(private route: ActivatedRoute,private router: Router, private reservaServ:ReservaService,public alertService: SweetAlertService,private auth:AuthService) {
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
      document.getElementById("pagina").style.display = 'none';
      document.getElementById("spinner").style.display = 'block';
      setTimeout(function(){
        document.getElementById("spinner").style.display = 'none';
        document.getElementById("pagina").style.display = 'block';
       
        }, 3000);
        
this.TraerEncuestas();

this.doughnutChartLabels= ['Bueno/a', 'Regular', 'Malo/a'];
this.doughnutChartType = 'doughnut';
this.comidaData=[0, 0, 0];
this.esteticaData=[0, 0, 0];
this.bebidaData=[0, 0, 0];
this.musicaData=[0, 0, 0];;
this.ubicacionData=[0, 0, 0];
this.vajillaData=[0, 0, 0];
this.estacionamientoData=[0, 0, 0];
this.mozosData=[0, 0, 0];

  }


 // public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
 // public doughnutChartData:number[] = [350, 450, 100];
  //public doughnutChartType:string = 'doughnut';


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  TraerEncuestas()
  {
    this.reservaServ.TraerEncuestas().then(datos=>{this.resultados=datos; console.log(this.resultados)});
   // this.reservaServ.ListarReservas().then(datos=>console.log(datos)); 
  }

  FiltrarPorSalon()
  {
    let id_salon
    if(this.salon=="Cairel")
      {
id_salon=1;
      }
      if(this.salon=="Portal Mágico")
        {
  id_salon=2;
        }
        if(this.salon=="Quinta Casabonna")
          {
    id_salon=3;
          }

          this.esteticaBueno=0;
          this.esteticaMalo=0;
          this.esteticaRegular=0;

          this.comidaBueno=0;
          this.comidaRegular=0;
          this.comidaMalo=0;

          this.bebidaBueno=0;
          this.bebidaRegular=0;
          this.bebidaMalo=0;

          this.musicaBueno=0;
          this.musicaRegular=0;
          this.musicaMalo=0;

          this.ubicacionBueno=0;
          this.ubicacionRegular=0;
          this.ubicacionMalo=0;

          this.vajillaBueno=0;
          this.vajillaRegular=0;
          this.vajillaMalo=0;
       
        
          this.mozosBueno=0;
          this.mozosRegular=0;
          this.mozosMalo=0;
        
          this.estacionamientoBueno=0;
          this.estacionamientoRegular=0;
          this.estacionamientoMalo=0;
    this.mostrar=true;
    this.resultadosPorSalon=this.resultados.filter(function(data)
    {
      return data.id_salon ==id_salon;
    });

    console.log(this.resultadosPorSalon);

    for (let i = 0; i < this.resultadosPorSalon.length; i++) {

      if(this.resultadosPorSalon[i].comida=="Bueno/a")
        {
          this.comidaBueno++;
        }
      if(this.resultadosPorSalon[i].comida=="Regular")
        {
            this.comidaRegular++;
        }  
      if(this.resultadosPorSalon[i].comida=="Malo/a")
        {
              this.comidaMalo++;
        }  

        if(this.resultadosPorSalon[i].estetica=="Bueno/a")
          {
            this.esteticaBueno++;
          }
        if(this.resultadosPorSalon[i].estetica=="Regular")
          {
              this.esteticaRegular++;
          }  
        if(this.resultadosPorSalon[i].estetica=="Malo/a")
          {
                this.esteticaMalo++;
          }      

          if(this.resultadosPorSalon[i].bebida=="Bueno/a")
            {
              this.bebidaBueno++;
            }
          if(this.resultadosPorSalon[i].bebida=="Regular")
            {
                this.bebidaRegular++;
            }  
          if(this.resultadosPorSalon[i].bebida=="Malo/a")
            {
                  this.bebidaMalo++;
            }

            if(this.resultadosPorSalon[i].musica=="Bueno/a")
              {
                this.musicaBueno++;
              }
            if(this.resultadosPorSalon[i].musica=="Regular")
              {
                  this.musicaRegular++;
              }  
            if(this.resultadosPorSalon[i].musica=="Malo/a")
              {
                    this.musicaMalo++;
              }

              if(this.resultadosPorSalon[i].ubicacion=="Bueno/a")
                {
                  this.ubicacionBueno++;
                }
              if(this.resultadosPorSalon[i].ubicacion=="Regular")
                {
                    this.ubicacionRegular++;
                }  
              if(this.resultadosPorSalon[i].ubicacion=="Malo/a")
                {
                      this.ubicacionMalo++;
                }
                          
                if(this.resultadosPorSalon[i].vajilla=="Bueno/a")
                  {
                    this.vajillaBueno++;
                  }
                if(this.resultadosPorSalon[i].vajilla=="Regular")
                  {
                      this.vajillaRegular++;
                  }  
                if(this.resultadosPorSalon[i].vajilla=="Malo/a")
                  {
                        this.vajillaMalo++;
                  }  
                  
                  if(this.resultadosPorSalon[i].mozos=="Bueno/a")
                    {
                      this.mozosBueno++;
                    }
                  if(this.resultadosPorSalon[i].mozos=="Regular")
                    {
                        this.mozosRegular++;
                    }  
                  if(this.resultadosPorSalon[i].mozos=="Malo/a")
                    {
                          this.mozosMalo++;
                    }          
  
                    if(this.resultadosPorSalon[i].estacionamiento=="Bueno/a")
                      {
                        this.estacionamientoBueno++;
                      }
                    if(this.resultadosPorSalon[i].estacionamiento=="Regular")
                      {
                          this.estacionamientoRegular++;
                      }  
                    if(this.resultadosPorSalon[i].estacionamiento=="Malo/a")
                      {
                            this.estacionamientoMalo++;
                      }     



    }
   // this.doughnutChartData=[100, 100, 100];

   

   this.esteticaData=[this.esteticaBueno,this.esteticaRegular,this.esteticaMalo];
   this.comidaData=[this.comidaBueno,this.comidaRegular,this.comidaMalo];
   this.bebidaData=[this.bebidaBueno,this.bebidaRegular,this.bebidaMalo];
   this.musicaData=[this.musicaBueno,this.musicaRegular,this.musicaMalo];
   this.ubicacionData=[this.ubicacionBueno,this.ubicacionRegular,this.ubicacionMalo];
   this.vajillaData=[this.vajillaBueno,this.vajillaRegular,this.vajillaMalo];
   this.estacionamientoData=[this.estacionamientoBueno,this.estacionamientoRegular,this.estacionamientoMalo];
   this.mozosData=[this.mozosBueno,this.mozosRegular,this.mozosMalo];
   console.log(this.vajillaData);
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
