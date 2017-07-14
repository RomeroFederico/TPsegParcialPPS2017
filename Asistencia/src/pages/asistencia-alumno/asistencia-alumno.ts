import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Ws } from '../../providers/ws';
import { Alumno } from '../../components/clases/alumno';

@Component({
  providers:[Ws],
  selector: 'page-asistencia-alumno',
  templateUrl: 'asistencia-alumno.html',
})
export class AsistenciaAlumnoPage {

  alumno:Alumno = new Alumno();
  listado : FirebaseListObservable<any[]>;
  listas: any;
  listaMaterias = new Array();
  listaDivisionesAlumno = new Array();
  listaDivisiones = new Array();
  listaArmada = new Array();
  cargando = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private firebase: AngularFireDatabase,
              public ws:Ws)
  {
        this.cargando = true;
        this.alumno = JSON.parse(localStorage.getItem("usuario"));
        this.listado=firebase.list('/Lista');
        this.listado.subscribe(data => {
          this.listas = data;
        });
        this.ListarMaterias();
  }

  ListarMaterias()
  {
        this.listaMaterias = new Array();
        for(let i = 0 ; i < 20 ; i++)
        {
          this.listaMaterias.push([""]);
        }

        this.ws.TraerMaterias()
        .then(datos => {
              datos.forEach(mat => {
                  this.listaMaterias[Number(mat.idMateria)][0] = mat.nombre;
              });
              this.ListarDivisiones();
        })
        .catch();
  }

  ListarDivisiones()
  {
        this.listaDivisiones = new Array();
        for(let i = 0 ; i < 20 ; i++)
        {
          this.listaDivisiones.push([""]);
        }

        this.ws.TraerDivisiones()
        .then(datos => {
              datos.forEach(div => {
                  this.listaDivisiones[Number(div.idDivision)][0] = this.listaMaterias[Number(div.idMateria)][0];
              });
              this.ListaDivisionesAlumno();
        })
        .catch();
  }

  ListaDivisionesAlumno()
  {
        this.listaDivisionesAlumno = new Array();
        this.ws.TraerDivisionesId(this.alumno.idUsuario)
        .then(datos => {
          datos.Alumnos.forEach(div => {
                  this.listaDivisionesAlumno.push(div.idDivision);
              });
          this.ArmarLista();
        })
        .catch();
  }

  ArmarLista()
  {
      this.listaArmada = new Array();
      this.listaDivisionesAlumno.forEach(div =>{
            let unArray = new Array();
            this.listas.forEach(unaLista =>{
                  unaLista.forEach(list =>{

                      if(list.idDivision == div && list.idAlumno == this.alumno.idUsuario)
                      {
                          let unaVariable = [list.fecha, list.asistio]
                          unArray.push(unaVariable);
                      }
                      //console.log(list.idAlumno, list.materia, list.asistio);
                  });
            });
            let variable = [this.listaDivisiones[div][0], unArray];
            this.listaArmada.push(variable);
      });
      this.cargando = false;
      console.log("listaArmada", this.listaArmada);
  }

  ionViewDidLoad() {

  }

  Volver()
  {
    this.navCtrl.pop();
  }

}
