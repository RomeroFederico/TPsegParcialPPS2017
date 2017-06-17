import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

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

  ciclos : Array<Ciclo>;

  opciones : any;

  tipo : string = "Alumno";

  rutaImagen : string = "No se ha elegido una imagen";

  divisionesActuales : Array<{division : Division, faltas : number}>;
  divisionesNoEmpezadas : Array<{division : Division, faltas : number}>;
  divisionesTerminadas : Array<{division : Division, faltas : number}>;
  divisionesAbandonadas : Array<{division : Division, faltas : number}>;
  divisionesLibre : Array<{division : Division, faltas : number}>;

  usuario : Usuario = new Alumno();
  
  division : Division = new Division();
  fechas : {fechaInicio : string, fechaFin : string, fechaProxClase : string};

  alumnosActuales : Array<{alumno : Alumno, faltas : number}>;
  alumnosNoEmpezadas : Array<{alumno : Alumno, faltas : number}>;
  alumnosTerminadas : Array<{alumno : Alumno, faltas : number}>;
  alumnosAbandonadas : Array<{alumno : Alumno, faltas : number}>;
  alumnosLibre : Array<{alumno : Alumno, faltas : number}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modal : ModalController, public alertCtrl: AlertController)
  {
    this.opciones = this.navParams.get("opciones");

    console.log(this.opciones);

    if (this.opciones.tipo == "Usuario")
    {
      this.divisionesActuales = new Array<{division : Division, faltas : number}>();
      this.divisionesNoEmpezadas = new Array<{division : Division, faltas : number}>();
      this.divisionesTerminadas = new Array<{division : Division, faltas : number}>();
      this.divisionesAbandonadas = new Array<{division : Division, faltas : number}>();
      this.divisionesLibre = new Array<{division : Division, faltas : number}>();
    }
    else if (this.opciones.tipo == "Division")
    {
      this.tipo = this.opciones.tipo;
      
      this.alumnosActuales = new Array<{alumno : Alumno, faltas : number}>();
      this.alumnosNoEmpezadas = new Array<{alumno : Alumno, faltas : number}>();
      this.alumnosTerminadas = new Array<{alumno : Alumno, faltas : number}>();
      this.alumnosAbandonadas = new Array<{alumno : Alumno, faltas : number}>();
      this.alumnosLibre = new Array<{alumno : Alumno, faltas : number}>();

      this.CargarCiclos();
      this.fechas = {fechaInicio : new Date(Date.now()).toISOString(), fechaFin : new Date(Date.now()).toISOString(), fechaProxClase : new Date(Date.now()).toISOString()}
    }
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
    if (this.opciones.tipo != "Usuario")
      return 'dark';
    if (this.tipo == "Administrativo")
      return 'danger';
    else if (this.tipo == "Profesor")
      return 'secondary';
    else
        return 'primary';
  }

  /*
  * Carga los ciclos lectivos de la facultad. Luego se hara con la base de datos.
  */
  CargarCiclos()
  {
    this.ciclos = new Array<Ciclo>();
    this.ciclos.push(new Ciclo(1, 2017, 1));
    this.ciclos.push(new Ciclo(2, 2016, 2));
    this.ciclos.push(new Ciclo(3, 2016, 1));
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

  ObtenerTodosLosIdAlumnosSeleccionados(noIncluir : string)
  {
    var alumnosId : Array<number> = new Array<number>();

    if (noIncluir != "Actuales")
      this.alumnosActuales.forEach(a => {
        alumnosId.push(a.alumno.idUsuario);
      });
    if (noIncluir != "No Empezadas")
      this.alumnosNoEmpezadas.forEach(a => {
        alumnosId.push(a.alumno.idUsuario);
      });
    if (noIncluir != "Terminadas")
      this.alumnosTerminadas.forEach(a => {
        alumnosId.push(a.alumno.idUsuario);
      });
    if (noIncluir != "Abandonadas")
      this.alumnosAbandonadas.forEach(a => {
        alumnosId.push(a.alumno.idUsuario);
      });
    if (noIncluir != "Libre")
      this.alumnosLibre.forEach(a => {
        alumnosId.push(a.alumno.idUsuario);
      });

    return alumnosId;
  }

  AddAlListadoDivisiones(tipoListado)
  {
    var ListadoAModificar : any;

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

  AddAlListadoAlumnos(tipoListado)
  {
    var ListadoAModificar : any;

    switch (tipoListado) {
      case "Actuales":
        
        ListadoAModificar = this.alumnosActuales;
        break;

      case "No Empezadas":
        
        ListadoAModificar = this.alumnosNoEmpezadas;
        break;
        
      case "Terminadas":
        
        ListadoAModificar = this.alumnosTerminadas;
        break;

      case "Abandonadas":
        
        ListadoAModificar = this.alumnosAbandonadas;
        break;

      default:

        ListadoAModificar = this.alumnosLibre;
        break;
    }

    let profileModal = this.modal.create(ModalAdministradorPage, { opciones : {listado : ListadoAModificar, tipoListado : tipoListado, tipo : 'Alumno', noMostrar : this.ObtenerTodosLosIdAlumnosSeleccionados(tipoListado) }});

      profileModal.onDidDismiss(data => {

        console.log(data);

        if (data.resultado)
        {
          let alumnosResultado : Array<{alumno : Alumno, faltas : number}> = new Array<{alumno : Alumno, faltas : number}>();

          data.listado.forEach(element => {
            alumnosResultado.push({alumno : element, faltas : 0});
          });

          if (tipoListado == "Actuales")
            this.alumnosActuales = alumnosResultado;
          else if (tipoListado == "No Empezadas")
            this.alumnosNoEmpezadas = alumnosResultado;
          else if (tipoListado == "Terminadas")
            this.alumnosTerminadas = alumnosResultado;
          else if (tipoListado == "Abandonadas")
            this.alumnosAbandonadas = alumnosResultado;
          else
            this.alumnosLibre = alumnosResultado;
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

  QuitarDelListadoAlumnos(tipoListado, idAlumno)
  {
    if (tipoListado == "Actuales")
      this.alumnosActuales = this.alumnosActuales.filter((a) => { return a.alumno.idUsuario != idAlumno });
    else if (tipoListado == "No Empezadas")
      this.alumnosNoEmpezadas = this.alumnosNoEmpezadas.filter((a) => { return a.alumno.idUsuario != idAlumno });
    else if (tipoListado == "Terminadas")
      this.alumnosTerminadas = this.alumnosTerminadas.filter((a) => { return a.alumno.idUsuario != idAlumno });
    else if (tipoListado == "Abandonadas")
      this.alumnosAbandonadas = this.alumnosAbandonadas.filter((a) => { return a.alumno.idUsuario != idAlumno });
    else
      this.alumnosLibre = this.alumnosLibre.filter((a) => { return a.alumno.idUsuario != idAlumno });
  }

  EstablecerFaltas(divisionConFaltas)
  {
    let alert = this.alertCtrl.create({
      title: 'Establecer Faltas (Maximo: ' + divisionConFaltas.division.claseActual + ")",
      inputs: [
        {
          value: divisionConFaltas.faltas,
          name: 'faltas',
          placeholder: 'Faltas',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Asignar',
          handler: data => {
            if (data.faltas > Number(divisionConFaltas.division.claseActual) || data.faltas < 0)
              this.MostrarMensaje("Error", "No se ha ingresado un numero valido!!!");
            else
              divisionConFaltas.faltas = data.faltas;
          }
        }
      ]
    });
    alert.present();
  }

  EstablecerFaltasAlumno(alumnoYFaltas)
  {
    let alert = this.alertCtrl.create({
      title: 'Establecer Faltas (Maximo: ' + this.division.claseActual + ")",
      inputs: [
        {
          value: alumnoYFaltas.faltas,
          name: 'faltas',
          placeholder: 'Faltas',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Asignar',
          handler: data => {
            if (data.faltas > Number(this.division.claseActual) || data.faltas < 0)
              this.MostrarMensaje("Error", "No se ha ingresado un numero valido!!!");
            else
              alumnoYFaltas.faltas = data.faltas;
          }
        }
      ]
    });
    alert.present();
  }

  AgregarUsuario()
  {
    if (!this.ValidarDatosUsuario())
      this.MostrarMensaje("Error", "No se han ingresado todos los datos.");
    else if (!this.ValidarUsuario())
      this.MostrarMensaje("Error", "El legajo, email o dni ya se ha ingresado.");
    else
    {
      //Agregar usuario en la base de datos.
      this.MostrarMensaje("Exito", this.tipo + " registrado con exito.");
      this.Volver();
    }
  }

  ValidarUsuario()
  {
    //Validar con base de datos que no se repita el email, legajo y dni.
    return true;
  }

  ValidarDatosUsuario()
  {
    if (this.usuario.nombre == "" || this.usuario.apellido == "" || this.usuario.dni == "" || this.usuario.email == "" ||
        this.usuario.legajo == "" || this.usuario.edad == 0)
      return false;
    return true;
  }

  AsignarMateria()
  {
    let profileModal = this.modal.create(ModalAdministradorPage, { opciones : { tipo : "Materia", materiaSeleccionada : this.division.materia.idMateria }});

    profileModal.onDidDismiss(data => {

        console.log(data);

        if (data.resultado && data.materia)
          this.division.materia = data.materia;
    });

    profileModal.present();
  }

  AsignarAula()
  {
    let profileModal = this.modal.create(ModalAdministradorPage, { opciones : { tipo : "Aula", aulaSeleccionada : this.division.aula.idAula }});

    profileModal.onDidDismiss(data => {

        console.log(data);

        if (data.resultado && data.aula)
          this.division.aula = data.aula;
    });

    profileModal.present();
  }

  AsignarProfesor()
  {
    let profileModal = this.modal.create(ModalAdministradorPage, { opciones : { tipo : "Profesor", profesorSeleccionado : this.division.profesor.idUsuario }});

    profileModal.onDidDismiss(data => {

        console.log(data);

        if (data.resultado && data.profesor)
          this.division.profesor = data.profesor;
    });

    profileModal.present();
  }

  ValidarDatosDivision()
  {
    if (this.division.nombre == "" || this.division.ciclo.idCiclo == 0 || this.division.materia.idMateria == 0 || 
        this.division.aula.idAula == 0 || this.division.profesor.idUsuario == 0 || this.division.estado == "" || this.division.dias.length == 0 ||
        this.division.cupoMaximo == 0)
      return false;
    return true;
  }

  AgregarDivision()
  {
    if (!this.ValidarDatosDivision())
      this.MostrarMensaje("Error", "No se han ingresado todos los datos.");
    else if (!this.ValidarDivision())
      this.MostrarMensaje("Error", "La division se esta repitiendo.");
    else
    {
      //Agregar division en la base de datos.
      this.MostrarMensaje("Exito", this.tipo + " registrado con exito.");
      this.Volver();
    }
  }

  ValidarDivision()
  {
    //Validar con base de datos que no se repitan divisiones.
    return true;
  }

  MostrarMensaje(titulo : string, mensaje : string)
  {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }]
    });
    alert.present();
  }

  Cancelar()
  {
    let alert = this.alertCtrl.create({
      title: "Salir",
      subTitle: "Desea cancelar el registro?",
      buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Ok',
        handler: () => {
          this.Volver();
        }
      }
    ]
    });
    alert.present();
  }

}
