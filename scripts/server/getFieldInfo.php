<?php
	
	// Get all these credentials from user.
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "hindware";

   // $conn = new mysqli($servername, $username, $password, $dbname);
   $conn = mysqli_connect($servername, $username, $password, $dbname);
   
   if (mysqli_connect_errno($conn)){
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
   }
   
   $sql = "SELECT id FROM coords_log";
   
   if ($result = mysqli_query($conn,$sql)){
      $fieldinfo = mysqli_fetch_fields($result);
      
      foreach ($fieldinfo as $val){
       
       	//
        json_encode($val);
      }
		
      mysqli_free_result($result);
   }
   mysqli_close($conn);
?>