import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-asistencia-alumno',
  templateUrl: 'asistencia-alumno.html',
})
export class AsistenciaAlumnoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  Volver()
  {
    this.navCtrl.pop();
  }

}
