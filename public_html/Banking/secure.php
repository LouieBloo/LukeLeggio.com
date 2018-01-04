
<?php
	if (session_status() == PHP_SESSION_NONE)
	{
		echo "<script>window.location = 'http://www.lukeleggio.com/Banking/index.php'</script>";
	}
?>




	<head>
		<!--Font Links-->
        	<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
        	
        <!--CSS Links-->	
        	<link rel="stylesheet" type="text/css" href="CSS/Home.css">
        	
        <!--JS Links-->	
       		
       		<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
       		<script src="JS/Main.js"></script>
       		<script src="JS/canvasjs-1.8.0/canvasjs.min.js"></script>
       		
	</head>
    
    
    <body>
    	
    	<div id="TopText">
	    	<p id="UserName" class="GlobalFont">
	    		Hello <?php echo $_SESSION["userName"];?>! You have <span id="TotalBalance" class="GreenFont"></span>
	    	</p>
    	
    	</div>
    	
    	<p id='errorMessage'></p>
    	
    	<div id='Chart'>
	    	<div id="chartContainer" ></div>
	    </div>
    	
    	
	    <div id="BottomBar">		
			<!-- shit will get filled in here by JS-->
			<div id='AccountBalanceButtons'>
					
			</div>
			
	  	 </div>
	  	 
	  	 
		<div id="OptionsButtonDiv">
			<button id="OptionsButton" type="button">Edit Category</button>
	  	</div>
	  	 	
	  	<div id="CategoryInput">
	  		<ul id="CategoryInputList">
	  	 			
	  	 	</ul>
	  	</div>
    	
    	
    	<div class="GlobalFont" >
			<button id="AddCategoryButton" type="button">New Category</button>
			<form id="insertCategoryForm" method="post">
				Name: <input type="text" name="name"><br>
				Percent: <input type="text" name="percent" value="0"><br>
				Max Value: <input type="text" name="rawValue" value="0"><br>
				Priority: <input type="text" name="priority" value="0"><br>
				<span style="font-size:12px;">*If PERCENT is 0, the category will take as much money as it can until it reaches its MAX VALUE. If PERCENT
				is > 0, and MAX VALUE = 0, the category will take X PERCENT forever.</span>
				<br>
				<input type="submit" value="Add New Category">
			</form>
		</div>
    	
    	
    	<div class="GlobalFont">
			<button id="AddAccountButton" type="button">New Account</button>
			<form id="insertAccountForm" method="post">
				Name: <input type="text" name="name"><br>
				<input type="submit" value="Add New Account">
			</form>
		</div>
	  	 	
	  	<button id="RecalculateButton" type="button">Recalculate</button>
			<p id="RecalculateWarning">*NOTE* this button with RESET any progress you have on your categories. Use this only if
				you want your categories to recalculate with the total balance you have now. You can
				also use the EDIT CATEGORY button to manually adjust categories.</p>
    	
    	
    	
    </body>
    

