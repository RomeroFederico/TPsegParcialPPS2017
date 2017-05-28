import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-datos-clase-profesor',
  templateUrl: 'datos-clase-profesor.html',
})
export class DatosClaseProfesorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosClaseProfesor');
  }

}
