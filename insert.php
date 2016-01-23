<?php
	include('config/conn.php');
	include('function/sqlfunction.php');

	$data = $_POST;
	$dateNow = date("Y-m-d H:i:s");
	for($i=1; $i<=count($data);  $i++){
		$sql = sql_query("INSERT INTO tinggi VALUES ('124124', '$i', '$data[$i]', '$dateNow')");
	}
	return true;
?>