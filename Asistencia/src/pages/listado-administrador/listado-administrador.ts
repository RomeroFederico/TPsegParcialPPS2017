import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  tipoListado : string;

  usuariosBase : Array<Usuario>;
  usuarios : Array<Usuario>;

  filtro : string = "Todos";
  buscar : string = "Apellido";

  eventoFiltrar : any;

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.tipoListado = this.navParams.get("tipoListado");

    if (this.tipoListado == "Usuario")
    {
      this.CargarUsuarios();
      this.InicializarListadoUsuarios();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoAdministradorPage');
  }

  Volver()
  {
    this.navCtrl.pop();
  }

  CargarUsuarios()
  {
    this.usuariosBase = new Array<Usuario>();

    this.usuariosBase.push(new Administrativo(1, "uno", "UNO", "123", "1001", "a@a.com", "123456", 21, "default.png"));
    this.usuariosBase.push(new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png"));
    this.usuariosBase.push(new Alumno(3, "tres", "TRES", "789", "1003", "c@c.com", "811124", 18, "default.png"));
  }

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

  DevolverTipo(usuario)
  {
    if (usuario instanceof Administrativo)
      return "Administrativo";
    else if (usuario instanceof Profesor)
      return "Profesor";
    else
      return "Alumno";
  }

  getItems(ev: any) {

    this.eventoFiltrar = ev;

    // Reset items back to all of the items
    this.InicializarListadoUsuarios();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
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

  onChangeBuscar()
  {
    if (this.eventoFiltrar != null)
      this.getItems(this.eventoFiltrar);
  }

  onChangeFiltro()
  {
    this.onChangeBuscar();

    if (this.eventoFiltrar == null)
      this.InicializarListadoUsuarios();
  }

}
