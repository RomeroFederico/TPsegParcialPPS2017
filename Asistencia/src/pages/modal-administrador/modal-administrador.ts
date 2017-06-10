import { Component } from '@angular/core';
import { NavController, NavParams , ViewController} from 'ionic-angular';

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
  selector: 'page-modal-administrador',
  templateUrl: 'modal-administrador.html'
})
export class ModalAdministradorPage {

  opciones : any;

  filtro : string = "Todos";
  buscar : string;
  eventoFiltrar : any;

  divisionesBase : Array<Division>;
  divisiones : Array<Division>;

  divisionesSeleccionadas : Array<number>;

  ciclos : Array<Ciclo>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public view : ViewController)
  {
    this.opciones = this.navParams.get("opciones");

    if (this.opciones.tipo == "Division")
    {
      if (this.opciones.tipoListado == "Libre" || this.opciones.tipoListado == "Abandonadas")
        this.CargarCiclos();

      this.divisionesSeleccionadas = new Array<number>();

      this.opciones.listado.forEach(d => {
        this.divisionesSeleccionadas.push(d.division.idDivision);
      });

      // this.divisionesSeleccionadas = [1,2];

      this.CargarDivisiones();
      this.InicializarListadoDivisiones();
      this.buscar = "Materia";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalAdministradorPage');
  }

  CargarCiclos()
  {
    this.ciclos = new Array<Ciclo>();
    this.ciclos.push(new Ciclo(1, 2017, 1));
    this.ciclos.push(new Ciclo(2, 2016, 2));
    this.ciclos.push(new Ciclo(3, 2016, 1));
    this.ciclos.push(new Ciclo(4, 2017, 2));
  }

  /**
  * Carga las divisiones. Luego se hara con la base de datos.
  */
  CargarDivisiones()
  {
    this.divisionesBase = new Array<Division>();

    this.divisionesBase.push(new Division(1, new Aula(1, "103", 1), new Materia(1, "Arquitectura y Diseño de Bases de Datos", "default.png"),
                                      new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png"),
                                      "4-A", new Ciclo(1, 2017, 1), "Mañana", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
                                      ["Martes"], "En curso", 20, 10, 15, 5, new Date(2017, 5, 25)));
    this.divisionesBase.push(new Division(2, new Aula(1, "103", 1), new Materia(2, "Matematica III", "default.png"),
                                      new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
                                      "5-A", new Ciclo(1, 2017, 1), "Mañana",new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
                                      ["Miercoles", "Viernes"], "En curso", 18, 9, 15, 4, new Date(2017, 5, 28)));
    this.divisionesBase.push(new Division(3, new Aula(1, "104", 1), new Materia(3, "Matematica II", "default.png"),
                                      new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
                                      "4-A", new Ciclo(2, 2016, 2), "Mañana",new Date(2016, 9, 25), new Date(2016, 12, 5), "08:00", 
                                      ["Lunes"], "Terminada", 18, 9, 15, 15, null));

    var materias = new Array<Materia>();
    var aulas = new Array<Aula>();
    var profesor = new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png");

    materias.push(new Materia(1,"Matematica I","default.png"));
    materias.push(new Materia(2,"Programacion I","java.png"));
    materias.push(new Materia(3,"Laboratorio I","javascript.png"));
    materias.push(new Materia(4,"Ingles I","xml.png"));

    aulas.push(new Aula(1,"100-A",3));
    aulas.push(new Aula(2,"LAB-1",2));

    this.divisionesBase.push(new Division
    (4,aulas[0],materias[0],
    profesor,"1-A",new Ciclo(1, 2017, 1), "Mañana",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Jueves","Martes"],"En curso",
    30,20,16,1,new Date(2017,3,17)));

    this.divisionesBase.push(new Division
    (5,aulas[0],materias[3],
    profesor,"1-B",new Ciclo(1, 2017, 1), "Mañana",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Martes"],"En curso",
    30,20,16,1,new Date(2017,3,17)));

    this.divisionesBase.push(new Division
    (6,aulas[1],materias[1],
    profesor,"1-C",new Ciclo(1, 2017, 1), "Mañana",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Lunes"],"En curso",
    30,20,16,1,new Date(2017,3,17)));

    this.divisionesBase.push(new Division
    (7,aulas[1],materias[2],
    profesor,"2-A",new Ciclo(1, 2017, 1), "Mañana",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Miercoles"],"En curso",
    30,20,16,1,new Date(2017,3,17)));

    this.divisionesBase.push(new Division
    (8,aulas[1],materias[2],
    profesor,"2-B",new Ciclo(1, 2017, 1), "Mañana",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Miercoles"],"En curso",
    30,20,16,1,new Date(2017,3,17)));

    this.divisionesBase.push(new Division
    (9,aulas[1],materias[2],
    profesor,"2-B",new Ciclo(1, 2017, 2), "Mañana",
    new Date(2017,3,16),new Date(2017,6,20),"8:30 am",
    ["Miercoles"],"No empezada",
    30,20,16,1,new Date(2017,3,17)));

    // Saco del listado las divisiones que no estan en curso si el tipo de listado a modificar es Actuales.
    // Saco del listado de divisiones aquellas que ya se seleccionaron en otro tipo, con el array de divisionesSeleccionadas.
    this.divisionesBase = this.divisionesBase.filter((division) => 
    {
      var resultado = true;

      if (this.opciones.tipoListado == "Actuales" && division.estado != "En curso")
        resultado = false;

      if (this.opciones.tipoListado == "No Empezadas" && division.estado != "No empezada")
        resultado = false;

      if (this.opciones.tipoListado == "Terminadas" && division.estado != "Terminada")
        resultado = false;

      if (this.opciones.tipoListado == "Libre" && division.estado == "No Empezada")
        resultado = false;

      this.opciones.noMostrar.forEach(id => {
        if (division.idDivision == id)
          resultado = false;
      });
      return resultado;
    })
  }

  /**
  * Inicializa el listado de acuerdo al filtro seleccionado (Todos, por ciclo).
  */
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

  /**
  * Funcion utilizada para el buscador. Permite filtrar el listado de acuerdo al string ingresado y el filtro utilizado.
  * @param ev evento ionInput del buscador.
  */
  getItems(ev: any) {

    this.eventoFiltrar = ev;

    // Resetea el listado al valor inicial, aplicando el filtro.
    // if (this.opciones.tipo == "Usuario")
    //   this.InicializarListadoUsuarios();
    if (this.opciones.tipo == "Division")
      this.InicializarListadoDivisiones();
    // else if (this.opciones.tipo == "Materia")
    //   this.InicializarListadoMaterias();
    // else if (this.opciones.tipo == "Aula")
    //   this.InicializarListadoAulas();

    // Ajusto val al valor ingresado en el buscador.
    let val = ev.target.value;

    // Si el valor ingresado esta vacio no realizo la busqueda.
    if (val && val.trim() != '') {
      // if (this.opciones.tipo == "Usuario")
      // {
      //   this.usuarios = this.usuarios.filter((item) => {
      //     if (this.buscar == "Apellido")
      //       return (item.apellido.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //     else if (this.buscar == "Nombre")
      //       return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //     else
      //       return (item.legajo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //   })
      // }
      if (this.opciones.tipo == "Division")
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

  /**
  * Evento onChange del select que contiene el filtro por tipo de usuario.
  * Ejecuta la funcion getItems, actualizando el listado con los valores validos.
  * Si no se ejecuto nunca la funcion getItems, no se hara nada.
  */
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

  ObtenerMarcador(idSeleccion)
  {
    var resultado = false;

    this.divisionesSeleccionadas.forEach((id) => 
    {
      if (id == idSeleccion)
        resultado = true;
    })
    return resultado;
  }

  CambioElMarcador($event, id)
  {
    // console.log(id);
    // console.log($event._checked);
    if ($event._checked)
      this.divisionesSeleccionadas.push(id);
    else
      this.divisionesSeleccionadas = this.divisionesSeleccionadas.filter((idSeleccionada) => { return idSeleccionada != id; });
  }

  ModificarListado()
  {
    var listado = this.divisionesBase.filter((division) => {

      var retorno = false;
      
      this.divisionesSeleccionadas.forEach(id => {
        if (division.idDivision == id)
          retorno = true;
      });
      return retorno;
    });

    var datos = { resultado : true, listado : listado };
    this.view.dismiss(datos);
  } 

  Cancelar()
  {
    var datos = { resultado : false};
    this.view.dismiss(datos);
  } 

}
