import { Injectable } from '@angular/core';
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

  private token: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor() {
    this.token = localStorage.getItem('token');
   }

    public decodificarToken ()
  {
    try {
      return this.jwtHelper.decodeToken(this.token);
    } catch (error) {
      return undefined;
    }
  }

}
