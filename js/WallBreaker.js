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
var speedX = 2;
var speedY = 2;

var xWall = new Array(55);
var yWall = new Array(55);
var brick = new Array(55);
var brickX;
var brickY;
var impact = new Array(55);

/*
var board;
*/
/*addEventListener('resize', () => {
  canvas.width = 600;
  canvas.height = 400;
});*/

var ball; 

document.body.onload = start();

function start(){
	canvas.width = 600;
  canvas.height = 400;
	makeObstacles();
	ball = new object("black", 50, 180, 5, 5);
	
	for(var i = 0; i < 55; i++){
		impact[i]=false;
		if(i>-1 && i<11){
			brick[i] = new wall("gold", xWall[i], yWall[i], 40, 20, impact[i]);
		}
		if(i>10 && i<22){
			brick[i] = new wall("red", xWall[i], yWall[i], 40, 20, impact[i]);
		}
		if(i>21 && i<33){
			brick[i] = new wall("green", xWall[i], yWall[i], 40, 20, impact[i]);
		}
		if(i>32 && i<44){
			brick[i] = new wall("blue", xWall[i], yWall[i], 40, 20, impact[i]);
		}
		if(i>43 && i<55){
			brick[i] = new wall("cyan", xWall[i], yWall[i], 40, 20, impact[i]);
		}
	}
	//alert("brick:"+brick+" xwall:"+xWall+" ywall:"+yWall+" impact:"+impact);
	interval = setInterval(updateGameArea, 20);
}

function updateBall(){	
		c.fillStyle = "black";
		c.fillRect(x, y, 5, 5);
}

