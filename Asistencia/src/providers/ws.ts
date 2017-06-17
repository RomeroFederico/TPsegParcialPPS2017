import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the Ws provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Ws 
{

  constructor(public http: Http) 
  {
    console.log('Hello Ws Provider');
  }
  private extractData(res: Response) 
  {
    let body = res.json();    
    
    return body || { };
  }

  TraerDatos() {
    return this.http.get('https://restcountries.eu/rest/v1/all')
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
   /** return this.http.get('http://www.osmar.hol.es/index.php/usuarios')
      .map(response => response.json());*/
  }

  private handleError (error: Response | any) 
  {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error( errMsg );
    console.error( 'CATCH' );
    return Observable.throw(errMsg);
  }

}
