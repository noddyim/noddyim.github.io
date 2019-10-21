$(document).ready(function(){
var turns = ["#","#","#","#","#","#","+","#"];
var computerTurn = "";
var turn = "";
var gameOn = false;
var count = 0;
var hard = false;

var startTurn = prompt("Choose Your Move", "Type X or O").toUpperCase();
switch (startTurn) {
    case "X":
        computerTurn = "O";
        turn = "X";
        $("#message").html("Player " + turn + " gets to start!");
        $("#hardMessage").html("Easy Mode.");
        //hardMove();
        //computerPlay(0);
        break;
    case "O":
        computerTurn = "X";
        turn = "O";
        $("#message").html("Player " + turn + " gets to start!");
        $("#hardMessage").html("Easy Mode.");
        //hardMove();
        //computerPlay(0);
        break;
    case null:
        alert("Sorry. Please type X or O");
        window.location.reload(true);
    break;
    default:
        alert("Sorry. Please type X or O");
        window.location.reload(true);
        break;
}

/*function computersTurn() {
    //establish variable saying the computer has not gone yet
    var taken = false;
    //while computer hasn't gone and game is not over (computer can only go 4 times)
    while (taken === false && count !== 5) {
        //create a random number from 0-9 for the computer choose a spot
        var computerMove = (Math.random() * 10).toFixed();
        //create move for the random number
        var move = $("#" + computerMove).text();
        //if the computers move has a # as its value then we can place their move there
        if (move === "#") {
            //put the computers letter 
            $("#" + computerMove).text(computerTurn);
            //exits while loop because taken is true
            taken = true;
            //put the computers letter in the array element it took
            turns[computerMove] = computerTurn;
        }
    }
}*/
function hardMove(){
    var taken = false;
    //alert("hard move count:"+count);
    while (taken === false && count !== 10) {
        //if(count === 0){
          //  computerMove = 0;
        //}
        if( count === 3 && turns[8] !== turn &&
            turns[8] === "#"){//!== computerTurn){
                computerMove = 8;
                taken = true;
        } else if( count === 3 && turns[2] !== turn &&
            turns[2] === "#"){//!== computerTurn){
                computerMove = 2;
                taken = true;
        } else if( count === 3 && turns[6] !== turn &&
            turns[6] === "#"){//!== computerTurn){
                computerMove = 6;
                taken = true;
        } else if( count === 5 && turns[4] === turn &&
            turns[7] === turn){
                smartMove();
                taken = true;
        } else if( count === 5 && turns[4] === turn &&
            turns[5] === turn){
                smartMove();
                taken = true;
        } else if( count === 5 && turns[4] === turn &&
            turns[1] === turn){
                smartMove();
                taken = true;
        } else if( count === 5 && turns[4] === turn &&
            turns[3] === turn){
                smartMove();
                taken = true;
        } else if( count === 5 && turns[4] !== turn &&
                turns[4] === "#"){
                computerMove = 4;
                taken = true;
        } else if( count === 5 && turns[8] === computerTurn &&
            turns[6] === "#"){//!== turn){
                computerMove = 6;
                taken = true;
        } else if( count === 5 && turns[8] === computerTurn &&
            turns[2] === "#"){//!== turn){
                computerMove = 2;
                taken = true;
        } else if( count === 5 && turns[6] === computerTurn &&
            turns[8] === "#"){//!== turn){
                computerMove = 8;
                taken = true;
        } else if( count === 5 && turns[6] === computerTurn &&
            turns[2] === "#"){//!== turn){
                computerMove = 2;
                taken = true;
        } else if( count === 5 && turns[2] === computerTurn &&
            turns[6] === "#"){//!== turn){
                computerMove = 6;
                taken = true;
        } else if( count === 5 && turns[2] === computerTurn &&
            turns[8] === "#"){//!== turn){
                computerMove = 8;
                taken = true;
        } else if( count === 7 && turns[8] === computerTurn &&
            turns[6] === computerTurn &&
            turns[7] === "#"){//!== turn && turns[7] !== computerTurn){
                computerMove = 7;
                taken = true;
        } else if( count === 7 && turns[8] === computerTurn &&
            turns[6] === computerTurn &&
            turns[4] === "#"){//!== turn && turns[4] !== computerTurn){
                computerMove = 4;
                taken = true;
        } else if( count === 7 && turns[8] === computerTurn &&
            turns[6] === computerTurn &&
            turns[3] === "#"){//!== turn && turns[3] !== computerTurn){
                computerMove = 3;
                taken = true;
        } else if( count === 7 && turns[8] === computerTurn &&
            turns[2] === computerTurn &&
            turns[5] === "#"){//!== turn && turns[5] !== computerTurn){
                computerMove = 5;
                taken = true;
        } else if( count === 7 && turns[8] === computerTurn &&
            turns[2] === computerTurn &&
            turns[4] === "#"){//!== turn && turns[4] !== computerTurn){
                computerMove = 4;
                taken = true;
        } else if( count === 7 && turns[8] === computerTurn &&
            turns[2] === computerTurn &&
            turns[1] === "#"){//!== turn && turns[1] !== computerTurn){
                computerMove = 1;
                taken = true;
        } else if( count === 7 && turns[6] === computerTurn &&
            turns[2] === computerTurn &&
            turns[4] === "#"){//!== turn && turns[4] !== computerTurn){
                computerMove = 4;
                taken = true;
        } else if( count === 7 && turns[6] === computerTurn &&
            turns[2] === computerTurn &&
            turns[3] === "#"){//!== turn && turns[3] !== computerTurn){
                computerMove = 3;
                taken = true;
        } else if( count === 7 && turns[6] === computerTurn &&
            turns[2] === computerTurn &&
            turns[1] === "#"){//!== turn && turns[1] !== computerTurn){
                computerMove = 1;
                taken = true;
        } else if(count === 7 && turns[4] === turn){
            smartMove();
                taken = true;
        } else if(count === 7 && turns[4] === computerTurn){
            smartMove();
                taken = true;
        } else if(count === 9){
            smartMove();
                taken = true;
        } else {
            taken = true;
            randomPlay();
        }        
    }
    //alert("end of hardmove");
        var move = $("#" + computerMove).text();
        //alert("move:"+move+" comp move:"+computerMove);
        if(move === "#"){
            //taken = true;
            computerPlay(computerMove);
        } 
}

function smartMove(){
    //alert("smart move");
    var taken = false;
    while (taken === false && count !== 10) {
        if(turns[4] === "#"){//!== turn && turns[4] !== computerTurn){
            computerMove = 4;
            taken = true;
        } else if(turns[0] === turn && turns[1] === turn && 
            turns[2] === "#"){//!== turn && turns[2] !== computerMove){
            computerMove = 2;
            taken = true;
        } else if(turns[1] === turn && turns[2] === turn &&
            turns[0] === "#"){//&& turns[0] !== computerMove){
            computerMove = 0;
            taken = true;
        } else if(turns[0] === turn && turns[2] === turn && 
            turns[1] === "#"){//&& turns[1] !== computerMove){
            computerMove = 1;
            taken = true;
        } else if(turns[3] === turn && turns[4] === turn && 
            turns[5] === "#"){//&& turns[5] !== computerMove){
            computerMove = 5;
            taken = true;
        } else if(turns[4] === turn && turns[5] === turn && 
            turns[3] === "#"){//&& turns[3] !== computerMove){
            computerMove = 3;
            taken = true;
        } else if(turns[3] === turn && turns[5] === turn && 
            turns[4] === "#"){//&& turns[4] !== computerMove){
            computerMove = 4;
            taken = true;
        } else if(turns[6] === turn && turns[7] === turn && 
            turns[8] === "#"){//!== turn && turns[8] !== computerMove){
            computerMove = 8;
            taken = true;
        } else if(turns[7] === turn && turns[8] === turn && 
            turns[6] === "#"){//!== turn && turns[6] !== computerMove){
            computerMove = 6;
            taken = true;
        } else if(turns[6] === turn && turns[8] === turn && 
            turns[7] === "#"){//!== turn && turns[7] !== computerMove){
            computerMove = 7;
            taken = true;
        } else if(turns[0] === turn && turns[4] === turn && 
            turns[8] === "#"){//!== turn && turns[8] !== computerMove){
            computerMove = 8;
            taken = true;
        } else if(turns[4] === turn && turns[8] === turn && 
            turns[0] === "#"){//!== turn && turns[0] !== computerMove){
            computerMove = 0;
            taken = true;
        } else if(turns[0] === turn && turns[8] === turn && 
            turns[4] === "#"){//!== turn && turns[4] !== computerMove){
            computerMove = 4;
            taken = true;
        } else if(turns[2] === turn && turns[4] === turn && 
            turns[6] === "#"){//!== turn && turns[6] !== computerMove){
            computerMove = 6;
            taken = true;
        } else if(turns[4] === turn && turns[6] === turn && 
            turns[2] === "#"){//!== turn && turns[2] !== computerMove){
            computerMove = 2;
            taken = true;
        } else if(turns[2] === turn && turns[6] === turn && 
            turns[4] === "#"){//!== turn && turns[4] !== computerMove){
            computerMove = 4;
            taken = true;
        } else if(turns[0] === turn && turns[3] === turn && 
            turns[6] === "#"){//!== turn && turns[6] !== computerMove){
            computerMove = 6;
            taken = true;
        } else if(turns[3] === turn && turns[6] === turn && 
            turns[0] === "#"){//!== turn && turns[0] !== computerMove){
            computerMove = 0;
            taken = true;
        } else if(turns[0] === turn && turns[6] === turn && 
            turns[3] === "#"){//!== turn && turns[3] !== computerMove){
            computerMove = 3;
            taken = true;
        } else if(turns[1] === turn && turns[4] === turn && 
            turns[7] === "#"){//!== turn && turns[7] !== computerMove){
            computerMove = 7;
            taken = true;
        } else if(turns[4] === turn && turns[7] === turn && 
            turns[1] === "#"){//!== turn && turns[1] !== computerMove){
            computerMove = 1;
            taken = true;
        } else if(turns[1] === turn && turns[7] === turn && 
            turns[4] === "#"){//!== turn && turns[4] !== computerMove){
            computerMove = 4;
            taken = true;
        } else if(turns[2] === turn && turns[5] === turn && 
            turns[8] === "#"){//!== turn && turns[8] !== computerMove){
            computerMove = 8;
            taken = true;
        } else if(turns[5] === turn && turns[8] === turn && 
            turns[2] === "#"){//!== turn && turns[2] !== computerMove){
            computerMove = 2;
            taken = true;
        } else if(turns[2] === turn && turns[8] === turn && 
            turns[5] === "#"){//!== turn && turns[5] !== computerMove){
            computerMove = 5;
            taken = true;
        } else {
            taken = true;
            randomPlay();
        }            
    }
    var move = $("#" + computerMove).text();
        //alert("move:"+move+" comp location:"+computerMove+" count:"+count);
        if(move === "#"){
            //taken = true;
            //count++;
            computerPlay(computerMove);
        }    
}
function randomPlay(){
    //alert("doing random move");
    computerMove = (Math.random() * 9).toFixed();
    //alert("random move:"+computerMove);
    var move = $("#" + computerMove).text();
    //alert("move:"+move+" comp location:"+computerMove+" count:"+count);
    if(move === "#"){
        //taken = true;
        computerPlay(computerMove);
    } else if(move !== "#"){
        randomPlay();
    }

}
function computerPlay(compMove){
    //count++;
    //alert("comp play count +1:"+count);
    //alert("computer play count after comp move:"+count);
    $("#" + compMove).text(computerTurn);
    //put the computers letter in the array element it took
    turns[compMove] = computerTurn;
}

function playerTurn (turn, id){
    
    //winCondition(turns,computerTurn);
    //give the value of the spotTaken to the spot click "#"
    //incase someone clicks on a already picked spot
  var spotTaken = $("#"+id).text();
  //if the user clicks on "#" we will take action
  if (spotTaken ==="#"){
      //increase the count because a move has been done by the user
    count++;
    //alert("playerTurn count +1:"+count);
    //change the value of the element in the array the players letter
    turns[id] = turn;
    //change the value of the text to the players letter
    $("#"+id).text(turn);
    
    //check to see if someone won
    winCondition(turns,turn);
    //alert("gameOn right before cpu move:"+gameOn);
    //if nobody won let the computer choose their spot
    if (gameOn === false){
        if(hard){
            count++;
            hardMove()
        }else{
            count++;
            smartMove();
        }
        
      //state its the players turn
      $("#message").html("It's " + turn +"'s turn.");
      //check if the computers move was the winning move
      winCondition(turns, computerTurn);
    }//close if computers turn because nobody won
  }//close if the spot the user clicked on was a #
}//close function

function winCondition(trackMoves, currentMove) {
    //checks for win accross top
    if (trackMoves[0] === currentMove && trackMoves[1] === currentMove && trackMoves[2] === currentMove) {
        gameOn = true;
        if(hard){
            resetHard();
        }
        else{
            reset();
        }
        alert("Player " + currentMove + " wins!");
        //checks for win diagonal right to left
    } else if (trackMoves[2] === currentMove && trackMoves[4] === currentMove && trackMoves[6] === currentMove) {
        gameOn = true;
        if(hard){
            resetHard();
        }
        else{
            reset();
        }
        alert("Player " + currentMove + " wins!");
        //checks for win vertical first row
    } else if (trackMoves[0] === currentMove && trackMoves[3] === currentMove && trackMoves[6] === currentMove) {
        gameOn = true;
        if(hard){
            resetHard();
        }
        else{
            reset();
        }
        alert("Player " + currentMove + " wins!");
        //checks for win diagonal upper left to bottom right
    } else if (trackMoves[0] === currentMove && trackMoves[4] === currentMove && trackMoves[8] === currentMove) {
        gameOn = true;
        if(hard){
            resetHard();
        }
        else{
            reset();
        }
        alert("Player " + currentMove + " wins!");
        //checks win vertical middle row
    } else if (trackMoves[1] === currentMove && trackMoves[4] === currentMove && trackMoves[7] === currentMove) {
        gameOn = true;
        if(hard){
            resetHard();
        }
        else{
            reset();
        }
        alert("Player " + currentMove + " wins!");
        //checks win vertical last row
    } else if (trackMoves[2] === currentMove && trackMoves[5] === currentMove && trackMoves[8] === currentMove) {
        gameOn = true;
        if(hard){
            resetHard();
        }
        else{
            reset();
        }
        alert("Player " + currentMove + " wins!");
        //checks win vertical last row again!?
    } else if (trackMoves[2] === currentMove && trackMoves[5] === currentMove && trackMoves[8] === currentMove) {
        gameOn = true;
        if(hard){
            resetHard();
        }
        else{
            reset();
        }
        alert("Player " + currentMove + " wins!");
        //checks win horizontal middle row
    } else if (trackMoves[3] === currentMove && trackMoves[4] === currentMove && trackMoves[5] === currentMove) {
        gameOn = true;
        if(hard){
            resetHard();
        }
        else{
            reset();
        }
        alert("Player " + currentMove + " wins!");
        //checks win horizontal bottom row
    } else if (trackMoves[6] === currentMove && trackMoves[7] === currentMove && trackMoves[8] === currentMove) {
        gameOn = true;
        if(hard){
            resetHard();
        }
        else{
            reset();
        }
        alert("Player " + currentMove + " wins!");
        //if all the spots were taken its a draw
    } else if(!(trackMoves.includes("#"))){
       gameOn = true;
      if(hard){
            resetHard();
        }
        else{
            reset();
        }
      alert("It is a Draw!(Cats Game)");
    } else {
        gameOn = false;
    }
}
//if the user clicks on a # sign we make their move
$(".tic").click(function(){
    //alert("count:"+count);
    //create a variable to hold the position the user clicked on
  var slot = $(this).attr('id');
  //if(hard){
    //hardMove();
  //}
  //else if(!hard){
    //sent they array of turns and the users choice to the playerTurn function
    playerTurn(turn,slot);
  //}
   
});
function resetHard(){
    //assign all the elements in the array to be #
  turns = ["#","#","#","#","#","#","+","#"];
  //change the count to 0 moves
  count = 0;
  //change the positions to be #
  $(".tic").text("#");
  //switch the game on to be true
  gameOn = true;
  $("#hardMessage").html("You are playing in Hard Mode.");
  hard = true;
  count++;
  computerPlay(0);
}

$("#hardMode").click(function(){
  resetHard();
    });

//reset the game
function reset(){
    //assign all the elements in the array to be #
  turns = ["#","#","#","#","#","#","+","#"];
  //change the count to 0 moves
  count = 0;
  //change the positions to be #
  $(".tic").text("#");
  //switch the game on to be true
  gameOn = true;
  hard = false;
}
//if reset button is clicked on html run reset function
$("#reset").click(function(){
  reset();
    });
});
