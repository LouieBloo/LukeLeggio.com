"use strict";

var statusAjax;
var statusAjaxTimer;
var serverState = "unknown";
var listOfSports = [];
var listOfScrapers = [];
var startStopButtonEnabled = true;

var rawDatabaseView = "";

var refreshRate = 600;
var autoRefreshFunction;
var autoRefreshTimer;

var autoRefreshTime = 0;

$(window).load(function() {
	
	$("#StartStopButton").click(startStopButtonClicked);
	$("#RefreshDatabaseButton").click(refreshDatabase);
	$("#ToggleAutoRefresh").click(toggleAutoRefresh);
	
	//checkBoxListening();
	
	startAutoRefresh(refreshRate);
	
});


function refreshDatabase()
{
	console.log("Refreshing Database View...")
	$.ajax({
		type: "post",
		data: {},
		url: "./getDatabaseView.php",
		success: function(data){
			
			//console.log(data);
			//console.log(JSON.parse(data));
			
			try{
				rawDatabaseView = jQuery.parseJSON(data);
				parseGameView(rawDatabaseView);
				parseTopArbs(rawDatabaseView);
				parseRecentArbs(rawDatabaseView);	
			}
			catch(e)
			{
				console.log(e + " | " + data);
			}
			
			//parseGameScrapes(rawDatabaseView);
			//parseArbView(rawDatabaseView);
			
			
		},
		fail: function(data){
				console.log("Failure");
		}
	});
}

function startAutoRefresh(refreshRateInSeconds)
{
	autoRefresh(refreshRateInSeconds);
}

function stopAutoRefresh()
{
	autoRefreshButtonColor("off");
	
	clearInterval(autoRefreshTimer);
	autoRefreshTimer = false;
}

function toggleAutoRefresh()
{
	if(autoRefreshTimer == false)
	{
		startAutoRefresh(refreshRate);
	}
	else
	{
		stopAutoRefresh();
	}
}


function autoRefresh(refreshRate)
{
	console.log("Auto Refresh Starting...");
	resetAllCheckboxes();
	
	var date = new Date();
	autoRefreshTime = date.getTime();
	
	autoRefreshButtonColor("on");
	checkServerStatus();
	refreshDatabase();
	
	autoRefreshTimer = setInterval(function(){
		var date2 = new Date();
		if(autoRefreshTime  < date2.getTime() - (refreshRate * 1000) )
		{
			autoRefresh(refreshRate);
		}
		else{
			$("#AutoRefreshTime").html(Math.ceil(refreshRate - ((date2.getTime() - autoRefreshTime)/1000)));	
		}	
	},1000);
}

function getSportsCheckmarks()
{
	listOfSports = [];
	$("#SportsCheckBoxes :checkbox").each(function(){
		
		if ($(this).is(":checked"))
		{
			listOfSports.push($(this).val());
			 // it is checked
		}
				
	});///
}

function getScrapersCheckmarks()
{
	listOfScrapers = [];
	$("#ScrapersCheckBoxes :checkbox").each(function(){
		
		if ($(this).is(":checked"))
		{
			listOfScrapers.push($(this).val());
			 // it is checked
		}
	});
	
	
}


function setSportsCheckmark(inputSport)
{
	$("#SportsCheckBoxes :checkbox").each(function(){
		
		if($(this).val() == inputSport)
		{
			$(this).prop("checked", true);
			return;
		}
				
	});
}

function setScrapersCheckmark(inputScraper)
{
	$("#ScrapersCheckBoxes :checkbox").each(function(){
		if($(this).val() == inputScraper)
		{
			$(this).prop("checked", true);
			return;
		}
				
	});
}

//////////////////////
////SERVER CONTROL////
//////////////////////
function checkServerStatus()
{
	console.log("Checking routine...");
	
	statusAjaxTimer = setTimeout(routineStatusFail, 8000);
	
	statusAjax = $.ajax({
		type: "post",
		data: {request: "stateCheck"},
		url: "./functions.php",
		success: function(data){
			
			clearTimeout(statusAjaxTimer);
			console.log("From server: " + data);
			
			var response = data.toString();
			response = response.replace(/\n|\r/g, ""); // get rid of newlines
			parseServerStatus(response);
			
			startStopButtonEnabled = true;
		},
		fail: function(data){
				console.log("Failure");
				startStopButtonEnabled = true;
		}
	});
	
}

function parseServerStatus(inputStatus)
{
	var splitStatus = inputStatus.split('-');
	
	splitStatus.forEach(function(str){
		
		
		if(str == "Routine Not Running")
		{
			serverState = "idle";
			toggleStatusBox("idle");
		}
		else if(str == "Routine Running")
		{
			serverState = "running";
			toggleStatusBox("running");
		}
		else
		{
			setSportsCheckmark(str);// try to set sports checkmark
			setScrapersCheckmark(str);
		}
		
	});
}

function routineStatusFail()
{
	console.log("Routine failed to respond or server is offline...");
	
	statusAjax.abort();
	serverState = "offline";
	toggleStatusBox("offline");
	
	startStopButtonEnabled = true;
}

function startStopButtonClicked()
{
	if(startStopButtonEnabled)
	{
		if(serverState == "unknown")
		{
			console.log("server state unknown...");
		}
		else if(serverState == "idle")
		{
			startStopButtonEnabled = false;
			getSportsCheckmarks();
			getScrapersCheckmarks();
			startRoutine();
		}
		else if(serverState == "running")
		{
			startStopButtonEnabled = false
			stopRoutine();
		}
	}
	else
	{
		console.log("Button busy...");
	}
}

function startRoutine()
{
	console.log("Starting routine...");
	
	var ajaxTimer = setTimeout(function(){
		console.log("StartRoutineFailed");
		routineAjax.abort();
		checkServerStatus();
		
	}, 8000);
	
	var routineAjax = $.ajax({
		type: "post",
		data: {request: "startRoutine",sports:listOfSports,scrapers:listOfScrapers},
		url: "./functions.php",
		success: function(data){
			
			clearTimeout(ajaxTimer);
			console.log("Success:");
			console.log(data);
			var response = data.toString();
			response = response.replace(/\n|\r/g, ""); // get rid of newlines
			
			if(response === "ok")
			{
				serverState = "running";
				toggleStatusBox("running");
			}
			else
			{
				console.log("StartRoutine didnt come back with ok");
			}
			startStopButtonEnabled = true;
		},
		fail: function(data){
				console.log("Failure");
				startStopButtonEnabled = true;
		}
	});
}

function stopRoutine()
{
	console.log("Stopping routine...");
	
	var ajaxTimer = setTimeout(function(){
		console.log("StopRoutineFailed");
		routineAjax.abort();
		checkServerStatus();
	}, 8000);
	
	var routineAjax = $.ajax({
		type: "post",
		data: {request: "stopRoutine"},
		url: "./functions.php",
		success: function(data){
			
			clearTimeout(ajaxTimer);
			console.log("Success:");
			
			var response = data.toString();
			response = response.replace(/\n|\r/g, ""); // get rid of newlines
			console.log(response);
			if(response === "ok")
			{
				serverState = "idle";
				toggleStatusBox("idle");
			}
			else
			{
				console.log("StopRoutine didnt come back with ok");
			}
			startStopButtonEnabled = true;
		},
		fail: function(data){
				console.log("Failure");
				startStopButtonEnabled = true;
		}
	});
}



