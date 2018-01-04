
"use strict";

var totalBalance = 0;
var lastBalance = 0;
var currentBalance = 0;

var categoryData;
var categories = {};

var accountData = [];

var reCalculateCategories = false;

var nextColor;



$( document ).ready(function() {
	
	//modifyAccountBalance("Checking", 50);
	
	refreshEverything();
	
	
	$("#insertCategoryForm").submit(function(event){
		event.preventDefault();
		insertCategory();
	});
	
	$("#insertAccountForm").submit(function(event){
		event.preventDefault();
		insertAccount();
	}); 
	
	$("#RecalculateButton").click(function(event){
		
		recalculateButtonPressed();
	}); 
});

function refreshEverything()
{
	getAccountData();
}

function parseData()
{
	
	categories = [];
	modifyUserData(totalBalance);
	currentBalance = totalBalance;
	
	if(!reCalculateCategories && categoryData != null)
	{
		//initial setup when we have no changes from last time except maybe a new categorie
			
		var x = 0;
		while(x < categoryData.length)
		{
			
			var categorieTemp = new categorieObject();
			var name = categoryData[x].Name;
			var percent = parseFloat(categoryData[x].Percent);
			var rawValue = parseFloat(categoryData[x].RawValue);
			var value = parseFloat(categoryData[x].Value);
			
			categorieTemp.title = name;
			
			//Not Percent Based or new category
			if(percent == 0)
			{
				categorieTemp.value = subtractFromTotal(rawValue);
				
				categorieTemp.indexTitle =  "<span class='indexTitleHeader'>Balance:</span> <span class='indexTitleValue'>$" + categorieTemp.value.toFixed(2) + "/" + rawValue + "</span>";
				modifyCategoryValue(name,categorieTemp.value);
			}
			else if(isNaN(value))//new categorie, has to be percenet based
			{
				console.log("Found new Percent based categorie adding default value...");
				
				categorieTemp.indexTitle = "<span class='indexTitleHeader'>Percent: </span> <span class='indexTitleValue'>" + percent + "%</span>";
				categorieTemp.value = 0;
				modifyCategoryValue(name,categorieTemp.value);
			}
			else //not a new category but percent based
			{
				
				categorieTemp.value = subtractFromTotal(value);
				modifyCategoryValue(name,categorieTemp.value);
				categorieTemp.indexTitle = 
					"<span class='indexTitleHeader'>Balance: </span> <span class='indexTitleValue'>$" + categorieTemp.value.toFixed(2) + "</span></br>" + 
					"<span class='indexTitleHeader'>Percent: </span> <span class='indexTitleValue'>" + percent + "%</span>" ;
				
				if(rawValue > 0)
				{
					//change title and color to reflect bounded percent categorie
					categorieTemp.indexTitle = 
						"<span class='indexTitleHeader'>Balance: </span> <span class='indexTitleValue'>$" + categorieTemp.value.toFixed(2) + "/" + rawValue + "</span></br>" + 
						"<span class='indexTitleHeader'>Percent: </span> <span class='indexTitleValue'>" + percent + "%</span>" ;
					
					if(rawValue > categorieTemp.value)
					{
						nextColor = "#66ffcc";
					}
				}
			}
			
			
			categorieTemp.color = nextColor;
			categories.push(categorieTemp);
			
			x ++;
		}
	}
	else if(categoryData != null)
	{
		if(totalBalance < lastBalance)
		{
			//lost money //doesnt need own handling, handled above
			console.log("recalculating categories at a loss");
		}
		else
		{
			//gained money
			console.log("recalculating categories at a gain");
			
			
			var difference = totalBalance - lastBalance;
			
			var x = 0;
			while(x < categoryData.length)
			{
				var categorieTemp = new categorieObject();
				var name = categoryData[x].Name;
				var percent = parseFloat(categoryData[x].Percent);
				var rawValue = parseFloat(categoryData[x].RawValue);
				var value = parseFloat(categoryData[x].Value);
				
				categorieTemp.title = name;
				
				//Not Percent Based
				if(percent == 0)
				{
					categorieTemp.value = subtractFromTotal(rawValue);
					categorieTemp.indexTitle = "<span class='indexTitleHeader'>Balance:</span> <span class='indexTitleValue'>$" + categorieTemp.value.toFixed(2) + "/" + rawValue + "</span>";
				}
				else
				{
					
					
					var potentialIncrease = (percent /100) * difference;
					var increase = potentialIncrease + value;
					
					if(rawValue > 0 && (increase >= rawValue) )
					{
						//check if we reached the limit of the category
						increase = rawValue;
					}
					
					categorieTemp.value = subtractFromTotal(increase);
					
					categorieTemp.indexTitle = 
						"<span class='indexTitleHeader'>Balance: </span> <span class='indexTitleValue'>$" + categorieTemp.value.toFixed(2) + "</span></br>" + 
						"<span class='indexTitleHeader'>Percent: </span> <span class='indexTitleValue'>" + percent + "%</span>" ;
					
					if(rawValue > 0)
					{
						//change title and color to reflect bounded percent categorie
						categorieTemp.indexTitle = 
							"<span class='indexTitleHeader'>Balance: </span> <span class='indexTitleValue'>$" + categorieTemp.value.toFixed(2) + "/" + rawValue + "</span></br>" + 
							"<span class='indexTitleHeader'>Percent: </span> <span class='indexTitleValue'>" + percent + "%</span>" ;
						
						if(rawValue > categorieTemp.value)
						{
							nextColor = "#66ffcc";
						}
					}
					
					
				}
					
				modifyCategoryValue(categoryData[x].Name,categorieTemp.value);
			
				
				categorieTemp.color = nextColor;
				categories.push(categorieTemp);
				
				x++;
			}
		}	
	}
	
	createGraph();
	createCategoryButtons();
}

