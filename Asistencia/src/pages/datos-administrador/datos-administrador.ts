import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Usuario } from '../../components/clases/usuario';
//import { Administrador } from '../../components/clases/administrador';
import { Administrativo } from '../../components/clases/administrativo';
import { Profesor } from '../../components/clases/profesor';
import { Alumno } from '../../components/clases/alumno';

import { Division } from '../../components/clases/division';
import { Aula } from '../../components/clases/aula';
import { Materia } from '../../components/clases/materia';
import { Ciclo } from '../../components/clases/ciclo';

@Component({
  selector: 'page-datos-administrador',
  templateUrl: 'datos-administrador.html'
})
export class DatosAdministradorPage {

  tipo : string;

  usuario : Usuario;
  divisiones : Array<Division>;
  divisionesUsuario : any;

  division : Division;
  alumnos : Array<Alumno>;
  alumnosDivision : Array<any>;

  materia : Materia;
  divisionesMateria : Array<Division>;

  aula : Aula;
  divisionesAula : Array<Division>;

  // Array con cada una de los estados de la lista desplegable.
  shownGroup = [null, null, null, null, null];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController)
  {
    this.tipo = this.navParams.get("tipo");

    if (this.tipo == "Usuario")
    { 
      this.usuario = this.navParams.get("usuario");

      this.ObtenerDivisiones();

      if (this.DevolverTipo(this.usuario) == "Alumno")
        this.ObtenerDivisionesAlumno();
      else if (this.DevolverTipo(this.usuario) == "Profesor")
        this.ObtenerDivisionesProfesor();
    }
    else if (this.tipo == "Division")
    {
      this.division = this.navParams.get("division");
      console.log(this.division);

      this.ObtenerAlumnos();
      this.ObtenerAlumnosDivision();
    }
    else if (this.tipo == "Materia")
    {
      this.materia = this.navParams.get("materia");
      this.ObtenerDivisionesMateria();
    }
    else if (this.tipo == "Aula")
    {
      this.aula = this.navParams.get("aula");
      this.ObtenerDivisionesAula();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosAdministradorPage');
  }
  /**
  * Volver a la pagina anterior.
  */
  Volver()
  {
    this.navCtrl.pop();
  }

  NoImplementado()
  {
    let confirm = this.alertCtrl.create({
      title: 'Informacion',
      message: 'No implementado aun...',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  /**
  * Devuelve el tipo de usuario en formato de cadena.
  * @param usuario usuario del sistema.
  */
  DevolverTipo(usuario)
  {
    if (usuario instanceof Administrativo)
      return "Administrativo";
    else if (usuario instanceof Profesor)
      return "Profesor";
    else
      return "Alumno";
  }

  /**
  * Devuelve el color correspondiente al tipo de usuario a mostrar.
  */
  DevolverColor()
  {
    if (this.tipo == "Usuario")
    {
      var tipo = this.DevolverTipo(this.usuario)
      if (tipo == "Administrativo")
        return 'danger';
      else if (tipo == "Profesor")
        return 'secondary';
      else
        return 'primary';
    }
    else
      return 'dark';  
  }

  /**
  * Carga las divisiones precargadas para la prueba sin base de datos.
  */
  ObtenerDivisiones()
  {
    this.divisiones = new Array<Division>();

    this.divisiones.push(new Division(1, new Aula(1, "103", 1), new Materia(1, "Arquitectura y Diseño de Bases de Datos", "default.png"),
                                      new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png","Masculino"),
                                      "4-A", new Ciclo(1, 2017, 1), "Mañana", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
                                      ["Martes"], "En curso", 20, 10, 15, 5, new Date(2017, 5, 25)));
    this.divisiones.push(new Division(2, new Aula(1, "103", 1), new Materia(2, "Matematica III", "default.png"),
                                      new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png","Masculino"),
                                      "5-A", new Ciclo(1, 2017, 1), "Mañana",new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
                                      ["Miercoles", "Viernes"], "En curso", 18, 9, 15, 4, new Date(2017, 5, 28)));
    this.divisiones.push(new Division(2, new Aula(1, "104", 1), new Materia(3, "Matematica II", "default.png"),
                                      new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png","Masculino"),
                                      "4-A", new Ciclo(1, 2016, 2), "Mañana",new Date(2016, 9, 25), new Date(2016, 12, 5), "08:00", 
                                      ["Lunes"], "Terminada", 18, 9, 15, 15, null));
  }

  /**
  * Carga los alumnos precargados para la prueba sin base de datos.
  */
  ObtenerAlumnos()
  {
    this.alumnos = new Array<Alumno>();

    this.alumnos.push(new Alumno(3, "tres", "TRES", "789", "1003", "c@c.com", "811124", 18, "default.png","Masculino"));
    this.alumnos.push(new Alumno(6, "seis", "SEIS", "101", "1006", "f@f.com", "811124", 21, "default.png","Masculino"));
    this.alumnos.push(new Alumno(9, "nueve", "NUEVE", "999", "1009", "i@i.com", "811124", 25, "default.png","Masculino"));
  }

  /**
  * Carga las divisiones del usuario alumno. Luego se hara con la base de datos.
  */
  ObtenerDivisionesAlumno()
  {
    this.divisionesUsuario = new Array();

    this.divisionesUsuario.push({division : this.divisiones[0], estado: "Cursando", faltas: 2});

    this.divisionesUsuario.push({division : this.divisiones[1], estado: "Cursando", faltas: 0});

    this.divisionesUsuario.push({division : this.divisiones[2], estado: "Terminada", faltas: 5});
  }

  /**
  * Carga las divisiones del usuario profesor. Luego se hara con la base de datos.
  */
  ObtenerDivisionesProfesor()
  {
    this.divisionesUsuario = new Array();

    this.divisionesUsuario = this.divisiones.filter((item) => { return item.profesor.idUsuario == this.usuario.idUsuario; });
  }

  /**
  * Carga las divisiones de la materia. Luego se hara con la base de datos.
  */
  ObtenerDivisionesMateria()
  {
    this.divisionesMateria = new Array<Division>();

    this.divisionesMateria.push(new Division(1, new Aula(1, "103", 1), this.materia,
                                      new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png"),
                                      "4-A", new Ciclo(1, 2017, 1), "Mañana", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
                                      ["Martes"], "En curso", 20, 10, 15, 5, new Date(2017, 5, 25)));
    this.divisionesMateria.push(new Division(2, new Aula(1, "103", 1), this.materia,
                                      new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
                                      "5-A", new Ciclo(1, 2017, 1), "Mañana",new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
                                      ["Miercoles", "Viernes"], "En curso", 18, 9, 15, 4, new Date(2017, 5, 28)));
    this.divisionesMateria.push(new Division(2, new Aula(1, "104", 1), this.materia,
                                      new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
                                      "4-A", new Ciclo(1, 2016, 2), "Mañana",new Date(2016, 9, 25), new Date(2016, 12, 5), "08:00", 
                                      ["Lunes"], "Terminada", 18, 9, 15, 15, null));
  }

  /**
  * Carga las divisiones del aula. Luego se hara con la base de datos.
  */
  ObtenerDivisionesAula()
  {
    this.divisionesAula = new Array<Division>();

    this.divisionesAula.push(new Division(1, new Aula(1, "103", 1), new Materia(1, "Arquitectura y Diseño de Bases de Datos", "database.png"),
                                      new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png"),
                                      "4-A", new Ciclo(1, 2017, 1), "Mañana", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
                                      ["Martes"], "En curso", 20, 10, 15, 5, new Date(2017, 5, 25)));
    this.divisionesAula.push(new Division(2, new Aula(1, "103", 1), new Materia(2, "Matematica III", "matematica.png"),
                                      new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
                                      "5-A", new Ciclo(1, 2017, 1), "Mañana",new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
                                      ["Miercoles", "Viernes"], "En curso", 18, 9, 15, 4, new Date(2017, 5, 28)));
    this.divisionesAula.push(new Division(2, new Aula(1, "104", 1), new Materia(3, "Programacion II", "html.png"),
                                      new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
                                      "4-A", new Ciclo(1, 2016, 2), "Mañana",new Date(2016, 9, 25), new Date(2016, 12, 5), "08:00", 
                                      ["Lunes"], "Terminada", 18, 9, 15, 15, null));
  }

  /**
  * Carga los alumnos de la division. Luego se hara con la base de datos.
  */
  ObtenerAlumnosDivision()
  {
    this.alumnosDivision = new Array();

    this.alumnosDivision.push({alumno : this.alumnos[0], estado: "Cursando", faltas: 2});
    this.alumnosDivision.push({alumno : this.alumnos[1], estado: "Libre", faltas: 10});
    this.alumnosDivision.push({alumno : this.alumnos[2], estado: "Abandono", faltas: 1});
  }

  /**
  * Evento Click de la lista desplegable de divisiones.
  * Si la lista se esta mostrando, la vuelve a contraer. Viceversa en caso contrario.
  * @param grupo Lista desplegable que ejecuto el evento.
  */
  toggleGroup(grupo)
  {
    if (this.isGroupShown(grupo))
        this.shownGroup[grupo] = null;
    else
        this.shownGroup[grupo] = true;
  }

  /**
  * Verifica si se esta mostrando la lista desplegable.
  * @param grupo Lista desplegable a revisar.
  */
  isGroupShown(grupo) 
  {
    return this.shownGroup[grupo] === true;
  }

  /** 
  * Filtrado de la lista de divisiones que cursa un alumno de acuerdo al criterio pasado.
  * @param criterio criterio a mostrar ('Cursando', 'Terminada', 'Abandonada', 'Libre','No empezada').
  */
  filtrarDivisionesAlumno(criterio : string)
  {
    if (criterio == "Cursando")
      return this.divisionesUsuario.filter((item) => { return item.estado == 'Cursando'; });
    else if (criterio == "Terminada")
      return this.divisionesUsuario.filter((item) => { return item.estado == 'Terminada'; });
    else if (criterio == "Abandonada")
      return this.divisionesUsuario.filter((item) => { return item.estado == 'Abandonada'; });
    else if (criterio == "No empezada")
      return this.divisionesUsuario.filter((item) => { return item.estado == 'No empezada'; });
    else
      return this.divisionesUsuario.filter((item) => { return item.estado == 'Libre'; });
  }

  /** 
  * Filtrado de la lista de divisiones que da clases un profesor de acuerdo al criterio pasado.
  * @param criterio criterio a mostrar ('En curso', 'Terminada', 'No empezada').
  */
  filtrarDivisionesProfesor(criterio : string)
  {
    if (criterio == "En curso")
      return this.divisionesUsuario.filter((item) => { return item.estado == 'En curso'; });
    else if (criterio == "Terminada")
      return this.divisionesUsuario.filter((item) => { return item.estado == 'Terminada'; });
    else
      return this.divisionesUsuario.filter((item) => { return item.estado == 'No empezada'; });
  }

  /**
  * Convierte la fecha en formato Date en una cadena (DD/MM/YYYY).
  * @param date fecha a convertir
  */
  ObtenerFecha(date : Date)
  {
    return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
  }

}
