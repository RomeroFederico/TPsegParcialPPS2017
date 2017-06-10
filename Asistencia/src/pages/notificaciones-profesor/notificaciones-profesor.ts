import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-notificaciones-profesor',
  templateUrl: 'notificaciones-profesor.html',
})
export class NotificacionesProfesorPage {

  notificaciones : Array<any> = new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams,public alert: AlertController) 
  {
    this.notificaciones.push({fecha:"03/05/2017",descripcion:"No asististe a clases!",tipo:"Ausencia"});
    this.notificaciones.push({fecha:"02/07/2017",descripcion:"Feriado Nacional!",tipo:"Feriado"});
    this.notificaciones.push({fecha:"04/04/2017",descripcion:"No asististe a clases!",tipo:"Ausencia"});
    this.notificaciones.push({fecha:"2/04/2017",descripcion:"Feraido nacional!",tipo:"Feriado"});
    this.notificaciones.push({fecha:"01/05/2017",descripcion:"No asististe a clases!",tipo:"Ausencia"});
    console.log(this.notificaciones);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesProfesor');
  }
  Volver()
  {
    this.navCtrl.pop();
  }
  EliminarNotificaciones()
  {
    
    let alert = this.alert.create({
      title: 'Eliminar Notificaciones',
      message: 'Desea eliminar las notificaciones recibidas?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
           console.log('Cancel la eliminacion de notificaiones!');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.notificaciones = new Array<any>();
            console.log("Se eliminaron notificaciones!");
          }
       }
      ]
    });
    alert.present();
  }

}
