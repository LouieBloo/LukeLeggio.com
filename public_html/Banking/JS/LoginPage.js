$( document ).ready(function() {
		
	$("#NewUserSelectButton").click(function() {
		toggleDisplay("createPasswordForm");
	});
	
	$("#addNewUserForm").submit(function(event){
		event.preventDefault();
		addNewUser();
	});
	
});



function addNewUser()
{
	console.log("adding new user...");
	
	
	
	var data = $("#addNewUserForm").serialize();
	
	$.ajax({
		data: data,
		type: "post",
		url: "PHP/addNewUser.php",
		success: function(data){
			
			
			var data2 = JSON.parse(data);
			
			if(data2.Status == "Fail")
			{
				$("#LoginErrorMessage").html(data2.Message);
			}
			else if(data2.Status == "Success")
			{
				$("#LoginErrorMessage").html("<span style='color:blue;'>" + data2.Message + "</span>");
			}
			
		},
		fail: function(data){
				console.log("yea");
		}
	});
}