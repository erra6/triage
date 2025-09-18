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
	$ano=$_POST['ano'];  //  si deseas  hacer algun UPDATE
	$dia=$_POST['dia'];  //  si deseas  hacer algun UPDATE
// conexiones  MySQL
// base de  datos seleccion

	$resultado = mysql_connect("localhost","triage","Stro4pass.") or die("no se pudo conectar al servidor");

	$db=mysql_select_db("triage",$resultado);	
    
    $antes=$ano.'07'.$dia.'000000';
    $diadespues=str_pad($dia+1,2,"0",STR_PAD_LEFT);
    $despues=$ano.'07'.$diadespues.'000000';
   

 /*  $query= "  SELECT  eventosincidencia.fechaHora,tracking.tracking,puestos.nombre,incidencias.IDIncidencia,causa.causa,sintomatologia.sintoma,anatomia.anatomia, tramosedad.tramoEdad,ambulancias.IndicativoSOS, tipoambulancia.tipoAmbulancia,organizaciones.organizacion,hospitales.hospital
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
    LEFT JOIN eventosincidencia ON incidencias.IDIncidencia=eventosincidencia.IDIncidencia 
    LEFT JOIN tracking ON eventosincidencia.IDTracking=tracking.IDTracking
    LEFT JOIN puestos ON incidencias.IDPuesto=puestos.IDPuesto
    WHERE (incidencias.IDTracking = 7) AND (eventosincidencia.fechaHora >='$antes') AND (eventosincidencia.fechaHora <'$despues')";    */

    $query="SELECT eventosincidencia.fechaHora,tracking.tracking, eventosincidencia.IDIncidencia,puestos.nombre,        causa.causa,sintomatologia.sintoma,anatomia.anatomia,tramosedad.tramoEdad,ambulancias.IndicativoSOS, tipoambulancia.tipoAmbulancia,organizaciones.organizacion,hospitales.hospital
    FROM eventosincidencia
    LEFT JOIN tracking ON eventosincidencia.IDTracking=tracking.IDTracking
    LEFT JOIN incidencias ON eventosincidencia.IDIncidencia=incidencias.IDIncidencia
    LEFT JOIN puestos ON incidencias.IDPuesto=puestos.IDPuesto
    LEFT JOIN lesiones ON eventosincidencia.IDIncidencia=lesiones.IDIncidencia
    LEFT JOIN causa ON lesiones.IDCausa=causa.IDCausa
    LEFT JOIN sintomatologia ON lesiones.IDSintoma=sintomatologia.IDSintoma
    LEFT JOIN anatomia ON lesiones.IDAnatomia=anatomia.IDAnatomia
    LEFT JOIN pacientes ON incidencias.IDPaciente=pacientes.IDPaciente
    LEFT JOIN tramosedad ON pacientes.IDTramoEdad=tramosedad.IDTramoEdad
    LEFT JOIN ambulancias ON incidencias.IDAmbulancia=ambulancias.IDAmbulancia
    LEFT JOIN tipoambulancia ON ambulancias.IDTipoAmbulancia=tipoambulancia.IDTipoAmbulancia
    LEFT JOIN organizaciones ON ambulancias.IDOrganizacion=organizaciones.IDOrganizacion
    LEFT JOIN hospitales ON incidencias.IDHospital=hospitales.IDHospital
    WHERE (eventosincidencia.fechaHora >='$antes') AND (eventosincidencia.fechaHora <'$despues') 
    ORDER BY eventosincidencia.fechaHora";  

    $result = mysql_query($query) or die (mysql_error());

    print('<table border="3" >');

    print('<tr>');
    print('<td><b><big>Hora</big></b></td>');
    print('<td><b><big>Estado</big></b></td>');
    print('<td><b><big>Puesto</big></b></td>');
    print('<td><b><big>Nº</big></b></td>');
    print('<td><b><big>Causa</big></b></td>');
    print('<td><b><big>Sintoma</big></b></td>');
    print('<td><b><big>Lugar</big></b></td>');
    print('<td><b><big>Edad</big></b></td>');
    print('<td><b><big>Indicativo SOS</big></b></td>');
    print('<td><b><big>Tipo</big></b></td>');
    print('<td><b><big>Org.</big></b></td>');
    print('<td><b><big>Hospital</big></b></td>');            
    print('</tr>');
    print('<tr><td>&nbsp</td></tr>');      

            
	
    while ($row = @mysql_fetch_assoc($result)){
        
        $lugar=str_replace("hombre","",$row['anatomia']);
        $lugar=str_replace("mujer","",$lugar);
        $lugar=str_replace("delantera","",$lugar);
        $lugar=str_replace("trasera","",$lugar);   
        print('<tr>');
        print('<td>'.$row['fechaHora'].'</td>');
        print('<td>'.$row['tracking'].'</td>');
        print('<td>'.$row['nombre'].'</td>');
        print('<td>'.$row['IDIncidencia'].'</td>');
        print('<td>'.$row['causa'].'</td>');
        print('<td>'.$row['sintoma'].'</td>');
        print('<td>'.$lugar.'</td>');
        print('<td>'.$row['tramoEdad'].'</td>');
        print('<td>'.$row['IndicativoSOS'].'</td>');
        print('<td>'.$row['tipoAmbulancia'].'</td>');
        print('<td>'.$row['organizacion'].'</td>');
        print('<td>'.$row['hospital'].'</td>');            
        print('</tr>');
    }
    
    print('</table>');   
    
    
  
?> 
