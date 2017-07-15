import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';

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

import { Ws } from '../../providers/ws';

@Component({
  selector: 'page-agregar-administrador',
  templateUrl: 'agregar-administrador.html',
  providers: [Ws],
})
export class AgregarAdministradorPage {

  vacioNombre : boolean = null;
  vacioApellido : boolean = null;
  vacioEdad : boolean = null;
  vacioLegajo : boolean = null;
  ocupadoLegajo : boolean = null;
  vacioDni: boolean = null;
  vacioEmail : boolean = null;
  errorEmail : boolean = null;

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

  vacioNombreDivision : boolean = null;
  vacioCiclo : boolean = null;
  vacioMateria : boolean = null;
  vacioAula : boolean = null;
  vacioProfesor : boolean = null;
  vacioEstado: boolean = null;
  vacioDias : boolean = null;
  errorFechaInicio : boolean = null;
  errorFechaFin : boolean = null;
  errorFechaProx : boolean = null;
  vacioCupoMaximo : boolean = null;
  errorCupoActual : boolean = null;
  vacioCantClases : boolean = null;
  errorClaseActual : boolean = null;

  alumnosActuales : Array<{alumno : Alumno, faltas : number}>;
  alumnosNoEmpezadas : Array<{alumno : Alumno, faltas : number}>;
  alumnosTerminadas : Array<{alumno : Alumno, faltas : number}>;
  alumnosAbandonadas : Array<{alumno : Alumno, faltas : number}>;
  alumnosLibre : Array<{alumno : Alumno, faltas : number}>;

  materia : Materia;
  vacioNombreMateria : boolean = null;

  aula : Aula;
  piso : string = "Planta baja";
  vacioNombreAula : boolean = null;

  ciclo : Ciclo;
  year : number = 0;
  vacioYear : boolean = null;
  cuatrimestre : string = "Primer cuatrimestre";

