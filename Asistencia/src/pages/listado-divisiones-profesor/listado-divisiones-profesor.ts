import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Division } from '../../components/clases/division';
import { Aula } from '../../components/clases/aula';
import { Materia } from '../../components/clases/materia';
import { Profesor } from '../../components/clases/profesor';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-listado-divisiones-profesor',
  templateUrl: 'listado-divisiones-profesor.html',
})
export class ListadoDivisionesProfesorPage 
{
  profesor : Profesor = new Profesor();
  divisiones: Array<Division>;
  materias: Array<Materia>;
  aulas: Array<Aula>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) 
  {
    //console.log(this.storage.get("Profesor"));
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
      });
    console.log(this.profesor);
    this.divisiones = new Array<Division>();
    this.materias = new Array<Materia>();
    this.aulas = new Array<Aula>();

    this.materias.push(new Materia(1,"Matematica I","java.png"));
    this.materias.push(new Materia(2,"Programacion I","java.png"));
    this.materias.push(new Materia(3,"Laboratorio I","java.png"));
    this.materias.push(new Materia(4,"Ingles I","java.png"));

    this.aulas.push(new Aula(1,"100-A",3));
    this.aulas.push(new Aula(2,"LAB-1",2));

    this.divisiones.push(new Division
    (1,this.aulas[0],this.materias[0],
    this.profesor,"1-A","2017",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Jueves","Martes"],"Cursando",
    30,20,16,1,new Date(2017,3,17)));

    this.divisiones.push(new Division
    (2,this.aulas[0],this.materias[3],
    this.profesor,"1-B","2017",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Martes"],"Cursando",
    30,20,16,1,new Date(2017,3,17)));

    this.divisiones.push(new Division
    (3,this.aulas[1],this.materias[1],
    this.profesor,"1-C","2017",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Lunes"],"Cursando",
    30,20,16,1,new Date(2017,3,17)));

    this.divisiones.push(new Division
    (4,this.aulas[1],this.materias[2],
    this.profesor,"2-A","2017",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Miercoles"],"Cursando",
    30,20,16,1,new Date(2017,3,17)));

    this.divisiones.push(new Division
    (4,this.aulas[1],this.materias[2],
    this.profesor,"2-B","2017",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Miercoles"],"Cursando",
    30,20,16,1,new Date(2017,3,17)));

    console.log(this.divisiones);
    console.log(this.materias);
    //this.divisiones.push(new Division(1,new Aula(1,"100A",1),new Materia(1,)));
  }

  
  Volver()
  {
    this.navCtrl.pop();
  }

}
