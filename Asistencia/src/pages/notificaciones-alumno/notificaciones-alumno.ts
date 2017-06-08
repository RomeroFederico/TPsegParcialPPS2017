import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notificaciones-alumno',
  templateUrl: 'notificaciones-alumno.html',
})
export class NotificacionesAlumnoPage {
  eliminar = false;
  notificacion1 = true;
  notificacion2 = true;
  isChecked1 = false;
  isChecked2 = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesAlumno');
  }

  Volver()
  {
    this.navCtrl.pop();
  }

  Eliminar(num)
  {
    switch(num)
    {
        case 1:
          this.isChecked1 = !this.isChecked1;
          break;
        case 2:
          this.isChecked2 = !this.isChecked2;
          break;
    }
    if(this.isChecked1 || this.isChecked2)
    {
        this.eliminar = true;
    }
    else
    {
        this.eliminar = false;
    }
  }

  EliminarNotificacion()
  {
    if(this.isChecked1)
    {
        this.notificacion1 = false;
    }
    if(this.isChecked2)
    {
        this.notificacion2 = false;
    }
    this.eliminar = false;
  }

}
