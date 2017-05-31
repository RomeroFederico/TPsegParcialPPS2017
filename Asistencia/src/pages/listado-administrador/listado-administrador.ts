import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DatosAdministradorPage } from '../datos-administrador/datos-administrador';
import { HomeAdministradorPage } from '../home-administrador/home-administrador';

import { Usuario } from '../../components/clases/usuario';
//import { Administrador } from '../../components/clases/administrador';
import { Administrativo } from '../../components/clases/administrativo';
import { Profesor } from '../../components/clases/profesor';
import { Alumno } from '../../components/clases/alumno';

@Component({
  selector: 'page-listado-administrador',
  templateUrl: 'listado-administrador.html'
})
export class ListadoAdministradorPage {

  opciones : any;

  usuariosBase : Array<Usuario>;
  usuarios : Array<Usuario>;

  filtro : string = "Todos";
  buscar : string = "Apellido";

  eventoFiltrar : any;

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.opciones = this.navParams.get("opciones");
    console.log(this.opciones);

    if (this.opciones.tipo == "Usuario")
    {
      this.CargarUsuarios();
      this.InicializarListadoUsuarios();
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
    this.navCtrl.setRoot(HomeAdministradorPage, {}, {animate: true, direction: 'forward'});
  }

  /**
  * Muestra el usuario seleccionado, en la pagina DatosAdministradorPage.
  * @param usuario usuario a mostrar.
  */
  MostrarDatosUsuario(usuario : Usuario)
  {
    this.navCtrl.push(DatosAdministradorPage, {usuario : usuario});
  }

  /**
  * Carga los usuarios. Luego se hara con la base de datos
  */
  CargarUsuarios()
  {
    this.usuariosBase = new Array<Usuario>();

    this.usuariosBase.push(new Administrativo(1, "uno", "UNO", "123", "1001", "a@a.com", "123456", 21, "default.png"));
    this.usuariosBase.push(new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png"));
    this.usuariosBase.push(new Alumno(3, "tres", "TRES", "789", "1003", "c@c.com", "811124", 18, "default.png"));
  }

  /**
  * Inicializa el listado de acuerdo al filtro seleccionado (Todos, Alumnos, Profesor, Administrativo).
  */
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
    this.InicializarListadoUsuarios();

    // Ajusto val al valor ingresado en el buscador.
    let val = ev.target.value;

    // Si el valor ingresado esta vacio no realizo la busqueda.
    if (val && val.trim() != '') {
      this.usuarios = this.usuarios.filter((item) => {
        if (this.buscar == "Apellido")
          return (item.apellido.toLowerCase().indexOf(val.toLowerCase()) > -1);
        else if (this.buscar == "Nombre")
          return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        else
          return (item.legajo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
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

  /**
  * Evento onChange del select que contiene el filtro por tipo de usuario.
  * Ejecuta la funcion getItems, actualizando el listado con los valores validos.
  * Si no se ejecuto nunca la funcion getItems, no se hara nada.
  */
  onChangeFiltro()
  {
    this.onChangeBuscar();

    if (this.eventoFiltrar == null)
      this.InicializarListadoUsuarios();
  }

}
