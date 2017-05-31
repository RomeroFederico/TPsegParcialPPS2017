import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Usuario } from '../../components/clases/usuario';
//import { Administrador } from '../../components/clases/administrador';
import { Administrativo } from '../../components/clases/administrativo';
import { Profesor } from '../../components/clases/profesor';
import { Alumno } from '../../components/clases/alumno';

import { Division } from '../../components/clases/division';
import { Aula } from '../../components/clases/aula';
import { Materia } from '../../components/clases/materia';

@Component({
  selector: 'page-datos-administrador',
  templateUrl: 'datos-administrador.html'
})
export class DatosAdministradorPage {

  usuario : Usuario;
  divisiones : Array<Division>;
  divisionesUsuario : any;

  // Array con cada una de los estados de la lista desplegable.
  shownGroup = [null, null]

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.usuario = this.navParams.get("usuario");
    console.log(this.usuario);

    this.ObtenerDivisiones();

    if (this.DevolverTipo(this.usuario) == "Alumno")
      this.ObtenerDivisionesAlumno();
    else if (this.DevolverTipo(this.usuario) == "Profesor")
      this.ObtenerDivisionesProfesor();
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
    var tipo = this.DevolverTipo(this.usuario)
    if (tipo == "Administrativo")
      return 'danger';
    else if (tipo == "Profesor")
      return 'secondary';
    else
      return 'primary';
  }

  /**
  * Carga las divisiones precargadas para la prueba sin base de datos.
  */
  ObtenerDivisiones()
  {
    this.divisiones = new Array<Division>();

    this.divisiones.push(new Division(1, new Aula(1, "103", 1), new Materia(1, "Arquitectura y Diseño de Bases de Datos", "default.png"),
                                      new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png"),
                                      "4-A", "1er Cuatrimestre 2017", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
                                      ["Martes"], "En curso", 20, 10, 15, 5, new Date(2017, 5, 25)));
    this.divisiones.push(new Division(2, new Aula(1, "103", 1), new Materia(2, "Matematica III", "default.png"),
                                      new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
                                      "5-A", "1er Cuatrimestre 2017", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
                                      ["Miercoles", "Viernes"], "En curso", 18, 9, 15, 4, new Date(2017, 5, 28)));
    this.divisiones.push(new Division(2, new Aula(1, "104", 1), new Materia(3, "Matematica II", "default.png"),
                                      new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
                                      "4-A", "2do Cuatrimestre 2016", new Date(2016, 9, 25), new Date(2016, 12, 5), "08:00", 
                                      ["Lunes"], "Terminada", 18, 9, 15, 15, null));
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
