import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { Ws } from '../../providers/ws';

import { HomeAdministrativoPage } from '../home-administrativo/home-administrativo';
import { AsistenciaAdministrativoPage } from '../asistencia-administrativo/asistencia-administrativo';
import { DatosAdministradorPage } from '../datos-administrador/datos-administrador';
import { HomeAdministradorPage } from '../home-administrador/home-administrador';

import { Usuario } from '../../components/clases/usuario';
//import { Administrador } from '../../components/clases/administrador';
import { Administrativo } from '../../components/clases/administrativo';
import { Profesor } from '../../components/clases/profesor';
import { Alumno } from '../../components/clases/alumno';

import { Division } from '../../components/clases/division';
import { Ciclo } from '../../components/clases/ciclo';
import { Aula } from '../../components/clases/aula';
import { Materia } from '../../components/clases/materia';

@Component({
  selector: 'page-listado-administrativo',
  templateUrl: 'listado-administrativo.html',
  providers: [Ws]
})
export class ListadoAdministrativoPage {

  opciones : any;

  usuariosBase : Array<Usuario>;
  usuarios : Array<Usuario>;

  ciclos : Array<Ciclo>;

  // materias : Array<Materia>;
  // materiasBase : Array<Materia>;

  divisionesBase : Array<Division>;
  divisiones : Array<Division> = null;

  // aulasBase : Array<Aula>;
  // aulas : Array<Aula>;

  filtro : string = "Todos";
  buscar : string;

  eventoFiltrar : any;

  cargando : any = null;

