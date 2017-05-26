import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home-administrativo',
  templateUrl: 'home-administrativo.html'
})
export class HomeAdministrativoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAdministrativoPage');
  }

}
