import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notificaciones-alumno',
  templateUrl: 'notificaciones-alumno.html',
})
export class NotificacionesAlumnoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesAlumno');
  }

  Volver()
  {
    this.navCtrl.pop();
  }

}
