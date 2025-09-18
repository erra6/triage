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
		
// Recibiendo las  variables  FLASH
	$puesto=$_POST['puesto'];  //  si deseas  hacer algun UPDATE
// conexiones  MySQL
// base de  datos seleccion

	$resultado = mysql_connect("localhost","triage","Stro4pass.") or die("no se pudo conectar al servidor");

	$db=mysql_select_db("triage",$resultado);	
	$query1 = "UPDATE puestos SET IDEstadoPuesto=2 WHERE IDPuesto=$puesto;";	
	$insercion1 = mysql_query($query1) or die (mysql_error());
	$query2 = "INSERT INTO eventospuesto (IDPuesto,IDEstadoPuesto,fechaHora) VALUES ($puesto,2,now());";	
	$insercion2 = mysql_query($query2) or die (mysql_error());
	//$idestadopuesto=mysql_insert_id();
	//echo "&idestadopuesto=".$idestadopuesto;
?> 
