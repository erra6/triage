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
		
	$query = "SELECT IDAmbulancia,IndicativoSOS
		FROM ambulancias 
		WHERE NOT EXISTS (
			SELECT incidencias.IDAmbulancia 
			FROM incidencias 
			WHERE incidencias.IDTracking < 7 AND ambulancias.IDAmbulancia=incidencias.IDAmbulancia) ORDER BY IndicativoSOS";

	$comprobacion = mysql_query($query) or die (mysql_error());
	
	
	while($row=mysql_fetch_array($comprobacion)){	        
        print json_encode($row);	      
	}

?>
