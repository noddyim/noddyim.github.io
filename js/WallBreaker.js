// getting a reference to our HTML element
const canvas = document.querySelector('canvas');

// initiating 2D context on it
const c = canvas.getContext('2d');
//var w = canvas.getContext("2d");

var interval;
var boardInterval;
var x;// = 50;
var y;// = 180;
var w;
var h;
var colour;
var speedX = 1;
var speedY = -1;

var xWall = new Array(55);
var yWall = new Array(55);
var brick = new Array(55);
var brickX;
var brickY;
var impact = new Array(55);

var board;
var mouseX = 100;
var score = 0;

var ball;
var winner = false;
var speed = 20;
var count = 0;

var temp;

document.body.onload = init();
canvas.addEventListener('mousemove', mouseM, false);
//canvas.addEventListener('click', playing, false);

function init(){
	canvas.width = 600;
  canvas.height = 400;
	makeObstacles();
	ball = new object("black", (mouseX+50), 344, 5, 5);
	board = new gameBoard();

	for(var i = 0; i < 55; i++){
		impact[i]=false;
		if(i>-1 && i<11){
			brick[i] = new wall("gold", xWall[i], yWall[i], 40, 20, i);
		}
		if(i>10 && i<22){
			brick[i] = new wall("red", xWall[i], yWall[i], 40, 20, i);
		}
		if(i>21 && i<33){
			brick[i] = new wall("green", xWall[i], yWall[i], 40, 20, i);
		}
		if(i>32 && i<44){
			brick[i] = new wall("blue", xWall[i], yWall[i], 40, 20, i);
		}
		if(i>43 && i<55){
			brick[i] = new wall("cyan", xWall[i], yWall[i], 40, 20, i);
		}
	}
	canvas.addEventListener('click', playing, false);
	updateGameArea();
	boardInterval = setInterval(updateBoard, speed);
}

function updateBoard(){
	clear();
	ball.pregame();
	board.update();
	output();
	for(var i = 0; i < 55; i++){
		brick[i].crash();
	}
}

function playing(){
	//document.getElementById("playGame").disabled = true;
	//document.getElementById("playGame").style.visibility = "hidden";
	//500ms delay
	/*setTimeout(function() {
    init();
	}, 500);*/
	clearInterval(boardInterval);
	interval = setInterval(updateGameArea, speed);
	canvas.removeEventListener('click', playing);
}

function gameBoard(){
	this.update = function(){
		c.fillStyle = "black";
		if(x <= (mouseX+100) && (x+5) >=mouseX && (y+5) >= 350 && y <= 355){
			if((y+5) == 350){
				speedY = speedY * -1;
			}
		}
		if(mouseX >= 500){
			c.fillRect(500, 350, 100, 10);
		}else if(mouseX <= 50){
			c.fillRect(1, 350, 100, 10);
		}else{
			c.fillRect(mouseX, 350, 100, 10);
		}
	}
}

function diff(){
	//alert("score:"+score+" speed:"+speed);
	if(score == 12 && speed == 20){
		speed -= 5;
		clearInterval(interval);
		interval = setInterval(updateGameArea, speed);

	}
	if(score == 24 && speed == 15){
		speed -= 5;
		clearInterval(interval);
		interval = setInterval(updateGameArea, speed);
	}
	if(score == 36 && speed == 10){
		speed -= 5;
		clearInterval(interval);
		interval = setInterval(updateGameArea, speed);
	}
}

function mouseM(e){
	var rect = canvas.getBoundingClientRect();
	mouseX = e.pageX - (rect.left+50);
}

function wall(colorW, xBrick, yBrick, wBrick, hBrick, index){
	this.crash = function(){	
		checkWin();
		if(winner){
			stop();
		}
		if(x <= (xBrick+40) && (x+5) >=xBrick && (y+5) >= yBrick && y <= (yBrick+20)){
			//alert("bx:"+x+" by:"+y+" wx:"+xBrick+" wy:"+yBrick+" wx40:"+(xBrick+40)+" wy20:"+(yBrick+20));
			c.fillStyle = colorW;
			c.fillRect(-50, -50, 40, 20);
			impact[index] = true;
			count++;
			xWall[index] = -50;
			yWall[index] = -50;
			if(x == (xBrick+40) || (x+5) == xBrick){
				speedX = speedX * -1;
			}
			if((y+5) == yBrick || y == (yBrick+20)){
				speedY = speedY * -1;
			}
			xBrick = xWall[index];
			yBrick = yWall[index];
			//alert("impact:"+impact);
			output();
		}else if(!impact[index]){
			c.fillStyle = colorW;
			c.fillRect(xBrick, yBrick, wBrick, hBrick);
		}
	}
}

