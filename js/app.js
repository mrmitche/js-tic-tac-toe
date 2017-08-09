var board = ['','','','','','','','',''];
var gameOver = false;

function checkWin(letter) {
    
	var message = '';
	var id = '';
	
    switch (letter) {
	    case 'x':
		    id = '#player';
		    message = 'You Win!';
		    break;
		case 'o':
		    id = '#opponent';
		    message = 'You Lose!';
			break;
		default:
		    console.log('checkWin called without letter');
	}
	
	// Winning combinations
	if ((board[0] == letter && board[1] == letter && board[2] == letter)
	|| (board[3] == letter && board[4] == letter && board[5] == letter)
	|| (board[6] == letter && board[7] == letter && board[8] == letter)
	|| (board[0] == letter && board[3] == letter && board[6] == letter)
	|| (board[1] == letter && board[4] == letter && board[7] == letter)
	|| (board[2] == letter && board[5] == letter && board[8] == letter)
	|| (board[0] == letter && board[4] == letter && board[8] == letter)
	|| (board[2] == letter && board[4] == letter && board[6] == letter)){
		gameOver = true;
	    var current = parseInt($(id).html());
		$(id).html(String(current+1));
		$('#reset').show();
		alert(message);
		return true;
	}
	else if (board[0] != '' && board[1] != '' && board[2] != '' 
	&& board[3] != '' && board[4] != '' && board[5] != '' 
	&& board[6] != '' && board[7] != '' && board[8] != ''){
	    //Board is full, but no one has won
		message = 'Tie Game';
		$('#reset').show();
		alert(message);
		return true;
	}
	else {
	    return false;
	}

}

function opponentsMove() {
    
	//TODO: When opponent has selected spaces, make logical selection instead of random
	
	//Create nested array of 1s and 0s showing X locations
	// eg [[1,0,0],
	//     [0,1,0],
	//     [1,1,0]]
	// If sum row = 2, go in other space in row
	// If sum of row[i][0]s, row[i][1]s, ... is 2, go in empty space
	// Some logic to go in the diagonals
	// If nothing is 2, then create a line with Os
	
	// Do same as above for O locations, if sum is 2, take other spot to win game
	// If not, place in a row that is empty of Xs
	
	
	//Pick random space
	var space = Math.floor(Math.random() * 10);
	
	//Check if move is valid or pick new space
	while (board[space] != '') {
	    space = Math.floor(Math.random() * 10);
	}
	
	board[space] = 'o';
	console.log(board);
	
	var id = '#';
	$(id.concat(String(space))).html('<h1>O</h1>');
	
	//Check win
	checkWin('o');
}

function reset() {
    board = ['','','','','','','','',''];
	gameOver = false;
	var id = '#';
	for (i = 0; i < 10; i++) {
	    $(id.concat(String(i))).html('');
	}
	$('#reset').hide();
}

function app() {
    $('.box').on('click', function(){
	    
		//Prevent clicking empty spaces after a win
		if (gameOver){
		    return;
		}
	    
		//Which box was clicked?
		var clicked = parseInt($(this).attr('id'));
		
		//Is this move valid?
		if (board[clicked] != '') {
		    alert('That move is invalid'); //TODO: Replace with something in screen
			return;
		}
		else {
		    board[clicked] = 'x';
			console.log(board);
			$(this).html('<h1>X</h1>'); //TODO: Style X properly
			if (!checkWin('x')){
			    opponentsMove(); //Cannot use set timeout, or allows user to quick click several spaces
			}
		}
		
	});
	
	$('#reset').on('click', reset);
}

$(document).ready(app);