function subtractFromTotal(value)
{
		var potentialSubtraction = value;
		if(potentialSubtraction <= currentBalance)
		{
			currentBalance -= potentialSubtraction
			nextColor = "#0099ff";
			
		} 
		else
		{
			var difference = potentialSubtraction - currentBalance;
			potentialSubtraction -= difference;
			currentBalance -= potentialSubtraction;
			nextColor = "#999999";
			
	}
		
	return potentialSubtraction;
	
}

function getAccountData(){
	
	
	console.log("Getting Account Data...");
	
	accountData = [];
	
	$.ajax({
		type: "post",
		url: "PHP/getAccountData.php",
		success: function(data){
				
				
				var accData = JSON.parse(data);
				
				totalBalance = 0;
				
				var x = 0;
				while(x < accData.length)
				{
					
					var holder = new accountObject();
					
					holder.title = accData[x].Name;
					holder.value = accData[x].Amount;
					
					totalBalance += parseFloat(accData[x].Amount);
					
					accountData.push(holder);
					
					
					x++;
				}
				
				
				$("#TotalBalance").html("$" +totalBalance);
				getUserData();
				createAccountBalanceButtons();
				
	
		},
		fail: function(data){
				console.log(data,"red");
		}
	});
	
	
	
}

function getUserData()
{
	console.log("getting user data...");
	$.ajax({
		type: "post",
		url: "PHP/getUserData.php",
		success: function(data){
				console.log(data);
				var test = parseFloat(data);
				if(isNaN(test))
				{
					console.log(data);
				}
				else
				{
					
					lastBalance = test;
					//lastBalance = 0;
					
					console.log("last balance = " + lastBalance);
					console.log("total = " + totalBalance);
					
					if(lastBalance < totalBalance)
					{
						
						reCalculateCategories = true;
					}
					else
					{
						reCalculateCategories = false;
					}
					
					
					getCategoryData();
				}
			
			
		},
		fail: function(data){
				console.log(data);
		}
	});
}

function getCategoryData(){
	console.log("getting category data...");
	
	
	$.ajax({
		type: "post",
		url: "PHP/getCategoryData.php",
		success: function(data){
		
			categoryData = JSON.parse(data);
			
			
		
			//categoryData = data.split(" ");
			//categoryData = categoryData.splice(0,categoryData.length-1);
			parseData();
		},
		fail: function(data){
				console.log(data);
		}
	});
}

function insertCategory()
{
	console.log("inserting category");
	
	var data = $("#insertCategoryForm").serialize();
	$.ajax({
		data: data,
		type: "post",
		url: "PHP/addCategory.php",
		success: function(data){
			
				logMessage(data,"#0000ff" );
				refreshEverything();
			
		},
		fail: function(data){
				console.log(data);
		}
	});
	
}


function insertAccount()
{
	console.log("inserting account");
	
	var data = $("#insertAccountForm").serialize();
	$.ajax({
		data: data,
		type: "post",
		url: "PHP/addAccount.php",
		success: function(data){
			
				logMessage("insert account " + data,"#0000ff");
				refreshEverything();
			
		},
		fail: function(data){
				logMessage(data);
		}
	});
}



