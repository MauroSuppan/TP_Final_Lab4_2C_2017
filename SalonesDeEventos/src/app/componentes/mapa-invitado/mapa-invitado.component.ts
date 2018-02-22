import { Component, OnInit, ViewChild, ChangeDetectorRef,Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DirectionsRenderer } from '@ngui/map';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SweetAlertService } from 'angular-sweetalert-service';

import { FormControl } from '@angular/forms/src/model';

declare var $: any;

@Component({
  selector: 'app-mapa-invitado',
  templateUrl: './mapa-invitado.component.html',
  styleUrls: ['./mapa-invitado.component.css']
})
export class MapaInvitadoComponent implements OnInit {
  
  @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;
  
  directionsRenderer: google.maps.DirectionsRenderer;
  directionsResult: google.maps.DirectionsResult;
  direction: any = {
    origin: '',
    destination: '',
    travelMode: 'DRIVING'
  };
  desde = "";
  hasta = "";
  viaje = "DRIVING";

  salon;
  fecha;
  
  constructor(private cdr: ChangeDetectorRef,private route: ActivatedRoute,private router: Router,public alertService: SweetAlertService) {

    this.fecha=(localStorage.getItem('invitacion_fecha'));
    switch(localStorage.getItem('invitacion_id_salon'))
    {
     case '1':
  this.salon="Cairel";
     break;
     case '2':
     this.salon="Portal Mágico";
     break;
     case '3':
     this.salon="Quinta Casabonna";
     break;
    }

  }

  ir()
  {

    this.mapear();

  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.direction.origin = position.coords.latitude + ',' + position.coords.longitude;
     // this.direction.destination = -34.584802 + ',' + -58.426351;
     if(localStorage.getItem('invitacion_id_salon')=="1")
      {
        //cairel
        this.direction.destination = -34.7686889 + ',' + -58.3967343;
      }
      if(localStorage.getItem('invitacion_id_salon')=="2")
        {
          //portal magico
          this.direction.destination = -34.623221 + ',' +  -58.436367;
        }
        if(localStorage.getItem('invitacion_id_salon')=="3")
          {
            //quinta
            this.direction.destination = -34.871571 + ',' +  -58.509766;
          }
     // comentado para prueba esto funciona this.direction.destination = -34.796285 + ',' + -58.388826;
      // -34.584802, -58.426351 palermo
      // -34.796285, -58.388826 adrogue
    //  console.log(this.direction.origin);
      
    });

    this.directionsRendererDirective['initialized$'].subscribe(directionsRenderer => {
      this.directionsRenderer = directionsRenderer;
    });
   //este capaz lo tengo que sacar luego
   // this.mapear();
  }

  mapear() {
    this.direction.origin = this.direction.origin;
    //this.direction.destination = this.local;
    this.direction.destination = this.direction.destination
    this.direction.travelMode = this.viaje;
    this.showDirection();
  }

  directionsChanged() {
    this.directionsResult = this.directionsRenderer.getDirections();
    console.log(this.directionsResult);
    this.cdr.detectChanges();
  }

  showDirection() {
    this.directionsRendererDirective['showDirections'](this.direction);
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
  myFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
  }

}
