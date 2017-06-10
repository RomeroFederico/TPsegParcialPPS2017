import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Division } from '../../components/clases/division';
import { Alumno } from '../../components/clases/alumno';

@Component({
  selector: 'page-datos-division-profesor',
  templateUrl: 'datos-division-profesor.html',
})
export class DatosDivisionProfesorPage 
{
  alumnos: Array<Alumno> = new Array<Alumno>();
  division:Division = new Division();
  mostrar:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.division = this.navParams.get("Division");
    console.log(this.division);
    this.alumnos.push(new Alumno(1, "Osmar", "Flores", "789", "1003", "osmar@gmail.com", "811124", 18, "alumno.png","Masculino"));
    this.alumnos.push(new Alumno(2, "Federico", "Romero", "101", "1006", "fede@gmail.com", "811124", 21, "alumno.png","Masculino"));
    this.alumnos.push(new Alumno(3, "Daniel", "Gueler", "999", "1009", "dani@gmail.com", "811124", 25, "alumno.png","Masculino"));
  }

  Volver()
  {
    this.navCtrl.pop();
  }
  ObtenerFecha(date : Date)
  {
    return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
  }
  MostrarAlumnos()
  {
    if(this.mostrar==false)
      this.mostrar=true;
    else
      this.mostrar=false;
  }
}
