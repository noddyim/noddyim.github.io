const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

var snakeHead;
var apples;
var appleXray = new Array(1001);
var appleYray = new Array(1001);
var bodyRay = new Array(1001);
var bodypart = new Array(1001);
var bodyXray = new Array(1001);
var bodyYray = new Array(1001);
var lastYray = new Array(10000);
var lastXray = new Array(10000);
var temp;
var count = 0;
var bodycount = 0;
var appleIndex = 0;
var speed = 20;
var score;
var regen = 7000;
var speedX = 0;
var speedY = 0;
var x = 200;
var y = 200;
var w = 10;
var h = 10;
var appleX = 300;
var appleY = 300;
var bodyX = 200;
var bodyY = 221;
var interval;
var appleInterval;
var movedown = false;
var moveleft = false;
var moveright = false;
var moveup = false;
var moving = false;

document.addEventListener("keypress", moveSnake, false);

document.body.onload = init();

function init(){
	canvas.width = 600;
	canvas.height = 400;

	snakeHead = new snake();
	//apples = new apple();
	updateApple();

	createbody();

	interval = setInterval(updateBackyard, speed);
	appleInterval = setInterval(updateApple, regen);
}
function snake(){
	this.update = function(){
		c.fillStyle = "green";
		c.fillRect(x, y, w, h);
	}
}
function apple(){
	appleXray[appleIndex] = appleX;
	appleYray[appleIndex] = appleY;
	//check if apple is where snake is
	this.update = function(){
		c.fillStyle = "red";
		c.fillRect(appleX, appleY, w, h);
	}
}
function output(){
	bodycount = bodyRay.filter(function(value){
    return value === true;
	}).length

	if(bodycount == 10 && speed == 20 && regen == 7000){
			speed -= 4;
			regen -= 1000;
			clearInterval(interval);
			clearInterval(appleInterval);
			interval = setInterval(updateBackyard, speed);
			appleInterval = setInterval(updateApple, regen);
	}else if(bodycount == 15 && speed == 16 && regen == 6000){
			speed -= 4;
			regen -= 1000;
			clearInterval(interval);
			clearInterval(appleInterval);
			interval = setInterval(updateBackyard, speed);
			appleInterval = setInterval(updateApple, regen);
	}else if(bodycount == 20 && speed == 12 && regen == 6000){
			speed -= 4;
			regen -= 1000;
			clearInterval(interval);
			clearInterval(appleInterval);
			interval = setInterval(updateBackyard, speed);
			appleInterval = setInterval(updateApple, regen);
	}else if(bodycount == 25 && speed == 8 && regen == 5000){
			speed -= 4;
			regen -= 1000;
			clearInterval(interval);
			clearInterval(appleInterval);
			interval = setInterval(updateBackyard, speed);
			appleInterval = setInterval(updateApple, regen);
	}
	if(speed ==20){
	score = 10;
	}else if(speed == 16){
		score = 20;
	}else if(speed == 12){
		score = 30;
	}else if(speed == 8){
		score = 40;
	}else if(speed == 4){
		score = "MAX";
	}
	document.getElementById("apples").innerHTML = "Apples eaten: "+bodycount;
	document.getElementById("score").innerHTML = "Score: "+(bodycount *35);
	document.getElementById("speed").innerHTML = "Speed: "+score;
}
function body(){
	this.updatebody = function(i){
		if(x <= (appleXray[i]+9) && (x+9) >=appleXray[i] && (y+9) >= appleYray[i] && y <= (appleYray[i]+9)){
		//alert("collision");
		appleXray[i] = -50;
		appleYray[i] = -50;
		//give array true to increase bodycount
		bodyRay[i] = true;
		//get apples eaten
		output();
		}else if(!bodyRay[i]){
			c.fillStyle = "limegreen";
			c.fillRect(bodyXray[i], bodyYray[i], 10, 10);
		}else if(bodyRay[i]){
			c.fillStyle = "limegreen";
			c.fillRect(bodyXray[i], bodyYray[i], 10, 10);
		}
		if(i<(bodycount-1)){
			if(x <= (bodyXray[i+1]+9) && (x+9) >=bodyXray[i+1] && (y+9) >= bodyYray[i+1] && y <= (bodyYray[i+1]+9)){
				//alert("hit body");
				stop();
			}		
		}
	}
}

