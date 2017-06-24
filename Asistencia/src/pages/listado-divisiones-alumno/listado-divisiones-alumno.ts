import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Ws } from '../../providers/ws';
import { Alumno } from '../../components/clases/alumno';

@Component({
  providers:[Ws],
  selector: 'page-listado-divisiones-alumno',
  templateUrl: 'listado-divisiones-alumno.html',
})
export class ListadoDivisionesAlumnoPage {

  alumno:Alumno = new Alumno();
  listaMaterias = new Array();
  listaDivisiones = new Array();
  listaDivisionesAlumno = new Array();
  listaArmada = new Array();
  dia = "Sabado";
  cargando = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ws:Ws)
  {
      this.cargando = true;
      this.alumno = JSON.parse(localStorage.getItem("usuario"));
      //this.alumno = this.navParams.get("Alumno");
      this.ListarMaterias();
  }

  ListarMaterias()
  {
        this.listaMaterias = new Array();
        for(let i = 0 ; i < 20 ; i++)
        {
          this.listaMaterias.push(["",""]);
        }

        this.ws.TraerMaterias()
        .then(datos => {
              datos.forEach(mat => {
                  this.listaMaterias[Number(mat.idMateria)][0] = mat.nombre;
                  this.listaMaterias[Number(mat.idMateria)][1] = mat.img;
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
          this.listaDivisiones.push(["","","","","",""]);
        }

        this.ws.TraerDivisiones()
        .then(datos => {
              datos.forEach(div => {
                  this.listaDivisiones[Number(div.idDivision)][0] = this.listaMaterias[Number(div.idMateria)][0];
                  this.listaDivisiones[Number(div.idDivision)][1] = div.hora;
                  this.listaDivisiones[Number(div.idDivision)][2] = div.dia1;
                  this.listaDivisiones[Number(div.idDivision)][3] = div.dia2;
                  this.listaDivisiones[Number(div.idDivision)][4] = div.dia3;
                  this.listaDivisiones[Number(div.idDivision)][5] = this.listaMaterias[Number(div.idMateria)][1];
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
      //CAMBIAR DIA DE LA SEMANA
      this.listaArmada = new Array();
      this.listaDivisionesAlumno.forEach(div =>{
            let variable = ["","","","","",""];
            variable = ["assets/images/materias/"+this.listaDivisiones[Number(div)][5], this.listaDivisiones[Number(div)][0], this.listaDivisiones[Number(div)][2], this.listaDivisiones[Number(div)][3],this.listaDivisiones[Number(div)][4],this.listaDivisiones[Number(div)][1]];
            this.listaArmada.push(variable);
      });
      this.cargando = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoDivisionesAlumno');
  }

  Volver()
  {
    this.navCtrl.pop();
  }
}
