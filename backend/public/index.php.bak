<?php
// Normalizado por fix_all_includes.php (2025-09-18)
require_once __DIR__ . '/../config/path.php';
require_once INCLUDES_PATH . '/gettext.php';
require_once CLASSES_PATH . '/Database.php';
require_once CONFIG_PATH   . '/db.php';
require_once CONFIG_PATH . '/fconfig.php';

// 1) Cargar rutas

// 2) Cargar config / clases



/**
* Panel control 
*
* @package front
* @version 3.0.1
* @author jonlegarrea@gmail.com
* copyright Jon Legarrea
*
**/
        session_start();
        if(isset($_SESSION['usuario'])){           
            if($_SESSION['grupo']=='editar'){  
            header("location:editar.php");        
            }
            if($_SESSION['grupo']=='ver'){  
                header("location:ver.php");        
            }            
            if($_SESSION['grupo']=='sanitario'){  
                header("location:sanitario.php");        
            }
            if($_SESSION['grupo']=='admin'){  
                header("location:ges.php");        
            }
        }

        if (file_exists('fconfig.php')) {
            
        }else{
            die('config file dont exits');
        }
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">



$locale=LOCALE;
if (isset($_POST["locale"])) {
  $locale = preg_replace("/[^a-zA-Z_]/", "", substr($_POST["locale"],0,10));
} else {
    if (isset($_SESSION["locale"])) {
      $locale = $_SESSION["locale"];
    }
}
foreach($langs as $code => $lang) {
  if($locale == $lang[0])
    $locale = $code;
}

$_SESSION['locale']=$locale;
T_setlocale(LC_ALL, $locale);

T_setlocale(LC_MESSAGES, $locale);
T_bindtextdomain("index", "./locale");
T_bind_textdomain_codeset("index", "UTF-8");
T_textdomain("index");



?>
<title> echo T_("Welcome")?></title>
<link rel="stylesheet" type="text/css" href="css/login.css">
</head>
<body>

    
<!--- <form id="login"> --->
<form id="login" name="form1" method="post" action="log/loglog.php">
    <h1> echo T_("LogIn")?></h1>
    <fieldset id="inputs">
        <input id="username" name="username" type="text" placeholder=" echo T_("Username")?>" autofocus required>   
        <input id="password" name="password" type="password" placeholder=" echo T_("Password")?>" required>
    </fieldset>
    <fieldset id="actions">
        <input type="submit" id="submit" value=" echo T_("Log in")?>">
        <!--- <a href=""> echo T_("Forgot your password?")?></a><a href=""> echo T_("Register")?></a> --->
    </fieldset>
</form>
</body>
</html>
