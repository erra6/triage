<?php
// Normalizado por fix_all_includes.php (2025-09-18)
require_once __DIR__ . '/../config/path.php';
require_once CLASSES_PATH . '/Database.php';
require_once CONFIG_PATH   . '/db.php';
require_once INCLUDES_PATH . '/fconfig.php';










// … resto

	session_start();
        if(!(isset($_SESSION['usuario']))){
            header("location:../index.php");
        }
			
	$resultado = mysql_connect("localhost","triage","Stro4pass.") or die("no se pudo conectar al servidor");

	$db=mysql_select_db("triage",$resultado);
		
	//$query = "SELECT IDIncidencia,IDPuesto,IDPaciente,IDAmbulancia,IDHospital,IDTracking 	FROM incidencias WHERE IDTracking!=7";

    $query = "SELECT incidencias.IDIncidencia,incidencias.IDPuesto,incidencias.IDColor,lesiones.IDLesion,incidencias.IDAmbulancia,
              ambulancias.IndicativoSOS,organizaciones.organizacion,ambulancias.indicativoAmbulancia,incidencias.IDHospital,hospitales.hospital,incidencias.IDTracking,incidencias.Pruebas,incidencias.time,incidencias.timeend  
              FROM incidencias 
              LEFT JOIN ambulancias ON incidencias.IDAmbulancia=ambulancias.IDAmbulancia 
              LEFT JOIN organizaciones ON ambulancias.IDOrganizacion=organizaciones.IDOrganizacion
              LEFT JOIN hospitales ON incidencias.IDHospital=hospitales.IDHospital
              LEFT JOIN lesiones ON incidencias.IDIncidencia=lesiones.IDIncidencia
              WHERE (incidencias.IDTracking <= 8) OR (incidencias.IDTracking = 10) ORDER BY incidencias.time ASC";



	//$query = "SELECT IDAmbulancia,IDTipoAmbulancia FROM ambulancias ORDER BY IDAmbulancia";

	$comprobacion = mysql_query($query) or die (mysql_error());
	$i=0;
	while($row=mysql_fetch_array($comprobacion)){
        print json_encode($row);
		/*print "&idincidencia".$i."=".$row['IDIncidencia'];
		print "&idpuesto".$i."=".$row['IDPuesto'];
		print "&idpaciente".$i."=".$row['IDPaciente'];
		print "&idambulancia".$i."=".$row['IDAmbulancia'];
		print "&idhospital".$i."=".$row['IDHospital'];
		print "&idtracking".$i."=".$row['IDTracking'];*/
		/*print "&idambulancia".$i."=".$row['IDAmbulancia'];
		print "&idtipoambulancia".$i."=".$row['IDTipoAmbulancia'];*/		
		$i=$i+1;
	}

?>
