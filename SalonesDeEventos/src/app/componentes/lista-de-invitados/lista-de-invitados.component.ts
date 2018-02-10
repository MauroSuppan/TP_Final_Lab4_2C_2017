import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-lista-de-invitados',
  templateUrl: './lista-de-invitados.component.html',
  styleUrls: ['./lista-de-invitados.component.css']
})
export class ListaDeInvitadosComponent implements OnInit {

  @Input() listado;

  constructor() { }

  ngOnInit() {
  }

}
