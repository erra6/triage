<?php
require_once __DIR__ . '/../config/path.php';
require_once CONFIG_PATH   . '/db.php';
require_once INCLUDES_PATH . '/fconfig.php';
require_once CLASSES_PATH  . '/Database.php';
require_once INCLUDES_PATH . '/Logger.php';
require_once INCLUDES_PATH . '/tabla.php';

// -------------------------------------------------
// Panel de control - Editar
// -------------------------------------------------
session_start();

// Verificación de sesión
if (!isset($_SESSION['usuario']) || !isset($_SESSION['grupo'])) {
    Logger::error("Acceso denegado a editar.php sin sesión activa.");
    header("Location: index.php");
    exit();
}

// Redirecciones por grupo
switch ($_SESSION['grupo']) {
    case 'ver':
        header("Location: ver.php");
        exit();
    case 'dya':
        header("Location: dya.php");
        exit();
    case 'sanitario':
        header("Location: sanitario.php");
        exit();
    default:
        // grupo editar o admin continúan aquí
        break;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Pompiers - Panel de edición</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Estilos -->
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/default.css" />
    <link rel="stylesheet" href="css/alphacube.css" />

    <!-- Scripts (revisar que existan en /js) -->
    <script src="js/prototype.js"></script>
    <script src="js/estados.js"></script>
    <script src="js/ambulancias.js"></script>
    <script src="js/hospitales.js"></script>
    <script src="js/incidencias.js"></script>
    <script src="js/callpuesto.js"></script>
    <script src="js/callambulancia.js"></script>
    <script src="js/calltracking.js"></script>
    <script src="js/callhospital.js"></script>
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
