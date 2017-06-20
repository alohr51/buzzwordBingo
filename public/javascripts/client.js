var socket = io();
var userSelectedSquares=[];
var winningCases = [["1,1","1,2","1,3","1,4","1,5"],["2,1","2,2","2,3","2,4","2,5"],["3,1","3,2","3,3","3,4","3,5"],
	["4,1","4,2","4,3","4,4","4,5"],["5,1","5,2","5,3","5,4","5,5"], ["1,1","2,1","3,1","4,1","5,1"],["1,2","2,2","3,2","4,2","5,2"],
	["1,3","2,3","3,3","4,3","5,3"],["1,4","2,4","3,4","4,4","5,4"],["1,5","2,5","3,5","4,5","5,5"], ["1,1","2,2","3,3","4,4","5,5"],
	["5,1","4,2","3,3","2,4","1,5"],["1,1","5,1","1,5","5,5"] ];

// Initialize table of buzzwords we get over websocket from the server
socket.on('buzzwords', function(buzzwords){
	if(buzzwords.length < 25){
		console.error("There are not enough buzzwords to make a 5x5 table");
		return;
	}
	for(var y = 1; y <= 5; y++){
		var row = "<tr>";
		for(var x = 1; x <= 5; x++){
			row += (x === 3 && y === 3) ? "<td class='square' data-x='3' data-y='3'>FREE</td>" : "<td class='square' data-x=" + x + " data-y=" + y + ">"+ buzzwords.pop() + "</td>";
		}
		row += "</tr>";
		$("#bingoBody").append(row);
	}

	$('.square').click(function(){
        handleSquareClick(this);
    });

});

function handleSquareClick(square){
	$(square).toggleClass("selected");
	var x = $(square).data("x");
	var y = $(square).data("y");
	var squareID = x + "," + y;
	// add the square to userSelectedSquares array if its not there and remove it if it is
	var squareIndex = userSelectedSquares.indexOf(squareID);
	squareIndex === -1 ? userSelectedSquares.push(squareID) : userSelectedSquares.splice(squareIndex, 1);
	checkEndCase();
}

function checkEndCase(){
	// for performance we know a win must have at lest 4 selected (corner win) so don't even try if the user has less than 4 squares selected
	if(userSelectedSquares.length < 4){
		return;
	}

	// iterate through the win case arrays
	for(var winCaseIndex in winningCases){
		var matches = 0;
		// iterate through each square in each win case array
		for(var entryIndex in winningCases[winCaseIndex]){
			// iterate through users selected squares to see the current win case is matched
			for(var squareIndex in userSelectedSquares){
				// if any of the users selected squares contain a square in the current win case add a match
				// if the number of matches equals the number of squares in a win case then BINGO!
				if(userSelectedSquares[squareIndex] === winningCases[winCaseIndex][entryIndex] && ++matches === winningCases[winCaseIndex].length){
					alert("BINGO!");
				}
			}
		}
	}
}