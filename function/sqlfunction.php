<?php 
include('config/conn.php');

function sql_query($q){
	global $conn;
	$result = $conn->query($q);
	return $result;
}
function sql_fetchassoc($q){
	global $conn;
	$result = $q->fetch_assoc();
	return $result;
}
?>
