const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

var fighter = document.getElementById("fighter");
var alienimg = document.getElementById("alienim");
var ship;
var x = 275;
var y = 350;
var h = 50;
var w = 50;
var aCount = 0;
var kCount = 0;
var killed = new Array(1000);
var interval;
var speed = 15;
var bullet = new Array(100);
var bulletX = new Array(100);
var bulletY = new Array(100);
var fired = new Array(100);
var bCount = 0;
var alien = new Array(1000);
var alienX = new Array(1000);
var alienY = new Array(1000);
var alienInterval;
var regen = 2000;

document.addEventListener("keypress", moveShip, false);
//document.addEventListener("keydown", moveShips, false);
var sound = document.getElementById("music");
document.body.onload = init();

function init(){
	
	canvas.width = 600;
	canvas.height = 400;

	ship = new drawShip();
	for(var i = 0; i < bullet.length; i++){
		bullet[i] = new drawBullet();
		bulletX[i] = -50;
		bulletY[i] = -50;
		killed[i] = false;
		fired[i] = false;
	}
	for(var i = 0; i < alien.length; i++){
		alien[i] = new drawAlien();
		alienX[i] = Math.floor(Math.random() * 550);
		alienY[i] = -4;
	}
	interval = setInterval(updateSpace, speed);
	alienInterval = setInterval(updateAlien, regen);
}

function drawShip(){
	this.update = function(){
		c.drawImage(fighter, x, y, w, h);
	}
}

function drawBullet(){
	this.update = function(i){
		c.fillStyle = "red";
		c.fillRect(bulletX[i], bulletY[i], 5, 10);
	}
}

function drawAlien(){
	this.update = function(i){
		if(document.getElementById("musicCheck").checked){
			sound.volume = 0.5;
			sound.play();
		}else if(!document.getElementById("musicCheck").checked){
			sound.pause();
			sound.currentTime = 0;
		}
		//alert("draw alien i:"+i+" ax:"+alienX[i]+" ay:"+alienY[i]);
		//c.fillStyle = "yellow";
		//c.fillRect = (alienX[i], alienY[i], 20, 20);
		for(var b = 0; b<bullet.length; b++){
			if(bulletX[b] <= (alienX[i]+20) && (bulletX[b]+5) >=alienX[i] && (bulletY[b]+10) >= alienY[i] && bulletY[b] <= (alienY[i]+20)){
				alienX[i] = -50;
				alienY[i] = -50;
				bulletX[b] = -50;
				bulletY[b] = -50;
				killed[i] = true;
			}else{
				while(alienX[i]>=alienX[b] && (alienX[i]+20)<=(alienX[b]+20) && i!==b){
					//alert("randomx");
					alienX[i] = Math.floor(Math.random() * 550);
					while(alienY[i]>=alienY[b] && (alienY[i]+20)<=(alienY[b]+20) && i!==b){
						alert("randomy");
						alienX[i] = Math.floor(Math.random() * 550);
						alienY[i] -= 4;
					}
				}
				c.drawImage(alienimg, alienX[i], alienY[i], 20, 20);
			}
		}
		//alert("draw alien i:"+i+" ax:"+alienX[i]+" ay:"+alienY[i]);
	}
}

function moveShip(){
	//left
	if(event.keyCode == 97 || event.keyCode == 37){
		//speedX = -1;
		x = x - 10;
	}	
	//right
	if(event.keyCode == 100 || event.keyCode == 39){
		//speedX = 1;
		x = x + 10;
	}	
	//spacebar
	if(event.keyCode == 32){
		//alert("fire");
		fired[bCount] = true;
		//speedY = -2;
		bulletX[bCount] = x +24;
		bulletY[bCount] = 355;
		bCount++;
	}
}

function updateAlien(){
	aCount++;
	for(var i = 0; i < aCount; i++){
		alienY[i] += 4;
		if(alienY[i]>355){
			stop();
		}
	}
	//alien[aCount].update(aCount);
	/*for(var i = 0; i < aCount; i++){
		alienY[i] += 4;
	}*/
}

function clear(){	
	c.clearRect(0, 0, canvas.width, canvas.height);
	/*c.fillStyle = "yellow";
	c.fillRect = (alienX[aCount], alienY[aCount], 10, 10);*/
	//c.drawImage(alienimg, 100, 100, 50, 50);
}

function stop(){
	alert("Game Over");
	//sound.pause();
	//sound.currentTime = 0;
	//document.getElementById("musicCheck").checked = false;
	clearInterval(interval);
	clearInterval(alienInterval);
}
function output(){
	kCount = killed.filter(function(value){
		return value === true;
	}).length

	document.getElementById("score").innerHTML = "Aliens Killed:"+ kCount;
	//document.getElementById("xval").innerHTML = "alien y0:"+alienY[0];
	//document.getElementById("speed").innerHTML = "alien y1: "+alienY[1];
}

function updateSpace() {
	clear();
	output();
	if(x > 550){
		x = 550;
	}
	if(x < 0){
		x = 0;
	}
	for(var i = 0; i < bCount; i++){
		if(fired[i]){
			bulletY[i] -= 5;
			if(bulletY[i] < 0){
				fired[i] = false;
				bulletX[i] = -50;
				bulletY[i] = -50;
			}
		}
	}
	ship.update();
	if(bCount == 100){
		bCount = 0;
	}
	for(var i = 0; i<bCount; i++){
		bullet[i].update(i);
	}
	/*for(var i = 0; i<alien.length; i++){
		alien[i].update(aCount);
	}*/
	for(var i = 0; i < aCount; i++){
		//alienY[i] += 4;
		//alert("alien update");
		alien[i].update(i);
	}
}