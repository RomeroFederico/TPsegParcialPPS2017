export class Aula
{
  public idAula : number;
  public nombre : string;
  public piso : number;

/**
 * Aula donde se dictan las clases de las divisiones.
 */
  constructor(idAula : number = 0, nombre : string = "", piso : number = 0) 
  {
    this.idAula = idAula;
    this.nombre = nombre;
    this.piso = piso;
  }

  /**
   * Obtiene las divisiones que dan clase en el aula.
   * Se utiliza la base de datos para acceder a las divisiones.
   */
  public getDivisiones()
  {
  }

}
