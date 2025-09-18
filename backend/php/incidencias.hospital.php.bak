<?php
// Normalizado por fix_all_includes.php (2025-09-18)
require_once __DIR__ . '/../config/path.php';
require_once CLASSES_PATH . '/Database.php';
require_once CONFIG_PATH   . '/db.php';
require_once INCLUDES_PATH . '/fconfig.php';










// … resto

	//session_start();
        //if(!(isset($_SESSION['usuario']))){
            //header("location:../index.php");
        //}
			
	$resultado = mysql_connect("localhost","triage","Stro4pass.") or die("no se pudo conectar al servidor");

	$db=mysql_select_db("triage",$resultado);
		
	//$query = "SELECT IDIncidencia,IDPuesto,IDPaciente,IDAmbulancia,IDHospital,IDTracking 	FROM incidencias WHERE IDTracking!=7";

    $query = "SELECT incidencias.IDIncidencia,incidencias.IDColor,incidencias.IDPuesto,lesiones.IDLesion,incidencias.IDAmbulancia,
              ambulancias.IndicativoSOS,organizaciones.organizacion,ambulancias.indicativoAmbulancia,tipoambulancia.tipoAmbulancia,
              incidencias.IDHospital,hospitales.hospital,incidencias.IDTracking,puestos.nombre,sexo.sexo,sintomatologia.sintoma,
              sintomatologia.IDsintoma,anatomia.anatomia,causa.causa,tramosedad.tramoEdad,situacion.situacion,incidencias.Pruebas,
              OCTET_LENGTH(photo) as photolength,incidencias.time,incidencias.timeend,sintomatologia.inicio
              FROM incidencias
              LEFT JOIN ambulancias ON incidencias.IDAmbulancia=ambulancias.IDAmbulancia 
              LEFT JOIN organizaciones ON ambulancias.IDOrganizacion=organizaciones.IDOrganizacion
              LEFT JOIN hospitales ON incidencias.IDHospital=hospitales.IDHospital
              LEFT JOIN lesiones ON incidencias.IDIncidencia=lesiones.IDIncidencia
LEFT JOIN tipoambulancia ON ambulancias.IDTipoAmbulancia=tipoambulancia.IDTipoAmbulancia
LEFT JOIN puestos ON incidencias.IDPuesto=puestos.IDPuesto
LEFT JOIN pacientes ON incidencias.IDPaciente=pacientes.IDPaciente
                LEFT JOIN sintomatologia ON lesiones.IDSintoma=sintomatologia.IDSintoma
                LEFT JOIN anatomia ON lesiones.IDAnatomia=anatomia.IDAnatomia
                LEFT JOIN causa ON lesiones.IDCausa=causa.IDCausa
 LEFT JOIN sexo ON incidencias.IDSexo=sexo.IDSexo
 LEFT JOIN tramosedad ON incidencias.IDEdad=tramosedad.IDEdad
LEFT JOIN situacion ON incidencias.IDSituacion=situacion.IDSituacion
              WHERE (incidencias.IDTracking <= 8) OR (incidencias.IDTracking = 10) ORDER BY incidencias.IDIncidencia ASC";


	if (!function_exists('recursive_utf8')) {
	  function recursive_utf8 ($data) {
		 if (!is_array($data)) {
			return utf8_encode($data);
		 }
		 $result = array();
		 foreach ($data as $index=>$item) {
			if (is_array($item)) {
			   $result[$index] = array();
			   foreach($item as $key=>$value) {
				  $result[$index][$key] = recursive_utf8($value);
			   }
			}
			else if (is_object($item)) {
			   $result[$index] = array();
			   foreach(get_object_vars($item) as $key=>$value) {
				  $result[$index][$key] = recursive_utf8($value);   
			   }
			} 
			else {
			   $result[$index] = recursive_utf8($item);
			}
		 }
		 return $result; 
	   }
	}

	$comprobacion = mysql_query($query) or die (mysql_error());
	while($row=mysql_fetch_array($comprobacion)){
        print json_encode(recursive_utf8($row));
	}
?>
