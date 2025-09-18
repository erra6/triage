<?php
// Normalizado y limpiado (2025-09-18)
require_once __DIR__ . '/../config/path.php';
require_once CLASSES_PATH . '/Database.php';
require_once CONFIG_PATH   . '/db.php';
require_once INCLUDES_PATH . '/fconfig.php';

/**
 * Panel control síntomas desde CPC
 *
 * @package front
 * @version 1.3.0.1
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

// Obtener ID de incidencia desde GET
$IDIncidencia = $_GET['id'] ?? null;
if (!$IDIncidencia) {
    die("❌ Falta el parámetro 'id' en la URL.");
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Síntomas desde CPC</title>
    <link rel="stylesheet" type="text/css" href="css/view.css" media="all">
    <script type="text/javascript" src="js/view.js"></script>
</head>
<body id="main_body">
  
    <img id="top" src="top.png" alt="">
    <div id="form_container">
  
        <h1><a>Síntomas desde CPC para incidencia: <?php echo htmlspecialchars($IDIncidencia); ?></a></h1>
        <form id="form_444764" class="appnitro" method="post" action="api/sintomas.php">
            <div class="form_description">
                <h2>Síntomas desde CPC para incidencia: <?php echo htmlspecialchars($IDIncidencia); ?></h2>
                <p>Formulario para insertar síntomas desde CPC</p>
            </div>            

            <ul>
                <!-- Síntoma -->
                <li id="li_1">
                    <label class="description" for="element_1">Síntoma </label>
                    <div>
                        <select class="element select large" id="element_1" name="IDSintoma"> 
                            <option value="4" selected="selected">Consciente</option>    
                            <option value="1">Amputación</option>
                            <option value="31">Asfixia/disnea</option>
                            <option value="2">Asfixia con parada</option>
                            <option value="3">Asfixia sin parada</option>
                            <option value="5">Contusión abdominal</option>
                            <option value="6">Contusión columna moviliza EE</option>
                            <option value="7">Contusión columna no moviliza EE</option>
                            <option value="8">Contusión con deformidad</option>
                            <option value="9">Contusión craneal</option>
                            <option value="10">Contusión maxilofacial</option>
                            <option value="11">Contusión sin deformidad</option>
                            <option value="12">Contusión torácica con disnea</option>
                            <option value="13">Contusión torácica sin disnea</option>
                            <option value="14">Estable</option>
                            <option value="15">Evisceración</option>
                            <option value="16">Hemorragia masiva</option>
                            <option value="17">Hemorragia no masiva</option>
                            <option value="25">Hemorragia masiva cuello</option>
                            <option value="26">Hemorragia no masiva cuello</option>
                            <option value="27">Hemorragia masiva ingle</option>
                            <option value="28">Hemorragia no masiva ingle</option>
                            <option value="29">Hemorragia masiva hueco poplíteo</option>
                            <option value="30">Hemorragia no masiva hueco poplíteo</option>
                            <option value="18">Herida</option>
                            <option value="19">Herida no penetrante</option>
                            <option value="20">Herida penetrante</option>
                            <option value="21">Inconsciente</option>
                            <option value="22">Inestable</option>
                            <option value="23">Parada</option>
                            <option value="24">Semi-consciente</option>
                        </select>
                    </div>
                    <p class="guidelines" id="guide_1"><small>Tipo de síntoma que tiene el paciente</small></p> 
                </li>    

                <!-- Zona anatómica -->
                <li id="li_2">
                    <label class="description" for="element_2">Zona anatómica </label>
                    <div>
                        <select class="element select large" id="element_2" name="IDAnatomia"> 
                            <option value="0" selected="selected">Común</option>
                            <option value="3">Abdomen hombre</option>
                            <option value="4">Brazo derecho hombre delantera</option>
                            <option value="11">Brazo derecho hombre trasera</option>
                            <option value="5">Brazo izquierdo hombre delantera</option>
                            <option value="12">Brazo izquierdo hombre trasera</option>
                            <option value="1">Cara hombre</option>
                            <option value="8">Cabeza hombre trasera</option>
                            <option value="31">Cuello hombre</option>
                            <option value="9">Espalda hombre</option>
                            <option value="10">Glúteo hombre</option>
                            <option value="33">Hueco poplíteo derecho hombre</option>
                            <option value="34">Hueco poplíteo izquierdo hombre</option>
                            <option value="29">Ingle hombre</option>
                            <option value="6">Pierna derecha hombre delantera</option>
                            <option value="13">Pierna derecha hombre trasera</option>
                            <option value="7">Pierna izquierda hombre delantera</option>
                            <option value="14">Pierna izquierda hombre trasera</option>
                            <option value="2">Tórax hombre</option>
                            <option value="0">----------------------------------------------------</option>
                            <option value="17">Abdomen mujer</option>
                            <option value="18">Brazo derecho mujer delantera</option>
                            <option value="25">Brazo derecho mujer trasera</option>
                            <option value="19">Brazo izquierdo mujer delantera</option>
                            <option value="26">Brazo izquierdo mujer trasera</option>
                            <option value="15">Cara mujer</option>
                            <option value="22">Cabeza mujer trasera</option>
                            <option value="32">Cuello mujer</option>
                            <option value="23">Espalda mujer</option>
                            <option value="24">Glúteo mujer</option>
                            <option value="35">Hueco poplíteo derecho mujer</option>
                            <option value="36">Hueco poplíteo izquierdo mujer</option>
                            <option value="30">Ingle mujer</option>
                            <option value="20">Pierna derecha mujer delantera</option>
                            <option value="27">Pierna derecha mujer trasera</option>
                            <option value="21">Pierna izquierda mujer delantera</option>
                            <option value="28">Pierna izquierda mujer trasera</option>
                            <option value="16">Tórax mujer</option>
                        </select>
                    </div>
                    <p class="guidelines" id="guide_2"><small>Diferencia entre hombre y mujer</small></p> 
                </li>    

                <!-- Causa -->
                <li id="li_3">
                    <label class="description" for="element_3">Causa </label>
                    <div>
                        <select class="element select large" id="element_3" name="IDCausa"> 
                            <option value="5" selected="selected">Desconocida</option>
                            <option value="3">Caída</option>
                            <option value="1">Cornada</option>
                            <option value="4">Montón</option>
                            <option value="2">Pisotón</option>
                        </select>
                    </div> 
                    <!-- ID de incidencia oculto -->
                    <input type="hidden" name="IDIncidencia" value="<?php echo htmlspecialchars($IDIncidencia); ?>" />
                </li>
      
                <!-- Botón de envío -->
                <li class="buttons">
                    <input type="hidden" name="form_id" value="444764" />
                    <input id="saveForm" class="button_text" type="submit" name="submit" value="Enviar" />
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
