<?php
// Normalizado y limpiado (2025-09-18)
require_once __DIR__ . '/../config/path.php';
require_once CLASSES_PATH . '/Database.php';
require_once CONFIG_PATH   . '/db.php';
require_once INCLUDES_PATH . '/fconfig.php';

/**
 * Panel control encierro (Incidencias desde CPC)
 *
 * @package front
 * @version 1.3.0.1
 * @author 
 */

session_start();

// Verificación de sesión y permisos
if (!isset($_SESSION['usuario']) || !isset($_SESSION['grupo'])) {
    header("Location: index.php");
    exit();
}

if ($_SESSION['grupo'] !== 'admin') {
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Incidencias desde CPC</title>
    <link rel="stylesheet" type="text/css" href="css/view.css" media="all">
    <script type="text/javascript" src="js/view.js"></script>
</head>
<body id="main_body">
  
    <img id="top" src="top.png" alt="">
    <div id="form_container">
  
        <h1><a>Incidencias desde CPC</a></h1>
        <form id="form_444322" class="appnitro" method="post" action="api/incidencias.php">
            <div class="form_description">
                <h2>Incidencias desde CPC</h2>
                <p>Formulario para insertar incidencias desde CPC</p>
            </div>            

            <ul>
                <!-- Selección de puesto -->
                <li id="li_2">
                    <label class="description" for="element_2">Puesto </label>
                    <div>
                        <select class="element select medium" id="element_2" name="puesto"> 
                            <option value="1" selected="selected">Rojo - Urgencias Absolutas</option>
                            <option value="3">Amarillo - Urgencias Relativas</option>
                        </select>
                    </div>
                    <p class="guidelines" id="guide_2"><small>Puesto en el que insertar incidencia</small></p> 
                </li>    

                <!-- Selección de sexo -->
                <li id="li_3">
                    <label class="description" for="element_3">Sexo </label>
                    <span>
                        <input id="element_3_1" name="sexo" class="element radio" type="radio" value="1" checked />
                        <label class="choice" for="element_3_1">Hombre</label>
                        <input id="element_3_2" name="sexo" class="element radio" type="radio" value="0" />
                        <label class="choice" for="element_3_2">Mujer</label>
                    </span> 
                </li>    

                <!-- Selección de edad -->
                <li id="li_4">
                    <label class="description" for="element_4">Edad </label>
                    <span>
                        <input id="element_4_1" name="edad" class="element radio" type="radio" value="3" checked />
                        <label class="choice" for="element_4_1">Mayor de 25</label>
                        <input id="element_4_2" name="edad" class="element radio" type="radio" value="2" />
                        <label class="choice" for="element_4_2">Entre 18 y 25</label>
                        <input id="element_4_3" name="edad" class="element radio" type="radio" value="1" />
                        <label class="choice" for="element_4_3">Menor de 18</label>
                    </span> 
                </li>    

                <!-- Botón de envío -->
                <li class="buttons">
                    <input type="hidden" name="form_id" value="444322" />
                    <input id="saveForm" class="button_text" type="submit" name="submit" value="Siguiente" />
                </li>
            </ul>
        </form>  

        <div id="footer">
            Cruz Roja Navarra I+D+I - Zona Gala Labs.  
        </div>
    </div>
    <img id="bottom" src="bottom.png" alt="">
</body>
</html>
