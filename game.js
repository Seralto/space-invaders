const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const invaders = [];
const bullets = [];

function Invader(x, y) {
  this.x = x;
  this.y = y;
  this.color = 'blue';
  this.radius = 20;
  this.speed = 0.1

  this.draw = function() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    context.fill();
  },

  this.move = function() {
    this.x += this.speed;
    if(invaders[invaders.length - 1].x > canvas.width - this.radius) {
      this.y += 10
      this.speed *= -1
    }
    if(invaders[0].x < this.radius) {
      this.y += 10
      this.speed *= -1
    }
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
  this.speed = 1.2;

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
    invaders[i].move();
  }

  // Iterate over the bullets array
  for(let i = 0; i < bullets.length; i++) {
    bullets[i].draw();
    bullets[i].move();

    // Iterate over the invaders array
    for(let j = 0; j < invaders.length; j++) {
      if(!bullets[i] || !invaders[j]) { return }

      // Remove invader and bullet in case of collision
      let currentDistance = distance(bullets[i].x, invaders[j].x, bullets[i].y, invaders[j].y)
      let radiusSum = bullets[i].radius + invaders[j].radius
      if(currentDistance < radiusSum) {
        invaders.splice(j, 1)
        bullets.splice(i, 1)
      }
    }

    // Remove bullet when leave screen
    if(bullets[i] && bullets[i].y < 0) { bullets.splice(i, 1); }
  }

  function distance(x1, x2, y1, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
  }
})