function createbody(){

	for(var i = 0; i < 1001; i++){
		bodyXray[i] = -50;
		bodyYray[i] = -50;
	}

	for(var i = 0; i < 1001; i++){
		bodyRay[i] = false;
		bodypart[i] = new body();
	}
}

function clear(){
	c.clearRect(0, 0, canvas.width, canvas.height);
	//paint apple
	for(var i = 0; i < 1001; i++){
		c.fillStyle = "red";
		c.fillRect(appleXray[i], appleYray[i], w, h);
	}
	lastXray[count] = x;
	lastYray[count] = y;
	count++;
	if(count==7000){
		count = 0;
	}
}
function stop(){
	alert("Game Over");
	clearInterval(interval);
	clearInterval(appleInterval);
}
function updateBackyard() {
	clear();
	x = x + speedX;
	y = y + speedY;
	if(x > 591 || x < 0){
		stop();
	}
	if(y < 0 || y > 391){
		stop();
	}
	snakeHead.update();
	//adds body to snake head
	temp = count;
	for(var i = 0; i < bodycount; i++){
		temp = temp -11;
		bodyXray[i] = lastXray[temp];//x+(i*10);
		bodyYray[i] = lastYray[temp];//y+(i*10);
	}
	for(var i = 0; i < 1001; i++){
		bodypart[i].updatebody(i);
	}
	
}
function updateApple(){
	appleX = Math.floor(Math.random() * 581);
	appleY = Math.floor(Math.random() * 281);
	
	while(appleX % 10 !==0){
		appleX = Math.floor(Math.random() * 581);
	}
	while(appleY % 10 !==0){
		appleY = Math.floor(Math.random() * 281);
	}

	appleIndex++;
	//need to stop apples from showing up in same spot
	appleXray[appleIndex] = appleX;
	appleYray[appleIndex] = appleY;
}
function moveSnake(){
	//down
	if(event.keyCode == 115 && !moveup){
		if(moveright){
			while(x % 10 !== 0){
				x++;
			}
		}
		if(moveleft){
			while(x % 10 !== 0){
				x--;
			}
		}
		if(x % 10 == 0){
			speedX = 0;
			speedY = 1;
			movedown = true;
			moveleft = false;
			moveright = false;
			moveup = false;
			moving = true;
		}
	}
	//left
	if(event.keyCode == 97 && !moveright){
		if(movedown){
			while(y % 10 !== 0){
				y++;
			}
		}
		if(moveup){
			while(y % 10 !== 0){
				y--;
			}
		}
		if(x % 10 == 0){
			speedX = -1;
			speedY = 0;
			moveleft = true;
			movedown = false;
			moveright = false;
			moveup = false;
			moving = true;
		}
	}
	//right
	if(event.keyCode == 100 && !moveleft){
		if(movedown){
			while(y % 10 !== 0){
				y++;
			}
		}
		if(moveup){
			while(y % 10 !== 0){
				y--;
			}
		}
		if(x % 10 == 0){
			speedX = 1;
			speedY = 0;
			moveright = true;
			moveleft = false;
			movedown = false;
			moveup = false;
			moving = true;
		}
	}
	//up
	if(event.keyCode == 119 && !movedown){
		if(moveright){
			while(x % 10 !== 0){
				x++;
			}
		}
		if(moveleft){
			while(x % 10 !== 0){
				x--;
			}
		}
		if(x % 10 == 0){
			speedX = 0;
			speedY = -1;
			moveup = true;
			movedown = false;
			moveleft = false;
			moveright = false;
			moving = true;
		}
	}
}