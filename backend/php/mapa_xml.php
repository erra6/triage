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


    function parseToXML($htmlStr) 
    { 
        $xmlStr=str_replace('<','&lt;',$htmlStr); 
        $xmlStr=str_replace('>','&gt;',$xmlStr); 
        $xmlStr=str_replace('"','&quot;',$xmlStr); 
        $xmlStr=str_replace("'",'&#39;',$xmlStr); 
        $xmlStr=str_replace("&",'&amp;',$xmlStr); 
        return $xmlStr; 
    } 
    function causaTOnum($causa){
        if ($causa=='cornada') return 0;
        if ($causa=='pisoton') return 1;
        if ($causa=='caida') return 2;
        if ($causa=='contusion') return 3;
        if ($causa=='varias') return 4;
        else return 4;
    }
		
	$resultado = mysql_connect("localhost","triage","Stro4pass.") or die("no se pudo conectar al servidor");

	$db=mysql_select_db("triage",$resultado);
		
	$query = "SELECT causa.causa, incidencias.IDPuesto
              FROM lesiones
              LEFT JOIN causa ON lesiones.IDCausa = causa.IDCausa
              LEFT JOIN incidencias ON lesiones.IDIncidencia = incidencias.IDIncidencia
              WHERE incidencias.IDTracking <7" ;
		

	$result = mysql_query($query) or die (mysql_error());
	

    // Start XML file, create parent node
    


   $lesiones = array( 
               array(0,0,0,0,0),
               array(0,0,0,0,0),
               array(0,0,0,0,0),
               array(0,0,0,0,0),
               array(0,0,0,0,0),
               array(0,0,0,0,0),
               array(0,0,0,0,0),
               array(0,0,0,0,0)
             );
    $puestos = array("Santo Domingo","Mercado","Ayuntamiento","Mercaderes","Estafeta","Espoz y Mina", "Telefónica Norte", "Telefónica Sur");
    $coor= array(
                array(42.819817,-1.645879),
				array(42.818782,-1.644900),
                array(42.818164,-1.644098),
                array(42.81855,-1.64295),
                array(42.817456,-1.64207),
                array(42.816504,-1.641619),
                array(42.815887,-1.640891),
                array(42.815722, -1.640465)
             );
    while ($row = @mysql_fetch_assoc($result)){
        $lesiones[$row['IDPuesto']-1][causaTOnum($row['causa'])]=$lesiones[$row['IDPuesto']-1][causaTOnum($row['causa'])]+1;
    }
    header("Content-type: text/xml");
    echo '<markers>';
    for ($row = 0; $row < 8; $row++)
    {
    
      echo '<marker ';
      echo 'Puesto="' . $puestos[$row] . '" ';
      echo 'Cornadas="' . $lesiones[$row][0] . '" ';
      echo 'Pisotones="' . $lesiones[$row][1] . '" ';
      echo 'Caidas="' . $lesiones[$row][2] . '" ';
      echo 'Contusiones="' . $lesiones[$row][3] . '" ';
      echo 'Varias="' . $lesiones[$row][4] . '" ';
      echo 'lat="' . $coor[$row][0] . '" ';
      echo 'lng="' . $coor[$row][1] . '" ';
    //  echo 'type="' . $row['type'] . '" ';
      echo '/>';
    }


   // End XML file
    echo '</markers>';

/*santo domingo - @42.819817,-1.645879
ayuntamiento  - @42.818164,-1.644098
mercaderes - @42.81855,-1.64295
estafeta - @42.817456,-1.64207
espoz y mina -@42.816504,-1.641619
telefónica - @42.815819,-1.641083
plaza de toros -  @42.815835,-1.64016      */
    

?>