  cargando : any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modal : ModalController, public alertCtrl: AlertController, 
              public ws : Ws, public loadingController : LoadingController)
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
    else if (this.opciones.tipo == "Materia")
    {
      this.tipo = this.opciones.tipo;
      this.materia = new Materia();
    }
    else if (this.opciones.tipo == "Aula")
    {
      this.tipo = this.opciones.tipo;
      this.aula = new Aula();
    }
    else if (this.opciones.tipo == "Ciclo")
    {
      this.tipo = this.opciones.tipo;
      this.ciclo = new Ciclo();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarAdministradorPage');
  }

  MostrarLoading(mensaje : string) 
  {
    this.cargando = this.loadingController.create({
      spinner: 'bubbles',
      content: `Cargando ` + mensaje + `, 
      Por Favor Espere un Momento...`,
    });

    this.cargando.present();
  }

  CargarCiclos()
  {
    this.MostrarLoading("ciclos");

    console.log("Cargando ciclos...");

    this.ws.TraerCiclos().then((data) => {

      this.cargando.dismiss();

      this.ciclos = new Array<Ciclo>();

      data.forEach(ciclo => {
        this.ciclos.push(new Ciclo(ciclo.idCiclo, ciclo.anio, ciclo.cuatrimestre));
      });

      console.log(this.ciclos);

    })
    .catch((error) => { this.cargando.dismiss(); this.ReintentarCargarCiclos(); console.log(error); })
  }

  ReintentarCargarCiclos()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de ciclos?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.navCtrl.pop();
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.CargarCiclos();
          }
        }
      ]
    });
    confirm.present();
  }

  ValidarEmail(email)
  {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  ValidarSoloLetrasYNumeros(event, atributo)
  {
    let newText: string = event.target.value;
    if (/^[a-zA-Z0-9]+$/.test(newText) || newText == "") {
      //input is valid, so update the model
      if (atributo == "Division")
        this.division.nombre = newText;
      else if (atributo == "Materia")
        this.materia.nombre = newText;
      else
        this.aula.nombre = newText;
    }
    else {
      //restore the original value
      if (atributo == "Division")
        event.target.value = this.division.nombre;
      else if (atributo == "Materia")
        event.target.value = this.materia.nombre;
      else
        event.target.value = this.aula.nombre;
    }
  }

  ValidarSoloLetras(event, atributo)
  {
    let newText: string = event.target.value;
    if (/^[a-zA-Z]+$/.test(newText) || newText == "") {
      //input is valid, so update the model
      if (atributo == "Apellido")
        this.usuario.apellido = newText;
      else
        this.usuario.nombre = newText;
    }
    else {
      //restore the original value
      if (atributo == "Apellido")
        event.target.value = this.usuario.apellido;
      else
        event.target.value = this.usuario.nombre;
    }
  }

  ValidarSoloNumeros(event, atributo)
  {
    let newText: string = event.target.value;
    if (/^\d*$/.test(newText) || newText == "") {
      //input is valid, so update the model
      if (atributo == "Edad")
        this.usuario.edad = Number(newText);
      else if (atributo == "Dni")
        this.usuario.dni = newText;
      else if (atributo == "CupoMaximo")
        this.division.cupoMaximo = Number(newText);
      else if (atributo == "CupoActual")
        this.division.cupoActual = Number(newText);
      else if (atributo == "CantidadClases")
        this.division.cantClases = Number(newText);
      else if (atributo == "ClaseActual")
        this.division.claseActual = Number(newText);
      else if (atributo == "Year")
        this.year = Number(newText);
      else
        this.usuario.legajo = newText;
    }
    else {
      //restore the original value
      if (atributo == "Edad")
        event.target.value = this.usuario.edad;
      else if (atributo == "Dni")
        event.target.value = this.usuario.dni;
      else if (atributo == "Year")
        event.target.value = this.year;
      else
        event.target.value = this.usuario.legajo;
    }
  }

  /**
  * Volver a la pagina principal.
  */
  Volver()
  {
    this.navCtrl.pop();
  }

  CambiarTipoDeUsuario()
  {
    this.divisionesActuales = new Array<{division : Division, faltas : number}>();
    this.divisionesNoEmpezadas = new Array<{division : Division, faltas : number}>();
    this.divisionesTerminadas = new Array<{division : Division, faltas : number}>();
    this.divisionesAbandonadas = new Array<{division : Division, faltas : number}>();
    this.divisionesLibre = new Array<{division : Division, faltas : number}>();
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

  onChangeEstado()
  {
    this.alumnosActuales = new Array<{alumno : Alumno, faltas : number}>();
    this.alumnosNoEmpezadas = new Array<{alumno : Alumno, faltas : number}>();
    this.alumnosTerminadas = new Array<{alumno : Alumno, faltas : number}>();
    this.alumnosAbandonadas = new Array<{alumno : Alumno, faltas : number}>();
    this.alumnosLibre = new Array<{alumno : Alumno, faltas : number}>();
  }

  // /*
  // * Carga los ciclos lectivos de la facultad. Luego se hara con la base de datos.
  // */
  // CargarCiclos()
  // {
  //   this.ciclos = new Array<Ciclo>();
  //   this.ciclos.push(new Ciclo(1, 2017, 1));
  //   this.ciclos.push(new Ciclo(2, 2016, 2));
  //   this.ciclos.push(new Ciclo(3, 2016, 1));
  // }

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
    else
    {
      //Agregar usuario en la base de datos.
      let divisiones = new Array<any>();

      this.divisionesActuales.forEach((division) => {
        divisiones.push({idDivision : division.division.idDivision, faltas : division.faltas, estado : "Cursando"});
      })
      this.divisionesNoEmpezadas.forEach((division) => {
        divisiones.push({idDivision : division.division.idDivision, faltas : division.faltas, estado : "No empezada"});
      })
      this.divisionesTerminadas.forEach((division) => {
        divisiones.push({idDivision : division.division.idDivision, faltas : division.faltas, estado : "Terminada"});
      })
      this.divisionesAbandonadas.forEach((division) => {
        divisiones.push({idDivision : division.division.idDivision, faltas : division.faltas, estado : "Abandonada"});
      })
      this.divisionesLibre.forEach((division) => {
        divisiones.push({idDivision : division.division.idDivision, faltas : division.faltas, estado : "Libre"});
      })

      var usuarioAgregar = { nombre : this.usuario.nombre,
                             apellido : this.usuario.apellido,
                             sexo : this.usuario.sexo,
                             edad : this.usuario.edad,
                             dni : this.usuario.dni,
                             legajo : this.usuario.legajo,
                             email : this.usuario.email,
                             password : this.usuario.legajo,
                             tipo : (this.tipo == "Usuario"? "Alumno" : this.tipo),
                             img : "default.png",
                             divisiones : divisiones
                            }
                            
      this.MostrarLoading("subida de la division");

      this.ws.AgregarUsuario(usuarioAgregar).then((data) => {

        this.cargando.dismiss();

        console.log(data);

        if (data.exito)
        {
          this.MostrarMensaje("Exito", this.tipo + " registrado con exito.");
          this.Volver();
        }
        else
        {
          this.MostrarMensaje("Error", data.mensaje);
        }
      })
      .catch((error) => { this.cargando.dismiss(); this.MostrarMensaje("Error en el servidor", "Vuelva a intentar mas tarde..."); console.log(error); })
    }
  }

  ValidarDatosUsuario()
  {
    var valido = true;

    this.vacioApellido = null;
    this.vacioNombre = null;
    this.vacioEdad = null;
    this.vacioEmail = null;
    this.vacioLegajo = null;
    this.vacioDni = null;
    this.errorEmail = null;

    if (this.usuario.apellido == "")
    {
      this.vacioApellido = true;
      valido = false;
    }
    if (this.usuario.nombre == "")
    {
      this.vacioNombre = true;
      valido = false;
    }
    if (this.usuario.edad < 18)
    {
      this.vacioEdad = true;
      valido = false;
    }
    if (this.usuario.legajo == "")
    {
      this.vacioLegajo = true;
      valido = false;
    }
    if (this.usuario.dni == "")
    {
      this.vacioDni = true;
      valido = false;
    }
    if (this.usuario.email == "")
    {
      this.vacioEmail = true;
      valido = false;
    }
    else if (!this.ValidarEmail(this.usuario.email))
    {
      this.errorEmail = true;
      valido = false;
    }

    return valido;
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
    // if (this.division.nombre == "" || this.division.ciclo.idCiclo == 0 || this.division.materia.idMateria == 0 || 
    //     this.division.aula.idAula == 0 || this.division.profesor.idUsuario == 0 || this.division.estado == "" || this.division.dias.length == 0 ||
    //     this.division.cupoMaximo == 0)
    //   return false;
    // return true;

  //   vacioNombreDivision : boolean = null;
  // vacioCiclo : boolean = null;
  // vacioMateria : boolean = null;
  // vacioAula : boolean = null;
  // vacioProfesor : boolean = null;
  // vacioEstado: boolean = null;
  // vacioDias : boolean = null;
  // errorFechaInicio : boolean = null;
  // errorFechaFin : boolean = null;
  // errorFechaProx : boolean = null;
  // vacioCupoMaximo : boolean = null;
  // errorCupoActual : boolean = null;
  // vacioCantClases : boolean = null;
  // errorClaseActual : boolean = null;

    var valido = true;

    this.vacioNombreDivision = null;
    this.vacioCiclo = null;
    this.vacioMateria = null;
    this.vacioAula = null;
    this.vacioProfesor = null;
    this.vacioEstado = null;
    this.vacioDias = null;
    this.errorFechaInicio = null; // NO IMPLEMENTADO
    this.errorFechaFin = null; // NO IMPLEMENTADO
    this.errorFechaProx = null; // NO IMPLEMENTADO
    this.vacioCupoMaximo = null;
    this.errorCupoActual = null;
    this.vacioCantClases = null;
    this.errorClaseActual = null;

    if (this.division.nombre == "")
    {
      this.vacioNombreDivision = true;
      valido = false;
    }
    if (this.division.ciclo.idCiclo == 0)
    {
      this.vacioCiclo = true;
      valido = false;
    }
    if (this.division.materia.idMateria == 0)
    {
      this.vacioMateria = true;
      valido = false;
    }
    if (this.division.aula.idAula == 0)
    {
      this.vacioAula = true;
      valido = false;
    }
    if (this.division.profesor.idUsuario == 0)
    {
      this.vacioProfesor = true;
      valido = false;
    }
    if (this.division.estado == "")
    {
      this.vacioEstado = true;
      valido = false;
    }
    if (this.division.dias.length == 0)
    {
      this.vacioDias = true;
      valido = false;
    }
    if (this.division.cupoMaximo == 0)
    {
      this.vacioCupoMaximo = true;
      valido = false;
    }
    if (this.division.cantClases == 0)
    {
      this.vacioCantClases = true;
      valido = false;
    }
    if (this.division.cupoActual > this.division.cupoMaximo)
    {
      this.errorCupoActual = true;
      valido = false;
    }
    if (this.division.claseActual > this.division.cantClases)
    {
      this.errorClaseActual = true;
      valido = false;
    }

    return valido;
  }

  AgregarDivision()
  {
    if (!this.ValidarDatosDivision())
      this.MostrarMensaje("Error", "Datos invalidos, verifique...");
    else
    {
      //Agregar division en la base de datos.
      let alumnos = new Array<any>();

      this.alumnosActuales.forEach((alumno) => {
        alumnos.push({idAlumno : alumno.alumno.idUsuario, faltas : alumno.faltas, estado : "Cursando"});
      })
      this.alumnosNoEmpezadas.forEach((alumno) => {
        alumnos.push({idAlumno : alumno.alumno.idUsuario, faltas : alumno.faltas, estado : "No empezada"});
      })
      this.alumnosTerminadas.forEach((alumno) => {
        alumnos.push({idAlumno : alumno.alumno.idUsuario, faltas : alumno.faltas, estado : "Terminada"});
      })
      this.alumnosAbandonadas.forEach((alumno) => {
        alumnos.push({idAlumno : alumno.alumno.idUsuario, faltas : alumno.faltas, estado : "Abandonada"});
      })
      this.alumnosLibre.forEach((alumno) => {
        alumnos.push({idAlumno : alumno.alumno.idUsuario, faltas : alumno.faltas, estado : "Libre"});
      })

      var divisionAgregar = {idAula : this.division.aula.idAula,
                             idMateria : this.division.materia.idMateria,
                             idCiclo : this.division.ciclo.idCiclo,
                             idProfesor : this.division.profesor.idUsuario,
                             nombre : this.division.nombre,
                             turno : this.division.turno,
                             fechaInicio : this.fechas.fechaInicio,
                             fechaFin : this.fechas.fechaFin,
                             hora : this.division.hora,
                             dia1 : this.division.dias,
                             dia2 : null,
                             dia3 : null,
                             estado : this.division.estado,
                             cupoMaximo : this.division.cupoMaximo,
                             cupoActual : this.division.cupoActual,
                             cantClases : this.division.cantClases,
                             claseActual : this.division.claseActual,
                             fechaProxClase : this.fechas.fechaProxClase,
                             alumnos : alumnos
                            }
                            
      this.MostrarLoading("subida de la division");

      this.ws.AgregarDivision(divisionAgregar).then((data) => {

        this.cargando.dismiss();

        console.log(data);

        if (data.exito)
        {
          this.MostrarMensaje("Exito", this.tipo + " registrado con exito.");
          this.Volver();
        }
        else
        {
          this.MostrarMensaje("Error", data.mensaje);
        }
      })
      .catch((error) => { this.cargando.dismiss(); this.MostrarMensaje("Error en el servidor", "Vuelva a intentar mas tarde..."); console.log(error); })
    }
  }

  AgregarMateria()
  {
    if (!this.ValidarDatosMateria())
      this.MostrarMensaje("Error", "El nombre no se ha ingresado");
    else
    {
      //Agregar materia en la base de datos.
      this.MostrarLoading("subida de la materia");

      this.ws.AgregarMateria({nombre : this.materia.nombre, img : "default.png"}).then((data) => {

        this.cargando.dismiss();

        if (data.exito)
        {
          this.MostrarMensaje("Exito", this.tipo + " registrado con exito.");
          this.Volver();
        }
        else
        {
          this.MostrarMensaje("Error", data.mensaje);
        }
      })
      .catch((error) => { this.cargando.dismiss(); this.MostrarMensaje("Error en el servidor", "Vuelva a intentar mas tarde..."); console.log(error); })
    }
  }

  ValidarDatosMateria()
  {
    var valido = true;

    this.vacioNombreMateria = null;

    if (this.materia.nombre == "")
    {
      this.vacioNombreMateria = true;
      valido = false;
    }

    return valido;
  }

  AgregarAula()
  {
    if (!this.ValidarDatosAula())
      this.MostrarMensaje("Error", "El nombre no se ha ingresado");
    else
    {
      //Agregar ciclo en la base de datos.

      if (this.piso == "Planta baja")
        this.aula.piso = 0;
      else if (this.piso == "Primer piso")
        this.aula.piso = 1;
      else if (this.piso == "Segundo piso")
        this.aula.piso = 2;
      else
        this.aula.piso = 3;

      this.MostrarLoading("subida del aula");

      this.ws.AgregarAula({nombre : this.aula.nombre, piso : this.aula.piso}).then((data) => {

        this.cargando.dismiss();

        if (data.exito)
        {
          this.MostrarMensaje("Exito", this.tipo + " registrado con exito.");
          this.Volver();
        }
        else
        {
          this.MostrarMensaje("Error", data.mensaje);
        }
      })
      .catch((error) => { this.cargando.dismiss(); this.MostrarMensaje("Error en el servidor", "Vuelva a intentar mas tarde..."); console.log(error); })
    }
  }

  ValidarDatosAula()
  {
    var valido = true;

    this.vacioNombreAula = null;

    if (this.aula.nombre == "")
    {
      this.vacioNombreAula = true;
      valido = false;
    }

    return valido;
  }

  AgregarCiclo()
  {
    if (!this.ValidarDatosCiclo())
      this.MostrarMensaje("Error", "El año ingresado no es valido.");
    else
    {
      //Agregar ciclo en la base de datos.

      this.MostrarLoading("subida del ciclo");

      this.ws.AgregarCiclo({anio : this.year, cuatrimestre: (this.cuatrimestre == 'Primer cuatrimestre'? 1 : 2)}).then((data) => {

        this.cargando.dismiss();

        if (data.exito)
        {
          this.MostrarMensaje("Exito", this.tipo + " registrado con exito.");
          this.Volver();
        }
        else
        {
          this.MostrarMensaje("Error", data.mensaje);
        }
      })
      .catch((error) => { this.cargando.dismiss(); this.MostrarMensaje("Error en el servidor", "Vuelva a intentar mas tarde..."); console.log(error); })
    }
  }

  ValidarDatosCiclo()
  {
    var valido = true;

    this.vacioYear = null;

    if (this.year < 2000)
    {
      this.vacioYear = true;
      valido = false;
    }

    return valido;
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
