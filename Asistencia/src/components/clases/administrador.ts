import { Usuario } from "./usuario";

export class Administrador extends Usuario
{

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
    super (idUsuario, nombre, apellido, dni, legajo, email, password, edad, img, sexo);
  }

}
