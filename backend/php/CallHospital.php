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
	$idincidencia=$_POST['idincidencia'];  //  si deseas  hacer algun UPDATE
	$idhospital=$_POST['idhospital'];  //  si deseas  hacer algun UPDATE
// conexiones  MySQL
// base de  datos seleccion

	$resultado = mysql_connect("localhost","triage","Stro4pass.") or die("no se pudo conectar al servidor");

    $db=mysql_select_db("triage",$resultado);	
    if($idhospital==-1){
        $query1 = "UPDATE incidencias SET IDHospital=NULL WHERE IDIncidencia=$idincidencia;";	
    }else{
        $query1 = "UPDATE incidencias SET IDHospital=$idhospital WHERE IDIncidencia=$idincidencia;";	
    }
	$insercion1 = mysql_query($query1) or die (mysql_error());
	//$query2 = "INSERT INTO eventosIncidencia (IDIncidencia,IDTracking,fechaHora) VALUES ($idincidencia,2,now());";	
	//$insercion2 = mysql_query($query2) or die (mysql_error());
	//$idestadopuesto=mysql_insert_id();
	//echo "&idestadopuesto=".$idestadopuesto;
?> 
