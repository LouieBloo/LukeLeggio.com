<!doctype html>

<html lang="en">
<head>
  	<meta charset="utf-8">

  	<title>Arbiter</title>
  	<meta name="description" content="Arbiter">

	<script src="https://code.jquery.com/jquery-2.2.3.min.js" integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=" crossorigin="anonymous"></script>
 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
	
	<script src="js/ui.js"></script>
	<script src="js/main.js"></script>
	<script src="tablesorter-master/jquery.tablesorter.js"></script>
	
	<link rel="stylesheet" type="text/css" href="css/main.css">

	<!--<link rel="stylesheet" type="text/css" href="tablesorter-master/themes/blue/style.css">-->

</head>

<body>
	
	<div id="MainContent" class="container">
		
		<div class="row">
			<div class='col-sm-12'>
				<div class="panel panel-primary">
							
					<div class="panel-heading">Controls</div>
				 	<div class="panel-body">
						<div class="col-md-3">
							
							<div class="col-md-12">
									
								
								<div id="StatusBox" class="panel panel-info">
									
									<div id="StatusBoxTitle" class="panel-heading">Status: Checking...</div>
								 	<div class="panel-body">
								 		
								 		<div class="col-sm-6">
											<button type="button" class="btn btn-default" id="StartStopButton">Start</button>
										</div>
										
										
										<div class="col-sm-6">
											<button type="button" class="btn btn-warning" id="ToggleAutoRefresh">Auto Refresh: <span id="AutoRefreshTime">checking...</span></button>
											
										</div>
										
										
										
										
								 	</div><!--End of status box-->
								 	
								</div>
							</div>
						</div>	
							
						<div class="col-md-2">
							<div class="col-md-12">
								<div class="panel panel-info">
									
									<div class="panel-heading">Sports</div>
								 	<div class="panel-body">
								 		<form id="SportsCheckBoxes" role="form">
										    <div class="checkbox">
										      <label><input type="checkbox" value="NBA">NBA</label>
										    </div>
										    <div class="checkbox">
										      <label><input type="checkbox" value="MLB">MLB</label>
										    </div>
									  </form>
								 		
								 	</div>
								 	
								</div>
							</div>	
						</div>
								
						<div class="col-md-2">
							<div class="col-md-12">
													
								<div class="panel panel-info">
									
									<div class="panel-heading">Scrapers</div>
								 	<div class="panel-body">
								 		<form id="ScrapersCheckBoxes" role="form">
										    <div class="checkbox">
										      <label><input type="checkbox" value="SportsBook.ag">SportsBook.ag</label>
										    </div>
										    <div class="checkbox">
										      <label><input type="checkbox" value="BetDSI.eu">BetDSI.eu</label>
										    </div>
										    <div class="checkbox">
										      <label><input type="checkbox" value="RealBet.eu">RealBet.eu</label>
										    </div>
										    <div class="checkbox">
										      <label><input type="checkbox" value="MyBookie.ag">MyBookie.ag</label>
										    </div>
									  </form>
								 	</div>		 	
								</div>	
							</div>
						</div>
						
						<div class="col-md-5">
							<div class="col-md-12">
								<div class="panel panel-info">
									
									<div class="panel-heading">Recent Arbs</div>
								 	<div class="panel-body">
								 		
								 		<div class="col-md-8 shadow">
								 			<h4 style="margin-top:5px; margin-bottom:6px; text-align:center;">Recent Arbs (1 hour)</h4>
								 			<div id="RecentArbs">
								 				
								 			</div>
								 		</div>
								 		
								 		<div class="col-md-4 shadow">
								 			<h4 style="margin-top:5px; margin-bottom:6px; text-align:center;">Top Arbs Today</h4>
								 			<div id="TopArbs">
								 				
								 			</div>
								 		</div>
								 		
								 	</div>
								 	
								</div>
							</div>	
						</div>
						
						
					</div>
				</div>
			</div>
		</div>
		
		<div class="row">
			<div class='col-sm-12'>
				<div class="panel panel-primary">
							
					<div class="panel-heading">Database</div>
				 	<div class="panel-body">
				 		
				 		<!--View Controls-->
				 		<div class="row">
				 			<div class="col-sm-12">
				 				<button type="button" class="btn btn-warning" id="RefreshDatabaseButton">Refresh</button>
				 			</div>
				 		</div>
				 		
				 		
				 		<div class="row topBuffer">
							<div class="col-md-5 col-12-sm">
								
									<div class="panel panel-info">
										
										<div class="panel-heading">Games</div>
									 	<div class="panel-body" style="padding-top:0px;">
									 		
									 		<div class="row">	
												<div class="col-sm-12">
													<div class="row" id="DatabaseView">
													</div>
												</div>
											</div>
											
									 	</div>
									 </div>
							</div>
						
							<div class="col-md-7 col-12-sm leftAffix ScrollingFixed" data-spy="affix" data-offset-top="460">
								
									<div class="panel panel-info">
										
										<div class="panel-heading" style="padding-bottom: 0px;">
											
										 	<ul class="nav nav-tabs">
										  		<li class="active"><a data-toggle="tab" href="#gameTab">Game View</a></li>
										    	<li><a data-toggle="tab" href="#arbTab">Arb View</a></li>
										  	</ul>
										
										  		
										</div>
										
									 	<div class="panel-body" style="padding-top:0px;">
									 		
									 		<div class="row">
												<div class="tab-content">
											    	<div id="gameTab" class="tab-pane fade in active">
												      	<div class="row" id="GameDetailView">
														</div>
												    </div>
												    <div id="arbTab" class="tab-pane fade">
												    	<div class="row" id="ArbView">
														</div>	
												    </div>
												</div>
											</div>
									 	</div>
									 </div>
							</div><!--End right col -->
						</div>
						
						
					</div>
				</div>
			</div>
		</div>
	</div><!--Main Content-->
			
		

	
  
</body>


</html>




