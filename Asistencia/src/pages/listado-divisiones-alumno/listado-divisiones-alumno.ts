import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-listado-divisiones-alumno',
  templateUrl: 'listado-divisiones-alumno.html',
})
export class ListadoDivisionesAlumnoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoDivisionesAlumno');
  }

  Volver()
  {
    this.navCtrl.pop();
  }
}
