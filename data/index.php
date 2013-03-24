<?php

if(array_key_exists('access', $_GET)){

   $access = $_GET['access'];
	
	
	$filename = "$access.json";
	$data = file_get_contents($filename);// json string
   // normal JSON string
   header('Content-Type: application/json; charset=utf8');
	console.log("$access.json was accessed");
   echo $data;
	
}else{
   header('Content-Type: text/plain; charset=utf8');
   echo "Error loading data from server\n";
}
?>
