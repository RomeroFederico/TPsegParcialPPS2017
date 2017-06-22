import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthConfig,AuthHttp, tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class Auth 
{

    public name: string;
  private _token: string;
  jwtHelper: JwtHelper = new JwtHelper();
  
  constructor( public http:Http ) 
  {
    this._token = localStorage.getItem('token');
  }

  public isLogued()
  {
    try {
      // console.log( 'is logued', tokenNotExpired());
      let rta = tokenNotExpired() || false;
      return rta;
    } catch (error) {
      return false;
    }
  }

  public getToken ()
  {
    try {
      //console.log('getToekn', this.jwtHelper.decodeToken(this._token));
      return this.jwtHelper.decodeToken(this._token);
    } 
    catch (error) 
    {
      return undefined;
    }
  }

  public getExpirationDate()
  {
    
    try {
      console.log('getExpirationDate', this.jwtHelper.getTokenExpirationDate(this._token))
      return this.jwtHelper.getTokenExpirationDate(this._token);
    } catch (error) {
      return null;
    }
  }

  public logOut()
  {
    try {
      localStorage.setItem('token', null);
      //this.router.navigate(['/login']);
    } catch (error) {
      return false;
    }
  }

  public getNivel ()
  {
    // console.log(this.jwtHelper.decodeToken(this._token));
    if (this.jwtHelper.decodeToken(this._token).nivel || this.jwtHelper.decodeToken(this._token).nivel === 0)
      return this.jwtHelper.decodeToken(this._token).nivel;
    else
      return 1000;
    
  }

}
