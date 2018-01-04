<?php
session_start();

if ($_SESSION["userName"])
{
	$servername = "localhost";
	$username = "lukelegg_admin";
	$password = "herewecomeagain5";
	$dbname = "lukelegg_Banking";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password,$dbname);
	
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	else{
			$name = mysql_escape_string($_POST["name"]);
			$userID = mysql_escape_string($_SESSION["userID"]);
			
			$sql = "UPDATE Categories SET Percent=" . $_POST["value"] . " WHERE Name='$name' AND ID='$userID'";
			
			if ($conn->query($sql) === TRUE) {
			    echo "Updated Category successfully";
			} else {
			    echo "Error: " . $sql . "<br>" . $conn->error;
			}
			
			$conn->close();
	}
}
else {
	echo "not logged in";
}
?>