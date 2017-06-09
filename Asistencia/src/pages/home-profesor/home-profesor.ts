import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController} from 'ionic-angular';
import { DatosProfesorPage } from '../datos-profesor/datos-profesor';
import { ListadoClasesProfesorPage } from '../listado-clases-profesor/listado-clases-profesor';
import { ListadoDivisionesProfesorPage } from '../listado-divisiones-profesor/listado-divisiones-profesor';
import { Profesor } from '../../components/clases/profesor';

@Component({
  selector: 'page-home-profesor',
  templateUrl: 'home-profesor.html'
})
export class HomeProfesorPage 
{
  loading : any;
  profesor:Profesor = new Profesor(1,"Octavio","Villegas","99333222","100200","octavio@gmail.com","123",30,"profesor.png");

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
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
    
    }
    let loading = this.loadingController.create({
      spinner: 'bubbles',
      content: `Espere un Momento...`,
      duration: 1000
    });

    loading.onDidDismiss(() => {
      //this.animacionSeleccion[this.seleccionAnimar] = "";
      this.navCtrl.push(page,{Profesor:this.profesor});
    });

    this.loading = loading;
    this.loading.present();
  }

}
