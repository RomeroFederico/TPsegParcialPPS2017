import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import { ListadoAdministradorPage } from '../listado-administrador/listado-administrador';
import { AgregarAdministradorPage } from '../agregar-administrador/agregar-administrador';

@Component({
  selector: 'page-home-administrador',
  templateUrl: 'home-administrador.html'
})
export class HomeAdministradorPage {

  animacionSeleccion : Array<string> = ["", "", "", "", "", "", "", ""];
  seleccionAnimar : number;

  loading : any;
  iconos : string = "Grandes";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingController : LoadingController, public actionSheetController : ActionSheetController) 
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAdministradorPage');
  }

  /**
  * Seleccion de una opcion de la pagina principal.
  * @param opcion numero que representa la opcion seleccionada.
  */
  Seleccion(opcion : number)
  {
    console.log("Selecciono " + opcion);
    this.animacionSeleccion[opcion] = "animated flash infinite";
    this.seleccionAnimar = opcion;

    this.MostrarLoading(this.SeleccionOpcion(opcion));
  }

  /**
  * A partir de la opcion seleccionada de 'Seleccion', se obtiene la pagina a mostrar y lo que se quiere mostrar (Materia, Usuario, Division, Aula).
  * @param opcion numero que representa la opcion seleccionada.
  */
  SeleccionOpcion(opcion)
  {
    var objOpcion = {ruta : "listado-administrador", mensaje : "", tipo : ""};

    switch (opcion) {
      case 0:

        objOpcion.mensaje = "Listado de usuarios";
        objOpcion.tipo = "Usuario";
        break;

      case 1:

        objOpcion.mensaje = "Agregar usuario";
        objOpcion.ruta = "agregar-administrador";
        objOpcion.tipo = "Usuario";
        break;

      case 2:

        objOpcion.mensaje = "Listado de divisiones";
        objOpcion.tipo = "Division";
        break;

      case 3:

        objOpcion.mensaje = "Agregar division";
        objOpcion.ruta = "agregar-administrador";
        objOpcion.tipo = "Division";
        break;

      case 4:

        objOpcion.mensaje = "Listado de materias";
        objOpcion.tipo = "Materia";
        break;

      case 5:

        objOpcion.mensaje = "Agregar materia";
        objOpcion.ruta = "agregar-administrador";
        objOpcion.tipo = "Materia";
        break;

      case 6:

        objOpcion.mensaje = "Listado de aulas";
        objOpcion.tipo = "Aula";
        break;
    
      default:

        objOpcion.mensaje = "Agregar aula";
        objOpcion.ruta = "agregar-administrador";
        objOpcion.tipo = "Aula";
        break;
    }

    return objOpcion;
  }

  /**
  * Muestra un menu para cambiar la vista de los iconos de la pagina principal.
  */
  MostrarOpcionesVista() 
  {
   let actionSheet = this.actionSheetController.create({
     title: 'Cambiar vista',
     buttons: [
       {
         text: 'Iconos Grandes',
         icon: "expand",
         handler: () => {
           this.iconos = "Grandes";
         }
       },
      {
         text: 'Iconos Pequeños',
         icon: 'contract',
         handler: () => {
           this.iconos = "Pequeños";
         }
       },
      {
         text: 'Lista',
         icon : "list-box",
         handler: () => {
           this.iconos = "Lista";
         }
       },
       {
         text: 'Cancelar',
         icon: 'exit',
         role: 'cancel',
       }
     ]
   });

   actionSheet.present();
  }

  /**
  * Carga la pagina a mostrar.
  * @param seleccion objeto obtenido de la funcion 'SeleccionOpcion', contiene la pagina a mostrar, el titulo de la misma y el tipo de dato a manejar.
  */
  MostrarLoading(seleccion) 
  {
    console.log(seleccion);

    let loading = this.loadingController.create({
      spinner: 'bubbles',
      content: `Cargando ` + seleccion.mensaje + `, 
      Por Favor Espere un Momento...`,
      duration: 1000
    });

    loading.onDidDismiss(() => {
      this.animacionSeleccion[this.seleccionAnimar] = "";
      this.navCtrl.setRoot(seleccion.ruta == "agregar-administrador"? AgregarAdministradorPage : ListadoAdministradorPage,
                           {opciones : seleccion},
                           {animate: true, direction: 'forward'});
    });

    this.loading = loading;

    this.loading.present();
  }

}
