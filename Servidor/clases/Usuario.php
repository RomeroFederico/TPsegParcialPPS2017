<?php

require_once "AccesoDatos.php";

class Usuario
{

	public $idUsuario;
 	public $nombre;
  	public $apellido;
  	public $sexo;
	public $edad;
	public $dni;
	public $legajo;
	public $email;
	public $password;
	public $tipo;
	public $img;

	public static function Buscar($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE idUsuario =:idUsuario");
		$consulta->bindValue(':idUsuario', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$usuarioBuscado= $consulta->fetchObject('Usuario');
		return $usuarioBuscado;	
					
	}

	public static function Chequear($mail,$pass) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE email =:email AND password =:password");
		$consulta->bindValue(':email', $mail, PDO::PARAM_STR);
		$consulta->bindValue(':password', $pass, PDO::PARAM_STR);
		$consulta->execute();
		$usuarioBuscado= $consulta->fetchObject('Usuario');
		return $usuarioBuscado;	
					
	}
	
	public static function TraerUsuarios()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios");
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");	
		return $arrUsuarios;
	}
	
		public static function Agregar($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios (nombre,apellido,sexo,edad,dni,legajo,email,password,tipo,img) 
		VALUES(:nombre,:apellido,:sexo,:edad,:dni,:legajo,:email,:password,:tipo,:img)");
		$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':apellido', $usuario->apellido, PDO::PARAM_STR);
		$consulta->bindValue(':sexo', $usuario->sexo, PDO::PARAM_STR);
		$consulta->bindValue(':edad',$usuario->edad, PDO::PARAM_INT);
		$consulta->bindValue(':dni', $usuario->dni, PDO::PARAM_STR);
		$consulta->bindValue(':legajo', $usuario->legajo, PDO::PARAM_STR);
		$consulta->bindValue(':email',$usuario->email, PDO::PARAM_STR);
		$consulta->bindValue(':password', $usuario->password, PDO::PARAM_STR);
		$consulta->bindValue(':tipo',$usuario->tipo, PDO::PARAM_STR);
		$consulta->bindValue(':img', $usuario->img, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	


	public static function Eliminar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM usuarios WHERE idUsuario=:idUsuario");	
		$consulta->bindValue(':idUsuario',$id, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function Modificar($usuario)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios 
				SET nombre=:nombre, apellido=:apellido, sexo=:sexo, edad=:edad, dni=:dni, legajo=:legajo, email=:email, password=:password, tipo=:tipo, img=:img
				WHERE idUsuario=:idUsuario");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':idUsuario',$usuario->idUsuario, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido',$usuario->apellido, PDO::PARAM_STR);
            $consulta->bindValue(':sexo',$usuario->sexo, PDO::PARAM_STR);
			$consulta->bindValue(':edad',$usuario->edad, PDO::PARAM_STR);
            $consulta->bindValue(':dni',$usuario->dni, PDO::PARAM_INT);
            $consulta->bindValue(':legajo',$usuario->legajo, PDO::PARAM_STR);
			$consulta->bindValue(':email',$usuario->email, PDO::PARAM_STR);
            $consulta->bindValue(':password',$usuario->password, PDO::PARAM_STR);
			$consulta->bindValue(':tipo',$usuario->tipo, PDO::PARAM_STR);
            $consulta->bindValue(':img',$usuario->img, PDO::PARAM_STR);
            
			return $consulta->execute();
	}

	public static function TraerAlumnosDivision($idDivision)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios, alumnosdivisiones WHERE usuarios.idUsuario = alumnosdivisiones.idAlumno AND alumnosdivisiones.idDivision = :IdDivision");
		$consulta->bindValue(':IdDivision', $idDivision, PDO::PARAM_INT);
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");	
		return $arrUsuarios;
	}


}
?>