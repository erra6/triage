<?php
require_once __DIR__ . '/../config/path.php';
require_once CONFIG_PATH   . '/db.php';
require_once INCLUDES_PATH . '/fconfig.php';
require_once CLASSES_PATH  . '/Database.php';
require_once INCLUDES_PATH . '/Logger.php';
require_once INCLUDES_PATH . '/tabla.php';

// -------------------------------------------------
// Panel de control - Ver
// -------------------------------------------------
session_start();

// Verificación de sesión
if (!isset($_SESSION['usuario']) || !isset($_SESSION['grupo'])) {
    Logger::error("Acceso denegado a ver.php sin sesión activa.");
    header("Location: index.php");
    exit();
}

// Redirecciones según grupo
switch ($_SESSION['grupo']) {
    case 'editar':
    case 'admin':
        header("Location: editar.php");
        exit();
    case 'sanitario':
        header("Location: sanitario.php");
        exit();
    case 'dya':
        header("Location: dya.php");
        exit();
    default:
        // grupo 'ver' continúa aquí
        break;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Pompiers - Panel de visualización</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Estilos -->
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/default.css" />
    <link rel="stylesheet" href="css/alphacube.css" />

    <!-- Scripts específicos para vista "ver" -->
    <script src="js/prototype.js"></script>
    <script src="js/estados.ver.js"></script>
    <script src="js/incidencias.ver.js"></script>
    <script src="js/effects.js"></script>
    <script src="js/window.js"></script>
    <script src="js/window_effects.js"></script>
    <script src="js/sintomas.js"></script>
    <script src="js/init.js"></script>
</head>
<body>
    <!-- Logotipos -->
    <div class="logo">
        <div class="left">
            <div class="left logo2" style="margin:10px 10px 0px 0px">
                <img src="images/flechast.png" alt="Logotipo" />
            </div>
        </div>
    </div>

    <!-- Menú -->
    <div class="left menu">
        <ul id="menu">
            <li id="menu_inicio"><a href="#" class="current">Inicio</a></li>
            <li id="menu_mapa"><a href="sanitario.php">Control sanitario</a></li>
            <li id="menu_salir"><a href="log/salir.php">Salir</a></li>
        </ul>
    </div>  

    <!-- Logo + título -->
    <div class="left logo2">
        <img src="images/escut.png" alt="Logotipo" />
    </div>
    <div class="left" style="margin:40px 0px 0px 20px; font-size:26px">
        Emergencies Pompièrs d'Aran
    </div>

    <!-- Tabla dinámica -->
    <div id="incidencias"></div>
</body>
</html>
