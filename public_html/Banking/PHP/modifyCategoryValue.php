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
			$value = encrypt($_POST["value"]);
			
			$sql = "UPDATE Categories SET Value='$value' WHERE ID='$userID' AND Name='$name'";
			
			if ($conn->query($sql) === TRUE) {
			    echo "Updated Category successfully";
			} else {
			    echo "Error: " . $sql . "<br>" . $conn->error;
			}
			
			$conn->close();
	}
}
else
	{
		echo "not logged in";
	}
	
 function encrypt($text)
 {
 	$salt = "luke";
    return trim(base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $salt, $text, MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND))));
}
?>