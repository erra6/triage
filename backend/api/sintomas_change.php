<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header("Content-Type: application/json", true);
    header("Access-Control-Allow-Origin: *",true);
    $info = array();
    $info["status"]="";
    
    
    #require the configs
    require_once("../config/db.php");
    require_once("../classes/Database.php");
    $db = new Database();
    $con=$db->getDb();

	$tartem=$_POST['tartem'];
	$anatomia=$_POST['anatomia'];
	$sintomas=json_decode(stripslashes($_POST['sintomas']));
	$num=0;	
	//add new sintomas
	foreach($sintomas as $sintoma){		
		//idsintoma
		$idsintoma=$sintoma[0];
		//idanatomia
		$idanatomia=$sintoma[1];		
		$stmt = $con->prepare("select * from lesiones where IDIncidencia=:tartem and IDSintoma=:idsintoma and IDAnatomia=:idanatomia;");
		$stmt->bindParam('tartem', $tartem);    
		$stmt->bindParam('idsintoma', $idsintoma);
		$stmt->bindParam('idanatomia', $idanatomia);
		 
		if($stmt->execute()){
			$result=$stmt->rowCount();
		} else {
			$info["status"]=$stmt->errorInfo()[2];
			http_response_code(409);
		}
		if ($result==0){			
			$stmt = $con->prepare("INSERT INTO lesiones (IDIncidencia,IDSintoma,IDAnatomia,IDCausa) VALUES (:tartem,:idsintoma,:idanatomia,6);");
			$stmt->bindParam('tartem', $tartem);    
			$stmt->bindParam('idsintoma', $idsintoma);
			$stmt->bindParam('idanatomia', $idanatomia);
			if($stmt->execute()){
				$num+=1;
			} else {
				$info["status"]=$stmt->errorInfo()[2];
				http_response_code(409);
			}
		}
	}
	if($num>0){
		if($anatomia!=20){
			if($anatomia!=21){
				$info["status"]=$num." sintomas añadidos ";
			}else{$info["status"]="edad actualizada";}
		}else{$info["status"]="sexo actualizado";}
	}
	
	//get existing sintomas
	$stmt = $con->prepare("select * from lesiones where IDIncidencia=:tartem and IDAnatomia=:anatomia;");
	$stmt->bindParam('tartem', $tartem);
	$stmt->bindParam('anatomia', $anatomia);
	
	//detect user unchecked sintomas
	if($stmt->execute()){
		$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$num=0;
		foreach($rows as $row){			
			foreach($sintomas as $sintoma){		
				//idsintoma
				$idsintoma=$sintoma[0];
				//idanatomia
				$idanatomia=$sintoma[1];				
				if (($row['IDSintoma']==$idsintoma) and ($row['IDAnatomia']==$idanatomia)){
					unset($rows[$num]);
				}
			}			
			$num+=1;			
		}
		$delerows=array_values($rows);	
	} else {
		$info["status"]=$stmt->errorInfo()[2];
		http_response_code(409);
	}
	
	//remove unchecked sintomas
	$numdel=0;
	foreach($delerows as $delrow){
		$stmt = $con->prepare("delete from lesiones where IDIncidencia=:tartem and IDAnatomia=:idanatomia and IDSintoma=:idsintoma;");
		$stmt->bindParam('tartem', $tartem);
		$stmt->bindParam('idsintoma', $delrow['IDSintoma']);
		$stmt->bindParam('idanatomia', $delrow['IDAnatomia']);
		if($stmt->execute()){
			$numdel+=1;
		} else {
			$info["status"]=$stmt->errorInfo()[2];
			http_response_code(409);
		}
	}
	if ($numdel>0){
		if($anatomia!=20){
			if($anatomia!=21){
				$info["status"].=" ".$numdel." sintomas eliminados";
			}
		}
	}
	
    echo json_encode($info);  
}
