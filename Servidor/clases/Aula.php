<?php

require_once "AccesoDatos.php";

class Aula
{

	public $idAula;
 	public $nombre;
	public $piso;

	public static function TraerAulas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM aulas");
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "Aula");	
		return $arrUsuarios;
	}

	public static function Agregar($aula)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO aulas (nombre,piso) 
		VALUES(:nombre,:piso)");
		$consulta->bindValue(':nombre',$aula->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':piso', $aula->piso, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();			
	}	

}
?>