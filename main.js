var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Field {
	constructor(){
		//Get these from property set....
		this.width = 600;
		this.height = 300;
		this.color = "green";
	}
	
	draw(){
		ctx.fillStyle = this.color;
		ctx.fillRect(0, 0, this.width, this.height);
	}
};

class Ball {
	constructor(){
		//Get these from property set....
		this.id = 1; //could be used to identify multiple balls
		this.xPos = 50;
		this.yPos = 50;
		this.xDir = 1;
		this.yDir = 2;
		this.radius = 10;
		this.color = "white";
	}

	//has the ball hit edge of field?
	//if so, update direction
	checkFieldBounds(field){
		if (this.xPos > field.width || this.xPos < 0){
			//reverse direction
			this.xDir = -this.xDir;
		}

		if (this.yPos > field.height || this.yPos < 0){
			//reverse direction
			this.yDir = -this.yDir;
		}
	}
	
	move(){
		this.xPos += this.xDir;
		this.yPos += this.yDir;
	}

	// Function for drawing ball on canvas
	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		//ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI*2, false);
		ctx.fillRect(this.xPos, this.yPos, this.radius*2, this.radius*2);
		ctx.fill();
	}
};

class Player {
	constructor(settings, field){
		this.name = settings.name;
		this.id = settings.id;
		this.xPos = this.id === 1 ? 0 : field.width;
		this.yPos = 50;
		this.color = this.id
		this.height = 50;
		this.width = 10;
		this.power = 0; //power could affect ball bouncing off player
		this.isKeyboardPlayer = settings.isKeyboardPlayer;
		this.upKey = settings.upKey;
		this.downKey = settings.downKey;
		
		if (this.id === 1){
			this.xPos = 0;
			this.color = "red";
		}else{
			this.xPos = field.width - this.width;
			this.color = "blue";
		}
		
		this.attachEvents();
	}
	
	attachEvents(){
		if (this.isKeyboardPlayer){
			window.addEventListener("keydown", (e) => {
				console.log(this, e);
				//TODO don't allow outside field
				if (e.keyCode === this.upKey){
					this.power++;
					this.yPos -=10;
				}else if (e.keyCode === this.downKey){
					this.power++;
					this.yPos +=10;
				}
			});
			
			window.addEventListener("keyup", (e) => {
				console.log(this);
				if (e.keyCode === this.upKey || e.keyCode === this.downKey){
					this.power = 0;
				}
			});
		}
	}
	
	checkBallCollision(ball){
		//TODO improve this 
		
		//only check if ball is within range of player
		if (ball.posX )
		
		if (this.yPos )
	}
	
	draw(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
	}
};

var ball = new Ball();
var field = new Field();
//will be dynamic
//TODO vr player
var player1 = new Player({name:"name1", id:1, isKeyboardPlayer:true, upKey:87, downKey:83}, field); // W/S keys
var player2 = new Player({name:"name2", id:2, isKeyboardPlayer:true, upKey:38, downKey:40}, field); // up/down arrow keys

canvas.height = field.height;
canvas.width = field.width;

function render() {
	field.draw();
	ball.draw();
	player1.draw();
	player2.draw();
	
	window.requestAnimationFrame(render);
	//update state of players, ball etc.
	updateGameState();
}

render();

function updateGameState() {
	ball.checkFieldBounds(field);
	ball.move();
	player1.checkBallCollision(ball);
	player2.checkBallCollision(ball);
}