<?php
        session_start();
        if(!(isset($_SESSION['usuario']))){
                header("location:../index.php");
        }
        if(!(isset($_SESSION['grupo']))){
                header("location:../index.php");
        }
        if($_SESSION['grupo']!=admin){
                header("location:../index.php");
        }
if (file_exists('../fconfig.php')) {
    require_once('../fconfig.php');
}else{
    die('config file dont exits');
}

$db = new Db();
#$noticias = new Noticias();

$host="localhost"; // Host name
$username="triage"; // Mysql username
$password="Stro4pass."; // Mysql password
$db_name="triage"; // Database name


function texists($tablename,$db_name) {

	$res = mysql_query("SELECT COUNT(*) AS count 
						FROM information_schema.tables 
						WHERE table_schema = '.$db_name.' 
						AND table_name = '$tablename'");

	return mysql_result($res, 0) == 1;

}



// Connect to server and select databse.
mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

// username and password sent from form
$myusername=$_POST['usuario'];
$mypassword=$_POST['contrasena'];
$myreboot=$_POST['reiniciar'];

// To protect MySQL injection (more detail about MySQL injection)
$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);
$myusername = mysql_real_escape_string($myusername);
$mypassword = mysql_real_escape_string($mypassword);

$mypassword = md5($mypassword);

$sql="SELECT * FROM usuarios WHERE usuario='$myusername' and contra='$mypassword'";
$result=mysql_query($sql);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
// If result matched $myusername and $mypassword, table row must be 1 row

if($count==1){
    while($row=mysql_fetch_array($result)){
        $_SESSION['grupo']=$row['grupo'];
    }
    if($_SESSION['grupo']=='admin'){  
        if($myreboot==0){
            //reiniciar estados
            $query1 = "UPDATE puestos SET IDEstadoPuesto=0;";            	
	        $insercion1 = mysql_query($query1) or die (mysql_error());
            header("location:../index.php");
        }
        if($myreboot==1){
            //reiniciar incidencias
/*            $query1 = "UPDATE incidencias SET IDTracking=9 WHERE IDTracking<7;";	
	        $insercion1 = mysql_query($query1) or die (mysql_error());
            $query1 = "UPDATE incidencias SET IDTracking=11 WHERE IDTracking=7;";	
	        $insercion1 = mysql_query($query1) or die (mysql_error());
            header("location:../index.php");*/
        //$day=date(YmdHis);
		$day='historico';
		
		$log->debug($day);

		
		$query1 = "SET FOREIGN_KEY_CHECKS = 0;"; 
		$log->debug($query1);           	
	    $insercion1 = mysql_query($query1) or die (mysql_error());

		//$hquery2='CREATE TABLE IF NOT EXISTS `'.$db_name.'`.`'.$day.'_eventosincidencia` LIKE eventosincidencia;';	
		//$log->debug($hquery2);
		//$insercion2 = mysql_query($hquery2) or die (mysql_error());
		
		//$query2='ALTER TABLE `'.$day.'_eventosincidencia` ADD `time` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL ;';			
		//$log->debug($query2);
		//$insercion2 = mysql_query($query2) or die (mysql_error());
		

		$query3='INSERT INTO `'.$db_name.'`.`'.$day.'_eventosincidencia`
		SELECT *
		FROM `'.$db_name.'`.`eventosincidencia` ;';
		$log->debug($query3);
	    $insercion3 = mysql_query($query3) or die (mysql_error());

		//$hquery4='CREATE TABLE IF NOT EXISTS `'.$db_name.'`.`'.$day.'_eventospuesto` LIKE eventospuesto;';
		//$log->debug($hquery4);
		//$insercion4 = mysql_query($hquery4) or die (mysql_error());
		
		//$query4='ALTER TABLE `'.$day.'_eventospuesto` ADD `time` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL ;';			
		//$log->debug($query4);
		//$insercion4 = mysql_query($query4) or die (mysql_error());
		

		$query5='INSERT INTO `'.$db_name.'`.`'.$day.'_eventospuesto`
		SELECT *
		FROM `'.$db_name.'`.`eventospuesto` ;';
		$log->debug($query5);
		$insercion5 = mysql_query($query5) or die (mysql_error());

		//$hquery6='CREATE TABLE IF NOT EXISTS `'.$db_name.'`.`'.$day.'_incidencias` LIKE incidencias;';		
		//$log->debug($hquery6);
		//$insercion6 = mysql_query($hquery6) or die (mysql_error());
		
		//$query6='ALTER TABLE `'.$day.'_incidencias` ADD `time` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL ;';			
		//$log->debug($query6);
		//$insercion6 = mysql_query($query6) or die (mysql_error());

		$query7='INSERT INTO `'.$db_name.'`.`'.$day.'_incidencias`
		SELECT * 
		FROM `'.$db_name.'`.`incidencias` ;';
		$log->debug($query7);
		$insercion7 = mysql_query($query7) or die (mysql_error());
		


		//$hquery8='CREATE TABLE IF NOT EXISTS `'.$db_name.'`.`'.$day.'_lesiones` LIKE lesiones;';	
		//$log->debug($hquery8);
		//$insercion8 = mysql_query($hquery8) or die (mysql_error());
		
		//$query8='ALTER TABLE `'.$day.'_lesiones` ADD `time` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL ;';			
		//$log->debug($query8);
		//$insercion8 = mysql_query($query8) or die (mysql_error());

		$query9='INSERT INTO `'.$db_name.'`.`'.$day.'_lesiones`
		SELECT * 
		FROM `'.$db_name.'`.`lesiones` ;';
		$log->debug($query9);
		$insercion9 = mysql_query($query9) or die (mysql_error());

		//$hquery10='CREATE TABLE IF NOT EXISTS `'.$db_name.'`.`'.$day.'_pacientes` LIKE pacientes;';		
		//$log->debug($hquery10);
		//$insercion10 = mysql_query($hquery10) or die (mysql_error());
		
		//$query10='ALTER TABLE `'.$day.'_pacientes` ADD `time` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL ;';			
		//$log->debug($query10);
		//$insercion10 = mysql_query($query10) or die (mysql_error());

		$query11='INSERT INTO `'.$db_name.'`.`'.$day.'_pacientes`		
		SELECT * 
		FROM `'.$db_name.'`.`pacientes` ;';

		$log->debug($query11);
		$insercion11 = mysql_query($query11) or die (mysql_error());

		$query12='TRUNCATE TABLE `eventospuesto` ;';

		$log->debug($query12);
		$insercion12 = mysql_query($query12) or die (mysql_error());

		$query13='TRUNCATE TABLE `eventosincidencia` ;';

		$log->debug($query13);
		$insercion13 = mysql_query($query13) or die (mysql_error());

		$query14='TRUNCATE TABLE `lesiones` ;';

		$log->debug($query14);
		$insercion14 = mysql_query($query14) or die (mysql_error());

		$query15='TRUNCATE TABLE `incidencias` ;';

		$log->debug($query15);
		$insercion15 = mysql_query($query15) or die (mysql_error());

		$query16='TRUNCATE TABLE `pacientes` ;';

		$log->debug($query16);
		$insercion16 = mysql_query($query16) or die (mysql_error());


		$query17 = "SET FOREIGN_KEY_CHECKS = 1;"; 
		$log->debug($query17);           	
	    $insercion17 = mysql_query($query17) or die (mysql_error());

        header("location:../index.php");

		}
    }else{
        header("location:reiniciar.php");
    }
}else{
    header("location:reiniciar.php");
}

?>
