import { Usuario } from "./usuario";

export class Profesor extends Usuario
{
  /**
  * Profesor de la facultad.
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
              sexo : string = "")
  {
    super (idUsuario, nombre, apellido, dni, legajo, email, password, edad, img,sexo);
  }

  /**
   * Obtiene las divisiones en las que da o dio clases el profesor.
   * Se utiliza la base de datos para acceder a las divisiones.
  */
  public getDivisiones()
  {

  }

  /**
   * Obtiene las divisiones en las que da clases el profesor actualmente.
   * Se utiliza la base de datos para acceder a las divisiones.
  */
  public getDivisionesActuales()
  {

  }

  /**
   * Obtiene las actividades del dia.
   * Se utiliza la base de datos para acceder a las divisiones.
   * Primero se revisa las divisiones con clase en la fecha actual y que da clases el profesor.
   * Luego se consulta las asistencias para verificar si asistio o si no hay clases / pidio licencia.
  */
  public getActividades()
  {

  }

}
