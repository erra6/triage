<?php
/**
* Panel control encierro
*
* @package front
* @version 1.3.0.1
* @author jonlegarrea@gmail.com
* copyright Jon Legarrea
*
**/
$host="localhost"; // Host name
$username="triage"; // Mysql username
$password="Stro4pass."; // Mysql password
$db_name="triage"; // Database name
$tbl_name="usuarios"; // Table name

// Connect to server and select databse.
mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

// username and password sent from form
$myusername=$_POST['username'];
$mypassword=$_POST['password'];

// To protect MySQL injection (more detail about MySQL injection)
$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);
$myusername = mysql_real_escape_string($myusername);
$mypassword = mysql_real_escape_string($mypassword);

$mypassword = md5($mypassword);

$sql="SELECT * FROM $tbl_name WHERE usuario='$myusername' and contra='$mypassword'";
$result=mysql_query($sql);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
// If result matched $myusername and $mypassword, table row must be 1 row

if($count==1){
// Register $myusername, $mypassword and redirect to file "login_success.php"
    session_start();
    $_SESSION['usuario']=$myusername;
    
    while($row=mysql_fetch_array($result)){
        $_SESSION['grupo']=$row['grupo'];
    }
    if($_SESSION['grupo']=='editar'){  
        header("location:../editar.php");        
    }
    if($_SESSION['grupo']=='ver'){  
        header("location:../ver.php");        
    }
    if($_SESSION['grupo']=='admin'){  
        header("location:../ges.php");        
    }
    if($_SESSION['grupo']=='sanitario'){  
        header("location:../sanitario.php");        
    }
}
else {
    header("location:../index.php");    
}
?>
