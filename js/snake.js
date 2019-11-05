const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

var snakeHead;
var apples;
var appleXray = new Array(30);
var appleYray = new Array(30);
var bodyRay = new Array(30);
var bodypart = new Array(30);
var bodyXray = new Array(30);
var bodyYray = new Array(30);
var lastYray = new Array(1000);
var lastXray = new Array(1000);
var temp;
var count = 0;
var bodycount = 0;
var appleIndex = 0;
var speed = 20;
var regen = 9000;
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

	document.getElementById("score").innerHTML = "Apples eaten: "+bodycount;
	//alert("lastx:"+lastXray+" bxray:"+bodyXray+" lasty:"+lastYray+" byray:"+bodyYray);
}
function body(){
	this.updatebody = function(i){
		if(x <= (appleXray[i]+10) && (x+10) >=appleXray[i] && (y+10) >= appleYray[i] && y <= (appleYray[i]+10)){
		//alert("collision");
		appleXray[i] = -50;
		appleYray[i] = -50;
		//give array true to increase bodycount
		bodyRay[i] = true;
		//get apples eaten
		output();
		//bodyXray[bodycount] = x+21;
		//bodyYray[bodycount] = y+21;

		//if(movedown){
				//c.fillStyle = "black";
				//c.fillRect(bodyXray[i], bodyYray[i], 20, 20);
				//c.fillRect = (x, (y-21) , 20, 20);
			//}
		}else if(!bodyRay[i]){
			c.fillStyle = "gold";
			c.fillRect(bodyXray[i], bodyYray[i], 10, 10);
		}else if(bodyRay[i]){
			c.fillStyle = "purple";
			c.fillRect(bodyXray[i], bodyYray[i], 10, 10);
		}
	}
}
function crash(i){
	if(x <= (appleXray[i]+2) && (x+2) >=appleXray[i] && (y+20) >= appleYray[i] && y <= (appleYray[i]+20)){
		//alert("collision");
		appleXray[i] = -50;
		appleYray[i] = -50;
		//give array true to increase bodycount
		bodyRay[i] = true;
		//get apples eaten
		output();
		//make snake longer
		if(movedown){
			//alert("movedown y+21 bcount:"+bodycount);
			bodyXray[i] = x;
			bodyYray[i] = y+21;
			bodypart[i] = new body(i);
			//bodypart[i].updatebody();
			//bodypart[i] = new body(x, (y+21), bodycount);
			//c.fillStyle = "black";
			//c.fillRect = (x, (y+21) , 20, 20);
		}
		/*if(moveup){
			alert("moveup y-21 bcount:"+bodycount);
			//bodypart[i] = new body(x, (y-21), bodycount);
			c.fillStyle = "black";
			c.fillRect = (x, (y-21) , 20, 20);
		}
		if(moveleft){
			alert("moveleft x-21 bcount:"+bodycount);
			//bodypart[i] = new body((x-21), y, bodycount);
			c.fillStyle = "black";
			c.fillRect = ((x-21), y , 20, 20);
		}
		if(moveright){
			alert("moveright x+21 bcount:"+bodycount);
			//bodypart[i] = new body((x+21), y, bodycount);
			c.fillStyle = "black";
			c.fillRect = ((x+21), y , 20, 20);
		}*/
		//bodypart[bodycount] = new body(bodycount);
	}/*else if(!bodyRay[i]){
		c.fillStyle = "yellow"; //greenyellow
		c.fillRect = (0, 0, 20, 20);
	}*/
}

function paintbody(){
	if(bodycount==1){
		bodyXray[0]= x+21;
		bodyYray[0]= y+21;
	}else if(bodycount==2){
		bodyXray[1]= x+42;
		bodyYray[1]= y+42;
	}
}

function createbody(){

	for(var i = 0; i < 30; i++){
		bodyXray[i] = -50;
		bodyYray[i] = -50;
	}

	for(var i = 0; i < 30; i++){
		bodyRay[i]=false;
		bodypart[i] = new body();
	}
}

function clear(){
	c.clearRect(0, 0, canvas.width, canvas.height);
	//paint apple
	for(var i = 0; i < 30; i++){
		c.fillStyle = "red";
		c.fillRect(appleXray[i], appleYray[i], w, h);
	}
	lastXray[count] = x;
	lastYray[count] = y;
	count++;
	if(count==1000){
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
	//bodyX = x;
	//bodyY = y;
	if(x > 590 || x < 1){
		stop();
	}
	if(y < 1 || y > 390){
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
	for(var i = 0; i < 30; i++){
		bodypart[i].updatebody(i);
	}
	
}
function updateApple(){
	appleX = Math.floor(Math.random() * 581);
	appleY = Math.floor(Math.random() * 281);

	appleIndex++;

	appleXray[appleIndex] = appleX;
	appleYray[appleIndex] = appleY;
}
function moveSnake(){
	//down
	if(event.keyCode == 115 && !moveup){
		speedX = 0;
		speedY = 1;
		movedown = true;
		moveleft = false;
		moveright = false;
		moveup = false;
		moving = true;
	}
	//left
	if(event.keyCode == 97 && !moveright){
		speedX = -1;
		speedY = 0;
		moveleft = true;
		movedown = false;
		moveright = false;
		moveup = false;
		moving = true;
	}
	//right
	if(event.keyCode == 100 && !moveleft){
		speedX = 1;
		speedY = 0;
		moveright = true;
		moveleft = false;
		movedown = false;
		moveup = false;
		moving = true;
	}
	//up
	if(event.keyCode == 119 && !movedown){
		speedX = 0;
		speedY = -1;
		moveup = true;
		movedown = false;
		moveleft = false;
		moveright = false;
		moving = true;
	}
}