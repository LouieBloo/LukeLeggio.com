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
				///Get home team id
				// $sql = "SELECT
							// Sport.name as SportName,
							// team1.name as HomeTeam,
							// Game.homeLine,
							// team2.name as AwayTeam,
							// Game.awayLine,
							// Game.dateCreated,
							// Scraper.name as Scraper,
							// Scrapes.id,
							// Scrapes.arbID
							// FROM Scrapes
							// INNER JOIN Team team1 ON Scrapes.homeTeam=team1.id INNER JOIN Team team2 ON Scrapes.awayTeam=team2.id INNER JOIN Sport ON team1.sport=Sport.id INNER JOIN Scraper ON Scrapes.scraper=Scraper.id
							// ORDER BY Game.dateCreated DESC
							// LIMIT 1000
				// ";
				$sql = "SELECT
							Sport.name as SportName,
							team1.name as HomeTeam,
							team2.name as AwayTeam,
							Game.gameTime,
							Game.id
							FROM Game
							INNER JOIN Team team1 ON Game.homeTeam=team1.id INNER JOIN Team team2 ON Game.awayTeam=team2.id INNER JOIN Sport ON team1.sport=Sport.id
							WHERE Game.gameTime between NOW() - interval 1 DAY AND NOW() + interval 2 DAY
							ORDER BY Game.gameTime DESC
							LIMIT 100
				";
				$result = $conn->query($sql);
				$games = array();
				if ($result->num_rows > 0) {
				    while($row = $result->fetch_assoc()) {
						//$homeTeamID =  $row["id"]; 
						//$sportID = $row["sport"];
						$games[] = $row;
				    }
				} else {
				    die(mysql_error());
				}
				
	
				
				//building all of the gameID's ill need for the scrapes
				$sqlOrQuery = "";
				foreach($games as $game)
				{
					$sqlOrQuery .= " OR Scrapes.gameID='".$game['id']."'";
				}
				
				$sql = "SELECT
							Scrapes.id as id,
							gameID,
							team1.name as HomeTeam,
							team2.name as AwayTeam,
							homeLine,
							awayLine,
							dateCreated,
							arbID,
							Scraper.name as scraper
							FROM Scrapes
							INNER JOIN Team team1 ON Scrapes.homeTeam=team1.id INNER JOIN Team team2 ON Scrapes.awayTeam=team2.id INNER JOIN Scraper ON Scraper.id=Scrapes.scraper
							WHERE Scrapes.gameID='0'  
							";
				
				$sql .= $sqlOrQuery;
				$sql .= " ORDER BY Scrapes.dateCreated DESC";
				//echo $sql;
				$result = $conn->query($sql);
				$allScrapes = array();
				if ($result->num_rows > 0) {
				    while($row = $result->fetch_assoc()) {
						//$homeTeamID =  $row["id"]; 
						//$sportID = $row["sport"];
						$allScrapes[] = $row;
				    }
				} else {
					$allScrapes[] = "none found";
				}
				
				
				
				
				
				
				
				$sql = "SELECT DISTINCT
							Arbitrage.id,
							profitPercent,
							gameOne,
							gameTwo,
							Scrapes.gameID
						FROM Arbitrage
						INNER JOIN Scrapes ON Scrapes.arbID=Arbitrage.id
				";
				$result = $conn->query($sql);
				$arbs = array();
				if ($result->num_rows > 0) {
				    while($row = $result->fetch_assoc()) {
						//$homeTeamID =  $row["id"]; 
						//$sportID = $row["sport"];
						$arbs[] = $row;
				    }
				} else {
				    $arbs[] = "failure 321";
				}
				
				
				//get Top Arbitrages
				$sql = "SELECT Arbitrage.id, Arbitrage.profitPercent, Scrapes.gameID FROM `Arbitrage`
						INNER JOIN Scrapes ON gameOne=Scrapes.id
						WHERE Scrapes.dateCreated between NOW() - interval 1 DAY AND NOW() + interval 1 DAY
						GROUP BY Arbitrage.profitPercent
						ORDER BY profitPercent DESC
						LIMIT 5
				";
				$result = $conn->query($sql);
				$topArbs = array();
				if ($result->num_rows > 0) {
				    while($row = $result->fetch_assoc()) {
						//$homeTeamID =  $row["id"]; 
						//$sportID = $row["sport"];
						$topArbs[] = $row;
				    }
				} else {
				    $topArbs[] = "failure 321";
				}
				
				//get recent Arbitrages
				$sql = "SELECT Arbitrage.id, Arbitrage.profitPercent, Scrapes.gameID, Scrapes.dateCreated FROM `Arbitrage`
						INNER JOIN Scrapes ON gameOne=Scrapes.id
						WHERE Scrapes.dateCreated between NOW() - interval 1 HOUR AND NOW()
						GROUP BY Arbitrage.profitPercent
						ORDER BY Scrapes.dateCreated DESC
						LIMIT 5
				";
				$result = $conn->query($sql);
				$recentArbs = array();
				if ($result->num_rows > 0) {
				    while($row = $result->fetch_assoc()) {
						//$homeTeamID =  $row["id"]; 
						//$sportID = $row["sport"];
						$recentArbs[] = $row;
				    }
				} else {
				    $recentArbs[] = "failure 321";
				}
				
				
				
				
				$conn->close();
				
				
				$finalArray = array(
					'games'		=> $games,
					'scrapes'	=> $allScrapes,
					'arbs'		=> $arbs,
					'topArbs'	=> $topArbs,
					'recentArbs'	=> $recentArbs
				);
		
				
				echo json_encode($finalArray,JSON_FORCE_OBJECT);
		}


?>