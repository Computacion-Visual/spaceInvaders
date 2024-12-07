let ship;
let invaders = [];
let shipBullets = [];

function setup() {
  createCanvas(1280, 720);
  ship = new Ship();
  for (let i = 0; i < 10; i++) {
    invaders.push([]);
    for (let j = 0; j < 5; j++) {
      invaders[i].push(new Invader(i * 60 + 60, j * 60 + 60));
    }
  }
}

function draw() {
  background(50);
  ship.show();

  let edge = false;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      invaders[i][j].show();
      invaders[i][j].move();
      if (invaders[i][j].x > width || invaders[i][j].x < 0) {
        edge = true;
      }
    }
  }

  if (edge) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        invaders[i][j].shiftDown();
      }
    }
  }

  for (let i = shipBullets.length - 1; i >= 0; i--) {
    shipBullets[i].update();
    shipBullets[i].draw();
    if (shipBullets[i].y < 0) {
      shipBullets.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (key === " ") {
    shipBullets.push(new Bullet(ship.x, height - 20));
  } else if (keyCode === RIGHT_ARROW) {
    ship.move(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.move(-1);
  }
}
