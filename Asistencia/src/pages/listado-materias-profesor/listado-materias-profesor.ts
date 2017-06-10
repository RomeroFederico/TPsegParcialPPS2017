import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { Division } from '../../components/clases/division';
import { Aula } from '../../components/clases/aula';
import { Materia } from '../../components/clases/materia';
import { Profesor } from '../../components/clases/profesor';
import { Ciclo } from '../../components/clases/ciclo';

@Component({
  selector: 'page-listado-materias-profesor',
  templateUrl: 'listado-materias-profesor.html',
})
export class ListadoMateriasProfesorPage {

  profesor:Profesor ;
  divisiones: Array<Division>;
  materias: Array<Materia>;
  aulas: Array<Aula>;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.profesor = new Profesor(1,"Cristian","Baus","88777222","333222","cristian@gmail.com","123",30,"profesor.png","Masculino");

    this.divisiones = new Array<Division>();
    this.materias = new Array<Materia>();
    this.aulas = new Array<Aula>();

    this.materias.push(new Materia(1,"Laboratorio I","exe.png"));
    this.materias.push(new Materia(2,"Programacion II","xml.png"));
    this.materias.push(new Materia(3,"Procesamiento de datos","pdf.png"));
    this.materias.push(new Materia(1,"Laboratorio III","css.png"));
    this.materias.push(new Materia(2,"Programacion III","html.png"));

    this.aulas.push(new Aula(1,"LAB-1",3));
    this.aulas.push(new Aula(2,"LAB-3",3));

    this.divisiones.push(new Division
    (1,this.aulas[0],this.materias[0],
    this.profesor,"1-A",new Ciclo(1, 2017, 1), "Mañana",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Martes"],"Cursando",
    30,20,16,1,new Date(2017,3,17)));

    this.divisiones.push(new Division
    (2,this.aulas[0],this.materias[1],
    this.profesor,"1-A",new Ciclo(1, 2017, 1), "Mañana",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Lunes"],"Cursando",
    30,20,16,1,new Date(2017,3,17)));

    this.divisiones.push(new Division
    (3,this.aulas[0],this.materias[2],
    this.profesor,"1-A",new Ciclo(1, 2017, 1), "Mañana",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Jueves"],"Cursando",
    30,20,16,1,new Date(2017,3,17)));

    this.divisiones.push(new Division
    (3,this.aulas[1],this.materias[3],
    this.profesor,"3-B",new Ciclo(1, 2017, 1), "Noche",
    new Date(2017,3,16),new Date(2017,6,20),"18:30 pm",
    ["Viernes"],"Cursando",
    30,20,16,1,new Date(2017,3,17)));
    
    this.divisiones.push(new Division
    (3,this.aulas[1],this.materias[4],
    this.profesor,"3-B",new Ciclo(1, 2017, 1), "Noche",
    new Date(2017,3,16),new Date(2017,6,20),"18:30 pm",
    ["Lunes"],"Cursando",
    30,20,16,1,new Date(2017,3,17)));


    console.log(this.divisiones);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoMateriasProfesor');
  }
  Volver()
  {
    this.navCtrl.pop();
  }

}
