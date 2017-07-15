import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class Ayuda {

  logins = [
    {
      image: "assets/ayuda/login/l1.png",
      title: "Pantalla de Login",
       description: "Muestreo de los botones de testing en el login, Con el boton de ayuda y ver informacion del dispositivo."
    },
    {
      image: "assets/ayuda/login/l2.png",
      title: "Pantalla de Login",
      description: "Campo de E-mail y Password a la hora de querer entrar a nuestro sistema."
    }
  ];
   alumnos = [
    {
      image: "assets/ayuda/alumno/a1.png",
      description: "Muestra todas las funcionabilidades esenciales que puede realizar el alumno. Puede apretar en la imagen o en el nombre de la imagen. Todas las pantallas contaran con la posibilidad de volver a este menu de una manera facil.",
      title: "Pantalla del Perfil Alumno"
    },
    {
      image: "assets/ayuda/alumno/a2.png",
      description: "Dependiendo del perfil de usuario logea el menu no sera el mismo. tendra las funciones esenciales de la pantalla principal del alumno y ademas contara con accesos a otroas paginas extra!",
      title: "Menu de Alumno"
    },
        {
      image: "assets/ayuda/alumno/a3.png",
      description: "Mostrara los datos mas importantes del usuario dentro del establecimiento. Este mostrara su foto,legajo,mail y la edad",
      title: "Datos del alumno"
    },
        {
      image: "assets/ayuda/alumno/a4.png",
      description: "Podra ver sus materias del dia de hoy como la de los demas dias. Es muy practico para los alumno olvidadizos.",
      title: "Materias del alumno"
    },
        {
      image: "assets/ayuda/alumno/a5.png",
      description: "Contendra tanto las asistencias como las inasistencias que se hayan realizado en la toma de asistencia por el secretario",
      title: "Asistencias del alumno"
    },
        {
      image: "assets/ayuda/alumno/a6.png",
      description: "Seran las notificaciones recibidas por la toma de asistencia. Estas seran tanto de inasistencia como de asistencia. Contendra un mensaje con el dia de la fecha tendra la opcion de eliminar dicha notificacion.",
      title: "Notificaciones del alumno"
    },
  ];
     profesores = [
    {
      image: "assets/ayuda/profesor/p1.png",
      description: "Muestra todas las funcionabilidades esenciales que puede realizar el profesor. Puede apretar en la imagen o en el nombre de la imagen. Todas las pantallas contaran con la posibilidad de volver a este menu de una manera facil.",
      title: "Pantalla del Perfil Profesor"
    },
    {
      image: "assets/ayuda/profesor/p2.png",
      description: "Muestra todas las funcionabilidades esenciales que puede realizar el profesor. Puede apretar en la imagen o en el nombre de la imagen. Todas las pantallas contaran con la posibilidad de volver a este menu de una manera facil.",
      title: "Menu del Perfil Profesor"
    },
        {
      image: "assets/ayuda/profesor/p3.png",
      description: "Muestra todas las funcionabilidades esenciales que puede realizar el profesor. Puede apretar en la imagen o en el nombre de la imagen. Todas las pantallas contaran con la posibilidad de volver a este menu de una manera facil.",
      title: "Datos del Profesor"
    },
        {
      image: "assets/ayuda/profesor/p4.png",
      description: "Muestra todas las funcionabilidades esenciales que puede realizar el profesor. Puede apretar en la imagen o en el nombre de la imagen. Todas las pantallas contaran con la posibilidad de volver a este menu de una manera facil.",
      title: "Pantalla del Perfil Profesor"
    },
        {
      image: "assets/ayuda/profesor/p5.png",
      description: "Muestra todas las funcionabilidades esenciales que puede realizar el profesor. Puede apretar en la imagen o en el nombre de la imagen. Todas las pantallas contaran con la posibilidad de volver a este menu de una manera facil.",
      title: "Pantalla del Perfil Profesor"
    },
        {
      image: "assets/ayuda/profesor/p7.png",
      description: "Muestra todas las funcionabilidades esenciales que puede realizar el profesor. Puede apretar en la imagen o en el nombre de la imagen. Todas las pantallas contaran con la posibilidad de volver a este menu de una manera facil.",
      title: "Pantalla del Perfil Profesor"
    },
        {
      image: "assets/ayuda/profesor/p6.png",
      description: "Muestra todas las funcionabilidades esenciales que puede realizar el profesor. Puede apretar en la imagen o en el nombre de la imagen. Todas las pantallas contaran con la posibilidad de volver a este menu de una manera facil.",
      title: "Pantalla del Perfil Profesor"
    },
  ];
     secretarios = [
    {
      image: "assets/ayuda/login/l1.png",
      title: "Welcome to the Docs!"
    },
    {
      image: "assets/ayuda/login/l1.png",
      title: "Welcome to the Docs!"
    }
  ];
     administradores = [
    {
      image: "assets/ayuda/login/l1.png",
      title: "Welcome to the Docs!"
    },
    {
      image: "assets/ayuda/login/l1.png",
      title: "Welcome to the Docs!"
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {

  }
  ObtenerTipo()
  {
    return localStorage.getItem("ayuda");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Ayuda');
  }
  Volver()
  {
    this.navCtrl.pop();
  }
}
