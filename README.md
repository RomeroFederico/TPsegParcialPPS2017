<h1 align="center">Aplicacion movil de toma de Asistencia</h1>

<h1> Ionic View : 30493405 </h1>

<h3>Materia: Practica Supervisada</h3>
<h5>Profesores : Villegas Octavio y Neiner Maximiliano.</h5>
<h5>Cuatrimestre: Primer cuatrimestre 2017.</h5>
<h5>Entrega del trabajo practico "Asistencia" como parte de un Examen Final</h5>

<h1 align="center">Equipo: "NULL"</h1>

<h2 >Flores Osmar</h2>
<h3 align="left" >Actividades realizadas</h3>
<h4> - Login con los distintos perfiles de usuarios.</h4>
<h4> - Generacion de Json web token(JWT) para el usuario logeado.</h4>
<h4> - Verificacion del Token creo para el usuario en paginas determinadas.</h4>
<h4> - Creacion de los botones de test (Alumno,Profesor,Secretario,Administrador).</h4>
<h4> - Implementacion del menu desplegable.</h4>
<h4> - Implementacion de filtros dentro del menu desplegable.</h4>
<h4> - Ruteos en la navegacion dependiendo el perfil del usuario.</h4>
<h4> - Creacion del ApiRest con SlimFramework.</h4>
<h4> - Implementacion de la mayoria de los plugins.</h4>
<img src="https://avatars3.githubusercontent.com/u/25781764?v=3&s=460" height="100" width="100">
<h1 align="left">GitHub: 
         <a href="https://github.com/Ramzitooo">Ramzitooo<a>
</h1>
<h2>Romero Federico</h2>
<h3 align="left" >Actividades realizadas</h3>
<h4> - Llevo acabo la interfaz general del proyecto.</h4>
<h4> - Generacion de la logica de la toma de asistencias.</h4>
<h4> - Creacion del las tablas necesarias para la base de datos.</h4>
<h4> - Generar funciones necesarias en el ApiRest.</h4>
<h4> - Todo el perfil Administrativo y Secretario.</h4>
<h4> - Creacion del componente Clases.</h4>
<img src="https://avatars3.githubusercontent.com/u/17879446?v=3&s=460" height="100" width="100">
<h1 align="left">GitHub: 
        <a href="https://github.com/RomeroFederico">RomeroFederico<a>
</h1>
<h2 >Gueler Daniel</h2>
<h3 align="left" >Actividades realizadas</h3>
<h4> - Login con los distintos perfiles de usuarios.</h4>
<h4> - Generacion de Json web token(JWT) para el usuario logeado.</h4>
<h4> - Verificacion del Token creo para el usuario en paginas determinadas.</h4>
<h4> - Creacion de los botones de test (Alumno,Profesor,Secretario,Administrador).</h4>
<h4> - Implementacion del menu desplegable.</h4>
<h4> - Implementacion de filtros dentro del menu desplegable.</h4>
<h4> - Ruteos en la navegacion dependiendo el perfil del usuario.</h4>
<h4> - Creacion del ApiRest con SlimFramework.</h4>
<h4> - Implementacion de la mayoria de los plugins.</h4>
<img src="https://avatars1.githubusercontent.com/u/17879380?v=3&s=460" height="100" width="100">
<h1 align="left">GitHub: 
        <a href="https://github.com/danielgueler">danielgueler<a>
</h1>

<h1 align="center">Asistencia</h1>

<h3>LOGIN</h3>
<h5>El usuario que comienza con la aplicaciones tiene la posiblidad de logearse con los 4 tipos de usuarios que esta dispone.
    El usuario tiene que estar registrado en la base de datos para poder logearse en caso de no querer utilizar los botones de logeo.       Al ingresar correctamente los datos este se le dara el persimo para acceder al menu de acciones correspondiente al tipo de usuario.     En caso de suceder alguna anomalia o error este sera capturado y se mostrara por pantalla. Si ingresa el email o password               incorrectamente este se le saltara un mensaje de datos incorrectos con lo cual tendra que volver a ingresar dichos datos.</h5>
