import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';

import { Ws } from '../../providers/ws';

import { Profesor } from '../../components/clases/profesor';
import { Alumno } from '../../components/clases/alumno';

import { Division } from '../../components/clases/division';

import { HomeAdministrativoPage } from '../home-administrativo/home-administrativo';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';//FIREBASE!

@Component({
  selector: 'page-asistencia-administrativo',
  templateUrl: 'asistencia-administrativo.html',
  providers: [Ws]
})
export class AsistenciaAdministrativoPage {

  division : Division;
  divisionModificar : any;
  alumnos : Array<{alumno : Alumno, faltas : number, estado : string, asistio : boolean}> = null;

  cargando : any = null;
  //miLista:any;
  listado : FirebaseListObservable<any[]>;//FIREBASE!

  constructor(public navCtrl: NavController, public navParams: NavParams, public ws : Ws, 
              public loadingController : LoadingController, public alertCtrl: AlertController,private firebase: AngularFireDatabase,
              public toast : ToastController)
  {
    this.listado=firebase.list('/Lista');//CARGO LA LISTA.
    this.listado.subscribe(data => {console.log("Datos de firebase: ");console.log(data);});//MUESTRO LAS DATOS DE LAS LISTAS.

    this.division = this.navParams.get("division");

    this.division.claseActual = Number(this.division.claseActual) + 1;

    //this.alumnos = new Array<{alumno : Alumno, faltas : number, estado : string, asistio : boolean}>();

    this.CargarAlumnos();
    
    //this.lista.subscribe(data => {console.log(data);this.miLista=data;});//ver
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsistenciaAdministrativoPage');
  }

  /**
  * Volver a la pagina anterior.
  */
  Volver()
  {
    this.navCtrl.pop();
  }

