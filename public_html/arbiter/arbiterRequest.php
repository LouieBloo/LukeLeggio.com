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
			
			if(isset($_GET["addNewGame"]))
			{
				
				if(!isset($_POST["homeTeam"]))
				{
					die("No Home Team");
				}
				if(!isset($_POST["awayTeam"]))
				{
					die("No away Team");
				}
				if(!isset($_POST["homeTeamLine"]))
				{
					die("No Home Team Line");
				}
				if(!isset($_POST["awayTeamLine"]))
				{
					die("No away Team line");
				}
				if(!isset($_POST["scraper"]))
				{
					die("No scraper");
				}
				if(!isset($_POST["date"]))
				{
					die("No date");
				}
		
				$homeTeam = mysql_escape_string($_POST["homeTeam"]);
				$awayTeam = mysql_escape_string($_POST["awayTeam"]);
				$homeTeamLine = mysql_escape_string($_POST["homeTeamLine"]);
				$awayTeamLine = mysql_escape_string($_POST["awayTeamLine"]);
				$scraper = mysql_escape_string($_POST["scraper"]);
				$estimatedDate = mysql_escape_string($_POST["date"]);
				
				$homeTeamID = -1;
				$awayTeamID = -1;
				$sportID = -1;
				$scraperID = -1;
				$gameID = -1;
				
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
				
				///Get scraper ID
				$sql = "SELECT * FROM Scraper WHERE name LIKE '".$scraper."'";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
				    while($row = $result->fetch_assoc()) {
				       $scraperID =  $row["id"];
						 
				    }
				} else {
				    die("failure " . $scraperID . "  " . $scraper);
				}
				
				
				//die("you are here!");
				$estimatedDate = new DateTime($estimatedDate);
				
				$iter = 0;
				while($iter < 3)
				{
					///Get game ID
					$sql = "SELECT * FROM Game WHERE homeTeam='$homeTeamID' AND awayTeam='$awayTeamID' AND gameTime between '".$estimatedDate->format('Y-m-d H:i:s')."' - interval 15 MINUTE AND '".$estimatedDate->format('Y-m-d H:i:s')."' + interval 15 MINUTE";
					$result = $conn->query($sql);
					if ($result->num_rows > 0) {
					    while($row = $result->fetch_assoc()) {
							$gameID =  $row["id"];
							$iter = 5000;
							break;
					    }
					} else {
					    //die("failure in selecting game ID");
					}
					
					//echo $estimatedDate;
					$estimatedDate->modify('+1 day');
					
					
					$iter++;
				}
				
				if($gameID < 1)
				{
					die("Couldn't Find game ID " . mysql_error());
				}
				
				$sql = "INSERT INTO Scrapes VALUES (null,'$gameID','$homeTeamID','$homeTeamLine','$awayTeamID','$awayTeamLine','$sportID',NOW(),-1,'$scraperID')";
				if ($conn->query($sql) === TRUE) {
				    //echo "Game Added succesfully";
				} else {
				    die("Error: " . $sql . "<br>" . $conn->error);
				}
				

				$conn->close();
			}
			elseif(isset($_GET["addNewArbitrage"]))
			{
				if(!isset($_POST["homeTeam1"]))
				{
					die("No Home Team");
				}
				if(!isset($_POST["awayTeam1"]))
				{
					die("No away Team");
				}
				if(!isset($_POST["homeTeam2"]))
				{
					die("No Home Team2");
				}
				if(!isset($_POST["awayTeam2"]))
				{
					die("No away Team2");
				}
				if(!isset($_POST["homeTeamLine1"]))
				{
					die("No Home Team Line");
				}
				if(!isset($_POST["awayTeamLine1"]))
				{
					die("No away Team line");
				}
				if(!isset($_POST["homeTeamLine2"]))
				{
					die("No Home Team Line2");
				}
				if(!isset($_POST["awayTeamLine2"]))
				{
					die("No away Team line2");
				}
				if(!isset($_POST["scraper1"]))
				{
					die("No scraper");
				}
				if(!isset($_POST["scraper2"]))
				{
					die("No scraper2");
				}
				if(!isset($_POST["date"]))
				{
					die("No date");
				}
				if(!isset($_POST["date2"]))
				{
					die("No date2");
				}
		
				$homeTeam = mysql_escape_string($_POST["homeTeam1"]);
				$awayTeam = mysql_escape_string($_POST["awayTeam1"]);
				$homeTeamLine = mysql_escape_string($_POST["homeTeamLine1"]);
				$awayTeamLine = mysql_escape_string($_POST["awayTeamLine1"]);
				$scraper = mysql_escape_string($_POST["scraper1"]);
				$estimatedDate = mysql_escape_string($_POST["date"]);
				
				$homeTeam2 = mysql_escape_string($_POST["homeTeam2"]);
				$awayTeam2 = mysql_escape_string($_POST["awayTeam2"]);
				$homeTeamLine2 = mysql_escape_string($_POST["homeTeamLine2"]);
				$awayTeamLine2 = mysql_escape_string($_POST["awayTeamLine2"]);
				$scraper2 = mysql_escape_string($_POST["scraper2"]);
				
				$homeTeamID = -1;
				$awayTeamID = -1;
				$sportID = -1;
				$scraperID = -1;
				
				$homeTeamID2 = -1;
				$awayTeamID2 = -1;
				$scraperID2 = -1;
				
				$gameID = -1;
				
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
				
				///Get scraper ID
				$sql = "SELECT * FROM Scraper WHERE name LIKE '".$scraper."'";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
				    while($row = $result->fetch_assoc()) {
				       $scraperID =  $row["id"];
						 
				    }
				} else {
				    die("failure " . $scraperID . "  " . $scraper);
				}
				
				
				/////////////////////
				///Get home team id//
				///GAME 2////////////
				$sql = "SELECT id, sport FROM Team WHERE name LIKE '".$homeTeam2."'";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
				    while($row = $result->fetch_assoc()) {
						$homeTeamID2 =  $row["id"]; 
				    }
				} else {
				    die("failure " . $homeTeam2);
				}
				///Get away team id
				$sql = "SELECT * FROM Team WHERE name LIKE '".$awayTeam2."'";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
				    while($row = $result->fetch_assoc()) {
				       $awayTeamID2 =  $row["id"];
						 
				    }
				} else {
				    die("failure " . $awayTeam2);
				}
				
				///Get scraper ID
				$sql = "SELECT * FROM Scraper WHERE name LIKE '".$scraper2."'";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
				    while($row = $result->fetch_assoc()) {
				       $scraperID2 =  $row["id"];
						 
				    }
				} else {
				    die("failure " . $scraperID2 . "  " . $scraper2);
				}
				
				
				$estimatedDate = new DateTime($estimatedDate);				
				$iter = 0;
				while($iter < 3)
				{
					///get game ID
					$sql = "SELECT * FROM Game WHERE homeTeam='$homeTeamID' AND awayTeam='$awayTeamID' AND gameTime between '".$estimatedDate->format('Y-m-d H:i:s')."' - interval 15 MINUTE AND '".$estimatedDate->format('Y-m-d H:i:s')."' + interval 15 MINUTE";
					$result = $conn->query($sql);
					if ($result->num_rows > 0) {
					    while($row = $result->fetch_assoc()) {
							$gameID =  $row["id"];
							$iter = 5000;
							break;
					    }
					} else {
					    //die("failure in selecting game ID");
					}
					
					//echo $estimatedDate;
					$estimatedDate->modify('+1 day');
					$iter++;
				}
				
				if($gameID < 1)
				{
					die("Couldn't Find game ID " . mysql_error());
				}
				
				//insert game 1		
				$sql = "INSERT INTO Scrapes VALUES (null,'$gameID','$homeTeamID','$homeTeamLine','$awayTeamID','$awayTeamLine','$sportID',NOW(),-1,'$scraperID')";
				if ($conn->query($sql) === TRUE) {
				    //echo "Game Added succesfully";
				} else {
				    die("Error: " . $sql . "<br>" . $conn->error);
				}
				$firstGameID =  $conn->insert_id;
				
				//insert game 2
				$sql = "INSERT INTO Scrapes VALUES (null,'$gameID','$homeTeamID2','$homeTeamLine2','$awayTeamID2','$awayTeamLine2','$sportID',NOW(),-1,'$scraperID2')";
				if ($conn->query($sql) === TRUE) {
				    //echo "Game Added succesfully";
				} else {
				    die("Error: " . $sql . "<br>" . $conn->error);
				}
				$secondGameID =  $conn->insert_id;
				
				
				//create new arbitrage
				$sql = "INSERT INTO Arbitrage VALUES (null,'".mysql_escape_string($_POST["percentMadeOnArb"])."','$firstGameID','$secondGameID')";
				if ($conn->query($sql) === TRUE) {
				    //echo "Arb Added succesfully";
				} else {
				    die("Error: " . $sql . "<br>" . $conn->error);
				}
				$arbID =  $conn->insert_id;
				
				$sql = "UPDATE Scrapes
						SET arbID='$arbID'
						WHERE Scrapes.id='$firstGameID' OR Scrapes.id='$secondGameID'";
				if ($conn->query($sql) === TRUE) {
				} else {
				    die("Error: " . $sql . "<br>" . $conn->error);
				}
				
				$conn->close();
			}
					
		}

?>