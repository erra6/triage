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

	$tartem=$_POST['tartem'];
	
	$stmt = $con->prepare("SELECT IDSintoma,IDAnatomia FROM `lesiones` where IDIncidencia=:tartem;");
	$stmt->bindParam('tartem', $tartem); 
    if($stmt->execute()){
        $info["status"]="OK";
    } else {
        $info["status"]=$stmt->errorInfo()[2];
        http_response_code(409);
    }
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));  

}
