import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) 
  {


  }
  Aceptar(tipo)
  {
    console.log("Es de tipo: "+tipo);
    //this.navCtrl.push(MenuPage);
    this.navCtrl.setRoot(MenuPage,{Tipo:tipo});

  }

}
