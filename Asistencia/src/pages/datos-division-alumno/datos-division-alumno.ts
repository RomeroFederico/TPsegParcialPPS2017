import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-datos-division-alumno',
  templateUrl: 'datos-division-alumno.html',
})
export class DatosDivisionAlumnoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosDivisionAlumno');
  }

}
