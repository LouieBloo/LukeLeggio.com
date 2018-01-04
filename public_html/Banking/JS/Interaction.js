var logMessages =[];
var maxLogMessages = 5;


$( document ).ready(function() {
	
	$("#AddCategoryButton").click(function() {
		toggleDisplay("insertCategoryForm");
	});
	
	$("#AddAccountButton").click(function() {
		toggleDisplay("insertAccountForm");
	});
	
	$("#OptionsButton").click(function() {
		toggleDisplay("CategoryInput");
	});
	
	
	
	
});


function toggleDisplay(inputId)
{
	
	if($("#" + inputId).css("display") == "none")
	{
		$("#" + inputId).css("display","block");
	}
	else
	{
		$("#" + inputId).css("display","none");
	}
	
		
}

function logMessage(stringInput, color)
{
	
	logMessages.push(new logMessageObject(stringInput,color));
	$("#errorMessage").html("");
	
	var x = 0;
	
	while(x < maxLogMessages && x < logMessages.length)
	{
		$("#errorMessage").append("<span style='color:" + logMessages[logMessages.length - x - 1].color + ";'>" + logMessages[logMessages.length - x - 1].string + "</span> </br>");
		x++;
	}
	
	
}

function logMessageObject(string, color)
{
	this.string = string;
	this.color = color;
}











