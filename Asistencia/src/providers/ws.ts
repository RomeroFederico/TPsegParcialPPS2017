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

  TraerUsuarios()
  {
    return this.http.get('http://asistencianull.hol.es/index.php/usuarios')
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }
  AgregarUsuario(obj)
  {
    return this.http.get("http://asistencianull.hol.es/index.php/agregar/usuario/"+JSON.stringify(obj))
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  ModificarUsuario(obj)
  {
    return this.http.get("http://asistencianull.hol.es/index.php/modificar/usuario/"+JSON.stringify(obj))
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  EliminarUsuario(id)
  {
    return this.http.get("http://asistencianull.hol.es/index.php/eliminar/usuario/"+id)
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }
  TraerMaterias()
  {
    return this.http.get('http://asistencianull.hol.es/index.php/materias')
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }
  TraerAulas()
  {
    return this.http.get('http://asistencianull.hol.es/index.php/aulas')
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }
  TraerDivisiones()
  {
    return this.http.get('http://asistencianull.hol.es/index.php/divisiones')
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }
  AgregarDivision(obj)
  {
    return this.http.get("http://asistencianull.hol.es/index.php/agregar/division/"+JSON.stringify(obj))
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  
  }
  private extractData(res: Response) 
  {
    let body = res.json();    
    
    return body || { };
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
