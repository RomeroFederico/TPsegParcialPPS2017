import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HomeAlumnoPage } from '../home-alumno/home-alumno';
import { HomeProfesorPage } from '../home-profesor/home-profesor';
import { HomeAdministradorPage } from '../home-administrador/home-administrador';
import { HomeAdministrativoPage } from '../home-administrativo/home-administrativo';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})

export class MenuPage {

  rootPage: any; //Pagina Principal
  tipo:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) 
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
    this.navCtrl.setRoot(LoginPage);
  }

}
