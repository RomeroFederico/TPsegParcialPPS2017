import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-agregar-administrador',
  templateUrl: 'agregar-administrador.html'
})
export class AgregarAdministradorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarAdministradorPage');
  }

  Volver()
  {
    this.navCtrl.pop();
  }

}
