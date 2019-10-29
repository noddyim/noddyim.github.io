// getting a reference to our HTML element
const canvas = document.querySelector('canvas');

// initiating 2D context on it
const c = canvas.getContext('2d');
//var w = canvas.getContext("2d");

var interval;
var x;// = 50;
var y;// = 180;
var w;
var h;
var colour;
var speedX = 1;
var speedY = 1;

var xWall = new Array(55);
var yWall = new Array(55);
var brick = new Array(55);
var brickX;
var brickY;
var impact = new Array(55);

var board;
var mouseX = 100;

var ball; 

document.body.onload = start();
canvas.addEventListener('mousemove', mouseM, false);

function start(){
	canvas.width = 600;
  canvas.height = 400;
	makeObstacles();
	ball = new object("black", 10, 190, 5, 5);
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
	interval = setInterval(updateGameArea, 20);
}

function gameBoard(){
	this.update = function(){
		c.fillStyle = "black";
		c.fillRect(mouseX, 350, 100, 10);
		if(x <= (mouseX+100) && (x+5) >=mouseX && (y+5) >= 350 && y <= 360){
			if((y+5) == 350){
				speedY = speedY * -1;
			}
		}
	}
}

function mouseM(e){
	var rect = canvas.getBoundingClientRect();
	mouseX = e.pageX - (rect.left+50);
}

function wall(colorW, xBrick, yBrick, wBrick, hBrick, index){
	this.crash = function(){		
		if(x <= (xBrick+40) && (x+5) >=xBrick && (y+5) >= yBrick && y <= (yBrick+20)){
			c.fillStyle = colorW;
			c.fillRect(-50, -50, 40, 20);
			impact[index] = true;
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
		}else if(!impact[index]){
			c.fillStyle = colorW;
			c.fillRect(xBrick, yBrick, wBrick, hBrick);
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
}

function clear(){
	c.clearRect(0, 0, canvas.width, canvas.height);
}
/*
function stop(){
	clearInterval(interval);
}
*/
function updateGameArea() {
	clear();
	x = x + speedX;
	y = y + speedY;
	if(x > 595 || x < 1){
		speedX = speedX * -1;
	}
	if(y > 395 || y < 1){
		speedY = speedY * -1;
	}
	ball.update();
	board.update();
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
