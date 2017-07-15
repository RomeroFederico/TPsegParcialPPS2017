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
      description: "Este contara con una variedad de operaciones que podra realizar el profesor. Realizar una encuesta , Ver el establecimiento en un mapa!",
      title: "Menu del Perfil Profesor"
    },
        {
      image: "assets/ayuda/profesor/p3.png",
      description: "Se podra aceder a la informacion del profesor logeado en nuestro sistema. Esta nostrara su foto con algunos datos relevantes.",
      title: "Datos del Profesor"
    },
        {
      image: "assets/ayuda/profesor/p4.png",
      description: "Estan son todas las materias que el profesor tiene asignado.",
      title: "Materias del profesor"
    },
        {
      image: "assets/ayuda/profesor/p5.png",
      description: "Se muestras todas las clases del dia de hoy con la posibilidad de pedir falta.",
      title: "Listado de Clases del dia de hoy y de la semana."
    },
        {
      image: "assets/ayuda/profesor/p7.png",
      description: "Todas las divisiones en la que se encuentra dicho profesor.",
      title: "Lista de divisiones"
    },
        {
      image: "assets/ayuda/profesor/p6.png",
      description: "Todas las notificaciones recibidas por parte del profesor.",
      title: "Lista de notificaciones."
    },
  ];
     secretarios = [
    {
      image: "assets/ayuda/secretario/s4.png",
      title: "Menu del perfil Administrarivo",
      description: "Todas las acciones posibles que puede tomar el perfil administrativo."
    },
    {
      image: "assets/ayuda/secretario/s1.png",
      title: "Tomar Asistencia Paso 1",
      description: "Funcionabilidades esenciales del administrativo en este se encuentra el de tomar lista el mas importante."
    },
    {
      image: "assets/ayuda/secretario/s2.png",
      title: "Tomar Asistencia Paso 2",
      description: "Todas las divisiones disponibles para que el secretario elija cual de ellar desea tomar lista."
    },
    {
      image: "assets/ayuda/secretario/s3.png",
      title: "Tomar Asistencia Paso 3",
      description: "Tendremos que marcar que alumno asistio en el dia."
    }
  ];
     administradores = [
    {
      image: "assets/ayuda/administrador/w1.png",
      title: "Pantalla principal del Administrador",
      description: "Todas las funciones esenciales del perfil administrador."
    },
    {
      image: "assets/ayuda/administrador/w2.png",
      title: "Pantalla principal del administrador",
      description: "Todas las funciones esenciales del perfil administrador."
    },
        {
      image: "assets/ayuda/administrador/w3.png",
      title: "Menu del perfil Administrardor",
      description: "Todas las acciones posibles que puede tomar el perfil administrativo."
    },
        {
      image: "assets/ayuda/administrador/w4.png",
      title: "Agregar Usuario Paso 1",
      description: "Tendremos que llenar los campos necesarios para agregar un usuario al sistema"
    },
        {
      image: "assets/ayuda/administrador/w5.png",
      title: "Agregar Usuario Paso 2",
      description: "Tendremos que asignar en cada campono que lo necesite una division dependiendo el tipo"
    },
        {
      image: "assets/ayuda/administrador/w6.png",
      title: "Agregar Usuario paso 3",
      description: "Al finalizar tendremos que utilizar los botones de aceptar o cancelar."
    },
        {
      image: "assets/ayuda/administrador/w7.png",
      title: "Agregar Division Paso 1",
      description: "Formulario necesario para agregar una division al sistema"
    },
        {
      image: "assets/ayuda/administrador/w8.png",
      title: "Agregar Division Paso 2",
      description: "Al finalizar tendremos que utilizar los botones de aceptar o cancelar."
    },
        {
      image: "assets/ayuda/administrador/w9.png",
      title: "Agregar Materia",
      description: "Formulario para agregar una materia al sistema."
    },
        {
      image: "assets/ayuda/administrador/w10.png",
      title: "Agregar Aula",
      description: "Formulario para agregar un aula"
    },
        {
      image: "assets/ayuda/administrador/w11.png",
      title: "Agregar Ciclo",
      description: "Formulario para el agregado de un ciclo."
    },
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
