import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Division } from '../../components/clases/division';
import { Aula } from '../../components/clases/aula';
import { Materia } from '../../components/clases/materia';
import { Profesor } from '../../components/clases/profesor';
import { Storage } from '@ionic/storage';

import { Ciclo } from '../../components/clases/ciclo';
import { DatosDivisionProfesorPage } from '../datos-division-profesor/datos-division-profesor';


@Component({
  selector: 'page-listado-divisiones-profesor',
  templateUrl: 'listado-divisiones-profesor.html',
})
export class ListadoDivisionesProfesorPage 
{
  profesor:Profesor = new Profesor();
  divisiones: Array<Division>;
  materias: Array<Materia>;
  aulas: Array<Aula>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) 
  {
    console.log(this.storage.get("Profesor"));
    this.storage.get("Profesor")
    .then(data => 
      {
        this.profesor.idUsuario=data.idUsuario;
        this.profesor.nombre=data.nombre;
        this.profesor.apellido=data.apellido;
        this.profesor.dni=data.dni;
        this.profesor.legajo=data.legajo;
        this.profesor.email=data.email;
        this.profesor.password=data.password;
        this.profesor.edad=data.edad;
        this.profesor.img=data.img;
        this.profesor.sexo=data.sexo;
      });
    console.log(this.profesor);
    this.divisiones = new Array<Division>();
    this.materias = new Array<Materia>();
    this.aulas = new Array<Aula>();

    this.materias.push(new Materia(1,"Laboratorio II","java.png"));
    this.materias.push(new Materia(2,"Laboratorio III","java.png"));
    this.materias.push(new Materia(3,"Laboratorio  VI","java.png"));

    this.aulas.push(new Aula(1,"LAB-5",3));

    this.divisiones.push(new Division
    (1,this.aulas[0],this.materias[0],
    this.profesor,"2-A",new Ciclo(1, 2017, 1), "Mañana",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Martes"],"Cursando",
    30,20,16,1,new Date(2017,3,17)));

    this.divisiones.push(new Division
    (2,this.aulas[0],this.materias[1],
    this.profesor,"3-A",new Ciclo(1, 2017, 1), "Mañana",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Lunes"],"Cursando",
    30,20,16,1,new Date(2017,3,17)));

    this.divisiones.push(new Division
    (3,this.aulas[0],this.materias[2],
    this.profesor,"4-A",new Ciclo(1, 2017, 1), "Mañana",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Jueves"],"Cursando",
    30,20,16,1,new Date(2017,3,17)));



    console.log(this.divisiones);
    console.log(this.materias);
    //this.divisiones.push(new Division(1,new Aula(1,"100A",1),new Materia(1,)));
  }

  Aceptar(division)
  {
    this.navCtrl.push(DatosDivisionProfesorPage,{Division:division});
  }

  Volver()
  {
    this.navCtrl.pop();
  }

}
