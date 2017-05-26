import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home-administrador',
  templateUrl: 'home-administrador.html'
})
export class HomeAdministradorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAdministradorPage');
  }

}