<h3>MENU DESPLEGABLE</h3>
<h5>Este cuenta con opciones similares como el Salir e Informacion.
    El Salir pregunta si esta seguro de salir con la opcion de aceptar o cancelar en caso de arrepentirse. En la opcion de ver el           mapa este cargar la ubicaion de la UTN FRA marcado
    Al ingresar a informacion se puede visualizar datos de la facultad tales como: direccion, telefono y un mapa con su ubicacion</h5>
<h2>PERFILES DE USUARIOS</h2>
<h3>ALUMNO</h3>
<h5>Cuando se logea puede ver sus datos. Tiene la posibilidad de ver sus notificaciones puede borrarlas en caso de que sea
    necesario. Puede ver sus asistencias al igual que ver sus materias.</h5>
<h3>PROFESOR</h3>
<h5>Cuando se logea puede ver sus datos. La funcionalidad es muy similar a la de alumnbo . Este tiene la posibilidad de navegar 
    por un menu en caso de que lo desee.Tiene la posibilidad de ver sus materias divisiones y alumnos.</h5>
<h3>SECRETARIO</h3>
<h4>Toma de asistencia: El secretario sera el unico usuario que pueda realizar la accion de toma de asistencia por division.<h4>
<h4>Pasos para la toma de asistencia</h4>
<h5>1- Seleccionamos la accion principal de "Tomar Asistencia" de nuestro menu principal del perfil Administrativo.</h5>
<h5>2- Este nos mandara a una pagina donde nos pedira seleccionar una division para la toma de asistencia en caso de no haber ninguna division esto significara no hay division para tomar lista en el dia de la fecha.</h5>
<h5>3- Una vez seleccionada la division a la cual se desea tomar lista esta nos mostrara una breve informacion de la division con todo un listado de alumnos de esa division.</h5>
<h5>4- Por cada alumno de esa lista tendremos que tildar o no para la marcar asistencia del alumno o inasistencia en caso de no tildar el campo.</h5>
<h5>5- Una vez tildado a los alumnos que asistieron o no tendremos que ir al boton aceptar para que esta lista se carge en nuestro sistema.</h5>
<h5>6- Una vez finalizado Nos mostrara o no un mensaje de Exito. Tambien nos llegara una notificacion del correcto uso de la toma de asistencia.</h5>
<h5>El administrativo puede tomar asistencia de las divisiones que tienen como fecha de proxima clase la fecha actual.
    Al tomar la lista, modifica la division para que ya no se pueda tomar lista ese dia. 
    Tambien puede ver los listados de las divisiones, de los alumnos y de los profesores, aplicando filtros de seleccion, puede
    buscar por nombre, u otro parametro.
    Puede ver sus detalles, ademas de los datos listado. 
    Ademas, puede poner dias de licencia general sino hay clases tales diasm, atraves de un calendario. 
    Por ultimo puede mandar o resibir notificaciones. </h5>
        <h5>- Podra ver el el listado de todos los usuarios del sistema.</h5>
    <h5>- Podra ver el el listado de todas las divisiones del sistema.</h5>
    <h5>- Podra ver el el listado de todas las materias del sistema.</h5>
    <h5>- Podra ver el el listado de todas las aulas del sistema.</h5>
    <h5>- Este tendra en beneficio de ver el listado de encuesta realizado por los demas usuarios hacia la app en general.</h5>
    <h5>- Tambien podra agregar un ciclo al sistema.</h5>
<h3>ADMINISTRADOR</h3>

