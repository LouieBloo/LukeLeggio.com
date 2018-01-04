<?php



$servername = "localhost";
$username = "lukelegg_admin";
$password = "herewecomeagain5";
$dbname = "lukelegg_arbiter";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else{
	
	
	$homeTeam = mysql_escape_string($_POST["homeTeam"]);
	$awayTeam = mysql_escape_string($_POST["awayTeam"]);
	$gameTime = mysql_escape_string($_POST["gameTime"]);
	
	$homeTeamID = -1;
	$awayTeamID = -1;
	$sportID = -1;

	
	///Get home team id
	$sql = "SELECT id, sport FROM Team WHERE name LIKE '".$homeTeam."'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
			$homeTeamID =  $row["id"]; 
			$sportID = $row["sport"];
	    }
	} else {
	    die("failure " . $homeTeam);
	}
	///Get away team id
	$sql = "SELECT * FROM Team WHERE name LIKE '".$awayTeam."'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
	       $awayTeamID =  $row["id"];
			 
	    }
	} else {
	    die("failure " . $awayTeam);
	}
	
	
	
	
	
	
	
	$sql = "INSERT INTO Game VALUES (null,'$homeTeamID','$awayTeamID','$sportID','$gameTime')";
	if ($conn->query($sql) === TRUE) {
	    //echo "Game Added succesfully";
	} else {
	    die("Error: " . $sql . "<br>" . $conn->error);
	}
	
	$conn->close();	
	
	
	
	
	
	
}
















?>