  recargar : any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ws : Ws, 
              public loadingController : LoadingController, public alertCtrl: AlertController)
  {
    this.opciones = this.navParams.get("opciones");
    console.log(this.opciones);

    if (this.opciones.tipo == "Asistencia")
    {
      this.CargarDivisionesConActividades();
      //this.InicializarListadoDivisionesConActividades();
      this.buscar = "Materia";
    }
    else if (this.opciones.tipo == "Division")
    {
      this.CargarCiclos();
      //this.CargarDivisiones();
      //this.InicializarListadoDivisiones();
      this.buscar = "Materia";
    }
    else if (this.opciones.tipo == "Alumno") {
      this.CargarAlumnos();
      this.filtro = "Alumno";
      //this.InicializarListadoUsuarios();
      this.buscar = "Apellido";
    }
    else if (this.opciones.tipo == "Profesor") {
      this.CargarProfesores();
      this.filtro = "Profesor";
      //this.InicializarListadoUsuarios();
      this.buscar = "Apellido";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoAdministradorPage');
  }

  /**
  * Volver a la pagina principal.
  */
  Volver()
  {
    this.navCtrl.setRoot(HomeAdministrativoPage, {}, {animate: true, direction: 'forward'});
  }

  /**
   * Permite tomar lista de la division seleccionada.
   * @param division division a tomar lista.
   */
  TomarLista(division : Division)
  {
    this.navCtrl.push(AsistenciaAdministrativoPage, {division : division});
  }

  /**
  * Muestra el usuario seleccionado, en la pagina DatosAdministradorPage.
  * @param usuario usuario a mostrar.
  */
  MostrarDatosUsuario(usuario: Usuario) {
    this.navCtrl.push(DatosAdministradorPage, { tipo: 'Usuario', usuario: usuario });
  }

  /**
  * Muestra el usuario seleccionado, en la pagina DatosAdministradorPage.
  * @param usuario usuario a mostrar.
  */
  MostrarDatosDivision(division: Division) {
    this.navCtrl.push(DatosAdministradorPage, { tipo: 'Division', division: division });
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

  // /**
  // * Carga los usuarios. Luego se hara con la base de datos.
  // */
  // CargarUsuarios()
  // {
  //   this.usuariosBase = new Array<Usuario>();

  //   this.usuariosBase.push(new Administrativo(1, "uno", "UNO", "123", "1001", "a@a.com", "123456", 21, "default.png","Masculino"));
  //   this.usuariosBase.push(new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png","Masculino"));
  //   this.usuariosBase.push(new Alumno(3, "tres", "TRES", "789", "1003", "c@c.com", "811124", 18, "default.png","Masculino"));
  //   this.usuariosBase.push(new Alumno(4, "cuatro", "CUATRO", "987", "1004", "d@d.com", "8144124", 19, "default.png","Masculino"));
  //   this.usuariosBase.push(new Alumno(5, "cinco", "CINCO", "235", "1005", "e@e.com", "811125", 20, "default.png","Femenino"));
  //   this.usuariosBase.push(new Profesor(6, "seis", "SEIS", "788", "1081", "f@f.com", "729999", 40, "default.png","Masculino"));
  //   this.usuariosBase.push(new Profesor(7, "siete", "SIETE", "125", "1082", "g@g.com", "719999", 50, "default.png","Femenino"));
  // }

  CargarAlumnos()
  {
    this.usuariosBase = new Array<Alumno>();

    this.MostrarLoading("alumnos");

    this.ws.TraerUsuarios().then(
      (value) => {
        console.log(value);
        value.forEach(obj => {

          var usuario : any;
          if (obj.tipo == "Alumno")
          {
            usuario = new Alumno(obj.idUsuario, obj.nombre, obj.apellido, obj. dni, obj.legajo, obj.email, obj.password, obj.edad, obj.img, obj.sexo);
            this.usuariosBase.push(usuario);
          }
        });

        this.cargando.dismiss();
        this.InicializarListadoUsuarios();
      }
    )
    .catch((error) => { this.cargando.dismiss(); this.ReintentarCargarAlumnos(); console.log(error)});
  }

  ReintentarCargarAlumnos()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de alumnos?',
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
            this.CargarAlumnos();
          }
        }
      ]
    });
    confirm.present();
  }

  CargarProfesores() {
    // this.usuariosBase = new Array<Usuario>();

    // this.usuariosBase.push(new Administrativo(1, "uno", "UNO", "123", "1001", "a@a.com", "123456", 21, "default.png", "Masculino"));
    // this.usuariosBase.push(new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png", "Masculino"));
    // this.usuariosBase.push(new Alumno(3, "tres", "TRES", "789", "1003", "c@c.com", "811124", 18, "default.png", "Masculino"));
    this.usuariosBase = new Array<Profesor>();

    this.MostrarLoading("profesores");

    this.ws.TraerUsuarios().then(
      (value) => {
        console.log(value);
        value.forEach(obj => {

          var usuario : any;
          if (obj.tipo == "Profesor")
          {
            usuario = new Profesor(obj.idUsuario, obj.nombre, obj.apellido, obj. dni, obj.legajo, obj.email, obj.password, obj.edad, obj.img, obj.sexo);
            this.usuariosBase.push(usuario);
          }
        });

        this.cargando.dismiss();
        this.InicializarListadoUsuarios();
      }
    )
    .catch((error) => { this.cargando.dismiss(); this.ReintentarCargarProfesores(); console.log(error)});
  }

  ReintentarCargarProfesores()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de profesores?',
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
            this.CargarProfesores();
          }
        }
      ]
    });
    confirm.present();
  }

  /*
  * Carga los ciclos lectivos de la facultad. Luego se hara con la base de datos.
  */
  // CargarCiclos()
  // {
  //   this.ciclos = new Array<Ciclo>();
  //   this.ciclos.push(new Ciclo(1, 2017, 1));
  //   this.ciclos.push(new Ciclo(2, 2016, 2));
  //   this.ciclos.push(new Ciclo(3, 2016, 1));
  // }

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

      this.CargarDivisiones();

      console.log(this.ciclos);

    })
    .catch((error) => { this.cargando.dismiss(); this.ReintentarCargarCiclos(); console.log(error); })
  }

  ReintentarCargarCiclos()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de divisiones?',
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

  /**
  * Carga las divisiones con actividades en el dia de la fecha. Luego se hara con la base de datos.
  */
  CargarDivisionesConActividades()
  {
    // this.divisionesBase = new Array<Division>();

    // this.divisionesBase.push(new Division(1, new Aula(1, "103", 1), new Materia(1, "Arquitectura y Diseño de Bases de Datos", "default.png"),
    //                                   new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png"),
    //                                   "4-A", new Ciclo(1, 2017, 1), "Mañana", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
    //                                   ["Martes"], "En curso", 20, 10, 15, 5, new Date(2017, 5, 25)));
    // this.divisionesBase.push(new Division(2, new Aula(1, "103", 1), new Materia(2, "Matematica III", "default.png"),
    //                                   new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
    //                                   "5-A", new Ciclo(1, 2017, 1), "Mañana",new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
    //                                   ["Miercoles", "Viernes"], "En curso", 18, 9, 15, 4, new Date(2017, 5, 28)));

    // var materias = new Array<Materia>();
    // var aulas = new Array<Aula>();
    // var profesor = new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png");

    // materias.push(new Materia(1,"Matematica I","default.png"));
    // materias.push(new Materia(2,"Programacion I","java.png"));
    // materias.push(new Materia(3,"Laboratorio I","javascript.png"));
    // materias.push(new Materia(4,"Ingles I","xml.png"));

    // aulas.push(new Aula(1,"100-A",3));
    // aulas.push(new Aula(2,"LAB-1",2));

    // this.divisionesBase.push(new Division
    // (1,aulas[0],materias[0],
    // profesor,"1-A",new Ciclo(1, 2017, 1), "Mañana",
    // new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    // ["Jueves","Martes"],"Cursando",
    // 30,20,16,1,new Date(2017,3,17)));

    // this.divisionesBase.push(new Division
    // (2,aulas[0],materias[3],
    // profesor,"1-B",new Ciclo(1, 2017, 1), "Mañana",
    // new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    // ["Martes"],"Cursando",
    // 30,20,16,1,new Date(2017,3,17)));

    // this.divisionesBase.push(new Division
    // (3,aulas[1],materias[1],
    // profesor,"1-C",new Ciclo(1, 2017, 1), "Mañana",
    // new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    // ["Lunes"],"Cursando",
    // 30,20,16,1,new Date(2017,3,17)));

    // this.divisionesBase.push(new Division
    // (4,aulas[1],materias[2],
    // profesor,"2-A",new Ciclo(1, 2017, 1), "Mañana",
    // new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    // ["Miercoles"],"Cursando",
    // 30,20,16,1,new Date(2017,3,17)));

    // this.divisionesBase.push(new Division
    // (4,aulas[1],materias[2],
    // profesor,"2-B",new Ciclo(1, 2017, 1), "Mañana",
    // new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    // ["Miercoles"],"Cursando",
    // 30,20,16,1,new Date(2017,3,17)));

    if (this.recargar == null)
      this.MostrarLoading("divisiones con actividades en el dia");

    this.ws.TraerDivisionesDelDia().then((data) => {

      if (this.recargar == null)
        this.cargando.dismiss();

      console.log(data);

      if (this.recargar != null)
      {
        this.recargar.complete();
        this.recargar = null;
      }

      if (data.Exito)

      {
        this.divisionesBase = data.Divisiones;

        for (var i = 0; i < this.divisionesBase.length; i++) {
          this.divisionesBase[i].materia = new Materia(data.Divisiones[i].idMateria, data.Divisiones[i].nombreMateria, data.Divisiones[i].img);
          this.divisionesBase[i].ciclo = new Ciclo(data.Divisiones[i].idCiclo, data.Divisiones[i].anio, data.Divisiones[i].cuatrimestre)
        }

        this.InicializarListadoDivisionesConActividades();
      }

    })
    .catch((error) => {

      if (this.recargar != null)
      {
        this.recargar.complete();
        this.recargar = null;
      }

      if (this.recargar == null)
        this.cargando.dismiss();

      this.ReintentarCargarDivisionesDia();
      console.log(error);

    });
  }

  RefrescarLista(refrescador)
  {
    this.recargar = refrescador;

    this.divisiones = null;

    this.CargarDivisionesConActividades();
  }

  ReintentarCargarDivisionesDia()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de divisiones?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.navCtrl.setRoot(HomeAdministrativoPage);
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.CargarDivisionesConActividades();
          }
        }
      ]
    });
    confirm.present();
  }

  // /**
  // * Carga las divisiones. Luego se hara con la base de datos.
  // */
  // CargarDivisiones()
  // {
  //   this.divisionesBase = new Array<Division>();

  //   this.divisionesBase.push(new Division(1, new Aula(1, "103", 1), new Materia(1, "Arquitectura y Diseño de Bases de Datos", "default.png"),
  //                                     new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png"),
  //                                     "4-A", new Ciclo(1, 2017, 1), "Mañana", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
  //                                     ["Martes"], "En curso", 20, 10, 15, 5, new Date(2017, 5, 25)));
  //   this.divisionesBase.push(new Division(2, new Aula(1, "103", 1), new Materia(2, "Matematica III", "default.png"),
  //                                     new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
  //                                     "5-A", new Ciclo(1, 2017, 1), "Mañana",new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
  //                                     ["Miercoles", "Viernes"], "En curso", 18, 9, 15, 4, new Date(2017, 5, 28)));
  //   this.divisionesBase.push(new Division(2, new Aula(1, "104", 1), new Materia(3, "Matematica II", "default.png"),
  //                                     new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
  //                                     "4-A", new Ciclo(2, 2016, 2), "Mañana",new Date(2016, 9, 25), new Date(2016, 12, 5), "08:00", 
  //                                     ["Lunes"], "Terminada", 18, 9, 15, 15, null));

  //   var materias = new Array<Materia>();
  //   var aulas = new Array<Aula>();
  //   var profesor = new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png");

  //   materias.push(new Materia(1,"Matematica I","default.png"));
  //   materias.push(new Materia(2,"Programacion I","java.png"));
  //   materias.push(new Materia(3,"Laboratorio I","javascript.png"));
  //   materias.push(new Materia(4,"Ingles I","xml.png"));

  //   aulas.push(new Aula(1,"100-A",3));
  //   aulas.push(new Aula(2,"LAB-1",2));

  //   this.divisionesBase.push(new Division
  //   (1,aulas[0],materias[0],
  //   profesor,"1-A",new Ciclo(1, 2017, 1), "Mañana",
  //   new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
  //   ["Jueves","Martes"],"Cursando",
  //   30,20,16,1,new Date(2017,3,17)));

  //   this.divisionesBase.push(new Division
  //   (2,aulas[0],materias[3],
  //   profesor,"1-B",new Ciclo(1, 2017, 1), "Mañana",
  //   new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
  //   ["Martes"],"Cursando",
  //   30,20,16,1,new Date(2017,3,17)));

  //   this.divisionesBase.push(new Division
  //   (3,aulas[1],materias[1],
  //   profesor,"1-C",new Ciclo(1, 2017, 1), "Mañana",
  //   new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
  //   ["Lunes"],"Cursando",
  //   30,20,16,1,new Date(2017,3,17)));

  //   this.divisionesBase.push(new Division
  //   (4,aulas[1],materias[2],
  //   profesor,"2-A",new Ciclo(1, 2017, 1), "Mañana",
  //   new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
  //   ["Miercoles"],"Cursando",
  //   30,20,16,1,new Date(2017,3,17)));

  //   this.divisionesBase.push(new Division
  //   (4,aulas[1],materias[2],
  //   profesor,"2-B",new Ciclo(1, 2017, 1), "Mañana",
  //   new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
  //   ["Miercoles"],"Cursando",
  //   30,20,16,1,new Date(2017,3,17)));
  // }

  CargarDivisiones() 
  {
    this.divisionesBase = new Array<Division>();

    this.MostrarLoading("divisiones");

    this.ws.TraerDivisionesCompletas().then(
      (data) => {
        console.log(data);

        this.cargando.dismiss();
        
        if (data.Exito)
        {
          data.Divisiones.forEach(division => {

            this.divisionesBase.push(division);
            this.divisionesBase[this.divisionesBase.length - 1].profesor = new Profesor(division.idProfesor, division.nombreProfesor, division.apellido, "", division.legajo, division.email, "", 0, division.imgProfesor, "");
            this.divisionesBase[this.divisionesBase.length - 1].materia = new Materia(division.idMateria, division.nombreMateria, division.img);
            this.divisionesBase[this.divisionesBase.length - 1].ciclo = new Ciclo(division.idCiclo, division.anio, division.cuatrimestre);
            this.divisionesBase[this.divisionesBase.length - 1].aula = new Aula(division.idAula, division.nombreAula, division.piso);
            this.divisionesBase[this.divisionesBase.length - 1].dias = [division.dia1, division.dia2, division.dia3];
            let fechaInicio = division.fechaInicio.split('-');
            this.divisionesBase[this.divisionesBase.length - 1].fechaInicio = new Date(fechaInicio[0], fechaInicio[1] - 1, fechaInicio[2]);
            let fechaFin = division.fechaFin.split('-');
            this.divisionesBase[this.divisionesBase.length - 1].fechaFin = new Date(fechaFin[0], fechaFin[1] - 1, fechaFin[2]);
            if (division.fechaProxClase != null)
            {
              let fechaProxClase = division.fechaProxClase.split('-');
              this.divisionesBase[this.divisionesBase.length - 1].fechaProxClase = new Date(fechaProxClase[0], fechaProxClase[1] - 1, fechaProxClase[2]);
            }
            else
              this.divisionesBase[this.divisionesBase.length - 1].fechaProxClase = null;
          });

          this.InicializarListadoDivisiones();
        }
      }
    )
    .catch((error) => { this.cargando.dismiss(); this.ReintentarCargarDivisiones(); console.log(error)});
  }

  ReintentarCargarDivisiones()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de divisiones?',
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
            this.CargarDivisiones();
          }
        }
      ]
    });
    confirm.present();
  }

  // /**
  // * Inicializa el listado de acuerdo al filtro seleccionado (Todos, Alumnos, Profesor, Administrativo).
  // */
  InicializarListadoUsuarios()
  {
    if (this.filtro == "Todos")
      this.usuarios = this.usuariosBase;
    else
    {
      this.usuarios = this.usuariosBase.filter((item) => {
        if (this.filtro == "Alumno")
          return (item instanceof Alumno);
        else if (this.filtro == "Profesor")
          return (item instanceof Profesor);
        else
          return (item instanceof Administrativo);
      })
    }
  }

  // /**
  // * Inicializa el listado de acuerdo al filtro seleccionado (Todos, por ciclo).
  // */
  InicializarListadoDivisiones()
  {
    if (this.filtro == "Todos")
      this.divisiones = this.divisionesBase;
    else
    {
      this.divisiones = this.divisionesBase.filter((item) => {
          return (item.ciclo.CicloEnCadena == this.filtro);
      })
    }
  }

  InicializarListadoDivisionesConActividades()
  {
    this.divisiones = this.divisionesBase;
  }

  // /**
  // * Inicializa el listado de materias.
  // */
  // InicializarListadoMaterias()
  // {
  //   this.materias = this.materiasBase;
  // }

  // /**
  // * Inicializa el listado de aulas.
  // */
  // InicializarListadoAulas()
  // {
  //   if (this.filtro == "Todos")
  //     this.aulas = this.aulasBase;
  //   else 
  //   {
  //     this.aulas = this.aulasBase.filter((item) => {
  //       if (this.filtro == "PlantaBaja")
  //         return (item.piso == 0);
  //       else if (this.filtro == "PisoUno")
  //         return (item.piso == 1);
  //       else if (this.filtro == "PisoDos")
  //         return (item.piso == 2);
  //       else
  //         return (item.piso == 3);
  //     })
  //   }
  // }

  /**
  * Devuelve el tipo de usuario en formato de cadena.
  * @param usuario usuario del sistema.
  */
  DevolverTipo(usuario : Usuario)
  {
    if (usuario instanceof Administrativo)
      return "Administrativo";
    else if (usuario instanceof Profesor)
      return "Profesor";
    else
      return "Alumno";
  }

  /**
  * Funcion utilizada para el buscador. Permite filtrar el listado de acuerdo al string ingresado y el filtro utilizado.
  * @param ev evento ionInput del buscador.
  */
  getItems(ev: any) {

    this.eventoFiltrar = ev;

    // Resetea el listado al valor inicial, aplicando el filtro.
    if (this.opciones.tipo == "Profesor" || this.opciones.tipo == "Alumno")
      this.InicializarListadoUsuarios();
    if (this.opciones.tipo == "Division")
      this.InicializarListadoDivisiones();
    else if (this.opciones.tipo == "Asistencia")
      this.InicializarListadoDivisionesConActividades();
    // else if (this.opciones.tipo == "Materia")
    //   this.InicializarListadoMaterias();
    // else if (this.opciones.tipo == "Aula")
    //   this.InicializarListadoAulas();

    // Ajusto val al valor ingresado en el buscador.
    let val = ev.target.value;

    // Si el valor ingresado esta vacio no realizo la busqueda.
    if (val && val.trim() != '') {
      if (this.opciones.tipo == "Asistencia")
      {
        this.divisiones = this.divisiones.filter((item) => {
          if (this.buscar == "Materia")
            return (item.materia.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          else
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      if (this.opciones.tipo == "Profesor" || this.opciones.tipo == "Alumno")
      {
        this.usuarios = this.usuarios.filter((item) => {
          if (this.buscar == "Apellido")
            return (item.apellido.toLowerCase().indexOf(val.toLowerCase()) > -1);
          else if (this.buscar == "Nombre")
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          else
            return (item.legajo.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      else if (this.opciones.tipo == "Division")
      {
        this.divisiones = this.divisiones.filter((item) => {
          if (this.buscar == "Materia")
            return (item.materia.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          else
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      // else if (this.opciones.tipo == "Materia")
      // {
      //   this.materias = this.materias.filter((item) => {
      //       return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //   })
      // }
      // else if (this.opciones.tipo == "Aula")
      // {
      //   this.aulas = this.aulas.filter((item) => {
      //       return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //   })
      // }
    }
  }

  /**
  * Evento onChange del select que contiene el filtro de busqueda por apellido, nombre o legajo.
  * Ejecuta la funcion getItems, actualizando el listado con el nuevo filtro de busqueda.
  * Si no se ejecuto nunca la funcion getItems, no se hara nada.
  */
  onChangeBuscar()
  {
    if (this.eventoFiltrar != null)
      this.getItems(this.eventoFiltrar);
  }

  // /**
  // * Evento onChange del select que contiene el filtro por tipo de usuario.
  // * Ejecuta la funcion getItems, actualizando el listado con los valores validos.
  // * Si no se ejecuto nunca la funcion getItems, no se hara nada.
  // */
  onChangeFiltro()
  {
    this.onChangeBuscar();

    if (this.eventoFiltrar == null)
    {
      // if (this.opciones.tipo == "Usuario")
      //   this.InicializarListadoUsuarios();
      if (this.opciones.tipo == "Division")
        this.InicializarListadoDivisiones();
      // else if (this.opciones.tipo == "Aula")
      //   this.InicializarListadoAulas();
    }
  }

}
