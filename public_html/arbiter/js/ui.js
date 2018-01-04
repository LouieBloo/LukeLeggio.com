"use strict";
var hasScrapes = false;
var hasArb = false;
var gameData = [];
var arbData = [];
var lastGameIndex = "0";
var lastGameID = "0";

function toggleStatusBox(state)
{
	var statusBox = $("#StatusBox");
	var statusBoxTitle = $("#StatusBoxTitle");
	var statusButton = $("#StartStopButton");
	
	if(state == "running")
	{
		statusBox.removeClass("panel-default");
		statusBox.removeClass("panel-danger");
		statusBox.removeClass("panel-warning");
		statusBox.addClass("panel-success");
		statusBoxTitle.html("Status: Running");
		
		statusButton.removeClass("btn-success");
		statusButton.removeClass("btn-default");
		statusButton.addClass("btn-danger");
		statusButton.css("display", "block");
		statusButton.html("Stop");
	}
	else if(state == "offline")
	{
		statusBox.removeClass("panel-default");
		statusBox.removeClass("panel-success");
		statusBox.removeClass("panel-warning");
		statusBox.addClass("panel-danger");
		statusBoxTitle.html("Status: Offline - Contact Luke");
		
		statusButton.css("display", "none");
	}
	else if(state == "idle")
	{
		statusBox.removeClass("panel-default");
		statusBox.removeClass("panel-danger");
		statusBox.removeClass("panel-success");
		statusBox.addClass("panel-warning");
		statusBoxTitle.html("Status: Idle");
		
		statusButton.removeClass("btn-danger");
		statusButton.removeClass("btn-default");
		statusButton.addClass("btn-success");
		statusButton.css("display", "block");
		statusButton.html("Start");
	}
}

function parseGameView(inputJSON)
{

	var outputHTML = "";
	outputHTML += "<table class='DatabaseViewTable tablesorter' id='MainDatabaseView'>";
		
	outputHTML += "<thead><tr><th>Sport</th><th>Home Team</td><th>Away Team</th><th>Game Time</th><th>ID</th></tr></thead><tbody>";
	
	var tableHTML ="";
	
	gameData = [];
	arbData = [];
	
	jQuery.each(inputJSON["games"],function(index){
		
		gameData.push(parseGameScrapes(inputJSON,this.id))
		arbData.push(parseArbs(inputJSON,this.id));
		var gameClass = "";
		
		if(hasArb)
		{
			gameClass = "GreenBackground";	
		}
		else if(hasScrapes)
		{
			gameClass = "YellowBackground";
		}
		
		outputHTML += "<tr class='Game " + gameClass + "' id='" + this.id + "' index='" + index + "' >";
			
			outputHTML += "<td class='GameTD'>" + this.SportName + "</td>";
			outputHTML += "<td class='GameTD MediumFont Black'>" + this.HomeTeam + "</td>";
			outputHTML += "<td class='GameTD MediumFont Black'>" + this.AwayTeam + "</td>";
			outputHTML += "<td class='GameTD SmallFont Blue'>" + this.gameTime + "</td>";
			outputHTML += "<td class='GameTD SmallFont Blue'>" + this.id + "</td>";

			
		outputHTML += "</tr>";
	});
	
	outputHTML += "</tbody></table>";
	
	$("#DatabaseView").html(outputHTML);
	$("#MainDatabaseView").tablesorter();
	
	//setup listeners for the game clicks
	$(".Game").click(function(e){
		toggleGameView($(this).attr('index'),$(this).attr('id'));
	});
	//always toggle the game view to the last time so it updates.
	toggleGameView(lastGameIndex,lastGameID);
}

function parseGameScrapes(inputJSON,targetGameID)
{
	hasScrapes = false;
	hasArb = false;
	
	var outputHTML = "";
	outputHTML += "<table class='ScrapeViewTable tablesorter' id='" + targetGameID + "ScrapeView'>";
	outputHTML += "<thead><tr><th>Home Team</th><th>Line</th><th>Away Team</th><th>Line</th><th>Date Created</th><th>Scraper</th><th>Arb</th></tr></thead><tbody>";
	
	jQuery.each(inputJSON["scrapes"],function(){
		
		if(this.gameID == targetGameID)
		{
			outputHTML += "<tr class='' id='" + this.id + "'>";
			
				outputHTML += "<td>" + this.HomeTeam + "</td>";
				outputHTML += "<td>" + this.homeLine + "</td>";
				outputHTML += "<td>" + this.AwayTeam + "</td>";
				outputHTML += "<td>" + this.awayLine + "</td>";
				outputHTML += "<td>" + this.dateCreated + "</td>";
				outputHTML += "<td>" + this.scraper + "</td>";
				outputHTML += "<td>" + this.arbID + "</td>";
			
			outputHTML += "</tr>";
			
			hasScrapes = true;
			if(this.arbID > 0)
			{
				hasArb = true;
			}
			
		}
	});
	
	outputHTML += "</tbody></table>";
	
	return outputHTML;
}

