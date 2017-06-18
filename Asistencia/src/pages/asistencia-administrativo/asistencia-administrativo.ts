import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Profesor } from '../../components/clases/profesor';
import { Alumno } from '../../components/clases/alumno';

import { Division } from '../../components/clases/division';

@Component({
  selector: 'page-asistencia-administrativo',
  templateUrl: 'asistencia-administrativo.html'
})
export class AsistenciaAdministrativoPage {

  division : Division;
  alumnos : Array<{alumno : Alumno, faltas : number, estado : string, asistio : boolean}>;

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.division = this.navParams.get("division");

    this.alumnos = new Array<{alumno : Alumno, faltas : number, estado : string, asistio : boolean}>();

    this.CargarAlumnos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsistenciaAdministrativoPage');
  }

  /**
  * Volver a la pagina anterior.
  */
  Volver()
  {
    this.navCtrl.pop();
  }

  CargarAlumnos()
  {
    var alumnos : Array<Alumno> = new Array<Alumno>();
    alumnos.push(new Alumno(1, "uno", "UNO", "456", "1001", "b@b.com", "789999", 35, "default.png","Masculino"));
    alumnos.push(new Alumno(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png","Masculino"));
    alumnos.push(new Alumno(3, "tres", "TRES", "456", "1003", "b@b.com", "789999", 35, "default.png","Masculino"));

    alumnos.forEach(alumno => {
      this.alumnos.push({alumno : alumno, faltas : 2, estado : 'Cursando', asistio : false});
    });
  }

}
