import { Component } from '@angular/core';
import { Platform, AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DatosProfesorPage } from '../datos-profesor/datos-profesor';
import { ListadoClasesProfesorPage } from '../listado-clases-profesor/listado-clases-profesor';
import { ListadoDivisionesProfesorPage } from '../listado-divisiones-profesor/listado-divisiones-profesor';
import { ListadoMateriasProfesorPage } from '../listado-materias-profesor/listado-materias-profesor';
import { NotificacionesProfesorPage } from '../notificaciones-profesor/notificaciones-profesor';
import { LoginPage } from '../login/login';
import { Profesor } from '../../components/clases/profesor';

@Component({
  selector: 'page-home-profesor',
  templateUrl: 'home-profesor.html'
})
export class HomeProfesorPage 
{
  loading : any;
  profesor:Profesor = new Profesor(1,"Octavio","Villegas","99333222","100200","octavio@gmail.com","123",30,"profesor.png","Masculino");

  constructor(public navCtrl: NavController, 
              public platform: Platform,
              public navParams: NavParams,
              public alertCtrl: AlertController, 
              public loadingController : LoadingController) 
  {

  }

  Aceptar(opcion) 
  {
    var page;
    switch (opcion) {
      case '0':

        page = DatosProfesorPage;
        break;

      case '1':

        page = ListadoClasesProfesorPage;
        break;

      case '2':

        page = ListadoDivisionesProfesorPage;
        break;
      case '3':

        page = NotificacionesProfesorPage;
        break;
      case '4':

        page = ListadoMateriasProfesorPage;
        break;
    
    }
    let loading = this.loadingController.create({
      spinner: 'bubbles',
      content: `Espere un Momento...`,
      duration: 1000
    });

    loading.onDidDismiss(() => {
      
      this.navCtrl.push(page);
    });

    this.loading = loading;
    this.loading.present();
  }
  Salir()
  {
    let alert = this.alertCtrl.create({
      title: 'Log Out',
      message: 'Desea cerrar sesion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
           console.log('Salir cancelado!');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.setRoot(LoginPage);
            console.log("Cerrando sesion!");
          }
       }
      ]
    });
    alert.present();
  }

}
