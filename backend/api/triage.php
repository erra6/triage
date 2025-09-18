<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header("Content-Type: application/json", true);
    header("Access-Control-Allow-Origin: *",true);
    $info = array();
    $info["status"]="FAIL";
    
    #require the configs
    require_once("../config/db.php");
    require_once("../classes/Database.php");
    $db = new Database();
    $con=$db->getDb();

	$IDcolor=$_POST['color'];
	switch($IDcolor)
	{
    		case 1:
    		case 2:
        		$puesto=1;
        		break;
    		case 3:
        		$puesto=3;
        		break;
        	case 0:
				$puesto=6;
				break;
        	case 4:
				$puesto=5;
				break;
	}
	
	$stmt = $con->prepare("select IDTracking from incidencias where IDIncidencia=:idincidencia limit 1;");
	$stmt->bindParam('idincidencia', $_POST['tartem']); 
    if($stmt->execute()){
		if($stmt->rowCount()==1){
			$result=$stmt->fetch(PDO::FETCH_ASSOC);
			$tracking=$result['IDTracking'];
		}else{
			$tracking=1;
		}
    } else {
        $info0["status"]=$stmt->errorInfo()[2];
        http_response_code(409);
    }
	
	$stmt = $con->prepare("INSERT INTO eventosincidencia (IDIncidencia,IDTracking,fechaHora) VALUES (:tartem,:tracking,now());");
	$stmt->bindParam('tartem', $_POST['tartem']); 
	$stmt->bindParam('tracking', $tracking);
    if($stmt->execute()){
		if($stmt->rowCount()==1){
			$info0["status"]="Nuevo tartem";
		}else{
			$info0["status"]="Tartem actualizado";
		}
    } else {
        $info0["status"]=$stmt->errorInfo()[2];
        http_response_code(409);
    }

#    $stmt = $con->prepare("REPLACE INTO incidencias (IDIncidencia,IDPuesto,IDcolor,IDTracking) VALUES (:tartem,:puesto,:color,:tracking);");
    $stmt = $con->prepare("INSERT INTO incidencias (IDIncidencia,IDPuesto,IDcolor,IDTracking) VALUES (:tartem,:puesto,:color,:tracking) ON DUPLICATE KEY UPDATE IDColor=:color, IDPuesto=:puesto;");
    $stmt->bindParam('tartem', $_POST['tartem']);    
    $stmt->bindParam('color', $_POST['color']);
    $stmt->bindParam('puesto', $puesto);
    $stmt->bindParam('tracking', $tracking);
    if($stmt->execute()){
		if($stmt->rowCount()==1){
			$info["status"]="Nuevo tartem";
		}else{
			$info["status"]="Tartem actualizado";
		}
        
    } else {
        $info["status"]=$stmt->errorInfo()[2];
        http_response_code(409);
    }
    echo json_encode($info);  
}
