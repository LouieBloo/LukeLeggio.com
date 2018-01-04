<?php
ini_set('display_errors', '1');

		$servername = "localhost";
		$username = "lukelegg_admin";
		$password = "herewecomeagain5";
		$dbname = "lukelegg_Banking";
		
		// Create connection
		$conn = new mysqli($servername, $username, $password,$dbname);
		
		$name = mysql_escape_string($_POST["name"]);
		
		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}
		elseif("" == $name)
		{
			$output = array('Status' => "Fail",'Message' => "Can't add blank user");
			echo json_encode($output); 
		}
		else{
				$name = str_replace(" ", "", $_POST["name"]);
				$name = str_replace("'", "", $name);
				
				$password = mysql_escape_string($_POST["pass"]);
				$hash = password_hash($password, PASSWORD_DEFAULT);
				$value = encrypt("0");
				
				$sql = "INSERT INTO Users VALUES ('$name',null,'$hash','$value')";
				
				if ($conn->query($sql) === TRUE) {
				    $output =  array('Status' => "Success",'Message' => "Added new user '$name'");
					echo json_encode($output);
				} else {
				    echo "Error: " . $sql . "<br>" . $conn->error;
				}
				
				$conn->close();
					
		}


 function encrypt($text)
 {
 	$salt = "luke";
    return trim(base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $salt, $text, MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND))));
}

?> 
	