function modifyCategoryValue(nameIn, valueIn)
{
	console.log("modifying " + nameIn + " With value " + valueIn);
	
	var data = $("#modify").serialize();
	$.ajax({
		data: {name: nameIn, value: valueIn },
		type: "post",
		url: "PHP/modifyCategoryValue.php",
		success: function(data){
			
				console.log("modified categorie success");
			
			
		},
		fail: function(data){
				console.log(data);
		}
	});
}

function modifyCategoryValueWithRefresh(nameIn, valueIn)
{
	console.log("modifying w/reset " + nameIn + " With value " + valueIn);
	
	var data = $("#modify").serialize();
	$.ajax({
		data: {name: nameIn, value: valueIn },
		type: "post",
		url: "PHP/modifyCategoryValue.php",
		success: function(data){
			
				console.log("modified categorie success");
				refreshEverything();
			
		},
		fail: function(data){
				console.log(data);
		}
	});
}


function modifyUserData(valueIn)
{
	console.log("modifying UserData With value " + valueIn);
	
	
	$.ajax({
		data: {value: valueIn },
		type: "post",
		url: "PHP/editUserData.php",
		success: function(data){
			
				console.log("modified userData success");
			
			
		},
		fail: function(data){
				console.log(data);
		}
	});
}

function modifyAccountBalance(accountName, newValue)
{
	
	console.log("modifying " + accountName + " With value " + newValue);
	
	//var data = $("#modify").serialize();
	$.ajax({
		data: {name: accountName, value: newValue },
		type: "post",
		url: "PHP/modifyAccountValue.php",
		success: function(data){
			
				//console.log("modified account Balance success");
				console.log(data);
				refreshEverything();
			
		},
		fail: function(data){
				console.log(data);
		}
	});
}

function modifyCategoryRawValue(categoryName, newValue)
{
	
	console.log("modifying " + categoryName + " With Rawvalue " + newValue);
	
	//var data = $("#modify").serialize();
	$.ajax({
		data: {name: categoryName, value: newValue },
		type: "post",
		url: "PHP/modifyCategoryRawValue.php",
		success: function(data){
				console.log(data);
				console.log("modified category value success");
				refreshEverything();
			
		},
		fail: function(data){
				console.log(data);
		}
	});
}

function modifyCategoryPercent(categoryName, newValue)
{
	
	console.log("modifying " + categoryName + " With Percent " + newValue);
	
	//var data = $("#modify").serialize();
	$.ajax({
		data: {name: categoryName, value: newValue },
		type: "post",
		url: "PHP/modifyCategoryPercent.php",
		success: function(data){
			
				console.log("modified category percent success");
				refreshEverything();
			
		},
		fail: function(data){
				console.log(data);
		}
	});
}

function modifyCategoryPriority(categoryName, newValue)
{
	
	console.log("modifying " + categoryName + " With Priority " + newValue);
	
	//var data = $("#modify").serialize();
	$.ajax({
		data: {name: categoryName, value: newValue },
		type: "post",
		url: "PHP/modifyCategoryPriority.php",
		success: function(data){
			
				console.log("modified category value success");
				refreshEverything();
			
		},
		fail: function(data){
				console.log(data);
		}
	});
}


function deleteCategory(nameIn)
{
	console.log("Deleting Category - " + nameIn);
	
	$.ajax({
		data: {name: nameIn},
		type: "post",
		url: "PHP/deleteCategory.php",
		success: function(data){
			
				logMessage(data,"#0000fff");
				refreshEverything();
			
		},
		fail: function(data){
				console.log(data);
		}
	});
}

function createGraph()
{
	console.log("creating graph");
	
	
	var chart = new CanvasJS.Chart("chartContainer");
	 
	chart.options.axisY = { prefix: "$"};
	chart.options.title = { text: "" };
	
	
	var series1 = { //dataSeries - first quarter
        type: "column"
    };
	
	chart.options.data = [];
    chart.options.data.push(series1);
	series1.dataPoints = [];
	
	var x = 0;
	
	while(x < categories.length)
	{
		
		
		series1.dataPoints.push({ 
			
			label: categories[x].title,
			y: parseFloat(categories[x].value),
			color: categories[x].color,
			//indexLabel: categories[x].indexTitle,
			toolTipContent: categories[x].indexTitle
			 
		});
		
		x+= 1;
	}
	
	series1.dataPoints.push({ label: "Remainder", y: currentBalance, color:"#00ff00" });
	
	chart.render();
	
}


