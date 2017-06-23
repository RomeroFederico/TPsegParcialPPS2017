<?php
require_once "AccesoDatos.php";

class Ciclo
{

	public $idCiclo;
 	public $anio;
	public $cuatrimestre;

	public static function TraerCiclos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM ciclos");
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "Ciclo");	
		return $arrUsuarios;
	}

	public static function Agregar($ciclo)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO ciclos (anio,cuatrimestre) 
		VALUES(:anio,:cuatrimestre)");
		$consulta->bindValue(':anio',$ciclo->anio, PDO::PARAM_INT);
		$consulta->bindValue(':cuatrimestre', $ciclo->cuatrimestre, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}
?>