<?php

require_once "clases/AccesoDatos.php";
require_once "clases/Usuario.php";
require_once "clases/AlumnoDivisiones.php";
require_once "clases/Materia.php";
require_once "clases/Ciclo.php";
require_once "clases/Aula.php";
require_once "clases/Division.php";

require __DIR__ . '/vendor/autoload.php';

use \Firebase\JWT\JWT;

use \Psr\Http\Message\ServerRequestInterface as Request; //alias
use \Psr\Http\Message\ResponseInterface as Response; //alias

require 'vendor/autoload.php'; //composer, referencia a slim framework

$app = new \Slim\App; //clase de slim framework

//-------------------EVITAR PROBLEMA DEL CORS---------------------------
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*') //La pagina donde este alojado.
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
//-------------------FIN EVITAR PROBLEMA DEL CORS---------------------


 $app->get('/usuarios[/]', function ($request, $response, $args) 
{
    $listado=Usuario::TraerUsuarios();
    return $response->withJson($listado);
});

$app->get('/agregar/usuario/{obj}', function ($request, $response, $args) 
{
    $obj= $request->getAttribute('obj');
    $cantidad=Usuario::Agregar(json_decode($obj));
    $can=json_encode($cantidad);
    if($cantidad>0)
    {
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Usuario agregado con exito";
    }
    else
    {
        $retorno["Exito"] = FALSE;
         $retorno["Mensaje"] = "Error al agregar!";
    }
    return $response->withJson($retorno);
});

$app->get('/eliminar/usuario/{id}', function ($request, $response, $args) 
{
    $cantidad=Usuario::Eliminar($args['id']);
    if($cantidad>0)
    {
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Se elimino correctamente!";
    }
    else
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "Error al eliminar";
    }
    return $response->withJson($retorno);
});

 $app->get('/modificar/usuario/{obj}', function ($request, $response, $args) 
 {
    $obj= $request->getAttribute('obj');
    $cantidad=Usuario::Modificar(json_decode($obj));
    if($cantidad>0)
    {
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Se modifico correctamente!";
    }
    else
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "Error al modificar!";
    }
    return $response->withJson($retorno);
});

$app->get('/alumnodivisiones[/]', function ($request, $response, $args) 
{
    $listado=AlumnoDivisiones::TraerAlumnoDivisiones();
    return $response->withJson($listado);
});

$app->get('/buscar/alumnodivisiones/{id}', function ($request, $response, $args) 
{
    $cantidad=AlumnoDivisiones::BuscarId($args['id']);

    if (count($cantidad) < 1)
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "No hay alumnos en la division";
    }
    else
    {
        $retorno["Exito"] = TRUE;
        $retorno["Alumnos"] = $cantidad;
    }
    
    return $response->withJson($retorno);
});

 $app->get('/materias[/]', function ($request, $response, $args) 
{
    $listado=Materia::TraerMaterias();
    return $response->withJson($listado);
});
 $app->get('/aulas[/]', function ($request, $response, $args) 
{
    $listado=Aula::TraerAulas();
    return $response->withJson($listado);
});
 $app->get('/ciclos[/]', function ($request, $response, $args) 
{
    $listado=Ciclo::TraerCiclos();
    return $response->withJson($listado);
});
 $app->get('/divisiones[/]', function ($request, $response, $args) 
{
    $listado=Division::TraerDivisiones();
    return $response->withJson($listado);
});

$app->get('/agregar/division/{obj}', function ($request, $response, $args) 
{
    $obj= $request->getAttribute('obj');
    $cantidad=Usuario::Agregar(json_decode($obj));
    $can=json_encode($cantidad);
    if($cantidad>0)
    {
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Division agregado con exito";
    }
    else
    {
        $retorno["Exito"] = FALSE;
         $retorno["Mensaje"] = "Error al agregar division!";
    }
    return $response->withJson($retorno);
});