function createAccountBalanceButtons()
{
	console.log("creating account balance buttons");
	
	var html = "";
	$("#AccountBalanceButtons").html("");
	
	var x = 0;
	while(x < accountData.length)
	{
		
		var title = accountData[x].title;
		var value = accountData[x].value;
		
		
		html = "";
		
		html += "<div class='AccountBalanceButton GlobalFont'><p>";
		html += "Enter Total Value for " + title + " Account";
		html += "</p>";
		
		
		
		html += "<form method='post' id='" + title + "'>";
		html += "<input type='text' name='value' value='" + value + "'>";
		html += "<input type='submit' value='Set Account Balance'>";
		html += "</form>"
		html += "</div>";
		
		$("#AccountBalanceButtons").append(html);
		$("#" + title).submit(function(event){
			
			event.preventDefault();
			modifyAccountBalance(event.target.id,$("#" + event.target.id + " input").val());
		}); 
		
		x++;
	}
	
	
	
}


function createCategoryButtons()
{
	var x = 0;
	var categoryInsertPlace = $("#CategoryInputList");
	categoryInsertPlace.html("");
	
	var html = "";
	
	while(categoryData != null && x < categoryData.length)
	{
		
		var name = categoryData[x].Name;
		var salt = "_-_-_-_";
		var percentBased = true;
		
		if( parseFloat(categoryData[x].Percent) <= 0)
		{
			percentBased = false;
		}
		
		html = "<li class='CategoryButtons'>";
			
			html += "<p>" + name + "</p>";
						
			if(percentBased)
			{
				html += "<form method='post' id='" + name + salt +"form'>";
					html += "<input type='text' name='categoryValue' value='" + categories[x].value +"'>";
					html += "<input type='submit' value='Set Current Value'>";
				html += "</form>";
				
				html += "<form method='post' id='" + name + salt +"form2'>";
					html += "<input type='text' name='categoryValue' value='" + categoryData[x].Percent +"'>";
					html += "<input type='submit' value='Set Percent'>";
				html += "</form>";
			}
				
			html += "<form method='post' id='" + name + salt +"form3'>";
				html += "<input type='text' name='categoryValue' value='" + categoryData[x].RawValue +"'>";
				html += "<input type='submit' value='Set Max Value'>";
			html += "</form>";
			
			
			html += "<form method='post' id='" + name + salt + "form4'>";
				html += "<input type='text' name='categoryValue' value='" + categoryData[x].Priority +"'>";
				html += "<input type='submit' value='Set Priority'>";
			html += "</form>";
			
			html += "<button type='button' id='" + name + salt +"button'>Delete</button>";
			
		html += "</li>";
		
	
		categoryInsertPlace.append(html);
	
		//add the form and button handlers
		if(percentBased)
		{
			$("#" + name + salt + "form").submit(function(event){
				
				event.preventDefault();
				
				var name = event.target.id;
				name = name.replace("_-_-_-_form","");
				
				modifyCategoryValueWithRefresh(name,$("#" + event.target.id + " input").val());
			}); 
			
			$("#" + name + salt + "form2").submit(function(event){
				
				event.preventDefault();
				
				var name = event.target.id;
				name = name.replace("_-_-_-_form2","");
				
				modifyCategoryPercent(name,$("#" + event.target.id + " input").val());
			}); 
		}
		
		//Always set the rawValue function
		$("#" + name + salt + "form3").submit(function(event){
				
			event.preventDefault();
				
			var name = event.target.id;
			name = name.replace("_-_-_-_form3","");
				
			modifyCategoryRawValue(name,$("#" + event.target.id + " input").val());
				
		}); 
		
		//Always set the Priority function
		$("#" + name + salt + "form4").submit(function(event){
				
			event.preventDefault();
				
			var name = event.target.id;
			name = name.replace("_-_-_-_form4","");
				
			modifyCategoryPriority(name,$("#" + event.target.id + " input").val());
				
		}); 
	
		//Always add delete button handler
		$("#" + name + salt + "button").click(function(event){
			
			event.preventDefault();
			
			var name = event.target.id;
			name = name.replace("_-_-_-_button","");
			
			deleteCategory(name);
		}); 
		
		
		
		
		x++;
	}
	
	
}


function recalculateButtonPressed()
{
	modifyUserData(0);
	//refreshEverything();
	console.log("Recalculating Categories...");
	
	$.ajax({
		type: "post",
		url: "PHP/resetCategoryValues.php",
		success: function(data){
			
				logMessage(data,"#0000fff");
				refreshEverything();
			
		},
		fail: function(data){
				console.log(data);
		}
	});
	
}



function accountObject()
{
	this.title = "";
	this.value = 0;
}

function categorieObject(){
	this.title = "";
	this.indexTitle = "";
	this.toolTip = "{y}";
	this.value = 0;
	this.color = "#0099ff";
}
