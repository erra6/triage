<?php
$host="localhost"; // Host name
$username="triage"; // Mysql username
$password="Stro4pass."; // Mysql password
$db_name="triage"; // Database name
$tbl_name="usuarios"; // Table name

// Connect to server and select databse.
mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

// username and password sent from form
$myusername=$_POST['usuario'];
$mypassword=$_POST['contrasena'];
$mygroup=$_POST['grupo'];

// To protect MySQL injection (more detail about MySQL injection)
$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);
$myusername = mysql_real_escape_string($myusername);
$mypassword = mysql_real_escape_string($mypassword);

$mypassword = md5($mypassword);


$sql="INSERT INTO $tbl_name (usuario,contra,grupo) VALUES ('$myusername','$mypassword','$mygroup')";


$result=mysql_query($sql) or die (mysql_error());;


header("location:usuario.php");

?>
