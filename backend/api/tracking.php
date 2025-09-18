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

    $stmt = $con->prepare("UPDATE incidencias SET IDTracking=:idtracking,timeend=null WHERE IDIncidencia=:idincidencia;INSERT INTO eventosincidencia (IDIncidencia,IDTracking,fechaHora) VALUES (:idincidencia,:idtracking,now());");
    $stmt->bindParam('idincidencia', $_POST['idincidencia']);    
    $stmt->bindParam('idtracking', $_POST['idtracking']);
    if($stmt->execute()){
		$info["status"]="Estado actualizado";   
    } else {
        $info["status"]=$stmt->errorInfo()[2];
        http_response_code(409);
    }
    echo json_encode($info);  
}
