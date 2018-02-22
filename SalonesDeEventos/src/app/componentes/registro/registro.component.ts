import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {WsService} from '../../servicios/ws/ws.service';
import { Usuario } from '../../Clases/Usuario';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SweetAlertService } from 'angular-sweetalert-service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router, private ws: WsService,private builder: FormBuilder,public alertService: SweetAlertService) { 
   
    this.unUsuario= new Usuario();
    
  }
 


  ngOnInit() {

  }

 // nombre: string;
  //usuario:string;
  //clave: string;
  //correo: string;
  //claveRep: string;
  unUsuario:Usuario;

  nombre = new FormControl('', [
    Validators.required
  ]);
  usuario = new FormControl('', [
    Validators.required
  ]);
  clave = new FormControl('', [
    Validators.required
  ]);

  dni : FormControl = new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(8)]);

  correo = new FormControl("",[Validators.required, Validators.email]);

  claveRep = new FormControl('', [
    Validators.required
  ]);

  
  registroCaptcha = new FormControl('', [
    Validators.required
  ]);
  

    //formRegistro, mismo nombre que tiene el [FormGroup] en el html
    formRegistro: FormGroup= this.builder.group({
      //aca van las declaraciones de todos los FormControl que estan arriba
  nombre : this.nombre,
  usuario: this.usuario,
  clave:this.clave,
  correo:this.correo,
  dni:this.dni,
  claveRep:this.claveRep,
  registroCaptcha:this.registroCaptcha
    });

 

  Registrar()
  {
    
    let nombre=this.formRegistro.get('nombre').value;
    let usuario=this.formRegistro.get('usuario').value;
   let clave= this.formRegistro.get('clave').value;
    let correo=this.formRegistro.get('correo').value;
   let claveRep= this.formRegistro.get('claveRep').value;
   let dni= this.formRegistro.get('dni').value;
  let registroCaptcha=this.formRegistro.get('registroCaptcha').value;
    
    //console.log(this.nombre+ this.usuario+this.clave+this.correo+this.claveRep);
   
    if( nombre &&  usuario && clave && correo && claveRep  )
      {
    
        if(clave == claveRep)
          {
            this.unUsuario.nombre=nombre;
            this.unUsuario.usuario=usuario;
            this.unUsuario.clave= clave;
            this.unUsuario.correo=correo;
           this.unUsuario.dni=dni;
      // console.log(this.unUsuario);
            
    this.ws.altaUsuario( {
      datosUsuario: {
        nombre: this.unUsuario.nombre,
        usuario: this.unUsuario.usuario,
        clave: this.unUsuario.clave,
        correo: this.unUsuario.correo,
        dni: this.unUsuario.dni

       
    }} )
  .then( data => {
    const exito = {
      title: 'Felicitaciones',
      text: "Usted se registro correctamente!",
      type: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Listo'
    };
    this.alertService.success(exito);
    this.router.navigate(['/Login']);
 
  })
  .catch( e => {
    console.info(e);
  } );
    

      }
      else
        {
          let error = {
            title: 'Error',
            text: "Las claves ingresadas no son iguales",
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          };
          this.alertService.alert(error);
          this.clave.setValue('');
          this.claveRep.setValue('');
        }
    
    }
    else
      {
        let error = {
          title: 'Error',
          text: "Ingrese todos los campos",
          type: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        };
        this.alertService.alert(error);
      }


  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
}
