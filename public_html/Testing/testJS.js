$(document).ready(function(){
	
    $("#testForm").submit(function()
{
    var postData = $(this).serializeArray();
    var formURL = "OtherTest.php";
    $.ajax(
    {
        url : formURL,
        type: "POST",
        data : postData,
        success:function(data, textStatus, jqXHR) 
        {
            alert("Data: " + data + "\nStatus: " + textStatus);
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
            //if fails      
        }
    });
   
});
    
}); 


function testAjax(inputId)
{
	
	console.log(inputId);
	
	var name = $(inputId).attr("name");
	
	console.log(name);
	
	var postData = $(inputId).serializeArray();
	console.log(postData);
	
	 $.ajax(
    {
        url : "OtherTest.php",
        type: "POST",
        data : postData,
    	success:function(data, status)
    	{
        	alert("Data: " + data + "\nStatus: " + status);
    	},
    	error: function(jqXHR, textStatus, errorThrown)
    	{
    		alert(errorThrown);
    	}
    });
	
}