  Cancelar()
  {
    let confirm = this.alertCtrl.create({
      title: 'Volver',
      message: 'Desea salir del tomado de lista?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.Volver();
          }
        }
      ]
    });
    confirm.present();
  }

  TomarLista()
  {
    let confirm = this.alertCtrl.create({
        title: 'Tomar lista',
        message: 'La lista sera tomada, estas seguro?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {}
          },
          {
            text: 'Aceptar',
            handler: () => {
              console.log("Lista tomada!!!");
              this.ModificarDivision();
            }
          }
        ]
    });
    confirm.present(); 
  }

  CargarAlumnos()
  {
    // var alumnos : Array<Alumno> = new Array<Alumno>();
    // alumnos.push(new Alumno(1, "uno", "UNO", "456", "1001", "b@b.com", "789999", 35, "default.png","Masculino"));
    // alumnos.push(new Alumno(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png","Masculino"));
    // alumnos.push(new Alumno(3, "tres", "TRES", "456", "1003", "b@b.com", "789999", 35, "default.png","Masculino"));

    // alumnos.forEach(alumno => {
    //   this.alumnos.push({alumno : alumno, faltas : 2, estado : 'Cursando', asistio : false});
    // });

    this.MostrarLoading("alumnos de la division")

    this.ws.TraerAlumnosDivision(this.division.idDivision).then((data) => {

      this.cargando.dismiss();
      console.log(data);

      if (data.Exito)
      {
        this.alumnos = data.Alumnos;

        for (var i = 0; i < data.Alumnos.length; i++) {
          this.alumnos[i].alumno = data.Alumnos[i];
          this.alumnos[i].faltas = data.Alumnos[i].faltas;
          this.alumnos[i].estado = data.Alumnos[i].estado;
          this.alumnos[i].asistio = false;
        }

        console.log(this.alumnos);
      }

    })
    .catch((error) => {

      this.cargando.dismiss();
      this.ReintentarCargarAlumnos();
      console.log(error);

    });
  }

  ModificarDivision()
  { 
    this.MostrarLoading("modificacion de la division");

    if (this.division.claseActual != this.division.cantClases)
    {
      var hoy = new Date();
      hoy.setDate(hoy.getDate() + 7);
      this.division.fechaProxClase = hoy;
    }
    else
    {
      this.division.estado = "Terminada";
      this.division.fechaProxClase = null;
    }

    this.divisionModificar = this.division;
    if (this.division.fechaProxClase != null)
      this.divisionModificar.fechaProxClase = this.division.fechaProxClase.getFullYear() + "-" + (this.division.fechaProxClase.getMonth() + 1) + "-" + this.division.fechaProxClase.getDate();

    console.log(this.divisionModificar);

    this.ws.ModificarDivision(this.divisionModificar).then((data) => {

      this.cargando.dismiss();
      console.log(data);
      
      //Modificar alumnos division y firebase....
      if (data.Exito)
      {
        console.log("Exito");
        this.ModificarAlumnosDivision();
      }
      else
      {
        this.ReintentarModificarDivision();
      }

    })
    .catch((error) => { this.cargando.dismiss(); this.ReintentarModificarDivision(); console.log(error); });
  }

  ModificarAlumnosDivision()
  {
    let alumnos = new Array<{idAlumno : number, idDivision : number, estado : string, faltas : number}>();

    for (var index = 0; index < this.alumnos.length; index++) {
      var faltas = Number(this.alumnos[index].faltas); 
      if (this.alumnos[index].asistio != true && this.alumnos[index].estado == "Cursando")
        faltas++;
      alumnos.push({idAlumno : this.alumnos[index].alumno.idUsuario, idDivision : this.division.idDivision, estado : this.alumnos[index].estado, faltas : faltas});
    }

    console.log(alumnos);

    this.MostrarLoading("modificacion de los alumnos de la division");

    this.ws.ModificarAlumnosDivision(alumnos).then((data) => {

      this.cargando.dismiss();
      console.log(data);

      if (data.Exito)
      {
        // GUARDAR EN FIREBASE...
        console.log("Exito al modificar alumnos de la division.");
        this.GuardarAsistencia(alumnos);
      }
      else
      {
        this.ReintentarModificarAlumnosDivision();
      }
    })
    .catch((error) => { this.cargando.dismiss(); this.ReintentarModificarAlumnosDivision(); console.log(error); })
  }

  GuardarAsistencia(alumnos : Array<{idAlumno : number, idDivision : number, estado : string, faltas : number}>)
  {
    // var subir : {division : Division, clase : number, fecha : string,alumnos : Array<{alumno : Alumno, asistio : boolean, estado : string, faltas : number}>} = {division : null, clase : null, fecha : null,alumnos : Array<{alumno : Alumno, asistio : boolean, estado : string, faltas : number}>()} ;
    // subir.division = this.divisionModificar;
    // subir.clase = Number(this.division.claseActual);

    var hoy = new Date();
    hoy.setDate(hoy.getDate());
    var fecha = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    
    // for (var index = 0; index < this.alumnos.length; index++) {
    //   subir.alumnos.push({alumno : this.alumnos[index].alumno, asistio : this.alumnos[index].asistio, estado : alumnos[index].estado, faltas : alumnos[index].faltas});
    // }

    var subir : Array<{idDivision : number, idAlumno : number, nombreDivision : string, materia : string , nombreAlumno : string, apellidoAlumno : string, asistio : boolean, clase : number, fecha : string}> = Array<{idDivision : number, idAlumno : number, nombreDivision : string, materia : string , nombreAlumno : string, apellidoAlumno : string, asistio : boolean, clase : number, fecha : string}>();

    for (var index = 0; index < this.alumnos.length; index++) {
      subir.push({idDivision : this.divisionModificar.idDivision, idAlumno : this.alumnos[index].alumno.idUsuario, nombreDivision : this.divisionModificar.nombre, materia : this.divisionModificar.materia.nombre, nombreAlumno : this.alumnos[index].alumno.nombre, apellidoAlumno : this.alumnos[index].alumno.apellido, asistio : this.alumnos[index].asistio, clase :  Number(this.division.claseActual), fecha : fecha });
    }

    console.log(subir);

    this.MostrarLoading("listado de asistencia del dia");

    this.listado.update("nunca",subir).then(() => {

      this.cargando.dismiss();

      this.MostrarToast("Lista tomada exitosamente!!!");
      this.navCtrl.setRoot(HomeAdministrativoPage);

    })
    .catch((error) => { this.cargando.dismiss(); this.MostrarToast("La lista de asistencias no se guardo."); this.navCtrl.setRoot(HomeAdministrativoPage); console.log("Error"); });// CON ESA FUNCION SUBO EL JSON A FIREBASE
    //ACA SE SUBE EN FIREBASE EL OBJETO SUBIR...AL TERMINAR EL PROCESO IR AL MENU PRINCIPAL -> HOME CON SET ROOT, MOSTRAR UN MENSAJE SI SE GUARDO.
  }
  GenerateArray(obj)//PARA FIREBASE!
  {
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }

  MostrarToast(mensaje)
  {
    let toast = this.toast.create({
        message: mensaje,
        duration: 2000
    });
    toast.present();
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

  ReintentarCargarAlumnos()
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
            this.CargarAlumnos();
          }
        }
      ]
    });
    confirm.present();
  }

  ReintentarModificarDivision()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la modificacion de la division?',
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
            this.ModificarDivision();
          }
        }
      ]
    });
    confirm.present();
  }

  ReintentarModificarAlumnosDivision()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la modificacion de los alumnos de la division?',
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
            this.ModificarAlumnosDivision();
          }
        }
      ]
    });
    confirm.present();
  }

}
