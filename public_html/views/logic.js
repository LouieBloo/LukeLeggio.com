
var timeoutId = 0;
var cardInterval = 0;
var movingCard = "";
var mouseX = 0;
var mouseY = 0;
var hoveredDiv = "";
var flush = false;
var editingGrid = false;

$(window).on('load', function() {
	
	reloadGrid();
	
	$("#editGrid").click(toggleGrid);
	
	$( "html" ).mouseup(function() {
		if(flush)
		{
			flush = false;
		}
		else if(editingGrid)
		{
			stopMoving();	
		}
		
	});

	$( document ).on( "mousemove", function( event ) {
	 	mouseX = event.pageX;
	 	mouseY = event.pageY - $(window).scrollTop();
	});
	
    $(".addGridRow").click(addRow);

});

function reloadGrid()
{
	$('.cardMover').mousedown(function(event) {
		
		if(editingGrid)
		{
			var parentCard = $(event.target).parents('.card');
			if(parentCard.length > 0 && movingCard == "")
			{
				flush = true;
				startMoving(parentCard[0]);
			}	
		}
	    
	});
	
	
	//unbind everything to prevent multiple binds
	$(".gridCol").off("mouseover.grid");
	$(".gridCol").off("mouseleave.grid");
	$(".gridColSubtractButton").off("click.grid");
	$(".gridRowAddButton").off("click.grid");
	
	$(".gridCol").on( "mouseover.grid", function() {
		if(editingGrid)
		{
			$(this).css("background-color", "yellow");
        	hoveredDiv = this;
		} 	
	});
    
    $(".gridCol").on( "mouseleave.grid", function() {
    	if(editingGrid)
		{
	        $(this).css("background-color", "white");
	        hoveredDiv = "";
	    }
	});

    $(".gridColSubtractButton").on( "click.grid", function() {
    	var target = $(this);
    	removeCol($(target).parent(".gridCol"));
	});
    
    $( ".gridRowAddButton" ).on( "click.grid", function() {
		var target = $(this);
    	addNewCol($(target).parent(".gridRow"));
	});
    
}

function addRow()
{
	var output = '<div class="gridRow gridRowEdit col-md-12 row"><i class="material-icons gridRowAddButton">add_circle</i><i class="material-icons gridRowSubtractButton">remove_circle</i></div>';
	$("#grid").append(output);
	
	reloadGrid();
}

function addNewCol(rowObject)
{
	var childCols = $(rowObject).children(".gridCol");
	var numberOfCols = childCols.length;
	
	
	if(numberOfCols >= 4)
	{
		console.log("Cant add another row as it is full!");
	}	
	else
	{
		var originalColSize = [];
		jQuery.each( childCols, function( i, val ) {
		
			var classList = $(val).attr('class').split(/\s+/);
			$.each(classList, function(index, item) {
			    if (item.includes("col-md")){
			        originalColSize.push(item.replace("col-md-",""));
			        $(val).removeClass(item);
			    }
			    else if (item.includes("col-sm")){
			        originalColSize.push(item.replace("col-sm-",""));
			        $(val).removeClass(item);
			    }
			    else if (item.includes("col-xs")){
			        originalColSize.push(item.replace("col-xs-",""));
			        $(val).removeClass(item);
			    }
			    else if (item.includes("col-lg")){
			        originalColSize.push(item.replace("col-lg-",""));
			        $(val).removeClass(item);
			    }
			});
		  
		});
		
		console.log(originalColSize);
		
		numberOfCols ++;
		var colNumber = 12/numberOfCols;
		jQuery.each( childCols, function( i, val ) {
			
			$(val).addClass("col-md-" + colNumber);
			
		});
		
		var output = '<div class="gridCol gridColEdit col-md-' + colNumber + '"><i class="material-icons gridColSubtractButton">remove_circle</i></div>';
		$(rowObject).append(output);
		
		reloadGrid();
	}
}

function removeCol(parentCol)
{
	var parentRow = $(parentCol).parent(".gridRow");
	
	var childCols = $(parentRow).children(".gridCol");
	var numberOfCols = childCols.length;
	
	$(parentCol).remove();
	
	var oldColNumber = 12/numberOfCols;
	var newColNumber = 12/(numberOfCols-1);
	jQuery.each( childCols, function( i, val ) {
			
		$(val).removeClass("col-md-" + oldColNumber);
		$(val).addClass("col-md-" + newColNumber);
		
	});
	
}

function startMoving(inputCard)
{
	console.log("Start Moving");
	$(inputCard).addClass("movingCard");
	$(inputCard).removeClass("frozenCard");
	movingCard = inputCard;
	$(inputCard).css({left:mouseX + 50,top:mouseY});
	cardInterval = setInterval(moveCard,33);
}

function moveCard()
{
	console.log("moving x: " + mouseX + " y: " + mouseY);
	$(movingCard).css({left:mouseX + 50,top:mouseY});
}


function stopMoving()
{
	console.log("stop Moving");
	clearInterval(cardInterval);
	
	$(movingCard).addClass("frozenCard");
	$(movingCard).removeClass("movingCard");
	$(movingCard).css({left:0,top:0});
	
	
	
	if(hoveredDiv)
	{
		console.log($(hoveredDiv));
		$(hoveredDiv).append($(movingCard).detach());
	}
	
	movingCard = "";
}

function toggleGrid()
{
	if(editingGrid)
	{
		$("#editMenu").addClass("invis");
		$(".gridCol").removeClass("gridColEdit");
		$(".gridRow").removeClass("gridRowEdit");
		$(".cardMover").addClass("invis");
		$(".gridRowAddButton").addClass("invis");
		$(".gridRowSubtractButton").addClass("invis");
		$(".gridColSubtractButton").addClass("invis");
		
		editingGrid = false;
	}
	else
	{
		$("#editMenu").removeClass("invis");
		$(".gridCol").addClass("gridColEdit");
		$(".gridRow").addClass("gridRowEdit");
		$(".cardMover").removeClass("invis");
		$(".gridRowAddButton").removeClass("invis");
		$(".gridRowSubtractButton").removeClass("invis");
		$(".gridColSubtractButton").removeClass("invis");
		
		editingGrid = true;
	}
}
