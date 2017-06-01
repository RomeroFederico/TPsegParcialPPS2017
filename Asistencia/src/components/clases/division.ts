import { Aula } from './aula';
import { Materia } from './materia';
import { Profesor } from './profesor';
import { Ciclo } from './ciclo';

export class Division
{
  public idDivision: number;
  public aula : Aula;
  public materia : Materia;
  public profesor : Profesor;
  public nombre : string;

  public ciclo : Ciclo;
  public turno : string

  public fechaInicio : Date;
  public fechaFin : Date;

  public hora : string;
  public dias : Array<string>;

  public estado : string;

  public cupoMaximo : number;
  public cupoActual : number;

  public cantClases : number;
  public claseActual : number;
  public fechaProxClase : Date;

  /**
  * Division de la facultad.
  */
  constructor(idDivision: number = 0,
              aula : Aula = new Aula(),
              materia : Materia = new Materia(),
              profesor : Profesor = new Profesor(),
              nombre : string = "",
              ciclo : Ciclo = new Ciclo(),
              turno : string = "",
              fechaInicio : Date = new Date(Date.now()),
              fechaFin : Date = new Date(Date.now()),
              hora : string = "",
              dias : Array<string> = new Array<string>(),
              estado : string = "",
              cupoMaximo : number = 0,
              cupoActual : number = 0,
              cantClases : number = 0,
              claseActual : number = 0,
              fechaProxClase : Date = null)
  {
    this.idDivision = idDivision;
    this.aula = aula;
    this.materia = materia;
    this.profesor = profesor;
    this.nombre = nombre;
    this.ciclo = ciclo;
    this.turno = turno;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.hora = hora;
    this.dias = dias;
    this.estado = estado;
    this.cupoMaximo = cupoMaximo;
    this.cupoActual = cupoActual;
    this.cantClases = cantClases;
    this.claseActual = claseActual;
    this.fechaProxClase = fechaProxClase;
  }

  /**
   * Obtiene las alumnos que estan anotados en la division.
   * Se utiliza la base de datos para acceder a las divisiones.
  */
  public getAlumnos()
  {

  }

  /**
   * Retorna las proximas clases para poder marcar que no habra clases.
   * Se utiliza la base de datos para verificar si habra actividades.
  */
  public getClases()
  {

  }

  /**
   * Obtiene las asistencias de la division
   * Se utiliza la base de datos para acceder a las asistencias.
  */
  public getAsistencias()
  {

  }

  /**
   * Pone una futura clase como sin actividades.
   * Se pone presente a todos los alumnos que concurren a la division.
   * Se utiliza la base de datos para acceder a las asistencias.
  */
  public MarcarDiaSinClases(fecha, nroClase)
  {

  }

  /**
   * Pone una futura clase que esta sin actividades como con actividades.
   * Se elimina los registros de asistencia de esa fecha.
   * Se utiliza la base de datos para acceder a las asistencias.
  */
  public MarcarDiaConClases(fecha, nroClase)
  {

  }

  /**
   * Modifica los datos de la division (Ej: Como al tomar lista, se modifica la clase actual).
   * Se utiliza la base de datos para modificar la division.
  */
  public ModificarDivision()
  {

  }

}