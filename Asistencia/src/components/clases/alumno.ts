import { Usuario } from "./usuario";

export class Alumno extends Usuario
{
  /**
  * Alumno de la facultad.
  */
  constructor(idUsuario : number = 0,
              nombre : string = "",
              apellido : string = "",
              dni : string = "",
              legajo : string = "",
              email : string = "",
              password : string = "",
              edad : number = 0,
              img : string = "",
              sexo : string = "Masculino")
  {
    super (idUsuario, nombre, apellido, dni, legajo, email, password, edad, img, sexo);
  }

  /**
   * Obtiene las divisiones en las que asiste o asistio el alumno.
   * Se utiliza la base de datos para acceder a las divisiones.
  */
  public getDivisiones()
  {

  }

  /**
   * Obtiene las divisiones en las que asiste el alumno actualmente.
   * Se utiliza la base de datos para acceder a las divisiones.
  */
  public getDivisionesActuales()
  {

  }

  /**
   * Obtiene las actividades del dia.
   * Se utiliza la base de datos para acceder a las divisiones.
   * Primero se revisa las divisiones con clase en la fecha actual y que asiste el alumno.
   * Luego se consulta las asistencias para verificar si asistio, falto o no se tomo lista, como asi tambien si no hay clases.
  */
  public getActividades()
  {

  }

}