function wall(colorW, xBrick, yBrick, wBrick, hBrick, impact){
	
	this.crash = function(){
		if(xBrick <= x && x <= (xBrick+40) && yBrick <= y && y <= (yBrick+20)){
			c.fillStyle = colorW;
			c.fillRect(-50, -50, 40, 20);
			impact = true;
			if(xBrick <= x && x <= (xBrick+40)){
				speedX = speedX * -1;
			}
			if(yBrick <= y && y <= (yBrick+20)){
				speedY = speedY * -1;
			}


		}else if(!impact){
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
	for(var i = 0; i < 55; i++){
		brick[i].crash();
	}
	/*updateRow1();
	updateRow2();
	updateRow3();
	updateRow4();
	updateRow5();*/
  //updateBall();
}

/*function crashCheck(){

	var crash = true;

	var myleft = x;
    var myright = x + 5;
    var mytop = y;
	var mybottom = y + 5;

	var otherleft = otherobj.x;
    var otherright = otherobj.x + 40;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + 20;
	
	
	if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
}*/

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
	//alert("xwall:"+xWall);
	//alert("ywall:"+yWall);
}

function updateRow1(){
	c.fillStyle = "gold";
	/*for(var i = 0; i < 12; i++)
	{
		c.fillRect(xWall[i], yWall[i], 40, 20);
	}*/
	if(50 <= x && x <= 90 && 50 <= y && y <=70){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(50, 50, 40, 20);
	}
	
	if(95 <= x <= 135 && 50 <= y <=70){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(95, 50, 40, 20);
	}
	if(140 <= x <= 180 && 50 <= y <=70){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(140, 50, 40, 20);
	}
	if(185 <= x <= 225 && 50 <= y <=70){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(185, 50, 40, 20);
	}
	if(230 <= x <= 270 && 50 <= y <=70){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(230, 50, 40, 20);
	}
	if(275 <= x <= 315 && 50 <= y <=70){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(275, 50, 40, 20);
	}	 
	if(320 <= x <= 360 && 50 <= y <=70){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(320, 50, 40, 20);
	}
	if(365 <= x <= 405 && 50 <= y <=70){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(365, 50, 40, 20);
	}
	if(410 <= x <= 450 && 50 <= y <=70){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(410, 50, 40, 20);
	}
	if(455 <= x <= 500 && 50 <= y <=70){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(455, 50, 40, 20);
	}
	if(500 <= x <= 540 && 50 <= y <=70){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(500, 50, 40, 20);
	}
}
function updateRow2(){	
	c.fillStyle = "red";
	if(50 <= x <= 90 && 75 <= y <=95){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(50, 75, 40, 20);
	}	
	if(95 <= x <= 135 && 75 <= y <=95){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(95, 75, 40, 20);
	}
	if(140 <= x <= 180 && 75 <= y <=95){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(140, 75, 40, 20);
	}
	if(185 <= x <= 225 && 75 <= y <=95){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(185, 75, 40, 20);
	}
	if(230 <= x <= 270 && 75 <= y <=95){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(230, 75, 40, 20);
	}
	if(275 <= x <= 315 && 75 <= y <=95){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(275, 75, 40, 20);
	}	 
	if(320 <= x <= 360 && 75 <= y <=95){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(320, 75, 40, 20);
	}
	if(365 <= x <= 405 && 75 <= y <=95){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(365, 75, 40, 20);
	}
	if(410 <= x <= 450 && 75 <= y <=95){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(410, 75, 40, 20);
	}
	if(455 <= x <= 500 && 75 <= y <=95){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(455, 75, 40, 20);
	}
	if(500 <= x <= 540 && 75 <= y <=95){
		c.fillRect(-50, -50, 40, 20);
	}else{
		c.fillRect(500, 75, 40, 20);
	}
	c.fillRect(50, 75, 40, 20);
	c.fillRect(95, 75, 40, 20);
	c.fillRect(140, 75, 40, 20);
	c.fillRect(185, 75, 40, 20);
	c.fillRect(230, 75, 40, 20);
	c.fillRect(275, 75, 40, 20);
	c.fillRect(320, 75, 40, 20);
	c.fillRect(365, 75, 40, 20);
	c.fillRect(410, 75, 40, 20);
	c.fillRect(455, 75, 40, 20);
	c.fillRect(500, 75, 40, 20);
}

function updateRow3(){	
	c.fillStyle = "green";
	c.fillRect(50, 100, 40, 20);
	c.fillRect(95, 100, 40, 20);
	c.fillRect(140, 100, 40, 20);
	c.fillRect(185, 100, 40, 20);
	c.fillRect(230, 100, 40, 20);
	c.fillRect(275, 100, 40, 20);
	c.fillRect(320, 100, 40, 20);
	c.fillRect(365, 100, 40, 20);
	c.fillRect(410, 100, 40, 20);
	c.fillRect(455, 100, 40, 20);
	c.fillRect(500, 100, 40, 20);
}

function updateRow4(){	
	c.fillStyle = "blue";
	c.fillRect(50, 125, 40, 20);
	c.fillRect(95, 125, 40, 20);
	c.fillRect(140, 125, 40, 20);
	c.fillRect(185, 125, 40, 20);
	c.fillRect(230, 125, 40, 20);
	c.fillRect(275, 125, 40, 20);
	c.fillRect(320, 125, 40, 20);
	c.fillRect(365, 125, 40, 20);
	c.fillRect(410, 125, 40, 20);
	c.fillRect(455, 125, 40, 20);
	c.fillRect(500, 125, 40, 20);
}

function updateRow5(){	
	c.fillStyle = "cyan";
	c.fillRect(50, 150, 40, 20);
	c.fillRect(95, 150, 40, 20);
	c.fillRect(140, 150, 40, 20);
	c.fillRect(185, 150, 40, 20);
	c.fillRect(230, 150, 40, 20);
	c.fillRect(275, 150, 40, 20);
	c.fillRect(320, 150, 40, 20);
	c.fillRect(365, 150, 40, 20);
	c.fillRect(410, 150, 40, 20);
	c.fillRect(455, 150, 40, 20);
	c.fillRect(500, 150, 40, 20);
}
