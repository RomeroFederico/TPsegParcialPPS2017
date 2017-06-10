import { Usuario } from "./usuario";

export class Administrativo extends Usuario
{
  /**
  * Administrativo de la facultad.
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
   * Obtiene las divisiones que dan clase en el dia de la fecha.
   * Se utiliza la base de datos para acceder a las divisiones.
  */
  public getActividades()
  {

  }

  /**
   * Obtiene todos los alumnos del sistema.
   * Se utiliza la base de datos para acceder a los alumnos.
  */
  public getAlumnos()
  {

  }

  /**
   * Obtiene todos los profesores del sistema.
   * Se utiliza la base de datos para acceder a los alumnos.
  */
  public getProfesores()
  {

  }

  /**
   * Obtiene las fechas que no habra actividades en la facultad.
   * Se utiliza la base de datos para acceder añ calendario.
  */
  public getCalendario()
  {

  }

  /**
   * Marca un dia sin actividades en la facultad.
   * Se utiliza la base de datos para acceder al calendario.
  */
  public MarcarDiaSinActividades(fecha)
  {

  }

  /**
   * Marca un dia que se registro sin actividades como con ellas.
   * Se utiliza la base de datos para acceder al calendario.
  */
  public MarcarDiaConActividades(fecha)
  {

  }

  /**
   * Envia una notificacion a los distintos usuarios o un grupo especifico.
   * @param usuarios grupo de usuarios a los cuales se envia, si no se indica, se le envia a todos.
  */
  public EnviarNotificacion(usuarios : Array<Usuario> = [])
  {

  }

  /**
   * Envia una notificacion a un grupo especifico de usuarios
   * @param tipo Alumnos, Profesores, Administrativos o Division.
  */
  public EnviarNotificacionGrupo(tipo)
  {

  }

}
