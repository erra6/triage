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
    $idincidencia=$_GET['idincidencia'];

	$resultado = mysql_connect("localhost","triage","Stro4pass.") or die("no se pudo conectar al servidor");

	$db=mysql_select_db("triage",$resultado);		
	

      $query = "SELECT pacientes.sexo,sintomatologia.sintoma,anatomia.anatomia,causa.causa,tramosedad.tramoEdad,ambulancias.IndicativoSOS,
                tipoambulancia.tipoAmbulancia,organizaciones.organizacion,hospitales.hospital,tracking.tracking,puestos.nombre,incidencias.IDIncidencia
                FROM lesiones
                LEFT JOIN incidencias ON lesiones.IDIncidencia=incidencias.IDIncidencia
                LEFT JOIN pacientes ON incidencias.IDPaciente=pacientes.IDPaciente
                LEFT JOIN sintomatologia ON lesiones.IDSintoma=sintomatologia.IDSintoma
                LEFT JOIN anatomia ON lesiones.IDAnatomia=anatomia.IDAnatomia
                LEFT JOIN causa ON lesiones.IDCausa=causa.IDCausa
                LEFT JOIN tramosedad ON pacientes.IDTramoEdad=tramosedad.IDTramoEdad
                LEFT JOIN ambulancias ON incidencias.IDAmbulancia=ambulancias.IDAmbulancia
                LEFT JOIN tipoambulancia ON ambulancias.IDTipoAmbulancia=tipoambulancia.IDTipoAmbulancia
                LEFT JOIN organizaciones ON ambulancias.IDOrganizacion=organizaciones.IDOrganizacion
                LEFT JOIN hospitales ON incidencias.IDHospital=hospitales.IDHospital
                LEFT JOIN tracking ON incidencias.IDTracking=tracking.IDTracking
                LEFT JOIN puestos ON incidencias.IDPuesto=puestos.IDPuesto
                WHERE (incidencias.IDTracking < 7 OR incidencias.IDTracking = 8) AND incidencias.IDHospital=1;"; //AND incidencias.IDIncidencia=$idincidencia;";

   
  
    $comprobacion = mysql_query($query) or die (mysql_error());
//	print("<html><head><meta http-equiv=\"content-type\" content=\"application/json; charset=iso-8859-1\" /></head><body>");
	while($row=mysql_fetch_array($comprobacion)){
		$row['sintoma']=utf8_decode($row['sintoma']);
        print json_encode($row);		
	}
//	print("</body></html>");
?>
