<?php
require_once "AccesoDatos.php";

class Materia
{

	public $idMateria;
 	public $nombre;
	public $img;

	public static function TraerMaterias()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM materias");
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "Materia");	
		return $arrUsuarios;
	}

	public static function Agregar($materia)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO materias (nombre,img) 
		VALUES(:nombre,:img)");
		$consulta->bindValue(':nombre',$materia->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':img', $materia->img, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}
?>