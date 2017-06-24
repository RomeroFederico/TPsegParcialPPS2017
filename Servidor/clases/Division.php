<?php
require_once "AccesoDatos.php";
class Division
{

	public $idDivision;
 	public $idAula;
  	public $idMateria;
    public $idCiclo;
    public $idProfesor;
    public $nombre;
	public $turno;
	public $fechaInicio;
 	public $fechaFin;
  	public $hora;
    public $dia1;
    public $dia2;
    public $dia3;
	public $estado;
 	public $cupoMaximo;
  	public $cupoActual;
    public $cantClases;
    public $claseActual;
    public $fechaProxClase;
	
	public static function TraerDivisiones()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM divisiones");
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "Division");	
		return $arrUsuarios;
	}
    public static function Agregar($division)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO 
		divisiones (idAula,idMateria,idCiclo,idProfesor,nombre,turno,fechaInicio,fechaFin,hora,dia1,dia2,dia3,estado,cupoMaximo,cupoActual,cantClases,claseActual,fechaProxClase) 
		VALUES(:idAula,:idMateria,:idCiclo,:idProfesor,:nombre,:turno,:fechaInicio,:fechaFin,:hora,:dia1,:dia2,:dia3,:estado,:cupoMaximo,:cupoActual,:cantClases,:claseActual,:fechaProxClase)");
		$consulta->bindValue(':idAula',$division->idAula, PDO::PARAM_INT);
        $consulta->bindValue(':idMateria',$division->idMateria, PDO::PARAM_INT);
		$consulta->bindValue(':idCiclo', $division->idCiclo, PDO::PARAM_INT);
        $consulta->bindValue(':idProfesor',$division->idProfesor, PDO::PARAM_INT);
		$consulta->bindValue(':nombre', $division->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':turno',$division->turno, PDO::PARAM_STR);
        $consulta->bindValue(':fechaInicio',$division->fechaInicio, PDO::PARAM_STR);
        $consulta->bindValue(':fechaFin',$division->fechaFin, PDO::PARAM_STR);
		$consulta->bindValue(':hora', $division->hora, PDO::PARAM_STR);
        $consulta->bindValue(':dia1',$division->dia1, PDO::PARAM_STR);
		$consulta->bindValue(':dia2', $division->dia2, PDO::PARAM_STR);
		$consulta->bindValue(':dia3',$division->dia3, PDO::PARAM_STR);
        $consulta->bindValue(':estado',$division->estado, PDO::PARAM_STR);
        $consulta->bindValue(':cupoMaximo',$division->cupoMaximo, PDO::PARAM_INT);
		$consulta->bindValue(':cupoActual', $division->cupoActual, PDO::PARAM_INT);
        $consulta->bindValue(':cantClases',$division->cantClases, PDO::PARAM_INT);
		$consulta->bindValue(':claseActual', $division->claseActual, PDO::PARAM_INT);
		$consulta->bindValue(':fechaProxClase', $division->fechaProxClase, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
				
	}

	public static function TraerDivisionesDelDia($fecha)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT divisiones.*, materias.nombre as nombreMateria, materias.img, ciclos.anio as anio, ciclos.cuatrimestre as cuatrimestre FROM divisiones, materias, ciclos WHERE divisiones.fechaProxClase = :fechaProxClase AND divisiones.idMateria = materias.idMateria AND ciclos.idCiclo = divisiones.idCiclo");

		$consulta->bindValue(':fechaProxClase', $fecha, PDO::PARAM_STR);

		$consulta->execute();	

		$divisiones = $consulta->fetchAll(PDO::FETCH_CLASS, "Division");
	
		return $divisiones;
	}

	public static function ModificarDivision($division)
	{
			try {
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE divisiones 
				SET idAula=:idAula, idMateria=:idMateria, idCiclo=:idCiclo, idProfesor=:idProfesor, nombre=:nombre, turno=:turno, fechaInicio=:fechaInicio, fechaFin=:fechaFin, hora=:hora, dia1=:dia1, dia2=:dia2, dia3=:dia3, estado=:estado, cupoMaximo=:cupoMaximo, cupoActual = :cupoActual, cantClases=:cantClases, claseActual=:claseActual, fechaProxClase=:fechaProxClase 
				WHERE idDivision=:idDivision");
			$consulta->bindValue(':idDivision',$division->idDivision, PDO::PARAM_INT);
			$consulta->bindValue(':idAula',$division->idAula, PDO::PARAM_INT);
			$consulta->bindValue(':idMateria',$division->idMateria, PDO::PARAM_INT);
			$consulta->bindValue(':idCiclo', $division->idCiclo, PDO::PARAM_INT);
			$consulta->bindValue(':idProfesor',$division->idProfesor, PDO::PARAM_INT);
			$consulta->bindValue(':nombre', $division->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':turno',$division->turno, PDO::PARAM_STR);
			$consulta->bindValue(':fechaInicio',$division->fechaInicio, PDO::PARAM_STR);
			$consulta->bindValue(':fechaFin',$division->fechaFin, PDO::PARAM_STR);
			$consulta->bindValue(':hora', $division->hora, PDO::PARAM_STR);
			$consulta->bindValue(':dia1',$division->dia1, PDO::PARAM_STR);
			$consulta->bindValue(':dia2', $division->dia2, PDO::PARAM_STR);
			$consulta->bindValue(':dia3',$division->dia3, PDO::PARAM_STR);
			$consulta->bindValue(':estado',$division->estado, PDO::PARAM_STR);
			$consulta->bindValue(':cupoMaximo',$division->cupoMaximo, PDO::PARAM_INT);
			$consulta->bindValue(':cupoActual', $division->cupoActual, PDO::PARAM_INT);
			$consulta->bindValue(':cantClases',$division->cantClases, PDO::PARAM_INT);
			$consulta->bindValue(':claseActual', $division->claseActual, PDO::PARAM_INT);
			$consulta->bindValue(':fechaProxClase', $division->fechaProxClase, PDO::PARAM_STR);
            
			return $consulta->execute();
			}
			catch (Exception $e)
			{
				return $e;
			} 
	}

}
?>