<?php

    header("Content-Type: application/json", true);
    header("Access-Control-Allow-Origin: *",true);
    $info = array();
    $info["status"]="FAIL";
    $info["status2"]="FAIL";
    
    #require the configs
    require_once("../config/db.php");
    require_once("../classes/Database.php");
    $db = new Database();
    $con=$db->getDb();
    $stmt = $con->prepare("SELECT i.IDIncidencia,i.IDColor,i.IDTracking,a.IndicativoSOS as Ambulancia,a.IDOrganizacion,h.hospital as Hospital FROM incidencias i
left join ambulancias a on a.IDAmbulancia=i.IDAmbulancia
left join hospitales h on h.IDHospital=i.IDHospital;");
    if($stmt->execute()){
        $info["status"]="OK";
    } else {
        $info["status"]=$stmt->errorInfo()[2];
        http_response_code(409);
    }
    $tartemes=json_encode($stmt->fetchAll(PDO::FETCH_ASSOC)); 
    
    
    $stmt = $con->prepare("SELECT value,modified FROM `const` where name='tartemes';");
    if($stmt->execute()){
        $info["status"]="OK";
    } else {
        $info["status"]=$stmt->errorInfo()[2];
        http_response_code(409);
    }
    $guardados=$stmt->fetch(PDO::FETCH_ASSOC);
    $tartemes_guardados=$guardados["value"]; 
    
    if ($tartemes==$tartemes_guardados){
		echo json_encode($guardados["modified"]);
	}
	else{
		$stmt = $con->prepare("UPDATE const SET value=:tartemes,modified=now() where name='tartemes';");
		$stmt->bindParam('tartemes', $tartemes); 
		if($stmt->execute()){
			$info["status"]="OK";
		} else {
			$info["status"]=$stmt->errorInfo()[2];
			http_response_code(409);
		}
		echo $tartemes;
	}
    

