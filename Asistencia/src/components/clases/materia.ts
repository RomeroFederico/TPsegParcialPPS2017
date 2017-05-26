export class Materia
{
  public idMateria : number;
  public nombre : string;
  public img : string;

 /**
 * Materia de una carrera determinada
 */
  constructor(idMateria : number = 0, nombre : string = "", img : string = "materiaPorDefecto.png") 
  {
    this.idMateria = idMateria;
    this.nombre = nombre;
    this.img = img;
  }

  /**
   * Obtiene las divisiones que tienen esta materia.
   * Se utiliza la base de datos para acceder a las divisiones.
   */
  public getDivisiones()
  {

  }

}
