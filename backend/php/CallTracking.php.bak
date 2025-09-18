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
	$idtracking=$_POST['idtracking'];  //  si deseas  hacer algun UPDATE


// conexiones  MySQL
// base de  datos seleccion

	$resultado = mysql_connect("localhost","triage","Stro4pass.") or die("no se pudo conectar al servidor");

	$db=mysql_select_db("triage",$resultado);
	if($idtracking==9){
		$idtracking="1";
		$query0 = "select IDTracking from eventosincidencia where IDIncidencia=$idincidencia order by fechahora desc limit 1,1";
		$insercion0 = mysql_query($query0) or die (mysql_error());
		$idtracking=mysql_result($insercion0,0,0);
	}
	if(($idtracking==5) or ($idtracking==10)){
		$querytime = "UPDATE incidencias SET IDTracking=$idtracking,timeend=now() WHERE IDIncidencia=$idincidencia and timeend is null;";
		$inserciontime = mysql_query($querytime) or die (mysql_error());
		$query1 = "UPDATE incidencias SET IDTracking=$idtracking WHERE IDIncidencia=$idincidencia;";
	}else{
		if(($idtracking==6) or ($idtracking==7)){
			$query1 = "UPDATE incidencias SET IDTracking=$idtracking WHERE IDIncidencia=$idincidencia;";
		}else{
			$query1 = "UPDATE incidencias SET IDTracking=$idtracking,timeend=null WHERE IDIncidencia=$idincidencia;";
		}
		
	}
	//$query1 = "UPDATE incidencias SET IDTracking=$idtracking WHERE IDIncidencia=$idincidencia;";
	$insercion1 = mysql_query($query1) or die (mysql_error());
	$query2 = "INSERT INTO eventosincidencia (IDIncidencia,IDTracking,fechaHora) VALUES ($idincidencia,$idtracking,now());";
	$insercion2 = mysql_query($query2) or die (mysql_error());
	//$idestadopuesto=mysql_insert_id();
	//echo "&idestadopuesto=".$idestadopuesto;
?> 