<h5>Cuando se logea puede ver sus datos , ver los listados generales de los datos del sistema(usuarios,divisiones,materias,aulas), 
    y puede agregar cada uno de estos. Las acciones esenciales que este puede realizar son :</h5>
    <h5>- Podra ver el el listado de todos los usuarios del sistema .Tambien podra agregar un usuario al sistema.</h5>
    <h5>- Podra ver el el listado de todas las divisiones del sistema .Tambien podra agregar una division al sistema</h5>
    <h5>- Podra ver el el listado de todas las materias del sistema .Tambien podra agregar una materia al sistema.</h5>
    <h5>- Podra ver el el listado de todas las aulas del sistema .Tambien podra agregar un aula al sistema.</h5>
    <h5>- Este tendra en beneficio de ver el listado de encuesta realizado por los demas usuarios hacia la app en general.</h5>
    <h5>- Tambien podra agregar un ciclo al sistema.</h5>
  <h3>ENCUENTAS</h3>
  <h5>Todos los usuarios a excepcion del administrador podran realizar una encuesta de satisfaccion de la aplicacion en general.
  El administrador pobra ver el listado de estas encuestas con su respectivo usuario</h5>
  <h3>GRAFICOS</h3>
  <h5>Se genero un grafico estadistico de torta que indica la cantidad y tipos de usuarios que hay en nuestro sistema. Podra acceder a esta informacion solo el perfil Administrativo(Secretario) o Administrador.En la cual tendran acceso mediando su menu en la Opcion "Graficos".</h5>
  <h3>NOTIFICACIONES LOCALES</h3>
  <h5>Se crearan notificaciones con mensaje de bienvenida a todos los usuarios que se logen. Tambien se generan cuando el secretario tome lista.</h5>
  <h3>GENERACION DE ARCHIVOS</h3>
  <h5>El administrador y el secretario tendran la posibilidad de tener un listado de los usuarios en formato excel y txt en sus respectivos dispositivos, ademas de eso contaran con la posibilidad de leer estos archivos. Esta funcion la encontrar en el apartado del menu "Graficos" Estara en abajo del grafico estadistico de los usuarios.</h5>
  <h3>MAPAS</h3>
  <h5>Todos los usuarios tendran la posibilidad de ubicarse mediante un mapa del establecimiento. Esta funcion la encontraran en el menu desplegable en el apartado "Mapa". Tambien cuenta con un poco de la informacion del establecimiento.</h5>
<h2>GENERACION DE PAGINAS Y BOTONES DE AYUDA PARA LA UTILIZACION DE LA APP</h2>
<h4>Ahora el usuario podra ver una guida de ayuda que la encontrara en el menu despegable. Este estara filtrado dependiendo el perfil de usuario logeado. Basicamente son sliders q muestran imagenes con detalles textuales y visuales de cada pagina. Todos los perfiles de usuario contaran con esta opcion dentro de su menu. En login contara con un boton de ayuda para entrar.</h4>
<h2>ApiDoc y Ejemplo de un ApiRest</h2>
<h4>Se documento todo el ApiRest utilizado para este proyecto de cada metodo con su tipo mediante el template ApiDoc Podra acceder a ver esta documentacion siguiendo el link de abajo: </h4>
<h4>Link: <a href="http://www.osmar.hol.es/documentacion/documento/">API DOC<a></h4>
<h4>Se creo una app de ayuda que sirva para entendir o explicar el como funciona un ApiRest. Este app tendra imagenes y texto de ayuda q sirva para comprender el uso de este podra utilizar esta app con el id de la app en ionic view:  </h4>
<h4>Ionic view de la app de prueba: 4b403b51</h4>
<h3>PLUGINS UTILIZADOS</h3>
<h5> - Vibracion</h5>
<h5> - Native Audio</h5>
<h5> - Toast</h5>
<h5> - Google Maps</h5>
<h5> - Device</h5>
<h5> - Local Notification</h5>
<h5> - File</h5>
<h5> - Charts</h5>

<h3>COMPOENENTE DE IONIC UTILIZADOS</h3>

<h5>-Action Sheets<h5>
   <p> - Alerts</p>
    <p> - Loading</p>
    <p> - Searchbar</p>
    <p> - Refresher</p>
    <p> - Gesture</p>
    <p> - Menu</p>
    <p> - Modal</p>
    <p> - etc...</p>

