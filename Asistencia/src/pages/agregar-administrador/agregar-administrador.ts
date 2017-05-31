import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomeAdministradorPage } from '../home-administrador/home-administrador';

@Component({
  selector: 'page-agregar-administrador',
  templateUrl: 'agregar-administrador.html'
})
export class AgregarAdministradorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarAdministradorPage');
  }

  /**
  * Volver a la pagina principal.
  */
  Volver()
  {
    this.navCtrl.setRoot(HomeAdministradorPage, {}, {animate: true, direction: 'forward'});
  }

}
