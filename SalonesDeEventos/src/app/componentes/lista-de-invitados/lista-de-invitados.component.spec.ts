import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeInvitadosComponent } from './lista-de-invitados.component';

describe('ListaDeInvitadosComponent', () => {
  let component: ListaDeInvitadosComponent;
  let fixture: ComponentFixture<ListaDeInvitadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeInvitadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeInvitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
