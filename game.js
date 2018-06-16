const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const invaders = [];
const bullets = [];

function Invader(x, y) {
  this.x = x;
  this.y = y;
  this.color = 'blue';
  this.radius = 20;

  this.draw = function() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    context.fill();
  }
}

function Ship() {
  this.x = canvas.width / 2;
  this.width = 10;
  this.height = 30;
  this.color = 'white';
  this.speed = 0;

  this.draw = function() {
    context.fillStyle = this.color;
    context.fillRect(this.x, canvas.height - this.height , this.width, this.height);
  };

  this.move = function() {
    this.x += this.speed;
  };

  this.fire = function() {
    const bullet = new Bullet(this.x + this.width / 2, canvas.height);
    bullets.push(bullet);
  };
}

function Bullet(x, y) {
  this.x = x;
  this.y = y;
  this.color = 'red';
  this.radius = 3;
  this.speed = 3;

  this.draw = function() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    context.fill();
  };

  this.move = function() {
    this.y -= this.speed;
  };
}

function handleKeyDown(evt) {
	if (evt.keyCode === 37) {
		ship.speed = -1;
	} else if (evt.keyCode === 39) {
		ship.speed = 1;
	} else if (evt.keyCode === 32) {
    ship.fire();
	}
};

function handleKeyUp(evt) {
	if (evt.keyCode === 37 || evt.keyCode === 39) {
		ship.speed = 0;
	}
};

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

const ship = new Ship();
const bullet = new Bullet(500, 300);

for(let i = 0; i < 10; i++) {
  const invader = new Invader(50 + (i * 55), 50);
  invaders.push(invader)
}

window.setInterval(function() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  ship.draw();
  ship.move();

  for(let i = 0; i < invaders.length; i++) {
    invaders[i].draw();
    // invaders[i].move();

    // if(bullets[i].y < 0) {
    //   bullets.splice(i, 1);
    // }
  }

  for(let i = 0; i < bullets.length; i++) {
    bullets[i].draw();
    bullets[i].move();

    // if(bullets[i].y < 0) {
    //   bullets.splice(i, 1);
    // }

    for(let j = 0; j < invaders.length; j++) {
      // console.log(bullets[i].x);
      // distance(bullets[i].x, bullets[i].y, invaders[j].x, invaders[j].y)
      // if(distance(bullets[i].x, bullets[i].y, invaders[j].x, invaders[j].y) < bullets[i].radius + invaders[j].radius) {
      //   // invaders.splice(j)
      // }
    }
  }

  function distance(x1, x2, y1, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
  }
})