$app->get('/divisiones/dia', function ($request, $response, $args) 
{
    date_default_timezone_set('America/Argentina/Buenos_Aires');

    $fecha = strftime("%Y-%m-%d", time());

    $divisiones = Division::TraerDivisionesDelDia($fecha);

    if (count($divisiones) < 1)
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "No hay divisiones en el dia.";
    }
    else
    {
        $retorno["Exito"] = TRUE;
        $retorno["Divisiones"] = $divisiones;
    }
    
    return $response->withJson($retorno);
});

$app->get('/alumnos/division/{idDivision}', function ($request, $response, $args) 
{
    $idDivision = $request->getAttribute('idDivision');

    $usuarios = Usuario::TraerAlumnosDivision($idDivision);

    if (count($usuarios) < 1)
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "No hay alumnos en la division";
    }
    else
    {
        $retorno["Exito"] = TRUE;
        $retorno["Alumnos"] = $usuarios;
    }
    
    return $response->withJson($retorno);
});

 $app->get('/modificar/division/{obj}', function ($request, $response, $args) 
 {
    $division = $request->getAttribute('obj');
    $res = Division::ModificarDivision(json_decode($division));

    if($res == TRUE)
    {
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Se modifico correctamente la division!";
    }
    else
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "Error al modificar la division!";
	$retorno["Error"] = $res;
    }
    return $response->withJson($retorno);
});

$app->get('/modificar/alumnosdivision/{obj}', function ($request, $response, $args) 
 {
    $obj = $request->getAttribute('obj');
    $obj = json_decode($obj);

    /*for ($i = 0; $i < count($obj); $i++)
    { 
        $res = AlumnoDivisiones::Modificar($obj[$i]);

        if ($res == FALSE)
        {
            $retorno["Exito"] = FALSE;
            $retorno["Mensaje"] = "Error al modificar los alumnos de la division!";
            $retorno["Error"] = $res;
            break;
        }
        if ($i == count($obj) - 1)
        {
            $retorno["Exito"] = TRUE;
            $retorno["Mensaje"] = "Exito al modificar los alumnos de la division!";
        }
    }*/

    return $response->withJson($obj);
});

$app->post('/login', function (Request $request, Response $response)
{
    $usuario = new stdclass();
    $usuario->email =  $request->getParams()["email"];
    $usuario->password =  $request->getParams()["password"];

    $usuarioLogin = Usuario::Chequear($usuario->email,$usuario->password);

    $resultado = new stdClass();
    $resultado->exito = false;

    if ($usuarioLogin == false)
        $resultado->mensaje = "No se encontro el usuario ingresado.";
    else
    {
        $resultado->exito = true;
        $resultado->mensaje = "Usuario encontrado en la base de datos!";

        //JWT
        $key = "example_key";
        $token = array(
            "iss" => "http://example.org",
            "aud" => "http://example.com",
            "iat" => 1356999524,
            "nbf" => 1357000000,
            "usuario" => $usuarioLogin
        );

        $resultado->token = JWT::encode($token, $key);
    }

    $response = $response->withJson($resultado);
    return $response->withHeader('Content-type', 'application/json');
});
$app->get('/token', function ($request, $response, $args) 
{
    $headers = apache_request_headers();
    $key = "example_key";

    $tk = explode(' ', $headers['Authorization']);
    try 
    {
        $decoded = JWT::decode($tk[1], $key, array('HS256'));
    } 
    catch (Exception $e) 
    {

    }
    if ($decoded)
    {
        $rta['rta'] = $decoded;
    // return true;
    }
    else 
    {
        $rta['rta'] = false;
    }
        
    print_r(json_encode($rta));

    return;
    /**
        * IMPORTANT:
        * You must specify supported algorithms for your application. See
        * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
        * for a list of spec-compliant algorithms.
        */
        $jwt = JWT::encode($token, $key);
        $tok['token'] = $jwt;
        print_r(json_encode($tok));
        return;
});
$app->run();
?>