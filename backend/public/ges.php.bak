<?php
// Normalizado y limpiado (2025-09-18)
require_once __DIR__ . '/../config/path.php';
require_once INCLUDES_PATH . '/tabla.php';
require_once CLASSES_PATH . '/Database.php';
require_once CONFIG_PATH   . '/db.php';
require_once INCLUDES_PATH . '/fconfig.php';

/**
 * Panel de control principal (admin)
 *
 * @package front
 * @version 2.0.0
 */

session_start();

// Verificación de sesión y permisos
if (!isset($_SESSION['usuario']) || !isset($_SESSION['grupo'])) {
    header("Location: index.php");
    exit();
}

// Solo los administradores pueden entrar aquí
if ($_SESSION['grupo'] !== 'admin') {
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pompièrs - Panel de Administración</title>

    <!-- JS -->
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
    <script src="js/popmenu.js"></script>
    <script src="js/sintomas.js"></script>
    <script src="js/sintomenos.js"></script>
    <script src="js/init.js"></script>

    <!-- CSS -->
    <link rel="stylesheet" href="css/style.css"/>
    <link rel="stylesheet" href="css/default.css"/>
    <link rel="stylesheet" href="css/alphacube.css"/>
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
            <li id="menu_inicio"><a href="#" title="Inicio" class="current">Inicio</a></li>
            <li id="menu_mapa"><a href="log/usuario.php" title="Usuarios">Usuarios</a></li>
            <li id="menu_mapa"><a href="hospital.php" title="Hospital">Control sanitario</a></li>
            <li id="menu_mapa"><a href="log/reiniciar.php" title="Reiniciar">Reiniciar</a></li>
            <li id="menu_salir"><a href="log/salir.php" title="Salir">Salir</a></li>            
        </ul>            
    </div>          

    <!-- Cabecera -->
    <div class="left logo2"><img src="images/escut.png" alt="Escudo" /></div>
    <div class="left" style="margin:40px 0px 0px 20px; font-size:26px">
        Emergencies Pompièrs d'Aran
    </div>

    <!-- Tabla de incidencias -->
    <div id="incidencias"></div>
</body>
</html>
