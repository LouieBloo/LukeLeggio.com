<!DOCTYPE html>
<html>
	<head>
    	<meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="CSS/Login.css">
        
        <script src="JS/jquery-1.12.0.min.js"></script>
       	<script src="JS/Interaction.js"></script>
       	<script src="JS/LoginPage.js"></script>
       	
        
        <title>Banking</title>
        
    </head>

<?php
	
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
				
				$name = mysql_escape_string($_POST['user']);
				$pass = mysql_escape_string($_POST['pass']);
				
				$sql = "SELECT * FROM Users WHERE Name='$name'";
				$result = $conn->query($sql);
				$rows = array();
				
				if ($result->num_rows > 0) {
			    
				    $r = $result->fetch_assoc();
					
					
					if(password_verify($pass, $r["Password"]))
					{
						session_start();
		
						$_SESSION['userName'] = $_POST['user'];
						//$_SESSION['userPassword'] = $_POST['pass'];
						$_SESSION["userID"] = $r["ID"];
						$canLogin = true;
					}
					else {
						?><script type='text/javascript'>$( document ).ready(function() {
							$('#LoginErrorMessage').html('Username Or Password is Incorrect');
						});
							</script>
						<?php
					}
					
				    	 
					
				} 
				else {
				    $canLogin = false;
					
				}
				
				$conn->close();
				
					
		}

if($canLogin)
{	
        include("secure.php");
		
}
else
{
    if(isset($_POST))
    {?>
    	
    		<div id="NewUserDiv">
    			<button id="NewUserSelectButton">New user</button> 
            
	            <div id="createPasswordForm" style="display: none;">	
		            <form id="addNewUserForm" method="GET">
		            <span>User Name:</span> <input type="text" name="name"></input><br/>
		            <span>Password:</span> <input type="password" name="pass"></input><br/>
		            <div id="loginButton"><input type="submit" name="submit" value="Create"></input></div>
		            </form>
	            </div>
	        </div>
			
			<div id="MainLogo"><img src="Pictures/Drawing.png" /></div>			
			
			<div id="loginForm">
				
					
	            <form method="POST" action="index.php">
	            <span>User Name:</span> <input type="text" name="user"></input><br/>
	            <span>Password:</span> <input type="password" name="pass"></input><br/>
	            <div id="loginButton"><input type="submit" name="submit" value="Login"></input></div>
	            
	            </form>
            </div>
            
            <p id="IntroText">This application is still in development! Layout, buttons, functions and features are all
            	 subject to change at anytime and data may be lost. For your privacy and security, passwords and financial
            	 information is hashed or encrypted. I CANNO'T see your balances or passwords - Luke
            </p>
            
            <p id="LoginErrorMessage"></p>
            
            
    <?}
}
?>

</html>

