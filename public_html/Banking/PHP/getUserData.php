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
			
			$sql = "SELECT * FROM Users WHERE ID='$userID'";
			
			$result = $conn->query($sql);
			
			
			
			if ($result->num_rows > 0) {
			    
			    //while($row = $result->fetch_assoc()) {
			    	$row = $result->fetch_assoc();
			    	
			        $totalAccountBalance = $row["Balance"];
			    //}
				
				echo decrypt($totalAccountBalance);
				
				
			} 
			else {
			    echo "0 results";
			}
			
			$conn->close();
	}
}
else
	{
		echo "not logged in";
	}
	
function decrypt($text)
{
 	$salt = "luke";
    return trim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $salt, base64_decode($text), MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND)));
}
?>