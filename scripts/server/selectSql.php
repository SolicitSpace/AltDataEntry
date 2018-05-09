<?php 
		// To avoid cross-origins error.
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');

	// Stores the db credentials.
	include('connection/connection.php');


	// database name.
	$dbName = $_POST['dbname'];

	// query to be executed.
	$query = $_POST['query']; 



	define('DB_DATABASE', $dbName);

	$dbconnection = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

     if ($dbconnection->connect_error) {
        die('Connect Error: ' . $mysqli->connect_error);
    }



	
	$result = $dbconnection->query($query);
	//create an array
    $rows = array();
	if ($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
	        $rows[]=array_map('utf8_encode', $row);
	    }
	    print json_encode($rows);
	}



/*[{"column_name":"id","column_type":"int(11)"},
	{"column_name":"client_name","column_type":"varchar(15)"},{"column_name":"coord_name","column_type":"varchar(15)"},{"column_name":"x_pos","column_type":"int(11)"},{"column_name":"y_pos","column_type":"int(11)"}] 
*/
?>


