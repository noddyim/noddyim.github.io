// getting a reference to our HTML element
const canvas = document.querySelector('canvas');

// initiating 2D context on it
const c = canvas.getContext('2d');
//var w = canvas.getContext("2d");

var interval;
var x = 50;
var y = 300;
var speedX = 1;
var speedY = 1;

var xWall = new Array(55);
var yWall = new Array(55);

var board;

addEventListener('resize', () => {
  canvas.width = 600;
  canvas.height = 400;
});

document.body.onload = start();

function start(){
	//makeObstacles();
	interval = setInterval(updateGameArea, 20);
}

function updateBall(){	
		c.fillStyle = "black";
		c.fillRect(x, y, 5, 5);
}

function clear(){
	c.clearRect(0, 0, canvas.width, canvas.height);
}

function stop(){
	clearInterval(interval);
}

function updateGameArea() {
	/*if(crashCheck()){
		stop();
	}*/
	clear();
	x = x + speedX;
	y = y + speedY;
	if(x > 590 || x < 1){
		speedX = speedX * -1;
	}
	if(y > 390 || y < 1){
		speedY = speedY * -1;
	}
	//updateRow1();
	updateRow2();
	updateRow3();
	updateRow4();
	updateRow5();
  	updateBall();
}

function crashCheck(){

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
		}else if(i > 22 && i <=32){
			xWall[i] = tempX;
			yWall[i] = 100;
			tempX += 45;
			if(i == 32){
				tempX = 50;
			}
		}else if(i > 33 && i <=43){
			xWall[i] = tempX;
			yWall[i] = 125;
			tempX += 43;
			if(i == 43){
				tempX = 50;
			}
		}else if(i > 44 && i <=54){
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
	}
	c.fillRect(50, 50, 40, 20);
	c.fillRect(95, 50, 40, 20);
	c.fillRect(140, 50, 40, 20);
	c.fillRect(185, 50, 40, 20);
	c.fillRect(230, 50, 40, 20);
	c.fillRect(275, 50, 40, 20);
	c.fillRect(320, 50, 40, 20);
	c.fillRect(365, 50, 40, 20);
	c.fillRect(410, 50, 40, 20);
	c.fillRect(455, 50, 40, 20);
	c.fillRect(500, 50, 40, 20);*/
}
function updateRow2(){	
	c.fillStyle = "red";
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