<?php
    require_once 'modelos.php'; // Requerimos el archivo de clases modelo.php
    $jvalores = file_get_contents("php://input"); // Tomamos los valores que vienen del POST en formato JSON
    $valores = json_decode($jvalores); // Convertimos los valores JSON a Array Asociativo

    $usuario = "'".$valores->usuario."'"; // Guardamos en la variable $usuario
    $password = "'".$valores->password."'"; // Guardamos en la variable $password

    $usuarios = new Modelo('usuarios'); // Creamos el objeto $usuarios basado en clientes
    $usuarios->setCriterio("usuario=$usuario AND password=$password"); // Establecemos el criterio
    $datos = $usuarios->seleccionar(); // Seleccionamos el usuario
    
    if (!empty($datos)) {
        $usuarioEncontrado = json_decode($datos, true)[0]; // Obtener el primer usuario
        $respuesta = [
            "resultado" => "OK",
            "mensaje" => "Login exitoso",
            "usuario" => $usuarioEncontrado['usuario'],
            "id" => $usuarioEncontrado['id'],
            "nivel" => $usuarioEncontrado['nivel']
        ];
    } else {
        $respuesta = ["resultado" => "ERROR", "mensaje" => "Usuario o contraseña incorrectos"];
    }
    
    header('Content-Type: application/json');
    echo json_encode($respuesta);
?>