import { Component } from '@angular/core';
import { Platform, AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DatosProfesorPage } from '../datos-profesor/datos-profesor';
import { ListadoClasesProfesorPage } from '../listado-clases-profesor/listado-clases-profesor';
import { ListadoDivisionesProfesorPage } from '../listado-divisiones-profesor/listado-divisiones-profesor';
import { ListadoMateriasProfesorPage } from '../listado-materias-profesor/listado-materias-profesor';
import { NotificacionesProfesorPage } from '../notificaciones-profesor/notificaciones-profesor';
import { LoginPage } from '../login/login';
import { Profesor } from '../../components/clases/profesor';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home-profesor',
  templateUrl: 'home-profesor.html',
  providers:[LocalNotifications]
})
export class HomeProfesorPage
{
  loading : any;
  profesor:Profesor = new Profesor();
  notificacion = "assets/images/alumno/notificacion2.png";
  catNotificacion = 2;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public navParams: NavParams,
              public alertCtrl: AlertController,private localNotifications: LocalNotifications,
              public loadingController : LoadingController)
  {

        this.profesor = JSON.parse(localStorage.getItem("usuario"));
        this.Noti("Bienvenido: "+this.profesor.nombre+' '+this.profesor.apellido);
  }
Noti(mensaje)
  {
  this.localNotifications.schedule({
   text: mensaje,
   at: new Date(new Date().getTime() + 1000),
   led: 'FF0000',
   sound: null
});
  }
  Aceptar(opcion)
  {
    var page;
    this.profesor = JSON.parse(localStorage.getItem("usuario"));
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
        setTimeout(() =>
        {
            this.notificacion = "assets/images/alumno/notificacion.png";
            this.catNotificacion = 0;
        },
        2000);
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

      this.navCtrl.push(page,{Profesor:this.profesor});
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