function parseArbs(inputJSON,targetGameID)
{

	var outputHTML = "";
	outputHTML += "<table class='ScrapeViewTable tablesorter' id='" + targetGameID + "ArbView'>";
	outputHTML += "<thead><tr><th>ID</th><th>Profit %</td><th>Game 1</th><th>Game 2</th></tr></thead><tbody>";
	
	jQuery.each(inputJSON["arbs"],function(){
		
		if(this.gameID == targetGameID)
		{
			outputHTML += "<tr>";
		
				outputHTML += "<td>" + this.id + "</td>";
				outputHTML += "<td>" + this.profitPercent + "</td>";
				outputHTML += "<td>" + this.gameOne + "</td>";
				outputHTML += "<td>" + this.gameTwo + "</td>";
			
			outputHTML += "</tr>";

		}
	});
	
	outputHTML += "</tbody></table>";
	
	return outputHTML;
}

function parseTopArbs(inputJSON)
{
	var outputHTML = "";
	outputHTML += "<table class='ScrapeViewTable tablesorter' id='TopArbsTable'>";
	outputHTML += "<thead><tr><th>Profit %</td><th>ID</th><th>Game ID</th></tr></thead><tbody>";
	
	jQuery.each(inputJSON["topArbs"],function(){
			
		outputHTML += "<tr>";
	
			outputHTML += "<td>" + this.profitPercent + "</td>";
			outputHTML += "<td>" + this.id + "</td>";
			outputHTML += "<td>" + this.gameID + "</td>";
		
		outputHTML += "</tr>";
	});
	
	outputHTML += "</tbody></table>";
	
	$("#TopArbs").html(outputHTML);
	$("#TopArbsTable").tablesorter();
}

function parseRecentArbs(inputJSON)
{
	var outputHTML = "";
	outputHTML += "<table class='ScrapeViewTable tablesorter' id='RecentArbsTable'>";
	outputHTML += "<thead><tr><th>Profit %</td><th>ID</th><th>Game ID</th><th>Time</th></tr></thead><tbody>";
	
	jQuery.each(inputJSON["recentArbs"],function(){
			
		outputHTML += "<tr>";
	
			outputHTML += "<td>" + this.profitPercent + "</td>";
			outputHTML += "<td>" + this.id + "</td>";
			outputHTML += "<td>" + this.gameID + "</td>";
			outputHTML += "<td>" + this.dateCreated + "</td>";
		
		outputHTML += "</tr>";
	});
	
	outputHTML += "</tbody></table>";
	
	$("#RecentArbs").html(outputHTML);
	$("#RecentArbsTable").tablesorter();
}

function toggleGameView(gameIndex,gameID)
{
	lastGameIndex = gameIndex;
	lastGameID = gameID;
	
	$("#GameDetailView").html(gameData[gameIndex]);
	$("#ArbView").html(arbData[gameIndex]);
	$("#" + gameID + "ScrapeView").tablesorter();
	$("#" + gameID + "ArbView").tablesorter();
}



function parseArbView(inputJSON)
{
	var outputHTML = "<table class='ScrapeViewTable tablesorter' id='ArbDatabaseView'><thead><tr><th>ID</th><th>Profit %</td><th>Game 1</th><th>Game 2</th></tr></thead>";
	outputHTML += "<tbody>";
	
	jQuery.each(inputJSON["arbs"],function(){
		outputHTML += "<tr>";
		
		outputHTML += "<td>" + this.id + "</td>";
		outputHTML += "<td>" + this.profitPercent + "</td>";
		outputHTML += "<td>" + this.gameOne + "</td>";
		outputHTML += "<td>" + this.gameTwo + "</td>";
		
		outputHTML += "</tr>";
	});
	
	outputHTML += "</tbody></table>";
	
	$("#ArbView").html(outputHTML);
	$("#ArbDatabaseView").tablesorter();
}


function autoRefreshButtonColor(inputState)
{
	if(inputState == "on")
	{
		$("#ToggleAutoRefresh").removeClass("btn btn-warning");
		$("#ToggleAutoRefresh").addClass("btn btn-primary");
	}
	else if(inputState == "off")
	{
		$("#ToggleAutoRefresh").removeClass("btn btn-primary");
		$("#ToggleAutoRefresh").addClass("btn btn-warning");
		$("#AutoRefreshTime").html("PAUSED");
	}
}


function resetAllCheckboxes()
{
	$('input:checkbox').removeAttr('checked');
}
