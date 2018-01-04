<?php

require("httpRequest.php");



if($_POST["request"] == "stateCheck")
{
	$req = new HttpRequest("http://71.193.0.67/isRoutineRunning", "GET");
	$req->headers["Connection"] = "close";
	$req->send() or die("Couldn't send!");
	
	
	echo($req->getResponseBody());
}
elseif($_POST["request"] == "startRoutine")
{

	$allSports = $_POST["sports"];
	$allScrapers = $_POST["scrapers"];	
	
	$finalUrl = "http://71.193.0.67/startRoutine-sports";
	
	foreach($allSports as $sport)
	{
		$finalUrl .= "-" . $sport;
	}
	
	$finalUrl .= "-scrapers";
	
	foreach($allScrapers as $scraper)
	{
		$finalUrl .= "-" . $scraper;
	}

	$req = new HttpRequest($finalUrl, "GET");
	$req->headers["Connection"] = "close";
	$req->send() or die("Couldn't send!");
	
	echo($req->getResponseBody());
}
elseif($_POST["request"] == "stopRoutine")
{
	$req = new HttpRequest("http://71.193.0.67/stopRoutine", "GET");
	$req->headers["Connection"] = "close";
	$req->send() or die("Couldn't send!");
	
	echo($req->getResponseBody());
}

//echo( $req->getResponseBody() );

?>