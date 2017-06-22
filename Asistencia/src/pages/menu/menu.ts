import { Component } from '@angular/core';
import { NavController,NavParams,AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';

import { LoginPage } from '../login/login';
import { HomeAlumnoPage } from '../home-alumno/home-alumno';
import { HomeProfesorPage } from '../home-profesor/home-profesor';
import { HomeAdministradorPage } from '../home-administrador/home-administrador';
import { HomeAdministrativoPage } from '../home-administrativo/home-administrativo';

import { DatosProfesorPage } from '../datos-profesor/datos-profesor';
import { ListadoClasesProfesorPage } from '../listado-clases-profesor/listado-clases-profesor';
import { ListadoDivisionesProfesorPage } from '../listado-divisiones-profesor/listado-divisiones-profesor';
import { ListadoMateriasProfesorPage } from '../listado-materias-profesor/listado-materias-profesor';
import { NotificacionesProfesorPage } from '../notificaciones-profesor/notificaciones-profesor';

@Component({
  providers:[Auth],
  selector: 'page-menu',
  templateUrl: 'menu.html'
})

export class MenuPage {

  rootPage: any; //Pagina Principal
  tipo:string = "";

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,private auth : Auth) 
  {
    this.tipo = this.navParams.get("Tipo");

    switch (this.tipo) {
      case "Alumno":

        this.rootPage = HomeAlumnoPage;
        
        break;

      case "Profesor":

        this.rootPage = HomeProfesorPage; 
        
        break;

      case "Administrativo":

        this.rootPage = HomeAdministrativoPage;
        
        break;
      default:

        this.rootPage = HomeAdministradorPage;

        break;
    }
    
    console.log("Desde el menu recibo: "+this.tipo);
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
            this.auth.logOut();
            localStorage.setItem('usuario', null);
            this.navCtrl.setRoot(LoginPage);
            console.log("Cerrando sesion!");
          }
       }
      ]
    });
    alert.present();
  }
  DatosProfesor()
  {
    this.navCtrl.push(DatosProfesorPage);
  }
  ClasesHoyProfesor()
  {
    this.navCtrl.push(ListadoClasesProfesorPage);
  }
  DivisionesProfesor()
  {
    this.navCtrl.push(ListadoDivisionesProfesorPage);
  }
  NotificacionesProfesor()
  {
    this.navCtrl.push(NotificacionesProfesorPage);
  }
  MateriasProfesor()
  {
    this.navCtrl.push(ListadoMateriasProfesorPage);
  }
  

}
