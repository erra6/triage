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



    $stmt = $con->prepare("UPDATE incidencias SET photo=:photo where IDIncidencia=:tartem;");
    $stmt->bindParam('tartem', $_POST['tartem']);    
    $stmt->bindParam('photo', $_POST['photo'], PDO::PARAM_LOB);
    if($stmt->execute()){
		if($stmt->rowCount()==1){
			$info["status"]="Nueva foto";
		}else{
			$info["status"]="Foto actualizada";
		}
        
    } else {
        $info["status"]=$stmt->errorInfo()[2];
        http_response_code(409);
    }
    echo json_encode($info);  
}