function checkWin(){
	for(var i = 0; i < 55; i++){
		if(xWall[i] !== -50 && yWall[i] !== -50){
			winner = false;
		}
	}
}

function object(colorOf, xValue, yValue, wValue, hValue){
	w = wValue;
	h = hValue;
	x = xValue;
	y = yValue;
	this.update = function(){
		c.fillStyle = colorOf;
		c.fillRect(x, y, w, h);
	}
	this.pregame = function(){
		c.fillStyle = colorOf;
		c.fillRect((mouseX+50), 344, w, h);
		x = mouseX+50;
		y = 344;
	}
}

function clear(){
	c.clearRect(0, 0, canvas.width, canvas.height);
}
/*
function checkScore(age) {
	alert("age:"+age);
  return age == true;
}*/

function output(){
	//alert("score:"+score+" speed:"+speed);
	score = impact.filter(function(value){
    return value === true;
	}).length
	//alert("temp"+temp);  
	/*
	//for(var i = 0; i < 55; i++){
	var counted = {};
	impact.forEach(function(i) {
		 counted[i] = (counted[i]||0) + 1;
		});
	alert("counted"+counted+" impact:"+impact);
		
		temp = impact.includes(true, i);
		if(temp == true){
			count++;
			alert("impact:"+impact+" temp:"+temp+" count:"+count);
		}
	}
	temp = impact.every(checkScore);
	alert("impact"+impact+" temp:"+temp);
	if(temp==true){
		alert("temp:"+temp);
	}
	var temp;
	for(temp in impact){
		if(impact[temp] == true){
			//alert("temp is true:"+temp);
			count += 1;
		}
	}
	//alert("count:"+count+" impact:"+impact);
	*/
	document.getElementById("score").innerHTML = "Score: " + (score * 15);
	document.getElementById("blocksLeft").innerHTML = "Blocks Left: " + (55 - score);
	document.getElementById("speed").innerHTML = "Speed: " + speed;
	
}

function stop(){
	clearInterval(interval);
	//checkWin();
	if(winner){
		alert("You Win!");
	}else{
		alert("You Lose!");
	}
	speed = 20;
	count = 0;
	speedY = -1;
	init();
}

function updateGameArea() {
	clear();
	diff();
	x = x + speedX;
	y = y + speedY;
	if(x > 595 || x < 1){
		speedX = speedX * -1;
	}
	if(y < 1){
		speedY = speedY * -1;
	}
	if(y > 360){
		checkWin();
		stop();
	}
	ball.update();
	board.update();
	//output();
	for(var i = 0; i < 55; i++){
		brick[i].crash();
	}
}

function makeObstacles(){
	var tempX = 50;

	for(var i = 0; i < xWall.length; i++){
		if(i >=0 && i <= 10){
			xWall[i] = tempX;
			yWall[i] = 50;
			tempX += 45;
			if(i == 10){
				tempX = 50;
			}
		}else if(i > 10 && i <=21){
			xWall[i] = tempX;
			yWall[i] = 75;
			tempX += 45;
			if(i == 21){
				tempX = 50;
			}
		}else if(i > 21 && i <=32){
			xWall[i] = tempX;
			yWall[i] = 100;
			tempX += 45;
			if(i == 32){
				tempX = 50;
			}
		}else if(i > 32 && i <=43){
			xWall[i] = tempX;
			yWall[i] = 125;
			tempX += 45;
			if(i == 43){
				tempX = 50;
			}
		}else if(i > 43 && i <=55){
			xWall[i] = tempX;
			yWall[i] = 150;
			tempX += 45;
		}
	}
}
