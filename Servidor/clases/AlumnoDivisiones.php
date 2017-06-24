<?php
require_once "AccesoDatos.php";

class AlumnoDivisiones
{

	public $idAlumno;
	public $idDivision;
 	public $estado;
	public $faltas;

	public static function TraerAlumnoDivisiones()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM alumnosdivisiones");
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "AlumnoDivisiones");
		return $arrUsuarios;
	}

	public static function BuscarId($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM alumnosdivisiones WHERE idAlumno =:idAlumno");
		$consulta->bindValue(':idAlumno', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$usuarioBuscado= $consulta->fetchAll(PDO::FETCH_CLASS, "AlumnoDivisiones");
		return $usuarioBuscado;	
	}

	public static function Modificar($obj) 
	{	
		try
		{ 
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE alumnosdivisiones   
					SET estado=:estado, faltas = :faltas  
					WHERE idDivision = :idDivision AND idAlumno = :idAlumno");
			$consulta->bindValue(':idAlumno', $obj->idAlumno, PDO::PARAM_INT);
			$consulta->bindValue(':idDivision', $obj->idDivision, PDO::PARAM_INT);
			$consulta->bindValue(':faltas', $obj->faltas, PDO::PARAM_INT);
			$consulta->bindValue(':estado', $obj->estado, PDO::PARAM_STR);
			return $consulta->execute();
		}
		catch (Exception $e)
		{
			return FALSE;
		} 
	}
}
?>