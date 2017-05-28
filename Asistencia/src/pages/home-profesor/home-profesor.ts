import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController} from 'ionic-angular';
import { DatosProfesorPage } from '../datos-profesor/datos-profesor';
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

  Aceptar() 
  {
    let loading = this.loadingController.create({
      spinner: 'bubbles',
      content: `Espere un Momento...`,
      duration: 1000
    });

    loading.onDidDismiss(() => {
      //this.animacionSeleccion[this.seleccionAnimar] = "";
      this.navCtrl.push(DatosProfesorPage,{Profesor:this.profesor});
    });

    this.loading = loading;
    this.loading.present();
  }

}
