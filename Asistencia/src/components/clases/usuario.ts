export class Usuario
{
  public idUsuario : number;
  public nombre : string;
  public apellido : string;
  public sexo : string;
  public dni : string;
  public legajo : string;
  public email : string;
  public password : string;
  public edad : number;
  public img : string;

  /**
  * Usuario del sistema.
  */
  constructor(idUsuario : number = 0,
              nombre : string = "",
              apellido : string = "",
              dni : string = "",
              legajo : string = "",
              email : string = "",
              password : string = "",
              edad : number = 0,
              img : string = "",
              sexo : string = "Masculino") 
  {
    this.idUsuario = idUsuario;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.legajo = legajo;
    this.email = email;
    this.password = password;
    this.edad = edad;
    this.img = img;
    this.sexo = sexo;
  }

  /**
  * Obtiene las notificaciones recibidas.
  */
  public getNotificacionesRecibidas()
  {

  }

  /**
  * Modifica los datos del usuario en el servidor.
  */
  public ModificarDatos()
  {

  }

}
