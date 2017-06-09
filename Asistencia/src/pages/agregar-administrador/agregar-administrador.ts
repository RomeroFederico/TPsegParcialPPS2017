import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalAdministradorPage } from '../modal-administrador/modal-administrador';
import { HomeAdministradorPage } from '../home-administrador/home-administrador'; 

import { Usuario } from '../../components/clases/usuario';
import { Administrativo } from '../../components/clases/administrativo';
import { Profesor } from '../../components/clases/profesor';
import { Alumno } from '../../components/clases/alumno';

import { Division } from '../../components/clases/division';
import { Aula } from '../../components/clases/aula';
import { Materia } from '../../components/clases/materia';
import { Ciclo } from '../../components/clases/ciclo';

@Component({
  selector: 'page-agregar-administrador',
  templateUrl: 'agregar-administrador.html'
})
export class AgregarAdministradorPage {

  contador = 1;

  opciones : any;

  tipo : string = "Alumno";

  rutaImagen : string = "No se ha elegido una imagen";

  sexo : string = "Masculino";

  divisionesActuales : Array<{division : Division, faltas : number}>;
  divisionesNoEmpezadas : Array<{division : Division, faltas : number}>;
  divisionesTerminadas : Array<{division : Division, faltas : number}>;
  divisionesAbandonadas : Array<{division : Division, faltas : number}>;
  divisionesLibre : Array<{division : Division, faltas : number}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modal : ModalController)
  {
    this.opciones = this.navParams.get("opciones");

    this.divisionesActuales = new Array<{division : Division, faltas : number}>();
    this.divisionesNoEmpezadas = new Array<{division : Division, faltas : number}>();
    this.divisionesTerminadas = new Array<{division : Division, faltas : number}>();
    this.divisionesAbandonadas = new Array<{division : Division, faltas : number}>();
    this.divisionesLibre = new Array<{division : Division, faltas : number}>();

    // this.divisionesActuales.push({division : new Division(1, new Aula(1, "103", 1), new Materia(1, "Arquitectura y Diseño de Bases de Datos", "default.png"),
    //                                   new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png","Masculino"),
    //                                   "4-A", new Ciclo(1, 2017, 1), "Mañana", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
    //                                   ["Martes"], "En curso", 20, 10, 15, 5, new Date(2017, 5, 25)), faltas : 0});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarAdministradorPage');
  }

  /**
  * Volver a la pagina principal.
  */
  Volver()
  {
    this.navCtrl.setRoot(HomeAdministradorPage, {}, {animate: true, direction: 'forward'});
  }

  CambiarTipoDeUsuario()
  {
    console.log(this.tipo);
  }

  DevolverColor()
  {
    if (this.tipo == "Administrativo")
      return 'danger';
    else if (this.tipo == "Profesor")
      return 'secondary';
    else
        return 'primary';
  }

  ObtenerTodosLosIdDivisionesSeleccionadas(noIncluir : string)
  {
    var divisionesId : Array<number> = new Array<number>();

    if (noIncluir != "Actuales")
      this.divisionesActuales.forEach(d => {
        divisionesId.push(d.division.idDivision);
      });
    if (noIncluir != "No Empezadas")
      this.divisionesNoEmpezadas.forEach(d => {
        divisionesId.push(d.division.idDivision);
      });
    if (noIncluir != "Terminadas")
      this.divisionesTerminadas.forEach(d => {
        divisionesId.push(d.division.idDivision);
      });
    if (noIncluir != "Abandonadas")
      this.divisionesAbandonadas.forEach(d => {
        divisionesId.push(d.division.idDivision);
      });
    if (noIncluir != "Libre")
      this.divisionesLibre.forEach(d => {
        divisionesId.push(d.division.idDivision);
      });

    return divisionesId;
  }

  AddAlListadoDivisiones(tipoListado)
  {
    var ListadoAModificar : any;
    var tipo : any;

    switch (tipoListado) {
      case "Actuales":
        
        ListadoAModificar = this.divisionesActuales;
        break;

      case "No Empezadas":
        
        ListadoAModificar = this.divisionesNoEmpezadas;
        break;
        
      case "Terminadas":
        
        ListadoAModificar = this.divisionesTerminadas;
        break;

      case "Abandonadas":
        
        ListadoAModificar = this.divisionesAbandonadas;
        break;

      default:

        ListadoAModificar = this.divisionesLibre;
        break;
    }

    let profileModal = this.modal.create(ModalAdministradorPage, { opciones : {listado : ListadoAModificar, tipoListado : tipoListado, tipo : 'Division', noMostrar : this.ObtenerTodosLosIdDivisionesSeleccionadas(tipoListado) }});

      profileModal.onDidDismiss(data => {

        console.log(data);

        if (data.resultado)
        {
          let divisionesResultado : Array<{division : Division, faltas : number}> = new Array<{division : Division, faltas : number}>();

          data.listado.forEach(element => {
            divisionesResultado.push({division : element, faltas : 0});
          });

          if (tipoListado == "Actuales")
            this.divisionesActuales = divisionesResultado;
          else if (tipoListado == "No Empezadas")
            this.divisionesNoEmpezadas = divisionesResultado;
          else if (tipoListado == "Terminadas")
            this.divisionesTerminadas = divisionesResultado;
          else if (tipoListado == "Abandonadas")
            this.divisionesAbandonadas = divisionesResultado;
          else
            this.divisionesLibre = divisionesResultado;
        }
    });

    profileModal.present();
  }

  QuitarDelListadoDivisiones(tipoListado, idDivision)
  {
    if (tipoListado == "Actuales")
      this.divisionesActuales = this.divisionesActuales.filter((d) => { return d.division.idDivision != idDivision });
    else if (tipoListado == "No Empezadas")
      this.divisionesNoEmpezadas = this.divisionesNoEmpezadas.filter((d) => { return d.division.idDivision != idDivision });
    else if (tipoListado == "Terminadas")
      this.divisionesTerminadas = this.divisionesTerminadas.filter((d) => { return d.division.idDivision != idDivision });
    else if (tipoListado == "Abandonadas")
      this.divisionesAbandonadas = this.divisionesAbandonadas.filter((d) => { return d.division.idDivision != idDivision });
    else
      this.divisionesLibre = this.divisionesLibre.filter((d) => { return d.division.idDivision != idDivision });
  }

  // CargarDivisiones()
  // {
  //   this.contador++;

  //   return new Division(this.contador, new Aula(1, "103", 1), new Materia(1, "Arquitectura y Diseño de Bases de Datos", "default.png"),
  //                                     new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png","Masculino"),
  //                                     "4-A", new Ciclo(1, 2017, 1), "Mañana", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
  //                                     ["Martes"], "En curso", 20, 10, 15, 5, new Date(2017, 5, 25))
  // }

}
