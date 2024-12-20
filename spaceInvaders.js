let score = 0;
let escudos = 5;
let globalInvaderSpeed = 1;
let highScore = 0;
let spawnAnimation = true;
let animationIndex = 0;
const invadersWidth = 5;
const invadersHeight = 10;

function preload() {
  ship_sprite = loadShipSprites();
  invaderA_sprites = loadInvaderASprites();
  invaderB_sprites = loadInvaderBSprites();
  invaderC_sprites = loadInvaderCSprites();
  playerBulletSprites = loadPlayerBulletSprites();
  invaderExplosionSprites = loadInvaderExplosionSprites();
  invaderABulletSprites = loadInvaderABulletSprites();
  invaderBBulletSprites = loadInvaderBBulletSprites();
  invaderCBulletSprites = loadInvaderCBulletSprites();
  shipExplosionSprites = loadShipExplosionSprites();
}

function setup() {
  globalInvaderSpeed = Math.min(globalInvaderSpeed + 0.1, 10); // Velocidad máxima de 10
  createCanvas(1280, 720);
  ship = new Ship();
  ship_lives = 3;
  highScore = localStorage.getItem("highScore") || 0;
  spawnInvaders();
  spawnShields();
}

function draw() {
  frameRate(30);
  background(0);

  ship.show();
  ship.move();

  //Muestra el escudo
  for (let i = 0; i < shields.length; i++) {
    shields[i].show();
  }

  showHUD();

  let edge = false;
  let allInvadersDestroyed = true; // Variable para comprobar si todos los invasores han sido destruidos

  if (spawnAnimation) {
    spawnInvadersAnimation(animationIndex);
    animationIndex++;
    if (animationIndex >= 50) {
      spawnAnimation = false;
      animationIndex = 0;
    }
    return;
  }

  for (let i = 0; i < invadersHeight; i++) {
    for (let j = 0; j < invadersWidth; j++) {
      if (invaders[i][j] === null) {
        continue;
      }
      allInvadersDestroyed = false; // Si encontramos al menos un invasor, no hemos ganado todavía
      invaders[i][j].show();
      invaders[i][j].move();
      if (invaders[i][j].gonnaShoot()) {
        invaders[i][j].shoot();
      }
      if (invaders[i][j].x > width || invaders[i][j].x < 0) {
        edge = true;
      }
      for (let k = shipBullets.length - 1; k >= 0; k--) {
        let deleteBullet = false;
        for (let s = 0; s < shields.length; s++) {
          const shield = shields[s];
          for (let p = 0; p < shield.shieldParts.length; p++) {
            if (shipBullets[k].hits(shield.shieldParts[p])) {
              if (shield.shieldParts[p].getHit()) {
                explosions.push(
                  new Explosion(
                    shield.shieldParts[p].x + shieldWidth / 2,
                    shield.shieldParts[p].y,
                  ),
                );
                deleteBullet = true;
                break;
              }
            }
          }
          if (deleteBullet) {
            break;
          }
        }

        if (shipBullets[k].hits(invaders[i][j])) {
          explosions.push(
            new Explosion(invaders[i][j].x, invaders[i][j].y, "invader"),
          );
          score += getInvaderScores(invaders[i][j].type);
          invaders[i].splice(j, 1, null);
          deleteBullet = true;
          shipBullets.splice(k, 1);
          // Incrementa la velocidad global de los invasores
          globalInvaderSpeed += 0.1;
        }
        if (deleteBullet) {
          shipBullets.splice(k, 1);
          break;
        }
      }
    }
  }

  if (allInvadersDestroyed) {
    spawnAnimation = true;
    shipBullets = [];
    invaderBullets = [];
    explosions = [];
    spawnInvaders();
    allInvadersDestroyed = false;
  }

  if (edge) {
    for (let i = 0; i < invadersHeight; i++) {
      for (let j = 0; j < invadersWidth; j++) {
        if (invaders[i][j] === null) {
          continue;
        }
        invaders[i][j].shiftDown();
      }
    }
  }

  //Limite de tablero
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
  //Colision de balas de invasores
  for (let i = invaderBullets.length - 1; i >= 0; i--) {
    if (invaderBullets[i].y > height - 70) {
      invaderBullets.splice(i, 1);
    }
    if (invaderBullets[i] == null) {
      continue;
    }
    invaderBullets[i].update();
    invaderBullets[i].draw();
    let eliminado = false;
    //Con escudos
    for (let j = 0; j < shields.length; j++) {
      let shield = shields[j];
      for (let p = 0; p < shield.shieldParts.length; p++) {
        if (invaderBullets[i].hits(shield.shieldParts[p])) {
          if (shield.shieldParts[p].getHit()) {
            explosions.push(
              new Explosion(
                shield.shieldParts[p].x + shieldWidth / 2,
                shield.shieldParts[p].y,
              ),
            );
            eliminado = true;
            break;
          }
        }
      }
      if (eliminado) {
        break;
      }
    }
    if (eliminado) {
      invaderBullets.splice(i, 1);
      break;
    }
    //Con nave
    if (invaderBullets[i].hits(ship)) {
      ship_lives--;
      //explosions.push(new Explosion(ship.x, ship.y, "ship"));
      ship.explode();
      invaderBullets.splice(i, 1);
      if (ship_lives === 0) {
        localStorage.setItem("highScore", Math.max(highScore, score));
        showGameOver();
      }
    }
  }
}

function spawnInvaders() {
  invaders = [];
  for (let i = 0; i < invadersHeight; i++) {
    invaders.push([]);
    for (let j = 0; j < invadersWidth; j++) {
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

function spawnInvadersAnimation(index) {
  let n = 0;
  for (let i = 0; i < invadersHeight; i++) {
    for (let j = 0; j < invadersWidth; j++) {
      invaders[i][j].showNoAnimation();
      n++;
      if (index === n) {
        return;
      }
    }
  }
}

function spawnShields() {
  const espaciado = (width - 2 * 50) / escudos + 1;
  for (let i = 0; i < escudos; i++) {
    shields.push(new Shield(i * espaciado + 50, height - 250, 0, 6, 7));
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
    ship.setDir(0);
  }
}

function keyPressed() {
  if (spawnAnimation) {
    return;
  }
  if (key === " ") {
    if (shipBullets.length < 1 && !ship.exploded)
      shipBullets.push(new Bullet(ship.x, ship.y, "player"));
  } else if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}
