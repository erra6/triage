<?php
// Normalizado por fix_all_includes.php (2025-09-18)
require_once __DIR__ . '/../config/path.php';
require_once CONFIG_PATH   . '/db.php';
require_once INCLUDES_PATH . '/fconfig.php';
require_once CLASSES_PATH  . '/Database.php';
require_once INCLUDES_PATH . '/Logger.php';

/**
 * Panel control sanitario
 *
 * @package front
 * @version 2.0.0
 */

session_start();

// Verificación de sesión y grupo
if (!isset($_SESSION['usuario']) || !isset($_SESSION['grupo'])) {
    Logger::error("Acceso denegado a sanitario.php sin sesión activa.");
    header("Location: index.php");
    exit();
}

// Solo permitimos acceso a grupos autorizados
$grupo = $_SESSION['grupo'];
if (!in_array($grupo, ['admin', 'sanitario', 'ver'])) {
    Logger::error("Acceso denegado a sanitario.php con grupo no autorizado: $grupo");
    header("Location: log/salir.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pompièrs - Control Sanitario</title>

    <!-- JS -->
    <script src="js/prototype.js"></script>  
    <script src="js/effects.js"></script> 
    <script src="js/dump.js"></script>
    <script src="js/incidencias.sanitario.js"></script>    
    <script src="js/foto.js"></script>
    <script src="js/window.js"></script>
    <script src="js/window_effects.js"></script>
    <script src="js/init.hospitales.js"></script>

    <!-- CSS -->
    <link rel="stylesheet" href="css/style.hospital.css"/>
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
            <?php if ($grupo === "admin" || $grupo === "ver"): ?>
                <li id="menu_inicio"><a href="ges.php" title="Inicio">Inicio</a></li>
            <?php endif; ?>

            <?php if ($grupo === "admin"): ?>
                <li id="menu_mapa"><a href="log/usuario.php" title="Usuarios">Usuarios</a></li>
            <?php endif; ?>

            <li id="menu_mapa"><a href="hospital.php" title="Hospital" class="current">Control sanitario</a></li>

            <?php if ($grupo === "admin"): ?>
                <li id="menu_mapa"><a href="log/reiniciar.php" title="Reiniciar">Reiniciar</a></li>
            <?php endif; ?>

            <li id="menu_salir"><a href="log/salir.php" title="Salir">Salir</a></li>            
        </ul>            
    </div>  

    <!-- Cabecera -->
    <div class="left logo2">
        <img src="images/escut.png" alt="Escudo" />
    </div>
    <div class="left" style="margin:40px 0px 0px 20px;font-size:26px">
        Emergencies Pompièrs d'Aran
    </div>
       
    <!-- Tabla de incidencias -->
    <div class="clearingBR"></div>    
    <div class="row_header">
        <div style="margin-top:2px;margin-right:8px;margin-left:8px;" class="left">
            <div class="left left5">
                <img src="images/hospital.gif" style="width:24px;height:24px;" alt="Hospital" title="Hospital" />
            </div>
        </div>
        <div class="left left5" style="margin-top:3px;"><b><div id="colorheader"></div></b></div>
        <div class="row_header_hospi left" style="margin-top:3px;"><b><div id="hospiheader"></div></b></div>
        <div class="clearingBR"></div>
        <div id="mayor" style="display:none">0</div>
    </div>		
    <div id="incidencias"></div>
</body>
</html>
