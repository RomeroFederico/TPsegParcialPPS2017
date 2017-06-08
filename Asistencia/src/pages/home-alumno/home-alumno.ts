import { Component } from '@angular/core';
import { Platform, AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DatosAlumnoPage } from '../datos-alumno/datos-alumno';
import { NotificacionesAlumnoPage } from '../notificaciones-alumno/notificaciones-alumno';
import { ListadoDivisionesAlumnoPage } from '../listado-divisiones-alumno/listado-divisiones-alumno';
import { Alumno } from '../../components/clases/alumno';
import { LoginPage } from '../login/login';
import { AsistenciaAlumnoPage } from '../asistencia-alumno/asistencia-alumno';

@Component({
  selector: 'page-home-alumno',
  templateUrl: 'home-alumno.html'
})
export class HomeAlumnoPage {

  loading : any;
  alumno:Alumno = new Alumno(1,"Osmar","Flores","99333222","100200","ramzito@gmail.com","123",20,"alumno.png");

  constructor(private platform: Platform,
              public alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public loadingController : LoadingController){

       this.platform = platform;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAlumnoPage');
  }

  Aceptar(opcion)
  {
    var page;
    switch (opcion) {
      case '0':

        page = DatosAlumnoPage;
        break;

      case '1':

        page = ListadoDivisionesAlumnoPage;
        break;

      case '2':

        page = AsistenciaAlumnoPage;
        break;
     case '3':

        page = NotificacionesAlumnoPage;
        break;
    }
    let loading = this.loadingController.create({
      spinner: 'bubbles',
      content: `Espere un Momento...`,
      duration: 1000
    });

    loading.onDidDismiss(() => {
      //this.animacionSeleccion[this.seleccionAnimar] = "";
      this.navCtrl.push(page,{Alumno:this.alumno});
    });

    this.loading = loading;
    this.loading.present();
  }

  Salir()
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('¿Que desea hacer?');

    alert.addInput({
      type: 'radio',
      label: 'Cerrar sesion, ir a Login',
      value: 'cerrarSesion',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Salir de la aplicacion',
      value: 'salir'
    });

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Aceptar',
      handler: data => {
        if(data == "cerrarSesion")
        {
            this.navCtrl.setRoot(LoginPage);
        }
        else
        {
            this.platform.exitApp();
        }
      }
    });
    alert.present();
  }

}


