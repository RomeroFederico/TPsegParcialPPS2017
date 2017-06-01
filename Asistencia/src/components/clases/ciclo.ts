export class Ciclo
{
  public idCiclo : number;
  public año : number;
  public cuatrimestre : number;

 /**
 * Ciclo de actividades de una facultad.
 * @param icCiclo id del ciclo.
 * @param año año del ciclo.
 * @param cuatrimestre primer o segundo del año. 
 */
  constructor(idCiclo : number = 1, año : number = 2010, cuatrimestre : number = 1) 
  {
    this.idCiclo = idCiclo;
    this.año = año;
    this.cuatrimestre = cuatrimestre < 1? 1 : (cuatrimestre > 2? 2: cuatrimestre);
  }

  /**
  * Obtiene la informacion del ciclo en formato cadena
  */
  get CicloEnCadena():string {
    return (this.cuatrimestre == 1? "1er " : "2do ") + "Cuatrimestre " + this.año;
  }

}
