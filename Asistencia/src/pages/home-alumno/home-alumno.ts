import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { DatosAlumnoPage } from '../datos-alumno/datos-alumno';
import { NotificacionesAlumnoPage } from '../notificaciones-alumno/notificaciones-alumno';
import { ListadoDivisionesAlumnoPage } from '../listado-divisiones-alumno/listado-divisiones-alumno';
import { Alumno } from '../../components/clases/alumno';


@Component({
  selector: 'page-home-alumno',
  templateUrl: 'home-alumno.html'
})
export class HomeAlumnoPage {


  loading : any;
  alumno:Alumno = new Alumno(1,"Osmar","Flores","99333222","100200","ramzito@gmail.com","123",20,"alumno.png");

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingController : LoadingController) {}

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





}


