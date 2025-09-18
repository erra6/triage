<?php
// Normalizado por fix_all_includes.php (2025-09-18)
require_once __DIR__ . '/../config/path.php';
require_once CLASSES_PATH . '/Database.php';
require_once CONFIG_PATH   . '/db.php';
require_once INCLUDES_PATH . '/fconfig.php';










// … resto

//	$puesto=$_POST['puesto'];  //  si deseas  hacer algun UPDATE
	$lat=$_POST['lat'];
	$lon=$_POST['lon'];
	$speed=$_POST['speed'];
	$alt=$_POST['alt'];
	$time=$_POST['time'];
	$IDa=$_POST['IDa'];
	$urgencia=$_POST['urg'];
	$data=serialize($_POST);
	print("------------------------- Recibido\r\n");
	print(date("y/m/d H:i:s")." Servidor"."\r\n");
	print($time." GPS"."\r\n");
//	var_dump($_POST);
	print("Latitud: ".$lat."\r\n");
	print("Longitud: ".$lon."\r\n");
	print("Altitud: ".$alt."\r\n");
	print("Velocidad: ".$speed);
	$resultado = mysql_connect("localhost","triage","Stro4pass.") or die("no se pudo conectar al servidor");
	$db=mysql_select_db("triage",$resultado);
	$query2 = "INSERT INTO geo (IDAmbulancia,Lat,Lon,SystemTime,GpsTime,Urgencia,Altitud,Velocidad) VALUES ($IDa,$lat,$lon,now(),'$time','$urgencia',$alt,$speed);";	
	//print($query2);
	$insercion2 = mysql_query($query2) or die (mysql_error());
?> 
