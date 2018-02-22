import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WsService {

  //local
  //url= "http://localhost/apiFinal/";
  url= "https://suppaneventos.000webhostapp.com/apiFinal/";
  constructor(public http: Http) { }

  post(data: Object)
  {
    //local
   // return this.http.post("http://localhost/apiFinal/ingresoo/", data)
    return this.http.post("https://suppaneventos.000webhostapp.com/apiFinal/ingresoo/", data)
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }

  altaUsuario(data: Object)
  {
    return this.http.post(this.url+"altaUsuario/", data)
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }


  private extractData(res: Response) {
    let body = res.json();    
    
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
   // console.error( errMsg );
    console.error( 'CATCH'+error );
    //return Observable.throw(errMsg);
  }

}
