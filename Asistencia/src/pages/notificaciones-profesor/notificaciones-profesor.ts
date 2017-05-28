import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notificaciones-profesor',
  templateUrl: 'notificaciones-profesor.html',
})
export class NotificacionesProfesorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesProfesor');
  }

}
