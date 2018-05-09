<?php
	


	$query = $_POST['query'];
	

	$db = new PDO('mysql:host=localhost;', 'root', '');

	$dbData = $db->query($query)->fetchAll(PDO::FETCH_ASSOC);
	
	echo json_encode($dbData); 


?>