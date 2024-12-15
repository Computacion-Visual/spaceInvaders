let ship;
let ship_sprite = [];
let invaders = [];
let invaderA_sprites = [];
let invaderB_sprites = [];
let invaderC_sprites = [];
let shipBullets = [];
let score = 0;
let playerBulletSprites = [];
let explosionSprites = [];
let explosions = [];

function preload() {
  ship_sprite = loadShipSprites();
  invaderA_sprites = loadInvaderASprites();
  invaderB_sprites = loadInvaderBSprites();
  invaderC_sprites = loadInvaderCSprites();
  playerBulletSprites = loadPlayerBulletSprites();
  explosionSprites = loadExplosionSprites();
}

function setup() {
  createCanvas(1280, 720);
  ship = new Ship();
  for (let i = 0; i < 10; i++) {
    invaders.push([]);
    for (let j = 0; j < 5; j++) {
      if (j === 0) {
        invaders[i].push(new Invader(100 + i * 60, 100 + j * 60, "a"));
      } else if (j === 1 || j === 2) {
        invaders[i].push(new Invader(100 + i * 60, 100 + j * 60, "b"));
      } else {
        invaders[i].push(new Invader(100 + i * 60, 100 + j * 60, "c"));
      }
    }
  }
}

function draw() {
  frameRate(30);
  background(0);
  ship.show();
  ship.move();
  showHUD();

  let edge = false;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      if (invaders[i][j] === null) {
        continue;
      }
      invaders[i][j].show();
      invaders[i][j].move();
      if (invaders[i][j].x > width || invaders[i][j].x < 0) {
        edge = true;
      }
      for (let k = shipBullets.length - 1; k >= 0; k--) {
        if (shipBullets[k].hits(invaders[i][j])) {
          explosions.push(new Explosion(invaders[i][j].x, invaders[i][j].y));
          score += 20;
          invaders[i].splice(j, 1, null);
          shipBullets.splice(k, 1);
        }
      }
    }
  }

  if (edge) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        if (invaders[i][j] === null) {
          continue;
        }
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

  for (let i = explosions.length - 1; i >= 0; i--) {
    explosions[i].show();
    if (explosions[i].sprite.isDone()) {
      explosions.splice(i, 1);
    }
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
    ship.setDir(0);
  }
}

function keyPressed() {
  if (key === " ") {
    shipBullets.push(new Bullet(ship.x, height - 20));
  } else if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}
